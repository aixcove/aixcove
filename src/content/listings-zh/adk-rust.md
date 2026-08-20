---
title: ADK-Rust
date: '2026-05-11T02:20:22'
modified: '2026-08-20T10:30:00'
slug: adk-rust
description: ADK-Rust 是用 Rust 写 AI 智能体的开源框架，42 个 crate 覆盖模型、工具、记忆、RAG、实时语音和可恢复的图工作流。这篇讲它适合谁、有哪些坑和上手技巧。
categories:
- ai-coding
wpId: 786
image: /uploads/2026/05/adk-rust.jpg
featured: false
---
<h2>ADK-Rust 是什么</h2>
<p>ADK-Rust 是一个用 Rust 写 AI 智能体的开源框架，Apache-2.0 协议，由 zavora-ai 社区维护。名字跟 Google 的 Agent Development Kit 撞了，两边是各自独立的项目。Google 的 ADK 是 Python 的，ADK-Rust 是社区项目，用 Rust 的类型系统做同一类事。</p>
<p>动笔前我把仓库、文档站、wiki 和讨论区都翻了一遍。项目是真在动的，2.0.0 刚发不久，仓库几乎每天都有提交，现在大约 615 个 star、92 个 fork。这个规模比 LangGraph、CrewAI 小不少，文档也还在追新功能的路上。</p>
<h2>它能给你什么</h2>
<p>框架拆成 42 个 crate，外面套一个总依赖。先选功能档位（minimal、standard、enterprise、full），再按需往上加单个 crate。实际用得多的是这几块。</p>
<ul>
<li><strong>类型化工具。</strong>一个 #[tool] 属性就能从 Rust 参数类型推出 JSON schema，模型拿到的工具契约不用手写。</li>
<li><strong>图工作流。</strong>类 LangGraph 的编排，支持子图、动态路由、节点级重试和超时，SQLite 检查点让中断的任务能跨进程接着跑。</li>
<li><strong>模型覆盖。</strong>Gemini、OpenAI、Anthropic、DeepSeek、Groq、Ollama、Bedrock、Azure 都能接，Fireworks、Together、xAI 这类走 OpenAI 兼容协议，本地推理用 Ollama 或 mistral.rs。</li>
<li><strong>实时语音。</strong>OpenAI Realtime 和 Gemini Live，双向音频、VAD、视频帧都有。</li>
<li><strong>RAG 与记忆。</strong>切块、向量检索、六个后端，记忆层里还带一个双时态知识图谱。</li>
<li><strong>服务与协议。</strong>REST 加 SSE、A2A v1.0、MCP 客户端和服务端、后台任务和定时任务。</li>
<li><strong>运维件。</strong>护栏、RBAC、SSO、审计日志、OpenTelemetry、评测框架、浏览器自动化、沙箱执行代码。</li>
</ul>
<p>项目自己公布过一组性能数字，2026 年 6 月在 Apple M 系列上测的，单轮 agent loop 开销约 568 微秒，LangGraph 是 1228 毫秒，冷启动 109 毫秒。这些是官方口径，动手之前最好用 cargo adk bench 在自己的负载上复测一遍。</p>
<h2>典型工作流</h2>
<p>上手就两条命令。先 cargo install cargo-adk 装子命令，再 cargo adk new my-agent --template rag 建项目。模板有 llm、tools、sequential、parallel、loop、conditional、graph、realtime、rag、api 这些，还有 production、multi-agent、pipeline 之类预拼好的组合，--addon 可以往任意模板上叠 telemetry、auth、memory、mcp、guardrails。</p>
<p>第一次搭的样子通常是，用 tools 模板起项目，写两三个 #[tool] 函数，模型指向自己用的厂商，行为稳定以后再套 api 模板把它变成 HTTP 服务。换模型厂商不用改 agent 代码，换客户端就行，同一个原型可以从 Gemini 换到 Anthropic 或本地 Ollama。</p>
<h2>适合谁，不适合谁</h2>
<p>适合本来就在写 Rust 的团队，想要类型安全、能自托管的智能体层。要低启动延迟的实时语音产品、必须扛得住重启的工作流，都能用上；想走 MCP、A2A 这类开放协议、不绑死单一厂商的，也是它比较擅长的方向。</p>
<p>不适合的情况也很清楚。团队不写 Rust 就别碰。要最大生态和社区，LangGraph、CrewAI 或者 Python 版 ADK 是更省力的路。想要开箱即用的编码智能体，OpenCode、Qwen CLI 这类现成产品比用框架零件自己攒一个省事。</p>
<h2>上手技巧</h2>
<ul>
<li><strong>从 minimal 档开始。</strong>默认特性编译快、依赖树小，用到 audio、browser 再单独加。档位是起点，不是天花板。</li>
<li><strong>按活选模板。</strong>检索类任务用 rag，多步持久任务用 graph，语音、对外服务也各有对应模板。脚手架代码比空白 main.rs 好起步。</li>
<li><strong>给工具标好元数据。</strong>read_only、concurrency_safe、long_running 标清楚，runner 才能正确并行和告警，不用猜。</li>
<li><strong>重要的图都开检查点。</strong>SQLite 检查点加 RetentionPolicy，跑一周的长任务才稳，没有保留策略检查点会无限涨。</li>
<li><strong>部署前先验证。</strong>cargo adk validate 不编译就能查 agent 定义，cargo adk bench --dry-run 先看费用预估，再决定要不要真跑 API。</li>
<li><strong>模型名和下线日期要盯。</strong>README 里就写着 gemini-2.0-flash 和 gemini-2.0-flash-lite 在 2026 年 3 月 31 日下线。厂商模型说换就换，把供应商配置集中放一处。</li>
</ul>
<h2>限制和风险</h2>
<ul>
<li><strong>项目年轻，社区小。</strong>约 615 个 star、13 个 open issue。讨论区大多是技术问答，好几个帖子就是找文档还没写全的功能，比如有人问为什么文档里找不到 DeepSeekClient。</li>
<li><strong>文档追不上代码。</strong>wiki、指南、docs.rs 都挺全，但项目跑得快，尝鲜功能经常要读源码或者去讨论区问。</li>
<li><strong>性能数字是官方测的。</strong>568 微秒、4300 多个测试都是项目自己的口径，写进决策前先用自己的负载复现。</li>
<li><strong>有实验性角落。</strong>managed 运行时进程一死状态就没了，Windows 的 AppContainer 沙箱还没实现，agent 支付是全新功能。要在这几块上盖东西，先读 STABILITY.md 里的稳定性分级。</li>
<li><strong>大版本有迁移成本。</strong>1.x 升 2.0 改了六个 API 和一个默认行为，升主版本要留时间。</li>
</ul>
<h2>价格和授权</h2>
<p>框架本身免费，Apache-2.0。真实成本是模型 API key（默认 Gemini，其他厂商各付各的），或者本地跑 Ollama、mistral.rs 的硬件，加上你自己部署的基础设施。没有托管版，没有用量上限，除了你选的 API key 没有厂商锁定。</p>
<h2>站内相关</h2>
<ul>
<li><a href="/zh/listing/langgraph/">LangGraph</a>，同样的图思路，Python 生态和社区大得多</li>
<li><a href="/zh/listing/autogen-studio/">AutoGen Studio</a>，可视化、无代码的智能体搭建</li>
<li>要的是编码智能体而不是框架，看 <a href="/zh/listing/opencode/">OpenCode</a> 或 <a href="/zh/listing/qwen-cli/">Qwen CLI</a></li>
<li>全部 <a href="/zh/listing-category/ai-coding/">AI 编程工具</a>和<a href="/zh/best-free-ai-coding-tools-in-2026/">免费 AI 编程工具清单</a></li>
</ul>
<h2>资料来源</h2>
<ul>
<li><a href="https://github.com/zavora-ai/adk-rust" rel="nofollow noopener" target="_blank">GitHub 仓库</a>，README、更新日志、迁移指南都在这里</li>
<li><a href="https://docs.rs/adk-rust" rel="nofollow noopener" target="_blank">docs.rs</a> API 参考</li>
<li><a href="https://github.com/zavora-ai/adk-rust/wiki" rel="nofollow noopener" target="_blank">项目 wiki</a></li>
<li><a href="https://github.com/zavora-ai/adk-rust/discussions" rel="nofollow noopener" target="_blank">GitHub Discussions</a> 社区问答</li>
<li><a href="https://adk-rust.com/en" rel="nofollow noopener" target="_blank">官网</a></li>
</ul>
