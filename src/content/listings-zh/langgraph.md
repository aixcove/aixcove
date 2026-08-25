---
title: LangGraph
date: '2026-04-19T14:39:23'
modified: '2026-08-25T10:30:00'
slug: langgraph
description: LangGraph 是 LangChain 团队的开源智能体编排框架，提供持久执行、人机协同与循环图控制。本文讲清它真正多给的东西、上手方式与局限。
categories:
- ai-agents
wpId: 631
image: /uploads/2026/04/langgraph-3.jpg
featured: false
---
<h2>LangGraph 是什么</h2>
<p>LangGraph 是一个开源的 Python 框架，附带对应的 JavaScript 库 LangGraph.js，用来搭建长时间运行、有状态的智能体。它出自 LangChain Inc.，也就是 LangChain 框架背后的公司，不过用 LangGraph 不需要连带用 LangChain。项目采用 MIT 许可证，GitHub 星标已过四万，发版节奏稳定，2026 年年中的当前版本是 1.2.x。</p>
<p>对它最诚实的描述是编排基础设施，官方文档自己也是这么定位的。LangGraph 不替你选提示词，也不替你定架构。它给你的是一个图运行时，图里每个节点都是你自己写的普通函数。这些函数可以是确定性步骤，比如校验、分流、写数据库，也可以是调用大模型、决定下一步走向的智能体步骤。你把节点连起来，允许循环和分支，运行时负责状态、调度和步骤之间的持久化。</p>
<h2>比手写代码多给了什么</h2>
<p>每个团队都会问一个合理的问题，到底需不需要框架。一群工程师在 Hacker News 上讨论过他们为一个编程智能体选择 LangGraph 的原因，观点分歧很能说明问题。批评者认为这层抽象没有必要，还抱怨破坏性更新。支持者包括 LangChain 的维护者，他们指出了那些换成手写就得自己造的具体机制。</p>
<ul>
<li><strong>持久执行。</strong>图状态会被存成检查点，中途失败或被打断的运行可以从断点恢复，不必从头再来。这对一跑就是几分钟几小时的智能体很关键。</li>
<li><strong>人机协同。</strong>可以在任意节点暂停图，把状态交给一个人看，允许对方修改后继续。有位 HN 评论者把吸引力概括成一台带时光机的状态机，分析员可以手工修正某次模型输出，试一条分支，不行再回滚。</li>
<li><strong>没有数据竞争的循环。</strong>LangGraph 实现了 Pregel 批量同步并行模型的变体，能处理带环和并行分支的图，不会出现手写异步代码时常见的竞态。</li>
<li><strong>记忆。</strong>单次运行内的工作记忆和跨会话的长期记忆都是一等概念，不用自己在外面拼接。</li>
</ul>
<h2>典型工作流</h2>
<p>一个常见的形状是工单分诊智能体。一个节点用便宜的模型给进来的工单分类。一个确定性节点按规则路由。一个智能体节点带着知识库检索之类的工具起草回复。一个人机协同中断点把草稿拦住，等运营确认或修改后再放行。进程半夜挂了，检查点存储让它在第二天早上接着跑。团队通常再配上同公司的付费观测平台 LangSmith 来追踪每次运行，不过 LangSmith 是可选项，没有绑定，换成别的追踪方案也可以。</p>
<h2>上手建议</h2>
<ul>
<li>在干净的虚拟环境里 <code>pip install -U langgraph</code>，要求 Python 3.10 及以上。如果你要的只是标准的对话加工具循环，先试更高层的 LangChain 智能体抽象或 Deep Agents 包，需要自定义控制流时再降到 LangGraph。</li>
<li>确定性逻辑放进普通节点，大模型调用留在清晰的边界后面。这是文档反复推荐的写法，也是运行可审计的原因，手写部分每次行为一致。</li>
<li>在依赖持久性之前先选定检查点后端，本地开发用 SQLite，生产用 Postgres 或 Redis。没有持久化检查点，崩溃的运行就得从头开始。</li>
<li>运行不对劲时去看状态转移，别只读日志。LangGraph 按超级步存储状态，通常能定位到输出变坏的那一跳。</li>
</ul>
<h2>局限与摩擦</h2>
<p>LangGraph 明确走低层路线。想要开箱即用的智能体，它不是合适的起点。API 在大版本间出现过破坏性变更，这是社区讨论里反复出现的抱怨。调试分布式运行仍然最好配 LangSmith，而那是个商业产品，坚持全开源技术栈就意味着自己接追踪。学习曲线也真实存在，只用过提示词链的人要花几天才能让图和状态的思维模型对上。</p>
<h2>LangGraph 与 AutoGen Studio、CrewAI 的差别</h2>
<p>AutoGen Studio 是微软 AutoGen 框架的可视化原型界面，面向多智能体团队的实验，而 AutoGen 项目在 2026 年进入维护模式。CrewAI 提供基于角色的编排，很多团队觉得快速搭建时更友好。LangGraph 要求更多前期工程投入，但对执行、状态和恢复的控制最细。需要结构、确定性和可审计的工作流，三者里通常选 LangGraph。</p>
<h2>适合谁用</h2>
<p>适合在构建需要分支逻辑、持久状态、人工审核或长时间可靠运行的智能体系统的 AI 工程师和产品团队。如果你的场景只是一次模型调用或一条线性链，用提供商 SDK 写普通代码更简单。如果你想在投入工程之前先可视化地试验智能体想法，低代码工具上手更快。</p>
<h2>相关链接</h2>
<ul>
<li><a href="https://github.com/langchain-ai/langgraph" target="_blank" rel="noopener noreferrer">LangGraph GitHub 仓库</a></li>
<li><a href="https://docs.langchain.com/oss/python/langgraph/overview" target="_blank" rel="noopener noreferrer">LangGraph 官方文档</a></li>
<li><a href="https://www.qodo.ai/blog/why-we-chose-langgraph-to-build-its-coding-agent/" target="_blank" rel="noopener noreferrer">Qodo 讲选型 LangGraph 的文章与 HN 上的批评讨论</a></li>
<li>站内可对比 <a href="/zh/listing/autogen-studio/">AutoGen Studio</a> 与 <a href="/zh/listing/crewai/">CrewAI</a></li>
</ul>
