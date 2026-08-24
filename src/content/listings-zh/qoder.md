---
title: Qoder
date: '2026-04-05T13:03:15'
modified: '2026-08-22T10:30:00'
slug: qoder
description: Qoder 是阿里巴巴通义千问团队做的智能体编程平台，有 IDE、CLI、JetBrains 插件。这篇讲 Editor 和 Quest 两个工作区、积分制价格、真实限制和上手技巧。
categories:
- ai-coding
wpId: 205
image: /uploads/2026/04/qoder.jpg
featured: false
---
<h2>Qoder 是什么</h2>
<p>Qoder 是阿里巴巴通义千问团队做的智能体编程平台，2025 年 8 月上线。起初它只是一个编程助手，到 2026 年已经长成一个产品家族，有 IDE、JetBrains 插件、命令行工具、托管云智能体，还有两个面向办公场景的应用。各端共用同一套思路。给智能体一个目标，让它自己规划、调用工具执行、验证结果，再根据反馈迭代，直到把交付物做出来。它不会停在一条建议或一段回复上。</p>
<p>动笔前我查了官方文档、价格页和积分说明。Qoder 免费可以起步，收费按积分走。免费档确实能用，但 Quest 和 Experts Mode 这些值钱的功能都在付费档里。如果只想要补全，更轻的工具做同样的事，还少一层学习成本。</p>
<h2>产品家族里有什么</h2>
<ul>
<li><strong>Qoder IDE。</strong>完整编辑器，两个工作区。Editor 把 NEXT 代码建议、Inline Chat 和聊天面板放在代码旁边，边写边问。Quest 是单独的窗口，用于长期多步任务，带任务看板、进度跟踪和产物审查。</li>
<li><strong>JetBrains 插件。</strong>把代码建议、Ask、Agent、MCP 和项目规则带进 JetBrains 系 IDE。</li>
<li><strong>Qoder CLI。</strong>终端里的编码智能体，能读文件、跑命令、提交改动，也可以写进脚本做自动化。</li>
<li><strong>Cloud Agents。</strong>通过 API 调用的托管智能体，环境可配置，会话流式返回结果。</li>
<li><strong>QoderWork 和 QoderWake。</strong>文档、表格、调研、浏览器和桌面任务的委派，以及常驻的自动化智能体。</li>
<li><strong>企业版。</strong>集中采购、成员、身份、策略、知识库、模型渠道和审计。</li>
</ul>
<p>IDE 里还有几样对实际工作有用的东西。Repo Wiki 给代码库生成结构化文档，并跟着代码改动持续更新。Knowledge Card 和 Memory 跨会话积累项目上下文。Rules 写团队约定。MCP 接外部工具。Experts Mode 把一个复杂任务拆给规划、实现、测试、审查多个子智能体并行处理。Browser Agent、Computer Use Agent 和 Canvas 分别覆盖网页调研、界面自动化和可视化标注。</p>
<h2>价格和积分</h2>
<p>Qoder 用积分计量用量。个人档有 Free、Pro（每月 20 美元）、Pro+（每月 60 美元）和 Ultra（每月 200 美元）。新用户首次登录送 14 天 Pro 试用和 300 积分。Free 档包含有限的补全和 next edit、每天有限的基础模型调用，并支持自带 API key。付费档每月分别给 2,000、6,000、20,000 积分用于高级模型。积分用完不会断供，会自动切到基础模型，基础模型有每日上限。</p>
<p>不同功能烧积分的速度差很多。官方指南按 200K 上下文窗口给过估算，Editor 里 Ask Mode 一次约 4 积分，Agent Mode 约 12 积分，Quest Agent Mode 约 50 积分，Experts Mode 约 75 积分，Repo Wiki 每个仓库约 50 积分。Pro 档的 2,000 积分，如果天天用 Quest 和 Experts Mode，很快见底，所以文档建议重度智能体用户上 Pro+，常跑长任务的人上 Ultra。积分包 20 美元买 1,500 积分，不退，买后一个月过期。套餐积分每个账单周期结束清零，不结转。</p>
<h2>典型工作流</h2>
<p>上手就是下载加登录。IDE 支持 Windows、macOS 和 Linux。常见的第一天长这样。装好 IDE，用邮箱、Google 或 GitHub 登录，领免费 Pro 试用。打开现有项目，等索引完成，先用 Ask Mode 问一个关于代码库的问题，看看它理解得准不准。再用 Agent Mode 改一个小地方，接受改动前审一遍 diff。项目缺文档就跑一次 Repo Wiki，把模块和入口的脉络生成出来。之后判断自己的用量值不值得上付费档。</p>
<p>长任务用 Quest 测更诚实。给它一个有边界的目标，让它在自己的窗口里改文件、跑命令，然后审查它交出来的产物。经常跑这类任务的团队，应该把约定写进 Rules，一份简短的项目说明比越滚越长的提示词管用。</p>
<h2>适合谁，不适合谁</h2>
<p>Qoder 适合想在编辑器里跑完整智能体循环的开发者，也适合本来就在阿里或通义生态里、想跟这些模型深度配合的团队。IDE 可以当 Cursor 的替代品看，JetBrains 插件补了 IDE 的空缺，CLI 跟 OpenCode、Qwen CLI 这类工具竞争。企业功能让需要治理和审计的组织也能用。</p>
<p>它不适合只想快速补全的人，免费档的补全限量，付费档按智能体负载定价。Free 档自带 key 意味着模型费你自己付。团队已经统一到别的智能体运行时，要掂量迁移成本。想要完全离线的本地编码智能体，Qoder 走的是托管模型，方向不对。</p>
<h2>上手技巧</h2>
<ul>
<li><strong>试用期留给 Quest，别花在补全上。</strong>14 天 Pro 试用加 300 积分，是测 Experts Mode 和长任务委派最便宜的方式，这两样才是它跟普通 copilot 的区别。只试补全，试不出平台值不值。</li>
<li><strong>盯住每个功能的积分消耗。</strong>Quest Agent Mode 一次约 50 积分，Experts Mode 约 75 积分。打算重度跑自主任务，就按 Pro+ 或 Ultra 预算，不然月额度第一周就没了。</li>
<li><strong>旧代码先跑 Repo Wiki。</strong>陌生代码库先出一份结构化地图，后面每个智能体任务都更省积分、更准。一个仓库约 50 积分，很快回本。</li>
<li><strong>委派之前先写 Rules。</strong>测试、提交风格、文件布局这些约定写进 Rules，智能体会一直遵守，不用每次在提示词里重讲。</li>
<li><strong>接 MCP 服务器。</strong>Qoder 支持 Model Context Protocol，已有的 MCP 工具可以直接带过来，不用单独做集成。</li>
<li><strong>账单周期结束前看用量页。</strong>套餐积分每月清零，积分包一个月过期。手上还有余额，就花在该做的活上。</li>
</ul>
<h2>限制和风险</h2>
<ul>
<li><strong>积分按时间过期。</strong>月套餐积分到期清零，积分包买后一个月失效且不退。轻度用户囤包容易白花钱。</li>
<li><strong>免费档是引子，当不了日常主力。</strong>补全限量、基础模型有每日上限，Quest 和 Repo Wiki 都在付费档里，重度使用绕不开订阅。</li>
<li><strong>能力宣传大多来自厂商。</strong>官方客户案例里的数字很亮眼，比如 AMAP 把一次性通过率从 37.3% 提到 61.5%，小鹏称风险筛查效率提升 96 倍。这些是厂商发布的工程故事，不是独立基准。</li>
<li><strong>独立讨论还不多。</strong>Hacker News 上关于 Qoder 上线和 Quest Mode 的讨论热度远低于 Cursor 和 Claude Code。中文社区材料多一些，但不少跟厂商沾边，结论要用自己的负载验证。</li>
<li><strong>试用有附加条件。</strong>14 天 Pro 试用需要最新客户端，虚拟机里不生效，一个用户限一个账号。</li>
</ul>
<h2>站内相关</h2>
<ul>
<li><a href="/zh/listing/cursor/">Cursor</a>，打磨成熟的 AI 优先编辑器，社区大</li>
<li><a href="/zh/listing/github-copilot/">GitHub Copilot</a>，IDE 覆盖广，助手模式更简单</li>
<li><a href="/zh/listing/claude-code/">Claude Code</a>，终端优先的智能体工作流</li>
<li><a href="/zh/listing/qwen-cli/">Qwen CLI</a>，想要 Qwen 模型族更轻的命令行工具</li>
<li>全部 <a href="/zh/listing-category/ai-coding/">AI 编程工具</a>，以及我们的 <a href="/zh/best-free-ai-coding-tools-in-2026/">免费 AI 编程工具清单</a></li>
</ul>
<h2>资料来源</h2>
<ul>
<li><a href="https://docs.qoder.com/product-series/what-is-qoder" rel="nofollow noopener" target="_blank">Qoder 官方文档</a>，产品总览和文档索引</li>
<li><a href="https://docs.qoder.com/account/pricing" rel="nofollow noopener" target="_blank">价格页</a>和<a href="https://docs.qoder.com/Credits" rel="nofollow noopener" target="_blank">积分说明</a>，含各功能消耗估算</li>
<li><a href="https://qoder.com/" rel="nofollow noopener" target="_blank">Qoder 官网</a></li>
<li><a href="https://news.ycombinator.com/item?id=44985471" rel="nofollow noopener" target="_blank">Hacker News 讨论</a>（Quest Mode），以及<a href="https://news.ycombinator.com/item?id=44976675" rel="nofollow noopener" target="_blank">上线帖</a></li>
</ul>
