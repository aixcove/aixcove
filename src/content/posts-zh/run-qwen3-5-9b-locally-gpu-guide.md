---
title: Qwen3.5-9B本地部署指南：从核显到RTX 5090，每一档显卡都有答案
date: '2026-09-11T12:00:00'
slug: run-qwen3-5-9b-locally-gpu-guide
description: Qwen3.5-9B本地部署全攻略：核显、纯CPU、Mac、RTX 40/50系笔记本与台式机，每档给出量化版本、上下文设置、thinking开关和真实速度预期。
categories:
- ai-tutorials-how-tos
featured: /uploads/2026/09/run-qwen3-5-9b-locally-gpu-guide-hero.jpg
lang: zh
translation_id: 20260911-9bgpu
---

<p>Qwen3.8-27B能力强，对硬件的要求也高。相比之下，Qwen3.5-9B更适合手头设备有限、又想跑个好用的本地模型的人，按部署成本看，能力并没有差多少，能跑它的设备却多得多。这个9B稠密模型于2026年3月2日以Apache 2.0协议开源，采用Gated DeltaNet + Gated Attention混合架构，32层里只有8层需要KV缓存。它还内置原生视觉编码器，支持262K上下文（YaRN可扩到约1M）、多token预测和201种语言。基准成绩分别为MMLU-Pro 82.5、GPQA Diamond 81.7、LiveCodeBench v6 65.6、MMMU-Pro 70.1。在Qwen自己的对比表里，多数项目的得分高于GPT-OSS-20B，4-bit量化后占用的显存还不到6 GB。</p>
<p>下面按硬件档位给出量化版本和上下文设置，再说明大致速度，以及部署时需要调整的开关。文中的命令已对照当前llama.cpp/Ollama/MLX生态核实。</p>

<h2>下载前，先弄清这几个特点</h2>
<ul>
<li><strong>混合注意力让上下文更省显存。</strong>8×(3×DeltaNet→1×Attention)的布局把KV缓存开销压到了约32 KiB/token。32K上下文只需约1 GB，全注意力9B则要8 GB。它能在8 GB显卡上跑起来，主要就靠这里省下的空间。</li>
<li><strong>原生支持多模态。</strong>同一套权重可以直接处理文本、图片和视频，不需要另装VL适配器。llama.cpp通过<code>--mmproj</code>加载视觉编码器；Ollama和MLX版本已经内置。</li>
<li><strong>GGUF版默认关闭thinking。</strong>27B默认开启思考，容易占满上下文；小模型的GGUF模板则没有定义<code>enable_thinking</code>，渲染后得到的是空think块。要开启思考，使用<code>--chat-template-kwargs '{"enable_thinking":true}'</code>。采样参数按官方建议设置，thinking = temp 0.6/top_p 0.95/top_k 20；非thinking = temp 0.7/top_p 0.8/top_k 20。Qwen3的<code>/no_think</code>软开关在3.5上不管用。</li>
<li><strong>稠密模型每生成一个token都要跑满9B。</strong>35B-A3B这类MoE模型只激活3B参数，9B稠密模型每个token都要用到全部参数，速度受内存带宽制约。看下面的速度数据时，要把带宽放在心上。</li>
</ul>

<h2>量化版本怎么选，各档损失有多大</h2>
<p>以下以Unsloth Dynamic 2.0 GGUF仓库（基准转换版）为准。</p>
<ul>
<li><strong>UD-Q4_K_XL / Q4_K_M（约5.3–5.7 GB）</strong>适合作为默认选择。相较FP16，困惑度+3.5%，MMLU −1.4，GSM8K −2.7。8 GB显卡装下模型后，还能留出空间给上下文。</li>
<li><strong>Q5_K_M（约6.6 GB）/ Q6_K（约7.4–7.6 GB）</strong>适合12 GB显存。Q6基本无损，困惑度+0.4%。</li>
<li><strong>Q8_0（约9.5 GB）</strong>接近基准质量，困惑度+0.05%。16 GB显卡选它比较合适；12 GB显卡如果更看重保真度，也可以选它，少留一些上下文空间。</li>
<li><strong>UD-Q3_K_XL（约4.5 GB）</strong>是6 GB显存下的折中选择。困惑度+8%，能力损失已经比较明显，聊天还能接受，写代码就容易难受。</li>
<li><strong>UD-Q2_K_XL / IQ2（约3.2–3.7 GB）</strong>只在实在装不下时考虑。困惑度+18%，GSM8K −24，对9B来说损伤很大，更适合拿来做实验。</li>
</ul>
<p>选择时可以记住，<strong>同等内存预算下，优先选量化精度更高的小模型，别硬塞低精度的大模型。</strong>同样占用约9 GB，Q8的9B胜过Q3的27B，后者连上下文需要的空间都留不出来。</p>

<h2>按硬件选配置，速度大致能到多少</h2>

<h3>核显 / 纯CPU（无独立显卡）</h3>
<p><strong>能跑，只是生成时得多等一会儿。</strong>通过llama.cpp的Vulkan/CPU后端，模型可以从系统内存中运行。</p>
<ul>
<li>16 GB内存机器选UD-Q3_K_XL（4.5 GB），上下文设为4–8K。DDR4预期<strong>2–5 tok/s</strong>，DDR5为5–8 tok/s。</li>
<li>32 GB内存可以选Q4_K_M，配8K上下文，速度约5–10 tok/s，具体看内存频率。内存带宽影响很大，DDR5-6000与DDR4-2666的差距约2倍。</li>
<li>较新的iGPU，如Radeon 780M/8060S、Intel Arc，可以用Vulkan后端 + Q4_K_M。Ryzen AI MAX 395这一级别实测Q4_K_M约32 tok/s，已经够日常使用。普通笔记本核显一般在5–12 tok/s。</li>
</ul>

<h3>8 GB显存（RTX 4060/4070 Laptop、5060、老1070/1070 Ti这一类）</h3>
<p><strong>8 GB是很适合跑这个模型的一档，不必为了用它急着换卡。</strong></p>
<ul>
<li>量化选UD-Q4_K_XL（约5.3 GB），用<code>-ngl 99</code>把32层全部放进GPU，还剩约2 GB留给KV缓存和视觉部分。</li>
<li>上下文设为8–16K比较宽裕。开启llama.cpp的TurboQuant KV（q8_0 KV缓存+flash attention）后，可以推到32K以上，甚至把超出显存容量的上下文放到系统内存。混合架构的缓存开销较小，约32 KiB/token，这样做的代价也低一些。</li>
<li>4060 8GB的实测速度约19–29 tok/s；老1070级显卡使用Pascal CUDA，速度低一些，约12–15 tok/s，仍然能用。</li>
<li>社区对它的评价很一致，有人直接说“Qwen3.5:9b running on 8GB VRAM is insane”。在能完整装进这些显卡的模型中，它的质量最高。</li>
</ul>

<h3>12 GB显存（RTX 3060 12GB、4070、5070、4080 Laptop）</h3>
<p><strong>到12 GB，量化和上下文都好安排了。</strong>注重编码和推理精度，可以选Q6_K（7.4 GB）；想要接近无损，就选Q8_0（9.5 GB）。两者都能装下16–32K上下文，预期速度为<strong>30–48 tok/s</strong>。作为实测参照，RTX 4070 Ti 12GB跑9B比较轻松，4080 Laptop级硬件跑Q6约48 tok/s。</p>

<h3>16 GB显存（4060 Ti 16GB、5060 Ti 16GB、5080、4080）</h3>
<p><strong>这一档可以用基准级质量，上下文和视觉也不用取舍。</strong>Q8_0 + 32K上下文 + 视觉投影器，装完还剩约4 GB。不过，显存够大不代表速度一定快。<strong>4060 Ti 16GB跑Q8实测约19 tok/s</strong>，它的带宽是288 GB/s；4080/5080级显卡带宽更高，速度可到45–60 tok/s。16 GB也很适合把它作为常驻编码agent，使用<code>llama-server</code>提供OpenAI兼容API即可。</p>

<h3>24 GB显存（3090、4090、5090 Laptop）</h3>
<p><strong>24 GB跑9B已经相当宽裕。</strong>可以用Q8_0，开128K+上下文，视觉也全开。实测<strong>4090跑Q8_0约60 tok/s</strong>，Q4_K_M约92 tok/s。这一档更适合让9B负责需要快速响应的agent任务和摘要，把重型推理交给27B，两个模型搭配使用。</p>

<h3>32 GB（5090）及以上</h3>
<p>RTX 5090跑<strong>Q8_0约80 tok/s，Q4_K_M约122</strong>。数据中心Blackwell卡能到200+ tok/s，不过对准备买5090的人来说，前面的数据更有参考价值。9B在这一档的主要用途是压低延迟，agent循环里的首token延迟不到15毫秒。</p>

<h3>Mac（Apple Silicon）</h3>
<p><strong>优先用MLX，其次考虑GGUF。</strong></p>
<ul>
<li>16 GB Mac（M4基础级）选MLX 4-bit，磁盘占用约5.6 GB，峰值内存约6.2 GB。M4 10核实测<strong>约20 tok/s</strong>，符合120 GB/s带宽下的预期，日常聊天够用；4并发的聚合速度能到65–79 tok/s。</li>
<li>24–36 GB（M4 Pro/Max、M3 Pro）可以用8-bit MLX（约9.6 GB），质量接近无损，单流预期25–35 tok/s。按花费能换来的本地助手性能看，这是当前生态里性价比最高的一档。</li>
<li>48 GB+（M Max/Ultra）跑Q8或BF16都很宽裕，还能让9B作为后台服务，与大模型一起运行。</li>
</ul>
<p>mlx-community/Qwen3.5-9B-MLX-4bit是标准转换版；mlx-works/oQ4e-mtp带原生MTP加速，在M5 Air级硬件+TurboQuant KV的配置下，实测43.5 tok/s。</p>

<h2>部署时用到的三条主要命令</h2>
<p><strong>llama.cpp，可调项最多，优先推荐。</strong></p>
<pre><code>llama-server -hf unsloth/Qwen3.5-9B-GGUF:UD-Q4_K_XL \
  --mmproj unsloth/Qwen3.5-9B-GGUF:mmproj-F16.gguf \
  -ngl 99 -c 32768 --port 8080 \
  --chat-template-kwargs '{"enable_thinking":true}'</code></pre>
<p><strong>Ollama，操作最省事。</strong>运行<code>ollama run qwen3.5:9b</code>，会下载一个6.6 GB的Q4_K_M，已内置视觉支持。不过，Ollama的Qwen3.5支持存在有公开记录的性能回退问题，包括CPU回退bug，部分版本的解码速度比原生llama.cpp慢30–60%。在意速度的话，直接用llama.cpp。</p>
<p><strong>vLLM，适合24 GB+的服务端。</strong>运行<code>vllm serve Qwen/Qwen3.5-9B --max-model-len 262144 --reasoning-parser qwen3</code>，加上<code>--speculative-config '{"method":"qwen3_next_mtp","num_speculative_tokens":2}'</code>即可开启MTP；也可以加<code>--language-model-only</code>跳过视觉编码器，为KV缓存省出内存。</p>

<h2>9B有哪些无审查版本</h2>
<p>9B的无审查版本比27B少，相关的取证和验证也没那么充分。目前可以考虑以下几种。</p>
<ul>
<li><strong>Huihui-ai abliterated</strong>采用经典方法，提供safetensors/GGUF/MLX-4bit。社区实测发现，Ollama上的<code>huihui_ai/qwen3.5-abliterated</code>仍有拒绝行为，没有完全去除限制，直接下载HuggingFace上的文件更靠谱。</li>
<li><strong>HauhauCS Aggressive（宣称0/465拒绝）</strong>沿用27B产品线的Aggressive方案，GGUF从Q4_K_M（5.3 GB）到BF16（17 GB）都有，并带有视觉编码器。不过，它的宣传很积极，文档没跟上。</li>
<li><strong>lukey03 abliterated + QLoRA</strong>是小模型中记录最完整的一种做法。先做3遍abliteration，消除18条测试拒绝中的13条，再做一小段QLoRA，用20条样本在H100上训练45秒，处理剩下5个顽固类别。合并后达到18/18，在同一基准上超过Dolphin-Mistral 7B。</li>
</ul>
<p>27B指南里的选型建议在这里同样适用。优先选公布KL和能力变化的发布者，量化尽量用Q5以上。下载后，把聊天模板与原版做diff，再用实际准备部署的量化档位验证行为。9B每层的冗余更少，量化引起的行为漂移比27B更明显，因此不能只看发布者在其他精度下的测试结果，更要在自己的量化版本上重测。</p>

<h2>常见翻车点</h2>
<ul>
<li><strong>“比宣传的慢”</strong>可能是碰到了Ollama的已知性能回退，也可能是上下文设到了262K，KV缓存溢出到系统内存。先把上下文显式设为8–32K。</li>
<li><strong>“thinking关不掉”</strong>对应llama.cpp的已知问题#20182。部分版本会静默忽略请求载荷中的<code>enable_thinking:false</code>。可以在服务启动时加<code>--reasoning-budget 0</code>，或者改用chat-template-kwargs形式。</li>
<li><strong>“图片不好使”</strong>先检查有没有加<code>--mmproj</code>，再看是否把F16投影器配给了BF16模型，这会报n_embd不匹配。投影器精度要与文本模型一致。</li>
<li><strong>“262K上下文OOM”</strong>模型支持262K，不代表显存一定装得下。混合架构的缓存开销较低，但仍要占空间，约32 KiB/token → 262K光缓存就约8 GB。设置上下文前，先把这部分显存算进去。</li>
</ul>

<h2>该买哪档硬件，手头设备该跑哪档？</h2>
<p>截至2026年9月，9B适合承担的任务已经很清楚。它是<strong>能完整装进8 GB显存的最好模型</strong>；在12–16 GB上，它适合做<strong>单位功耗下模型质量最高的常驻助手</strong>；到了24 GB+平台，与大模型同时运行时，它则负责<strong>需要低延迟的任务</strong>。如果你有16 GB+显存，更看重单次回答的能力上限，仍可按27B指南里的推荐选。但如果主要用途是agent、路由、分类或视觉OCR，更在意token生成速度和内存占用，9B会是更划算的选择。</p>

<h2>来源与延伸阅读</h2>
<ul>
<li>官方权重 <a href="https://huggingface.co/Qwen/Qwen3.5-9B" rel="nofollow noopener" target="_blank">Qwen/Qwen3.5-9B</a>（Apache 2.0，2026-03-02发布）</li>
<li>GGUF基准版 <a href="https://huggingface.co/unsloth/Qwen3.5-9B-GGUF" rel="nofollow noopener" target="_blank">unsloth/Qwen3.5-9B-GGUF</a>；官方指南 <a href="https://unsloth.ai/docs/models/qwen3.5" rel="nofollow noopener" target="_blank">unsloth.ai/docs/models/qwen3.5</a></li>
<li>MLX <a href="https://huggingface.co/mlx-community/Qwen3.5-9B-MLX-4bit" rel="nofollow noopener" target="_blank">mlx-community/Qwen3.5-9B-MLX-4bit</a></li>
<li>速度数据 <a href="https://willitrunai.com/blog/qwen-3-5-quantization-speed-comparison" rel="nofollow noopener" target="_blank">willitrunai量化速度对比</a>；<a href="https://baem1n.dev/en/posts/llm-bench-03-results-tables" rel="nofollow noopener" target="_blank">baem1n四机×五引擎基准</a></li>
<li>量化质量PPL表 <a href="https://techplained.com/qwen-3-5-gguf-quantization" rel="nofollow noopener" target="_blank">techplained GGUF量化指南</a></li>
<li>thinking开关问题 <a href="https://github.com/ggml-org/llama.cpp/issues/20182" rel="nofollow noopener" target="_blank">llama.cpp #20182</a>；Ollama回退问题 <a href="https://github.com/ollama/ollama/issues/14579" rel="nofollow noopener" target="_blank">ollama #14579</a></li>
</ul>
