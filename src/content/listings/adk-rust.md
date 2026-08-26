---
title: ADK-Rust
date: '2026-05-11T02:20:22'
modified: '2026-08-20T10:30:00'
slug: adk-rust
description: ADK-Rust is an open-source Rust framework for building AI agents, with 42 crates covering models, tools, memory, RAG, realtime voice, and durable graph.
categories:
- ai-coding
wpId: 786
image: /uploads/2026/05/adk-rust.jpg
featured: false
---
<h2>ADK-Rust at a glance</h2>
<p>ADK-Rust is a Rust framework for building AI agents, published by the zavora-ai community under an Apache-2.0 license. The name overlaps with Google's Agent Development Kit, but the two are separate projects. Google's ADK is Python; ADK-Rust is a community framework that targets the same jobs with Rust's type system.</p>
<p>I checked the repository, the docs, the wiki, and the discussions before writing this. The project is genuinely active. Version 2.0.0 shipped recently, the repo gets commits almost daily, and it sits at roughly 615 stars and 92 forks as of August 2026. That is a small community next to LangGraph or CrewAI, and it shows in the documentation, which is detailed but still catching up with new features.</p>
<h2>What it actually gives you</h2>
<p>The framework is organized into 42 crates behind one umbrella dependency. You pick a feature tier (minimal, standard, enterprise, full) and add individual crates on top. The parts people actually use:</p>
<ul>
<li><strong>Typed tools:</strong> a #[tool] attribute derives the JSON schema from your Rust argument types, so the model gets the right contract without hand-written schemas.</li>
<li><strong>Graph workflows:</strong> LangGraph-style orchestration with subgraphs, dynamic routing, per-node retries and timeouts, and SQLite checkpointing. An interrupted run resumes from the same database file, even in a fresh process.</li>
<li><strong>Model coverage:</strong> Gemini, OpenAI, Anthropic, DeepSeek, Groq, Ollama, Bedrock, and Azure AI, plus OpenAI-compatible presets for Fireworks, Together, Mistral, Perplexity, Cerebras, SambaNova, and xAI. Local inference runs through Ollama or the mistral.rs crate.</li>
<li><strong>Realtime voice:</strong> OpenAI Realtime and Gemini Live with bidirectional audio, VAD, and video frames.</li>
<li><strong>RAG and memory:</strong> chunking, embeddings, and vector search across six backends, plus a memory layer with a bi-temporal knowledge graph.</li>
<li><strong>Servers and protocols:</strong> REST with SSE, A2A v1.0, MCP client and server support, background runs, and cron.</li>
<li><strong>Ops extras:</strong> guardrails, RBAC with SSO, audit logging, OpenTelemetry tracing, an evaluation framework, browser automation, and sandboxed code execution.</li>
</ul>
<p>The project publishes its own performance numbers: about 568 microseconds of agent-loop overhead per turn against 1,228 milliseconds for LangGraph in its June 2026 benchmark, with a 109 ms cold start. Treat those as vendor-measured until you reproduce them on your own workload. The tooling to do that ships with the framework (cargo adk bench).</p>
<h2>Typical workflow</h2>
<p>Setup is one install command, then a scaffold:</p>
<ul>
<li><strong>cargo install cargo-adk</strong> adds the cargo-adk subcommand.</li>
<li><strong>cargo adk new my-agent --template rag</strong> scaffolds a project. Templates exist for llm, tools, sequential, parallel, loop, conditional, graph, realtime, rag, and api, plus pre-composed patterns like production, multi-agent, pipeline, chatbot, and a2a-server.</li>
<li><strong>--addon</strong> composes extras such as telemetry, auth, sessions, memory, mcp, guardrails, eval, or browser with any template.</li>
<li>Add your API key to .env, then cargo run.</li>
</ul>
<p>A typical first build looks like this. Scaffold with the tools template, define two or three #[tool] functions, point the model at your provider, and serve it over HTTP with the api template once the agent behaves. Provider swapping is deliberate. The agent, runner, and tools stay unchanged when you swap the client, so a Gemini prototype can move to Anthropic or a local Ollama model without rewriting the agent.</p>
<h2>Where it fits</h2>
<p>ADK-Rust earns its keep for teams already writing Rust that want a typed, self-hosted agent layer. Good fits:</p>
<ul>
<li>Voice or realtime products that need low startup latency and tight control over the loop.</li>
<li>Workflows that must survive restarts, where SQLite checkpointing and durable resume matter.</li>
<li>Teams that want MCP-native tooling and protocol support (A2A, ACP) rather than vendor lock-in.</li>
<li>Anyone who wants local models via Ollama or mistral.rs in the same codebase as cloud models.</li>
</ul>
<p>Weak fits: teams that do not write Rust, anyone optimizing for the largest ecosystem and community, and teams that want a managed runtime with support. The Python ADK, LangGraph, or CrewAI remain the lower-friction paths for most shops. If what you actually need is a coding agent, a product like OpenCode or Qwen CLI beats assembling one from framework parts.</p>
<h2>Practical tips</h2>
<ul>
<li><strong>Start with the minimal tier.</strong> The default feature set builds faster and keeps the dependency tree small. Add features like audio or browser only when the job needs them. A tier is a starting point, not a ceiling.</li>
<li><strong>Pick the template by the job.</strong> rag for retrieval, graph for multi-step durable work, realtime for voice, api for serving. The scaffold code is a better starting point than a blank main.rs.</li>
<li><strong>Use #[tool] metadata.</strong> Mark functions read_only, concurrency_safe, or long_running so the runner can parallelize or warn correctly instead of guessing.</li>
<li><strong>Checkpoint every graph you care about.</strong> SQLite checkpoints plus a RetentionPolicy keep a week-long run steady. Without a retention policy, checkpoints accumulate without bound.</li>
<li><strong>Validate before you deploy.</strong> cargo adk validate checks an agent definition without a full build, and cargo adk bench --dry-run shows the cost estimate before you pay for real API calls.</li>
<li><strong>Pin model availability.</strong> The README warns that gemini-2.0-flash and gemini-2.0-flash-lite shut down on 31 March 2026. Model names and shutdown dates move, so keep your provider table in one place.</li>
</ul>
<h2>Limits and risks</h2>
<ul>
<li><strong>Young project, small community.</strong> Around 615 stars and 13 open issues. Discussions are mostly technical Q&amp;A, and several threads are people hunting for features the docs have not fully caught up with, the DeepSeek client thread being a good example.</li>
<li><strong>Docs lag the code.</strong> The wiki, guides, and docs.rs are thorough, but the project moves fast. Expect to read source or open a discussion for bleeding-edge features.</li>
<li><strong>Vendor benchmarks.</strong> The 568 microsecond loop figure and the 4,300+ test count are the project's own measurements. Re-run with your workload before quoting them in a decision.</li>
<li><strong>Experimental corners.</strong> The managed agent runtime does not survive process loss, the Windows sandbox backend (AppContainer) is not implemented, and agentic payments are brand new. Read the stability tiers in STABILITY.md before building on any of these.</li>
<li><strong>Version churn.</strong> Upgrading from 1.x to 2.0 changed six APIs and one default behavior. Budget time for migrations on major bumps.</li>
</ul>
<h2>Pricing and licensing</h2>
<p>ADK-Rust itself is free under Apache-2.0. Your real costs are model API keys (Gemini by default, others per provider) or local hardware for Ollama and mistral.rs, plus whatever infrastructure runs the agent. There is no hosted version, no usage limit, and no vendor lock-in beyond the API keys you choose.</p>
<h2>Related tools on AIXCove</h2>
<ul>
<li><a href="/listing/langgraph/">LangGraph</a> if you want the same graph ideas with a Python ecosystem and a much larger community</li>
<li><a href="/listing/autogen-studio/">AutoGen Studio</a> for a visual, no-code agent builder</li>
<li><a href="/listing/opencode/">OpenCode</a> or <a href="/listing/qwen-cli/">Qwen CLI</a> if what you actually need is a coding agent, not a framework</li>
<li>Browse all <a href="/listing-category/ai-coding/">AI coding tools</a> and our picks in <a href="/best-free-ai-coding-tools-in-2026/">best free AI coding tools</a></li>
</ul>
<h2>Sources and further reading</h2>
<ul>
<li><a href="https://github.com/zavora-ai/adk-rust" rel="nofollow noopener" target="_blank">GitHub repository</a>, with the README, changelog, and migration guide</li>
<li><a href="https://docs.rs/adk-rust" rel="nofollow noopener" target="_blank">docs.rs</a> API reference</li>
<li><a href="https://github.com/zavora-ai/adk-rust/wiki" rel="nofollow noopener" target="_blank">Project wiki</a></li>
<li><a href="https://github.com/zavora-ai/adk-rust/discussions" rel="nofollow noopener" target="_blank">GitHub Discussions</a>, community Q&amp;A</li>
<li><a href="https://adk-rust.com/en" rel="nofollow noopener" target="_blank">Official site</a></li>
</ul>
