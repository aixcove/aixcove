---
title: Gemini评测2026：Google AI Pro定价、Workspace与API
date: '2026-04-05T10:19:38'
modified: '2026-09-13T12:00:00'
slug: gemini
description: Google Gemini 2026年现状。免费层与 AI Plus/Pro/Ultra 套餐对比、Gemini 3 Pro 与 Flash 模型、100万token上下文、Deep Research 与 Antigravity、API 定价与真实限制。
categories:
- llm-chat
wpId: 186
image: /uploads/2026/04/gemini.jpg
featured: false
author: AIX Cove 出品
source: 官方文档与定价页、标注的实测。2026 年 9 月核实。
reviewed: AIX Cove
---
<h2>Gemini 是什么</h2>
<p>Gemini 是 Google 的旗舰大模型家族，也是围绕它搭建的整套助手产品。2026 年它实际是两样东西绑在一起。一个是 gemini.google.com 上的 Gemini 应用，做对话、Deep Research、Canvas、图像视频生成和定时任务。另一个是 Gemini Developer API，给自定义应用、智能体和 Google 自家的 Antigravity IDE 供货。两边跑同一套模型，难题交给 Gemini 3 Pro，日常活由一串 Flash 模型分级承接。</p>
<p>模型天生多模态。文本、代码、PDF、图片、音频、视频进同一个上下文窗口，Gemini 3 Pro 最多能读一百万 token。集成是另一半卖点，Gmail、Docs、Drive 和搜索的数据可以直接进答案，这个深度目前没有对手能做到。它是托管在云上的服务，你没法本地跑。要求私有化部署或完全离线的场景，看 DeepSeek 或 Qwen 这类开放权重模型更合适。</p>
<h2>2026 年的模型线</h2>
<p>按 Google 官方帮助页的说法分三档。Gemini 3 Flash-Lite 是速度优先的干活模型，适合总结和头脑风暴。Gemini 3 Flash 在速度和推理之间找平衡，大多数日常任务它够了。Gemini 3 Pro 是前沿模型，啃复杂数学、编程和深度文档分析，回复明显更慢，因为它在开口前想得更久。API 侧 3.x 一代一直在迭代，Gemini 3 Pro 于 2025 年 11 月发布，3.1 Pro 在 2026 年 2 月接棒，3.5 Flash 系列（含更轻的 Flash-Lite）2026 年年中铺开。模型名和可用性别指望固定，Google 的弃用页面大约在发布一年后关停旧版本。</p>
<p>有两个功能值得记住名字。Deep Research 跑长时间自主联网调研，产出带引用的报告。思考等级让你用延迟换质量，Standard 是默认档，Extended 多想一会，Deep Think 是 AI Ultra 专属的最大并行推理，一个问题可能要等几分钟。</p>
<h2>定价怎么算</h2>
<p>应用套餐和 API 是两套账，分开讲。先说消费端四个档位，2026 年 9 月核对自 Google 官方套餐页。免费层能摸到全部三档模型，标准限额，上下文窗口 32k token，但没有 Canvas、Gems、Deep Research 和图像生成。Google AI Plus 每月 $4.99，用量为标准的两倍，上下文 128k，多数功能解锁。Google AI Pro 每月 $19.99，用量四倍，完整的一百万 token 窗口，2TB 存储，外加 Antigravity 权限。多数人拿它对标 ChatGPT Plus 时该比的就是这档。Google AI Ultra 从每月 $99.99 起，分 $99.99 和 $199.99 两档，用量为 Pro 的 5 倍或 20 倍，独占 Deep Think，新功能优先体验。$100 档和降价都是 2026 年 I/O 上新推的。</p>
<p>应用侧限额按算力计，不是数 prompt。提示词复杂度、选的模型、用到的功能、会话长度都消耗同一个池子，限额每 5 小时刷新，上面还压着一个每周上限。同一条请求打在 3.1 Pro 上消耗的配额，可以是 Flash 的好几倍。</p>
<p>API 定价独立，按量付费。2026 年 9 月时 Gemini 3.8 Flash 输入每百万 token $0.75（2027 年 1 月起涨到 $1.50），输出 $3.75。API 有免费层给小项目，但免费层的内容会被用于改进 Google 产品，涉及机密数据时这一条要想清楚。Batch 批处理打五折，Google 搜索 grounding 每月前 5000 次免费，之后每千次 $14。做预算前去<a href="https://ai.google.dev/gemini-api/docs/pricing" target="_blank" rel="noopener noreferrer">官方 API 定价页</a>确认，促销价有明确的到期日。</p>
<h2>Gemini 真正占便宜的地方</h2>
<p>超大多模态上下文。Pro 和 Ultra 套餐的一百万 token 大约等于 1500 页文本或三万行代码，全部塞进一个会话。把整个代码仓库、一段视频加一堆文档丢进去问跨文件的问题，这个工作流在这个价位上没有真正的同类。</p>
<p>Google 原生场景。你的生活如果就在 Gmail 和 Docs 里，Gemini 能直接读这些上下文并动手。从邮件串起草、总结 Drive 文件夹，省掉了在其他助手里来回粘贴的功夫。</p>
<p>便宜的前沿推理。Gemini 3 Pro 在视觉推理、屏幕理解和文档类基准上排第一梯队，$19.99 的 Pro 套餐附带一百万上下文和 Antigravity。对学生和重度文档用户，性价比很能打。</p>
<p>视觉与屏幕任务。3 Pro 这代能在图里指出精确像素坐标，读截图和界面录屏的能力突出，所以浏览器智能体和 RPA 式自动化经常拿它当眼睛。</p>
<h2>实用技巧</h2>
<ul>
<li><strong>质量突然变差时先看模型切换器。</strong>撞到用量上限后，Gemini 会不声不响地用 Flash-Lite 接着聊。答案变水先确认还在不在 Pro 上，别急着怪模型。</li>
<li><strong>按活配模型，配额能撑更久。</strong>起草和总结用 Flash 或 Flash-Lite，Pro 留给分析、数学和代码。限额按算力计，这一招等于把每日可用量翻了几倍。</li>
<li><strong>在 gemini.google.com 左下角打开设置里的 Usage Limits。</strong>它显示你离 5 小时和每周上限还有多远，重度会话不至于突然被降级打个措手不及。</li>
<li><strong>长文档先要地图再要产出。</strong>让 Gemini 先列章节和论点，再要成稿，关键结论回到原文核对。长上下文的召回不错但并非无懈可击，散落在大文件各处的细节最容易漏。</li>
<li><strong>不着急的批量活走 API 的 batch 模式。</strong>五折对回填和分类任务是实打实的省钱，而且付费 API 不适用免费层那条数据改进条款。</li>
</ul>
<h2>限制与风险</h2>
<p>配额不透明且会动。Google 自己写明限额可能因容量原因不另行通知地调整，2026 年也确实调了。5 月 17 日重构了一次 Gemini Apps 限额，此前还多次在需求高峰期待流免费层的 Pro 访问。r/GeminiAI 的帖子里有 Pro 订阅者反映几个重 prompt 就撞上限，有人实测同一条请求在 3.1 Pro 上吃掉每日额度的 9%，Flash 只占 1%。任何被引用的限额数字都当成参考值看。</p>
<p>数据留在 Google 云上处理，免费层 API 的内容会用于产品改进。合规或机密负载要么走付费 API 的企业条款，要么换工具。</p>
<p>拒答和出错仍然存在。某些话题上 Gemini 依旧保守，幻觉没根除，时事尤其明显。3.1 Pro 上线前后社区抱怨里有一条链式反应，幻觉变多导致重试变多，重试又把配额烧得更快。要紧的事实自己核。</p>
<p>模型更替快。preview 版本按日程被替换和关停，gemini-3-pro-preview 已于 2026 年 3 月关闭并指向 3.1 Pro。绑定特定 preview 版本做开发的东西，迁移方案要提前备好。</p>
<h2>用户怎么说</h2>
<p>2026 年的社区情绪分裂得很整齐。模型本身口碑不差，Gemini 3 Pro 发布时登顶 LMSYS Arena，独立评测也认它的多模态和视觉推理是一线水平。挨骂的是外层产品。应用界面常被批不如 ChatGPT 或 Claude 顺手，配额机制像个移动靶，重度用户撞墙比套餐表暗示的来得早。r/GeminiAI 里反复出现的总结是一个顶级模型，被一套总让你意识到它存在的界面和配额系统包着。开发者侧可以盯 Google 官方论坛和 <a href="https://github.com/orgs/googleapis/repositories" target="_blank" rel="noopener noreferrer">GitHub 上的 googleapis 仓库</a>，API 的 bug 和破坏性变更都在那边走。</p>
<h2>谁适合用 Gemini</h2>
<p>已经在 Google 生态里、想要多模态输入、超长上下文和 Workspace 集成又不想自己搭基础设施的人和团队。如果你本来就在付 Google One，它顺理成章是第一个该试的。重度日常用户先评估 5 小时加每周的配额模型合不合自己的负载，不合的话考虑 Ultra 或者直接走 API。隐私敏感、要私有化或离线的需求，去看开放权重方案。</p>
<h2>Gemini 与替代方案</h2>
<p>要开放权重或离线方案，对比<a href="/zh/listing/deepseek/">DeepSeek</a>与<a href="/zh/listing/qwen/">Qwen</a>。文档密集的写作和长编程会话看<a href="/zh/listing/claude/">Claude</a>，基于 Gemini 的智能体 IDE 看<a href="/zh/listing/antigravity/">Google Antigravity</a>。如果你的参照物是<a href="/zh/listing/chatgpt/">ChatGPT</a>，一句话的诚实版本是 Gemini 赢在上下文长度、多模态广度和 Google 集成，ChatGPT 赢在应用打磨和对话稳定性。对 Google 原生用户，Gemini 是最强选择。</p>
