---
title: AlphaSense
date: '2026-04-06T06:12:28'
modified: '2026-09-03T10:30:00'
slug: alphasense
description: AlphaSense 是机构级市场情报搜索平台，官方域名是 alpha-sense.com。讲清 Tegus 专家库、双套餐结构、无公开定价的询价流程、安全认证与真实限制。
categories:
- vertical-ai
wpId: 266
image: /uploads/2026/04/alpha_sense.jpg
featured: false
author: AIX Cove 出品
source: 官方文档与定价页、标注的实测。2026 年 9 月核实。
reviewed: AIX Cove
---
<h2>AlphaSense 是什么</h2>
<p>AlphaSense 是面向机构客户的市场情报搜索平台，2011 年由前摩根士丹利投行分析师 Jack Kokko 和工程师 Raj Neervannan 创立。创始人在投行做研究时吃过人工翻文件的苦，产品最初就是把监管文件、电话会纪要和研报做成可检索的库，再用搜索和 AI 把相关片段找出来。现在官方把内容库规模称为五亿多份文档，来源包括 SEC 与全球监管文件、电话会纪要、来自一千多家券商与独立机构的研报、行业媒体、生命科学内容，以及 Tegus 专家访谈转录库。Tegus 原本是独立的专家网络公司，后来并入 AlphaSense，公司 about 页列出的收购还包括 BamSEC、Canalyst 和 Sentieo，几次收购基本把文件、财务模型和专家网络这几块拼齐了。</p>
<p>这里有个容易踩的坑要提前说。alphasense.com 这个域名属于英国埃塞克斯郡一家做气体传感器的工厂，和金融研究毫无关系。这个平台的官网是 alpha-sense.com，带连字符。搜索时认准域名，不然发出去的询价邮件会落到一家传感器公司手里。</p>
<p>公司自己在定价页 FAQ 里给出的数字是七千多家企业客户，覆盖九成 S&P 100 公司、九成头部投行和九成五头部咨询公司。这些是厂商自述，没有第三方审计，但与它销售主导的商业模式是自洽的。个人用户基本不在它的目标名单里。</p>
<h2>核心能力</h2>
<p>平台的几块功能，按研究流程的先后顺序讲比较清楚。</p>
<p><strong>生成式搜索与句级引用。</strong>搜索跑在文档库和你接入的内部文档之上，返回带摘要的答案。官方强调输出带句级引用，可以点回原文位置。这个设计确实比只给结论的工具好核查，但引用只能证明出处存在，转述本身仍可能带偏差，重要结论要点回原文读上下文。</p>
<p><strong>Deep Research 与工作报告。</strong>Deep Research 会按一个研究问题自动跑多轮检索，生成带引用的简报。配套的 PowerPoint 和 Excel 插件能把检索结果直接落成公司格式的幻灯片和财务模型表格，官方宣称每处输出都可回溯来源。</p>
<p><strong>监测与 Workflow Agents。</strong>监控功能让你对特定公司、行业和主题设提醒，文件和电话会一有更新就推送。新一些的 Workflow Agents 可以把检索、汇总这类重复动作做成定时任务，把手动拉信息改成系统推信息。官网还有一款叫 SuperAnalyst 的全天候代理，我们核实时页面标注为即将推出，采购前应向销售确认实际可用性。</p>
<p><strong>Enterprise Intelligence。</strong>这是贵一档的用法，把公司共享盘里的备忘录、会议纪要和幻灯片接进平台，与外部文档库一起检索。安全上有 BYOK 和 BYOB 两种模式，后者让文档留在你自己的 AWS 环境里，平台还支持把原有文档权限镜像过来。</p>
<p><strong>专家通话。</strong>通过 Tegus 的网络约一对一专家电话，附带转录、翻译和合规门户。官方称价格比传统专家网络最多省七成，这是厂商说法，实际成本要按你的通话量谈。</p>
<h2>定价与获取方式</h2>
<p>AlphaSense 没有公开价格，全部走年度订阅和销售询价，定价页 FAQ 明确说要安排团队成员与你谈。官网有两档主产品。Market Intelligence 包含外部文档库、AI 检索、24/7 客服和培训。Enterprise Intelligence 在此之上增加内部文档检索、私有云托管、API 上传、IT 支持和定制培训。专家通话和 Canalyst 财务模型作为附加项单独计费。官网挂着标注免费试用的入口按钮，但别指望自助下单，等待你的仍然是一场销售对话。</p>
<p>这样的定价结构决定了它的客户画像。按席位买的小团队要算清楚人均使用频率，一个季度用不了几次的团队很难摊薄成本。</p>
<h2>一个典型工作流</h2>
<p>以一级市场尽调为例。分析师拿到一家标的，先在 AlphaSense 里搜公司名和竞争对手，扫一遍近几年的监管文件、电话会纪要和研报摘要，用句级引用定位到管理层对增长和毛利的原话。接着把行业关键词设成监测，尽调期间任何新文件进来自动推送。需要一线信息时，通过 Tegus 约两三个业内专家通话，转录当天回到平台里变成可检索材料。最后用 Excel 插件把 comps 表拉出来，直接在模型里改假设。整个过程里，平台负责把材料找齐并给出来源位置，判断留给人。</p>
<h2>几条实用做法</h2>
<ul>
<li><strong>项目开始前先设监测。</strong>检索是拉，监测是推。尽调或竞品跟踪开始时就把公司名、产品名和高管名设成提醒，一周后你会收到一串有组织的更新，省掉反复手动搜索。</li>
<li><strong>养成点回原文的习惯。</strong>句级引用是平台最值得用的设计。摘要说管理层指引乐观，点回电话会纪要看原句和上下文，确认没有丢掉限定条件，再写进你的备忘录。</li>
<li><strong>接入内部文档前先理权限。</strong>Enterprise Intelligence 会索引公司共享盘。接入之前先把共享盘里的旧权限清理一遍，否则搜索结果可能把本该限制在小组内的备忘录暴露给全公司。权限镜像功能要实测确认行为符合预期。</li>
<li><strong>专家通话先过合规。</strong>约专家前确认你所在机构的信息墙政策，用平台自带的合规门户留痕，避免通话内容涉及未公开重大信息。</li>
<li><strong>把新功能写进合同。</strong>SuperAnalyst 这类标着即将推出的能力，采购时让销售白纸黑字写清交付时间，不要按宣传页的承诺做项目排期。</li>
</ul>
<h2>限制与风险</h2>
<p>价格与门槛是最直接的限制。没有公开定价、要和销售通话、按年订阅，这三件事把绝大多数个人研究者挡在门外。公开社区里能看到真实的抱怨。2024 年 3 月一条 Hacker News 讨论里，有独立创业者吐槽这类平台在报价前都要先通电话，对单人团队根本用不起。同帖里有两次融资经验的评论者回复，早期阶段用公开数据和一手访谈足够，这类工具更适合后期的管理咨询和战略团队。</p>
<p>输出质量方面，再好的引用机制也不能替代人工核对。AI 摘要可能把管理层带条件的话写成确定事实，跨文档比较可能混入口径不同的数字。平台把出处摆得很清楚，这是它的优点，也是它把核对的责任交还给使用者的方式。</p>
<p>数据治理要提前想。内部文档进平台意味着检索边界、离职员工访问和审计日志都要有安排。基础面是扎实的，定价页 FAQ 写明了 SOC 2 Type II 与 ISO/IEC 27001 认证、静态和传输加密，以及每个客户独立的加密存储环境。BYOB 模式能缓解剩下的担忧，代价是部署和运维复杂度上升。</p>
<h2>谁适合，谁不适合</h2>
<p>适合的是投行、私募、对冲基金、战投、咨询公司、企业战略与竞争情报团队，以及律所和保险公司里做行业研究的人。判断标准很简单，团队是否常年高频处理多来源的公司和行业材料，并且有预算为检索效率付费。</p>
<p>不适合个人投资者、学生和独立创业者。预算之外，这类工具解决的是规模化材料处理问题，单次课题研究用公开搜索加免费数据源更划算。想要便宜的通用答案引擎，可以看站内的 Perplexity 介绍。想在自有数据上自建检索流程，Dify 和 AnythingLLM 是另一条路线。专业领域的同类逻辑可参考 Harvey AI 与 Viz.ai 的介绍。</p>
<h2>相关资料</h2>
<ul>
<li><a href="https://www.alpha-sense.com/platform/" target="_blank" rel="noopener noreferrer">AlphaSense 平台官方介绍</a>（功能与产品线总览）</li>
<li><a href="https://www.alpha-sense.com/pricing/" target="_blank" rel="noopener noreferrer">AlphaSense 定价页</a>（套餐结构、FAQ 与安全说明）</li>
<li><a href="https://help.alpha-sense.com/hc/en-us/articles/41098563605395-Getting-Started-in-AlphaSense" target="_blank" rel="noopener noreferrer">官方入门指南与免费培训</a></li>
<li><a href="https://news.ycombinator.com/item?id=39675304" target="_blank" rel="noopener noreferrer">Hacker News 上关于市场研究工具门槛的讨论</a>（2024 年 3 月）</li>
<li>站内相关 <a href="/zh/listing/perplexity/">Perplexity</a>、<a href="/zh/listing/harvey-ai/">Harvey AI</a>、<a href="/zh/listing/dify/">Dify</a>、<a href="/zh/listing/anythingllm/">AnythingLLM</a></li>
</ul>
