---
title: Anthropic’s “Mythos” Model Can Hack Better Than Most Humans — And The Company Knows It
date: '2026-04-07T00:40:34'
modified: '2026-08-11T19:15:07'
slug: anthropics-mythos-model-can-hack-better-than-most-humans-and-the-company-knows-it
description: A draft blog post from Anthropic, obtained by Fortune, describes the company’s unreleased model “Mythos” as “currently far ahead of any other AI model in.
categories:
- ai-coding-development
featured: /uploads/2026/04/blog-hero-2.jpg
wpId: 509
---


<p class="wp-block-paragraph">A draft blog post from Anthropic, obtained by Fortune, describes the company’s unreleased model “Mythos” as “currently far ahead of any other AI model in cyber capabilities.” The post warns that Mythos “presages an upcoming wave of models that can exploit vulnerabilities in ways that far outpace the efforts of defenders.”</p>



<h2 class="wp-block-heading">What Anthropic Told Government Officials</h2>



<p class="wp-block-paragraph">According to an Axios report from late March, Anthropic has been privately briefing senior government officials about Mythos and its potential to increase the likelihood of large-scale cyberattacks throughout 2026. The warnings are unusually direct for a company talking about its own product.</p>



<p class="wp-block-paragraph">OpenAI CEO Sam Altman was asked about the prospect of a “world-shaking cyberattack” this year during a Monday interview with Axios co-founder Mike Allen. His response was not reassuring. “I think that’s totally possible, yes,” Altman said. “I think to avoid that, it will require a tremendous amount of work.”</p>



<p class="wp-block-paragraph">OpenAI also released its own policy blueprint on Monday titled “Industrial Policy for the Intelligence Age,” which acknowledges that “as AI systems become more capable and more embedded across the economy, they may introduce new vulnerabilities alongside new abundance.” The document states plainly that “some systems may be misused for cyber or biological harm.”</p>



<h2 class="wp-block-heading">How AI Changes the Attacker’s Calculus</h2>



<p class="wp-block-paragraph">The core issue is speed. Technology from Anthropic, OpenAI, Google, and others allows attackers to identify security holes in computer systems far faster than was possible even a year ago. A New York Times report published April 6 details how these new systems are altering the fundamental dynamic between attackers and defenders in cybersecurity.</p>



<p class="wp-block-paragraph">There is also a growing attack surface created by employees themselves. Many workers now build custom AI agents using tools like Claude and Copilot, and these agents frequently connect to internal company infrastructure. Those connections become entry points that cybercriminals can probe. The more autonomous AI agents a company deploys, the more potential doors exist for someone to pick the lock.</p>



<h2 class="wp-block-heading">The Context Problem</h2>



<p class="wp-block-paragraph">Not everyone in the security community accepts the doomsday framing. Security firm Aikido published an analysis based on 1,000 real-world AI penetration tests that pushes back against the idea that Mythos automatically tips the balance toward attackers.</p>



<p class="wp-block-paragraph">Their data shows that AI effectiveness in finding vulnerabilities depends heavily on context. In whitebox tests, where the AI had full access to target application source code, the systems found seven times more critical and high-severity issues compared to greybox tests with limited access. The constraint is not raw model capability. The constraint is information about the target system.</p>



<p class="wp-block-paragraph">Attackers operate from the outside. They are guessing at system details, inferring architecture from observed behavior, working blind in ways that defenders never have to. Defenders already possess the source code, the API credentials, and the internal business logic. That asymmetry matters more than most headlines suggest.</p>



<h2 class="wp-block-heading">The Axios NPM Incident</h2>



<p class="wp-block-paragraph">Aikido’s analysis points to the recent compromise of the Axios NPM package as an instructive example. The attacker did not modify source code. They compromised a maintainer account, added a new dependency, and published an update. No CVE matched the attack. No malicious code pattern triggered a scanner. No signature-based tool caught it because nothing in the attack matched a known pattern.</p>



<p class="wp-block-paragraph">An organization with deep visibility into its dependency tree, one that understood not just what packages it used but how those packages behaved and what a legitimate update looked like, would have had reason to question the change. Without that context, no amount of AI speed or capability makes a difference. The tools were blind because the understanding was shallow.</p>



<h2 class="wp-block-heading">CISA Is Operating at Reduced Capacity</h2>



<p class="wp-block-paragraph">The timing could hardly be worse. The Cybersecurity and Infrastructure Security Agency (CISA), the federal body responsible for protecting critical infrastructure, has been hobbled by the partial Department of Homeland Security shutdown. Acting Director Nick Andersen told a House Homeland Security Committee hearing on March 25 that roughly 60 percent of CISA employees had been furloughed or were otherwise unable to work.</p>



<p class="wp-block-paragraph">“The remaining personnel are carrying out mission essential functions without pay while facing increasing pressure from nation-state and criminal actors targeting our nation’s critical infrastructure,” Andersen said. “This is not a sustainable model.”</p>



<h2 class="wp-block-heading">Defenders Still Hold the High Ground — For Now</h2>



<p class="wp-block-paragraph">The practical reality sits somewhere between panic and complacency. AI models will absolutely lower the cost and raise the speed of attacks. Script-kiddie-level operators will gain capabilities that previously required experienced professionals. Phishing will become more convincing. Reconnaissance will become faster.</p>



<p class="wp-block-paragraph">But the structural advantage defenders hold — direct access to their own code, their own logs, their own architecture — is real and durable. The question is whether organizations will actually use that advantage. Most companies struggle with basic security hygiene. Unpatched systems, default credentials, and misconfigured cloud storage remain the primary entry points for breaches, not sophisticated zero-day exploits.</p>



<p class="wp-block-paragraph">Anthropic has not announced a release date for Mythos. The company says it wants to fully understand the model’s near-term cybersecurity risks before proceeding. But the competitive pressure to ship is immense. Google, OpenAI, and others are all racing toward the same capability threshold. No single company can afford to pause indefinitely while competitors move ahead.</p>



<p class="wp-block-paragraph">The uncomfortable truth is that Mythos is not the problem. Mythos is a preview. The models coming after it, from every major lab, will share these capabilities. The window to build defensive systems that match offensive speed is open now, but it will not stay open forever. CISA running at 40 percent staffing while frontier AI models learn to find vulnerabilities in seconds is the kind of mismatch that produces very bad outcomes very quickly.</p>

