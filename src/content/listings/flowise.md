---
title: Flowise
date: '2026-04-19T14:39:27'
modified: '2026-08-22T10:30:00'
slug: flowise
description: Flowise is a visual, open-source LLM app builder that was archived in August 2026. See what it did well, why it shut down, its security record, and where to.
categories:
- ai-agents
wpId: 633
image: /uploads/2026/04/flowise-1.jpg
featured: false
---
<h2>Flowise has been archived. Read this before you build on it</h2>
<p>Flowise was a popular open-source visual builder for LLM applications, where you dragged nodes onto a canvas to assemble chatbots, RAG pipelines, and agent flows. It was acquired by Workday in August 2025, and on July 29, 2026 the team announced it was winding down. The GitHub repository was archived on August 13, 2026, and August 31, 2026 is the stated end of life, when official presence in Discord and GitHub concludes. npm packages and Docker images are marked deprecated.</p>
<p>This matters if you are evaluating Flowise today. New feature development has stopped, issues and pull requests are locked, and no one is shipping fixes. The code stays visible on GitHub under Apache-2.0 and you are free to fork it, but a fork is now a maintenance project you own. If you are starting something new, pick a maintained tool instead. If you already run Flowise in production, plan a migration or a fork, and check your exposure to the security issues below.</p>
<h2>What Flowise actually did</h2>
<p>Flowise gave you a node-based canvas with three levels of builder. Assistant was the beginner path, a chat assistant that could follow instructions, use tools, and answer from uploaded files. Chatflow was for single-agent chatbots and simpler LLM flows, with support for retrieval, rerankers, and Graph RAG. Agentflow was the superset, covering multi-agent systems and complex orchestration, and a V2 of Agentflow shipped as the last major push.</p>
<p>It connected to 100+ sources, tools, vector databases, and memory integrations. You could run it fully self-hosted, including air-gapped, or use Flowise Cloud. It exposed an API, JS and Python SDKs, a CLI, an embeddable chat widget, and an MCP node for Model Context Protocol tools. Enterprise controls covered RBAC, SSO, encrypted credentials, secret managers, rate limits, and restricted domains. An evaluation layer supported datasets, evaluators, and eval runs.</p>
<h2>Why it shut down</h2>
<p>The sunset announcement gave one reason directly. As models got better at reasoning, developers moved to coding agents for complex work, and the rigid low-code workflow approach hit its limit on complexity. Hacker News commenters largely agreed with that diagnosis, adding that workflow builders also burn tokens and are hard to test. The same category is losing players across the board, OpenAI's Agent Builder was also deprecated in 2026. So the shutdown was a category shift, not just a company failure.</p>
<p>One detail worth knowing. Workday acquired Flowise in August 2025 and said Flowise was staying and they were doubling down. Less than a year later it was wound down. If you evaluate tools partly by ownership stability, that sequence is the cautionary tale.</p>
<h2>Security record you should know about</h2>
<p>Flowise accumulated a serious security history, and it matters more now that patches have stopped. Multiple remote code execution issues were disclosed in 2025 and 2026, including CVE-2026-40933, a max-severity RCE in the MCP node that was reported as exploited in attacks, plus CVE-2026-41268 and others. An independent audit by elttam in August 2026 described six more RCE paths in versions 3.1.1 and 3.1.2, along with a history of sandbox escapes and account-takeover flaws in password reset and email change flows.</p>
<p>Some of these required a logged-in user or a misconfigured custom MCP node, and the maintainers shipped patches while the project was active. The practical risk now is the fixed window. If you run a fork, patching those paths is on you. If you expose a Flowise instance to the internet, assume it is a target.</p>
<h2>What to do if you already use it</h2>
<p>Two honest paths exist for existing users. Fork the repository and maintain it internally, which keeps your workflows but makes you the owner of security fixes and compatibility with newer models. Or migrate to a maintained builder. Dify is the closest productized replacement, with datasets, prompt management, and app deployment in one layer. Langflow stays close to the visual node model, n8n covers broader automation, and LangGraph suits teams that want code-level control over agent state.</p>
<p>Before migrating, inventory what your flows actually depend on. Which vector stores, which model providers, which custom nodes. Most visual builders cover the same core integrations, but custom JavaScript nodes and niche connectors are where migration gets expensive.</p>
<h2>Practical tips for the transition</h2>
<ul>
<li><strong>Do not start new projects on it.</strong> The repository is archived, packages are deprecated, and no fixes are coming. A new build on Flowise is a liability from day one.</li>
<li><strong>If you must keep running it, isolate it.</strong> Do not expose the instance publicly, keep it behind authentication, and treat the MCP node and custom code execution as high-risk surfaces.</li>
<li><strong>Fork before the archive matters.</strong> The code is Apache-2.0 and remains on GitHub, so a fork is legal and straightforward. Just budget for maintaining it.</li>
<li><strong>Export and document your flows now.</strong> Walk through each flow, note the integrations and credentials it uses, and keep that inventory before you migrate, so the new tool covers the same ground.</li>
<li><strong>Test the migration on one flow first.</strong> Rebuild the simplest production flow in the candidate tool, compare output quality and cost, then scale to the rest.</li>
<li><strong>Check your version for known CVEs.</strong> If you are on an older release, assume the RCE paths from the 2026 disclosures apply. Upgrading is moot on an archived project, which is another reason to migrate.</li>
</ul>
<h2>Where Flowise still fits, and where it does not</h2>
<p>Flowise still makes sense as a reference for how visual LLM builders are structured, and its archived source is a learning resource for people building similar tooling. Teams with a genuine fork-and-maintain strategy can keep it alive internally. For everyone else, including anyone who needs long-term support, security fixes, or new model integrations, it is no longer a viable choice.</p>
<h2>Related tools on AIXCove</h2>
<ul>
<li><a href="/listing/dify/">Dify</a> as the closest maintained replacement with a full app layer</li>
<li><a href="/listing/langgraph/">LangGraph</a> for code-level agent state and orchestration</li>
<li><a href="/listing/anythingllm/">AnythingLLM</a> for a simpler private document chat workspace</li>
<li>Browse all <a href="/listing-category/ai-agents/">AI agent tools</a>, our <a href="/best-flowise-alternatives-in-2026/">Flowise alternatives</a> guide, and the <a href="/dify-vs-flowise-which-ai-builder-fits-you-in-2026/">Dify vs Flowise</a> comparison</li>
</ul>
<h2>Sources and further reading</h2>
<ul>
<li><a href="https://github.com/FlowiseAI/Flowise" rel="nofollow noopener" target="_blank">GitHub repository</a>, archived, with the sunset announcement in README and discussion #6727</li>
<li><a href="https://flowiseai.com/sunset" rel="nofollow noopener" target="_blank">Official sunset announcement</a> with the EOL timeline</li>
<li><a href="https://www.elttam.com/blog/cruising-for-shells-in-flowise" rel="nofollow noopener" target="_blank">elttam security audit</a>, six RCE paths and the broader CVE history</li>
<li><a href="https://news.ycombinator.com/item?id=49176920" rel="nofollow noopener" target="_blank">Hacker News discussion</a> of the shutdown</li>
</ul>
