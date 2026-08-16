---
title: DeepSeek Harness
date: '2026-08-16T18:00:00'
modified: '2026-08-16T18:00:00'
slug: deepseek-harness
description: DeepSeek Harness (dsh) is DeepSeek's open-source MIT-licensed agent harness where models, tools, sessions, sandbox, and even the agent loop are replaceable Cordis plugins. Developer preview with breaking changes expected.
categories:
- ai-agents
image: /uploads/2026/08/deepseek-harness-review-hero.jpg
featured: false
---
<h2>What is DeepSeek Harness?</h2>
<p>DeepSeek Harness, command name <code>dsh</code>, is the open-source agent harness that DeepSeek released in developer preview in August 2026. It sits between a language model and the work you want done. The team summarizes it as <code>Agent = Model + Harness</code>, where the model provides reasoning and the harness provides environment understanding, tool use, and sustained operation across real sessions. It is written in TypeScript on the Cordis framework, ships under the MIT license, and reached roughly 120k GitHub stars within days of release.</p>
<p>The defining idea is "everything is a plugin." The Cordis kernel handles only plugin loading, unloading, and dependency relationships. Every capability, including the model adapter, tool registry, session log, sandbox, storage, scheduling, and the web UI, is a plugin that can be replaced or extended from a configuration layer without patching the source. There is no privileged core.</p>

<h2>What it is good at</h2>
<ul>
<li><strong>Coding agent work:</strong> standard mode provides file editing, shell, file and web retrieval, skills, plans, subagents, and workflows.</li>
<li><strong>Custom agent building:</strong> create mode inspects the runtime, experiments with Cordis plugins in memory, and composes new presets.</li>
<li><strong>Model evaluation:</strong> minimal mode keeps only a persistent bash tool and one file editor, a clean baseline for benchmarking models.</li>
<li><strong>Auditable sessions:</strong> everything the model sees is written to an append-only session log, and a trajectory view traces prompts, tool calls, and context injections by source.</li>
</ul>

<h2>How to run it</h2>
<p>With Node.js installed, <code>npx @deepseek-ai/dsh web</code> starts the web UI at <code>http://127.0.0.1:3080</code>. After adding a DeepSeek API key in Settings and selecting a workspace directory, a session can read and edit files, run commands, delegate work, and maintain a plan, asking for approval under the active permission policy. A source checkout follows the usual pnpm install, build, and <code>pnpm dsh web</code> path.</p>

<h2>Limits and cautions</h2>
<p>The project is an explicit developer preview, and the README states in capital letters that compatibility-breaking changes will come. The community plugin ecosystem is young, plugin development assumes familiarity with Cordis, and an agent with shell and file-edit access needs a deliberate approval policy. Pin versions, test in a disposable workspace, and expect migration work between updates. Pricing does not apply, the framework is free software, but model usage requires your own API key and follows DeepSeek API pricing.</p>

<h2>How it relates to other tools</h2>
<p>Dsh is the harness layer rather than a model, so it complements the <a href="/listing/deepseek/">DeepSeek</a> listing rather than competing with it. Compared with <a href="/listing/claude-code/">Claude Code</a>, it trades a polished commercial product for full source access and plugin-level replaceability. Compared with <a href="/listing/openclaw/">OpenClaw</a>, it targets developers building agent infrastructure more than end users wiring a personal assistant. Choosing between them is mostly a question of whether you want to own the harness.</p>

<h2>Useful links</h2>
<ul>
<li><a href="https://www.deepseek.com/harness" target="_blank" rel="noopener noreferrer">DeepSeek Harness official page</a></li>
<li><a href="https://github.com/deepseek-ai/deepseek-harness" target="_blank" rel="noopener noreferrer">GitHub repository (MIT)</a></li>
<li><a href="https://github.com/deepseek-ai/deepseek-harness/discussions" target="_blank" rel="noopener noreferrer">GitHub Discussions</a></li>
</ul>
