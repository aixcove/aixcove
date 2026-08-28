---
title: Viz.ai
date: '2026-04-06T06:12:12'
modified: '2026-08-28T18:07:23+08:00'
slug: viz-ai
description: Viz.ai 把受监管的医学影像算法、医院提醒与团队协作接入同一流程。本文梳理产品线、典型部署、采购核验、合规边界与替代方案。
categories:
- vertical-ai
wpId: 265
image: /uploads/2026/04/viz_ai.jpg
featured: false
author: AIX Cove 出品
source: Viz.ai 官网与 Trust Center、FDA 公开数据库；2026 年 8 月核实。
reviewed: AIX Cove
---
<h2>Viz.ai 是什么？</h2>
<p>Viz.ai 是面向医院的临床 AI 与诊疗协作平台。它把医学影像算法、病例列表、提醒和团队沟通接到院内流程中，让指定临床人员更快看到需要复核的病例。平台不面向患者提供“AI 诊断”。厂商把 Viz One 定位为统一平台，并称产品组合拥有 50 多个获 FDA 许可的算法；这是厂商口径，不代表每个模块都适用于所有地区、患者或科室。</p>
<p>按申请人名称“Viz. Ai, Inc.”核对 FDA 公开记录，审阅时可查到 11 条 510(k) 或 De Novo 记录，从 2018 年 Viz CTP（K180161）到 2025 年 Viz Subdural+（K250354），其中 HCM 对应 DEN230003。许可约束的是记录中的具体设备、版本、适应证和标签，并非对整个平台作笼统背书。</p>
<h2>产品线与核心能力</h2>
<p>Viz One 承担影像接入、病例展示、告警、沟通和系统集成。临床产品按 Neuro、Vascular、Cardio、Pulmonary、Trauma、Oncology 划分，覆盖神经、血管、心脏、肺部、创伤与肿瘤场景；Viz Assist 用 AI 辅助查找和浏览临床信息。不同市场可售模块和批准用途可能不同，采购时要把合同里的产品名、版本与对应监管编号逐一匹配。</p>
<h2>典型医院工作流</h2>
<ol>
<li>检查进入已连接的影像系统，启用的算法读取符合条件的序列。</li>
<li>达到配置条件后，平台标记疑似发现，并按规则通知指定医生或团队。</li>
<li>临床人员查看原始影像、病史和其他检查，在院方认可的渠道协作并决定下一步。</li>
<li>管理人员持续检查送达、确认、升级和接口失败记录，纳入临床治理。</li>
</ol>
<p>这是一条分诊与协作链，不是自动诊断链。正式影像判读、临床判断和医院既有急救流程仍是依据。</p>
<h2>适合与不适合谁</h2>
<p>它更适合有 PACS/RIS/EHR 等基础设施、时间敏感病例量较大，并具备临床、信息安全、法务与采购团队的医院或影像网络。希望把检测、通知和多学科协作放到同一环境的机构可重点评估。个人自诊、通用看图、缺少兼容影像系统的小型诊所，或只想购买聊天机器人的团队，都不属于合适对象。</p>
<h2>采购前的实用核验</h2>
<ul>
<li><strong>逐项对标签</strong> 索要准确模块、软件版本、FDA 编号、预期用途、禁忌及扫描设备和序列要求。</li>
<li><strong>先做静默验证</strong> 用本院有代表性的历史病例或非打扰阶段测试，分别查看假阳性、假阴性、缺失检查和不同人群表现，再决定是否开启告警。</li>
<li><strong>演练提醒链</strong> 模拟夜班、交接、重复告警、断网和无人接听，明确升级责任人与停机预案。</li>
<li><strong>查接口与证据</strong> 确认 PACS、RIS、EHR 对接方式、延迟统计、审计导出、数据保留、模型更新控制，以及支撑该具体场景的证据。</li>
<li><strong>把边界写进合同</strong> 列清实施范围、服务水平、培训支持、数据用途、更新通知、续费和退出时的数据导出。</li>
</ul>
<h2>安全、价格与合规边界</h2>
<p><a href="https://trust.viz.ai/" target="_blank" rel="noopener noreferrer">Viz.ai Trust Center</a> 列出 SOC 2 Type II、HIPAA、GDPR，以及 ISO 27001、27701、27799、27017、27018。它们可作为尽调材料，但不能自动证明客户的实际配置合规；医院仍应索要当前报告及覆盖范围，完成自身隐私、安全和协议审查。</p>
<p>官网不公开价格，采用企业销售。报价应拆清模块、院区、检查量假设、接口、实施、支持和续约条件。算法表现会受本地人群、扫描协议、设备、版本与流程设计影响；告警疲劳、网络故障、序列缺失和过度依赖也是真实风险。任何提醒都不能代替合格医生复核，各功能只能在获准用途和院方政策内使用，更不能保证诊疗效果。</p>
<h2>替代方案与资料</h2>
<p>直接的临床影像候选包括 Aidoc、RapidAI；医院也可采用单病种工具，加上现有 PACS 与沟通系统。比较时应看批准适应证、本地验证、集成负担、升级机制和总成本，而不是只比算法数量。若想了解其他专业领域如何保留人工复核，可查看站内 <a href="/zh/listing/harvey-ai/">Harvey AI</a> 与 <a href="/zh/listing/alphasense/">AlphaSense</a>；它们不是医疗替代品。</p>
<ul>
<li><a href="https://www.viz.ai/" target="_blank" rel="noopener noreferrer">Viz.ai 官网</a></li>
<li><a href="https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm" target="_blank" rel="noopener noreferrer">FDA 510(k) 数据库</a>与 <a href="https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/denovo.cfm" target="_blank" rel="noopener noreferrer">FDA De Novo 数据库</a></li>
</ul>
