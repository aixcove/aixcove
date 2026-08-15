---
title: This AI Research Cuts Energy Use by 100x and Actually Gets Better Results
date: '2026-04-07T00:04:01'
modified: '2026-08-11T19:15:07'
slug: this-ai-research-cuts-energy-use-by-100x-and-actually-gets-better-results
description: 'AI is burning through electricity at a rate that should make anyone paying a power bill nervous. In 2024, AI systems and data centers in the US alone consumed roughly 415 terawatt hours. That is more '
categories:
- ai-agents-automation
featured: /uploads/2026/04/blog-hero.jpg
wpId: 506
titleZh: "DeepSeek AI研究：能耗降低100倍且效果更佳"
descriptionZh: "2024年美国AI系统和数据中心耗电约415太瓦时，电费账单让人心惊。AI耗电量激增，数据中心用电成关注焦点。"
bodyZh: |
  <p class="wp-block-paragraph">人工智能正在以惊人的速度消耗电力，任何需要交电费的人都该感到紧张。2024年，仅美国的人工智能系统和数据中心就消耗了约415太瓦时电力。根据国际能源署的数据，这占全美总发电量的10%以上，而到2030年，需求预计将翻一番。</p>
  
  
  
  <p class="wp-block-paragraph">所以，当一组研究人员表示他们构建了一个能耗降低100倍、同时准确度更高的AI系统时，这值得关注。</p>
  
  
  
  <h2 class="wp-block-heading">研究人员到底造了什么</h2>
  
  
  
  <p class="wp-block-paragraph">塔夫茨大学Matthias Scheutz领导的团队开发了一种他们称之为神经符号视觉-语言-动作模型。论文题为“价格不对：神经符号方法在结构化长时程操作任务中以显著更低的能耗超越VLA”，于2026年2月发布在arXiv上，并将于今年5月在维也纳举行的国际机器人与自动化会议上展示。</p>
  
  
  
  <p class="wp-block-paragraph">这个想法很直接，尽管实现起来并不简单。当前用于机器人的AI，称为视觉-语言-动作模型或VLA，工作原理很像大型语言模型。它们靠蛮力学习，处理海量数据集，运行数百万次试错循环，直到偶然发现可行的模式。这有时能产生令人印象深刻的结果，但效率极低。可以把它想象成记住每个可能的棋局位置，而不是学习规则。</p>
  
  
  
  <p class="wp-block-paragraph">神经符号AI走的是另一条路。它将神经网络的模式识别能力与实际规则和逻辑推理结合起来。神经网络负责感知和运动控制，符号层负责规划和逻辑。两者协同工作，更像人实际解决问题的方式：观察、思考规则、规划步骤，然后行动。</p>
  
  
  
  <h2 class="wp-block-heading">数字说明一切</h2>
  
  
  
  <p class="wp-block-paragraph">研究人员在汉诺塔谜题上测试了两种方法。如果你不熟悉，这是一个经典逻辑谜题，要求按照严格规则在柱子之间移动圆盘。选择这个谜题是因为它需要顺序推理和多步规划，而这正是当前AI所欠缺的。</p><p class="wp-block-paragraph">以下是实际情况：</p>
  
  
  
  <ul class="wp-block-list">
  <li><strong>成功率：</strong>神经符号系统在95%的情况下正确完成了拼图。标准VLA模型只有34%。</li>
  <li><strong>新场景：</strong>当面对一个从未见过的更复杂版本拼图时，混合系统仍有78%的成功率。传统模型？零。每一次尝试都失败了。</li>
  <li><strong>训练时间：</strong>神经符号系统用了34分钟，而标准方法需要超过一天半。</li>
  <li><strong>训练能耗：</strong>新系统只消耗了标准训练所需能量的1%。</li>
  <li><strong>运行能耗：</strong>仅为传统模型的5%。</li>
  </ul>
  
  
  
  <p class="wp-block-paragraph">这些不是渐进式改进。这是完全不同的性能量级。</p>
  
  
  
  <h2 class="wp-block-heading">为什么这不止关乎机器人技术</h2>
  
  
  
  <p class="wp-block-paragraph">Scheutz提出的一个观点让我印象深刻。他把这种低效与日常AI工具做了对比，指出即使是一次简单的谷歌搜索，现在也要经过层层AI处理，消耗不成比例的能量，而本质上只是完成一个信息检索任务。</p>
  
  
  
  <blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow"><p>&#8220;这些系统只是在试图预测序列中的下一个词或动作，但这可能不完美，它们会产生不准确的结果或幻觉。它们的能量消耗往往与任务本身不成比例。&#8221;</p></blockquote>
  
  
  
  <p class="wp-block-paragraph">他说得对。当前AI的做法从根本上就是浪费的。我们往问题上堆更多GPU，建更大的数据中心，消耗更多电力，换来的模型仍然会幻觉，仍然在基础推理上出错，仍然无法可靠地提前规划三步。</p>
  
  
  
  <p class="wp-block-paragraph">一些数据中心的用电量已经相当于小城市。国际能源署预计，AI的电力消耗在本十年内将持续大幅攀升。到某个节点，经济账就算不过来了。你不能每几年就让电费翻倍，还把这叫做可持续增长。</p>
  
  
  
  <h2 class="wp-block-heading">为什么这不是一个快速解决方案</h2><p class="wp-block-paragraph">我想先说明这项研究的局限性。本次研究聚焦于规则明确的机器人任务。汉诺塔有清晰的约束条件：圆盘按顺序移动，一次只能移动一个，遵循特定规则。这种结构正是符号推理所擅长的。</p>
  
  
  
  <p class="wp-block-paragraph">像写文章、生成代码或回答常识问题这类开放式任务，并没有如此清晰的规则集。如何将符号推理应用于“写一封有说服力的邮件”这种模糊场景，目前并不明确。现有研究并未涉及这一点。</p>
  
  
  
  <p class="wp-block-paragraph">还有规模问题。实验是在相对受控的实验室环境中进行的，针对的是特定的机器人操作任务。当这些效率提升扩展到更复杂、更混乱的真实世界环境时，是否依然成立，还有待观察。</p>
  
  
  
  <h2 class="wp-block-heading">AI效率的大局</h2>
  
  
  
  <p class="wp-block-paragraph">话虽如此，这项研究指向了一个重要方向。AI行业目前靠增加算力和数据来强行解决所有问题的策略，正在触及物理和经济的极限。能源昂贵，芯片昂贵，建设数据中心需要数年时间和数十亿美元。</p>
  
  
  
  <p class="wp-block-paragraph">微软刚宣布在日本投资100亿美元建设AI基础设施。软银向OpenAI投入了100亿美元。联合健康集团正花费30亿美元将AI嵌入其运营。这些赌注只有在底层技术变得更高效而非更低效时才能回本。</p>
  
  
  
  <p class="wp-block-paragraph">神经符号方法表明，确实存在提升空间。与其构建越来越大的模型，让它们通过试错从头学习一切，不如将已知规则编码进去，让神经网络专注于它真正擅长的事情：感知、模式匹配和运动控制。符号系统负责逻辑。两部分都不必独自承担全部负担。</p>
  
  
  
  <h2 class="wp-block-heading">接下来值得关注的点</h2>
  
  
  
  <p class="wp-block-paragraph">该论文将于2026年5月在维也纳举行的ICRA会议上正式发表。关注其他实验室能否在不同任务和更大规模上复现这些结果。如果效率提升在多个领域都能成立，神经符号AI可能会改变行业对构建智能系统的思考方式。</p><p class="wp-block-paragraph">这项研究还提出了一个更多人应该思考的问题：如果通过给模型加入结构化推理，我们能用少100倍的能耗获得更好的结果，那当初为什么满足于蛮力方案？部分原因在于，用算力堆问题比认真思考架构要容易得多。但容易不等于聪明。</p>
  
  
  
  <p class="wp-block-paragraph">论文可在<a href="https://arxiv.org/abs/2602.19260">arXiv</a>上查阅（arXiv:2602.19260）。</p>
---



<p class="wp-block-paragraph">AI is burning through electricity at a rate that should make anyone paying a power bill nervous. In 2024, AI systems and data centers in the US alone consumed roughly 415 terawatt hours. That is more than 10% of the country&#8217;s total electricity output, according to the International Energy Agency, and demand is on track to double by 2030.</p>



<p class="wp-block-paragraph">So when a team of researchers says they have built an AI system that uses 100 times less energy while being <em>more</em> accurate, it is worth paying attention.</p>



<h2 class="wp-block-heading">What the researchers actually built</h2>



<p class="wp-block-paragraph">A team at Tufts University, led by Matthias Scheutz, has developed what they call a neuro-symbolic visual-language-action model. The paper, titled &#8220;The Price Is Not Right: Neuro-Symbolic Methods Outperform VLAs on Structured Long-Horizon Manipulation Tasks with Significantly Lower Energy Consumption,&#8221; was published on arXiv in February 2026 and will be presented at the International Conference on Robotics and Automation in Vienna this May.</p>



<p class="wp-block-paragraph">The idea is straightforward, even if the execution is not. Current AI for robotics, called visual-language-action models or VLAs, works a lot like large language models. They learn by brute force, crunching massive datasets and running millions of trial-and-error cycles until they stumble onto patterns that work. This produces impressive results sometimes, but it is wildly inefficient. Think of it as memorizing every possible chess position instead of learning the rules.</p>



<p class="wp-block-paragraph">Neuro-symbolic AI takes a different path. It combines the pattern-recognition power of neural networks with actual rules and logical reasoning. The neural network handles perception and motor control. The symbolic layer handles planning and logic. Together, they work more like how a person would actually approach a problem: observe, think about the rules, plan the steps, then act.</p>



<h2 class="wp-block-heading">The numbers tell the story</h2>



<p class="wp-block-paragraph">The researchers tested both approaches on the Tower of Hanoi puzzle. If you are not familiar, it is a classic logic puzzle that requires moving disks between pegs following strict rules. It was chosen specifically because it demands sequential reasoning and multi-step planning, things current AI struggles with.</p>



<p class="wp-block-paragraph">Here is what happened:</p>



<ul class="wp-block-list">
<li><strong>Success rate:</strong> The neuro-symbolic system completed the puzzle correctly 95% of the time. Standard VLA models managed only 34%.</li>
<li><strong>Novel scenarios:</strong> When given a more complex version of the puzzle it had never seen before, the hybrid system still succeeded 78% of the time. The conventional model? Zero percent. It failed every single attempt.</li>
<li><strong>Training time:</strong> 34 minutes for the neuro-symbolic system versus more than a day and a half for the standard approach.</li>
<li><strong>Energy for training:</strong> The new system needed just 1% of the energy that standard training consumed.</li>
<li><strong>Energy during operation:</strong> 5% of what conventional models required.</li>
</ul>



<p class="wp-block-paragraph">Those are not incremental improvements. That is a completely different order of performance.</p>



<h2 class="wp-block-heading">Why this matters beyond robotics</h2>



<p class="wp-block-paragraph">Scheutz made a point that stuck with me. He compared the inefficiency to everyday AI tools, noting that even a basic Google search now runs through layers of AI that burn disproportionate energy for what amounts to a simple information retrieval task.</p>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow"><p>&#8220;These systems are just trying to predict the next word or action in a sequence, but that can be imperfect, and they can come up with inaccurate results or hallucinations. Their energy expense is often disproportionate to the task.&#8221;</p></blockquote>



<p class="wp-block-paragraph">He is right. The current approach to AI is fundamentally wasteful. We throw more GPUs at problems, build bigger data centers, and consume more electricity, all to get models that still hallucinate, still fail at basic reasoning, and still cannot reliably plan three steps ahead.</p>



<p class="wp-block-paragraph">Some data centers now draw as much power as small cities. The IEA projects AI electricity consumption will keep climbing sharply through the decade. At some point, the economics stop working. You cannot keep doubling your power bill every few years and call it sustainable growth.</p>



<h2 class="wp-block-heading">Why this is not a quick fix</h2>



<p class="wp-block-paragraph">I want to be clear about the limitations. This research focused on robotics tasks with well-defined rules. The Tower of Hanoi has clear constraints: disks go in order, one at a time, following specific rules. That structure is exactly what symbolic reasoning excels at.</p>



<p class="wp-block-paragraph">Open-ended tasks like writing essays, generating code, or answering general knowledge questions do not have such clean rule sets. It is not obvious how you would apply symbolic reasoning to something as fuzzy as &#8220;write a persuasive email.&#8221; The current research does not address that.</p>



<p class="wp-block-paragraph">There is also the scale question. The experiments involved relatively controlled lab settings with specific robotic manipulation tasks. Whether these efficiency gains hold up when you scale to more complex, messy, real-world environments remains to be seen.</p>



<h2 class="wp-block-heading">The bigger picture on AI efficiency</h2>



<p class="wp-block-paragraph">That said, this research points at something important. The AI industry&#8217;s current strategy of brute-forcing every problem with more compute and more data is hitting physical and economic limits. Energy is expensive. Chips are expensive. Building data centers takes years and billions of dollars.</p>



<p class="wp-block-paragraph">Microsoft just announced a $10 billion investment in AI infrastructure in Japan. SoftBank put $10 billion into OpenAI. UnitedHealth Group is spending $3 billion to embed AI across its operations. These bets only pay off if the underlying technology becomes more efficient, not less.</p>



<p class="wp-block-paragraph">The neuro-symbolic approach suggests there is real headroom. Instead of building ever-larger models that learn everything from scratch through trial and error, you can encode known rules and let the neural network focus on what it is actually good at: perception, pattern matching, and motor control. The symbolic system handles the logic. Neither part has to carry the full burden alone.</p>



<h2 class="wp-block-heading">What to watch for next</h2>



<p class="wp-block-paragraph">The paper will be formally presented at ICRA in Vienna in May 2026. Watch for whether other labs can replicate these results on different tasks and at larger scales. If the efficiency gains hold up across domains, neuro-symbolic AI could shift how the industry thinks about building intelligent systems.</p>



<p class="wp-block-paragraph">The research also raises a question that more people should be asking: if we can get better results with 100 times less energy by adding structured reasoning to our models, why were we ever satisfied with the brute-force approach in the first place? Part of the answer is that throwing compute at problems is easier than thinking carefully about architecture. But easier is not the same as smarter.</p>



<p class="wp-block-paragraph">The paper is available on <a href="https://arxiv.org/abs/2602.19260">arXiv</a> (arXiv:2602.19260).</p>


