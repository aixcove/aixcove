---
title: Gemma
date: '2026-04-05T15:31:53'
modified: '2026-08-22T10:30:00'
slug: gemma
description: Gemma 是 Google DeepMind 的开放权重模型家族，现在到 Gemma 4，从 E2B 到 31B 五个尺寸。这篇讲型号怎么选、本地怎么跑、许可注意点和社区真实反馈。
categories:
- llm-chat
wpId: 237
image: /uploads/2026/04/gemma.jpg
featured: false
---
<h2>Gemma 是什么</h2>
<p>Gemma 是 Google DeepMind 的开放权重模型家族，跟托管的 Gemini 应用和 API 正好互补。你拿到的是权重，跑在哪里自己定，手机、笔记本、服务器或者云虚拟机都行。家族已经迭代了好几代，现在这一代是 2026 年 4 月发布的 Gemma 4，6 月又补了一个 12B 的统一多模态模型。</p>
<p>动笔前我查了官方 Gemma 站点、Hugging Face 模型卡和许可条款页。多数读者真正要回答的问题就两个，自己的硬件该选哪个尺寸，自己的用法在许可里允不允许。两个问题都有明确答案，而且每代模型都会变，所以当前文档才算数。</p>
<h2>Gemma 4 有哪些型号</h2>
<p>Gemma 4 一共五个尺寸，两种架构。E2B 和 E4B 是紧凑型，冲着最高计算和内存效率去的，目标是手机和 IoT 设备。12B、26B A4B 和 31B 是主打推理的一档，跑在笔记本和服务器上。26B A4B 是 MoE 模型，每次只有一部分参数参与计算，实际占用的内存比同尺寸稠密模型少得多。</p>
<p>五个型号都是多模态的，都接受文本和图像输入，E2B、E4B 和 12B 还原生支持视频和音频。上下文窗口方面，小模型 128K token，中等型号 256K。多语言覆盖超过 140 种。模型带可配置的思考模式，可以在延迟和推理深度之间取舍，也带原生函数调用，能做智能体工作流。12B 被官方称为无编码器的统一模型，音频和视觉处理不依赖单独的编码器模块，部署体积更小。</p>
<p>核心尺寸之外，Google 还发布了一批专门变体。DiffusionGemma 是文本扩散模型，主打生成速度。T5Gemma 和 T5Gemma 2 是编码器解码器结构，擅长深度上下文理解。MedGemma 面向医学文本和图像理解。EmbeddingGemma、FunctionGemma、VaultGemma、TranslateGemma 和 ShieldGemma 2 分别覆盖向量嵌入、边缘函数调用、差分隐私 LLM、翻译和安全分类。</p>
<h2>大家实际怎么跑</h2>
<p>Gemma 走主流工具链都能跑。Ollama 和 LM Studio 覆盖最快的本地路径，Gemma.cpp 和 Google AI Edge 管设备端部署，Hugging Face Transformers、Keras 和 JAX 管训练和微调。Hugging Face 下载是门控的，要先同意 Google 的许可条款才能拿权重。</p>
<p>社区反馈明显集中在本地部署上。Gemma 4 发布帖在 Hacker News 拿到 1800 多分，后续帖子有人把 26B 跑进 M 系列 Mac 的 2 GB 内存，有人在 iPhone 上跑 Gemma 4，还有人用没有 GPU 的 13 年老 Xeon 跑出每秒 5 token。这些是发烧友的极限案例，不是普通结果，但正好说明小尺寸是给谁准备的。</p>
<h2>典型工作流</h2>
<p>最常见的起点是 Ollama。装好以后按名字拉一个 Gemma 模型，直接在终端里聊。新款笔记本上，4B 或 12B 是稳妥默认。手机或嵌入式目标，评估 E2B、E4B。服务器配了像样的 GPU，31B 或 26B A4B 才谈得上。</p>
<p>普通聊天模型不够用时，下一步是微调。官方指南覆盖用 Hugging Face Transformers 做 QLoRA、用 Gemma 库调，以及全量微调。针对一个窄的内部任务，小模型微调通常比用提示词硬调大模型更好用，服务成本也更低。</p>
<h2>适合谁，不适合谁</h2>
<p>Gemma 适合想自己掌控模型权重的团队，需要离线或设备端推理的场景，以及想用私有数据微调、又不想把数据发给托管 API 的人。研究人员比较紧凑模型、开发者想要 Google 模型血统又不想绑死在 Gemini 托管产品上，也都在范围内。</p>
<p>想要开箱即用的托管助手，它就不合适，那是 Gemini 的路。Gemma 也不能保证每个尺寸都够强，小型号是用能力换效率。任何自托管部署都有硬件、评估、安全和维护成本，这些下载页上不会写。</p>
<h2>上手技巧</h2>
<ul>
<li><strong>按硬件选尺寸，别按榜单选。</strong>31B 塞不进机器，跑起来比装得下的 12B 慢得多。下载前先拿真实设备对内存要求。</li>
<li><strong>内存紧张就用量化版和 QAT 版。</strong>Google 有量化指南，还有专为手机和笔记本效率做的 Gemma 4 QAT 模型。量化版常常就是消费级机器装得下和装不下的区别。</li>
<li><strong>上下文长度对着任务选。</strong>小模型 128K 封顶，中等型号 256K。长文档工作用中等档，普通聊天和 RAG 负载 128K 一般够用。</li>
<li><strong>思考模式按需开关。</strong>可配置思考是用延迟换推理深度。硬推理和分析打开，大批量生成看重速度就关掉。</li>
<li><strong>在它上面盖智能体之前先测函数调用。</strong>全家都带原生函数调用，但工具调用的可靠性随尺寸和量化程度浮动。先把真实工具 schema 跑一遍再动手。</li>
<li><strong>按用途核对许可。</strong>Gemma 4 权重走 Gemma 4 许可，更早的世代走 Gemma Terms of Use。分发和托管服务的义务两边不一样，别默认它跟 Apache 一样自由，去读当前条款。</li>
</ul>
<h2>限制和风险</h2>
<ul>
<li><strong>开放权重不等于全开放。</strong>Gemma 用的是 Google 自己的条款，不是标准宽松许可，而且每代之间条款有变化。商业分发或托管服务之前，先过一遍条款。</li>
<li><strong>硬件规划是实打实的活。</strong>最大的型号需要像样的 GPU 或者重度量化。那些 2 GB 内存跑 26B 的帖子是工程壮举，不是典型配置。</li>
<li><strong>小型号天花板低。</strong>E2B 和 E4B 是效率优先，同体积下确实惊艳，但复杂推理上替代不了大模型。</li>
<li><strong>能力宣传变得快。</strong>模型世代和榜单故事几个月就换一轮。决策要看当前模型卡和自己跑的评测集，别信发布当天的报道。</li>
<li><strong>它没有托管服务。</strong>没有官方托管的 Gemma API 这种说法，跑好、服务好、保持补丁更新都是你自己的事。</li>
</ul>
<h2>站内相关</h2>
<ul>
<li><a href="/zh/listing/gemini/">Gemini</a>，要托管版 Google 助手和 API 而不是自托管权重就选它</li>
<li><a href="/zh/listing/qwen/">Qwen</a>，另一个开放权重家族，尺寸跨度大，编程能力强</li>
<li><a href="/zh/listing/anythingllm/">AnythingLLM</a>，想要围绕本地模型的开箱即用私有文档聊天工作区</li>
<li>全部 <a href="/zh/listing-category/llm-chat/">AI 对话工具</a>，本地聊天搭建可读我们的 <a href="/zh/how-to-use-open-webui-with-ollama-in-2026/">Open WebUI 与 Ollama 指南</a></li>
</ul>
<h2>资料来源</h2>
<ul>
<li><a href="https://ai.google.dev/gemma" rel="nofollow noopener" target="_blank">Gemma 官方站点</a>，Google AI for Developers，文档和模型总览</li>
<li><a href="https://huggingface.co/google/gemma-4-12b-it" rel="nofollow noopener" target="_blank">Gemma 4 12B 模型卡</a>，Hugging Face，架构和上下文细节</li>
<li><a href="https://ai.google.dev/gemma/terms" rel="nofollow noopener" target="_blank">Gemma Terms of Use</a>，含 Gemma 4 许可</li>
<li><a href="https://news.ycombinator.com/item?id=47616361" rel="nofollow noopener" target="_blank">Hacker News 讨论</a>（Gemma 4 发布）和<a href="https://news.ycombinator.com/item?id=48385906" rel="nofollow noopener" target="_blank">12B 发布帖</a></li>
</ul>
