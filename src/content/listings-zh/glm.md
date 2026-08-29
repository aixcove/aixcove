---
title: GLM
date: '2026-04-05T10:24:34'
modified: '2026-08-29T11:00:00'
slug: glm
description: GLM 是智谱 Z.ai 的开源权重模型家族，GLM-5.3 主打编程智能体。已核实 2026 年 8 月 API 定价、编程套餐积分、限制与适用人群。
categories:
- llm-chat
wpId: 188
image: /uploads/2026/04/glm.jpg
featured: false
author: AIX Cove 出品
source: 官方文档与定价页、标注的实测。2026 年 8 月核实。
reviewed: AIX Cove
---
<h2>GLM 是什么</h2>
<p>GLM 是智谱（Z.ai）的模型家族。这家公司的做法有点特别，旗舰模型直接把权重放到 Hugging Face 上，许可接近 MIT，同时又卖托管服务。2026 年 8 月底发布的 GLM-5.3 是当前旗舰，两件事同时做，权重开源，模型本身冲着编程智能体去，官方点名支持 Claude Code、Cline、OpenCode 这些客户端。</p>
<p>普通用户接触 GLM 有三条路。chat.z.ai 上的网页对话，注册就能用，不花钱也能试。开放平台 API 按 token 计费，适合自己做应用的团队。还有一个月付 18 美元起的 GLM Coding Plan，把旗舰模型打包给编程智能体用。三条路背后是同一批模型，差别主要在计费方式。</p>
<p>先把"开源"这个词落到实处。GLM-5.3 是一个总参数约 753B 的混合专家模型，发布时就带 FP8 量化。自己跑它，意味着多卡 GPU 服务器，或者走 vLLM、SGLang 这类推理框架（官方都支持）。对多数个人开发者，API 和编程套餐的性价比会明显更好。</p>
<h2>GLM-5.3 实际表现如何</h2>
<p>按官方文档的说法，GLM-5.3 和 GLM-5.2 用同一个底座，提升全部来自后训练，官方内部基准 Z.ai Code Bench 上提高了 50%。公开基准方面，模型卡列出的数字包括 Terminal-Bench 3.0 从 4.6 涨到 28.3，DeepSWE v1.1 从 46.2 到 66.9。这些是厂商自己报的数，当方向参考可以，别当结论。独立评测站 Artificial Analysis 给它的智能指数是 60，在收录模型里排在头部梯队，同时提到一个实际影响成本的细节，输出非常啰嗦，评测期间生成了 1.7 亿 token，速度约每秒 66.5 个输出 token，属于中等。</p>
<p>有一个能力值得单独说。智谱披露 GLM-5.3 在漏洞发现上提升异常快，ExploitBench 得分比 GLM-5.2 翻倍还多，还提到他们和国内安全团队合作，用这个模型在 269 个项目里找出 2436 个漏洞，结果放在公开的安全披露台账里。同一份模型卡也承认，在漏洞利用链的更深处，分数仍落后于闭源前沿模型。做安全工作的人会同时看到这枚硬币的两面。</p>
<p>动手前该知道的技术边界。GLM-5.3 只收文本输入（视觉任务走 GLM-5.3-Flash 或 4.6V 系列），上下文窗口 1M token，最大输出 128K。推理不可关闭，只有 low、high、max 三档强度可选。老代码里如果把 thinking 参数设成 disabled，迁移时会直接报错，要先改成 enabled 加低档位。</p>
<h2>三条路分别怎么收费</h2>
<p>API 按每百万 token 计价，美元结算。GLM-5.3 输入 1.4 美元，缓存输入 0.26 美元，输出 4.4 美元。更快的 GLM-5.3-Flash 核实时正在打五折促销，输入 0.075 美元、输出 0.25 美元，促销到 2026 年 9 月 9 日截止。还有两个小模型 GLM-4.7-Flash 和 GLM-4.5-Flash，API 免费，适合当零成本的试验田。</p>
<p>编程套餐是编码用户的主要选择。最低 Lite 档月付 18 美元，往上有 Pro 和 Max。2026 年 7 月 30 日改版后按积分计费，有两层额度，5 小时滚动额度加每周额度，Lite 是 2000/10000，Pro 12000/60000，Max 28000/140000。GLM-5.3 每一万 token 输出扣 24 积分，输入扣 6.9 积分。非高峰时段半价，周末全天半价。官方估算 Lite 档一周约能跑 4800 万到 9700 万 token，具体看缓存命中和时段。两个容易踩的坑，套餐严格限定在官方支持的编码工具里用，拿订阅当通用 API 代理属于违反使用政策；另外请求里写旧模型名（比如 GLM-5.2）会被自动路由到 GLM-5.3。</p>
<p>自部署在许可层面几乎对所有人免费。只有当你的关联集团做模型即服务生意、且 12 个月收入超过 100 亿美元，才需要通过智谱的安全审查。个人、创业公司和多数企业不受限制。</p>
<h2>接进编程智能体的典型流程</h2>
<p>常见路径是这样。订阅一个套餐档位，生成 API key，然后把工具指向三个端点之一。Claude Code 这类 Anthropic 协议客户端用 <code>https://api.z.ai/api/anthropic</code>，Codex 风格的 OpenAI Responses 工具用 <code>https://api.z.ai/api/v1</code>，Cline 这类 OpenAI Chat Completions 客户端用 <code>https://api.z.ai/api/coding/paas/v4</code>。以 Claude Code 为例，改 <code>~/.claude/settings.json</code> 里的 base URL、模型名和 key，再发一条测试消息确认模型真的切换过来了。</p>
<p>智谱自己的最佳实践文档值得一读，因为它和模型的实际脾气对得上。给智能体完整的任务上下文，包括文件、约束和验证命令；复杂任务先要计划再动代码；长期的项目规则写进项目级配置文件，别在每条提示词里重复；执行环境（权限、可用工具）决定智能体能走多远。用过 Claude Code 的人对这套流程应该不陌生。</p>
<h2>几条实用技巧</h2>
<ul>
<li><strong>按任务调推理档位。</strong>GLM-5.3 默认 max 档，扎实但费 token。API 调用时，简单修改把 reasoning_effort 参数设为 low，规模一大省的是真金白银，max 留给跨文件重构和难缠的调试。</li>
<li><strong>吃满非高峰半价。</strong>高峰时段只有工作日下午 2 点到 6 点（新加坡时间）。欧洲和美洲的用户，工作时间大部分天然落在半价区，等于每周额度翻倍。中文用户注意周末全天半价，大重构攒到周六跑。</li>
<li><strong>拿免费 Flash 模型当金丝雀。</strong>先用免费的 GLM-4.7-Flash 把工具调用和结构化输出调通，再换模型名。集成 bug 和模型问题就此分开，成本为零。</li>
<li><strong>盯住啰嗦问题。</strong>独立测试发现它的输出量远超中位数。智能体里设好 <code>max_tokens</code> 上限，用套餐时按输出 24 倍、输入 6.9 倍的权重预估积分消耗，别按 token 数直接线性估。</li>
<li><strong>迁移旧提示词按顺序来。</strong>GLM-4.x 时代的代码若禁用了思考，先改成 enabled 加 low，再换模型 ID，顺序反了请求会中途报错。</li>
</ul>
<h2>限制与风险</h2>
<p>编程套餐当不了通用 API。使用政策把订阅限定在支持的编码工具里，想给自己的应用接裸模型端点，预算要走按量付费的 API。Anthropic 协议端点还有个文档里写明的限制，目前有订阅（含已过期）的用户只能通过 OpenAI Chat Completions 兼容协议访问模型 API。</p>
<p>自部署旗舰对多数团队不现实，753B 参数的 MoE 模型即便 FP8 也要相当可观的 GPU。想本地跑，小一些的开源版本（如 GLM-4.5-Air）更实际。数据处理的条款因接入方式而异，团队版文档写明代码和对话默认不用于训练，但把专有代码发往任何托管端点前，先核一遍当期条款。</p>
<p>最后，这个领域基准成绩的保鲜期以周计。GLM-5.3 的竞争力是真实的，但也刚刚发布，价格带着促销，智谱 2026 年内已经改过一次订阅规则。按季度做预算前，重新看一眼定价页。</p>
<h2>公开讨论怎么说</h2>
<p>GLM-5.3 的反响在一个开源模型身上算少见地热烈。发布公告在 Hacker News 拿了 1100 多分、几百条评论，权重上传本身又单独上了一次首页。独立对比流传的结论是它以五分之一的价格追平或超过闭源模型，一篇被广泛转发的文章记录了作者花 266 美元、换着用四个模型给平板折腾 root，最后 GLM-5.3 一天收尾。社区里的谨慎声音集中在几处，厂商自选基准的口径问题，啰嗦导致实际成本高于预期，以及老生常谈的开源部署负担。也有人担心需求上来后价格优势撑不了多久。这些是体验和观点，不是测量，但方向一致，能力硬，眼下确实便宜，细节自己核。</p>
<h2>谁适合用 GLM</h2>
<p>想用零头价格买到接近闭源旗舰编程能力的开发者，是最明显的受益者，尤其是 Claude Code 用户，改一行配置就能把账单砍下来。中文和双语产品也合适，这个家族在中英文上都有原生强度。预算紧的团队可以先用免费 Flash 模型做原型，再升级到积分套餐。不太合适的情形也有，旗舰层需要视觉加文本一起干的，需要自部署和托管版本行为完全一致的，想要一个能顺便当通用 API 用的订阅的。这些情况看 <a href="/zh/listing/claude/">Claude</a>、<a href="/zh/listing/codex/">OpenAI Codex</a> 或全托管的 <a href="/zh/listing/github-copilot/">GitHub Copilot</a> 更稳。</p>
<h2>GLM 与替代方案</h2>
<p>开源阵营里最直接的对比是 <a href="/zh/listing/deepseek/">DeepSeek</a> 和 <a href="/zh/listing/qwen/">Qwen</a>，两家同样放权重也卖托管，DeepSeek 偏推理，Qwen 覆盖的模型尺寸更全。对托管智能体，GLM 的优势在价格和开放性，<a href="/zh/listing/kimi/">Kimi</a> 和 <a href="/zh/listing/gemini/">Gemini</a> 则在长文质量和生态深度上竞争。想看更大的盘子，可以读我们的<a href="/zh/best-free-ai-coding-tools-in-2026/">免费 AI 编程工具指南</a>和<a href="/zh/best-openai-codex-alternatives-in-2026-8-practical-picks/">Codex 替代品对比</a>。</p>
<h2>相关资料</h2>
<ul>
<li><a href="https://docs.z.ai/guides/llm/glm-5.3" target="_blank" rel="noopener noreferrer">GLM-5.3 官方模型文档</a></li>
<li><a href="https://docs.z.ai/guides/overview/pricing" target="_blank" rel="noopener noreferrer">Z.ai API 定价页</a></li>
<li><a href="https://docs.z.ai/devpack/overview" target="_blank" rel="noopener noreferrer">GLM Coding Plan 套餐与积分说明</a></li>
<li><a href="https://huggingface.co/zai-org/GLM-5.3" target="_blank" rel="noopener noreferrer">Hugging Face 上的 GLM-5.3 开源权重</a></li>
<li><a href="https://artificialanalysis.ai/models/glm-5-3" target="_blank" rel="noopener noreferrer">Artificial Analysis 独立评测</a></li>
<li><a href="https://z.ai/blog/glm-5.3" target="_blank" rel="noopener noreferrer">智谱 GLM-5.3 发布公告</a></li>
</ul>
