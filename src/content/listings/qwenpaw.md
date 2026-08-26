---
title: 'QwenPaw Review 2026: Local AI Assistant with Memory'
date: '2026-05-11T02:20:01'
modified: '2026-08-20T10:30:00'
slug: qwenpaw
description: QwenPaw is a free open-source personal AI assistant with three-layer memory, skills, local models, and multi-channel chat. Review, limits, and setup fit.
categories:
- local-self-hosted
wpId: 784
image: /uploads/2026/07/qwenpaw-feature-picture.jpg
featured: false
---
<h2>QwenPaw at a glance</h2>
<p>QwenPaw is an open-source personal AI assistant built by Alibaba's AgentScope team. You run it on your own machine, on a cloud server, or through the free AgentScope Platform. It connects to chat apps (DingTalk, Lark, WeChat, Discord, Telegram, iMessage, QQ), keeps a three-layer memory, and can run entirely on local models with no API key at all. It is Apache-2.0 licensed, has roughly 34,000 GitHub stars, and has shipped about one release per month since the 2.0 rewrite.</p>
<p>Before writing this I read the repository README, the documentation, the release notes, and the discussions, and I checked a third-party security writeup. This is a genuinely active project, and it is also a young one. The 2.0 line only landed in July 2026, and the open issue count (over 900) reflects both heavy use and rough edges.</p>
<h2>What it actually gives you</h2>
<ul>
<li><strong>Channels:</strong> one instance serves DingTalk, Lark, WeChat, Discord, Telegram, iMessage, and QQ. You can also use the web console, a full-screen terminal UI, or the desktop app.</li>
<li><strong>Three-layer memory:</strong> live working context, full verbatim history, and a self-evolving personal knowledge base (ReMe) stored as readable, editable Markdown.</li>
<li><strong>Skills and plugins:</strong> scheduling, documents, browser, news, PDF and Office handling, a plugin marketplace, and MCP integration for external tools.</li>
<li><strong>Local or cloud models:</strong> the QwenPaw-Flash models (2B, 4B, 9B) are trained for agent tasks and run fully offline, or you can use Ollama, LM Studio, or 14+ cloud providers.</li>
<li><strong>Automation:</strong> cron-style scheduled tasks, multi-channel broadcasting, scheduled digests, and multi-agent setups with parallel sub-agents.</li>
<li><strong>Security layers:</strong> OS-level sandbox, Tool Guard, File Guard, and a Skill Scanner that inspects skills before activation.</li>
<li><strong>Agent OS (2.0):</strong> each agent gets a workspace with on-disk resources, governance rules, and a sandbox, plus protocol drivers for MCP, A2A, and ACP.</li>
</ul>
<p>The v2.1.0 release (August 2026) added an OS shell, a unified Files workspace, a Creator app, browser-use and computer-use, workspace checkpoints, and integration with Codex and Qoder agents. The roadmap moves month to month, so the release notes are the most reliable picture of what exists.</p>
<h2>Typical workflow</h2>
<p>Install is deliberately easy. pip install qwenpaw, or the one-line script installer, or Docker. Then:</p>
<ul>
<li>Run qwenpaw init --defaults, then qwenpaw app.</li>
<li>Open the console at http://127.0.0.1:8088/ and configure a model. Cloud providers need an API key (DashScope, OpenAI, Anthropic, Gemini, DeepSeek, Kimi, OpenRouter, and more); local models need none.</li>
<li>For a private setup with zero API keys, pick QwenPaw Local in Settings and download a QwenPaw-Flash model. Everything then runs on your machine.</li>
<li>Connect channels (DingTalk, Lark, Discord, Telegram, and others) following the channel setup docs.</li>
<li>Add skills and cron jobs for scheduled digests or reports.</li>
</ul>
<p>A realistic first project: a Telegram channel that collects your news subscriptions, summarizes them at 8 a.m. through a scheduled task, and stores the digests in your ReMe knowledge base. That is roughly 20 minutes of setup with no code.</p>
<h2>Where it fits</h2>
<p>Good fits:</p>
<ul>
<li>People who want a personal assistant that is not in the cloud, with data staying on their machine.</li>
<li>Users who live in DingTalk, Lark, WeChat, or QQ and want AI inside those apps.</li>
<li>Anyone who wants scheduled automation (digests, reports, broadcasts) without writing code.</li>
<li>Users who want to switch models freely between local and cloud without rebuilding the setup.</li>
</ul>
<p>Weak fits: teams that need a managed, supported deployment with SLAs; people who want a polished commercial product rather than an actively evolving open-source one; and users who need every chat channel. WeChat Work, for instance, is still on the wish list, and vision input is not fully there yet. If you need a self-hosted knowledge base rather than a personal assistant, AnythingLLM is a more focused tool, and OpenClaw is the closest comparable open-source assistant for agent-style automation.</p>
<h2>Practical tips</h2>
<ul>
<li><strong>Skip API keys entirely for a private assistant.</strong> Use QwenPaw-Flash via QwenPaw Local. The 9B model is a reasonable default for agent tasks; the 2B is for weaker hardware.</li>
<li><strong>Know the Docker networking gotcha.</strong> Inside the container, localhost is the container. Add --add-host=host.docker.internal:host-gateway and point the model Base URL at http://host.docker.internal:11434 for Ollama, or use --network=host on Linux.</li>
<li><strong>Use separate volumes.</strong> Mount qwenpaw-data, qwenpaw-secrets, and qwenpaw-backups as distinct volumes so config, credentials, and backups stay isolated and portable.</li>
<li><strong>Keep the guards on.</strong> Tool Guard approval levels (STRICT, SMART, AUTO, OFF) and the File Guard defaults (it protects ~/.qwenpaw.secret/ and ~/.ssh) are the difference between an assistant and a footgun. Use Skill Scanner block mode before installing third-party skills.</li>
<li><strong>Work in the terminal.</strong> qwenpaw . starts Coding Mode scoped to the current repo, with slash commands (/model, /clear, /resume) that work while the agent is running.</li>
<li><strong>Back up the volumes.</strong> qwenpaw uninstall keeps config and data; --purge removes everything. After a major upgrade, rebuild the console frontend from source and hard-refresh the browser cache.</li>
</ul>
<h2>Limits and risks</h2>
<ul>
<li><strong>Young 2.x codebase.</strong> The ground-up rewrite shipped in July 2026. Over 900 open issues, and the discussions contain real complaints: UI freezes, coding processes that stall, AGENT_UNKNOWN_ERROR failures, and channel gaps like WeChat Work. Expect rough edges.</li>
<li><strong>Desktop app is beta.</strong> It is not notarized on macOS, so Gatekeeper will warn. First launch takes 10-60 seconds, and compatibility is not fully tested across hardware.</li>
<li><strong>Telemetry.</strong> qwenpaw init sends anonymous usage data once per version (version, install method, OS, Python version, architecture, GPU presence). The interactive prompt lets you opt out; --defaults accepts it automatically.</li>
<li><strong>Security is layered, not absolute.</strong> An independent writeup on Towards AI planted six attacks across QwenPaw's 18 tasks and its guards caught five. The skill scanner is a real control, but treat the assistant as a semi-trusted actor when it touches your files.</li>
<li><strong>Docs churn.</strong> Several documentation URLs have already moved or died between releases. If a doc link 404s, the GitHub README is the most reliable index.</li>
</ul>
<h2>Pricing and licensing</h2>
<p>Free, Apache-2.0, no usage limits. The costs are whatever you pay for cloud model APIs (or nothing for local models), plus hardware if you run larger models. The AgentScope Platform offers free cloud deployments of QwenPaw, but that means trusting the platform with your assistant's data, which defeats the point for privacy-focused setups.</p>
<h2>Related tools on AIXCove</h2>
<ul>
<li><a href="/listing/openclaw/">OpenClaw</a>, the closest open-source competitor for agent-style personal automation</li>
<li><a href="/listing/anythingllm/">AnythingLLM</a>, a more focused self-hosted knowledge base</li>
<li><a href="/listing/dify/">Dify</a>, a self-hosted agent and workflow platform for teams</li>
<li>Our <a href="/openclaw-review-2026-is-this-local-ai-assistant-worth-using/">OpenClaw review</a> and <a href="/best-openclaw-alternatives-in-2026-7-picks-by-workflow-fit/">OpenClaw alternatives</a> cover the same category</li>
<li>Browse all <a href="/listing-category/local-self-hosted/">self-hosted and local AI tools</a></li>
</ul>
<h2>Sources and further reading</h2>
<ul>
<li><a href="https://github.com/agentscope-ai/QwenPaw" rel="nofollow noopener" target="_blank">GitHub repository</a>, with README, release notes, and security docs</li>
<li><a href="https://qwenpaw.agentscope.io/" rel="nofollow noopener" target="_blank">Official site</a> and <a href="https://qwenpaw.agentscope.io/docs/quickstart" rel="nofollow noopener" target="_blank">quick start guide</a></li>
<li><a href="https://github.com/agentscope-ai/QwenPaw/discussions" rel="nofollow noopener" target="_blank">GitHub Discussions</a></li>
<li><a href="https://pub.towardsai.net/i-planted-6-attacks-in-qwenpaws-18-tasks-its-guards-caught-5-and-" rel="nofollow noopener" target="_blank">Towards AI: "I Planted 6 Attacks in QwenPaw's 18 Tasks"</a>, an independent security test</li>
</ul>
