---
title: ZCode
date: '2026-06-19T04:20:52'
modified: '2026-08-25T12:01:41'
slug: zcode
description: ZCode 是 Z.ai 的智能体开发环境，围绕 GLM-5.3 深度联调：目标模式自动循环、浏览器自验证、项目记忆、子智能体、MCP、飞书/微信 Bot。本文讲清价格额度与限制。
categories:
- ai-coding
wpId: 869
image: /uploads/2026/06/zcode-official-docs-featured.jpg
featured: false
---
<h2>ZCode 是什么</h2>
<p>ZCode 是 Z.ai 推出的智能体开发环境（ADE），一个把 GLM-5.3 放进真实编程工作流的桌面应用。你描述一个目标，自研的 ZCode Agent 负责规划、改文件、跑终端命令、用内置浏览器验证自己的改动，并在长链条任务里持续推进。目标、文件、终端结果、浏览器上下文、执行模式和 Git 状态都保存在同一个任务里，一个功能可以从规划一路走到实现和验证收口，中途不会丢上下文。</p>
<p>当前版本围绕 GLM-5.3 稳定的 1M 上下文与长程任务能力做了专项联调。官方文档对产品定位说得很直白：模型、工具和执行工作流是一体设计的，产品中心是 Agent，而不是一个带聊天侧栏的传统编辑器。</p>
<h2>核心能力</h2>
<ul>
<li><strong>目标模式。</strong>用 <code>/goal</code> 设定目标后，Agent 自动循环：每轮结束检查目标是否达成，没达成就开下一轮，完成才收尾。适合一句话说得清、但要做很多轮的工作。</li>
<li><strong>浏览器自动化。</strong>内置浏览器面板可由 Agent 驱动——打开 URL、点击、填表、截图，并根据页面实际状态决定下一步。前端改动能自己打开页面走一遍验证，而不是口头声称没问题。</li>
<li><strong>记忆与 Wiki。</strong>项目级长期记忆保存你的 commit 风格、包管理器偏好、评审约定，并在后续会话自动带回；仓库 Wiki 维护更广的项目上下文。</li>
<li><strong>子智能体。</strong>内置通用型和探索型子智能体，也可在设置里自定义。它们在隔离上下文中运行，把结论汇报给主 Agent，适合并行调研而不污染主上下文。</li>
<li><strong>MCP 支持。</strong>统一管理 Model Context Protocol 服务器配置，手动配置与插件自带分组展示，对 GLM-5.3 系列的多步编程工作流适配较好。</li>
<li><strong>Remote 与 Bot 渠道。</strong>桌面端、手机 Remote、飞书/微信 Bot 都能推进同一个工作区任务——@ 一下机器人，人离开工位 Agent 继续干。</li>
<li><strong>权限模式。</strong>四种执行模式直接放在任务界面；敏感命令、文件修改、网络调用和脚本执行先确认再执行，高风险状态在工具栏持续可见。</li>
<li><strong>自动化与闲时任务。</strong>不着急的工作排进闲时队列，订阅用户在算力富余时段免费执行，不消耗套餐额度。</li>
</ul>
<h2>价格与获取</h2>
<p>ZCode 应用本身免费下载使用。新用户有 5 天免费体验：GLM-5.3 每天 300 万 Token，加 GLM-5-turbo 每天 200 万 Token（合计每日 500 万）——官方明确这组额度只在 5 天内每日发放，到期失效，不是长期福利。持续使用需绑定 BigModel 或 Z.ai 账号的 GLM Coding Plan，使用统计里可查看额度、模型消耗和工具调用；也支持自带 API Key、企业模型通道或经审核的自托管服务。订阅用户的闲时任务在空闲时段免费执行（功能逐步开放中）。</p>
<p>安装覆盖面是真正的全平台：macOS（Apple Silicon 与 Intel）、Windows x64/ARM64、Linux x64 AppImage。数据迁移向导目前只支持从 Claude Code 和旧版 ZCode Agent 导入历史会话，其他工具不支持。</p>
<h2>适合谁</h2>
<p>已经在 GLM 生态里（BigModel/Z.ai 账号、Coding Plan 或 API Key）、需要长程智能体式开发（实现功能、验证、评审、换设备继续）的开发者和小团队，最能吃到 ZCode 的红利。飞书/微信 Bot 渠道对中文团队工作流是实打实的差异化。如果你的技术栈绑在 Anthropic/OpenAI 订阅上、从不使用 GLM 模型，ZCode 最强的深度 GLM-5.3 联调反而会变成约束。</p>
<h2>使用前要知道的限制</h2>
<ul>
<li>模型覆盖以 GLM 为先，深度调优明确面向 GLM-5.3 系列。</li>
<li>闲时任务免费执行仅限订阅用户，且仍在逐步开放。</li>
<li>迁移向导只认 Claude Code 和旧版 ZCode Agent 的历史。</li>
<li>文档虽全但产品迭代快——额度条款和功能开关会随版本变动，依赖某个具体额度前先查官方文档。</li>
</ul>
<p>官方文档：<a href="https://zcode.z.ai/cn/docs/welcome" rel="nofollow noopener" target="_blank">zcode.z.ai/cn/docs/welcome</a></p>
