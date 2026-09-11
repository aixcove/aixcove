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

<p>如果说Qwen3.8-27B是本地AI里的肌肉车——强悍但费油——那Qwen3.5-9B就是小钢炮：单位价格下的聪明程度不差多少，而且几乎什么设备都能点着火。2026年3月2日以Apache 2.0开源，这个9B稠密模型把混合Gated DeltaNet + Gated Attention架构（32层里只有8层背KV缓存）和原生视觉编码器、262K上下文（YaRN可扩到约1M）、多token预测、201种语言打包在一起。成绩单：MMLU-Pro 82.5、GPQA Diamond 81.7、LiveCodeBench v6 65.6、MMMU-Pro 70.1——在Qwen自家表格里大多数行压过GPT-OSS-20B一列，而4-bit量化后塞进不到6 GB显存。</p>
<p>这篇指南给每一档硬件一个具体答案：下哪个量化、设多大上下文、预期什么速度、哪几个开关真正要动。所有命令对照当前llama.cpp/Ollama/MLX生态核实过。</p>

<h2>下载之前先认识这个模型</h2>
<ul>
<li><strong>混合注意力 = 上下文便宜。</strong>8×(3×DeltaNet→1×Attention)的布局让KV缓存只花约32 KiB/token——32K上下文只要约1 GB，而不是全注意力9B要的8 GB。这就是它在8 GB卡上"不可能地能跑"的原因。</li>
<li><strong>原生多模态。</strong>同一套权重直接吃文本、图片、视频——不需要单独的VL适配器。llama.cpp里用<code>--mmproj</code>挂视觉编码器；Ollama和MLX版本直接内置。</li>
<li><strong>GGUF版thinking默认关闭。</strong>和27B（默认思考、吃光你的上下文）不同，小模型GGUF模板里<code>enable_thinking</code>未定义，渲染出来是空think块。用<code>--chat-template-kwargs '{"enable_thinking":true}'</code>打开。采样参数照官方：thinking = temp 0.6/top_p 0.95/top_k 20；非thinking = temp 0.7/top_p 0.8/top_k 20。Qwen3的<code>/no_think</code>软开关在3.5上不好使。</li>
<li><strong>稠密 = 每token跑满9B。</strong>不像35B-A3B那种MoE（3B激活），每个token你付全款——速度纯粹随内存带宽走。这是下面每个数字背后的物理规律。</li>
</ul>

<h2>量化选择：整条阶梯，诚实地说</h2>
<p>以Unsloth Dynamic 2.0 GGUF仓库（基准转换版）为准：</p>
<ul>
<li><strong>UD-Q4_K_XL / Q4_K_M（约5.3–5.7 GB）</strong>——默认之选有它的道理。对FP16困惑度+3.5%，MMLU −1.4，GSM8K −2.7。8 GB卡装下还留余量给上下文。</li>
<li><strong>Q5_K_M（约6.6 GB）/ Q6_K（约7.4–7.6 GB）</strong>——12 GB档的选择。Q6基本无损（困惑度+0.4%）。</li>
<li><strong>Q8_0（约9.5 GB）</strong>——基准级质量（+0.05%困惑度）。16 GB的甜点；12 GB卡想要最高保真、少点上下文也选它。</li>
<li><strong>UD-Q3_K_XL（约4.5 GB）</strong>——6 GB档的逃生口。+8%困惑度是实打实的损失；聊天能接受，写代码很痛。</li>
<li><strong>UD-Q2_K_XL / IQ2（约3.2–3.7 GB）</strong>——最后手段。+18%困惑度，GSM8K −24。9B上这个档位损伤明显，当实验品对待。</li>
</ul>
<p>记住一条规则：<strong>同等内存下，高量化的模型胜过低量化的大模型。</strong>Q8的9B在同约9 GB脚底下胜过Q3的27B——后者连上下文的地盘都不剩。</p>

<h2>硬件分档：跑什么、预期什么</h2>

<h3>核显 / 纯CPU（无独立显卡）</h3>
<p><strong>结论：能跑，但要校准耐心。</strong>模型经llama.cpp的Vulkan/CPU从系统内存运行。</p>
<ul>
<li>16 GB内存机器：UD-Q3_K_XL（4.5 GB），4–8K上下文，DDR4预期<strong>2–5 tok/s</strong>，DDR5 5–8。</li>
<li>32 GB内存：Q4_K_M，8K上下文，约5–10 tok/s，看内存频率。带宽就是一切——DDR5-6000对DDR4-2666差距约2倍。</li>
<li>新一点的iGPU（Radeon 780M/8060S、Intel Arc）：Vulkan后端 + Q4_K_M。Ryzen AI MAX 395这个级别实测Q4_K_M约32 tok/s——真的能用。普通笔记本核显落在5–12 tok/s。</li>
</ul>

<h3>8 GB显存（RTX 4060/4070 Laptop、5060、老1070/1070 Ti这一类）</h3>
<p><strong>结论：意外的甜点档——这个模型简直是为这些卡调的。</strong></p>
<ul>
<li>量化：UD-Q4_K_XL（约5.3 GB）。32层全进GPU（<code>-ngl 99</code>），剩约2 GB给KV和视觉。</li>
<li>上下文：8–16K舒服；开llama.cpp的TurboQuant KV（q8_0 KV缓存+flash attention）可以推到32K以上，甚至把上下文溢出到系统内存——混合架构让这招很便宜（约32 KiB/token）。</li>
<li>速度：4060 8GB实测档约19–29 tok/s；老的1070级走Pascal CUDA低一些（约12–15）——依然可用。</li>
<li>社区共识："Qwen3.5:9b running on 8GB VRAM is insane"——这是能完整塞进这些卡的最高质量模型。</li>
</ul>

<h3>12 GB显存（RTX 3060 12GB、4070、5070、4080 Laptop）</h3>
<p><strong>结论：舒适档。</strong>Q6_K（7.4 GB）换编码/推理精度，或Q8_0（9.5 GB）换近无损——都装得下16–32K上下文。预期<strong>30–48 tok/s</strong>。实测参照：RTX 4070 Ti 12GB跑9B很从容；4080 Laptop级Q6约48 tok/s。</p>

<h3>16 GB显存（4060 Ti 16GB、5060 Ti 16GB、5080、4080）</h3>
<p><strong>结论：基准级质量，什么都开。</strong>Q8_0 + 32K上下文 + 视觉投影器，还剩约4 GB。预期<strong>4060 Ti 16GB Q8实测约19 tok/s</strong>（288 GB/s带宽的卡），4080/5080级带宽上到45–60 tok/s。这一档也是拿它当常驻编码agent的最佳位置：<code>llama-server</code> + OpenAI兼容API。</p>

<h3>24 GB显存（3090、4090、5090 Laptop）</h3>
<p><strong>结论：性能过剩，但过剩得很爽。</strong>Q8_0、128K+上下文、视觉全开。实测：<strong>4090 Q8_0约60 tok/s</strong>，Q4_K_M约92。这一档的正确玩法是把9B当快agent/摘要器，和27B重型推理搭配用——两个正好互补。</p>

<h3>32 GB（5090）及以上</h3>
<p>RTX 5090：<strong>Q8_0约80 tok/s，Q4_K_M约122</strong>。数据中心Blackwell卡能到200+，但买5090的人不需要我念这个。9B在这一档是延迟玩具——agent循环里首token不到15毫秒。</p>

<h3>Mac（Apple Silicon）</h3>
<p><strong>结论：MLX优先，GGUF其次。</strong></p>
<ul>
<li>16 GB Mac（M4基础级）：MLX 4-bit（磁盘约5.6 GB，峰值约6.2 GB）。M4 10核实测<strong>约20 tok/s</strong>——对120 GB/s带宽来说是合理值。聊天够用；4并发聚合能到65–79 tok/s。</li>
<li>24–36 GB（M4 Pro/Max、M3 Pro）：8-bit MLX（约9.6 GB）近无损；单流预期25–35 tok/s。这是当下生态里"每块钱买到的本地助手性能"最高的一档。</li>
<li>48 GB+（M Max/Ultra）：Q8或BF16随便跑，还能让9B作为后台服务和大模型共存。</li>
</ul>
<p>mlx-community/Qwen3.5-9B-MLX-4bit是标准转换版；mlx-works/oQ4e-mtp带原生MTP加速（M5 Air级硬件+TurboQuant KV实测43.5 tok/s）。</p>

<h2>部署：最重要的三条命令</h2>
<p><strong>llama.cpp（推荐，控制力最强）：</strong></p>
<pre><code>llama-server -hf unsloth/Qwen3.5-9B-GGUF:UD-Q4_K_XL \
  --mmproj unsloth/Qwen3.5-9B-GGUF:mmproj-F16.gguf \
  -ngl 99 -c 32768 --port 8080 \
  --chat-template-kwargs '{"enable_thinking":true}'</code></pre>
<p><strong>Ollama（最简单）：</strong><code>ollama run qwen3.5:9b</code>——拉一个6.6 GB的Q4_K_M，视觉内置。注意：Ollama的Qwen3.5支持有公开记录的性能回退（CPU回退bug，部分版本解码比原生llama.cpp慢30–60%）；在乎速度就直接用llama.cpp。</p>
<p><strong>vLLM（服务端，24 GB+）：</strong><code>vllm serve Qwen/Qwen3.5-9B --max-model-len 262144 --reasoning-parser qwen3</code>——加<code>--speculative-config '{"method":"qwen3_next_mtp","num_speculative_tokens":2}'</code>开MTP，或<code>--language-model-only</code>跳过视觉编码器省KV内存。</p>

<h2>无审查版本：9B上有什么</h2>
<p>9B的无审查生态比27B轻——变体少、取证检验也少——但选项是真实存在的：</p>
<ul>
<li><strong>Huihui-ai abliterated</strong>——经典方法，有safetensors/GGUF/MLX-4bit。社区实测发现Ollama上的<code>huihui_ai/qwen3.5-abliterated</code>"其实并没有去干净"——直接下HuggingFace的文件更靠谱。</li>
<li><strong>HauhauCS Aggressive（宣称0/465拒绝）</strong>——和27B产品线同一套Aggressive方案，GGUF从Q4_K_M（5.3 GB）到BF16（17 GB），带视觉编码器。老规矩：宣传嗓门比文档厚度大。</li>
<li><strong>lukey03 abliterated + QLoRA</strong>——小模型上文档最完整的路线：3遍abliteration清掉18条测试拒绝里的13条；一小段QLoRA（20条样本，H100上45秒）清掉剩下5个顽固类别。合并后18/18，同基准上压过Dolphin-Mistral 7B。</li>
</ul>
<p>我们27B指南里的选型框架原样适用——优先选公布KL和能力变化的发布者，尽量跑Q5以上，在你的实际量化档位上验证行为，下载的聊天模板和原版diff。9B对量化档位的行为漂移比27B更敏感（每层冗余更少），"在你的量化上验证"这条在这里要打双倍权重。</p>

<h2>常见翻车点</h2>
<ul>
<li><strong>"比宣传的慢"：</strong>你在Ollama上踩了已知回退，或者上下文设到了262K（KV缓存溢出到内存）。显式设8–32K。</li>
<li><strong>"thinking关不掉"：</strong>llama.cpp已知问题#20182——部分版本里请求载荷中的<code>enable_thinking:false</code>被静默忽略。解法：服务启动时加<code>--reasoning-budget 0</code>，或用chat-template-kwargs形式。</li>
<li><strong>"图片不好使"：</strong>忘了<code>--mmproj</code>，或者F16投影器配了BF16模型（n_embd不匹配报错）。投影器精度要和文本模型对齐。</li>
<li><strong>"262K上下文OOM"：</strong>营销上下文对物理上下文。混合缓存便宜但不是免费（约32 KiB/token → 262K光缓存就约8 GB）。上下文要当显存预算，别当愿望。</li>
</ul>

<h2>买哪档 / 跑哪档？</h2>
<p>2026年9月这个时点，9B的诚实定位：它是<strong>8 GB能完整跑下的最好模型</strong>，<strong>12–16 GB上每瓦特质量最高的常驻助手</strong>，也是24 GB+平台上同时养着大模型时的<strong>延迟选手</strong>。如果你有16 GB+且追求单次查询的能力上限，27B指南里的推荐依然成立——但在agent、路由、分类、视觉OCR这类token速度和内存占用说了算的场景，9B才是聪明钱。</p>

<h2>来源与延伸阅读</h2>
<ul>
<li>官方权重：<a href="https://huggingface.co/Qwen/Qwen3.5-9B" rel="nofollow noopener" target="_blank">Qwen/Qwen3.5-9B</a>（Apache 2.0，2026-03-02发布）</li>
<li>GGUF基准版：<a href="https://huggingface.co/unsloth/Qwen3.5-9B-GGUF" rel="nofollow noopener" target="_blank">unsloth/Qwen3.5-9B-GGUF</a>；官方指南 <a href="https://unsloth.ai/docs/models/qwen3.5" rel="nofollow noopener" target="_blank">unsloth.ai/docs/models/qwen3.5</a></li>
<li>MLX：<a href="https://huggingface.co/mlx-community/Qwen3.5-9B-MLX-4bit" rel="nofollow noopener" target="_blank">mlx-community/Qwen3.5-9B-MLX-4bit</a></li>
<li>速度数据：<a href="https://willitrunai.com/blog/qwen-3-5-quantization-speed-comparison" rel="nofollow noopener" target="_blank">willitrunai量化速度对比</a>；<a href="https://baem1n.dev/en/posts/llm-bench-03-results-tables" rel="nofollow noopener" target="_blank">baem1n四机×五引擎基准</a></li>
<li>量化质量PPL表：<a href="https://techplained.com/qwen-3-5-gguf-quantization" rel="nofollow noopener" target="_blank">techplained GGUF量化指南</a></li>
<li>thinking开关问题：<a href="https://github.com/ggml-org/llama.cpp/issues/20182" rel="nofollow noopener" target="_blank">llama.cpp #20182</a>；Ollama回退：<a href="https://github.com/ollama/ollama/issues/14579" rel="nofollow noopener" target="_blank">ollama #14579</a></li>
</ul>
