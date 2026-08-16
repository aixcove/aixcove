---
title: 'OpenClaw Feishu Integration Tutorial: Set Up a Lark AI Agent in 2026'
date: '2026-05-22T00:03:33'
modified: '2026-08-11T19:14:28'
slug: openclaw-feishu-integration-tutorial-set-up-a-lark-ai-agent-in-2026
description: 'Quick answer: OpenClaw&#8217;s Feishu integration is worth setting up if your team already works in Feishu or Lark and wants an AI agent inside group chats, DMs, and internal workflows. It is not the '
categories:
- ai-tutorials-how-tos
featured: /uploads/2026/05/openclaw-feishu-integration-hero-28259837-26ea-4c95-8d99-ceed31aec0ee.jpg
wpId: 844
---

<p><strong>Quick answer:</strong> OpenClaw&#8217;s Feishu integration is worth setting up if your team already works in Feishu or Lark and wants an AI agent inside group chats, DMs, and internal workflows. It is not the easiest OpenClaw channel to configure, but it gives operators something Telegram does not: a work-native place for approvals, status checks, team questions, and recurring automation.</p>
<p>This OpenClaw Feishu integration tutorial focuses on the practical setup path: what you need before starting, how to connect the bot, how to lock down access, and how to troubleshoot the parts that usually break. If you only want a personal assistant, the <a href="/openclaw-tutorial-build-a-telegram-ai-agent-in-2026/">OpenClaw Telegram tutorial</a> is still the lighter first build. If your assistant needs to sit inside a team workspace, Feishu/Lark is the more serious option.</p>
<h2>Who This Setup Is For</h2>
<p>Feishu makes sense for technical operators, founders, SEO teams, support teams, and internal automation builders who already use Feishu or Lark as a daily workspace. The use case is not &#8220;chat with an AI bot for fun.&#8221; The real value is a team agent that can answer status questions, run approved workflows, summarize context, trigger research, and report results back where the team already works.</p>
<p>Pricing is worth separating from setup. <a href="/listing/openclaw/">OpenClaw</a> itself is open source, so the self-hosted software does not require a platform subscription. You may still pay for model API usage, hosting, Feishu/Lark workspace costs, image generation, external APIs, and the time needed to maintain the server. That makes it cheap in software terms, but not free in operational terms.</p>
<p>Bottom line: use Feishu when OpenClaw is part of a team operating system. Use Telegram when the assistant is mainly personal. Use a tool like <a href="/listing/dify/">Dify</a> or <a href="/listing/flowise/">Flowise</a> when you want a cleaner AI app builder instead of a messaging-first agent.</p>
<h2>What You Need Before You Start</h2>
<p>The official OpenClaw Feishu docs list the channel as production-ready for bot DMs and group chats. WebSocket is the default mode, with webhook mode available as an option. The docs also say the Feishu channel requires OpenClaw 2026.4.25 or above, so check your version before you start:</p>
<pre><code>openclaw --version</code></pre>
<p>If you are behind, upgrade first:</p>
<pre><code>openclaw update</code></pre>
<p>You also need a running OpenClaw gateway, access to Feishu Open Platform or Lark Developer, a model provider configured in OpenClaw, and permission to create or connect a self-built app in your Feishu/Lark workspace. For a serious setup, run OpenClaw on a VPS or always-on machine. A laptop demo is fine for testing, but it is a bad foundation for a team assistant that people expect to answer during the workday.</p>
<h2>Step 1: Run the Feishu Channel Wizard</h2>
<p>OpenClaw&#8217;s current setup path is straightforward. Start the channel login wizard:</p>
<pre><code>openclaw channels login --channel feishu</code></pre>
<p>The wizard gives you two basic routes. QR setup can create a bot automatically. Manual setup asks you to paste an App ID and App Secret from Feishu Open Platform or Lark Developer. In practice, manual setup is the safer path for teams because you can see exactly which app is being used, which permissions are granted, and who owns the credentials.</p>
<p>There is one small catch in the official docs: if the domestic Feishu mobile app does not react to the QR code, rerun setup and choose manual setup. That sounds minor, but it is a common time sink. Do not debug QR behavior for an hour. Switch to manual and move on.</p>
<p>After setup completes, restart the gateway so OpenClaw actually applies the channel configuration:</p>
<pre><code>openclaw gateway restart</code></pre>
<h2>Step 2: Configure Access Before Inviting People</h2>
<p>This is the part many tutorials treat as an afterthought. It should come before the first team demo.</p>
<p>For direct messages, OpenClaw uses <code>dmPolicy</code>. The useful options are pairing, allowlist, open, and disabled. Pairing lets unknown users request access and then waits for approval through the CLI. Allowlist restricts the bot to specific users. Open can allow public DMs only when configured broadly enough. Disabled turns DMs off.</p>
<p>For a team bot, start with either pairing or allowlist. Public DM access is rarely the right default for an agent that can use tools, read workspace context, or run scripts. If someone needs access, approve them deliberately:</p>
<pre><code>openclaw pairing list feishu
openclaw pairing approve feishu &lt;CODE&gt;</code></pre>
<p>Group chats have a separate policy. The default group policy is allowlist, which is the right instinct. You can allow all groups, allow specific groups, or disable group messages entirely. OpenClaw also requires an @mention in groups by default, which helps prevent accidental responses during normal team conversation.</p>
<p>A conservative group setup looks like this:</p>
<pre><code>{
  channels: {
    feishu: {
      groupPolicy: "allowlist",
      groupAllowFrom: ["oc_xxx"],
      requireMention: true
    }
  }
}</code></pre>
<p>That setup means the bot responds only in approved groups and only when mentioned. It is boring. Good. Boring access control is what you want when an AI assistant is sitting in a live team channel.</p>
<h2>Step 3: Get The Group And User IDs</h2>
<p>Feishu group IDs use the <code>oc_xxx</code> format. Open the group in Feishu or Lark, click the menu in the top-right corner, and check Settings. The group ID appears there.</p>
<p>User IDs use the <code>ou_xxx</code> format. The easiest way to find one is to start the gateway, send a DM to the bot, and watch the logs:</p>
<pre><code>openclaw logs --follow</code></pre>
<p>Look for the <code>open_id</code> in the log output. You can also inspect pending pairing requests with the pairing command above. Keep these IDs somewhere safe in your operational notes. Do not paste App Secrets, bot tokens, or private credentials into shared docs.</p>
<h2>Step 4: Test With Low-Risk Commands</h2>
<p>Do not start with a publishing workflow, CRM update, or file operation. Start with plain status checks. The Feishu docs list common text commands such as <code>/status</code>, <code>/reset</code>, and <code>/model</code>. Feishu/Lark does not support native slash-command menus for this channel, so send those as normal text messages.</p>
<p>A good first test sequence is simple:</p>
<ul>
<li>Send <code>/status</code> in a DM.</li>
<li>Mention the bot in an approved group and ask for its current model.</li>
<li>Ask it to summarize what workspace it is using.</li>
<li>Reset the session and confirm the bot still responds.</li>
</ul>
<p>If those tests pass, add one low-risk workflow. For example, an SEO team might ask OpenClaw to check recent Aixcove posts, research five keyword candidates, and return a brief without publishing anything. That workflow is useful, bounded, and easy to review.</p>
<h2>Step 5: Add A Real Workflow Carefully</h2>
<p>The best Feishu workflows are the ones where team context matters. A solo reminder bot does not need Feishu. A workflow that asks for approval, reports progress, or coordinates work between people does.</p>
<p>For an AI tools directory, a practical Feishu workflow might look like this: a team member mentions the bot in a content channel, asks for a high-intent article brief, and OpenClaw checks recent posts, researches candidate keywords, suggests a category, and returns a publish-ready outline. A human can then approve the next step. Later, once the process is trusted, the same workflow can draft the post, generate a hero image, and publish through WordPress.</p>
<p>The key question is where to draw the approval line. Research and drafting are usually low risk. Publishing, deleting, emailing, posting to social accounts, or changing production data should stay behind explicit approval until the workflow has a track record.</p>
<h2>Common Feishu Integration Problems</h2>
<h3>The bot does not respond in group chats</h3>
<p>Check the obvious things first. Is the bot added to the group? Did you mention it directly? Is <code>groupPolicy</code> set to disabled? Is the group ID actually in <code>groupAllowFrom</code>? If the group is allowed but the bot stays silent, watch the logs while sending a test message.</p>
<h3>The bot does not receive messages</h3>
<p>This usually points back to the Feishu/Lark app configuration. The official docs call out the important checks: the bot must be published and approved in Feishu Open Platform or Lark Developer, event subscription should include <code>im.message.receive_v1</code>, persistent connection should be selected, required permission scopes must be granted, and the OpenClaw gateway must be running.</p>
<pre><code>openclaw gateway status
openclaw logs --follow</code></pre>
<h3>The QR setup fails</h3>
<p>Switch to manual setup. Create a self-built app in Feishu Open Platform or Lark Developer, copy the App ID and App Secret, paste them into the setup wizard, then restart the gateway. It is less magical, but it is easier to audit.</p>
<h3>The App Secret leaks</h3>
<p>Treat it like a real credential leak. Reset the App Secret in Feishu Open Platform or Lark Developer, update the OpenClaw config, and restart the gateway. Do not just delete the old message and hope nobody saw it.</p>
<h2>When Feishu Is Better Than Telegram</h2>
<p>Feishu is better when the assistant is part of a team&#8217;s working loop. It supports group workflows, internal approvals, and shared operational context. It also creates a cleaner boundary between personal chat and work automation.</p>
<p>Telegram is better when you want the fastest personal setup. It is easier to test, easier to message from a phone, and usually less tied to workspace admin permissions. That is why the Telegram route works well as a first OpenClaw experiment. Feishu is the next step when the assistant needs to become part of how a team works.</p>
<p>If you are still deciding whether OpenClaw is the right base layer, read the <a href="/openclaw-review-2026-is-this-local-ai-assistant-worth-using/">OpenClaw review</a> and the comparison of <a href="/openclaw-vs-dify-which-ai-agent-platform-should-you-use-in-2026/">OpenClaw vs Dify</a>. If the setup burden feels too high, the <a href="/best-openclaw-alternatives-in-2026-7-picks-by-workflow-fit/">best OpenClaw alternatives</a> guide gives cleaner options by workflow fit.</p>
<h2>Final Verdict</h2>
<p>OpenClaw&#8217;s Feishu integration is not the lightest way to try an AI agent. It is the better route when you want the agent inside a real team workspace, with DMs, group mentions, access control, logs, and room for approval-based workflows.</p>
<p>Start narrow: connect the channel, lock down DMs and groups, test status commands, then add one workflow that cannot do damage. Once the bot proves it can behave in Feishu, you can expand it into research, reporting, support triage, or content operations. That is where the integration earns its keep.</p>

