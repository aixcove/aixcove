---
title: Cursor
date: '2026-04-05T13:01:43'
modified: '2026-08-25T12:30:00'
slug: cursor
description: Cursor is an AI-first VS Code fork with agent-mode editing, Tab autocomplete, cloud agents and Bugbot code review. Plan prices, fit, and real limits.
categories:
- ai-coding
wpId: 202
image: /uploads/2026/04/cursor.jpg
featured: false
---
<h2>What is Cursor?</h2>
<p>Cursor is an AI code editor built as a fork of VS Code. It keeps the extensions, themes, and keybindings you already use, then adds autocomplete, chat, and a coding agent that can work across an entire repository. The core idea is simple: instead of copying an error into a browser tab and pasting a fix back, you let the agent read the repo, propose a diff, run the tests, and fix what it broke — without leaving the editor.</p>
<p>The company behind it, Anysphere, also trains its own coding models. Composer, the in-house model built for long-running agent tasks, now sits alongside frontier models from other providers inside the same plans. Since 2023 it has gone from curiosity to the daily editor for a large share of professional developers, and it is the yardstick most new AI coding tools get measured against.</p>
<h2>What you actually get</h2>
<ul>
<li><strong>Tab completion</strong> — autocomplete that suggests multi-line edits based on your recent changes, surrounding code, and linter output, not just the current line.</li>
<li><strong>Agent mode</strong> — a multi-file agent that plans a change, edits across the repository, runs terminal commands, and iterates on its own errors until the task is done.</li>
<li><strong>Composer model access</strong> — Cursor's own coding model, tuned for long agent sessions at lower token cost; even the free plan includes it.</li>
<li><strong>Cloud agents</strong> — agents that run remotely against your repository with shared team context, manageable from the CLI or the mobile app, so tasks keep going while your laptop is closed.</li>
<li><strong>Bugbot</strong> — automatic AI code review that runs in the background on new pull requests.</li>
<li><strong>MCP, skills, hooks, and a marketplace</strong> — connect external tools, define project rules, and share internal plugins across a team.</li>
<li><strong>VS Code compatibility</strong> — one-click import of settings, extensions, and themes; migrating from VS Code takes minutes.</li>
</ul>
<h2>Pricing plans</h2>
<p>Monthly list prices as of August 2026:</p>
<ul>
<li><strong>Hobby — free.</strong> No credit card required. Limited agent requests, plus access to the Composer model.</li>
<li><strong>Pro — $20/month.</strong> Extended agent limits, frontier model access, MCPs, skills, hooks, cloud agents, and Bugbot on usage-based billing.</li>
<li><strong>Pro+ — $60/month.</strong> Three times the Pro agent limits, plus Grok Bot access. This is the tier Cursor recommends for daily agent users.</li>
<li><strong>Ultra — $200/month.</strong> Twenty times the Pro agent limits and priority access to new features, aimed at people who live inside the agent.</li>
<li><strong>Teams — $40/user/month.</strong> Centralized billing and administration, SAML/OIDC SSO, team-wide privacy mode, usage analytics, shared cloud agent context, and Bugbot code reviews. A Premium tier raises agent limits to five times Standard.</li>
<li><strong>Enterprise — custom pricing.</strong> Adds pooled usage, invoice and PO billing, SCIM seat management, audit logs, and access controls over repositories, models, and MCP servers.</li>
</ul>
<p>Every plan includes a set amount of model usage. When you run past it, on-demand usage keeps working and is billed in arrears, which is how heavy agent sessions push a monthly bill past the sticker price. Yearly billing is also offered. Two caveats: Cursor has reshuffled plans and limits before, so treat the official pricing page as the source of truth. And the old "one free year of Pro for students" offer is gone — students now get the free Hobby plan plus event promotions.</p>
<h2>Who it fits</h2>
<p>Cursor pays off fastest on messy, multi-file work: refactors, framework migrations, getting up to speed on an unfamiliar codebase, or shipping features in a stack you do not fully master. Developers who run agents all day justify Pro+ easily. Ultra makes sense only when measured usage — not enthusiasm — puts you there. Teams that standardize on it get real value from shared rules, enforced privacy mode, and Bugbot catching problems before a human reviewer looks.</p>
<p>It is a weaker fit if you mostly write small patches in a single file (a lighter autocomplete tool costs less), if your workflow depends on every VS Code extension behaving exactly as upstream, or if policy restricts sending code to third-party model providers — read the privacy mode and security documentation carefully before committing.</p>
<h2>Limitations worth knowing</h2>
<ul>
<li><strong>Usage limits bite at the low tiers.</strong> Hobby is fine for evaluation; anyone doing serious agent work hits the ceiling quickly.</li>
<li><strong>Costs are usage-shaped.</strong> The subscription buys a quota, not infinity. On-demand overage is the usual way a $20 month becomes $60.</li>
<li><strong>It is a fork, not vanilla VS Code.</strong> Updates occasionally lag upstream, and a small minority of extensions misbehave.</li>
<li><strong>Review discipline still matters.</strong> Agents produce confident, plausible, sometimes wrong code. Bugbot helps; it does not replace a human reading the diff.</li>
<li><strong>Privacy mode is opt-in.</strong> If your code must not be used for training, enable it in settings or have a team admin enforce it.</li>
</ul>
<h2>Official links</h2>
<ul>
<li><a href="https://cursor.com" target="_blank" rel="nofollow noopener">Cursor official site</a></li>
<li><a href="https://cursor.com/pricing" target="_blank" rel="nofollow noopener">Current plans and pricing</a></li>
<li><a href="https://cursor.com/docs" target="_blank" rel="nofollow noopener">Documentation (Tab, Agent, cloud agents, Bugbot)</a></li>
</ul>
