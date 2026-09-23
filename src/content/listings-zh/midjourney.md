---
title: Midjourney
date: '2026-04-06T06:10:32'
modified: '2026-09-23T10:00:00'
slug: midjourney
description: Midjourney 是付费图像生成服务，无免费层，每月 10 美元起。已核实 2026 年 8 月定价、功能与限制。
categories:
- ai-creative
wpId: 259
image: /uploads/2026/04/midjourney-1.jpg
featured: false
author: AIX Cove 出品
source: 官方文档与定价页、标注的实测。2026 年 8 月核实。
reviewed: AIX Cove
---
<h2>什么是Midjourney？</h2>
<p>Midjourney是一款付费AI图像生成服务，没有免费层。你用文字描述画面，它返回多张风格化图像，可继续做变体、放大或局部重绘。它最擅长情绪板、概念设计、编辑插画，以及先发散再收敛的视觉探索。</p>
<p>它不是精确排版工具。如果你需要精确的文字排版、特定logo或可复用的品牌模板，Midjourney会让你很吃力。把它当成快速产出候选的工具，精修交给专业设计软件。</p>
<h2>核心功能</h2>
<ul>
<li><strong>文字生成图像与图像参考</strong>：从零生成，或基于参考图迭代。</li>
<li><strong>变体、放大与比例控制</strong>：调整画幅或做变体，不必推倒重来。</li>
<li><strong>局部重绘</strong>：只重画局部，其余保持不变。</li>
<li><strong>风格与角色参考</strong>：用参考保持整套图风格或角色一致。</li>
<li><strong>配合其他工具</strong>：导出到 Canva、Photoshop 或 Figma 做最终加工。</li>
</ul>
<p>写明主体、设定比例、围绕顺手的提示词持续迭代，效果最好。整套图保留一个风格参考保证一致性，文字排版留给设计工具。</p>
<h2>订阅档位与GPU时长</h2>
<p>Midjourney<strong>没有常设免费层</strong>（仅在独立的 niji journey 手机App内提供有限试用），所有档位都是按月或按年自动续费的订阅。以下价格于2026年9月在官方方案页核实：</p>
<ul>
<li><strong>基础版 Basic</strong> $10/月（年付 $96，约 $8/月）：每月 3.3 小时 Fast GPU（约200张），不含 Relax 模式。</li>
<li><strong>标准版 Standard</strong> $30/月（年付 $288，$24/月）：15 小时 Fast GPU，加无限 Relax 出图。</li>
<li><strong>专业版 Pro</strong> $60/月（年付 $576，$48/月）：30 小时 Fast GPU、无限 Relax 图像与标清视频，含隐身模式。</li>
<li><strong>大型版 Mega</strong> $120/月（年付 $1152，$96/月）：60 小时 Fast GPU，并发任务上限最高。</li>
</ul>
<p>按年付约有20%折扣，额外 Fast 时间按每小时 $4 购买。年总收入超过100万美元的公司须订 Pro 或 Mega。奖励赠送的 Fast 时长30天后过期。</p>
<h2>网页版与Discord版差异</h2>
<p>一份订阅同时覆盖网页版和 Discord 机器人，两边跑同样的模型和参数。按官方对比文档：网页版有画布式整合编辑器（重混、局部重绘、平移、拉远、涂抹、重纹理）和带文件夹、批量操作、搜索的整理页；Discord 的价值在社区，公共频道、多人协作出图、表情回应快速操作。自定义后缀和选项集只能在 Discord 创建，但网页端可调用。新手从网页版入手，需要社区反馈再用 Discord。</p>
<h2>支付方式与退款政策</h2>
<p>Midjourney 通过 Stripe 处理付款，接受主要信用卡和借记卡（Visa、Mastercard、American Express），部分地区支持 Apple Pay、Google Pay、Amazon Pay、Alipay、Link 等钱包，<strong>不支持 PayPal</strong>。结账页显示什么就只有什么可用。</p>
<p>退款政策很严：账户累计 GPU 用量少于20分钟（含 Fast、Turbo 和 Relax）才有资格，取消订阅时会自动出现退款入口，处理最多10个工作日。因违规被封的账户不能退款。随时可在订阅管理页取消，取消后不再续扣。</p>
<h2>图像参数与模型版本</h2>
<p>参数追加在提示词末尾，双端通用。官方参数表核心项：<strong>--ar</strong> 控制画幅，<strong>--stylize</strong>（0到1000）控制风格化强度，<strong>--chaos</strong>（0到100）控制结果差异，<strong>--no</strong> 排除元素，<strong>--seed</strong> 复现对照，<strong>--raw</strong> 削弱默认美化，<strong>--sref</strong> 配 <strong>--sw</strong> 做风格参考，<strong>--iw</strong> 控制参考图权重，<strong>--tile</strong> 生成无缝图案。</p>
<p>当前默认模型是 <strong>V8.2</strong>，主打美学、画质与个性化，配 <strong>--hd</strong> 可输出2048px高清图。V8.x 用<strong>编辑模型</strong>（<strong>--edit</strong>）取代了旧的 Omni 和角色参考。旧版本可用 <strong>--v</strong> 指定，<strong>--niji</strong> 切换到动漫向模型。复用 V6 或 V7 的提示词前先查版本兼容表。</p>
<h2>谁适合、谁不适合</h2>
<p>适合：重视独特视觉探索、愿意每月付 $10 起的艺术总监、插画师和营销团队。持续使用者选 Standard（$30）性价比最好，Relax 无限量；对隐私有硬需求的团队直接预算 Pro。不适合：需要免费工具、可编辑矢量版式或精确文字渲染的人。把它当候选生成器，配合设计工具收尾。</p>
<h2>与DALL-E和Stable Diffusion的对比</h2><p>Midjourney 以艺术质量和独特美学著称，风格上往往比 DALL-E 更有视觉吸引力。DALL-E 擅长遵循精确指令和写实风格。Stable Diffusion 提供开源灵活性，支持本地部署。对优先追求输出质量且不想折腾配置的用户，Midjourney 仍是首选。</p>
