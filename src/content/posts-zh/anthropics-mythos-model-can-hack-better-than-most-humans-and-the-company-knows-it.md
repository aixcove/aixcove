---
title: Anthropic“Mythos”模型：黑客能力超人类，公司知情
date: '2026-04-07T00:40:34'
modified: '2026-08-11T19:15:07'
slug: anthropics-mythos-model-can-hack-better-than-most-humans-and-the-company-knows-it
description: 福布斯获取的内部草稿显示，Mythos的网络安全能力“远超其他任何AI模型”。Anthropic自己也清楚这意味着什么。
categories:
- ai-coding-development
featured: /uploads/2026/04/blog-hero-2.jpg
wpId: 509
---
<p class="wp-block-paragraph">《财富》杂志获得的一份Anthropic草稿博客文章称，该公司尚未发布的模型“Mythos”在“网络能力上目前远超任何其他AI模型”。文章警告说，Mythos“预示着一波即将到来的模型浪潮，它们利用漏洞的速度将远远超过防御方的努力。”</p>



<h2 class="wp-block-heading">Anthropic向政府官员透露了什么</h2>



<p class="wp-block-paragraph">据Axios三月下旬的报道，Anthropic一直在私下向高级政府官员简报Mythos及其在2026年全年增加大规模网络攻击可能性的潜力。对于一家谈论自家产品的公司来说，这些警告异常直接。</p>



<p class="wp-block-paragraph">OpenAI首席执行官Sam Altman在周一接受Axios联合创始人Mike Allen采访时，被问及今年是否可能发生“撼动世界的网络攻击”。他的回答并不令人安心。“我认为这完全有可能，是的，”Altman说。“要避免这种情况，需要付出巨大的努力。”</p>



<p class="wp-block-paragraph">OpenAI周一还发布了自己的政策蓝图，题为“智能时代的产业政策”，其中承认“随着AI系统变得更有能力并更深入地嵌入经济，它们可能在带来新富足的同时引入新的漏洞。”文件明确写道，“某些系统可能被滥用于网络或生物伤害。”</p>



<h2 class="wp-block-heading">AI如何改变攻击者的算盘</h2>



<p class="wp-block-paragraph">核心问题是速度。Anthropic、OpenAI、Google等公司的技术让攻击者识别计算机系统安全漏洞的速度，比一年前快得多。《纽约时报》4月6日发布的一篇报道详细说明了这些新系统如何改变网络安全中攻击者与防御者之间的基本动态。</p><p class="wp-block-paragraph">员工自身也在制造越来越多的攻击面。现在很多员工用Claude和Copilot这类工具搭建自定义AI代理，这些代理经常连接到公司内部基础设施。这些连接就成了网络犯罪分子可以探测的入口。一家公司部署的自主AI代理越多，可能被人撬锁的门就越多。</p>



<h2 class="wp-block-heading">上下文问题</h2>



<p class="wp-block-paragraph">安全界并非所有人都接受这种末日论调。安全公司Aikido发布了一份基于1000次真实AI渗透测试的分析，反驳了Mythos会自动让天平倒向攻击者的说法。</p>



<p class="wp-block-paragraph">他们的数据显示，AI在发现漏洞方面的效果很大程度上取决于上下文。在白盒测试中，AI能完全访问目标应用的源代码，系统发现的关键和高危问题数量是灰盒测试（访问受限）的七倍。限制不在模型本身的能力，而在于关于目标系统的信息。</p>



<p class="wp-block-paragraph">攻击者从外部行动。他们猜测系统细节，从观察到的行为推断架构，在防御者永远不必面对的盲区中工作。防御者已经拥有源代码、API凭据和内部业务逻辑。这种不对称比大多数头条新闻所暗示的更重要。</p>



<h2 class="wp-block-heading">Axios NPM事件</h2>



<p class="wp-block-paragraph">Aikido的分析将最近Axios NPM包被入侵的事件作为一个有启发性的例子。攻击者没有修改源代码。他们入侵了一个维护者账户，添加了一个新依赖，然后发布了一个更新。没有CVE匹配这次攻击。没有恶意代码模式触发扫描器。没有基于签名的工具捕捉到它，因为攻击中没有任何东西匹配已知模式。</p>



<p class="wp-block-paragraph">一个对其依赖树有深入可见性的组织，一个不仅了解自己使用了哪些包、还了解这些包的行为方式以及合法更新应该是什么样子的组织，会有理由质疑这一变更。没有这种上下文，再多的AI速度或能力也无济于事。工具是盲目的，因为理解是肤浅的。</p><h2 class="wp-block-heading">CISA以缩减能力运作</h2>



<p class="wp-block-paragraph">时机再糟糕不过了。网络安全和基础设施安全局（CISA），这个负责保护关键基础设施的联邦机构，因国土安全部部分停摆而受到削弱。代理局长Nick Andersen在3月25日众议院国土安全委员会听证会上表示，约60%的CISA员工已被强制休假或无法工作。</p>



<p class="wp-block-paragraph">“剩余人员正在无薪执行关键任务，同时面临来自针对我国关键基础设施的国家级和犯罪分子的日益增大的压力，”Andersen说。“这不是一个可持续的模式。”</p>



<h2 class="wp-block-heading">防御者仍占高地——目前如此</h2>



<p class="wp-block-paragraph">实际情况介于恐慌和自满之间。AI模型无疑会降低攻击成本并提高攻击速度。脚本小子级别的操作者将获得以前需要经验丰富的专业人员才能拥有的能力。钓鱼攻击将变得更令人信服。侦察将变得更快。</p>



<p class="wp-block-paragraph">但防御者拥有的结构性优势——直接访问自己的代码、日志和架构——是真实且持久的。问题在于组织是否会真正利用这一优势。大多数公司在基本安全卫生方面挣扎。未修补的系统、默认凭据和配置错误的云存储仍然是入侵的主要入口，而不是复杂的零日漏洞利用。</p>



<p class="wp-block-paragraph">Anthropic尚未公布Mythos的发布日期。该公司表示希望在推进之前完全了解该模型的短期网络安全风险。但发布的竞争压力巨大。Google、OpenAI和其他公司都在竞相达到相同的能力门槛。没有哪家公司能在竞争对手前进的同时无限期暂停。</p><p class="wp-block-paragraph">一个让人不舒服的事实是，Mythos本身不是问题所在。Mythos只是一个预演。各大实验室后续推出的模型，都会具备类似能力。现在还有时间窗口去构建跟得上攻击速度的防御体系，但这个窗口不会一直开着。CISA的人员编制只有四成，而前沿AI模型几秒钟就能学会找漏洞，这种速度差很快就会酿成非常糟糕的后果。</p>
