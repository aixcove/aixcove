---
title: Dify
date: '2026-04-19T14:42:28'
modified: '2026-08-25T12:30:00'
slug: dify
description: Dify 是开源平台，用于可视化 AI 应用工作流、RAG、智能体与模型集成。本文讲实际操作优势、限制与自托管要点。
categories:
- ai-agents
wpId: 638
image: /uploads/2026/04/dify-4.jpg
featured: false
---
<h2>Dify 是什么</h2>
<p>Dify 是一个开源的 LLM 应用构建与运营平台，能做聊天助手、企业内部知识问答、基于自有文档的 RAG 检索，也能编排多步骤的 Agent 工作流。它把本来要自己拼装的东西——开发框架、向量库、各家模型 API、前端界面——整合进一个 Web 控制台：在这里设计应用、管理知识库、切换模型，最后以 API 或托管网页应用的形式发布。产品由 LangGenius 开发，源码在 <code>github.com/langgenius/dify</code>，星标约 15.3 万，既可以用官方云服务，也可以用 Docker 自托管。</p>
<h2>实际能用到什么</h2>
<ul>
<li><strong>可视化工作流编排。</strong>在画布上把 LLM 节点、条件分支、代码块、HTTP 请求和工具调用串成 Agent 工作流。不懂工程的人能看懂流程图，工程师在画布不够用时可以退回代码节点。</li>
<li><strong>RAG 管道。</strong>导入文档或同步数据源，选择索引模式，测试检索命中，再把知识库挂到任意应用上。注意高质量索引模式会快速消耗云版存储配额。</li>
<li><strong>模型支持广。</strong>数十家供应商的数百个闭源与开源模型：OpenAI、Anthropic、Gemini、xAI、Mistral、Llama 系列、通义，以及任何兼容 OpenAI API 的服务。密钥自己带。</li>
<li><strong>应用模板。</strong>聊天机器人、文本生成器、Agent 都有预置起点，另支持插件、定时和 Webhook 触发器来跑后台任务。</li>
<li><strong>插件市场。</strong>模型供应商、工具、数据源和 MCP 集成从市场安装，不必每个项目重新接线，团队还能跨应用复用审核过的插件。</li>
<li><strong>运营能力内置。</strong>日志、可提升为标准答案的标注、提示词对比、可观测性接口。应用见真实用户之后，这些才是最常用的部分。</li>
</ul>
<h2>定价：云版与免费自托管版</h2>
<p>Dify Cloud 按工作区计费，年付（比月付省约 17%）：</p>
<ul>
<li><strong>Sandbox（免费）。</strong>200 条消息额度用来试模型，1 名成员、5 个应用、50 篇知识文档、50MB 知识存储、日志保留 30 天。评估产品够用，跑正经业务不够。</li>
<li><strong>Professional，每年 590 美元/工作区。</strong>每月 5,000 条消息额度、3 名成员、50 个应用、500 篇知识文档、5GB 存储、每月 20,000 次触发事件、日志无限保留。</li>
<li><strong>Team，每年 1,590 美元/工作区。</strong>每月 10,000 条额度、50 名成员、200 个应用、1,000 篇文档、20GB 存储、触发事件不限量、优先处理。</li>
<li><strong>Enterprise（定制）。</strong>SSO、商业授权、多工作区、协商 SLA 和官方支持。</li>
</ul>
<p>有个细节要弄清：消息额度覆盖的是 OpenAI、Anthropic、Gemini、xAI、通义这些供应商的模型调用，额度用完后切换到自己的 API 密钥，token 费用直接向模型厂付。所以真实预算是套餐费加模型消耗。</p>
<p>Community Edition 是免费的自托管版本：公共仓库的全部核心功能、单一工作区、Docker Compose 部署。许可证基于 Apache 2.0 附加两条——未经书面授权不得用源码做多租户服务；使用其前端时不得移除或修改 Logo 和版权信息，除非购买商业授权。对内部部署来说，这两条基本不影响。</p>
<h2>适合谁</h2>
<p>Dify 适合同时养着好几个 AI 应用、又请不起平台团队的组织：统一公司内部助手建设方式的工具团队，没有 ML 工程师但要上线客服机器人的小组，以及维护多个客户项目、没法每次都交付裸代码的代理商。数据合规要求自托管的场景也合适。如果业务逻辑确实特殊，<a href="/zh/listing/langgraph/">LangGraph</a> 或 <a href="/zh/listing/langchain/">LangChain</a> 这类代码优先的方案控制力更强；想要更轻的可视化替代品可以看 <a href="/zh/listing/flowise/">Flowise</a>。</p>
<h2>需要知道的限制</h2>
<p>可视化编排有天花板。自定义逻辑重的工作流迟早会和画布较劲，需求特别怪的团队最后往往迁去代码框架。自托管意味着自己扛运维：Dify 是带数据库和队列的多容器架构，升级和资源规划都得自己来。云版的配额是实打实的——Professional 只有 3 个席位和 500 篇文档，多团队的组织按工作区计费会成倍增加。模型成本也不会消失，额度只是试用补贴，不是 token 余量。这些都不算暗坑，但承诺之前先把账算清楚。</p>
<h2>官方链接</h2>
<ul>
<li><a href="https://dify.ai" rel="nofollow noopener" target="_blank">dify.ai</a> — 产品、定价与云版注册</li>
<li><a href="https://github.com/langgenius/dify" rel="nofollow noopener" target="_blank">github.com/langgenius/dify</a> — 源码、Docker Compose 快速上手与许可证文本</li>
</ul>
