---
title: DeepSeek Harness 开源评测：一切皆插件的 Agent 框架
date: '2026-08-16T18:00:00'
slug: deepseek-harness-review-2026-everything-is-a-plugin
description: DeepSeek 在 2026 年 8 月开源了自研 Agent 框架 DeepSeek Harness（dsh）。本文实测其 Cordis 插件架构、四种运行模式、Web UI 使用流程、开发者预览期的限制与适合人群。
categories:
- ai-agents-automation
featured: /uploads/2026/08/deepseek-harness-review-hero.jpg
---
<h2>DeepSeek Harness 开源评测，一切皆插件到底改变了什么</h2>
<p>2026 年 8 月，DeepSeek 放出来的东西有点反常。这次上新的不是模型权重，是一个叫 <strong>DeepSeek Harness</strong> 的开源 Agent 框架，命令行名字是 <code>dsh</code>，MIT 许可证。仓库上线三天冲过十二万星，做 Agent 开发的人几乎都在同一时间刷到了它。</p>
<p>官方一句话介绍是“一切皆插件”。翻译成工程语言，模型适配、工具注册表、会话日志、沙箱，连 Agent 主循环本身，全都是 Cordis 插件，开机时组合加载，在配置层就能替换，不需要 fork 源码。这类口号在 Agent 框架圈出现过很多次，多数框架宣传模块化，内核里还是藏着一个不许动的核心。所以这篇评测把 dsh 拆开看，它实际能做什么，跑起来什么手感，粗糙边在哪里，谁现在就该上手。</p>

<h2>DeepSeek Harness 是什么，不是什么</h2>
<p>Dsh 不是模型，也不是按月收费的托管产品。它是夹在语言模型和你想完成的工作之间的那一层。DeepSeek 的提法是 <code>Agent = Model + Harness</code>，模型负责推理，Harness 负责让 Agent 理解环境、使用工具、在一次真实会话里持续干活。API key 你自己填，脚手架它来出。</p>
<p>定位这个项目，先记住三件事。第一，它是真开源，MIT 许可，源码完整放出。第二，它是 TypeScript 写的，底座是 <a href="https://github.com/cordiverse/cordis" target="_blank" rel="noopener noreferrer">Cordis</a>，一个专门研究可组合性的框架，设计思路单独写成了论文。第三，它现在明确处于开发者预览阶段，README 用大写字母写着会有破坏性变更。评估的人应该把这句话当真。</p>

<h2>架构，Cordis 内核与插件化能力</h2>
<p>结构上的事，看文档比看宣传更清楚。Cordis 内核只管插件的加载、卸载和依赖关系，自己不承载任何 Agent 能力。模型、工具、技能、会话、沙箱、存储、循环、调度、Web UI，每一项能力都由插件提供，通过 Cordis 的服务与事件彼此协作。没有特权核心可以打补丁，扩展 dsh 的方式是把你的插件挂到其他插件旁边，插件卸载时注册自动回收。</p>
<p>组合是按层顺序进行的。一个 <strong>profile</strong> 是存在 Harness 主目录里的命名组合，官方带 <code>web</code> 和 <code>headless</code> 两个模板。一个 <strong>bundle</strong> 是配置行和对应代码的分发格式。执行 <code>dsh --profile web --dump-config</code> 可以打印你机器实际启动的插件树，打印出来的任何一行都能用你自己的 patch 文件替换。担心框架折腾的团队，最值得精读的就是这一块。整个仓库最硬的资产是架构文档，不是演示视频。</p>

<h2>四种运行模式，差别比名字大</h2>
<p>Dsh 自带四个预设，区别值得逐个说清。</p>
<ul>
<li><strong>标准模式</strong>是功能完整的编码 Agent，支持文件编辑、Shell、文件与网页检索、Skills、计划、目标、子代理和工作流。</li>
<li><strong>PTC 模式</strong>保留标准模式的全部能力，但通过 Code Mode SDK 呈现工具，让模型把多步操作写成一个 TypeScript 程序，替代一长串单独的工具调用。</li>
<li><strong>极简模式</strong>只留一个持久 bash 和一个文件编辑器。官方定位是最小环境下的模型基准测试，这个细节顺带透露了 DeepSeek 自己怎么测模型。</li>
<li><strong>创造模式</strong>可以检查当前运行时、在内存中试验 Cordis 插件、组合出新的预设，面向造 Agent 的人，而不是用 Agent 的人。</li>
</ul>
<p>只想日常写代码，标准模式就是老实的默认选项。想在它上面做产品，创造模式加架构文档才是真正的卖点。</p>

<h2>实际跑起来，Web UI 的使用流程</h2>
<p>安装环节刻意做得无聊。装好 Node.js 后执行 <code>npx @deepseek-ai/dsh web</code>，浏览器打开 <code>http://127.0.0.1:3080</code> 就是 Web 界面。从源码跑则是常规的 pnpm 构建流程。首次使用有三步。先在 Settings、Models 里填入 DeepSeek API key。然后选择工作区目录，没选工作区之前会话编辑器是锁着的。之后开一个会话，Agent 就能读写工作区文件、执行命令、派发子任务、维护计划，遇到需要审批的操作，Web UI 会先询问再动手。</p>
<p>测试中最值得单独说的是会话日志。模型看到的一切都会写进只追加的日志，包括系统提示词、思维链、工具调用与结果、子代理调度，以及每一次上下文注入。Trajectory 视图可以按来源查看这些内容，恢复、分叉、检索与回放共用同一份事件流。项目还写了一条运行时不变量，凡是模型可见的内容都必须能从日志重建，并有断言在跑时校验。调试过“Agent 为什么这么干”的人都知道，一份完整记录模型所见所想的日志，是个实打实的调试原语，不是花架子。</p>

<h2>目前社区怎么说</h2>
<p>上线头几天的讨论分成了 predictable 的两派，得把信号和热闹分开。开发者称赞的是插件粒度、架构文档的水准，以及一家前沿实验室愿意放出基础设施而不是又一个推理接口。中文圈的报道集中在架构的开放性上。提醒的声音同样一致。开发者预览期版本间 API 会动，官方已经预告了破坏性变更，内置插件之外，社区插件生态才刚起步，GitHub 上用 <code>dsh-plugin</code> 话题做发现。这个季度就把生产负载押上去，是在承担真实的迁移成本风险，项目方自己也会这么告诉你。</p>

<h2>限制与风险清单</h2>
<ul>
<li><strong>预览期变更频繁。</strong> 破坏性变更是官方政策，不是意外。锁版本，预留迁移工作量。</li>
<li><strong>生态年轻。</strong> 内置插件可用性不错，第三方插件市场刚起步。</li>
<li><strong>审批策略要自己定。</strong> 一个能碰 Shell 和文件编辑的 Agent，权限姿态必须想清楚。先用一次性工作区试。</li>
<li><strong>Cordis 有学习成本。</strong> 写插件要理解 Cordis 的服务、事件和可逆效果，入门文档得留出阅读时间。</li>
<li><strong>依赖 Node.js 运行时。</strong> 主路径假定 Node 环境，技术栈不同的团队先确认 headless 路径是否合适。</li>
</ul>

<h2>谁现在该试，谁该再等等</h2>
<p>做 Agent 工具链、做框架选型、做编码 Agent 基准测试，或者想要一个事件日志可审查的自托管方案，现在就可以上手，极简模式本身就是一个干净的模型对比基座。需要稳定产品、支持合同、成熟插件市场或者多年 API 稳定性承诺的，再等等。这是给读架构文档的人准备的基础设施，项目方对此并不遮掩。</p>
<p>想了解它背后的公司，可以看站内的 <a href="/zh/listing/deepseek/">DeepSeek 词条</a>，框架本身见 <a href="/zh/listing/deepseek-harness/">DeepSeek Harness 词条</a>。对比其他 Agent 方案，<a href="/zh/listing/openclaw/">OpenClaw</a> 和 <a href="/zh/listing/claude-code/">Claude Code</a> 的词条覆盖了托管派和终端派的选择。</p>

<h2>资料来源</h2>
<ul>
<li><a href="https://www.deepseek.com/harness" target="_blank" rel="noopener noreferrer">DeepSeek Harness 官方页面（开发者预览版）</a></li>
<li><a href="https://github.com/deepseek-ai/deepseek-harness" target="_blank" rel="noopener noreferrer">GitHub 仓库 deepseek-ai/deepseek-harness（MIT，TypeScript）</a></li>
<li><a href="https://raw.githubusercontent.com/deepseek-ai/deepseek-harness/master/docs/architecture.md" target="_blank" rel="noopener noreferrer">dsh 架构文档</a></li>
<li><a href="https://api-docs.deepseek.com/" target="_blank" rel="noopener noreferrer">DeepSeek API 文档</a></li>
</ul>
