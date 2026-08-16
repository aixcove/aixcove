---
title: DeepSeek Harness
date: '2026-08-16T18:00:00'
modified: '2026-08-16T18:00:00'
slug: deepseek-harness
description: DeepSeek Harness（dsh）是 DeepSeek 2026 年 8 月开源的 MIT 许可 Agent 框架，模型、工具、会话、沙箱乃至 Agent 循环都是可替换的 Cordis 插件。开发者预览期，预期会有破坏性变更。
categories:
- ai-agents
image: /uploads/2026/08/deepseek-harness-review-hero.jpg
featured: false
---
<h2>DeepSeek Harness 是什么</h2>
<p>DeepSeek Harness，命令名 <code>dsh</code>，是 DeepSeek 在 2026 年 8 月以开发者预览版形式开源的 Agent 框架。它处在语言模型和你想完成的工作之间。官方的概括是 <code>Agent = Model + Harness</code>，模型负责推理，Harness 负责让 Agent 理解环境、使用工具、在一次真实会话里持续干活。项目用 TypeScript 写在 Cordis 框架上，MIT 许可，发布几天内 GitHub 星标约十二万。</p>
<p>它的招牌思路是“一切皆插件”。Cordis 内核只管插件的加载、卸载和依赖关系，模型适配器、工具注册表、会话日志、沙箱、存储、调度、Web UI，每一项能力都是插件，可以在配置层替换或扩展，不需要改源码。没有特权核心。</p>

<h2>适合做什么</h2>
<ul>
<li><strong>编码 Agent 工作</strong>，标准模式提供文件编辑、Shell、文件与网页检索、Skills、计划、子代理和工作流。</li>
<li><strong>自定义 Agent 构建</strong>，创造模式可以检查运行时、在内存中试验 Cordis 插件、组合出新的预设。</li>
<li><strong>模型评测</strong>，极简模式只保留一个持久 bash 和一个文件编辑器，是干净的模型基准测试基座。</li>
<li><strong>可审计会话</strong>，模型看到的一切都写入只追加的会话日志，Trajectory 视图按来源追踪提示词、工具调用和上下文注入。</li>
</ul>

<h2>怎么跑起来</h2>
<p>装好 Node.js 后执行 <code>npx @deepseek-ai/dsh web</code>，浏览器打开 <code>http://127.0.0.1:3080</code> 就是 Web 界面。在 Settings 里填入 DeepSeek API key，选好工作区目录之后，会话就能读写文件、执行命令、派发子任务、维护计划，需要审批的操作会先询问再执行。源码运行走常规的 pnpm install、build、<code>pnpm dsh web</code> 路径。</p>

<h2>限制与注意事项</h2>
<p>项目明确处于开发者预览阶段，README 用大写字母写着会有兼容性破坏变更。社区插件生态刚起步，写插件需要先理解 Cordis，一个能碰 Shell 和文件编辑的 Agent 也需要自己定好审批策略。使用时锁版本、先在一次性工作区里测试、预留版本间迁移工作量。框架本身免费，模型调用需要自己的 API key，按 DeepSeek API 定价计费。</p>

<h2>和其他工具的关系</h2>
<p>Dsh 是 Harness 层，不是模型，所以它和站内 <a href="/zh/listing/deepseek/">DeepSeek</a> 词条是互补关系。对比 <a href="/zh/listing/claude-code/">Claude Code</a>，它用完整源码和插件级可替换性换掉了商业产品的打磨度。对比 <a href="/zh/listing/openclaw/">OpenClaw</a>，它更面向构建 Agent 基础设施的开发者，而不是组装个人助手的终端用户。选哪个，核心问题是你要不要自己掌管 Harness 这一层。</p>

<h2>相关链接</h2>
<ul>
<li><a href="https://www.deepseek.com/harness" target="_blank" rel="noopener noreferrer">DeepSeek Harness 官方页面</a></li>
<li><a href="https://github.com/deepseek-ai/deepseek-harness" target="_blank" rel="noopener noreferrer">GitHub 仓库（MIT）</a></li>
<li><a href="https://github.com/deepseek-ai/deepseek-harness/discussions" target="_blank" rel="noopener noreferrer">GitHub Discussions</a></li>
</ul>
