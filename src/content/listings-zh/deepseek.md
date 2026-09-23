---
title: DeepSeek
date: '2026-04-06T06:14:59'
modified: '2026-09-23T10:00:00'
slug: deepseek
description: DeepSeek 提供聊天、API 与开放权重模型，常用于推理、编程和成本敏感型实验。本文说明实际取舍、验证方式和部署时容易被低估的成本。
categories:
- llm-chat
wpId: 286
image: /uploads/2026/04/deepseek-1.jpg
featured: true
---
<h2>DeepSeek 是什么</h2>
<p>DeepSeek 提供聊天服务、开发者 API 和公开模型权重。需要中英文输出、推理或编程协作且在意 token 成本的团队，值得实测。不过网页和 App、按量计费的 API、下载权重自行运行，是三条不同的路线。能免费聊天不代表 API 免费，能下载权重也不代表部署没有成本。</p>
<p>开放权重不等于部署简单、数据天然私密或可以忽略许可证。大模型需要足够的加速卡显存、推理服务、监控和运维能力。托管 API 省掉这些工作，却仍有供应商可用性、数据处理、限流和地区合规等常规问题。</p>

<h2>适合做什么</h2>
<ul>
<li><strong>推理和编程协作</strong>拆解算法、解释陌生代码、生成测试思路、审阅补丁，以及处理结构化问题。</li>
<li><strong>成本敏感的 API 工作负载</strong>在聊天、信息抽取、分类或 Agent 步骤中，用兼容 OpenAI 格式的接口进行原型和压测。</li>
<li><strong>中文和多语言业务</strong>用真实术语、文档和语言组合测试，而不是只看综合榜单。</li>
<li><strong>研究与受控部署</strong>当团队具备硬件和运维条件，并确实需要更强的服务控制权时，评估 V3 或 R1 已发布权重。</li>
</ul>

<h2>API 价格与免费聊天</h2>
<p>DeepSeek 官方价格页按每 100 万 token 标价。2026 年 9 月核验时，<code>deepseek-flash</code> 对应 DeepSeek-V4.1-Flash，非高峰期缓存命中输入为 $0.003、缓存未命中输入为 $0.15、输出为 $0.60；高峰期分别为 $0.006、$0.30、$1.20。<code>deepseek-v4-pro</code> 对应 DeepSeek-V4-Pro-0813，非高峰期三项分别为 $0.022、$0.66、$1.98，高峰期为 $0.044、$1.32、$3.96。官方定义的高峰期是工作日 UTC 01:00-04:00 与 06:00-10:00，排除中国法定节假日。价格会调整，预算前应查看<a href="https://api-docs.deepseek.com/zh-cn/quick_start/pricing" target="_blank" rel="noopener noreferrer">官方价格页</a>。</p>
<p>个人使用方面，App 公告写明 App 可免费使用、无广告、无应用内购买；官方聊天网页是浏览器入口。这是消费端产品的免费口径，不是 API 赠送额度或服务等级承诺。登录要求、可用功能、容量、地区和使用限制都可能变化。API 则从充值余额或赠送余额中按实际 token 扣费。</p>

<h2>公开模型版本与许可证</h2>
<p>官方 GitHub 对不同版本的许可划分很清楚。<a href="https://github.com/deepseek-ai/DeepSeek-V3" target="_blank" rel="noopener noreferrer">DeepSeek-V3</a> 发布 V3-Base 与 V3 权重，仓库代码使用 MIT；Base 和 Chat 模型权重则适用独立的 DeepSeek Model License，官方说明支持商业使用。该模型许可证包含按用途限制，因此更准确的说法是“公开发布或开放权重”，不能把它直接等同于毫无限制的宽松开源许可证。</p>
<p><a href="https://github.com/deepseek-ai/DeepSeek-R1" target="_blank" rel="noopener noreferrer">DeepSeek-R1</a> 发布 R1-Zero、R1，以及 1.5B、7B、8B、14B、32B、70B 蒸馏检查点。仓库说明其代码和模型权重均为 MIT，允许商业使用、修改、衍生和用于训练其他模型的蒸馏。不过 Qwen 系蒸馏模型源自 Apache 2.0 的 Qwen2.5，8B 和 70B 的 Llama 系蒸馏模型仍受各自 Llama 许可证约束。分发或商用服务前，应逐个检查所下载检查点的许可。</p>

<h2>能力定位与取舍</h2>
<p>低价格并不自动等于最适合。应把 DeepSeek 与 <a href="/zh/listing/claude/">Claude</a>、<a href="/zh/listing/chatgpt/">ChatGPT</a>、<a href="/zh/listing/kimi/">Kimi</a> 放到同一批真实任务中比较。以较低的 token 单价看，它适合高量推理、编程、抽取和双语实验。同价位或更高价位模型，可能在工具生态、企业管控、支持安排，或你的长文档和工具调用测试上更合适。</p>
<p>换模型前准备一组小型评测题：一道难题、一道答案已知的题、一个长上下文任务、一次 JSON 或工具调用，以及一个需要拒答的敏感请求。记录 token 成本、延迟、重试率、结构化输出错误和人工改动时间。编程任务先要计划和测试，再要求补丁；生产部署仍要经过 CI 与人工审查。自托管先从小范围配置和并发限制开始。</p>

<h2>谁适合用 DeepSeek</h2>
<p>它适合会做基准评测、有一定 token 量、希望使用经济型兼容 API 的开发者与产品团队，也适合中文或双语团队和具备自托管条件的研究组织。它不适合作为无需核对的唯一事实来源，也不能替代安全审查。个人可先在免费聊天界面判断任务匹配度，再用限额 API 验证质量和成本。</p>

<h2>相关资料</h2>
<ul>
<li><a href="https://api-docs.deepseek.com/zh-cn/quick_start/pricing" target="_blank" rel="noopener noreferrer">DeepSeek API 模型与价格</a></li>
<li><a href="https://api-docs.deepseek.com/news/news250115/" target="_blank" rel="noopener noreferrer">DeepSeek App 官方公告</a></li>
<li><a href="https://github.com/deepseek-ai/DeepSeek-V3" target="_blank" rel="noopener noreferrer">DeepSeek-V3 仓库与模型许可证</a></li>
<li><a href="https://github.com/deepseek-ai/DeepSeek-R1" target="_blank" rel="noopener noreferrer">DeepSeek-R1 仓库、检查点与许可证</a></li>
</ul>
