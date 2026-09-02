---
title: OpenCode
date: '2026-04-05T14:37:52'
modified: '2026-09-02T08:30:00'
slug: opencode
description: OpenCode 是一个 MIT 许可的开源 AI 编程代理，可在终端、桌面端和 IDE 中使用。本文核对模型接入、权限、Zen 成本、隐私边界和上手方法。
categories:
- ai-coding
wpId: 214
image: /uploads/2026/04/opencode.jpg
featured: false
author: AIX Cove 出品
source: OpenCode 官方文档、Zen 定价与隐私说明、GitHub 仓库和问题追踪页。2026 年 9 月核实。
reviewed: AIX Cove
---
<h2>OpenCode 是什么</h2>
<p>OpenCode 是 Anomaly 做的开源 AI 编程代理。它最早把终端当成主场，现在还有桌面应用和 IDE 扩展。项目代码放在 <a href="https://github.com/anomalyco/opencode" target="_blank" rel="noopener noreferrer">GitHub 仓库</a>，使用 MIT 许可证。开源让人能检查代码、换模型服务商，也能自己接本地端点。不过代码是否离开电脑，取决于你最后选了谁来跑模型。</p>
<p>它的日常用法并不复杂。进到项目目录，接入一个模型服务商，或者使用 OpenCode Zen，然后让代理读代码、列计划、改文件、跑测试。执行 <code>/init</code> 能生成或更新 <code>AGENTS.md</code>。把安装命令、测试命令、代码规范和不能碰的目录写进去，下次开新会话也不用从头交代。</p>
<p>我把官方文档、Zen 说明和公开问题追踪页对了一遍，觉得 OpenCode 的价值落在控制权上。你能决定从哪里调用模型，能把命令和路径权限收紧，也能换掉不合适的模型。相应地，密钥、费用、数据去向和最终 diff 也都得有人负责。</p>

<h2>它怎样参与一次开发任务</h2>
<p>默认的 <strong>Build</strong> 代理有完整开发工具权限。内置的 <strong>Plan</strong> 代理用于分析和看代码，默认不许编辑文件，运行 shell 命令时也会询问。还有用于搜索和多步任务的子代理。第一次进陌生仓库时，先让 Plan 交出相关文件、已有约定、风险点和测试命令，确定范围后再切到 Build，通常比上来就让它改代码省事。</p>
<p>模型接入是它的一大特点。官方文档列出 75 家以上服务商，也支持 Ollama、LM Studio、llama.cpp 等本地模型和自定义端点。用 <code>/connect</code> 加入的密钥保存在 <code>~/.local/share/opencode/auth.json</code>。本地模型能少走一段外发路径，却不等于没有安全工作。密钥文件、插件、代理服务器和项目里的敏感文件，仍要自己看住。</p>
<p>不想分别开服务商账号，可以选 Zen。它是 OpenCode 提供的可选模型网关，按请求计费，模型名单和单价会变。官方 <a href="https://opencode.ai/docs/zen/" target="_blank" rel="noopener noreferrer">Zen 页面</a> 按每百万 token 列价，团队预算该从这里算，别把免费客户端当成模型调用也免费。</p>

<h2>四个更稳的用法</h2>
<ul>
<li><strong>先做只读检查</strong> 让 Plan 列出会碰到的文件、现有写法、可能失败的地方和验证命令，并要求它停在计划处。代码还没被改动，很多错误理解已经能看出来。</li>
<li><strong>把 AGENTS.md 写短</strong> 放进项目真正需要的安装命令、测试命令、格式化规则、生成文件政策和禁区。它是给代理的上下文，也该是审阅者一眼能读懂的项目说明。</li>
<li><strong>按动作收紧权限</strong> OpenCode 可把动作设为允许、询问或拒绝。删除命令如 <code>rm *</code> 应继续拒绝，范围大的 shell 命令先问，文件路径只放开这次任务需要的部分。刚接触一个仓库时，不要为了少点几次确认就开 <code>--auto</code>。</li>
<li><strong>用同一道题选模型</strong> 给两个服务商同一个 issue、同一份代码快照、同一条测试命令和同一张审阅清单。记下 token 花费、重试次数、diff 质量和返工时间。演示里看着快的模型，放到真实审阅环节未必划算。</li>
</ul>

<h2>费用、隐私和分享各有坑</h2>
<p>OpenCode 客户端免费，模型账单另算。直连服务商时，价格和数据保留规则跟着那家服务商走。走 Zen 时，费用按请求累积。Zen 支持按工作区和成员设置月度上限，但自动充值会在余额低于设定阈值时补充信用额。团队先设一个小上限，用几天看实际用量，再决定是否放开。</p>
<p>Zen 文档写明，列出的模型托管在美国，服务商遵循零保留政策，同时也列出了几种免费或贡献者模型的例外。有些临时免费模型会收集数据用于改进模型，NVIDIA 的试用端点明确提醒不要提交个人或机密数据。看到 Free 标记时，先读这一项模型的条款，再考虑省下的费用。</p>
<p>会话分享也该单独检查。默认要手动执行 <code>/share</code> 才会生成链接，生成后，拿到链接的人都能访问该会话。发出去前看一遍 prompt、粘贴过的日志、仓库路径和输出内容。终端记录里露出来的东西，常常比一个 diff 多得多。</p>

<h2>限制与公开反馈</h2>
<p>开源不会消掉编程代理的老问题。它会误解需求，会编不存在的 API，会顺手改到不该改的文件，也可能在错误的环境里跑出错误的命令。多服务商支持还带来另一份管理工作。每家都有自己的密钥、模型、配额、故障和数据条款。个人试用时够用的设置，进生产仓库往往太松。</p>
<p>想看真实摩擦，直接翻 <a href="https://github.com/anomalyco/opencode/issues" target="_blank" rel="noopener noreferrer">公开 GitHub 问题追踪页</a> 比看发布截图有用。里面能看到服务商接入、配置、不同平台和代理工作流的报告，也能看到维护者后续的回复和版本变化。这些报告不能代替你的测试，却很适合在上线前逐项排查。</p>
<p>OpenCode 适合熟悉终端、能管理模型账号、合并前会认真读 diff 的开发者和小团队。若团队需要一家公司包办模型采购与支持，或者敏感仓库还没确定服务商和权限政策，先别急着把它接进主流程。</p>

<h2>相关资料</h2>
<ul>
<li><a href="https://opencode.ai/docs/" target="_blank" rel="noopener noreferrer">OpenCode 官方文档</a>，安装、终端用法、桌面应用和 IDE 扩展</li>
<li><a href="https://opencode.ai/docs/providers/" target="_blank" rel="noopener noreferrer">服务商接入文档</a>，本地端点、凭证位置和自定义配置</li>
<li><a href="https://opencode.ai/docs/permissions/" target="_blank" rel="noopener noreferrer">权限文档</a>，动作确认与按路径设规则</li>
<li><a href="https://opencode.ai/docs/zen/" target="_blank" rel="noopener noreferrer">OpenCode Zen</a>，当前模型、token 价格、月度上限和隐私例外</li>
<li>可对照 <a href="/zh/listing/gemini-cli/">Gemini CLI</a>、<a href="/zh/listing/qwen-cli/">Qwen Code CLI</a> 和 <a href="/zh/listing/claude-code/">Claude Code</a>。想从更大范围开始，可看站内的<a href="/zh/best-free-ai-coding-tools-in-2026/">免费 AI 编程工具指南</a>。</li>
</ul>
