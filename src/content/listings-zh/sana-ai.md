---
title: Sana AI
date: '2026-04-06T06:12:45'
modified: '2026-09-05T00:00:00'
slug: sana-ai
description: Sana 是面向企业知识、会议和业务工具的 AI 平台，可搭建基于内部资料的 agent。这里说明它的当前套餐、权限边界、部署方法与限制。
categories:
- vertical-ai
wpId: 268
image: /uploads/2026/04/sana_aI.jpg
featured: false
author: AIX Cove 出品
source: Sana 官方产品、定价、帮助中心与安全资料，Workday 公告及 Apple App Store 页面。2026 年 9 月复核。
reviewed: AIX Cove
---
<h2>Sana 现在用来做什么</h2>
<p>Sana 是给企业团队使用的 AI 工作平台。它的产品页把重点放在几件事上，基于公司资料建立 agent，跨已连接的应用检索信息，分析材料，起草内容，并在授权范围内通过工具完成操作。Sana Agents 指的是 agent 和企业搜索这一部分。Sana Learn 则仍是一套独立的 AI 学习平台。采购前先把要买的是哪一项产品、合同覆盖哪些功能问清楚，后面的价格和集成讨论才有意义。</p>
<p>Workday 在 2025 年 9 月宣布收购 Sana，后续材料已把它称为 “Sana from Workday”。这会影响正在评估 HR、财务或 Microsoft 365 工作流的团队。它也没有改变一件很朴素的事，回答好不好，取决于资料本身、提问者能看的内容，以及 agent 的配置。工具能把查找和整理做快，不能替公司判断哪份政策仍然有效。</p>

<h2>先拿一个小流程试出来</h2>
<p>从一个已有负责人、经常重复出现的问题开始。负责入职的人可以先接入已批准的员工手册、福利政策、岗位说明和少量培训资料。让 agent 回答真实问题时附上文件链接或章节位置，再由负责人逐条对照原文。没有找到答案的提问、找错资料的回答，都记下来。先弄清问题出在来源、权限还是提问方式，再扩大资料范围或接入下一步操作。</p>
<p>Sana 帮助中心写明，搜索和助手只会使用该用户本来就有权访问的内容。这个边界很重要，部署时仍要自己复查。一个回答即使没有越权，也可能引用了旧文件，漏掉例外条件，或把员工不该自行处理的事说得过于简单。</p>

<h2>几条部署时真会用到的做法</h2>
<ul>
<li><strong>先锁定一类问题。</strong> 先做员工政策、销售准备或客服知识其中一项。三类内容一起接，答错以后很难判断问题来自检索、资料还是提示词。</li>
<li><strong>接入前清一遍资料。</strong> 标出唯一有效的政策，移走已废止的副本，为每份重要文件指定负责人。AI 把过期手册答得很通顺，结果还是错的。</li>
<li><strong>要求答案带出处。</strong> 对会影响决定的信息，要求写出文件名、章节或链接。让复核人能直接打开原文，别靠猜。</li>
<li><strong>按现有权限分组测试。</strong> 分别用新员工、经理、外包人员和管理员的身份搜索。正式接入敏感资料前，还要测试离职和转岗后的权限变化。</li>
<li><strong>前期把操作留给人确认。</strong> 搜索和摘要比发邮件、改记录、更新业务系统更容易检查。问题和答案稳定后，再逐步加入操作步骤。</li>
<li><strong>记下漏答和误答。</strong> 建一个小表，记录没出处的答案、漏掉的资料、权限问题和节省的时间。它比一场演示更能说明续费值不值。</li>
</ul>

<h2>套餐、数据和采购边界</h2>
<p>Sana 当前产品页列出 Free、Team 和 Enterprise 三档。Free 最多可有 5 名工作区成员，每月 10 场会议，单个集成最多 1,000 份文档，并提供常见的会议和知识库集成。Team 标价为每用户每月 30 美元，最多 50 名成员，列有无限查询和会议录制、更广的集成范围、模型选择、企业数据处理协议，以及每个集成最多 10,000 份文档。Enterprise 采用定制报价。产品功能和额度会变，实际采购应以 <a href="https://sanalabs.com/products/sana/" target="_blank" rel="noopener noreferrer">官方产品与套餐页</a>及书面报价为准，别拿旧报价继续算。</p>
<p>这张页面还列出 SAML 单点登录、SCIM、审计日志、区域部署、高级权限、SOC 2 Type 2、ISO 27001 和 GDPR 合规。Sana 的<a href="https://help.sana.ai/en/articles/153270-sana-s-security-and-infrastructure-setup" target="_blank" rel="noopener noreferrer">安全说明</a>给出了更多厂商材料。签约前仍要在合同里确认数据区域、保存和删除期限、模型训练约定、分包商、日志、管理员权限，以及本工作区真正启用的集成。帮助中心还有一个容易漏掉的细节。员工用公司邮箱自行注册的免费 Sana Agents 账户，数据控制权在该个人，不在公司。需要统一账号治理的组织，不能把一批个人免费账户当成企业账户来管。</p>

<h2>适合什么团队，也会卡在哪里</h2>
<p>资料有人维护、权限模型已经存在、重复知识工作很多，并且有人负责纠错的团队，比较适合认真试用 Sana。员工总要在会议纪要、政策文件、共享盘和业务应用之间来回找信息时，它有机会减少这部分时间。还需要课程制作、学习管理和学习路径的团队，可以一并评估 Sana Learn。</p>
<p>找不出权威资料、每个答案都必须有法律或监管效力、还没有测过权限和操作控制就想接入敏感系统的组织，不适合直接大范围上线。小团队可以用免费档先看匹配度。真要把数据、身份和业务操作接起来，后面的治理工作常常比聊天界面更费时间。</p>
<p>公开使用反馈目前不多，读的时候要收着一点。复核当日，Sana 的 <a href="https://apps.apple.com/us/app/sana/id1211652260" target="_blank" rel="noopener noreferrer">Apple App Store 页面</a>显示 4.6 分和 10 个评分，页面介绍了会议回顾、语音模式、文件搜索和切换自定义 agent。10 个评分说明不了多数企业的使用感受。它倒是给试点留了一个很实际的问题，移动端和会议功能能不能解决目标用户找资料的麻烦，还是只多了一个搜索入口。</p>

<h2>相关工具与资料</h2>
<ul>
<li><a href="https://sanalabs.com/products/sana/" target="_blank" rel="noopener noreferrer">Sana 产品、集成、安全声明与套餐</a></li>
<li><a href="https://help.sana.ai/en/articles/307312-sana-agents" target="_blank" rel="noopener noreferrer">Sana Agents 帮助中心说明与免费账户规则</a></li>
<li><a href="https://newsroom.workday.com/2026-05-13-Workday-Brings-Sana-Self-Service-Agent-for-HR-and-Finance-Into-Microsoft-365-Copilot" target="_blank" rel="noopener noreferrer">Workday 关于 Sana Self-Service Agent 接入 Microsoft 365 Copilot 的公告</a></li>
<li>通用工作区协作可看 <a href="/zh/listing/notion-ai/">Notion AI</a>。希望自行管理知识工作流可比较 <a href="/zh/listing/anythingllm/">AnythingLLM</a>。会议记录可看 <a href="/zh/listing/otter-ai/">Otter.ai</a>。</li>
</ul>
