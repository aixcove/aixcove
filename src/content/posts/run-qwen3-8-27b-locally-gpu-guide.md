---
title: "How to Run Qwen3.8-27B Locally: A GPU-by-GPU Setup Guide"
date: '2026-09-10T09:00:00'
slug: run-qwen3-8-27b-locally-gpu-guide
description: "Qwen3.8-27B local setup for every hardware tier: integrated graphics, Mac, RTX 40/50 laptops and desktops. Correct quants, contexts, and realistic speeds."
categories:
- ai-tutorials-how-tos
featured: /uploads/2026/09/run-qwen3-8-27b-locally-gpu-guide-hero.jpg
---

<h2>How to Run Qwen3.8-27B Locally: A GPU-by-GPU Setup Guide</h2>
<p><strong>Quick verdict:</strong> Qwen3.8-27B is a dense 27B vision-language model released August 14, 2026 under Apache 2.0, and the whole guide boils down to one decision: pick the quantized file that fits your memory, then cap the context window to what is left over. With 16 GB of VRAM or a 32 GB unified-memory Mac you get the full experience. Below that, you trade quality (smaller quants) or speed (CPU offload), and this article tells you exactly which trade each GPU makes.</p>
<p>It matters because this model rewrote the local-AI baseline: 73.0 on Terminal Bench 2.1, 61.7 on SWE-bench Pro, native image and video input, and a 262,144-token context window — on hardware many readers already own. The deployment math is unusual, so let's do it once before the per-GPU configs.</p>

<h2>Why this model is cheaper on memory than it looks</h2>
<p>Qwen3.8-27B looks like a memory hog — 27B parameters at 16-bit would be roughly 54-56 GB. But only 16 of its 64 layers use conventional attention; the other 48 use Gated DeltaNet, a linear-attention variant that keeps a small fixed-size state instead of a growing KV cache. Community measurements put the KV cost at about <strong>64 KB per token</strong> — roughly a quarter of a conventional dense 27B — which is why a 262K context window is even discussable on consumer cards.</p>
<p>The practical consequence: your real constraint is weight size plus a modest KV budget. Get the weights to fit and context comes surprisingly cheap. Fail to fit them, and no flag saves you.</p>
<ul>
<li><strong>Full precision (BF16):</strong> ~55 GB — multi-GPU or 64 GB+ unified memory only.</li>
<li><strong>Q8/FP8:</strong> ~29-31 GB — one 32 GB card, or 48 GB Mac.</li>
<li><strong>4-bit (Q4/IQ4):</strong> ~14-18 GB depending on the exact quant — the sweet spot.</li>
<li><strong>3-bit and below:</strong> ~10-13 GB — quality drops, but 16 GB cards and 24-32 GB Macs come alive.</li>
</ul>

<h2>The quantization cheat sheet</h2>
<p>Community quantizers (Unsloth's Dynamic series is the current quality benchmark) publish measured file sizes. Two calibration points from side-by-side perplexity tests: Unsloth's UD-Q4_K_XL retains about 96% top-1 agreement with the original weights, and the quality curve is steep below ~14 GB and nearly flat above ~22 GB.</p>
<ul>
<li><strong>UD-Q4_K_XL / Q4_K_M:</strong> ~16.5-17.9 GB. The 24 GB default. Best size/quality balance.</li>
<li><strong>UD-IQ4_XS:</strong> ~14.3-15.1 GB. The 16 GB pick — 4-bit quality with actual context room.</li>
<li><strong>UD-Q3_K_XL:</strong> ~12.2-13.1 GB. Fits 16 GB with lots of context headroom; surprisingly close to Q4 in blind tests.</li>
<li><strong>UD-Q2_K_XL:</strong> ~9.2-9.8 GB. Emergency tier for 12 GB cards and 16 GB Macs. Read again before you rely on it.</li>
<li><strong>UD-Q6_K / Q8:</strong> 22-31 GB. For 32 GB cards and 48 GB+ Macs; measurable but small gains.</li>
</ul>

<h2>The one setting that ruins more setups than any GPU shortage</h2>
<p>Qwen3.8 thinks by default, at the most expensive effort level (<strong>xhigh</strong>). Left alone it will burn tens of thousands of reasoning tokens on a one-sentence question, then crash into the context ceiling and return an empty answer that looks like a runtime bug. Before optimizing anything else, set <code>reasoning_effort</code> to <code>medium</code> (near-free quality-wise) or <code>low</code>, and disable thinking entirely for simple requests via <code>enable_thinking: false</code>. Community tests show the xhigh default can cost 5-10x the tokens of the answer itself on trivial prompts.</p>
<p>Sampling profiles worth copying: thinking mode uses <code>temperature=1.0, top_p=0.95, top_k=20</code>; instruct mode uses <code>temperature=0.7, top_p=0.80, top_k=20</code> with a presence penalty of 1.5.</p>

<h2>Pick your path: the hardware tiers</h2>
<p>Speed expectations below come from published community benchmarks (llamabench.ai aggregates, Tom's Hardware, per-GPU deep dives), usually with llama.cpp and the model's built-in MTP speculative decoding. Your numbers will vary with context length and settings, but the orderings hold.</p>

<h3>Integrated graphics and 8 GB laptops: possible, not pleasant</h3>
<p>If your machine has only integrated graphics (AMD or Intel iGPU) or a discrete 8 GB laptop card, you will not fit a good quant in fast memory — the model will run mostly from system RAM no matter what you do. Two honest paths:</p>
<ul>
<li><strong>With 64 GB of system RAM:</strong> run the llama.cpp Vulkan or SYCL backend with a 2-bit to 3-bit quant (10-13 GB) and accept roughly <strong>3-8 tokens/second</strong>. Usable for patient single questions, painful for agent work.</li>
<li><strong>With 16-32 GB of RAM:</strong> even the small quants thrash. The realistic answer is a smaller model (a 7B-14B class, or a small MoE) and treating Qwen3.8-27B as a cloud/API experience. Fighting for 1-2 tokens/second is not worth your evening.</li>
</ul>
<p>On laptops specifically: an RTX 4060 Laptop (8 GB) or 5060 Laptop (8 GB) behaves like the integrated case above — expect single-digit tokens/second with Q2/Q3 quants and a short context. A 5070 Laptop (8 GB) lands in the same 3-5 t/s range reported by owners. If local AI matters to you, 16 GB of VRAM should be the minimum spec on your next machine.</p>

<h3>Mac (Apple Silicon): the quiet winner</h3>
<p>Unified memory changes the math — there is no separate VRAM pool, so the question is only how much RAM your machine carries and what else it needs. Use the MLX builds (via LM Studio or <code>mlx-lm</code>) rather than GGUF; they are consistently faster on Metal.</p>
<ul>
<li><strong>24 GB Mac (base M-series):</strong> 2-bit to 3-bit quants run, slowly (~5-8 t/s). Works for experiments, not for daily driving.</li>
<li><strong>32-36 GB:</strong> IQ4_XS/Q4_K_M (~15-16.5 GB) fits with a real context window; expect roughly 10-14 t/s depending on bandwidth.</li>
<li><strong>48 GB (M4 Pro class and up):</strong> Q4 fully resident, ~17 t/s; Q6/Q8 possible with tight context. This is the entry point we recommend.</li>
<li><strong>64-128 GB (M4/M5 Max, Studio):</strong> the comfortable home for this model — 27-30 t/s at 4-bit, Q8 available, and long-context sessions that behave.</li>
</ul>
<p>Set the MLX memory limit explicitly (the <code>wired_limit</code> in LM Studio or the env variable for <code>mlx-lm</code>) so macOS does not evict weights mid-session, and keep the context at 16-32K unless you specifically need more.</p>

<h3>16 GB desktop and laptop cards: 4060 Ti 16GB, 5060 Ti 16GB, 4070 Ti Super, 5080</h3>
<p>This is the tier where the model's linear-attention design earns its keep. The correct quant is <strong>UD-IQ4_XS (~14.3 GB)</strong> or <strong>UD-Q3_K_XL (~12.2 GB)</strong> — never Q4_K_M, which fills the card and starves the context.</p>
<ul>
<li><strong>4060 Ti 16GB / 5060 Ti 16GB:</strong> IQ4_XS at 16-32K context runs around 17-20 t/s with MTP; Q3_K_XL buys you 64K+ context at similar speed. The best value tier for this model.</li>
<li><strong>5080 (16 GB):</strong> one documented deep-dive runs UD-Q3_K_XL at a 90K context at <strong>130 t/s prefill / 33-57 t/s decode</strong> fully on-GPU by moving the display to the iGPU and quantizing the KV cache to q8_0/q4_0. With Q4-class quants expect 16-28 t/s decode depending on context.</li>
<li><strong>4080 / 4070 Ti Super (16 GB):</strong> similar recipe to the 5080, slightly lower numbers; the 4070 Ti Super's extra bandwidth helps at long context.</li>
</ul>
<p>Two 16 GB tricks worth stealing: move your display output to the integrated GPU (frees 300-500 MB of VRAM that Windows/Linux desktops hold), and quantize the KV cache (<code>--cache-type-k q8_0 --cache-type-v q8_0</code> in llama.cpp) — it roughly halves KV memory with no quality loss anyone has measured.</p>

<h3>12 GB cards (4070, 5070 desktop): the awkward middle</h3>
<p>Q4-class weights do not fit; Q3 barely does with almost no context. You are choosing between UD-Q3_K_XL at ~4-8K context (functional, cramped) or a 2-bit quant with real context but noticeably degraded quality (measured around 3-6 t/s). If this is your card, honestly evaluate whether Qwen3.6-27B at Q4 or a strong 14B model serves you better. The 27B is worth its memory demands.</p>

<h3>24 GB cards: 4070 Ti, 5070 Ti, 3090, 4090, 5090 Laptop</h3>
<p>This is the model's intended home and the config we recommend as default: <strong>UD-Q4_K_XL (17.9 GB) at 32K context, MTP speculative decoding on, KV cache at q4_0</strong>.</p>
<ul>
<li><strong>RTX 4090:</strong> ~46 t/s baseline decode, 125+ t/s with MTP speculative decoding — the fastest 24 GB card.</li>
<li><strong>RTX 3090:</strong> ~40 t/s baseline; with MTP and KV quantization the community has pushed sustained agentic workloads to ~60-114 t/s. The second-hand value king.</li>
<li><strong>5090 Laptop (24 GB):</strong> thermally limited versus the desktop 4090 but still solidly in the 30-40 t/s class — the right laptop choice if you want this model on the go.</li>
<li><strong>5070 Ti / 4070 Ti (16 GB variants excluded):</strong> note that the 5070 Ti desktop ships with 16 GB, not 24 — it belongs to the tier above. Only the 3090/4090/5090 Laptop here get the full Q4 experience.</li>
</ul>
<p>llama.cpp launcher for this tier:</p>
<pre><code>llama-server -m Qwen3.8-27B-UD-Q4_K_XL.gguf \
  -ngl 99 -fa on --jinja -c 32768 \
  --cache-type-k q4_0 --cache-type-v q4_0 \
  --spec-type draft-mtp --spec-draft-n-max 2 \
  --temp 1.0 --top-p 0.95 --top-k 20</code></pre>
<p>Measured on a 5090 (32 GB) this exact config delivers ~137 t/s decode at full quality; on a 4090 expect 80-125 t/s; on a 3090, 45-70 t/s.</p>

<h3>32 GB cards: 5080 Super, 5090 desktop</h3>
<p>The RTX 5090's 32 GB is the single fastest consumer way to run this model: <strong>UD-Q6_K (22 GB)</strong> or even Q8 fits with real context, and published benchmarks show 74-155 t/s decode depending on quant and speculation settings. The long-context picture is less rosy: at 256K, even a 5090 needs ~12 minutes for the first token — fine for batch document analysis, useless for chat. Keep interactive sessions at 64-128K.</p>

<h2>Setup walkthrough: the three runtimes worth using</h2>
<h3>Option 1: Ollama (simplest)</h3>
<pre><code># macOS/Linux/Windows
ollama run qwen3.8:27b          # 18 GB, Q4_K_M default, 256K context, vision enabled</code></pre>
<p>Ollama picks sensible defaults and handles the vision adapter automatically. For smaller cards pull a specific quant from Hugging Face instead: <code>ollama run hf.co/unsloth/Qwen3.8-27B-GGUF:UD-IQ4_XS</code>. The tradeoff: less control over KV cache quantization and MTP, which matter exactly on the 12-16 GB tiers.</p>
<h3>Option 2: LM Studio (best GUI, best for Mac MLX)</h3>
<p>Download the app, search for "Qwen3.8-27B", pick the quant matching your tier from the table above, and set the context slider to 16-32K. On Apple Silicon choose the MLX build. On Windows with NVIDIA, enable Flash Attention in the model settings and set GPU offload to maximum. Its per-model settings UI makes the reasoning_effort and context decisions visible, which is half the battle with this model.</p>
<h3>Option 3: llama.cpp (maximum control, fastest)</h3>
<pre><code># Linux build with CUDA
git clone https://github.com/ggml-org/llama.cpp && cd llama.cpp
cmake -B build -DGGML_CUDA=ON && cmake --build build -j --target llama-server

# download + serve in one line
./build/bin/llama-server -hf unsloth/Qwen3.8-27B-GGUF:UD-Q4_K_XL \
  -ngl 99 -fa on --jinja -c 32768 --port 8080</code></pre>
<p>The server exposes an OpenAI-compatible API at <code>localhost:8080</code> that anything — chat UIs, coding agents, your own scripts — can call. This is the runtime every benchmark above used; if you want the published numbers, use this path.</p>

<h2>Common failure modes, and their one-line fixes</h2>
<ul>
<li><strong>"The model loads but answers are empty or truncated":</strong> the default xhigh reasoning ate your context. Set <code>reasoning_effort: medium</code> or disable thinking.</li>
<li><strong>"Slower than the benchmarks":</strong> you are partially offloaded to CPU. Check the runtime log for the GPU-layer count; if it is not 99, your quant is too big — drop one tier.</li>
<li><strong>"Out of memory at 32K context":</strong> enable Flash Attention and quantize the KV cache to q8_0. If still OOM, drop to IQ4_XS.</li>
<li><strong>"Repetitive or incoherent output on old builds":</strong> llama.cpp builds before roughly b10450 produce fluent garbage from this architecture. Update.</li>
<li><strong>"Why is it thinking forever?":</strong> it is xhigh by default; see the first bullet.</li>
</ul>

<h2>Bottom line</h2>
<p>Qwen3.8-27B is the first model in its weight class where the deployment decision is genuinely interesting: the linear-attention architecture makes context cheap, so your only real decision is weight size against memory. A 16 GB card runs it well (IQ4_XS/Q3_K_XL, ~17-30 t/s). A 24 GB card runs it great (UD-Q4_K_XL + MTP, 40-125 t/s). A 32 GB card or 64 GB Mac runs it at full quality. Integrated graphics and 8 GB machines should wait — or run it in the cloud where it costs fractions of a cent.</p>
<p>Sources: Qwen official model card (Aug 2026), Unsloth GGUF documentation, llamabench.ai community aggregates, Tom's Hardware RTX 5090 benchmarking, mberatsanli/qwen38-27b-local (RTX 5080 deep dive), KGP Talkie 45-configuration llama.cpp sweep, AMD Day-0 support notes. Fact-checked 2026-09-11.</p>
