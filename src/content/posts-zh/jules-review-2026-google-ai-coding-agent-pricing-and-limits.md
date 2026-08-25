---
title: Jules评测 2026 谷歌异步编程代理的价格与额度
date: '2026-08-25T08:30:00'
slug: jules-review-2026-google-ai-coding-agent-pricing-and-limits
description: 基于官方文档的Jules评测。免费层每天15个任务怎么用、付费层挂在Google AI订阅下的真实门槛、适合谁、成本何时上升，以及它做不了的事。
categories:
- ai-tools-reviews
featured: /uploads/2026/08/jules-review-2026-google-ai-coding-agent-pricing-and-limits-hero.jpg
---
<h2>Jules评测 2026 谷歌异步编程代理的价格与额度</h2>
<p>先给判断。你手上有一批放在GitHub上的仓库，里面堆着懒得写的测试、一直没升的依赖版本、几个能一句话说清的小bug，Jules值得试。免费层每天15个任务，不绑卡，跑的是Gemini 2.5 Pro。反过来，你想要一个待在编辑器里陪你逐行改代码的助手，或者要给团队买一套带SSO和统一账单的工具，Jules现在都接不住。</p>
<p>这篇评测的事实部分来自Jules官方文档、额度页和谷歌自己的公告，核验日期是2026年8月25日。我还没找到对Jules大规模可靠性的独立审计，所以凡是谷歌自己的说法而非可核验事实的地方，文中都会标出来。</p>
<h2>Jules在做什么</h2>
<p>Jules是谷歌Labs的异步编程代理。流程是连接GitHub账号，选一个仓库和分支，写一段任务描述，然后Jules把仓库克隆进一台一次性的谷歌云虚拟机，装依赖，先给你看一份计划，你批准后它才动代码。跑完给你一份diff，你决定要不要据此建分支、开PR，还是直接扔掉。</p>
<p>你把它当成什么工具来用，比背功能清单重要。Cursor、Copilot、Aider这类工具是交互式的，你在循环里，一行一行、一条命令一条命令地迭代。Jules是移交式的。官方博客的说法是，你把任务交给它，人走开，回来看计划、推理和diff。这个差别几乎决定了后面每一节的结论。它适合维护型的活，不适合探索型的活。</p>
<p>产品至今挂着公测的牌子。2025年5月谷歌宣布对所有人开放，没有排队，Gemini模型可用的地区都能用。</p>
<h2>一个任务从头到尾怎么跑</h2>
<p>文档里的流程分五步，知道这五步，任务失败时你才知道该怪谁。</p>
<p>第一步选仓库。Jules只能碰你通过GitHub上的Google Labs Jules应用授权过的仓库，可以在GitHub设置的Applications里随时收权或扩大范围。</p>
<p>第二步建环境。每个任务起一台全新的Ubuntu虚拟机。文档把预装的东西列得很全。Node.js 22、Python 3.12加pytest和mypy、Go 1.24、Java 21、Rust 1.87、Docker 28，git、jq、ripgrep这些标准工具都有。简单项目Jules自己读你的readme或agents.md推断怎么装环境。复杂项目你写一段setup脚本，比如先npm install再npm run test，点Run and Snapshot验证，成功后存一份环境快照供复用。</p>
<p>第三步看计划。写代码之前，Jules先给一份自然语言计划，带步骤分解和它做的假设。你可以在对话框里让它改，也可以直接批准。有个细节要知道。你离开页面的话，Jules会在一个计时器到点后自动批准自己的计划。甩手任务这样很方便，但你本想否掉某一步就危险了，所以走之前把计划读完。</p>
<p>第四步执行。界面是活动流，每步带解释和单文件mini diff，也有完整的diff编辑器。中途可以发消息让它改方向、重新规划，或者整个暂停。</p>
<p>第五步收结果。Jules总结改了哪些文件、总耗时、增删行数，然后问你要不要建分支。分支归你，提交作者是Jules，PR要你自己去GitHub上开。另有定时任务功能，适合每周升依赖这类周期性维护。还可以给GitHub issue打上jules标签直接派活，Jules会在issue下评论，完成后贴出PR链接。</p>
<h2>价格和额度 别的评测容易含糊的部分</h2>
<p>下面是Jules额度页写明的结构，2026年8月25日核对。</p>
<p>免费层就叫Jules，每天15个任务，按滚动24小时计，3个并发，模型是Gemini 2.5 Pro。这一层没有列出需要信用卡。对独立维护者做日常分诊，15个任务够用。要是把每个小改动都当一个任务扔给它，很快见底，3个并发也意味着一个繁忙的下午任务得排队。</p>
<p>付费层不单独卖，绑在Google AI订阅里。Jules in Pro随Google AI Pro订阅发放，升到每天100个任务、15个并发，模型从Gemini 3 Pro起给更高权限。Jules in Ultra随Google AI Ultra，每天300个任务、60个并发，模型优先。谷歌的AI套餐页印证了同一梯度，把Jules的任务额度在Plus、Pro、Ultra各层分别标为有限、扩展、更高、最高。</p>
<p>有一条限制对团队很关键。谷歌文档写明，付费Jules计划目前只支持@gmail.com结尾的个人Google账号，Workspace和企业账号还升不了，官方让重度用户去填意向表。你的团队想走公司账单、上SSO和审计日志，这条路今天不存在，谷歌说在做。</p>
<p>两点诚实的提醒。谷歌自己的FAQ说套餐额度和功能可能随使用情况调整，这些数字是快照，不是合同。另外付费层挂在消费级Google AI订阅上，Jules的实际代价取决于这套订阅在你所在国家的定价，以及你还会不会用到订阅里别的东西。Jules自己的页面只列任务额度，不重述订阅价格。</p>
<h2>它擅长什么</h2>
<p><strong>边界清楚的杂活。</strong>官方给的例子是写测试、修bug、升依赖、做小功能，这恰好就是Jules出活的地方。谷歌自己的演示任务是升级next.js到v15并迁移到app目录。这种任务有明确边界，能用测试验证，跑在分支上安全。</p>
<p><strong>异步吞吐。</strong>任务跑在隔离的云虚拟机里，可以同时开几个，只受并发数限制。对一个积压了一堆旧依赖和挂科测试的维护者，免费层的三路并行已经比周五下午手动强。</p>
<p><strong>真环境，不靠猜。</strong>预装工具链很全，setup脚本能用Run and Snapshot先验证，文档连具体版本都列出来了。对比那些猜你的构建方式、一半概率失败的代理，你可以一次钉好环境反复用。</p>
<p><strong>流程透明。</strong>先计划后代码，diff审阅，中途可干预可暂停。谷歌还声明Jules不用私有仓库内容训练模型，数据隔离在执行环境内。这是谷歌自己的隐私承诺，我无法独立核验，但FAQ里写得明白。</p>
<h2>它不行的地方</h2>
<p><strong>没有交互式编辑。</strong>编辑器里没有Jules的位置。你的习惯是边写代码边跟模型对话，那这就不是你的产品。官方定位写的是替你干你不想干的编码任务，这话本身就划清了边界。</p>
<p><strong>跑不了常驻进程。</strong>FAQ写得很直白，npm run dev这类长驻命令和watch脚本在setup脚本里不支持，只能用离散的安装和测试命令。需要起dev server才能查的前端问题，整类都做不了。</p>
<p><strong>压力全在提示词上。</strong>文档坦承任务失败常见原因是setup脚本坏了或提示词含糊，还把fix everything和optimize code列为反面例子。你描述不清任务，Jules就替你烧掉15个额度里的一次。</p>
<p><strong>企业故事很薄。</strong>除了付费只认个人账号，集成目录目前只有Render一家，盯着失败的构建拉日志、往Jules自己的PR上推修复。方向有意思，目录还太早。</p>
<p><strong>公测的毛边。</strong>定时任务不能改只能删了重建。计划自动批准的计时器可能比你预期先动手。图片只能在创建任务时附，上限5MB，只收PNG和JPEG。</p>
<h2>安全这块怎么说</h2>
<p>Jules在带外网访问的云虚拟机里跑你的代码，官方FAQ让你像对待任何公共共享计算环境一样对待它。他们给的三条是，别往接进来的仓库里提交API key这类秘密，别依赖里有已知漏洞的版本，对第三方包和shell命令保持警惕。FAQ还有一句，跑的代码你自己负责。这个模型说得通，跟你对待CI的方式一致。如果你的仓库历史里提交过秘密，先清干净，再接任何代理，包括这一个。</p>
<h2>适合谁 不适合谁</h2>
<p>适合的情况。你是独立开发者或开源维护者，仓库在GitHub上，排着一队定义清楚的杂活，暂时不想为编程代理每月掏20到200美元。免费层每天15个任务是主流厂商里少见的大方，要的只有一个Google账号和GitHub授权。</p>
<p>不适合的情况。你要的是编辑器内助手。你的工作必须跑dev server。你要给团队采购，需要公司账单、SSO和审计。还有一种也先等等，你的任务没法用一句精确的话描述，因为含糊提示词是文档盖章的浪费额度头号原因。</p>
<h2>费用什么时候会上升</h2>
<p>三种情况。15个日常任务不够用了。3个并发堵住了你的工作流。你想要更新的模型，免费层锁死在Gemini 2.5 Pro，谷歌把新模型权限明确当付费差异点。到那一步，升级是一整套Google AI Pro或Ultra订阅，捆绑的是谷歌全家桶而不只是Jules。如果你只为Jules买这套订阅，账就不太算得过来。模型饥渴比任务数更容易把你推上付费台阶。</p>
<h2>可以对照看的替代方案</h2>
<p>想系统性看免费和低价的编程代理，读<a href="/zh/best-free-ai-coding-tools-in-2026/">2026免费AI编程工具指南</a>。终端交互式的开源选项，看<a href="/zh/aider-vs-cline-which-ai-coding-agent-fits-your-workflow-in-2026/">Aider和Cline对比</a>，这两个和Jules是互补关系。付费代理之间挑，<a href="/zh/best-claude-code-alternatives-in-2026-7-practical-picks/">Claude Code替代指南</a>里有Jules这一类，<a href="/zh/best-openai-codex-alternatives-in-2026-8-practical-picks/">OpenAI Codex替代指南</a>把Jules放在异步任务那一格里讨论得更细。</p>
<h2>结论</h2>
<p>Jules占住了一个具体的位置，而且站得住。异步、先计划、长在GitHub上，这套形态跟交互式助手确实是两回事。免费层能干真活，文档对失败方式和额度的坦白程度好过多数同类。短板是结构性的，不是修饰问题。编辑器里没有它，跑不了常驻进程，集成只有一家，付费还锁在个人账号的公测阶段。如果你一周里总有几件在GitHub仓库上一直拖着的杂活，挑一件用免费层跑一遍。这个测试不要钱，比任何评测都更能回答合不合适。</p>
<h2>已核验来源</h2>
<ul>
<li><a href="https://jules.google/docs/usage-limits/">Jules官方额度与套餐页</a>，核验日期2026年8月25日。</li>
<li><a href="https://jules.google/docs/faq/">Jules FAQ</a>，含公测状态、免费层、安全指引和常驻进程限制，核验日期2026年8月25日。</li>
<li><a href="https://jules.google/docs/environment/">Jules环境文档</a>，含预装工具链版本，核验日期2026年8月25日。</li>
<li><a href="https://jules.google/docs/running-tasks/">Jules任务运行指南</a>与<a href="https://jules.google/docs/cli/reference">Jules Tools命令行参考</a>，核验日期2026年8月25日。</li>
<li><a href="https://blog.google/technology/google-labs/jules/">谷歌官方博客Jules公测公告</a>，2025年5月20日。</li>
<li><a href="https://one.google.com/about/ai-premium">Google AI套餐页</a>，列出各层Jules额度，核验日期2026年8月25日。</li>
</ul>
<h2>常见问题</h2>
<h3>Jules免费吗</h3>
<p>基础层对全体用户开放，不收钱，每天15个任务、3个并发、Gemini 2.5 Pro。需要一个Google账号和GitHub授权，官方没有列出这一层需要信用卡。</p>
<h3>付费层多少钱</h3>
<p>Jules不直接卖订阅。Jules in Pro包含在Google AI Pro订阅里，Jules in Ultra包含在Google AI Ultra里。订阅价格因地区而异，在谷歌AI套餐页查你所在地的现价。如果只为Jules买订阅，先算这笔账。</p>
<h3>能用公司账号吗</h3>
<p>不行。按谷歌文档，付费计划目前只支持@gmail.com结尾的个人Google账号，企业和Workspace的升级通道还没有开。</p>
<h3>Jules会拿我的私有代码训练吗</h3>
<p>谷歌FAQ声明Jules不用私有仓库内容训练模型。这是谷歌自己的政策陈述，不是独立审计。</p>
<h3>能跑dev server吗</h3>
<p>不能。FAQ写明npm run dev这类长驻命令在setup脚本里不支持，改用离散的安装、构建、测试命令。</p>
