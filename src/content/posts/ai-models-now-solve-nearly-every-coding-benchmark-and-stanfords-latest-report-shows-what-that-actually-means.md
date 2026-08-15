---
title: AI Coding Benchmarks Are Broken — Here&#8217;s What Stanford Found
date: '2026-04-16T00:02:09'
modified: '2026-08-11T19:14:57'
slug: ai-models-now-solve-nearly-every-coding-benchmark-and-stanfords-latest-report-shows-what-that-actually-means
description: AI models now ace nearly every coding benchmark, but Stanford&#8217;s latest report reveals why those scores don&#8217;t match real-world performance.
categories:
- ai-coding-development
featured: /uploads/2026/04/blog-hero-25.jpg
wpId: 585
titleZh: "斯坦福研究：AI编程基准测试存在重大缺陷"
descriptionZh: "AI模型在编码基准测试中近乎满分，但斯坦福最新报告揭示，这些高分为何无法反映真实世界中的实际表现。"
bodyZh: |
  <h2>AI模型解决几乎所有编程基准，斯坦福最新报告揭示真相</h2>
  <p>过去一年，AI编程基准测试出现了奇怪现象。作为自主软件工程的标准测试，SWE-bench Verified的性能从约60%提升到接近100%。仅用一年时间。这种跃升在成熟领域很少见，在任何领域都极为罕见。</p>
  <p>这一数据点来自斯坦福大学以人为本人工智能中心本周早些时候发布的2026年AI指数报告。这份第九版年度报告长达400多页，内容涵盖从计算能力到碳排放再到公众意见的方方面面。但编程基准数据尤为突出，因为它们表明"AI可以帮助编写代码"与"AI可以编写生产代码"之间的差距已基本消失。</p>
  <p>AI指数指导委员会联合主任Ray Perrault敦促人们在解释基准结果时保持谨慎。Perrault告诉IEEE Spectrum："我们通常缺乏衡量系统（或代理）在特定环境中需要达到何种功能水平的标准。"知道法律推理基准有75%的准确率，并不能告诉我们它在律师事务所的实际活动中表现如何。</p>
  <p>他说得对。基准测试是受控环境，而生产代码库则不是。但SWE-bench Verified的改进速度仍然值得关注，因为它追踪的内容比多项选择题式的琐事更接近实际工作。该测试要求模型解决来自流行开源仓库的实际GitHub问题。从60分到接近完美的十二个月进步，意味着模型在理解混乱的人工编写代码和找出问题所在方面有了显著提升。</p>
  <h2>人类的最后一门考试持续时间不长</h2>
  <p>编程基准测试并非唯一被碾压的测试。人类的最后一门考试是一个由专家提交的问题构建的基准，旨在代表各学科领域中最难的问题，情况类似。在2025年AI指数报告中，得分最高的模型（OpenAI的o1）仅正确回答了8.8%的问题。2026年报告将该数据提升至38.3%。截至2026年4月，如Anthropic的Claude Opus 4.6和Google的Gemini 3.1 Pro等模型已突破50%的门槛。</p><p>照这样下去，考试名称已经显得过时了。趋势很明显：每当研究人员构建一个旨在"最终"挑战AI模型的基准测试时，模型的追赶速度总是超出预期。</p>
  <h2>谁在构建这些模型</h2>
  <p>美国在原始模型输出方面仍然领先。Epoch AI追踪了2025年美国机构发布的50个"知名"模型。但与中国的差距已经缩小到两国在特定基准测试上多次交换领先地位的程度。2026年报告明确指出，美中模型差距实际上已经消失。</p>
  <p>一个没有改变的趋势是：现在几乎所有模型都来自产业界。Epoch AI记录了2025年公司发布的87个知名模型，而学术界和政府加起来只有7个。这超过了90%。2015年，比例大致相当。2003年，产业界模型为零。从大学实验室到企业产品团队的管道现在只朝一个方向运行。</p>
  <h2>数字背后的计算能力建设</h2>
  <p>这些进步都不是免费的。报告包含了EpochAI对全球AI计算能力的估计，以H100e等效单位衡量。自2022年以来，总量每年增长超过三倍。自2021年以来，增长了30倍。</p>
  <p>英伟达处于这个领域的顶端，其GPU占全球AI计算能力的60%以上。亚马逊和谷歌都在设计自己的AI芯片，分别占据第二和第三位。台积电周四即将公布的业绩预计将确认这家1.7万亿美元公司在制造推动这一扩张的芯片方面继续占据主导地位，尽管日本对Rapidus的160亿美元投资以及英特尔与埃隆·马斯克的合作表明，并非所有人都对台湾在先进芯片制造领域的控制感到舒适。</p>
  <h2>没人愿意精确量化的碳排放问题</h2>
  <p>这是令人不安的部分。根据斯坦福大学的报告，训练像xAI的Grok 4这样的前沿模型会产生估计72,000吨二氧化碳当量的排放。作为比较，GPT-4估计为5,184吨，Meta的Llama 3.1 405B为8,930吨。这一趋势并不微妙。</p><p>佩罗指出这些数据存在显著不确定性。"这些估计应谨慎解读。以Grok为例，它们严重依赖于从公开报道、xAI声明和其他无法验证的来源推断的输入，"他说。但他也指出，Epoch AI独立估计Grok 4的排放量约为140,000吨二氧化碳，几乎是该报告保守数字的两倍。</p>
  <p>不同模型的推理能耗差异巨大。DeepSeek的V3处理中等长度提示约消耗23瓦，而Claude 4 Opus使用约5瓦。效率最低的模型每次查询产生的碳足迹是最高效模型的十倍以上。随着部署规模扩大（报告显示88%的组织已采用），碳排放方程中的推理部分最终可能超过训练成本。</p>
  <h2>88%采用率实际意味着什么</h2>
  <p>报告发现，88%的受访组织以某种形式采用了AI工具，五分之四的大学生现在定期使用生成式AI。这些采用率是大多数技术需要数十年才能达到的数字。</p>
  <p>与此同时，中国在机器人部署方面遥遥领先世界。2024年，该国安装了295,000台工业机器人，而日本约为44,500台，美国约为34,200台。AI指数一直同时追踪软件和硬件，机器人数据是一个有用的提醒，"AI采用"根据您所看的国家和行业而有很大不同。</p>
  <p>美国还有另一个新兴问题：人才保留。2025年，已确定的AI作者和发明家中最大比例来自美国（220,520人），其次是印度（50,460人）和德国（48,520人）。但报告指出，尽管美国在AI研发上的支出超过其他国家，却"发现越来越难以吸引顶尖人才"。尽管拥有5万人的AI人才库，印度在净人才外流方面却位居世界首位。</p>
  <h2>所以呢</h2><p>2026年AI指数证实了该领域从业者早已察觉的情况：模型能力正在加速发展，在企业环境中已近乎普及，而环境成本的增长速度与基准测试指标不相上下。美国和中国模型性能之间的差距已经消失。编程基准测试已基本达到极限。人类的终极考试已通过一半。</p>
  <p>真正的问题不在于AI能否通过测试，而在于基础设施、电网和监管框架能否跟上模型在生产环境中现在能够做到的事情。根据这份报告，模型已经领先了。</p>
---

<h2>AI Models Now Solve Nearly Every Coding Benchmark, and Stanford&#8217;s Latest Report Shows What That Actually Means</h2>
<p>Something odd happened in AI coding benchmarks over the past year. Performance on SWE-bench Verified, the standard test for autonomous software engineering, went from roughly 60 percent to near 100 percent. One year. That kind of jump doesn&#8217;t happen in mature fields. It barely happens in anything.</p>
<p>This datapoint comes from the 2026 AI Index Report published by Stanford&#8217;s Human-Centered Artificial Intelligence center earlier this week. The ninth edition of the annual report spans over 400 pages and covers everything from compute capacity to carbon emissions to public opinion. But the coding benchmark numbers stand out, because they suggest the gap between &#8220;AI can help write code&#8221; and &#8220;AI can write production code&#8221; has basically closed.</p>
<p>Ray Perrault, co-director of the AI Index steering committee, urges caution when interpreting benchmark results. &#8220;We generally lack measures of how well a system (or agent) needs to function in a particular setting,&#8221; Perrault told IEEE Spectrum. &#8220;Knowing that a benchmark for legal reasoning has 75 percent accuracy tells us little about how well it would fit in a law practice&#8217;s activities.&#8221;</p>
<p>He&#8217;s right. A benchmark is a controlled environment. Production codebases are not. But the speed of improvement on SWE-bench Verified is still worth paying attention to, because it tracks something closer to real work than, say, multiple-choice trivia. The test asks models to resolve actual GitHub issues from popular open-source repositories. Going from 60 to near-perfect in twelve months means the models got substantially better at understanding messy, human-written code and figuring out what went wrong.</p>
<h2>Humanity&#8217;s Last Exam Isn&#8217;t Lasting Very Long</h2>
<p>The coding benchmark isn&#8217;t the only one getting crushed. Humanity&#8217;s Last Exam, a benchmark built from expert-submitted questions designed to represent the hardest problems across academic fields, tells a similar story. In the 2025 AI Index, the top-scoring model (OpenAI&#8217;s o1) answered just 8.8 percent of questions correctly. The 2026 report puts that figure at 38.3 percent. And as of April 2026, models like Anthropic&#8217;s Claude Opus 4.6 and Google&#8217;s Gemini 3.1 Pro have already crossed the 50 percent threshold.</p>
<p>At this rate, the exam&#8217;s name is aging poorly. The trend is clear: whenever researchers build a benchmark meant to &#8220;finally&#8221; challenge AI models, the models catch up faster than anyone expected.</p>
<h2>Who&#8217;s Building All These Models</h2>
<p>The United States still leads in raw model output. Epoch AI tracked 50 &#8220;notable&#8221; model releases from US-based organizations in 2025. But the gap with China has narrowed to the point where the two countries trade the lead on specific benchmarks multiple times within a single year. The 2026 report explicitly notes that the US-China model gap has effectively closed.</p>
<p>One trend that hasn&#8217;t changed: almost everything comes from industry now. Epoch AI logged 87 notable models from companies in 2025, compared to just seven from academia and government combined. That&#8217;s over 90 percent. In 2015, the split was roughly even. In 2003, it was zero industry models. The pipeline from university labs to corporate product teams is now running in one direction.</p>
<h2>The Compute Build-Out Behind the Numbers</h2>
<p>None of this progress is free. The report includes EpochAI&#8217;s estimate of global AI compute capacity, measured in H100e-equivalent units. The total has grown more than threefold every year since 2022. Since 2021, that&#8217;s a 30x increase.</p>
<p>Nvidia sits on top of this pile, with its GPUs accounting for over 60 percent of total AI compute capacity worldwide. Amazon and Google, both designing their own AI chips, occupy second and third place. TSMC&#8217;s upcoming earnings results on Thursday are expected to confirm the $1.7 trillion company&#8217;s continued dominance in manufacturing the chips powering this expansion, though Japan&#8217;s $16 billion bet on Rapidus and an Intel partnership with Elon Musk suggest not everyone is comfortable with Taiwan&#8217;s grip on advanced chipmaking.</p>
<h2>The Carbon Problem Nobody Wants to Quantify Precisely</h2>
<p>Here&#8217;s the uncomfortable part. Training a frontier model like xAI&#8217;s Grok 4 generates an estimated 72,000 tons of carbon-equivalent emissions, according to the Stanford report. For comparison, GPT-4 was estimated at 5,184 tons, and Meta&#8217;s Llama 3.1 405B came in at 8,930 tons. The trajectory is not subtle.</p>
<p>Perrault notes these figures carry significant uncertainty. &#8220;These estimates should be interpreted with caution. In the case of Grok, they rely heavily on inferred inputs drawn from public reporting, xAI statements, and other non-verifiable sources,&#8221; he says. But he also points out that Epoch AI independently estimated Grok 4&#8217;s emissions at roughly 140,000 tons of CO2, which is nearly double the report&#8217;s conservative figure.</p>
<p>Inference energy use varies wildly between models. DeepSeek&#8217;s V3 consumes around 23 watts per medium-length prompt, while Claude 4 Opus uses about 5 watts. The least efficient models produce over ten times the carbon per query compared to the most efficient ones. As deployment scales up (88 percent organizational adoption, per the report), the inference side of the carbon equation could end up dwarfing training costs.</p>
<h2>What 88 Percent Adoption Actually Looks Like</h2>
<p>The report found that 88 percent of organizations surveyed have adopted AI tools in some form, and four out of five university students now use generative AI regularly. Those are adoption numbers that most technologies take decades to reach.</p>
<p>China, meanwhile, leads the world in robotics deployment by a wide margin. The country installed 295,000 industrial robots in 2024, compared to roughly 44,500 in Japan and 34,200 in the United States. The AI Index has always tracked both software and hardware, and the robotics numbers are a useful reminder that &#8220;AI adoption&#8221; means very different things depending on which country and which industry you&#8217;re looking at.</p>
<p>The US has another emerging problem: talent retention. The largest share of identified AI authors and inventors came from the United States in 2025 (220,520 people), followed by India (50,460) and Germany (48,520). But the report notes that the US is &#8220;finding it harder to attract top talent&#8221; even as it outspends every other country on AI research and development. India, despite having a 50,000-strong AI talent pool, leads the world in net talent outflows.</p>
<h2>So What</h2>
<p>The 2026 AI Index confirms what anyone following the field already sensed: model capabilities are accelerating, adoption is near-universal in enterprise settings, and the environmental costs are scaling just as fast as the benchmarks. The gap between US and Chinese model performance is gone. Coding benchmarks are basically maxed out. Humanity&#8217;s Last Exam is halfway beaten.</p>
<p>The real question isn&#8217;t whether AI can pass tests. It&#8217;s whether the infrastructure, the energy grid, and the regulatory frameworks can keep up with what the models are now capable of doing in production. Based on this report, the models are ahead.</p>

