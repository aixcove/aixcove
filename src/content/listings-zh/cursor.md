---
title: Cursor
date: '2026-04-05T13:01:43'
modified: '2026-08-25T12:30:00'
slug: cursor
description: Cursor 是基于 VS Code 的 AI 代码编辑器，主打 Agent 模式、Tab 补全、云端代理与 Bugbot 代码审查。本文梳理其套餐价格、适用人群与真实限制。
categories:
- ai-coding
wpId: 202
image: /uploads/2026/04/cursor.jpg
featured: false
---
<h2>Cursor 是什么</h2>
<p>Cursor 是一个基于 VS Code 分叉构建的 AI 代码编辑器。原来的扩展、主题、快捷键基本都能保留，在此之上叠加自动补全、对话式编辑，以及能在整个代码仓库干活的编码 Agent。核心思路很直接：不再把报错复制到浏览器、再把修复代码贴回来，而是让 Agent 自己读仓库、改代码、跑测试、修掉引入的问题，全程不离开编辑器。</p>
<p>背后的公司 Anysphere 也在自研编码模型。为长时间 Agent 任务训练的 Composer 模型，如今与其他厂商的前沿模型并列在同一个套餐体系里。2023 年发布至今，Cursor 已经从尝鲜工具变成大量职业开发者的日常编辑器，也是新 AI 编程工具对标的尺子。</p>
<h2>实际能用到什么</h2>
<ul>
<li><strong>Tab 补全</strong>——根据你最近的修改、上下文代码和 linter 报错给出多行建议，预测的是下一步编辑，而不只是当前这一行。</li>
<li><strong>Agent 模式</strong>——多文件代理：先规划改动，再跨仓库编辑，执行终端命令，在自己出错时继续迭代直到任务完成。</li>
<li><strong>Composer 模型</strong>——Cursor 自研的编码模型，为长 Agent 会话优化、token 成本更低，免费版也能用。</li>
<li><strong>云端代理</strong>——在远端对着你的仓库运行，带团队共享上下文，可用 CLI 或手机 App 管理，合上笔记本也不中断。</li>
<li><strong>Bugbot</strong>——在新 Pull Request 上后台自动运行的 AI 代码审查。</li>
<li><strong>MCP、技能、钩子与市场</strong>——接入外部工具，定义项目规则，在团队内共享内部插件。</li>
<li><strong>VS Code 兼容</strong>——设置、扩展、主题一键导入，从 VS Code 迁移只要几分钟。</li>
</ul>
<h2>套餐与价格</h2>
<p>2026 年 8 月的按月原价如下：</p>
<ul>
<li><strong>Hobby——免费。</strong>无需信用卡，有受限的 Agent 请求数，包含 Composer 模型。</li>
<li><strong>Pro——每月 20 美元。</strong>更高的 Agent 限额、前沿模型访问、MCP、技能、钩子、云端代理，Bugbot 按用量计费。</li>
<li><strong>Pro+——每月 60 美元。</strong>Agent 限额是 Pro 的三倍，另含 Grok Bot，官方推荐给每天重度跑 Agent 的用户。</li>
<li><strong>Ultra——每月 200 美元。</strong>Agent 限额是 Pro 的二十倍，新功能优先体验，面向重度 Agent 用户。</li>
<li><strong>Teams——每用户每月 40 美元。</strong>统一计费与管理、SAML/OIDC SSO、团队级隐私模式、用量分析、共享上下文的云端代理和 Bugbot 审查。Premium 档把 Agent 限额提高到标准档的五倍。</li>
<li><strong>Enterprise——定制报价。</strong>增加用量池化、发票对公转账、SCIM 席位管理、审计日志，以及对仓库、模型和 MCP 服务器的访问控制。</li>
</ul>
<p>所有套餐都包含一定的模型用量额度，用完后按需用量仍可继续使用、事后结算，重度 Agent 会话的账单因此很容易超出标价。也支持按年付费。两点提醒：Cursor 调整套餐和限额的次数不少，当前价格以官方定价页为准；「学生免费一年 Pro」已不再提供，现在学生用免费 Hobby 版，优惠来自校园和线上活动。</p>
<h2>适合谁用</h2>
<p>Cursor 回报最快的场景是跨文件的重活：重构、框架迁移、接手陌生代码库，或者在不完全熟悉的技术栈里赶功能。整天跑 Agent 的开发者上 Pro+ 毫无压力；Ultra 只有在实测用量确实到了那个量级时才值得。团队统一使用时，共享规则、强制隐私模式和 Bugbot 的前置拦截能带来实际价值。</p>
<p>如果你只是在单文件里改几行补丁（更轻的补全工具更便宜）、工作流依赖某个 VS Code 扩展与上游完全一致，或者公司限制把代码发给第三方模型厂商，那它未必合适，下单前先读隐私模式和安全文档。</p>
<h2>需要知道的限制</h2>
<ul>
<li><strong>低档位限额卡得紧。</strong>Hobby 用来评估足够，认真跑 Agent 很快就会撞顶。</li>
<li><strong>成本跟着用量走。</strong>订阅买的是额度不是无限，20 美元的月份变成 60 美元，多半是按需超额。</li>
<li><strong>它是分叉，不是原版 VS Code。</strong>更新偶尔落后于上游，少数扩展会出问题。</li>
<li><strong>审查纪律不能省。</strong>Agent 产出的代码自信、合理、偶尔是错的。Bugbot 有帮助，但不能替代人读 diff。</li>
<li><strong>隐私模式默认不开。</strong>如代码绝不能用于训练，需在设置里开启或由管理员强制启用。</li>
</ul>
<h2>官方链接</h2>
<ul>
<li><a href="https://cursor.com" target="_blank" rel="nofollow noopener">Cursor 官网</a></li>
<li><a href="https://cursor.com/pricing" target="_blank" rel="nofollow noopener">当前套餐与价格</a></li>
<li><a href="https://cursor.com/docs" target="_blank" rel="nofollow noopener">官方文档（Tab、Agent、云端代理、Bugbot）</a></li>
</ul>
