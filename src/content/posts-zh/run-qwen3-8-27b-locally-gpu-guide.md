---
title: Qwen3.8-27B本地部署指南：从核显到RTX 5090的显卡配置全表
date: '2026-09-10T09:00:00'
modified: '2026-09-11T14:30:00'
slug: run-qwen3-8-27b-locally-gpu-guide
description: Qwen3.8-27B本地部署全攻略：核显、Mac、RTX 40/50系笔记本与台式机显卡逐一给出量化版本选择、上下文设置和真实速度预期，附可复制的启动命令。
categories:
- ai-tutorials-how-tos
featured: /uploads/2026/09/run-qwen3-8-27b-locally-gpu-guide-hero.jpg
---

<h2>Qwen3.8-27B本地部署指南，从核显到RTX 5090怎么选配置</h2>
<p><strong>先看你的显存有多大。</strong>Qwen3.8-27B是2026年8月14日发布的270亿参数稠密视觉语言模型，采用Apache 2.0许可证开源。本地部署先挑显存（或统一内存）装得下的量化版本，再按剩余空间设置上下文长度。16GB显存或32GB统一内存的Mac可以完整体验；配置再低，就得做取舍，用更小的量化牺牲一些质量，或者把部分计算卸载到CPU，接受速度下降。下面按显卡逐一讲清楚。</p>
<p>这个模型值得折腾，主要还是因为能力够用。Terminal Bench 2.1拿到73.0分，SWE-bench Pro拿到61.7，原生支持图片和视频输入，上下文窗口262K，你手头的硬件就可能跑得动。不过，它的显存占用不能完全照常规稠密模型来估算，选量化之前先弄清这一点。</p>

<h2>为什么它的显存需求比看起来低</h2>
<p>27B参数按16位精度算，大约需要54-56GB，消费级显卡很难直接装下。但Qwen3.8-27B的64层里，只有16层使用传统注意力，其余48层用的是Gated DeltaNet。这是一种线性注意力变体，只维护一个固定大小的小状态，不需要随对话增长的KV缓存。社区实测的KV开销约为<strong>每token 64KB</strong>，只有常规稠密27B的四分之一左右，消费级显卡也因此有了尝试262K上下文的余地。</p>
<p>估算显存时，先算权重，再留出KV缓存的预算。这个模型增加上下文的显存成本相对低，但前提是权重已经装得下；权重本身超了，光调上下文解决不了。</p>
<ul>
<li><strong>全精度（BF16）</strong>约55GB，需要多卡或64GB以上统一内存。</li>
<li><strong>Q8/FP8</strong>约29-31GB，适合单张32GB卡，或48GB内存的Mac。</li>
<li><strong>4-bit（Q4/IQ4）</strong>约14-18GB，取决于具体量化版本，是体积和质量比较均衡的一档。</li>
<li><strong>3-bit及以下</strong>约10-13GB，质量会下降，但给16GB显卡和24-32GB Mac留出了运行空间。</li>
</ul>

<h2>量化版本速查表</h2>
<p>社区量化已经公布了实测文件体积，其中Unsloth的Dynamic系列目前公认质量最好。选版本时可以参考两组横向测试数据。Unsloth的UD-Q4_K_XL与原始权重的top-1一致率约96%；质量曲线在14GB以下明显下滑，22GB以上则基本走平。</p>
<ul>
<li><strong>UD-Q4_K_XL / Q4_K_M</strong>约16.5-17.9GB。24GB卡默认选它，体积和质量最均衡。</li>
<li><strong>UD-IQ4_XS</strong>约14.3-15.1GB。适合16GB卡，保留4-bit质量的同时，还能留出一些上下文空间。</li>
<li><strong>UD-Q3_K_XL</strong>约12.2-13.1GB。16GB卡装下后，上下文余量很大；盲测里与Q4的差距也比预想的小。</li>
<li><strong>UD-Q2_K_XL</strong>约9.2-9.8GB。12GB卡和16GB Mac可以拿来应急，别按日常主力的标准期待它。</li>
<li><strong>UD-Q6_K / Q8</strong>22-31GB。适合32GB卡和48GB+ Mac，质量提升能测出来，但幅度很小。</li>
</ul>

<h2>比显存更容易被忽略的推理设置</h2>
<p>Qwen3.8默认开启思考模式，推理力度还默认设在开销最大的<strong>xhigh</strong>。不改这个设置，一句话就能回答的问题也可能耗掉几万个推理token，最后撞上上下文上限，只返回一个空答案，看着像运行时出了错。调其他参数之前，先把<code>reasoning_effort</code>设为<code>medium</code>（质量损失几乎测不出来）或<code>low</code>；简单请求可以直接用<code>enable_thinking: false</code>关掉思考。社区测试显示，默认xhigh处理琐碎问题时，消耗的token能达到答案本身的5-10倍。</p>
<p>采样参数可以先照这两组设置。思考模式用<code>temperature=1.0, top_p=0.95, top_k=20</code>；指令模式用<code>temperature=0.7, top_p=0.80, top_k=20</code>，再加1.5的存在惩罚。</p>

<h2>按显卡对号入座</h2>
<p>下面的速度预期来自公开的社区实测，包括llamabench.ai汇总、Tom's Hardware和各显卡的深度测试，基本都使用llama.cpp加模型自带的MTP投机解码。上下文长度和设置会影响你的实测速度，但各档硬件的快慢关系基本稳定。</p>

<h3>核显与8GB笔记本，能跑但很难用得舒服</h3>
<p>只有集成显卡（AMD/Intel核显）或8GB独立显卡的笔记本，显存都装不下质量像样的量化版本。怎么调都绕不开系统内存，模型主体得在那里运行。可以按内存容量考虑下面两种做法。</p>
<ul>
<li><strong>64GB内存</strong>用llama.cpp的Vulkan或SYCL后端跑2-bit到3-bit量化（10-13GB），速度大约<strong>3-8 token/秒</strong>。有耐心等单次回答的话还能用，不适合agent类任务。</li>
<li><strong>16-32GB内存</strong>跑小量化也很吃紧。更实际的选择是7B-14B级模型，或者小型MoE；想体验Qwen3.8-27B就用云端API。为1-2 token/秒折腾一晚上，实在不划算。</li>
</ul>
<p>笔记本还要单独提醒一下。RTX 4060 Laptop（8GB）和5060 Laptop（8GB）的实际表现，与上面的核显场景差不多，通常是Q2/Q3量化、短上下文，速度只有个位数token/秒。已有5070 Laptop（8GB）用户报告实测3-5 t/s。如果本地AI是你经常用的功能，下一台机器建议把16GB显存作为底线。</p>

<h3>Mac（Apple Silicon），统一内存更好安排</h3>
<p>Mac没有独立的显存池，估算时主要看总内存有多大，以及要给系统留多少。优先用MLX版本，可以选LM Studio或<code>mlx-lm</code>；在Metal上，MLX的速度一贯快于GGUF。</p>
<ul>
<li><strong>24GB Mac（基础款M系列）</strong>2-bit到3-bit能跑，但很慢，约5-8 t/s。适合做实验，不适合日常使用。</li>
<li><strong>32-36GB</strong>能装下IQ4_XS/Q4_K_M（约15-16.5GB），也有可用的上下文空间；速度大约10-14 t/s，具体看内存带宽。</li>
<li><strong>48GB（M4 Pro级及以上）</strong>Q4可以常驻，约17 t/s；Q6/Q8需要缩短上下文才能装下。日常用的话，推荐从这一档起步。</li>
<li><strong>64-128GB（M4/M5 Max、Studio）</strong>运行这个模型比较宽裕，4-bit约27-30 t/s，Q8也能用，长上下文会话表现稳定。</li>
</ul>
<p>Mac上有两个设置别漏。先明确设置MLX内存上限，对应LM Studio里的wired limit，或<code>mlx-lm</code>的环境变量，避免macOS中途把权重换出内存。上下文没有特别需求就保持在16-32K。</p>

<h3>16GB档，4060 Ti 16GB、5060 Ti 16GB、4070 Ti Super、5080</h3>
<p>16GB卡能明显受益于这个模型的线性注意力设计。量化选<strong>UD-IQ4_XS（约14.3GB）</strong>或<strong>UD-Q3_K_XL（约12.2GB）</strong>，别上Q4_K_M，它会把显存占满，留不出上下文空间。</p>
<ul>
<li><strong>4060 Ti 16GB / 5060 Ti 16GB</strong>开启MTP后，IQ4_XS在16-32K上下文下约17-20 t/s；换Q3_K_XL，速度相近，上下文可以开到64K+。跑这个模型，这一档性价比最高。</li>
<li><strong>5080（16GB）</strong>一份公开深度实测把显示输出转到核显，并将KV缓存量化到q8_0/q4_0，用UD-Q3_K_XL在90K上下文下做到了<strong>130 t/s预填充 / 33-57 t/s解码</strong>，全程纯GPU运行。换成Q4级量化，预计解码速度16-28 t/s，随上下文长度变化。</li>
<li><strong>4080 / 4070 Ti Super（16GB）</strong>设置可以照5080来，速度略低；4070 Ti Super增加的显存对长上下文有帮助。</li>
</ul>
<p>16GB卡可以先做两件事。把显示器接到核显上，能省出Windows/Linux桌面占用的300-500MB显存；再量化KV缓存，llama.cpp加上<code>--cache-type-k q8_0 --cache-type-v q8_0</code>，缓存显存占用约减半，现有实测没有测出质量损失。</p>

<h3>12GB档（4070、5070台式机），量化和上下文都要让步</h3>
<p>12GB装不下Q4级权重，Q3勉强装下也几乎没空间留给上下文。可以用UD-Q3_K_XL配约4-8K上下文，能用，但限制不少；也可以降到2-bit，给上下文多留些空间，代价是质量明显下降，实测约3-6 t/s。如果你的卡在这一档，不妨考虑Qwen3.6-27B的Q4版本，或者能力较强的14B模型。想用好27B，显存还是不能太紧。</p>

<h3>24GB档，3090、4090、5090 Laptop</h3>
<p>24GB是这个模型主要面向的配置，也是推荐的默认选择。先用<strong>UD-Q4_K_XL（17.9GB）+ 32K上下文 + MTP投机解码 + q4_0 KV缓存</strong>。</p>
<ul>
<li><strong>RTX 4090</strong>基线解码约46 t/s，开启MTP投机解码后可达125 t/s以上，是最快的24GB卡。</li>
<li><strong>RTX 3090</strong>基线约40 t/s；加上MTP和KV量化，社区实测持续agent工作负载约60-114 t/s。买二手尤其划算。</li>
<li><strong>5090 Laptop（24GB）</strong>受散热限制，速度不如桌面4090，但仍有30-40 t/s。想在笔记本上日常用这个模型，建议选这一档。</li>
<li><strong>别看错显存</strong>5070 Ti台式机是16GB，不是24GB，要按前面的16GB档配置。这里能完整运行Q4的是3090/4090/5090 Laptop。</li>
</ul>
<p>这一档可以使用下面的llama.cpp启动命令。</p>
<pre><code>llama-server -m Qwen3.8-27B-UD-Q4_K_XL.gguf \
  -ngl 99 -fa on --jinja -c 32768 \
  --cache-type-k q4_0 --cache-type-v q4_0 \
  --spec-type draft-mtp --spec-draft-n-max 2 \
  --temp 1.0 --top-p 0.95 --top-k 20</code></pre>
<p>同一配置在5090（32GB）上实测解码约137 t/s；4090预期80-125 t/s，3090约45-70 t/s。</p>

<h3>32GB档，RTX 5090台式机</h3>
<p>消费级单卡里，32GB显存的5090跑这个模型最快。<strong>UD-Q6_K（22GB）</strong>甚至Q8都能装下，也能留出可用的上下文空间。公开实测解码74-155 t/s，取决于量化版本和投机解码设置。不过，长上下文仍然要等。256K窗口下，5090输出首token也要约12分钟，批量分析文档还能接受，聊天就太慢了。交互式会话建议保持在64-128K。</p>

<h2>三种运行时，选一个</h2>
<h3>方案一，Ollama最省事</h3>
<pre><code># macOS/Linux/Windows
ollama run qwen3.8:27b          # 18GB，默认Q4_K_M，256K上下文，开视觉</code></pre>
<p>Ollama的默认设置比较省心，视觉适配器也会自动处理。小显存显卡建议从Hugging Face拉取指定量化版本，使用<code>ollama run hf.co/unsloth/Qwen3.8-27B-GGUF:UD-IQ4_XS</code>。不过，它对KV缓存量化和MTP的控制不够细，而12-16GB卡恰好最需要调这两项。</p>
<h3>方案二，LM Studio适合图形界面用户，Mac优先选MLX</h3>
<p>装好应用，搜索“Qwen3.8-27B”，按上面的显卡档位选量化版本，把上下文滑块设到16-32K。Apple Silicon选MLX版本；Windows+NVIDIA在模型设置里打开Flash Attention，把GPU offload拉满。单模型设置界面里就能找到reasoning_effort和上下文长度，先把这两项调好，可以少踩不少坑。</p>
<h3>方案三，llama.cpp设置最灵活，速度最快</h3>
<pre><code># Linux CUDA编译
git clone https://github.com/ggml-org/llama.cpp && cd llama.cpp
cmake -B build -DGGML_CUDA=ON && cmake --build build -j --target llama-server

# 下载+启动一行搞定
./build/bin/llama-server -hf unsloth/Qwen3.8-27B-GGUF:UD-Q4_K_XL \
  -ngl 99 -fa on --jinja -c 32768 --port 8080</code></pre>
<p>启动后，<code>localhost:8080</code>会提供OpenAI兼容API，聊天界面、编码agent和自己的脚本都可以直接调用。本文引用的所有实测数据都使用这个运行时；想复现公开测试的速度，优先用llama.cpp。</p>

<h2>无审查版本有哪些，使用前要知道什么</h2>
<p>官方Qwen3.8-27B带有标准安全对齐，开源权重发布后几天内，社区就出现了abliterated（去审查）衍生版。下面四种方案按质量数据的透明程度从高到低排列。</p>
<ul>
<li><strong>Huihui-ai abliterated（safetensors）</strong>采用经典abliteration方法，通过正交化从残差流中移除拒绝方向，发布在 <a href="https://huggingface.co/huihui-ai/Huihui-Qwen3.8-27B-abliterated" rel="nofollow noopener" target="_blank">huihui-ai/Huihui-Qwen3.8-27B-abliterated</a>。Ollama用户可以直接运行<code>ollama run huihui_ai/Qwen3.8-abliterated</code>。</li>
<li><strong>JonathanColetti Uncensored（数据透明，GGUF + bf16）</strong>同样基于abliteration，文档把效果和代价交代得比较清楚。<a href="https://huggingface.co/JonathanColetti/Qwen3.8-27B-Uncensored" rel="nofollow noopener" target="_blank">这里是bf16权重</a>，<a href="https://huggingface.co/JonathanColetti/Qwen3.8-27B-Uncensored-GGUF" rel="nofollow noopener" target="_blank">这里是imatrix GGUF</a>，覆盖IQ2_M到Q8_0，MTP头已接回并验证，也包含视觉投影器。维护者公布的测试中，100条留出的有害提示上的拒绝率从98降到12，基准均值只下降0.5分（MMLU 83.4→83.3，ARC-Challenge -1.2）。维护者也明确说明，拒绝行为只是“大幅减少，不是消除”。</li>
<li><strong>OrcaRouter Uncensored-FP8（vLLM服务）</strong>FP8量化方案与官方完全一致，使用相同的vLLM内核路径，保留262K上下文、工具调用和MTP。模型见 <a href="https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-FP8" rel="nofollow noopener" target="_blank">orcarouter/Qwen3.8-27B-Uncensored-FP8</a>，GGUF转换版在 <a href="https://huggingface.co/chimingw/Qwen3.8-27B-Uncensored-OrcaRouter-GGUF" rel="nofollow noopener" target="_blank">chimingw 的镜像</a>。如果用vLLM/SGLang部署，可以优先考虑它；llama.cpp用户则看GGUF版本。</li>
<li><strong>HauhauCS Aggressive MTP GGUF（0/465拒绝，速度最快）</strong>这是改动最激进的选项。<a href="https://huggingface.co/HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF" rel="nofollow noopener" target="_blank">HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF</a> 宣称<strong>465条测试提示零拒绝</strong>，回答风格偏直接，遇到困难问题也不绕弯。它公布的投机解码加速数据也是所有变体里最突出的。每个GGUF都保留原生MTP头，附带的FastMTP 32K辅助文件宣称，文档生成速度最高可达无MTP时的3.02倍，比标准内置MTP再快35.2%。量化版本覆盖IQ4_XS（15.7GB）到Q8_K_P（31.5GB）。但这些加速数字来自96GB的RTX PRO 6000 Blackwell平台，消费级显卡只能拿来参考上限。“Aggressive”确实意味着更激进的处理，除了拒绝测试，它公布的质量回归数据比JonathanColetti少。如果Qwen3.8在发布时已有Balanced变体，HauhauCS自己的建议是，可靠性要求高的agent任务默认用Balanced更稳。还有一项取证记录需要知道。下文基准评测背后的独立取证项目查明，HauhauCS的Reaper工具是删除署名、更换许可证的Heretic衍生版。在能逆向分析的模型上，项目测得的拒绝行为与能力退化情况不支持“无损”宣传，其中Qwen3.5-27B的TruthfulQA −8.2pp、MMLU −1.9pp。项目因此将其移出后续对比；只有GGUF格式的Qwen3.8版本没有进入那张评测表。</li>
</ul>

<h3>怎么挑，先问清四个问题</h3>
<p>拒绝率只能说明模型愿不愿意回答，不能单独说明它好不好用。2025年12月的一篇arXiv论文跨架构研究了Heretic、DECCP、ErisForge、FailSpy等abliteration工具，再结合Qwen 3.6/3.8变体的独立取证评测，选模型前至少要看下面四件事。</p>
<ul>
<li><strong>1. 编辑后，模型的输出分布变了多少？（KL散度）</strong>这是预测质量损伤最有效的单一指标。Abliteration会从模型内部表征里减去一个“拒绝方向”，整体token分布变化越小，原模型能力通常保留得越多。JonathanColetti公布了这个数字，选定工作点的首token KL为0.1191，还附有拒绝率从12到98的完整权衡表。维护者愿意公开KL/拒绝曲线，至少能让人看到参数是怎么选出来的。独立取证发现，最好的方法（Heretic级）能将能力变化控制在基线的1%以内，最差的实现曾让某些架构的MMLU下降6分。但方法的效果取决于模型，在一个模型上改动温和，换个模型可能就会严重损伤能力。</li>
<li><strong>2. 测试做了吗，统计口径清楚吗？</strong>拒绝率很容易被包装成好看的数字。看到0/465，先问这465条提示具体是什么，带免责声明的回答又算不算拒绝。自动拒绝评分研究发现，基于关键词的统计会把拒绝率低估20个百分点以上；免责声明式回答也让判断更复杂，有些回答嘴上保留意见，内容却已经照办。可靠的做法是同时公布拒绝率、能力基准，以及相对同一基线版本的KL数。JonathanColetti和独立取证项目都提供了这些数据。只说“零拒绝，能力无变化”，却不交代测试方法，不能当作评测结论。</li>
<li><strong>3. 回答风格适合你的任务吗？</strong>HauhauCS自己的说明就很具体。Aggressive直接给原始答案，不加铺垫，适合明确需要这种风格的人；Balanced同样是0/465拒绝，但会输出推理过程，偶尔附上简短免责声明，更适合agent编码、工具调用和长上下文这类看重稳定性的任务。移除拒绝行为和调整回答风格是两回事，模型完全可以不拒绝，同时保留先想后答的习惯，多数实际工作也更需要这样。</li>
<li><strong>4. 换成你要用的量化档位，还能保持这些表现吗？</strong>拒绝率和基准数字通常在高精度（Q6+）下测得。拒绝方向编辑与量化会相互影响，同一个abliterated模型换到IQ4_XS，行为可能就不同，2-bit下会明显更差，而维护者很少测试Q4以下的版本。JonathanColetti明确建议在Q6_K/Q8_0上验证行为，不要默认IQ4_XS也有相同表现。16GB或更小的显卡需要降低预期，拒绝会减少，但回答可能比公布测试中的稍欠连贯。</li>
</ul>
<p>按这些研究来选，第一个无审查模型可以从愿意公开KL/拒绝权衡表和能力变化数据的变体开始，目前是JonathanColetti；显存够就上Q6以上。若明确需要不加铺垫的直接回答，也接受相应代价，带MTP加速的HauhauCS Aggressive在纸面数据上最强，但跑长agent会话时，建议留一个Balanced或JonathanColetti备用。任何abliterated的2-bit量化都先当实验品，别直接拿来承担日常任务。装好后还要抽查TruthfulQA式的对抗性假前提问题。关于abliteration固有代价的研究显示，移除拒绝方向后，“压力下的真实性”是最普遍受损的能力，即便通用基准看着正常，也不能省掉这项检查。</p>

<h3>11天、167 GPU小时横评，8个变体与1个基座同场实测</h3>
<p>2026年9月，独立取证项目Abliterlitics发布了首个Qwen3.8-27B无审查变体系统性横评，让8个变体与基座在相同条件下测试。<a href="https://abliterlitics.dev/models/qwen38-27b/" rel="nofollow noopener" target="_blank">完整报告在这里</a>，<a href="https://www.reddit.com/r/LocalLLaMA/comments/1w8vx6w/8_uncensored_qwen_38_27b_variants_one_base_167/" rel="nofollow noopener" target="_blank">讨论帖在这里</a>。测试使用单张RTX 5090，耗时约167 GPU小时，覆盖权重取证、KL散度、13项基准套件和HarmBench 400；温度设为0，所有变体统一使用原版聊天模板。这份报告是目前这个模型生态里最接近完整实测的资料，验证了前文的判断，也补上了单看模型卡容易漏掉的问题。</p>
<p>下面按HarmBench ASR排列。分数由评判结果得出，越高表示实际完成请求的比例越高。</p>
<ul>
<li><strong>orcarouter，82.2%，排名第一。</strong>采用Arditi式编辑，涉及131个矩阵，位于第38层。它是唯一一个模型卡与权重完全对应的变体，4项声明全部核实，各项能力变化都在模型卡承诺的±1.3分内。版权类请求完成率也是全组最高，为39%。<a href="https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored" rel="nofollow noopener" target="_blank">权重在这里</a>。</li>
<li><strong>apostate，78.7%，改动少、效果好。</strong>采用新的KCRN方法，仅测得41处编辑，实测KL最低，为0.0439，能力几乎与基座一致。但下载前要看清打包方式，它以纯文本模型重新保存，没有视觉塔和MTP头，采用FP16存储。<a href="https://huggingface.co/heterodoxin/qwen-3.8-27b-abliterated" rel="nofollow noopener" target="_blank">权重在这里</a>。</li>
<li><strong>huihui，75.6%，表现稳定。</strong>经典方法在27B上仍然有效，除版权外，各类请求都能有效解除限制；版权类完成率停留在3%。<a href="https://huggingface.co/huihui-ai/Huihui-Qwen3.8-27B-abliterated" rel="nofollow noopener" target="_blank">即上文链接</a>。</li>
<li><strong>ultra_heretic，70.5%。</strong>采用Heretic v2 + MPOA，能够使用，但真实性下降程度仅次于obliteratus。测试中有118次软拒绝，其中96次涉及版权内容，回答绕开了原请求。<a href="https://huggingface.co/llmfan46/Qwen3.8-27B-Ultra-Uncensored-Heretic-Native-MTP-Preserved" rel="nofollow noopener" target="_blank">权重在这里</a>。</li>
<li><strong>coder3101，70.0%。</strong>采用原版Heretic。模型卡写得比实测保守，标注33/100拒绝，评判实测却是400条里只有5次明确拒绝。<a href="https://huggingface.co/coder3101/Qwen3.8-27B-heretic" rel="nofollow noopener" target="_blank">权重在这里</a>。</li>
<li><strong>blackfrost，68.5%，宣传和模板都有问题。</strong>权重中没有宣传所说的rank-k“方向库”，测得的是单一方向、100% rank-1。聊天模板还藏了1457字符的越狱系统提示，会注入每一段对话。取证确认，权重本身确实能达到宣称的拒绝率下限，但建议只配原版模板运行。<a href="https://huggingface.co/Blackfrost-AI/Qwen3.8-27B-ABLITERATED-BF16" rel="nofollow noopener" target="_blank">权重在这里</a>。</li>
<li><strong>obliteratus，63.9%，不建议用。</strong>它的编辑幅度全组最大，850个张量动了841个，也是唯一能力明显退化的变体。HumanEval −33.6分、LAMBADA困惑度 +20%、TruthfulQA −6.3分，而且<strong>44.8%的回答在15360 token预算内无法结束</strong>。模型一直推理却迟迟不给完整答案，实际使用就会卡在那里。“0%拒绝”依赖一种特殊统计口径，连没想完的输出也算作回答。<a href="https://huggingface.co/OBLITERATUS/Qwen3.8-27B-OBLITERATED" rel="nofollow noopener" target="_blank">权重在这里</a>。</li>
<li><strong>trohrbaugh，57.5%，适合求稳。</strong>排名靠后与它主动保留较多对齐有关，测试中有122次明确拒绝，是保留对齐最多的变体。它的能力保持情况却是全组最好，GSM8K −1.2分、HumanEval +3.1分，也是唯一校准过KL的模型卡，卡上0.0535，实测0.0586，差距9%。思维循环率同样最低，为15.3%。报告作者自己在家用的就是这个变体。<a href="https://huggingface.co/trohrbaugh/Qwen3.8-27B-heretic-ara" rel="nofollow noopener" target="_blank">权重在这里</a>。</li>
<li><strong>基座，4.5%。</strong>400条请求里有381次明确拒绝，化学/生物、骚扰、有害内容和版权类别全部零放行。</li>
</ul>
<p>报告里还有五个发现，选模型时不能只看上面的排名。</p>
<ul>
<li><strong>小范围编辑的效果明显好于大范围修改。</strong>前两名恰好是实测编辑最少的两个变体，只涉及131和41个矩阵；修改最多的那个排倒数第二。在27B这个量级，扩大编辑范围往往会让模型更容易陷入反复思考。</li>
<li><strong>思维循环会直接影响可用性。</strong>这是本次测试发现的重要问题。Qwen3.8回答前会先推理，修改激进的变体处理对抗性请求时，最多45%的回答无法结束思考块。但同一批变体做数学题时可以正常结束，在只统计已回答样本的answered-only GSM8K上，所有变体与基座的差距≤1.2分。数学题能答完，不代表对抗性请求也能答完。模型页面只公布拒绝率、不公布“未完成思考率”，就缺了一项关键数据。</li>
<li><strong>版权类请求仍然普遍受限。</strong>过去最难解除限制的化学、生物类别，如今所有变体的完成率都≥80%，前两名达到100%。版权类别却没有模型超过39%，九个模型里有五个≤3.2%。如果主要处理歌词、书籍段落或报刊文字，这些变体都无法稳定完成请求。</li>
<li><strong>聊天模板必须单独检查。</strong>八个变体里有三个修改了模板，包括硬编码越狱提示、改写思考开关、删除推理力度提示。在这个模型家族上，模板对行为的影响甚至超过多数权重编辑，相同权重换一套模板，表现就可能差很多。下载任何变体，都先diff它与基座的聊天模板，再判断基准宣传是否可信。</li>
<li><strong>模型卡的声明可以核验，可信程度差别很大。</strong>orcarouter的4/4声明得到核实，trohrbaugh的KL校准差距为9%。coder3101的描述比实测保守了一个数量级；obliteratus的“0%拒绝”取决于统计方式；blackfrost宣传多方向编辑，权重却不支持这个说法。公开数字都应先当作待核验的声明，不能看见模型卡上写了就直接采信。</li>
</ul>
<p>这张八模型表没有包含JonathanColetti和HauhauCS。前者提供的是上文引用的模型卡自测数据；后者只发布GGUF，无法逆向分析后纳入对比，同一取证项目也<a href="https://abliterlitics.dev/techniques/hauhaucs/" rel="nofollow noopener" target="_blank">单独说明了</a>为何将HauhauCS模型移出对比。另外，有评论者对评测方法提出了一个合理疑问，部分版权“软拒绝”可能源于27B模型不知道答案，未必是在拒绝回答，报告也把这列为可能原因。这一争议不影响能力测试和KL取证结果。</p>

<h3>到底该跑哪一个</h3>
<p>结合前面的测试方法、取证结果和167小时横评，可以按用途选。</p>
<ul>
<li><strong>想直接选综合表现最好的，选orcarouter。</strong>横评支持把它作为默认选择。实际完成率最高（82.2%），模型卡是唯一完全通过取证核验的，编辑范围小而明确，没有思维循环问题，版权类完成率也最高。格式同样齐全，提供<a href="https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored" rel="nofollow noopener" target="_blank">safetensors</a>、<a href="https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-FP8" rel="nofollow noopener" target="_blank">vLLM用FP8</a>和GGUF转换版，桌面端、服务端都能部署。</li>
<li><strong>最在意保留原模型能力，选apostate</strong>，它有78.7% ASR和全场最低实测KL 0.0439，代价是没有视觉塔和MTP。如果还想主动保留部分拒绝行为，就选<strong>trohrbaugh</strong>，ASR为57.5%，能力保持情况最好，循环率最低，也是报告作者日常使用的版本。</li>
<li><strong>llama.cpp / LM Studio用户，看重公开KL曲线，可以优先选JonathanColetti。</strong>它仍然是这一需求下有数据支持的首选。横评强调声明必须可验证，而这个仓库主动公布了取舍过程和对应数据。</li>
<li><strong>要直接回答、少铺垫，也追求最高速度，可以考虑HauhauCS Aggressive</strong>，但要清楚代价。MTP加速有效，取证记录却有争议，维护者也建议可靠性敏感的场景使用Balanced。最好另装一个模型备用。</li>
<li><strong>不建议选obliteratus</strong>，它有44.8%思维循环和实际能力损伤；也不建议选<strong>blackfrost</strong>，聊天模板藏有越狱注入，方向库宣传与权重不符。</li>
</ul>
<p>模型选好后还有三件事要做。显存允许就跑Q6以上，低量化下的行为可能变样；使用原版聊天模板，下载的模板都先diff；装好后抽查TruthfulQA式假前提问题，这类真实性能力在各类实测方法中受损最重。不同任务也要分别看待，去审查后的数学和推理基本无损，版权类请求的实测上限只有39%，对抗式提示则容易让激进变体陷入思维循环。</p>
<p>前文各显卡档位的建议仍然适用，文件体积、量化档位和启动参数都不变，因为abliteration只修改少量权重方向，不改变架构。但质量方面要留余地，去审查会让基准分数轻微下降，记录最完整的案例约下降半分；低比特率（2-bit）abliterated权重的行为测试也还不充分。各方案的社区讨论见 <a href="https://www.reddit.com/r/LLM/comments/1vwajr7/best_uncensored_qwen3827b_model/" rel="nofollow noopener" target="_blank">r/LLM 的对比帖</a>。</p>
<p>这些Apache 2.0权重都由第三方修改，并非Qwen官方版本。使用时仍需遵守原始模型卡、使用条款和当地法律。模型减少拒绝行为，并不免除使用者对生成内容的责任。</p>

<h2>常见问题与处理办法</h2>
<ul>
<li><strong>“模型加载了，但答案为空或被截断”</strong>默认xhigh推理耗尽了上下文。设为<code>reasoning_effort: medium</code>，或者关闭思考。</li>
<li><strong>“比实测慢得多”</strong>检查模型是否被部分卸载到CPU。看运行日志里的GPU层数，不是99就说明量化太大，需要降一档。</li>
<li><strong>“32K上下文就爆显存”</strong>打开Flash Attention，把KV缓存量化到q8_0。还是不够，就换IQ4_XS。</li>
<li><strong>“输出重复或语无伦次”</strong>大约b10450之前的llama.cpp版本在这个架构上会生成读着流畅、内容却不对的回答，先升级。</li>
<li><strong>“为什么它想个没完”</strong>推理力度默认是xhigh，按第一条调整。</li>
</ul>

<h2>按现有硬件选，不必一味追求最高精度</h2>
<p>在同重量级模型里，Qwen3.8-27B是第一个让本地部署有这么多可选配置的模型。线性注意力降低了上下文的显存开销，选配置时先看权重能否装下。16GB显卡用IQ4_XS/Q3_K_XL，约17-30 t/s，已经能日常使用；24GB显卡用UD-Q4_K_XL+MTP，40-125 t/s，体验更好；32GB卡或64GB Mac可以选择最高质量配置。核显和8GB机器暂时不建议硬撑，云端API每次调用几分钱，通常比等本地慢慢生成省事。</p>
<p>资料来自Qwen官方模型卡（2026年8月）、Unsloth GGUF文档、llamabench.ai社区汇总、Tom's Hardware RTX 5090实测、mberatsanli/qwen38-27b-local（5080深度实测）、KGP Talkie 45组llama.cpp配置实测，以及AMD Day-0支持公告。数据核验于2026年9月11日。</p>
