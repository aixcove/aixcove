---
title: Flowise
date: '2026-04-19T14:39:27'
modified: '2026-08-22T10:30:00'
slug: flowise
description: Flowise 是开源的可视化 LLM 应用构建器，2026 年 8 月已归档停运。这篇讲它做过什么、为什么关停、安全记录，以及现有用户往哪里迁移。
categories:
- ai-agents
wpId: 633
image: /uploads/2026/04/flowise-1.jpg
featured: false
---
<h2>Flowise 已归档，动手前先读这段</h2>
<p>Flowise 曾是热门的开源可视化 LLM 应用构建器，把节点拖到画布上，就能拼出聊天机器人、RAG 流水线和智能体流程。2025 年 8 月它被 Workday 收购，2026 年 7 月 29 日团队宣布逐步关停。GitHub 仓库在 8 月 13 日转为归档，官方公布的最终支持日期是 8 月 31 日，之后 Discord 和 GitHub 上的官方维护就结束了。npm 包和 Docker 镜像被标记为废弃。</p>
<p>今天评估 Flowise 的人需要先知道这些。新功能开发已经停止，issue 和 pull request 全部锁定，没有人再修问题。代码以 Apache-2.0 留在 GitHub 上，你可以自由 fork，但 fork 之后它就成了你自己维护的项目。要开新项目，选还在维护的工具。生产环境已经在用 Flowise 的，规划迁移或 fork，同时对照下面的安全问题检查自己的暴露面。</p>
<h2>Flowise 实际能做什么</h2>
<p>Flowise 提供一个节点式画布，分三个层级的构建器。Assistant 是入门路径，做一个能听指令、会调工具、能从上传文件里检索回答的聊天助手。Chatflow 面向单智能体聊天机器人和简单 LLM 流程，支持检索、重排序和 Graph RAG。Agentflow 是超集，覆盖多智能体系统和复杂编排，最后的 Agentflow V2 是停运前的主力版本。</p>
<p>它接入了 100 多个数据源、工具、向量数据库和记忆方案。可以完全自托管，包括离线部署，也可以用 Flowise Cloud。对外提供 API、JS 和 Python SDK、CLI、可嵌入的聊天组件，以及一个 MCP 节点接 Model Context Protocol 工具。企业控制项有 RBAC、SSO、加密凭证、密钥管理器、限流和域名白名单。评估层支持数据集、评估器和评估运行。</p>
<h2>为什么关停</h2>
<p>停运公告给了一个直接原因。模型推理能力变强以后，开发者转向编码智能体处理复杂工作，僵化的低代码工作流在复杂度面前很快见顶。Hacker News 评论区的看法大体一致，还补了一句，工作流构建器烧 token、难测试。这个品类整体在收缩，OpenAI 的 Agent Builder 也在 2026 年被废弃。关停是整个赛道的转向，不只是某家公司经营不善。</p>
<p>有一个细节值得记住。Workday 2025 年 8 月收购 Flowise 时说过，Flowise 不会走，他们还要加码。不到一年就关停了。如果你选工具会参考背后的公司稳不稳，这个时间线就是现成的警示。</p>
<h2>必须知道的安全记录</h2>
<p>Flowise 攒下一串严重的安全问题，补丁停了以后这些更值得重视。2025 到 2026 年披露了多起远程代码执行漏洞，包括 CVE-2026-40933，MCP 节点上的最高严重级 RCE，有报道称已被攻击者利用，还有 CVE-2026-41268 等一串。elttam 在 2026 年 8 月的独立审计里又描述了 3.1.1 和 3.1.2 版本里的六条 RCE 路径，以及密码重置、改邮箱流程里能接管账号的历史缺陷和多次沙箱逃逸。</p>
<p>其中一部分需要登录用户或配置不当的自定义 MCP 节点才能触发，项目还在维护时官方也发过补丁。现在的实际风险在修复窗口已经关闭。自己 fork 的话，这些路径的修复就落在你头上。把 Flowise 实例暴露到公网，默认它已经是攻击目标。</p>
<h2>已经在用的人怎么办</h2>
<p>现有用户有两条诚实的路。一条是 fork 仓库内部维护，工作流原样保留，但安全修复和对新模型的兼容都变成你自己的责任。另一条是迁移到还在维护的构建器。Dify 是产品化程度最接近的替代，数据集、提示词管理和应用部署在一个层里。Langflow 保持相近的节点式体验，n8n 覆盖更广的自动化，想要代码级控制智能体状态就选 LangGraph。</p>
<p>迁移之前先盘点流程真正依赖什么。用了哪些向量库、哪些模型厂商、哪些自定义节点。多数可视化构建器覆盖相同的核心集成，但自定义 JavaScript 节点和冷门连接器是迁移成本最贵的地方。</p>
<h2>过渡期的实用建议</h2>
<ul>
<li><strong>别拿它开新项目。</strong>仓库已归档，包已废弃，不会再有修复。在 Flowise 上新建东西，第一天就是负债。</li>
<li><strong>还要继续跑，就先隔离。</strong>别把实例公开暴露，放在认证后面，把 MCP 节点和自定义代码执行当成高危面处理。</li>
<li><strong>要 fork 就趁现在。</strong>代码是 Apache-2.0，留在 GitHub 上，fork 合法也简单，只是要预算好长期维护。</li>
<li><strong>趁早导出并记录流程。</strong>逐个过一遍流程，记下用到的集成和凭证，迁移前先有这份清单，新工具才能覆盖同样的范围。</li>
<li><strong>先用一个流程试迁移。</strong>拿最简单的生产流程在候选工具里重建，对比输出质量和成本，再铺开其余部分。</li>
<li><strong>对照已知 CVE 查自己的版本。</strong>版本较旧，就默认 2026 年披露的 RCE 路径适用。归档项目上升级已无意义，这本身也是迁移的理由。</li>
</ul>
<h2>现在还有谁适合用</h2>
<p>Flowise 作为可视化 LLM 构建器怎么搭的参考仍然有价值，归档的源码对想造同类工具的人是学习材料。真有 fork 加内部维护策略的团队，可以继续养着它。其他所有人，包括需要长期支持、安全修复或新模型集成的人，它都不再是可选答案。</p>
<h2>站内相关</h2>
<ul>
<li><a href="/zh/listing/dify/">Dify</a>，最接近的还在维护的替代，带完整应用层</li>
<li><a href="/zh/listing/langgraph/">LangGraph</a>，代码级控制智能体状态和编排</li>
<li><a href="/zh/listing/anythingllm/">AnythingLLM</a>，更简单的私有文档聊天工作区</li>
<li>全部 <a href="/zh/listing-category/ai-agents/">AI 智能体工具</a>，我们的 <a href="/zh/best-flowise-alternatives-in-2026/">Flowise 替代品指南</a>，以及 <a href="/zh/dify-vs-flowise-which-ai-builder-fits-you-in-2026/">Dify 与 Flowise 对比</a></li>
</ul>
<h2>资料来源</h2>
<ul>
<li><a href="https://github.com/FlowiseAI/Flowise" rel="nofollow noopener" target="_blank">GitHub 仓库</a>，已归档，README 和讨论 #6727 里有停运公告</li>
<li><a href="https://flowiseai.com/sunset" rel="nofollow noopener" target="_blank">官方停运公告</a>，含 EOL 时间线</li>
<li><a href="https://www.elttam.com/blog/cruising-for-shells-in-flowise" rel="nofollow noopener" target="_blank">elttam 安全审计</a>，六条 RCE 路径和更早的 CVE 历史</li>
<li><a href="https://news.ycombinator.com/item?id=49176920" rel="nofollow noopener" target="_blank">Hacker News 讨论</a>（停运）</li>
</ul>
