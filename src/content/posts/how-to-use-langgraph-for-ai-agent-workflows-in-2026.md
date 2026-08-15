---
title: How to Use LangGraph for AI Agent Workflows in 2026
date: '2026-05-09T00:06:45'
modified: '2026-08-11T19:14:38'
slug: how-to-use-langgraph-for-ai-agent-workflows-in-2026
description: 'If you want a short answer, here it is: LangGraph is one of the best ways to build AI agent workflows when you need real control over routing, memory, tool use, and human approval. It is free and open'
categories:
- ai-tutorials-how-tos
featured: /uploads/2026/05/image-1-bfc8e2cb-f984-4861-bff4-8c833b124d3f.jpg
wpId: 775
titleZh: "LangGraph怎么用：2026年AI Agent工作流教程"
descriptionZh: "LangGraph是构建AI智能体工作流的优选方案，支持路由、记忆、工具调用及人工审批，免费开源。"
bodyZh: |
  <p>如果你想要一个简短的回答，那就是：LangGraph 是在你需要真正控制路由、记忆、工具使用和人工审批时，构建 AI 智能体工作流的最佳方式之一。它基于 MIT 许可证免费开源，但并不是最容易上手的起点。你用可视化构建器换来了代码级控制，因此它最适合开发人员和技术团队，而不是无代码的普通用户。</p>
  <p>这种取舍就是全部关键。很多“LangGraph 教程”页面展示一个玩具计算器智能体就结束了。有用，当然。但人们转向 LangGraph 的原因不是想要另一个演示。他们想要一个在工作流变得混乱时真正能掌控的智能体。</p>
  <p>如果这听起来像你，本指南会让你动起来。如果你还在代码优先和可视化工具之间犹豫，看完这里后可以查看 <a href="/listing/langgraph/">LangGraph 列表</a>、<a href="/listing/flowise/">Flowise 列表</a>，以及我们的 <a href="/dify-vs-flowise-which-ai-workflow-builder-fits-you-in-2026/">Dify 与 Flowise 对比</a>。</p>
  <h2>LangGraph 擅长什么，哪里让人头疼</h2>
  <p>LangGraph 是 LangChain 技术栈中的底层编排框架。它不把智能体当作一个长提示循环，而是让你将工作流建模为节点、边和共享状态。官方快速入门提供了 Graph API 和 Functional API 两种方式，这很有帮助，因为不是每个团队都想立刻用图原语来思考。</p>
  <p>实际适用场景如下：</p>
  <ul>
  <li><strong>最适合：</strong>构建多步骤智能体、工具使用助手、审批密集型工作流或有状态自动化的开发人员。</li>
  <li><strong>定价：</strong>LangGraph 本身免费。你的实际成本来自模型 API、向量存储、追踪和基础设施。</li>
  <li><strong>主要优势：</strong>细粒度路由、记忆、人机协同控制、流式输出，以及比黑盒智能体封装更容易调试。</li>
  <li><strong>主要限制：</strong>它要求你像工程师一样思考。如果你想要拖拽式速度，<a href="/listing/flowise/">Flowise</a> 或 <a href="/listing/dify/">Dify</a> 会感觉更轻量。</li>
  </ul><p>这个限制很关键。LangGraph难，不是因为语法复杂，而是因为它逼着你定义清楚：当工具调用失败、当需要人工审批、当模型应该停下来而不是继续循环时，你的代理该怎么反应。这正是严肃团队喜欢它的原因。</p>
  <h2>开始前需要准备什么</h2>
  <p>做一个基础的LangGraph教程项目，你需要Python 3.10或更高版本、一个模型提供商，以及LangGraph包本身。官方快速入门用的是Anthropic，但如果你技术栈里已经有其他受支持的聊天模型，也可以替换。想最小化配置的话，先装核心包，把项目保持得很小。</p>
  <ul>
  <li><strong>框架层：</strong>LangGraph加上更广的<a href="/listing/langchain/">LangChain生态</a>。</li>
  <li><strong>模型层：</strong>Anthropic、OpenAI，或者你信得过的其他提供商。</li>
  <li><strong>可选但明智：</strong>项目超出玩具示例后，用LangSmith做追踪。</li>
  </ul>
  <p>底线：不要一上来就搞大型多代理系统。先做一个代理、两个工具、一条路由规则、一个清晰的状态对象。</p>
  <h2>第一步：给代理定义单一任务</h2>
  <p>多数教程直接跳到代码。我不会。先决定代理能做什么。第一个项目，好的入门任务包括：能搜索文档的支持助手、能调用网络工具的研究助手，或者一个能摘要并分派工单的小型内部机器人。</p>
  <p>糟糕的第一个项目是“构建一个通用自主代理”。听起来很雄心勃勃，但通常会变成一团乱麻的工作流，没有明确的停止条件。</p>
  <p>用LangGraph的话说，你的第一个设计问题很简单：<em>哪些状态需要从一个步骤存活到下一个步骤？</em>在官方文档里，这个状态包括消息历史和LLM调用计数器。在真实工作流中，你可能还要跟踪用户ID、最后使用的工具、审批标记或重试次数。</p>
  <h2>第二步：从小图开始，别搞大系统</h2>
  <p>官方快速入门用的是计算器代理。这个示例故意做得很小，值得照搬这种克制。你的第一个图只需要四个活动部件：</p>
  <ul>
  <li>一个模型节点，决定下一步做什么</li>
  <li>一个工具节点，运行选中的工具</li>
  <li>一个共享状态对象，保存消息和控制数据</li><li>一个条件边，决定工作流是继续还是停止</li>
  </ul>
  <p>这里的关键是循环。模型思考，需要时调用工具，拿到结果，再决定是回答还是继续干活。听起来简单，但这就是LangGraph比一堆松散的agent辅助函数更好用的核心原因。工作流是明确的。</p>
  <p>如果你用过<a href="/listing/crewai/">CrewAI</a>或其他高层级agent框架，会觉得这个更底层。这是优点。你看到的是路由逻辑，而不是依赖隐藏的默认设置。</p>
  <h2>第三步：添加模型能真正用好的工具</h2>
  <p>很多第一次用LangGraph的构建失败，原因很无聊：工具太差。框架通常不是问题，工具签名才是。</p>
  <p>每个工具保持窄范围。给它一个清晰的名字。写一个docstring，告诉模型什么时候调用它。返回结构化数据，别是一团乱麻。如果工具需要内部秘密上下文，把它藏在应用代码里，别暴露在模型可见的签名中。</p>
  <p>实用规则：如果人类队友会被你的工具名或参数列表搞糊涂，模型大概也会。</p>
  <h2>第四步：添加人们真正冲着LangGraph来的控制功能</h2>
  <p>这是LangGraph开始和简单教程拉开差距的地方。根据官方LangGraph产品页面，这个框架是为记忆、流式输出和人机协同控制设计的。如果你的实际用例依赖这些，别把那些想法留到“以后”。</p>
  <h3>人工审批</h3>
  <p>如果你的agent能发邮件、花钱、改记录或触发生产操作，加一个审批检查点。LangGraph擅长这类中断，因为工作流可以暂停、等待，并在上下文完整的情况下继续。</p>
  <h3>记忆</h3>
  <p>如果工作流跨多个用户轮次，存够状态，避免重复问同一个问题。记忆有用，但也带来清理工作。存你需要的，跳过其余的。</p>
  <h3>流式输出和追踪</h3>
  <p>流式输出改善用户体验。追踪改善你的理智。一旦agent碰到多个工具，你会想要日志显示每一步发生了什么。</p>
  <h2>第五步：知道什么时候该停止在LangGraph里构建</h2>
  <p>很多教程跳过这部分：有时候LangGraph是杀鸡用牛刀。</p><p>如果你的工作流主要是内部原型的可视化流程，像Flowise这样的构建器能让你更快上手。如果你的团队需要应用脚手架、提示词管理和更顺畅的无代码层，Dify通常更容易交接。我们在<a href="/dify-vs-flowise-which-ai-workflow-builder-fits-you-in-2026/">Dify与Flowise对比</a>中已经讨论过这种取舍。</p>
  <p>当你需要分支逻辑、持久状态、显式控制或审批门控，而这些在拖拽画布中显得别扭时，用LangGraph。当瓶颈是速度而非控制时，用可视化构建器。</p>
  <h2>第一个LangGraph项目中的常见错误</h2>
  <ul>
  <li><strong>起步过大。</strong>一个代理和两个工具对v1来说就够了。</li>
  <li><strong>工具定义模糊。</strong>模型需要清晰的名称、参数和输出。</li>
  <li><strong>没有停止条件。</strong>如果你的图可以循环，定义它何时应该停止。</li>
  <li><strong>忽略成本。</strong>LangGraph免费，但重复的模型调用不是。</li>
  <li><strong>跳过可观测性。</strong>如果你无法追踪路径，调试很快就会变得棘手。</li>
  </ul>
  <h2>2026年该用LangGraph吗？</h2>
  <p>如果你构建的代理工作流需要可靠性多于便利性，答案是肯定的。</p>
  <p>如果你主要想要一个快速的无代码演示，答案是否定的。</p>
  <p>这话听起来直接，但能省时间。LangGraph值得学，因为它让你控制那些通常最先出问题的部分：路由、状态、工具使用和审批。这才是真正的价值。不是图表的隐喻，不是围绕代理的热度。是控制。</p>
  <p>如果你想在投入前继续研究，先从<a href="/listing/langgraph/">LangGraph列表</a>开始，与<a href="/listing/flowise/">Flowise</a>和<a href="/listing/crewai/">CrewAI</a>对比，然后把工具映射到你实际需要交付的工作流上。这比另一个泛泛的代理演示告诉你更多。</p>
  <h2>常见问题</h2>
  <h3>LangGraph免费吗？</h3>
  <p>是的。LangGraph是开源的，免费使用。你的成本来自模型提供商、存储、追踪和托管。</p>
  <h3>LangGraph比LangChain好吗？</h3>
  <p>它们相关，但不能互换。LangGraph是更广泛的LangChain生态系统的一部分，专注于编排有状态的工作流。LangChain提供更广泛的构建块和集成。</p>
  <h3>LangGraph比Flowise或Dify好吗？</h3><p>控制力更强，但搭建速度通常更慢。如果你想要可视化原型，Flowise 或 Dify 会更顺手。如果你需要明确的流程路由和审批逻辑，LangGraph 通常是更合适的选择。</p>
  <h3>最快能上手的第一个项目是什么？</h3>
  <p>做一个单代理助手，配一个检索工具和一个操作工具。图保持小规模，尽早加上追踪，只有用例确实需要时才加记忆或审批。</p>
---

<p>If you want a short answer, here it is: LangGraph is one of the best ways to build AI agent workflows when you need real control over routing, memory, tool use, and human approval. It is free and open source under the MIT license, but it is not the easiest place to start. You are trading a visual builder for code-level control, so the fit is best for developers and technical teams, not casual no-code users.</p>
<p>That tradeoff is the whole story. A lot of &#8220;LangGraph tutorial&#8221; pages show a toy calculator agent and stop there. Useful, sure. But the reason people move to LangGraph is not because they want another demo. They want an agent they can actually steer when the workflow gets messy.</p>
<p>If that sounds like you, this guide will get you moving. And if you are still deciding between code-first and visual tools, check the <a href="/listing/langgraph/">LangGraph listing</a>, the <a href="/listing/flowise/">Flowise listing</a>, and our <a href="/dify-vs-flowise-which-ai-workflow-builder-fits-you-in-2026/">Dify vs Flowise comparison</a> after you finish here.</p>
<h2>What LangGraph is good at, and where it gets painful</h2>
<p>LangGraph is a low-level orchestration framework from the LangChain stack. Instead of treating an agent like one long prompt loop, it lets you model the workflow as nodes, edges, and shared state. The official quickstart offers both a Graph API and a Functional API, which is helpful because not every team wants to think in graph primitives right away.</p>
<p>Here is the practical fit:</p>
<ul>
<li><strong>Best for:</strong> developers building multi-step agents, tool-using assistants, approval-heavy workflows, or stateful automations.</li>
<li><strong>Pricing:</strong> LangGraph itself is free. Your real costs come from model APIs, vector storage, tracing, and infrastructure.</li>
<li><strong>Big strengths:</strong> fine-grained routing, memory, human-in-the-loop controls, streaming, and easier debugging than black-box agent wrappers.</li>
<li><strong>Main limitation:</strong> it asks you to think like an engineer. If you want drag-and-drop speed, <a href="/listing/flowise/">Flowise</a> or <a href="/listing/dify/">Dify</a> will feel lighter.</li>
</ul>
<p>The thing is, that limitation matters. LangGraph is not hard because the syntax is impossible. It is hard because it forces you to define how your agent should behave when something goes wrong, when a tool fails, when a human needs to approve an action, or when the model should stop instead of looping again. That is exactly why serious teams like it.</p>
<h2>What you need before you start</h2>
<p>For a basic LangGraph tutorial project, you need Python 3.10 or newer, a model provider, and the LangGraph package itself. The official quickstart uses Anthropic, but you can swap in another supported chat model if that is already in your stack. If you want a minimal setup, install the core packages first and keep the project tiny.</p>
<ul>
<li><strong>Framework layer:</strong> LangGraph plus the broader <a href="/listing/langchain/">LangChain ecosystem</a>.</li>
<li><strong>Model layer:</strong> Anthropic, OpenAI, or another provider you already trust.</li>
<li><strong>Optional but smart:</strong> tracing with LangSmith once you move beyond a toy example.</li>
</ul>
<p>Bottom line: do not start with a giant multi-agent build. Start with one agent, two tools, one routing rule, and one clear state object.</p>
<h2>Step 1: Define one job for the agent</h2>
<p>Most tutorials jump straight into code. I would not. First decide what the agent is allowed to do. For a first project, good starter jobs include a support assistant that can search docs, a research helper that can call web tools, or a small internal bot that summarizes and routes tickets.</p>
<p>A bad first project is &#8220;build a general autonomous agent.&#8221; That sounds ambitious. It usually turns into a spaghetti workflow with no clear stop condition.</p>
<p>In LangGraph terms, your first design question is simple: <em>what state needs to survive from one step to the next?</em> In the official docs, that state includes message history and a counter for LLM calls. In a real workflow, you might also track the user ID, the last tool used, an approval flag, or a retry count.</p>
<h2>Step 2: Start with a tiny graph, not a giant system</h2>
<p>The official quickstart uses a calculator agent. That example is small on purpose, and it is worth copying that discipline. Your first graph only needs four moving parts:</p>
<ul>
<li>a model node that decides what happens next</li>
<li>a tool node that runs the selected tool</li>
<li>a shared state object that keeps messages and control data</li>
<li>a conditional edge that decides whether the workflow should continue or stop</li>
</ul>
<p>What matters here is the loop. The model thinks, calls a tool if needed, gets the result back, then decides whether to answer or keep working. That sounds obvious, but it is the core reason LangGraph feels better than a loose pile of agent helper functions. The workflow is explicit.</p>
<p>If you have used <a href="/listing/crewai/">CrewAI</a> or other higher-level agent frameworks, this will feel lower level. That is a feature. You are seeing the routing logic instead of trusting hidden defaults.</p>
<h2>Step 3: Add tools that the model can actually use well</h2>
<p>A lot of first-time LangGraph builds fail for one boring reason: bad tools. The framework is usually not the problem. The tool signature is.</p>
<p>Keep each tool narrow. Give it a clear name. Write a docstring that tells the model when to call it. Return structured data, not a messy blob. If the tool needs secret internal context, hide that in your app code instead of exposing it in the model-facing signature.</p>
<p>Here is the practical rule: if a human teammate would be confused by your tool name or parameter list, the model probably will be too.</p>
<h2>Step 4: Add the control features people actually come to LangGraph for</h2>
<p>This is where LangGraph starts to separate itself from simpler tutorials. According to the official LangGraph product pages, the framework is designed for memory, streaming, and human-in-the-loop controls. Do not leave those ideas for &#8220;later&#8221; if your real use case depends on them.</p>
<h3>Human approval</h3>
<p>If your agent can send emails, spend money, change records, or trigger production actions, add an approval checkpoint. LangGraph is good at these interrupts because the workflow can pause, wait, and continue with context intact.</p>
<h3>Memory</h3>
<p>If the workflow spans multiple user turns, store enough state to avoid asking the same question twice. Memory is useful, but it also creates cleanup work. Save what you need. Skip the rest.</p>
<h3>Streaming and tracing</h3>
<p>Streaming improves the user experience. Tracing improves your sanity. Once an agent touches more than one tool, you will want logs that show what happened at each step.</p>
<h2>Step 5: Know when to stop building in LangGraph</h2>
<p>Here is the part many tutorials skip: sometimes LangGraph is overkill.</p>
<p>If your workflow is mostly a visual pipeline for internal prototyping, a builder like Flowise can get you there faster. If your team wants app scaffolding, prompt management, and a smoother no-code layer, Dify is often easier to hand off. We already looked at that tradeoff in our <a href="/dify-vs-flowise-which-ai-workflow-builder-fits-you-in-2026/">Dify vs Flowise comparison</a>.</p>
<p>Use LangGraph when you need branching logic, durable state, explicit control, or approval gates that would feel awkward in a drag-and-drop canvas. Use a visual builder when the bottleneck is speed, not control.</p>
<h2>Common mistakes in a first LangGraph project</h2>
<ul>
<li><strong>Starting too big.</strong> One agent and two tools is enough for v1.</li>
<li><strong>Vague tools.</strong> The model needs clear names, parameters, and outputs.</li>
<li><strong>No stop condition.</strong> If your graph can loop, define when it should stop.</li>
<li><strong>Ignoring cost.</strong> LangGraph is free, but repeated model calls are not.</li>
<li><strong>Skipping observability.</strong> If you cannot trace the path, debugging will get ugly fast.</li>
</ul>
<h2>Should you use LangGraph in 2026?</h2>
<p>Yes, if you are building agent workflows that need reliability more than convenience.</p>
<p>No, if you mainly want a fast no-code demo.</p>
<p>That may sound blunt, but it saves time. LangGraph is worth learning because it gives you control over the parts that usually break first: routing, state, tool use, and approvals. That is the real value. Not the graph metaphor. Not the hype around agents. Control.</p>
<p>If you want to keep researching before you commit, start with the <a href="/listing/langgraph/">LangGraph listing</a>, compare it with <a href="/listing/flowise/">Flowise</a> and <a href="/listing/crewai/">CrewAI</a>, and map the tool to the workflow you actually need to ship. That will tell you more than another generic agent demo ever will.</p>
<h2>FAQ</h2>
<h3>Is LangGraph free?</h3>
<p>Yes. LangGraph is open source and free to use. Your costs come from model providers, storage, tracing, and hosting.</p>
<h3>Is LangGraph better than LangChain?</h3>
<p>They are related, not interchangeable. LangGraph is part of the broader LangChain ecosystem and focuses on orchestrating stateful workflows. LangChain gives you broader building blocks and integrations.</p>
<h3>Is LangGraph better than Flowise or Dify?</h3>
<p>Better for control, usually worse for setup speed. If you want visual prototyping, Flowise or Dify will feel easier. If you need explicit routing and approval logic, LangGraph is usually the stronger pick.</p>
<h3>What is the fastest first project to build?</h3>
<p>A single-agent assistant with one retrieval tool and one action tool. Keep the graph small, add tracing early, and only add memory or approvals when the use case really needs them.</p>

