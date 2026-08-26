---
title: Microsoft Drops Three New MAI Models on Foundry — And the Pricing Turns Heads
date: '2026-04-08T00:03:12'
modified: '2026-08-11T19:15:06'
slug: microsoft-drops-three-new-mai-models-on-foundry-and-the-pricing-turns-heads
description: Microsoft just dropped three new in-house AI models on Microsoft Foundry, and the pricing is aggressive enough to make competitors sweat.
categories:
- ai-tools-reviews
featured: /uploads/2026/04/blog-hero-5.jpg
wpId: 514
---

<p>Microsoft just dropped three new in-house AI models on Microsoft Foundry, and the pricing is aggressive enough to make competitors sweat. On April 8, 2026, the company released MAI-Transcribe-1, MAI-Voice-1, and MAI-Image-2, covering speech recognition, voice generation, and image creation. All three are available now through Microsoft Foundry and the MAI Playground for US users.</p>
<p>This isn’t a research preview or a waitlist situation. Developers can start building today.</p>
<h2>Speech Recognition That Beats Google at Its Own Game</h2>
<p>MAI-Transcribe-1 is the standout of the three. Microsoft tested it against the FLEURS benchmark across 25 languages, and the results are clear: it ranks first in 11 core languages and beats OpenAI’s Whisper-large-v3 in the remaining 14. It also outperforms Gemini 3.1 Flash in 11 of those 14 languages.</p>
<p>That’s a pretty specific claim, and Microsoft published the model card to back it up.</p>
<p>The model handles noisy, real-world audio, which matters because clean recording conditions are the exception, not the rule. Batch transcription runs 2.5 times faster than Azure Fast, the existing Microsoft offering. At $0.36 per hour of audio, it undercuts most major cloud providers on price.</p>
<p>Microsoft is already rolling MAI-Transcribe-1 into Copilot’s Voice mode and Microsoft Teams. If you’ve used either recently, you might have already interacted with it without knowing.</p>
<p>For developers, the use cases are broad: subtitle generation, podcast transcription, call center quality assurance, legal discovery, searchable audio libraries, and real-time meeting captioning. The latency is low enough for live applications, which means dictation and closed captioning work well.</p>
<h2>Voice Generation With Emotional Range</h2>
<p>MAI-Voice-1 takes text and turns it into natural-sounding speech. What makes it different from the crowd of TTS models is the emotional variation baked in. The model can shift tone, pace, and emphasis based on context, and it preserves speaker identity across longer audio passages.</p>
<p>One number jumps out: MAI-Voice-1 generates 60 seconds of audio in one second. That’s 60x real-time speed.</p>
<p>Pricing starts at $22 per 1 million characters. Microsoft is also adding custom voice creation in Foundry, where developers can build a specific voice from a short audio sample. That feature opens doors for branded voice assistants, audiobook production, and game dialogue.</p>
<p>Pair MAI-Transcribe-1 with MAI-Voice-1 and an LLM, and you’ve got a complete voice agent stack. Speech-to-text, reasoning, text-to-speech. Microsoft is clearly positioning these two models as companion pieces.</p>
<h2>Image Generation Gets Faster and More Photorealistic</h2>
<p>MAI-Image-2 is already running in production inside Copilot. Microsoft says it delivers at least twice the speed of the previous generation based on actual production traffic data, not lab benchmarks.</p>
<p>The model targets a specific gap in AI image generation: realistic lighting, accurate skin tones, and readable text within images. Anyone who has tried to generate a diagram or a sign with AI knows the text problem. MAI-Image-2 addresses this directly.</p>
<p>Rollouts are underway in Bing and PowerPoint as well. Pricing is $5 per 1 million tokens for text input and $33 per 1 million tokens for image output.</p>
<p>WPP, the advertising giant, is an early customer. Rob Reilly, WPP’s Global Chief Creative Officer, said the model responds to “the sheer craft involved in generating real-world, campaign-ready images.” Whether that’s marketing speak or genuine enthusiasm depends on the output, but WPP putting its name on the announcement is a signal.</p>
<h2>The Bigger Play: Microsoft’s Full-Stack AI Ambitions</h2>
<p>Three models for transcription, voice, and images might seem like a scatter-shot release. Look closer and a pattern emerges. Microsoft is building out every layer of the AI stack in-house: understand speech, reason about it with an LLM, generate a spoken response, create visuals to accompany it.</p>
<p>That full-stack approach matters because it reduces dependency on outside providers. Microsoft has invested billions in OpenAI, but relying on a single partner for core AI capabilities carries risk. These MAI models give Microsoft its own foundation to build on.</p>
<p>The pricing strategy is the other signal. At $0.36 per hour for transcription and $22 per 1M characters for voice generation, Microsoft is pricing to win volume. These aren’t premium rates. They’re competitive enough to pull developers away from AWS and Google Cloud.</p>
<p>All three models were developed, tested, and red-teamed under Microsoft’s responsible AI processes. Foundry customers get built-in guardrails and governance controls, which matters for enterprises facing compliance requirements.</p>
<p>Microsoft says more MAI models are coming. If today’s release is any indication, the company isn’t just catching up. It’s trying to set the terms of competition.</p>
<p>The transcription model beating Google’s own benchmarks on Google’s home turf (speech recognition) is the kind of detail that gets attention in developer circles. Combined with aggressive pricing and production deployment in Copilot and Teams, this launch has substance behind the marketing.</p>
<p>For developers choosing between cloud AI providers this week, the math just got more interesting.</p>

