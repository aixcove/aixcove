---
title: Claude Mythos是什么：发现27年OpenBSD漏洞
date: '2026-04-11T09:07:13'
modified: '2026-08-11T19:15:02'
slug: anthropics-claude-mythos-preview-finds-27-year-old-openbsd-bug-launches-100m-cybersecurity-coalition
description: Anthropic的Claude Mythos预览版发现存在27年的OpenBSD漏洞，并启动1亿美元网络安全联盟。2026年4月10日，Anthropic宣布了这一引发广泛关注的消息。
categories:
- ai-trends-news
featured: /uploads/2026/04/cover-528-1.jpg
wpId: 528
---
<h2>Anthropic <a href="/zh/listing/claude/">Claude</a> Mythos发现27年OpenBSD漏洞，推出1亿美元网络安全联盟</h2>
<p>2026年4月10日，Anthropic宣布了一项引起所有人关注的消息。基于名为Claude Mythos Preview的未发布模型构建的Project Glasswing项目，发现了一个在OpenBSD中隐藏了27年的安全漏洞。这个漏洞比一些审查代码的工程师年龄还大，经历了数百万次自动化扫描仍未被发现。然后Mythos Preview就...找到了它。这一公告改变了行业对AI安全性的看法。</p>
<h3>模型能力</h3>
<p>以下是模型实际完成的工作。它识别出了那个27年的OpenBSD漏洞。它还捕获了FFmpeg中一个16年的旧漏洞，自动化工具已经检查了五百万次却未能发现。然后模型将多个Linux内核漏洞串联起来，从普通用户权限提升到完全机器控制。这一切都没有人工干预。</p>
<p>数据说明了问题。Mythos Preview在CyberGym漏洞复现测试中得分83.1%。之前的模型Claude Opus 4.6得分为66.6%。在SWE-bench Verified测试中，新模型达到93.9%的准确率，而Opus为80.8%。这些不是渐进式的改进，而是飞跃性的提升。</p>
<h3>行业联盟</h3>
<p>合作伙伴名单包括AWS、Apple、Broadcom、Cisco、CrowdStrike、Google、JPMorganChase、Linux基金会、Microsoft、NVIDIA和Palo Alto Networks。共12家组织。让Apple、Google和Microsoft在同一间会议室讨论任何事项都不常见。让他们通过竞争对手的AI模型共享漏洞数据？这前所未有。</p>
<p>Anthropic在此投入了大量资金：1亿美元的使用额度，外加400万美元直接捐赠给开源安全组织。公司计划在90天内发布公开报告，详细说明发现的漏洞、已保护的系统以及安全实践建议。CrowdStrike首席技术官Elia Zaitsev直言不讳地说：漏洞发现与利用之间的差距已经从数月缩短到数分钟。</p>
<h3>战略背景</h3><p>这个时机很特别.就在此公告前几天，Anthropic切断了OpenClaw等第三方工具的Claude订阅访问.开源社区对此并不满意.然后是三月，用动荡来形容都显得轻描淡写.公司意外暴露了数千个内部文件和超过512,000行<a href="/zh/listing/claude-code/">Claude Code</a>源代码.现在他们一边清理自己的安全烂摊子，一边启动1亿美元的网络安全计划.这要么是远见卓识，要么是讽刺意味十足.可能两者兼有.</p>
<p>Anthropic不会将Mythos Preview公开发布.相反，他们正在为即将推出的Claude Opus版本开发保护措施.赌注很明确：在攻击者获得类似能力之前，让防御者先占一步.</p>
<h3>核心问题</h3>
<p>如果AI模型能比整个安全行业更快地发现关键漏洞，问题不在于是否应该使用AI进行防御.而在于防御者能否足够快速地组织起来，跟上即将拥有相同工具的攻击者.</p>
<p>Project Glasswing说明了双重使用问题.用于防御发现漏洞的同一模型也可以被用于攻击.限制访问经过审核的合作伙伴而非公开发布，是Anthropic在管理风险的同时仍能促进防御工作的尝试.</p>
<p>90天的报告将是第一次真正的考验.值得关注的数据包括：发现的漏洞数量、修复速度、建议的实用性.成功将验证Anthropic的协作方法.失败？那看起来就像是一份昂贵的新闻稿.</p>
<h3>接下来是什么</h3>
<p>AI能力持续进步，防御行动的时间窗口不断缩小.那个存在27年的OpenBSD漏洞在数十年的人工审查和自动化扫描中幸存下来.如果AI模型现在能在几小时内而不是几十年内发现此类漏洞，安全行业必须重组一切.时间线、实践、期望.</p>
<p>Project Glasswing可能是为应对这一新现实而建立基础设施和协调机制的首个严肃尝试.它是否有效仍是个开放问题.清楚的是，旧的安全方式已经不再有效.</p>
<p>如需逐工具对比，可查看<a href="/zh/listing-category/ai-coding/">AI编程工具清单</a>与<a href="/zh/category/ai-tools-comparisons/">对比评测栏目</a>。</p>
