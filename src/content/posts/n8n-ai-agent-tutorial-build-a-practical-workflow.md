---
title: 'n8n AI Agent Tutorial: Build a Practical Workflow'
date: '2026-05-19T00:04:45'
modified: '2026-08-11T19:14:31'
slug: n8n-ai-agent-tutorial-build-a-practical-workflow
description: 'If you want the short version: n8n is a strong choice for AI agents when the agent needs to trigger real business workflows, call APIs, route data, and stay debuggable. It is less ideal if you only wa'
categories:
- ai-tutorials-how-tos
featured: /uploads/2026/05/n8n-ai-agent-tutorial-hero-0c702f25-4e8d-4b6b-9e1d-9601647404b9.jpg
wpId: 824
titleZh: "n8n AI Agent教程：搭建实用工作流"
descriptionZh: "n8n适合需要触发真实业务流程、调用API、路由数据并保持可调试性的AI代理场景。若你只需简单对话，则非首选。"
bodyZh: |
  <p><!--
  SEO title: n8n AI Agent教程：搭建实用工作流
  Meta description: 学习如何搭建n8n AI agent工作流、费用多少、自托管适用场景，以及何时Dify、Flowise或OpenClaw更合适。
  Target keyword: n8n AI agent教程
  Slug: n8n-ai-agent-tutorial-build-practical-workflow
  --></p>
  <p>如果你想要简短结论：当AI agent需要触发真实业务工作流、调用API、路由数据并保持可调试性时，n8n是强选择。如果你只想要一个精致的聊天界面或免维护的托管助手，它就没那么合适。</p>
  <p>这篇n8n AI agent教程会带你走一遍实用工作流，不假装每个任务都需要完全自主。有用的模式更简单：给模型一个明确任务，接上几个工具，周围放上确定性步骤，并保留足够日志，这样出错时你能看清发生了什么。</p>
  <p>定价要早看。n8n Cloud的Starter计划按年付费每月20欧元，含2.5K次工作流执行，用户和工作流数量不限。Pro计划按年付费每月50欧元，含10K次执行。n8n也在GitHub上提供自托管社区版，但基础设施和模型使用费仍要自己出。</p>
  <h2>这篇教程适合谁</h2>
  <p>本指南适合已经懂基础自动化、想加一层AI决策的运营、技术型营销人员、创始人和开发者。典型场景包括线索分类、客服回复草稿、研究摘要、文档路由、CRM信息补全或内部请求处理。</p>
  <p>当agent嵌在更大工作流中时，n8n尤其好用。聊天机器人只能回答。n8n工作流可以接收webhook、拉取账户历史、让AI agent分类请求、更新Airtable或HubSpot、发送Slack审批并记录结果。</p>
  <p>如果你的主要目标是构建面向客户的AI应用，需要提示词版本管理、数据集和应用部署，<a href="/listing/dify/">Dify</a>可能更接近产品形态。如果你想要可视化LLM流水线构建器来做RAG和agent流程，<a href="/listing/flowise/">Flowise</a>值得对比。如果你想要一个住在Telegram里、能跑定时任务的本地个人助手，可以读Aixcove的<a href="/openclaw-tutorial-build-a-telegram-ai-agent-in-2026/">OpenClaw教程</a>。</p>
  <h2>开始前需要准备什么</h2><p>你需要一个n8n账户或自托管实例、一个聊天模型凭证，以及一个真实的工作流目标。不要从一个模糊的通用助手开始。从一个有输入、有决策、有动作的任务开始。</p>
  <ul>
  <li>一个n8n Cloud工作区或自托管的n8n安装</li>
  <li>一个聊天模型的API密钥，例如OpenAI、Anthropic、Google或其他支持的提供商</li>
  <li>一个触发源，例如webhook、表单、聊天消息、邮件、定时或手动触发</li>
  <li>一到两个安全的工具，例如查询、HTTP请求、数据库查询或工单操作</li>
  <li>一个包含真实示例和杂乱边缘案例的测试数据集</li>
  </ul>
  <p>关键是克制。给代理的工具比你认为需要的少。只有在第一个工作流行为可预测后，再添加更多。</p>
  <h2>我们要构建的工作流</h2>
  <p>在本教程中，设想一个简单的入站请求分类代理。用户提交请求。n8n将消息发送到AI Agent节点。代理对请求进行分类，决定是否需要人工审核，起草回复，并将结构化输出传递给后续步骤。然后n8n将结果路由到Slack、邮件、CRM或工单系统。</p>
  <h2>步骤1：创建触发器</h2>
  <p>从一个匹配真实工作来源的触发器开始。测试时，手动触发器就够用。生产环境中，使用Webhook、表单触发器、聊天触发器、定时触发器、Gmail触发器、Slack触发器，或任何匹配你接入路径的触发器。</p>
  <p>保持传入的负载干净。一个好的初始负载可能包括用户的消息、邮件、公司名称、来源渠道和现有客户状态。避免将大量数据块塞给模型。如果代理需要更多上下文，在单独的步骤中获取。</p>
  <h2>步骤2：添加AI Agent节点</h2>
  <p>n8n的AI Agent节点让模型对输入进行推理，并从连接的工具中选择。底层上，代理依赖聊天模型和可选连接能力，如记忆、工具和结构化输出。n8n官方文档将其置于基于LangChain的AI节点系统中。</p>
  <p>给代理一个狭窄的指令。对于分类，明确告诉它要分类什么、返回哪些输出字段，以及应避免做什么。不要让它处理客户支持。让它将请求分类到特定类别，生成简洁摘要，标记紧急程度，并且只在上下文足够时起草回复。</p>
  <h2>步骤3：连接聊天模型</h2><p>AI Agent 节点需要模型。首次构建时，用可靠的托管模型，这样能把工作流问题跟模型托管问题分开排查。之后如果隐私或成本有要求，再测试本地或私有模型端点。</p>
  <p>自托管 n8n 不会自动让 AI 变私有。如果提示词发到云端模型，数据仍然离开你的环境。另外，较小的本地模型在工具选择和结构化输出上可能吃力，用真实例子测试后再信任它们。</p>
  <h2>第 4 步：谨慎添加工具</h2>
  <p>工具是 n8n 比独立聊天应用更有用的地方。Agent 能用连接的工具查信息、调 API、搜记录，或把数据传给其他节点。但每个工具都会扩大影响范围。</p>
  <p>第一个版本只连接一个查询工具和一个安全操作。比如让 Agent 获取客户上下文，然后让 n8n 把最终输出发到 Slack 供审核。不要给第一个版本退款、删记录或直接给客户发邮件的权限。</p>
  <p>一条简单规则很管用：让 AI 做决定，但让确定性节点执行。Agent 负责分类和起草。n8n 的 IF 节点、Switch 节点、验证步骤和审批检查决定操作是否允许。</p>
  <h2>第 5 步：强制结构化输出</h2>
  <p>自由文本很难自动化。让 Agent 返回下游节点能干净解析的结构化输出。用 category、urgency、confidence、summary、suggested_reply、needs_human_review 和 reason 这些字段。</p>
  <h2>第 6 步：路由结果</h2>
  <p>Agent 返回结构化输出后，用常规 n8n 逻辑。Switch 节点可以把账单请求路由到财务，技术问题到支持，销售问题到 CRM，高风险项到经理。Slack 节点可以发审核卡片。数据库节点可以记录决策。</p>
  <h2>第 7 步：用坏输入测试</h2>
  <p>不要只测正常路径。测模糊请求、愤怒消息、短消息、长粘贴文档、冲突指令、提示注入尝试和缺失客户数据。</p>
  <p>留意三种失败模式。Agent 可能在该问清楚时过度回答。可能因为工具描述太宽泛而选错工具。也可能对风险请求返回自信的草稿。三种都能修，但前提是你测了它们。</p>
  <h2>n8n 何时是合适的工具</h2><p>当AI代理需要连接多个系统，并且你重视工作流可见性时，可以使用n8n。它适合内部自动化、运维团队、技术营销人员、客户支持运营，以及需要在一个地方整合API、审批、日程和AI步骤的小团队。</p>
  <p>如果按执行次数计费比按用户或工作流步骤计费更适合你，n8n也是一个不错的选择。n8n的公开定价页面显示，所有套餐都包含无限用户和工作流，定价基于每月工作流执行次数。</p>
  <h2>什么时候选择其他工具</h2>
  <p>如果你正在构建带有数据集、提示词管理和面向用户的应用部署的AI应用，请选择Dify。如果你的主要工作是可视化设计LLM链、RAG管道和代理流程，请选择Flowise。如果你想要一个带有个人自动化、记忆、消息集成和计划任务的本地助手，请选择OpenClaw。</p>
  <p>n8n可以触及所有这些领域，但当自动化是核心时，它最为强大。AI代理是工作流中的一个节点，而不是整个产品。</p>
  <h2>常见问题</h2>
  <h3>n8n能构建AI代理吗？</h3>
  <p>能。n8n通过其AI节点包含AI代理功能，支持聊天模型、工具、记忆模式和工作流操作。有用的地方在于，代理可以嵌入更大的自动化流程中，而不是作为独立的聊天机器人存在。</p>
  <h3>n8n对AI代理免费吗？</h3>
  <p>你可以自托管n8n社区版，但AI使用并非自动免费。你仍然需要模型提供商或本地模型设置，以及托管资源。n8n Cloud在试用期后收费，公开套餐基于工作流执行次数。</p>
  <h3>n8n比Dify更适合AI工作流吗？</h3>
  <p>这取决于具体任务。n8n通常更适合跨多个应用的业务流程自动化。Dify通常更适合将AI应用作为产品来构建和管理。如需更多决策页面，请浏览Aixcove的<a href="/category/ai-tools-comparisons/">AI工具对比</a>。</p>
  <h2>结论</h2>
  <p>n8n是构建实用AI代理的较好选择之一，因为它将代理视为工作流的一部分。这听起来不如完全自主的助手那么光鲜，但这正是它有效的原因。触发器、模型、工具、审批步骤和日志都存在于一个系统中。</p><p>从小处着手。先构建一个能分类并路由实际工作的智能体。在日志证明工作流变得乏味之前，让人工保持参与。乏味是一个里程碑。它意味着智能体不再是演示品，而是基础设施。</p>
---

<p><!--
SEO title: n8n AI Agent Tutorial: Build a Practical Workflow
Meta description: Learn how to build an n8n AI agent workflow, what it costs, where self-hosting helps, and when Dify, Flowise, or OpenClaw may fit better.
Target keyword: n8n AI agent tutorial
Slug: n8n-ai-agent-tutorial-build-practical-workflow
--></p>
<p>If you want the short version: n8n is a strong choice for AI agents when the agent needs to trigger real business workflows, call APIs, route data, and stay debuggable. It is less ideal if you only want a polished chatbot interface or a no-maintenance hosted assistant.</p>
<p>This n8n AI agent tutorial walks through a practical workflow without pretending every task needs full autonomy. The useful pattern is simpler: give the model a clear job, connect it to a few tools, put deterministic steps around it, and keep enough logging that you can see what happened when it gets something wrong.</p>
<p>Pricing matters early. n8n Cloud starts at 20 EUR per month billed annually for the Starter plan, with 2.5K workflow executions and unlimited users and workflows. The Pro plan is 50 EUR per month billed annually with 10K executions. n8n also offers a self-hosted Community Edition on GitHub, but you still pay for infrastructure and model usage.</p>
<h2>Who This Tutorial Is For</h2>
<p>This guide fits operators, technical marketers, founders, and developers who already understand basic automation but want to add an AI decision layer. Think lead triage, support reply drafting, research summarization, document routing, CRM enrichment, or internal request handling.</p>
<p>n8n is especially good when the agent sits inside a larger workflow. A chatbot can answer. An n8n workflow can receive a webhook, pull account history, ask an AI agent to classify the request, update Airtable or HubSpot, send a Slack approval, and log the result.</p>
<p>If your main goal is building a customer-facing AI app with prompt versioning, datasets, and app deployment, <a href="/listing/dify/">Dify</a> may feel more product-ready. If you want a visual LLM pipeline builder for RAG and agent flows, <a href="/listing/flowise/">Flowise</a> is worth comparing. If you want a local personal assistant that lives in Telegram and runs scheduled work, read Aixcove&#8217;s <a href="/openclaw-tutorial-build-a-telegram-ai-agent-in-2026/">OpenClaw tutorial</a>.</p>
<h2>What You Need Before You Start</h2>
<p>You need an n8n account or a self-hosted instance, one chat model credential, and one real workflow target. Do not start with a vague general assistant. Start with a job that has an input, a decision, and an action.</p>
<ul>
<li>An n8n Cloud workspace or a self-hosted n8n install</li>
<li>An API key for a chat model such as OpenAI, Anthropic, Google, or another supported provider</li>
<li>A trigger source such as a webhook, form, chat message, email, schedule, or manual trigger</li>
<li>One or two safe tools, such as a lookup, HTTP request, database query, or ticketing action</li>
<li>A test dataset with realistic examples and messy edge cases</li>
</ul>
<p>The key point is restraint. Give the agent fewer tools than you think it needs. Add more only after the first workflow behaves predictably.</p>
<h2>The Workflow We Are Building</h2>
<p>For this tutorial, imagine a simple inbound request triage agent. A user submits a request. n8n sends the message to an AI Agent node. The agent classifies the request, decides whether it needs human review, drafts a response, and passes structured output to the next steps. n8n then routes the result to Slack, email, a CRM, or a ticketing system.</p>
<h2>Step 1: Create the Trigger</h2>
<p>Start with a trigger that matches the real source of work. For testing, a Manual Trigger is fine. For production, use a Webhook, Form Trigger, Chat Trigger, Schedule Trigger, Gmail trigger, Slack trigger, or whatever matches your intake path.</p>
<p>Keep the incoming payload clean. A good first payload might include the user&#8217;s message, email, company name, source channel, and existing customer status. Avoid dumping huge blobs into the model. If the agent needs more context, fetch it in a separate step.</p>
<h2>Step 2: Add the AI Agent Node</h2>
<p>n8n&#8217;s AI Agent node lets a model reason over an input and choose from connected tools. Under the hood, the agent depends on a chat model and optional connected capabilities such as memory, tools, and structured output. n8n&#8217;s official docs place this inside its LangChain-based AI node system.</p>
<p>Give the agent a narrow instruction. For triage, tell it exactly what to classify, what output fields to return, and what it should avoid doing. Do not ask it to handle customer support. Ask it to classify the request into specific categories, produce a concise summary, mark urgency, and draft a reply only when enough context exists.</p>
<h2>Step 3: Connect a Chat Model</h2>
<p>The AI Agent node needs a model. For a first build, use a reliable hosted model so you can separate workflow bugs from model hosting problems. Later, if privacy or cost requires it, test a local or private model endpoint.</p>
<p>Self-hosting n8n does not automatically make the AI private. If prompts go to a cloud model, data still leaves your environment. Also, smaller local models may struggle with tool selection and structured output, so test them with real examples before trusting them.</p>
<h2>Step 4: Add Tools Carefully</h2>
<p>Tools are where n8n becomes more useful than a standalone chat app. The agent can use connected tools to look up information, call APIs, search records, or pass data into other nodes. But every tool increases the blast radius.</p>
<p>For the first version, connect one lookup tool and one safe action. For example, let the agent retrieve customer context, then let n8n send the final output to Slack for review. Do not give the first version permission to refund payments, delete records, or email customers directly.</p>
<p>A simple rule holds up well: let AI decide, but let deterministic nodes execute. The agent can classify and draft. n8n&#8217;s IF nodes, Switch nodes, validation steps, and approval checks should decide whether the action is allowed.</p>
<h2>Step 5: Force Structured Output</h2>
<p>Free-form text is annoying to automate. Ask the agent for structured output that downstream nodes can parse cleanly. Use fields such as category, urgency, confidence, summary, suggested_reply, needs_human_review, and reason.</p>
<h2>Step 6: Route the Result</h2>
<p>Once the agent returns structured output, use normal n8n logic. A Switch node can route billing requests to finance, technical issues to support, sales questions to the CRM, and high-risk items to a manager. A Slack node can post a review card. A database node can log the decision.</p>
<h2>Step 7: Test With Bad Inputs</h2>
<p>Do not test only the happy path. Test vague requests, angry messages, short messages, long pasted documents, conflicting instructions, prompt injection attempts, and missing customer data.</p>
<p>Watch for three failure modes. The agent may over-answer when it should ask for clarification. It may choose the wrong tool because the tool descriptions are too broad. Or it may return a confident draft for a risky request. All three are fixable, but only if you test for them.</p>
<h2>When n8n Is the Right Tool</h2>
<p>Use n8n when the AI agent needs to connect to many systems and you care about workflow visibility. It is a good fit for internal automation, ops teams, technical marketers, customer support operations, and small teams that need one place to wire APIs, approvals, schedules, and AI steps together.</p>
<p>It is also a good fit if pricing by executions works better for you than pricing by users or workflow steps. n8n&#8217;s public pricing page says all plans include unlimited users and workflows, with pricing based on monthly workflow executions.</p>
<h2>When to Choose Something Else</h2>
<p>Choose Dify if you are building AI applications with datasets, prompt management, and user-facing app deployment. Choose Flowise if your main job is designing LLM chains, RAG pipelines, and agent flows visually. Choose OpenClaw if you want a local assistant with personal automation, memory, messaging integrations, and scheduled tasks.</p>
<p>n8n can touch all of those areas, but it is strongest when automation is the center of gravity. The AI agent is one node in a workflow, not the whole product.</p>
<h2>FAQ</h2>
<h3>Can n8n build AI agents?</h3>
<p>Yes. n8n includes AI Agent functionality through its AI nodes, with support for chat models, tools, memory-style patterns, and workflow actions. The useful part is that the agent can sit inside a larger automation rather than living as a standalone chatbot.</p>
<h3>Is n8n free for AI agents?</h3>
<p>You can self-host the n8n Community Edition, but AI usage is not automatically free. You still need a model provider or a local model setup, plus hosting resources. n8n Cloud is paid after the trial, with public plans based on workflow executions.</p>
<h3>Is n8n better than Dify for AI workflows?</h3>
<p>It depends on the job. n8n is usually better for business process automation across many apps. Dify is often better for building and managing AI applications as products. For more decision pages, browse Aixcove&#8217;s <a href="/category/ai-tools-comparisons/">AI Tools Comparisons</a>.</p>
<h2>Verdict</h2>
<p>n8n is one of the better places to build practical AI agents because it treats the agent as part of a workflow. That sounds less glamorous than a fully autonomous assistant, but it is exactly why it works. The trigger, model, tools, approval step, and logs all live in one system.</p>
<p>Start narrow. Build one agent that classifies and routes real work. Keep humans in the loop until the logs prove the workflow is boring. Boring is the milestone. It means the agent is no longer a demo; it is infrastructure.</p>

