---
title: QwenPaw评测2026：带记忆的开源本地AI助手
date: '2026-05-11T02:20:01'
modified: '2026-08-20T10:30:00'
slug: qwenpaw
description: QwenPaw 是带三层记忆、技能、本地模型与多渠道对话的免费开源个人 AI 助手。本文讲清适用场景、限制与上手要点。
categories:
- local-self-hosted
wpId: 784
image: /uploads/2026/07/qwenpaw-feature-picture.jpg
featured: false
---
<h2>QwenPaw 是什么</h2>
<p>QwenPaw 是阿里巴巴 AgentScope 团队做的开源个人 AI 助手，Apache-2.0 协议，免费。它可以装在自己机器上、云服务器上，或者直接用官方免费的 AgentScope 云平台。特点是可以接进钉钉、飞书、微信、Discord、Telegram、iMessage、QQ 这些聊天软件，有一套三层记忆，还能完全用本地模型跑，一个 API key 都不要。</p>
<p>写之前我翻了仓库 README、文档站、发布说明和讨论区，还看了一篇第三方安全测试。项目活跃度不用怀疑，GitHub 上大约 3.4 万个 star，2026 年 7 月 2.0 重写之后基本每月一个大版本。活跃的另一面是粗糙，open issue 超过 900 个，讨论区里能翻到不少真实抱怨。</p>
<h2>它能给你什么</h2>
<ul>
<li><strong>多渠道。</strong>一个实例同时服务钉钉、飞书、微信、Discord、Telegram、iMessage、QQ，网页控制台、全屏终端界面、桌面应用也能直接用。</li>
<li><strong>三层记忆。</strong>实时工作上下文、完整对话原文，以及一个会自我更新的个人知识库（ReMe），记忆全部存成可读、可改、可搜的 Markdown。</li>
<li><strong>技能和插件。</strong>定时、文档、浏览器、新闻、PDF 和 Office 处理都有现成技能，有插件市场，还能通过 MCP 接外部工具。</li>
<li><strong>本地或云端模型。</strong>为智能体任务专门训练的 QwenPaw-Flash 系列（2B、4B、9B）可以完全离线跑，Ollama、LM Studio 也能接，云端厂商支持 14 家以上。</li>
<li><strong>自动化。</strong>类 cron 的定时任务、多渠道群发、定时汇报，多智能体并行协作也有。</li>
<li><strong>四层安全。</strong>系统级沙箱、工具守卫、文件守卫、技能扫描器，危险命令在执行前就会被拦。</li>
</ul>
<p>2026 年 8 月的 2.1.0 又加了 OS Shell、统一的文件工作区、Creator 应用、浏览器和电脑操作、工作区检查点，还接入了 Codex 和 Qoder 智能体。产品方向每个月都在变，看官方发布说明最准。</p>
<h2>典型工作流</h2>
<p>安装路径很多，pip install qwenpaw、一键脚本、Docker 都行。装完跑 qwenpaw init --defaults 再 qwenpaw app，浏览器打开 http://127.0.0.1:8088/ 配置模型。云端厂商要 API key，本地模型什么都不用。</p>
<p>一个常见的第一个项目，接一个 Telegram 频道，订阅几个新闻源，设一个每天早上八点的定时任务把摘要整理好，顺手存进 ReMe 知识库。不写代码，二十分钟能跑起来。想完全离线，在设置里选 QwenPaw Local，下载一个 QwenPaw-Flash 模型，后面所有东西都在自己机器上。</p>
<h2>适合谁，不适合谁</h2>
<p>适合不想把个人数据放云端的人，适合主要活在钉钉、飞书、微信、QQ 里想就地用 AI 的人。想定时收摘要、自动汇报又懒得写代码，它也能干。模型想在本地和云端之间随意换，这套也方便。</p>
<p>不适合的情况。要的是有 SLA、有人管的商业部署，别选它。要开箱即用的成熟商业产品，也别选它，它还在快速变。企微这类渠道还在愿望清单上，图像理解也还没完全做好。想要一个更聚焦的自托管知识库，AnythingLLM 更对口，想要同类开源助手，OpenClaw 是最近的参照。</p>
<h2>上手技巧</h2>
<ul>
<li><strong>想完全离线就别配 API key。</strong>QwenPaw Local 加 QwenPaw-Flash，9B 模型做智能体任务比较均衡，2B 留给弱机器。</li>
<li><strong>Docker 里连本机 Ollama 有个坑。</strong>容器里的 localhost 是容器自己，启动时加 --add-host=host.docker.internal&#58;host-gateway，再把模型 Base URL 改成 http://host.docker.internal:11434，Linux 上也可以直接用 --network=host。</li>
<li><strong>三个卷分开挂。</strong>qwenpaw-data、qwenpaw-secrets、qwenpaw-backups 各挂一个卷，配置、密钥、备份互不混在一起，迁移也方便。</li>
<li><strong>安全开关别全关。</strong>工具守卫有 STRICT、SMART、AUTO、OFF 四档，文件守卫默认保护 ~/.qwenpaw.secret/ 和 ~/.ssh。装第三方技能前，让技能扫描器先扫一遍。</li>
<li><strong>终端里干活更快。</strong>qwenpaw . 会在当前仓库里开编码模式，/model、/clear、/resume 这些斜杠命令在智能体运行中也能用。</li>
<li><strong>卷要备份。</strong>qwenpaw uninstall 保留配置和数据，加 --purge 才全删。升大版本以后，从源码重编控制台前端，再强制刷新浏览器缓存。</li>
</ul>
<h2>限制和风险</h2>
<ul>
<li><strong>2.x 还很新。</strong>重写版 2026 年 7 月才发布，open issue 900 多个，讨论区里真实抱怨不少，界面卡住、编码过程没反应、AGENT_UNKNOWN_ERROR 报错、渠道缺这缺那都有。</li>
<li><strong>桌面应用还是 Beta。</strong>macOS 版没有公证，Gatekeeper 会拦一次，首次启动要等 10 到 60 秒，兼容性没测全。</li>
<li><strong>有遥测。</strong>qwenpaw init 时每个版本会上报一次匿名数据，版本号、安装方式、操作系统、Python 版本、架构、有没有 GPU，没有个人数据。交互式安装可以拒绝，--defaults 默认同意。</li>
<li><strong>安全是分层防御，不是铁桶。</strong>Towards AI 上有一篇独立测试，作者在 QwenPaw 的 18 个任务里埋了六次攻击，守卫拦下五次，第六次漏了过去。技能扫描器是真实存在的防线，但涉及自己文件时，还是把它当半可信角色对待。</li>
<li><strong>文档链接会失效。</strong>几次发布之间已经有一些文档页搬家或 404 了，链接打不开就看 GitHub 的 README，那是最稳定的索引。</li>
</ul>
<h2>价格和授权</h2>
<p>免费，Apache-2.0，没有用量限制。要花钱的地方是云端模型 API（或者一分不花用本地模型），以及跑大模型的硬件。官方 AgentScope 平台提供免费云部署，但把助手放上去等于把数据交给平台，隐私优先的用法就别走这条路。</p>
<h2>站内相关</h2>
<ul>
<li><a href="/zh/listing/openclaw/">OpenClaw</a>，同类开源个人智能体里最接近的参照</li>
<li><a href="/zh/listing/anythingllm/">AnythingLLM</a>，更聚焦的自托管知识库</li>
<li><a href="/zh/listing/dify/">Dify</a>，面向团队的自托管智能体和工作流平台</li>
<li>我们的 <a href="/zh/openclaw-review-2026-is-this-local-ai-assistant-worth-using/">OpenClaw 评测</a>和<a href="/zh/best-openclaw-alternatives-in-2026-7-picks-by-workflow-fit/">OpenClaw 替代品清单</a>覆盖同类选择</li>
<li>全部 <a href="/zh/listing-category/local-self-hosted/">自托管与本地 AI 工具</a></li>
</ul>
<h2>资料来源</h2>
<ul>
<li><a href="https://github.com/agentscope-ai/QwenPaw" rel="nofollow noopener" target="_blank">GitHub 仓库</a>，README、发布说明、安全文档都在这</li>
<li><a href="https://qwenpaw.agentscope.io/" rel="nofollow noopener" target="_blank">官网</a>和<a href="https://qwenpaw.agentscope.io/docs/quickstart" rel="nofollow noopener" target="_blank">快速上手</a></li>
<li><a href="https://github.com/agentscope-ai/QwenPaw/discussions" rel="nofollow noopener" target="_blank">GitHub Discussions</a></li>
<li><a href="https://pub.towardsai.net/i-planted-6-attacks-in-qwenpaws-18-tasks-its-guards-caught-5-and-" rel="nofollow noopener" target="_blank">Towards AI 安全测试文章</a>，独立第三方写的</li>
</ul>
