---
title: "How to Run Qwen3.5-9B Locally: From iGPU to RTX 5090, Every GPU Tier Covered"
date: '2026-09-11T12:00:00'
slug: run-qwen3-5-9b-locally-gpu-guide
description: "Qwen3.5-9B local setup for every hardware tier: integrated graphics, Mac, RTX 40/50 laptops and desktops, CPU-only. Correct quants, contexts, thinking-mode switches, and realistic speeds."
categories:
- ai-tutorials-how-tos
featured: /uploads/2026/09/run-qwen3-5-9b-locally-gpu-guide-hero.jpg
lang: en
translation_id: 20260911-9bgpu
---

<p>If the Qwen3.8-27B is the muscle car of local AI — brilliant but thirsty — the Qwen3.5-9B is the hot hatch: nearly as clever per dollar, and it starts on almost anything with a plug. Released March 2, 2026 under Apache 2.0, this 9B dense model pairs a hybrid Gated DeltaNet + Gated Attention architecture (only 8 of 32 layers carry a growing KV cache) with a native vision encoder, 262K context (YaRN-extended to ~1M), multi-token prediction, and 201 languages. The headline numbers: MMLU-Pro 82.5, GPQA Diamond 81.7, LiveCodeBench v6 65.6, MMMU-Pro 70.1 — beating the GPT-OSS-20B column in Qwen's own table on most rows while fitting in under 6 GB at 4-bit.</p>
<p>This guide gives every hardware tier a concrete answer: which quant to download, which context to set, what speed to expect, and the two or three switches that actually matter. All commands verified against the current llama.cpp/Ollama/MLX ecosystems.</p>

<h2>Know the model before you download it</h2>
<ul>
<li><strong>Hybrid attention = cheap context.</strong> The 8×(3×DeltaNet→1×Attention) layout means KV cache costs only ~32 KiB/token — a 32K context fits in ~1 GB, not the 8 GB a full-attention 9B would demand. This is why the model feels "impossible" on 8 GB cards.</li>
<li><strong>Natively multimodal.</strong> Text, images, and video from the same weights — no separate VL adapter. In llama.cpp you add the vision encoder with <code>--mmproj</code>; in Ollama and MLX builds it's baked in.</li>
<li><strong>Thinking is OFF by default in GGUF builds.</strong> Unlike the 27B (which thinks by default and eats your context), the small-model GGUF template ships with <code>enable_thinking</code> undefined, which renders an empty think block. Turn it on with <code>--chat-template-kwargs '{"enable_thinking":true}'</code>. Sampling per Qwen: thinking = temp 0.6/top_p 0.95/top_k 20; non-thinking = temp 0.7/top_p 0.8/top_k 20. Qwen3's <code>/no_think</code> soft switch does NOT work on 3.5.</li>
<li><strong>Dense means all 9B run per token.</strong> Unlike the 35B-A3B MoE (3B active), you pay full bytes per token — speed scales purely with memory bandwidth. That's the physics behind every number below.</li>
</ul>

<h2>Quant selection: the whole ladder, honestly</h2>
<p>From the Unsloth Dynamic 2.0 GGUF repo (the reference conversions):</p>
<ul>
<li><strong>UD-Q4_K_XL / Q4_K_M (~5.3–5.7 GB)</strong> — the default for a reason. Perplexity +3.5% vs FP16, MMLU −1.4, GSM8K −2.7. Fits 8 GB cards with room for context.</li>
<li><strong>Q5_K_M (~6.6 GB) / Q6_K (~7.4–7.6 GB)</strong> — the 12 GB tier's picks. Q6 is effectively lossless (+0.4% PPL).</li>
<li><strong>Q8_0 (~9.5 GB)</strong> — reference quality (+0.05% PPL). The 16 GB sweet spot; also correct for 12 GB cards that want max fidelity over context.</li>
<li><strong>UD-Q3_K_XL (~4.5 GB)</strong> — the 6 GB escape hatch. +8% PPL is a real hit; acceptable for chat, painful for code.</li>
<li><strong>UD-Q2_K_XL / IQ2 (~3.2–3.7 GB)</strong> — last resort. +18% PPL, GSM8K −24. On a 9B this is noticeably damaged; treat as an experiment.</li>
</ul>
<p>One rule to remember: <strong>at equal memory, a higher-quant smaller model beats a lower-quant bigger one</strong>. A Q8 9B outperforms a Q3 27B at the same ~9 GB footprint — the 27B has no room left for context.</p>

<h2>Hardware tiers: what to run and what to expect</h2>

<h3>Integrated graphics / CPU-only (no discrete GPU)</h3>
<p><strong>Verdict: works, with calibrated patience.</strong> The model runs from system RAM via llama.cpp Vulkan/CPU.</p>
<ul>
<li>16 GB RAM machine: UD-Q3_K_XL (4.5 GB), 4–8K context, expect <strong>2–5 tok/s</strong> on DDR4, 5–8 on DDR5.</li>
<li>32 GB RAM: Q4_K_M, 8K context, ~5–10 tok/s depending on RAM speed. Bandwidth is everything — DDR5-6000 vs DDR4-2666 is roughly a 2× gap.</li>
<li>Modern iGPU (Radeon 780M/8060S, Intel Arc): Vulkan backend, Q4_K_M. Ryzen AI MAX 395-class hardware measures ~32 tok/s at Q4_K_M — genuinely usable. Ordinary laptop iGPUs land in the 5–12 tok/s range.</li>
</ul>

<h3>8 GB VRAM (RTX 4060/4070 Laptop, 5060, old 1070/1070 Ti-class)</h3>
<p><strong>Verdict: the surprise sweet spot — this model was practically tuned for these cards.</strong></p>
<ul>
<li>Quant: UD-Q4_K_XL (~5.3 GB). All 32 layers on GPU (<code>-ngl 99</code>), ~2 GB left for KV and vision.</li>
<li>Context: 8–16K comfortable; with llama.cpp's TurboQuant KV (q8_0 KV cache + flash attention) you can push 32K+ and even spill context to system RAM — the hybrid architecture makes this cheap (~32 KiB/token).</li>
<li>Speed: ~19–29 tok/s measured class on 4060 8GB; older 1070-class cards land lower (~12–15) via CUDA on Pascal — still usable.</li>
<li>Community consensus: "Qwen3.5:9b running on 8GB VRAM is insane" — it's the best-quality model that fully fits these cards.</li>
</ul>

<h3>12 GB VRAM (RTX 3060 12GB, 4070, 5070, 4080 Laptop)</h3>
<p><strong>Verdict: the comfort tier.</strong> Q6_K (7.4 GB) for coding/reasoning precision or Q8_0 (9.5 GB) for near-lossless — both fit with 16–32K context. Expect <strong>30–48 tok/s</strong>. Measured reference: RTX 4070 Ti 12GB runs the 9B comfortably; laptop 4080-class ~48 tok/s at Q6.</p>

<h3>16 GB VRAM (4060 Ti 16GB, 5060 Ti 16GB, 5080, 4080)</h3>
<p><strong>Verdict: reference-quality everything.</strong> Q8_0 + 32K context + vision projector loaded, still ~4 GB spare. Expect <strong>~19 tok/s measured on 4060 Ti 16GB at Q8</strong> (288 GB/s bandwidth card), scaling to 45–60 tok/s on 4080/5080-class bandwidth. This is also the tier where the model makes an excellent always-on coding agent via <code>llama-server</code> + OpenAI-compatible API.</p>

<h3>24 GB VRAM (3090, 4090, 5090 Laptop)</h3>
<p><strong>Verdict: overkill, gloriously so.</strong> Q8_0, 128K+ context, vision loaded. Measured: <strong>~60 tok/s on 4090 at Q8_0</strong>, ~92 at Q4_K_M. At this tier consider running the 9B as a fast agent/summarizer alongside a 27B for heavy reasoning — the two complement each other.</p>

<h3>32 GB (5090) and beyond</h3>
<p>RTX 5090: <strong>~80 tok/s at Q8_0, ~122 at Q4_K_M</strong>. Server-class Blackwell datacenter cards do 200+ but nobody buying a 5090 needs to hear that. The 9B at this tier is a latency toy — sub-15ms first-token for agent loops.</p>

<h3>Mac (Apple Silicon)</h3>
<p><strong>Verdict: MLX first, GGUF second.</strong></p>
<ul>
<li>16 GB Mac (M4 base class): MLX 4-bit (~5.6 GB disk, ~6.2 GB peak). Measured <strong>~20 tok/s on M4 10-core</strong> — about right for 120 GB/s bandwidth. Usable for chat; batch 4× hits ~65–79 tok/s aggregate.</li>
<li>24–36 GB (M4 Pro/Max, M3 Pro): 8-bit MLX (~9.6 GB) is near-lossless; expect 25–35 tok/s single-stream. This is the best local assistant hardware-per-dollar in the ecosystem right now.</li>
<li>48 GB+ (M Max/Ultra): Q8 or BF16, and you can run the 9B as a background service alongside bigger models.</li>
</ul>
<p>mlx-community/Qwen3.5-9B-MLX-4bit is the standard conversion; mlx-works/oQ4e-mtp adds native MTP acceleration (43.5 tok/s on M5 Air-class hardware with TurboQuant KV).</p>

<h2>Serving: the three commands that matter</h2>
<p><strong>llama.cpp (recommended, most control):</strong></p>
<pre><code>llama-server -hf unsloth/Qwen3.5-9B-GGUF:UD-Q4_K_XL \
  --mmproj unsloth/Qwen3.5-9B-GGUF:mmproj-F16.gguf \
  -ngl 99 -c 32768 --port 8080 \
  --chat-template-kwargs '{"enable_thinking":true}'</code></pre>
<p><strong>Ollama (easiest):</strong> <code>ollama run qwen3.5:9b</code> — pulls a 6.6 GB Q4_K_M with vision baked in. Note: Ollama's Qwen3.5 support has had documented performance regressions vs raw llama.cpp (CPU-fallback bugs, 30–60% slower decode on some builds); if speed matters, prefer llama.cpp directly.</p>
<p><strong>vLLM (serving, 24 GB+):</strong> <code>vllm serve Qwen/Qwen3.5-9B --max-model-len 262144 --reasoning-parser qwen3</code> — add <code>--speculative-config '{"method":"qwen3_next_mtp","num_speculative_tokens":2}'</code> for MTP, or <code>--language-model-only</code> to skip the vision encoder and free KV memory.</p>

<h2>Uncensored variants: what exists for the 9B</h2>
<p>The 9B has a lighter uncensoring ecosystem than the 27B — fewer variants, less forensic scrutiny — but the options are real:</p>
<ul>
<li><strong>Huihui-ai abliterated</strong> — the classic method, in safetensors/GGUF/MLX-4bit. Community testing found the Ollama <code>huihui_ai/qwen3.5-abliterated</code> build "NOT actually uncensored" — prefer the HuggingFace files directly.</li>
<li><strong>HauhauCS Aggressive (0/465 claimed)</strong> — same Aggressive profile as the 27B line, GGUF Q4_K_M (5.3 GB) through BF16 (17 GB), vision encoder included. Same caveat as always: the claims are louder than the documentation.</li>
<li><strong>lukey03 abliterated + QLoRA</strong> — the most documented small-model approach: 3-pass abliteration killed 13/18 test refusals; a tiny QLoRA pass (20 examples, 45 seconds on an H100) cleared the remaining 5 stubborn categories. 18/18 post-merge, beating Dolphin-Mistral 7B on the same benchmark.</li>
</ul>
<p>The selection framework from our 27B guide applies unchanged — prefer publishers who document KL and capability deltas, run Q5+ when you can, verify behavior at your actual quant, and diff any chat template against stock. The 9B is more sensitive to quant-level behavior drift than the 27B (less redundancy per layer), so "verify at your quant" matters double here.</p>

<h2>Common failure modes</h2>
<ul>
<li><strong>"Slower than advertised":</strong> you're on Ollama with a known Qwen3.5 regression, or your context is set to 262K (KV cache spilling to RAM). Set 8–32K explicitly.</li>
<li><strong>"Thinking won't turn off":</strong> known llama.cpp issue #20182 — <code>enable_thinking:false</code> in request payloads gets silently ignored on some builds. Workaround: <code>--reasoning-budget 0</code> at server start, or the chat-template-kwargs form.</li>
<li><strong>"Images don't work":</strong> you forgot <code>--mmproj</code>, or mixed an F16 projector with a BF16 model (n_embd mismatch error). Match the projector dtype to the text model.</li>
<li><strong>"OOM at 262K context":</strong> marketing context vs physical context. The hybrid cache is cheap but not free (~32 KiB/token → 262K ≈ 8 GB of cache alone). Budget context like VRAM, not like a wish.</li>
</ul>

<h2>Which tier should you buy / run?</h2>
<p>The 9B's honest positioning in September 2026: it is <strong>the best model that fully fits 8 GB</strong>, the <strong>best quality-per-watt always-on assistant for 12–16 GB</strong>, and a <strong>latency play for 24 GB+</strong> rigs that also own a bigger model. If you have 16 GB+ and want maximum capability per query, the 27B guide's recommendations stand — but for agents, routers, classification, vision OCR, and anything where tokens/second and RAM footprint dominate, the 9B is the smart money.</p>

<h2>Sources & further reading</h2>
<ul>
<li>Official weights: <a href="https://huggingface.co/Qwen/Qwen3.5-9B" rel="nofollow noopener" target="_blank">Qwen/Qwen3.5-9B</a> (Apache 2.0, released 2026-03-02)</li>
<li>GGUF reference: <a href="https://huggingface.co/unsloth/Qwen3.5-9B-GGUF" rel="nofollow noopener" target="_blank">unsloth/Qwen3.5-9B-GGUF</a>; setup guide <a href="https://unsloth.ai/docs/models/qwen3.5" rel="nofollow noopener" target="_blank">unsloth.ai/docs/models/qwen3.5</a></li>
<li>MLX: <a href="https://huggingface.co/mlx-community/Qwen3.5-9B-MLX-4bit" rel="nofollow noopener" target="_blank">mlx-community/Qwen3.5-9B-MLX-4bit</a></li>
<li>Speed tables: <a href="https://willitrunai.com/blog/qwen-3-5-quantization-speed-comparison" rel="nofollow noopener" target="_blank">willitrunai quantization speed comparison</a>; <a href="https://baem1n.dev/en/posts/llm-bench-03-results-tables" rel="nofollow noopener" target="_blank">baem1n 4-machine × 5-engine benchmark</a></li>
<li>Quant-vs-quality PPL tables: <a href="https://techplained.com/qwen-3-5-gguf-quantization" rel="nofollow noopener" target="_blank">techplained GGUF quantization guide</a></li>
<li>Thinking-mode issue: <a href="https://github.com/ggml-org/llama.cpp/issues/20182" rel="nofollow noopener" target="_blank">llama.cpp #20182</a>; Ollama regression: <a href="https://github.com/ollama/ollama/issues/14579" rel="nofollow noopener" target="_blank">ollama #14579</a></li>
</ul>
