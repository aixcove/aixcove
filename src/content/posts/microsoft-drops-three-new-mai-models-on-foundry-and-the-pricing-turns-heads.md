---
title: Microsoft Drops Three New MAI Models on Foundry — And the Pricing Turns Heads
date: '2026-04-08T00:03:12'
modified: '2026-08-11T19:15:06'
slug: microsoft-drops-three-new-mai-models-on-foundry-and-the-pricing-turns-heads
description: Microsoft just dropped three new in-house AI models on Microsoft Foundry, and the pricing is aggressive enough to make competitors sweat. On April 8, 2026, the company released MAI-Transcribe-1, MAI-V
categories:
- ai-tools-reviews
featured: /uploads/2026/04/blog-hero-5.jpg
wpId: 514
titleZh: "微软MAI模型上线Foundry，定价引关注"
descriptionZh: "微软在Foundry平台发布三款自研AI模型，定价激进，竞争压力陡增。2026年4月8日推出MAI-Transcribe-1、MAI-V，功能与价格详情一览。"
bodyZh: |
  <p>微软刚刚在Microsoft Foundry上发布了三款自研AI模型，定价激进到让竞争对手坐不住。2026年4月8日，公司推出MAI-Transcribe-1、MAI-Voice-1和MAI-Image-2，覆盖语音识别、语音生成和图像创建。三款模型现已通过Microsoft Foundry和MAI Playground向美国用户开放。</p>
  <p>这不是研究预览，也不是排队候补。开发者今天就能开始构建。</p>
  <h2>语音识别在谷歌的主场击败谷歌</h2>
  <p>MAI-Transcribe-1是三款中的佼佼者。微软用FLEURS基准在25种语言上做了测试，结果很明确：在11种核心语言中排名第一，在其余14种语言中超过OpenAI的Whisper-large-v3。它还在其中11种语言上优于Gemini 3.1 Flash。</p>
  <p>这是个相当具体的说法，微软发布了模型卡来支撑这一结论。</p>
  <p>模型能处理嘈杂的真实音频，这一点很关键，因为干净的录音环境是例外，不是常态。批量转录速度比微软现有的Azure Fast快2.5倍。每小时的音频处理价格为0.36美元，低于多数主流云服务商。</p>
  <p>微软已把MAI-Transcribe-1整合进Copilot的语音模式和Microsoft Teams。如果你最近用过其中任何一个，可能已经在不知情的情况下和它打过交道。</p>
  <p>对开发者来说，应用场景很广：字幕生成、播客转录、呼叫中心质检、法律取证、可搜索音频库、实时会议字幕。延迟低到能支撑实时应用，听写和隐藏式字幕都跑得动。</p>
  <h2>语音生成带情绪变化</h2>
  <p>MAI-Voice-1把文本转成自然语音。它和一堆TTS模型拉开差距的地方在于内置的情绪变化。模型能根据上下文调整语气、语速和重音，在较长音频段落中保持说话人身份一致。</p>
  <p>有个数字很扎眼：MAI-Voice-1用一秒生成60秒音频。也就是60倍实时速度。</p><p>定价为每100万字符22美元。微软还在Foundry中新增了自定义语音创建功能，开发者可以用一段短音频样本构建特定语音。这一功能为品牌语音助手、有声书制作和游戏对话打开了大门。</p>
  <p>将MAI-Transcribe-1与MAI-Voice-1以及一个LLM搭配使用，你就拥有了完整的语音代理栈。语音转文字、推理、文字转语音。微软显然在将这两个模型定位为配套组件。</p>
  <h2>图像生成更快、更逼真</h2>
  <p>MAI-Image-2已经在Copilot中投入生产。微软表示，根据实际生产流量数据（而非实验室基准），其速度至少是上一代的两倍。</p>
  <p>该模型针对AI图像生成中的一个具体缺口：逼真的光照、准确的肤色，以及图像内可读的文字。任何尝试用AI生成图表或标志的人都知道文字问题。MAI-Image-2直接解决了这个问题。</p>
  <p>Bing和PowerPoint中的部署正在进行中。文本输入定价为每100万token 5美元，图像输出为每100万token 33美元。</p>
  <p>广告巨头WPP是早期客户。WPP全球首席创意官Rob Reilly表示，该模型回应了“生成真实、可投放广告的图像所需的纯粹工艺”。这是营销话术还是真心认可，取决于实际产出，但WPP在公告中署名本身就是一个信号。</p>
  <h2>更大的布局：微软的全栈AI野心</h2>
  <p>发布转录、语音和图像三个模型，看起来像是一次分散的发布。仔细看，模式就浮现了。微软正在内部构建AI栈的每一层：理解语音，用LLM推理，生成语音回复，创建配套视觉内容。</p>
  <p>这种全栈方法很重要，因为它减少了对外部供应商的依赖。微软已向OpenAI投资数十亿美元，但依赖单一合作伙伴提供核心AI能力存在风险。这些MAI模型给了微软自己的基础。</p>
  <p>定价策略是另一个信号。转录每小时0.36美元，语音生成每100万字符22美元，微软在定价上意在赢得规模。这些不是溢价费率。它们具有足够的竞争力，能把开发者从AWS和Google Cloud吸引过来。</p><p>这三款模型均在微软负责任AI流程下完成开发、测试和红队演练。Foundry客户可获得内置护栏与治理控制，这对面临合规要求的企业至关重要。</p>
  <p>微软表示更多MAI模型即将推出。从今天的发布来看，公司不只是追赶，而是在试图设定竞争规则。</p>
  <p>转录模型在谷歌自家地盘（语音识别）上击败谷歌基准测试，这类细节在开发者圈子里很受关注。加上激进定价以及Copilot和Teams中的生产部署，这次发布有实质内容支撑。</p>
  <p>本周要在云AI供应商之间做选择的开发者，算盘得重新打了。</p>
---

<p>Microsoft just dropped three new in-house AI models on Microsoft Foundry, and the pricing is aggressive enough to make competitors sweat. On April 8, 2026, the company released MAI-Transcribe-1, MAI-Voice-1, and MAI-Image-2, covering speech recognition, voice generation, and image creation. All three are available now through Microsoft Foundry and the MAI Playground for US users.</p>
<p>This isn&#8217;t a research preview or a waitlist situation. Developers can start building today.</p>
<h2>Speech Recognition That Beats Google at Its Own Game</h2>
<p>MAI-Transcribe-1 is the standout of the three. Microsoft tested it against the FLEURS benchmark across 25 languages, and the results are clear: it ranks first in 11 core languages and beats OpenAI&#8217;s Whisper-large-v3 in the remaining 14. It also outperforms Gemini 3.1 Flash in 11 of those 14 languages.</p>
<p>That&#8217;s a pretty specific claim, and Microsoft published the model card to back it up.</p>
<p>The model handles noisy, real-world audio, which matters because clean recording conditions are the exception, not the rule. Batch transcription runs 2.5 times faster than Azure Fast, the existing Microsoft offering. At $0.36 per hour of audio, it undercuts most major cloud providers on price.</p>
<p>Microsoft is already rolling MAI-Transcribe-1 into Copilot&#8217;s Voice mode and Microsoft Teams. If you&#8217;ve used either recently, you might have already interacted with it without knowing.</p>
<p>For developers, the use cases are broad: subtitle generation, podcast transcription, call center quality assurance, legal discovery, searchable audio libraries, and real-time meeting captioning. The latency is low enough for live applications, which means dictation and closed captioning work well.</p>
<h2>Voice Generation With Emotional Range</h2>
<p>MAI-Voice-1 takes text and turns it into natural-sounding speech. What makes it different from the crowd of TTS models is the emotional variation baked in. The model can shift tone, pace, and emphasis based on context, and it preserves speaker identity across longer audio passages.</p>
<p>One number jumps out: MAI-Voice-1 generates 60 seconds of audio in one second. That&#8217;s 60x real-time speed.</p>
<p>Pricing starts at $22 per 1 million characters. Microsoft is also adding custom voice creation in Foundry, where developers can build a specific voice from a short audio sample. That feature opens doors for branded voice assistants, audiobook production, and game dialogue.</p>
<p>Pair MAI-Transcribe-1 with MAI-Voice-1 and an LLM, and you&#8217;ve got a complete voice agent stack. Speech-to-text, reasoning, text-to-speech. Microsoft is clearly positioning these two models as companion pieces.</p>
<h2>Image Generation Gets Faster and More Photorealistic</h2>
<p>MAI-Image-2 is already running in production inside Copilot. Microsoft says it delivers at least twice the speed of the previous generation based on actual production traffic data, not lab benchmarks.</p>
<p>The model targets a specific gap in AI image generation: realistic lighting, accurate skin tones, and readable text within images. Anyone who has tried to generate a diagram or a sign with AI knows the text problem. MAI-Image-2 addresses this directly.</p>
<p>Rollouts are underway in Bing and PowerPoint as well. Pricing is $5 per 1 million tokens for text input and $33 per 1 million tokens for image output.</p>
<p>WPP, the advertising giant, is an early customer. Rob Reilly, WPP&#8217;s Global Chief Creative Officer, said the model responds to &#8220;the sheer craft involved in generating real-world, campaign-ready images.&#8221; Whether that&#8217;s marketing speak or genuine enthusiasm depends on the output, but WPP putting its name on the announcement is a signal.</p>
<h2>The Bigger Play: Microsoft&#8217;s Full-Stack AI Ambitions</h2>
<p>Three models for transcription, voice, and images might seem like a scatter-shot release. Look closer and a pattern emerges. Microsoft is building out every layer of the AI stack in-house: understand speech, reason about it with an LLM, generate a spoken response, create visuals to accompany it.</p>
<p>That full-stack approach matters because it reduces dependency on outside providers. Microsoft has invested billions in OpenAI, but relying on a single partner for core AI capabilities carries risk. These MAI models give Microsoft its own foundation to build on.</p>
<p>The pricing strategy is the other signal. At $0.36 per hour for transcription and $22 per 1M characters for voice generation, Microsoft is pricing to win volume. These aren&#8217;t premium rates. They&#8217;re competitive enough to pull developers away from AWS and Google Cloud.</p>
<p>All three models were developed, tested, and red-teamed under Microsoft&#8217;s responsible AI processes. Foundry customers get built-in guardrails and governance controls, which matters for enterprises facing compliance requirements.</p>
<p>Microsoft says more MAI models are coming. If today&#8217;s release is any indication, the company isn&#8217;t just catching up. It&#8217;s trying to set the terms of competition.</p>
<p>The transcription model beating Google&#8217;s own benchmarks on Google&#8217;s home turf (speech recognition) is the kind of detail that gets attention in developer circles. Combined with aggressive pricing and production deployment in Copilot and Teams, this launch has substance behind the marketing.</p>
<p>For developers choosing between cloud AI providers this week, the math just got more interesting.</p>

