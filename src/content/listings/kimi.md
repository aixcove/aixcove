---
title: Kimi
date: '2026-04-05T12:50:26'
modified: '2026-09-23T10:00:00'
slug: kimi
description: Kimi is Moonshot AI’s assistant for Chinese and bilingual reading, writing, research, and long-document workflows. See its strengths, limits, and.
categories:
- llm-chat
wpId: 199
image: /uploads/2026/04/kimi.jpg
featured: true
---
<h2>What is Kimi?</h2>
<p>Kimi is an AI assistant from Moonshot AI. People who work in Chinese, English, or both use it to read material, draft text, organize research, and handle long documents. Its model lineup evolves quickly, so the useful question is not whether one headline context number beats another, but whether the current product reliably turns your source material into a reviewable result in the language you need.</p>
<p>As of September 2026, the consumer chat product runs on Kimi K2.6, a multimodal model that accepts text, image, and video input. The flagship Kimi K3, released in July 2026, is a 2.8-trillion-parameter open-weight model with a 1-million-token context window, and Kimi K2.7 Code serves coding workflows. The older K2 series was discontinued in May 2026, so tutorials citing kimi-k2 IDs are outdated.</p>

<h2>Long context in practice</h2>
<p>Context capacity is Kimi's most marketed feature, and the numbers are real. K2.6 offers a 256K-token context, enough for several hundred pages of Chinese or English material in one conversation. K3 extends this to about 1M tokens, though in the consumer product the extra-long chat capacity is reserved for the top membership tier. These are documented per-request windows, not recall guarantees: a polished summary can still miss an exception clause buried on page 80. Treat it as headroom for verification, not a substitute.</p>

<h2>Where Kimi fits well</h2>
<ul>
  <li><strong>Chinese-first knowledge work:</strong> summarize reports, organize meeting material, draft communications, and clarify technical subjects without translating the task framing. Chinese fluency is where Kimi is most praised.</li>
  <li><strong>Bilingual work:</strong> compare Chinese and English sources, produce a first bilingual outline, and surface terminology that needs a human decision.</li>
  <li><strong>Long-document preparation:</strong> create a section map, pull decision points, and flag missing attachments before a human reads every page.</li>
  <li><strong>Multimodal review:</strong> because K2.6 and K3 accept images and video directly, you can discuss a scanned contract page, a screenshot, or a short screen recording alongside text files.</li>
  <li><strong>Research support:</strong> turn a broad question into a research plan, an evidence checklist, and a synthesis to verify.</li>
</ul>

<h2>Tips for document and research work</h2>
<p>Break a large document task into passes. Ask first for the structure and a list of pages that need attention, then a claim table with quotations for material statements, and only then the executive summary or translation. This catches missing pages and prevents fluent text from hiding weak evidence. For bilingual output, provide a terminology list, say which language controls names and legal terms, and ask for uncertain translations to be marked rather than guessed. For web research, separate primary sources from commentary, then open them before relying on any important claim.</p>

<h2>Pricing: consumer plans and API</h2>
<p>On the consumer side there is a free tier, then paid memberships. In China, the help center listed four tiers in September 2026: ¥49, ¥99, ¥199, and ¥699 per month, from Andante up to Allegro. All member features, including agent tasks, Kimi Code, and K2.6 conversations, share one credit pool. The international pricing page listed a free Adagio plan plus paid tiers at $19, $39, $99, and $199 per month. Moonshot briefly paused new consumer subscriptions in mid-2026 citing compute shortages, so tier availability can fluctuate.</p>
<p>The Kimi Open Platform bills the API pay-as-you-go. Per 1M tokens as of September 2026: kimi-k3 costs $3.00 input and $15.00 output, with cache-hit input at $0.30; kimi-k2.6 costs $0.95 input and $4.00 output; kimi-k2.7-code matches K2.6. Batch inference runs at 60 percent of standard prices. K3 sits near frontier-model pricing, while K2.6 is among the cheaper capable models per token, so prototyping on K3 and running volume on K2.6 is a common split.</p>

<h2>Who it suits and who it does not</h2>
<p>Kimi fits Chinese-dominant readers, writers, and researchers; bilingual teams comparing sources; analysts with long documents and mixed media; and developers in China who want chat, open platform, and Kimi Code tightly integrated. It is a weaker fit if you need a primary English-language coding agent, where Codex and Claude-oriented workflows have deeper tooling; if your organization prohibits sending material to an overseas consumer AI service; or if you expect hands-off factual accuracy without opening sources yourself.</p>

<h2>Public feedback and limitations</h2>
<p>Public discussion highlights Kimi's Chinese fluency and long reading sessions; bilingual users value an alternative to the largest US assistants. Common cautions are regional availability, changing usage limits, and the risk that a polished summary misses an exception in the source. Treat uploaded business, legal, and medical material according to your organization's data policy; an enterprise Zero Data Retention option exists on the open platform. For daily development work, a dedicated workflow such as <a href="/listing/codex/">Codex</a>, <a href="/listing/claude/">Claude</a>, or an AI-enabled editor is usually better, though Kimi Code has improved quickly.</p>

<h2>Useful links</h2>
<ul>
  <li><a href="https://platform.kimi.ai/docs/overview" target="_blank" rel="noopener noreferrer">Kimi developer documentation</a></li>
  <li><a href="https://www.kimi.com/help/membership/membership-pricing" target="_blank" rel="noopener noreferrer">Kimi membership pricing (help center)</a></li>
  <li><a href="https://platform.kimi.ai/docs/pricing/chat-k26" target="_blank" rel="noopener noreferrer">Kimi API model pricing</a></li>
  <li><a href="/listing/claude/">Claude</a>, <a href="/listing/gemini/">Gemini</a>, and <a href="/listing/deepseek/">DeepSeek</a> for adjacent workflows</li>
</ul>
