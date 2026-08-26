---
title: Gemma
date: '2026-04-05T15:31:53'
modified: '2026-08-22T10:30:00'
slug: gemma
description: Gemma is Google DeepMind’s open-weight model family, now at Gemma 4 with sizes from E2B to 31B. See the model lineup, local running, license notes, and.
categories:
- llm-chat
wpId: 237
image: /uploads/2026/04/gemma.jpg
featured: false
---
<h2>Gemma at a glance</h2>
<p>Gemma is Google DeepMind's family of open-weight models. It is the download-and-run counterpart to the hosted Gemini apps and API. You get the weights, and you decide where they run, on a phone, a laptop, a server, or a cloud VM. The family has been through several generations, and the current one is Gemma 4, released in April 2026, with the 12B unified model following in June.</p>
<p>I checked the official Gemma site, the Hugging Face model cards, and the terms page before writing this. The practical question for most readers is which size fits their hardware and whether their use case is allowed under the license. Both have real answers, and they change between generations, so the current docs are the source of truth.</p>
<h2>The Gemma 4 lineup</h2>
<p>Gemma 4 ships in five sizes, spanning two architectures. E2B and E4B are compact models built for maximum compute and memory efficiency, aimed at phones and IoT devices. The 12B, 26B A4B, and 31B are the reasoning-focused tier for laptops and servers. The 26B A4B is a Mixture-of-Experts model, which means only a fraction of its parameters activate per token, so it runs in far less memory than a dense 26B would need.</p>
<p>All five are multimodal. They take text and image input, and the E2B, E4B, and 12B additionally handle video and audio natively. Context windows run to 128K tokens on the small models and 256K on the medium ones. Multilingual support covers more than 140 languages. The models have configurable thinking modes, so you can trade latency against reasoning depth, and native function calling for agent workflows. The 12B is described as encoder-free, meaning it processes audio and vision without separate encoder modules, which keeps the deployment footprint smaller.</p>
<p>Beyond the core sizes, Google publishes specialist variants. DiffusionGemma is a text diffusion model aimed at generation speed. T5Gemma and T5Gemma 2 are encoder-decoder models for deep contextual understanding. MedGemma targets medical text and image comprehension. EmbeddingGemma, FunctionGemma, VaultGemma, TranslateGemma, and ShieldGemma 2 cover embeddings, edge function calling, differentially private LLMs, translation, and safety classification respectively.</p>
<h2>How people actually run it</h2>
<p>Gemma runs through most mainstream tooling. Ollama and LM Studio cover the quick local path, Gemma.cpp and Google AI Edge handle on-device deployment, and Hugging Face Transformers, Keras, and JAX cover training and fine-tuning. The Hugging Face downloads are gated, so you agree to Google's license terms before accessing the weights.</p>
<p>The community reception has been strongly oriented toward local deployment. The Gemma 4 release thread on Hacker News drew over 1,800 points, and follow-ups showed people running the 26B model in 2 GB of RAM on M-series Macs, running Gemma 4 on iPhones, and even getting 26B to 5 tokens per second on a 13-year-old Xeon with no GPU. Those are the enthusiast edge cases, not typical results, but they explain what the small sizes are for.</p>
<h2>Typical workflow</h2>
<p>A common starting point is Ollama. Install it, pull a Gemma model by name, and chat with it from the terminal. On a recent laptop, the 4B or 12B size is the sane default. For a phone or embedded target, the E2B or E4B models are the ones to evaluate. For a server with a serious GPU, the 31B or 26B A4B becomes viable.</p>
<p>When a plain chat model is not enough, the next step is fine-tuning. The official guides cover QLoRA tuning with Hugging Face Transformers, tuning with the Gemma library, and full fine-tuning. A small tuned model usually beats prompt-engineering a large base model for a narrow internal task, and it costs less to serve.</p>
<h2>Where it fits, and where it does not</h2>
<p>Gemma fits teams that want model weights under their own control, that need offline or on-device inference, or that want to fine-tune on proprietary data without sending it to a hosted API. It also fits researchers comparing compact models and builders who want Google's model lineage without being tied to Gemini's hosted product.</p>
<p>It is the wrong choice if you want a managed assistant with no infrastructure work. For that, Gemini is the hosted path. Gemma also is not a drop-in guarantee of quality at every size, the small models trade capability for efficiency, and any self-hosted deployment still carries hardware, evaluation, safety, and maintenance costs that the download page does not show.</p>
<h2>Practical tips</h2>
<ul>
<li><strong>Pick the size by hardware, not by benchmark.</strong> A 31B model on a machine it does not fit will be slower than a 12B that fits comfortably. Check memory requirements against your actual device before downloading.</li>
<li><strong>Use the quantized and QAT variants for tight memory.</strong> Google publishes quantization guides and Gemma 4 QAT models for mobile and laptop efficiency. A quantized model is usually the difference between fitting and not fitting on a consumer machine.</li>
<li><strong>Match context length to the job.</strong> The small models cap at 128K and the medium ones at 256K. Long-document work should use the medium tier, while a 128K window covers most chat and RAG workloads.</li>
<li><strong>Toggle thinking modes deliberately.</strong> Configurable thinking trades latency for reasoning depth. Turn it on for hard reasoning and analysis, off for high-volume generation where speed matters more.</li>
<li><strong>Test function calling before building an agent on it.</strong> Native function calling exists across the family, but tool-calling reliability varies by size and quantization. Run your actual tool schema through the model before committing.</li>
<li><strong>Check the license for your use case.</strong> Gemma 4 weights are distributed under the Gemma 4 license, and earlier generations use the Gemma Terms of Use. Distribution and hosted-service obligations differ between them, so read the current terms rather than assuming Apache-style freedom.</li>
</ul>
<h2>Limits and risks</h2>
<ul>
<li><strong>Open weight is not open everything.</strong> Gemma is distributed under Google's own terms, not a standard permissive license, and the terms have changed between generations. Review them before commercial distribution or hosted offerings.</li>
<li><strong>Hardware planning is real work.</strong> The largest models need serious GPUs or heavy quantization. The enthusiast posts about running 26B in 2 GB of RAM are engineering feats, not typical setups.</li>
<li><strong>Small models have small ceilings.</strong> The E2B and E4B sizes are efficiency-first. They are impressive for their footprint, but they are not substitutes for the large models on complex reasoning.</li>
<li><strong>Quality claims move fast.</strong> Model generations and benchmark stories change every few months. Decisions should be based on the current model card and your own evaluation set, not on launch-day reporting.</li>
<li><strong>Not a hosted service.</strong> There is no official managed Gemma API in the same sense as Gemini. Running it well, serving it, and keeping it patched is your responsibility.</li>
</ul>
<h2>Related tools on AIXCove</h2>
<ul>
<li><a href="/listing/gemini/">Gemini</a> if you want the hosted Google assistant and API instead of self-hosting weights</li>
<li><a href="/listing/qwen/">Qwen</a> for another open-weight family with a wide size range and strong coding focus</li>
<li><a href="/listing/anythingllm/">AnythingLLM</a> if you want a ready-made private document chat workspace around local models</li>
<li>Browse all <a href="/listing-category/llm-chat/">AI chat tools</a>, or read our <a href="/how-to-use-open-webui-with-ollama-in-2026/">Open WebUI and Ollama guide</a> for a local chat setup</li>
</ul>
<h2>Sources and further reading</h2>
<ul>
<li><a href="https://ai.google.dev/gemma" rel="nofollow noopener" target="_blank">Official Gemma site</a> at Google AI for Developers, with docs and model overview</li>
<li><a href="https://huggingface.co/google/gemma-4-12b-it" rel="nofollow noopener" target="_blank">Gemma 4 12B model card</a> on Hugging Face, with architecture and context details</li>
<li><a href="https://ai.google.dev/gemma/terms" rel="nofollow noopener" target="_blank">Gemma Terms of Use</a>, including the Gemma 4 license</li>
<li><a href="https://news.ycombinator.com/item?id=47616361" rel="nofollow noopener" target="_blank">Hacker News discussion</a> of the Gemma 4 release, and the <a href="https://news.ycombinator.com/item?id=48385906" rel="nofollow noopener" target="_blank">Gemma 4 12B thread</a></li>
</ul>
