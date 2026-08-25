---
title: ZCode
date: '2026-06-19T04:20:52'
modified: '2026-08-25T12:01:41'
slug: zcode
description: ZCode is Z.ai agentic dev environment tuned for GLM-5.3 — Goal Mode loops, browser self-verification, memory, subagents, MCP, Feishu/WeChat bots. Pricing and limits explained.
categories:
- ai-coding
wpId: 869
image: /uploads/2026/06/zcode-official-docs-featured.jpg
featured: false
---
<h2>What is ZCode?</h2>
<p>ZCode is Z.ai's Agentic Development Environment (ADE) — a desktop app that puts GLM-5.3 to work on real coding tasks instead of chat-sidebar snippets. You describe a goal; the first-party ZCode Agent plans, edits files, runs terminal commands, drives a built-in browser to verify its own changes, and keeps going across long multi-step work. Goals, files, terminal output, browser state, execution modes, and Git history all stay inside one continuous task, so a feature can go from plan to implementation to verification without the context resetting halfway.</p>
<p>The current build is tuned specifically around GLM-5.3's stable 1M-token context and long-horizon task capability. The docs are blunt about the scope: model, tools, and execution workflow are co-designed, and the Agent — not a generic editor — is the center of the product.</p>
<h2>What you actually get</h2>
<ul>
<li><strong>Goal Mode.</strong> Set an objective with <code>/goal</code> and the Agent loops on its own: every round it checks whether the goal is met, starts another round if not, and wraps up only when done. Built for work that is one sentence to state and many rounds to finish.</li>
<li><strong>Browser automation.</strong> A built-in browser panel the Agent can drive — open URLs, click, fill forms, screenshot, and decide next steps from what it sees. For frontend work this means self-verification: walk the page after the change instead of claiming it works.</li>
<li><strong>Memory and Wiki.</strong> Project-level long-term memory stores your commit-message style, package-manager choice, and review conventions, then replays them in future sessions. A repo wiki keeps broader project context.</li>
<li><strong>Subagents.</strong> General-purpose and Explore subagents ship built-in, and you can define your own in Settings. They run in isolated contexts and report findings back to the main Agent — useful for parallel research without polluting the primary context.</li>
<li><strong>MCP support.</strong> One place to configure Model Context Protocol servers; configured servers and plugin-shipped servers are listed separately. Well adapted to the GLM-5.3 family for multi-step coding workflows.</li>
<li><strong>Remote and Bot channels.</strong> Desktop, mobile Remote, and Feishu/WeChat bots can all push the same workspace task forward — @ the bot and the Agent keeps going while you are away from the desk.</li>
<li><strong>Permission modes.</strong> Four execution modes surfaced in the task UI; sensitive commands, file changes, network calls, and script runs require confirmation before execution, and risk state stays visible in the toolbar.</li>
<li><strong>Automations and idle-time tasks.</strong> Queue non-urgent work as idle-time tasks; subscribers get them executed free during spare-capacity windows without burning plan quota.</li>
</ul>
<h2>Pricing and access</h2>
<p>The ZCode application itself is free to download and use. First-time users get a 5-day trial: GLM-5.3 at 3M tokens/day plus GLM-5-turbo at 2M tokens/day (5M/day combined) — the docs note these daily quotas expire after the 5 days and are not a permanent allowance. For ongoing use you bind a BigModel or Z.ai account with a GLM Coding Plan; usage stats show quota, model consumption, and tool calls. You can also connect your own API keys, enterprise model channels, or approved self-hosted services. Idle-time tasks execute free during spare capacity for subscribers (rolling out gradually).</p>
<p>Installer coverage is genuinely cross-platform: macOS (Apple Silicon and Intel), Windows x64 and ARM64, and Linux x64 AppImage. A data-migration wizard imports conversations from Claude Code and the legacy ZCode Agent — nothing else is supported today.</p>
<h2>Who it fits</h2>
<p>ZCode makes the most sense for developers and small teams already inside the GLM ecosystem — a BigModel/Z.ai account, a Coding Plan, or API keys — who want long-running agentic work (implement feature, verify, review, iterate from another device) rather than quick chat completions. The Feishu/WeChat bot channel is a real differentiator for Chinese-team workflows. If your stack lives on Anthropic/OpenAI subscriptions and you never touch GLM models, the tight GLM-5.3 coupling that is ZCode's main strength becomes a constraint instead.</p>
<h2>Limitations worth knowing</h2>
<ul>
<li>Model coverage is GLM-first by design; the deep tuning targets the GLM-5.3 family specifically.</li>
<li>Idle-time free execution is subscriber-only and still rolling out gradually.</li>
<li>The migration wizard imports only Claude Code and legacy ZCode Agent history.</li>
<li>Docs are thorough but the product moves fast — quota terms and feature flags change between releases; check the official docs before relying on a specific allowance.</li>
</ul>
<h2>Official links</h2>
<ul>
<li><a href="https://zcode.z.ai/en/docs/welcome" rel="nofollow noopener" target="_blank">ZCode official documentation</a></li>
<li><a href="https://z.ai/" rel="nofollow noopener" target="_blank">Z.ai</a></li>
</ul>
