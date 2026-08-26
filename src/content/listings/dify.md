---
title: Dify
date: '2026-04-19T14:42:28'
modified: '2026-08-25T12:30:00'
slug: dify
description: Dify is an open-source platform for visual AI app workflows, RAG, agents, and model integrations. See practical strengths, limits, and self-hosting.
categories:
- ai-agents
wpId: 638
image: /uploads/2026/04/dify-4.jpg
featured: false
---
<h2>What is Dify?</h2>
<p>Dify is an open-source platform for building and operating LLM applications: chat assistants, internal knowledge bots, RAG search over your own documents, and multi-step agent workflows. Instead of stitching together a framework, a vector database, model APIs, and a frontend, you work in one web console where you design the app, manage knowledge bases, pick models, and publish the result as an API or a hosted web app. It is developed by LangGenius, the source lives at <code>github.com/langgenius/dify</code> with roughly 153,000 stars, and you can run it either as the hosted Dify Cloud or self-hosted with Docker.</p>
<h2>What you actually get</h2>
<ul>
<li><strong>Visual workflow orchestration.</strong> A canvas where you chain LLM nodes, conditionals, code blocks, HTTP requests, and tool calls into agentic workflows. Non-engineers can read the graph; engineers can drop into code nodes when the canvas runs out of road.</li>
<li><strong>RAG pipelines.</strong> Import documents or sync a data source, choose indexing modes, test retrieval hit rates, then attach the knowledge base to any app. High-quality indexing consumes storage quota quickly on cloud plans, so watch that number.</li>
<li><strong>Broad model support.</strong> Hundreds of proprietary and open-source models from dozens of providers — OpenAI, Anthropic, Gemini, xAI, Mistral, Llama-family, Tongyi, plus anything speaking an OpenAI-compatible API. You bring your own keys.</li>
<li><strong>Multiple app templates.</strong> Prebuilt starting points for chatbots, text generators, and agents, plus workflow triggers via plugin, schedule, or webhook for background jobs.</li>
<li><strong>A plugin marketplace.</strong> Model providers, tools, data sources, and MCP integrations install from the marketplace instead of being hand-wired into each project, and teams can reuse approved plugins across apps.</li>
<li><strong>Operations built in.</strong> Logs, annotations you can promote into canned answers, prompt comparison, and observability hooks. This is the part teams underestimate until an app meets real users.</li>
</ul>
<h2>Pricing: cloud plans vs the free self-hosted edition</h2>
<p>Dify Cloud is priced per workspace, billed annually (annual billing saves about 17% over monthly):</p>
<ul>
<li><strong>Sandbox — free.</strong> 200 message credits for trying models, 1 member, 5 apps, 50 knowledge documents, 50MB knowledge storage, 30-day log retention. Enough to evaluate the product, not to run anything real.</li>
<li><strong>Professional — $590 per workspace per year.</strong> 5,000 message credits a month, 3 members, 50 apps, 500 knowledge documents, 5GB storage, 20,000 trigger events a month, unlimited log history.</li>
<li><strong>Team — $1,590 per workspace per year.</strong> 10,000 credits a month, 50 members, 200 apps, 1,000 documents, 20GB storage, unlimited trigger events, priority processing.</li>
<li><strong>Enterprise — custom.</strong> SSO, commercial licensing, multiple workspaces, negotiated SLAs, and official support.</li>
</ul>
<p>One nuance that matters: message credits cover model calls to providers such as OpenAI, Anthropic, Gemini, xAI, and Tongyi. Once credits run out, you switch to your own API keys and pay token costs directly. The realistic budget is the plan fee plus whatever your models consume.</p>
<p>The Community Edition is the free self-hosted option: all core features from the public repository, one workspace, deployed with Docker Compose. The license is Apache 2.0-based with two additions — you cannot operate Dify as a multi-tenant service without written authorization, and you must keep the logo and copyright notice in the frontend unless you obtain a commercial license. For internal deployments, neither condition bites.</p>
<h2>Who it fits</h2>
<p>Dify suits teams that need several AI apps alive at once without hiring a platform crew: internal tools groups standardizing how the company builds assistants, small teams shipping customer-facing bots without ML engineers, and agencies maintaining client projects they cannot hand off as raw code. It is also a reasonable pick when data governance pushes you toward self-hosting. If your logic is genuinely exotic, a code-first stack like <a href="/listing/langgraph/">LangGraph</a> or <a href="/listing/langchain/">LangChain</a> gives you more control; <a href="/listing/flowise/">Flowise</a> is the lighter visual alternative.</p>
<h2>Limitations worth knowing</h2>
<p>The visual builder has a ceiling. Workflows heavy on custom logic eventually fight the canvas, and teams with unusual requirements tend to graduate to code frameworks. Self-hosting means owning the operations: Dify is a multi-container stack with databases and queues, so upgrades and resource planning are on you. On cloud plans, the quotas are real — 3 seats and 500 knowledge documents on Professional is tight, and pricing is per workspace, which multiplies for organizations with many teams. And model costs never disappear; credits are a trial subsidy, not a token allowance. None of these are hidden flaws, but budget for them before committing.</p>
<h2>Official links</h2>
<ul>
<li><a href="https://dify.ai" rel="nofollow noopener" target="_blank">dify.ai</a> — product, pricing, and cloud signup</li>
<li><a href="https://github.com/langgenius/dify" rel="nofollow noopener" target="_blank">github.com/langgenius/dify</a> — source, Docker Compose quick start, and license text</li>
</ul>
