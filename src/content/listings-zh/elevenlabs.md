---
title: ElevenLabs
date: '2026-04-06T06:11:05'
modified: '2026-09-11T10:30:00'
slug: elevenlabs
description: ElevenLabs 是 AI 语音平台，免费层每月 10,000 积分，付费 6 美元起。已核实定价、积分规则、限制与社区反馈。
categories:
- ai-creative
wpId: 261
image: /uploads/2026/04/elevenlabs-1.jpg
featured: false
author: AIX Cove 出品
source: 官方定价页、文档、使用政策与公开社区讨论。2026 年 9 月核实。
reviewed: AIX Cove
---
<h2>ElevenLabs 是什么</h2>
<p>ElevenLabs 是一家语音 AI 公司，产品线已经从文本转语音扩成一条音频流水线。平台上还有语音识别（Scribe）、音效生成、音乐生成（Eleven Music）、多语言配音（Dubbing）、声音设计、声音转换和实时语音 API。所有功能共用一个账户和按月发放的积分池，用掉一点少一点。</p>
<p>它最出名的仍是合成语音的质量。Eleven v3 模型支持在文本里插入 [whispers]、[sighs] 这类音频标签来控制表演，长脚本的自然度在商用产品里属于第一梯队。v3 也有明确的边界，官方标注它不适合实时对话场景，单次 API 请求上限 5,000 字符，折算约五分钟英文朗读，长文要自己分段再拼接。</p>
<h2>积分怎么算</h2>
<p>定价页现在统一用积分（credits）计价，官方文档说明这个单位就是以前的 characters，数值没变。各产品的扣费速度差别很大。文本转语音在多语言 v2/v3 下约 1 字符扣 1 积分；语音识别约每分钟 330 积分；音乐约每分钟 900 积分；音效每次 200；声音转换和人声分离每分钟 1,000；自动配音带水印每分钟 2,000，配音工作室无水印最高每分钟 10,000。同样是 30,000 积分的 Starter 套餐，拿去朗读大约够三四十分钟成片，拿去配音只够十几分钟。</p>
<p>按朗读量折算没有官方统一标准。第三方对英文成片的实测集中在每分钟 826 到 915 字符，具体取决于声音和语速，官网的分钟估算偏乐观。做预算时用自己的声音实测一次更稳。</p>
<h2>2026 年 9 月核实过的价格</h2>
<table><thead><tr><th>套餐</th><th>月付</th><th>每月积分</th></tr></thead><tbody><tr><td>Free</td><td>$0</td><td>10,000</td></tr><tr><td>Starter</td><td>$6</td><td>30,000</td></tr><tr><td>Creator</td><td>$22（首月 $11）</td><td>121,000</td></tr><tr><td>Pro</td><td>$99</td><td>600,000</td></tr><tr><td>Scale</td><td>$299</td><td>1,800,000（3 席位）</td></tr><tr><td>Business</td><td>$990</td><td>6,000,000（10 席位）</td></tr></tbody></table>
<p>年付相当于付十个月的钱，折合 Starter 每月 $5、Creator $18.33、Pro $82.50，积分仍然按月发放。完整价格以 <a href="https://elevenlabs.io/pricing" target="_blank" rel="noopener noreferrer">官方定价页</a> 为准。</p>
<p>几个容易踩的细节。免费层不含商用授权，第三方核对还提到免费内容发布时需要标注 ElevenLabs，商用授权和即时声音克隆都从 Starter 开始，升级不会追溯授权以前生成的音频。付费积分可以结转，最多攒两个月的量，降级或取消订阅会清空余额，免费层没有结转。API 调用按美元计费，不走订阅积分池，文本转语音标准模型每千字符 $0.10，Flash/Turbo 每千字符 $0.05。</p>
<h2>典型工作流</h2>
<p>一条常见的制作流程是这样。先在免费层用同一句脚本试听几个候选声音，确定声音后把长稿分段生成，逐段审听，把发音和断句不合格的部分标出来重念，最后在剪辑软件里拼成片。需要克隆声音时，准备两三分钟干净录音，Starter 及以上用即时克隆，想要更高保真可以在 Creator 及以上训练专业克隆。配音任务先确认目标语言的扣费档位，自动模式带水印最便宜，配音工作室无水印最贵，差价可以到五倍。</p>
<h2>实用技巧</h2>
<ul>
<li>选声音别只信平台预览，用自己的一句话实际生成再判断。r/ElevenLabs 有用户反馈 v3 的实际输出和预览不一致，预览只适合初筛。</li>
<li>重念也扣积分，按字符计费意味着念错的部分要再花一遍钱。长脚本先小段试产，确认发音和语调后再批量生成。</li>
<li>专有名词发音用声音设置里的发音词典和别名机制修正，比反复重新生成省积分。</li>
<li>积分池跨产品共享。一个月里既要配音又要配乐的话，先按各产品的每分钟扣费速率算总账再选套餐档位。</li>
<li>音频标签的效果依声音而异，官方也说明还有很多未文档化的组合，多试几种比背文档有用。</li>
</ul>
<h2>限制与风险</h2>
<ul>
<li>免费层无商用授权，商用从 Starter 起。</li>
<li>Eleven v3 单次请求 5,000 字符，官方建议不要用于实时场景。</li>
<li>失败重试不退积分，这是社区讨论里出现频率最高的抱怨。</li>
<li>克隆声音需要当事人同意，平台用自动审核加人工复查执行使用政策，社区里有正常稿件被自动系统误判的反馈，误判可以按官方指引申诉。</li>
<li>超长单次生成可能出现音色漂移，社区评测提到连续五分钟以上的生成要留意。</li>
<li>计价口径会调整，2026 年内就从 characters 改成了 credits，购买前以官网为准。</li>
</ul>
<h2>公开反馈怎么说</h2>
<p>我把官方文档、定价页和 r/ElevenLabs 等社区讨论对照看了一遍。好评集中在 v3 的自然度和音频标签的表现力，社区里常见把它列为目前最自然的商用 TTS 的说法，多个独立评测给出类似结论。抱怨集中在字符计费对重念不友好、长生成的音色漂移，以及低档套餐客服响应慢。也有开发者觉得 v3 还像个 beta，部分声音没有为它优化好。这些印象来自公开讨论，落到自己的项目仍要实测。</p>
<h2>适合谁，不适合谁</h2>
<p>适合播客制作、视频解说、有声书、多语言配音、无障碍朗读，以及需要把语音嵌进产品的开发团队。以下情况要掂量。需要低延迟实时对话的场景，v3 官方标注不适合，应看 Flash/Turbo 系列或实时语音方案。每月只要几条短音频的轻量用户，免费层或更简单的工具可能就够。预算敏感的长篇量产要算清字符计费加重念的实际单价，社区里有人因此只把 ElevenLabs 用在重点内容上。</p>
<h2>对比与延伸</h2>
<p>质量优先选 ElevenLabs，价格敏感可以对比 Qwen3-TTS、Fish-Speech 这类开源方案，它们在社区讨论里常被当作替代品。做视频的读者可以配合 <a href="/zh/listing/runway/">Runway</a> 和 <a href="/zh/listing/midjourney/">Midjourney</a> 组成 AI 媒体工作流，也可以看我们的 <a href="/zh/listing/descript/">Descript</a> 介绍，那边偏剪辑工作流。</p>
<h2>来源</h2>
<ul>
<li><a href="https://elevenlabs.io/pricing" target="_blank" rel="noopener noreferrer">ElevenLabs 定价页</a>（2026 年 9 月读取）</li>
<li><a href="https://elevenlabs.io/docs" target="_blank" rel="noopener noreferrer">ElevenLabs 官方文档</a>（计费与克隆说明）</li>
<li><a href="https://elevenlabs.io/use-policy" target="_blank" rel="noopener noreferrer">ElevenLabs 使用政策</a></li>
<li><a href="https://www.reddit.com/r/ElevenLabs/" target="_blank" rel="noopener noreferrer">r/ElevenLabs 社区讨论</a>（v3 表现与计费反馈）</li>
</ul>
