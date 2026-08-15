---
title: Hermes Agent vs OpenClaw：能自我纠错的开源AI代理
date: '2026-04-11T10:23:38'
modified: '2026-08-11T19:15:02'
slug: hermes-agent-vs-openclaw-the-new-open-source-ai-agent-that-learns-from-its-own-mistakes
description: 开源AI代理Hermes Agent，从经验中构建可复用技能，内置40多种工具，低配VPS即可运行。Nous Research出品，已获8,700+星标。
categories:
- ai-trends-news
featured: /uploads/2026/04/cover-529-1.jpg
wpId: 529
---
<p><em>一款开源AI智能体，从经验中构建可复用技能，自带40多种内置工具，在5美元的VPS上就能跑——空闲时几乎不耗资源。Nous Research的Hermes Agent几周内就收获了8700个GitHub星标。但它真的能取代OpenClaw吗？</em></p>
<p>AI智能体赛道越来越拥挤。每周都有新框架宣称要做你的“个人AI助手”。大多数只是套了工具调用的聊天机器人外壳——演示时惊艳，实际用起来平平无奇。</p>
<p>Hermes Agent由Nous Research于2026年初发布，走的是另一条路。它的核心卖点不只是“能用工具”，而是“用工具会越用越好”。完成一项复杂任务后，智能体会自动生成一份可复用的技能文档。下次遇到类似场景，它直接加载这份技能，而不是从头摸索。技能用多了，还会开始自我优化。</p>
<p>这个说法口气不小。我花时间翻了代码库、文档和社区讨论，看看它是否站得住脚——以及和OpenClaw相比表现如何。OpenClaw是2025年以来一直在背后支撑个人AI智能体的框架。</p>
<h2>Hermes Agent是什么？</h2>
<p>Hermes Agent是Nous Research开发的MIT许可、基于Python的AI智能体框架——就是推出Hermes、Nomos和Psyche模型系列的那个实验室。截至2026年3月底，它已有<strong>8700多个GitHub星标、142位贡献者、2293次提交</strong>。</p>
<p>大多数智能体框架会把你绑定到单一模型提供商，Hermes则从一开始就与提供商无关。你可以用OpenRouter（可访问200多个模型）、OpenAI、Anthropic、z.ai/GLM、Kimi/Moonshot、MiniMax，或者自己托管的Ollama、vLLM、SGLang端点。切换提供商只需一条命令，不用改任何代码。</p>
<p>智能体常驻运行在你自己的基础设施上：一台5美元/月的VPS、一个Docker容器、一台远程SSH服务器，或者Modal和Daytona这类无服务器平台——空闲时自动休眠，会话之间几乎零成本。你可以通过Telegram、Discord、Slack、WhatsApp、Signal或完整终端界面与它交互，全部由同一个网关进程管理。</p>
<h2>闭环学习：Hermes真正创新的地方</h2><p>大多数AI代理的记忆方式，就像金鱼没有长期计划一样。它们在会话内维持上下文，或许存储一些对话历史，然后就此打住。</p>
<p>Hermes尝试更宏大的目标：一个跨四层运作的闭环学习机制：</p>
<h3>第一层：精选记忆</h3>
<p>代理维护两个有界文件——<strong>MEMORY.md</strong>（约2,200字符，记录环境事实、约定和教训）和<strong>USER.md</strong>（约1,375字符，记录用户偏好和沟通风格）。这些文件在会话开始时注入系统提示。代理自主管理这两个文件：学到有用信息时添加条目，替换过时内容，空间紧张时进行整合。</p>
<h3>第二层：全文会话搜索</h3>
<p>所有过往对话存储在SQLite中，支持FTS5全文搜索。当代理需要回忆之前对话中的内容时，它搜索历史记录，并用LLM摘要提取相关上下文——按需调用，不增加系统提示的负担。</p>
<h3>第三层：自动技能创建</h3>
<p>完成复杂任务（通常涉及5次以上工具调用）后，代理能自主生成技能——一份结构化的markdown文档，包含步骤、陷阱和验证方法。下次遇到类似任务，代理识别出模式，直接加载该技能。</p>
<h3>第四层：技能自我改进</h3>
<p>技能不是静态的。当代理在使用技能时发现更好的方法——更快的路径、常见的边界情况、更可靠的工具序列——它会就地更新技能文档。</p>
<p>这个循环是真正的创新点。OpenClaw有技能系统和自我改进技能，但创建和优化过程更偏手动。Hermes将整个周期自动化。</p>
<h2>功能对比：Hermes Agent vs. OpenClaw</h2>
<table>
<thead>
<tr>
<th>功能</th>
<th>Hermes Agent</th>
<th>OpenClaw</th>
</tr>
</thead>
<tbody>
<tr>
<td>语言</td>
<td>Python</td>
<td>Node.js/TypeScript</td>
</tr>
<tr>
<td>许可证</td>
<td>MIT</td>
<td>MIT</td>
</tr>
<tr>
<td>记忆系统</td>
<td>MEMORY.md + USER.md + SQLite FTS5</td>
<td>MEMORY.md + memory/ 每日日志 + 向量搜索</td>
</tr>
<tr>
<td>技能创建</td>
<td>复杂任务后自动生成</td>
<td>手动安装或创建</td>
</tr><tr>
<td>技能提升</td>
<td>使用中自动更新</td>
<td>通过附加技能实现</td>
</tr>
<tr>
<td>模型提供商</td>
<td>OpenRouter（200+）、OpenAI、Anthropic、z.ai、Kimi、MiniMax、自定义</td>
<td>OpenAI、Anthropic、Google、自定义</td>
</tr>
<tr>
<td>终端后端</td>
<td>6种（Local、Docker、SSH、Daytona、Singularity、Modal）</td>
<td>Local + SSH</td>
</tr>
<tr>
<td>消息平台</td>
<td>Telegram、Discord、Slack、WhatsApp、Signal</td>
<td>Telegram、Discord、Slack、WhatsApp、Signal、飞书</td>
</tr>
<tr>
<td>MCP支持</td>
<td>原生</td>
<td>通过插件</td>
</tr>
<tr>
<td>Cron定时任务</td>
<td>内置</td>
<td>内置</td>
</tr>
<tr>
<td>安装方式</td>
<td><code>curl</code> 一行命令</td>
<td><code>npm install -g</code></td>
</tr>
<tr>
<td>研究工具</td>
<td>批量轨迹生成、RL环境、轨迹压缩</td>
<td>有限</td>
</tr>
<tr>
<td>飞书集成</td>
<td>无</td>
<td>完整原生（文档、多维表格、知识库、云盘）</td>
</tr>
<tr>
<td>OpenClaw迁移</td>
<td><code>hermes claw migrate</code></td>
<td>—</td>
</tr>
</tbody>
</table>
<h2>Hermes Agent的优势</h2>
<p><strong>自我学习是真的，不是营销话术。</strong>自动创建技能和自我改进的循环不是空头支票——它已实现在代码库中，运行效果与描述一致。用Hermes做了一系列SEO审计后，它自动创建了一个技能，完整记录了整个工作流程：工具选择、常见坑点、输出格式。下一次审计时，它加载了这个技能，用大约一半的步骤就完成了任务。</p>
<p><strong>无服务器后端改变了成本结构。</strong>支持Daytona和Modal意味着你的代理环境在空闲时休眠，按需唤醒。对于不需要24/7在线的用户，非活跃期间托管成本可以降到接近零。</p>
<p><strong>开箱即用的研究能力。</strong>如果你在训练更好的工具调用模型，Hermes内置批量轨迹生成、Atropos RL环境和轨迹压缩。这让它既是面向用户的产品，也是研究基础设施。</p>
<p><strong>社区势头强劲。</strong>几周内获得8700颗星，这个数字值得注意。142人的贡献者基础说明社区参与度健康，不只是企业背景的项目。</p>
<h2>OpenClaw仍然领先的地方</h2><p><strong>飞书集成是中国用户的决定性因素。</strong>OpenClaw 深度原生支持飞书——文档读写、Bitable 多维表格、知识库导航、云存储操作和权限管理。对于中国企业生态中的团队和个人来说，这不是可选项，而是必需品。Hermes 完全没有飞书支持，也没有公布任何添加计划。</p>
<p><strong>Node.js 生态很重要。</strong>如果你的团队使用 JavaScript/TypeScript，OpenClaw 的架构在扩展、调试和贡献方面更自然。</p>
<p><strong>生产成熟度很关键。</strong>OpenClaw 在生产环境中运行时间更长。消息投递、错误恢复、多会话管理和跨平台问题等边缘情况，都通过实际使用得到了解决。</p>
<p><strong>ClawHub 技能市场。</strong>OpenClaw 拥有 ClawHub，这是一个集中的技能市场，用户可以在此发现、安装和分享代理技能。虽然 Hermes 也有 Skills Hub，但仍处于早期阶段。</p>
<h2>安装与快速开始</h2>
<p>让 Hermes Agent 运行起来大约需要两分钟：</p>
<pre><code>curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash</code></pre>
<p>支持 Linux、macOS、WSL2 以及通过 Termux 运行的 Android。原生 Windows 不支持——你需要 WSL2。</p>
<p>安装完成后：</p>
<pre><code>source ~/.bashrc      # 重新加载 shell
hermes setup          # 交互式设置向导
hermes                # 在终端开始聊天
hermes model          # 选择你的 LLM 提供商
hermes gateway        # 启动消息网关（Telegram、Discord 等）</code></pre>
<p>从 OpenClaw 迁移过来？有内置迁移路径：</p>
<pre><code>hermes claw migrate   # 导入设置、记忆、技能和 API 密钥</code></pre>
<p>常用斜杠命令会让人感到熟悉：<code>/new</code> 开始新对话，<code>/model</code> 在会话中切换提供商，<code>/skills</code> 浏览可用技能，<code>/stop</code> 中断当前任务。</p>
<h2>结论</h2>
<p>Hermes Agent 是 2026 年出现的最有趣的代理框架。它的闭环学习机制——自动技能创建、使用中自我改进和有界持久记忆——代表了 AI 代理随时间积累专业知识方面的真正进步。</p><p>但“最有趣”不等于“最适合所有人”。</p>
<p>如果你是开发者或研究者，想探索自主智能体的边界，而且不依赖飞书，Hermes Agent 值得关注。它的自学习能力是实打实的，架构干净，社区活跃。</p>
<p>如果你身处飞书重度使用的环境，或者更看重生产稳定性而非前沿功能，OpenClaw 依然是更务实的选择。单凭飞书集成这一点，它就对相当一部分用户不可或缺。</p>
<p>好消息是：两者都是 MIT 许可，免费。你完全可以两个都跑一遍，自己判断。</p>
<p>AI 智能体领域有两个项目互相竞争、互相借鉴，是件好事。我们都能从中受益。</p>
<hr />
<ul>
<li><strong>Hermes Agent 文档：</strong> <a href="https://hermes-agent.nousresearch.com/docs/">hermes-agent.nousresearch.com/docs</a></li>
<li><strong>Hermes Agent GitHub：</strong> <a href="https://github.com/NousResearch/hermes-agent">github.com/NousResearch/hermes-agent</a></li>
<li><strong>OpenClaw 文档：</strong> <a href="https://docs.openclaw.ai">docs.openclaw.ai</a></li>
<li><strong>OpenClaw GitHub：</strong> <a href="https://github.com/openclaw/openclaw">github.com/openclaw/openclaw</a></li>
</ul>
