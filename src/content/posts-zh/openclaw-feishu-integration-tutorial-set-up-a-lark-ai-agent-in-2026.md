---
title: 'OpenClaw飞书集成：5步搭好Lark AI智能体'
date: '2026-05-22T00:03:33'
modified: '2026-08-11T19:14:28'
slug: openclaw-feishu-integration-tutorial-set-up-a-lark-ai-agent-in-2026
description: '跑通频道向导、配权限、取群ID、低风险测试再到真实工作流。5步教程附常见报错与Telegram方案对比。'
categories:
- ai-tutorials-how-tos
featured: /uploads/2026/05/openclaw-feishu-integration-hero-28259837-26ea-4c95-8d99-ceed31aec0ee.jpg
wpId: 844
---
<p><strong>快速回答：</strong>如果你的团队已经在用飞书或Lark，并且希望在群聊、私聊和内部工作流里放一个AI代理，OpenClaw的飞书集成值得配置。它不是最容易配置的OpenClaw渠道，但它提供了Telegram没有的东西：一个适合工作场景的地方，用来处理审批、状态查询、团队提问和重复性自动化。</p>
<p>这篇OpenClaw飞书集成教程聚焦实际配置路径：开始前需要准备什么，怎么连接机器人，怎么锁定访问权限，以及怎么排查常见故障。如果你只想要一个个人助手，<a href="/zh/openclaw-tutorial-build-a-telegram-ai-agent-in-2026/">OpenClaw Telegram教程</a>仍然是更轻量的首选。如果你的助手需要放在团队工作区里，飞书/Lark是更认真的选择。</p>
<h2>这个配置适合谁</h2>
<p>飞书适合那些已经把飞书或Lark作为日常工作区的技术运营、创始人、SEO团队、支持团队和内部自动化搭建者。用例不是“跟AI机器人聊天好玩”。真正的价值是一个团队代理，能回答状态问题、运行已批准的工作流、总结上下文、触发研究，并把结果汇报回团队已经在用的地方。</p>
<p>定价需要跟配置分开看。<a href="/listing/openclaw/">OpenClaw</a>本身是开源的，所以自托管软件不需要平台订阅。你可能仍需支付模型API使用费、托管费、飞书/Lark工作区成本、图像生成、外部API，以及维护服务器的时间。这在软件层面算便宜，但在运营层面不是免费的。</p>
<p>底线：当OpenClaw是团队操作系统的一部分时用飞书。当助手主要是个人用时用Telegram。当你想要一个更干净的AI应用构建器而不是消息优先的代理时，用像<a href="/listing/dify/">Dify</a>或<a href="/listing/flowise/">Flowise</a>这样的工具。</p>
<h2>开始前需要准备什么</h2>
<p>官方OpenClaw飞书文档把该渠道列为生产就绪，支持机器人私聊和群聊。WebSocket是默认模式，webhook模式作为选项可用。文档还说飞书渠道要求OpenClaw 2026.4.25或更高版本，所以开始前先检查你的版本：</p>
<pre><code>openclaw --version</code></pre>
<p>如果版本落后，先升级：</p><pre><code>openclaw update</code></pre>
<p>你还需要一个运行中的OpenClaw网关、飞书开放平台或Lark Developer的访问权限、在OpenClaw中配置好的模型提供商，以及在你所在飞书/Lark工作区中创建或连接自建应用的权限。对于正式部署，建议在VPS或常开机器上运行OpenClaw。笔记本演示适合测试，但作为团队助手的基础并不牢靠——团队成员会期望它在工作时间内随时响应。</p>
<h2>第一步：运行飞书渠道向导</h2>
<p>OpenClaw当前的设置路径很直接。启动渠道登录向导：</p>
<pre><code>openclaw channels login --channel feishu</code></pre>
<p>向导提供两条基本路线。扫码设置可以自动创建机器人。手动设置要求你从飞书开放平台或Lark Developer粘贴App ID和App Secret。实际操作中，手动设置对团队更稳妥，因为你能清楚看到用的是哪个应用、授予了哪些权限、凭证归谁所有。</p>
<p>官方文档里有个小坑：如果国内版飞书移动端对二维码没反应，重新运行设置并选择手动设置。这听起来小事一桩，但很常见，容易耗时间。别花一小时调试扫码行为，直接切换手动模式继续。</p>
<p>设置完成后，重启网关让OpenClaw真正应用渠道配置：</p>
<pre><code>openclaw gateway restart</code></pre>
<h2>第二步：邀请成员前先配置访问权限</h2>
<p>这部分很多教程一笔带过，但它应该在第一次团队演示之前完成。</p>
<p>对于私聊消息，OpenClaw使用<code>dmPolicy</code>。可用选项包括配对、白名单、开放和禁用。配对模式允许未知用户请求访问，然后通过CLI等待审批。白名单将机器人限制在特定用户范围内。开放模式仅在配置足够宽泛时允许公开私聊。禁用则关闭私聊功能。</p>
<p>对于团队机器人，从配对或白名单开始。一个能使用工具、读取工作区上下文或运行脚本的代理，默认开放公开私聊很少是正确选择。如果有人需要访问，手动审批即可：</p>
<pre><code>openclaw pairing list feishu
openclaw pairing approve feishu &lt;CODE&gt;</code></pre><p>群聊有单独的策略。默认群策略是白名单，这是正确的做法。你可以允许所有群、允许特定群，或者完全禁用群消息。OpenClaw 默认还要求群聊中必须 @提及，这有助于防止在正常团队对话中意外触发回复。</p>
<p>一个保守的群设置如下：</p>
<pre><code>{
  channels: {
    feishu: {
      groupPolicy: "allowlist",
      groupAllowFrom: ["oc_xxx"],
      requireMention: true
    }
  }
}</code></pre>
<p>这种设置意味着机器人只在批准的群中且被提及时才会响应。这很无趣。但当一个 AI 助手坐在实时团队频道里时，无趣的访问控制正是你想要的。</p>
<h2>第 3 步：获取群 ID 和用户 ID</h2>
<p>飞书群 ID 使用 <code>oc_xxx</code> 格式。在飞书或 Lark 中打开群组，点击右上角菜单，查看设置。群 ID 会显示在那里。</p>
<p>用户 ID 使用 <code>ou_xxx</code> 格式。找到它的最简单方法是启动网关，给机器人发一条私信，然后查看日志：</p>
<pre><code>openclaw logs --follow</code></pre>
<p>在日志输出中查找 <code>open_id</code>。你也可以用上面的配对命令检查待处理的配对请求。把这些 ID 保存在你的运维笔记中安全的地方。不要把 App Secret、机器人令牌或私人凭证粘贴到共享文档里。</p>
<h2>第 4 步：用低风险命令测试</h2>
<p>不要从发布工作流、CRM 更新或文件操作开始。从简单的状态检查开始。飞书文档列出了常见的文本命令，如 <code>/status</code>、<code>/reset</code> 和 <code>/model</code>。飞书/Lark 不支持此频道的原生斜杠命令菜单，所以将这些作为普通文本消息发送。</p>
<p>一个好的首次测试序列很简单：</p>
<ul>
<li>在私信中发送 <code>/status</code>。</li>
<li>在批准的群中提及机器人，并询问其当前模型。</li>
<li>让它总结正在使用的工作区。</li>
<li>重置会话并确认机器人仍然响应。</li>
</ul>
<p>如果这些测试通过，添加一个低风险的工作流。例如，一个 SEO 团队可能会让 OpenClaw 检查最近的 Aixcove 文章，研究五个关键词候选，并返回一个简报而不发布任何内容。这个工作流有用、有边界且易于审查。</p>
<h2>第 5 步：谨慎添加真实工作流</h2><p>最好的飞书工作流，是那些团队上下文真正起作用的工作流。一个孤立的提醒机器人不需要飞书。一个需要审批、汇报进度或协调多人协作的工作流才需要。</p>
<p>对于AI工具目录来说，一个实用的飞书工作流可能是这样的：团队成员在内容频道里@机器人，要求一份高意图文章简报，OpenClaw检查最近的帖子，研究候选关键词，建议分类，并返回一份可直接发布的提纲。然后由人工批准下一步。等流程被信任后，同一个工作流可以起草文章、生成主图，并通过WordPress发布。</p>
<p>关键问题在于审批线画在哪里。研究和起草通常风险低。发布、删除、发邮件、发社交媒体，或改动生产数据，这些操作应留在明确审批之后，直到工作流有了可靠记录。</p>
<h2>常见的飞书集成问题</h2>
<h3>机器人在群聊中不响应</h3>
<p>先检查显而易见的事。机器人是否已添加到群？是否直接@了它？<code>groupPolicy</code>是否设为disabled？群ID是否真的在<code>groupAllowFrom</code>里？如果群被允许但机器人没反应，发送测试消息时观察日志。</p>
<h3>机器人收不到消息</h3>
<p>这通常指向飞书/Lark应用配置。官方文档列出了重要检查项：机器人必须在飞书开放平台或Lark开发者后台发布并审批通过，事件订阅应包含<code>im.message.receive_v1</code>，选择长连接模式，授予所需权限范围，且OpenClaw网关必须运行中。</p>
<pre><code>openclaw gateway status
openclaw logs --follow</code></pre>
<h3>二维码设置失败</h3>
<p>改用手动设置。在飞书开放平台或Lark开发者后台创建自建应用，复制App ID和App Secret，粘贴到设置向导，然后重启网关。这样没那么自动化，但更容易排查。</p>
<h3>App Secret泄露</h3>
<p>按真实凭据泄露处理。在飞书开放平台或Lark开发者后台重置App Secret，更新OpenClaw配置，重启网关。不要只删掉旧消息就当没事发生。</p>
<h2>什么时候飞书比Telegram更合适</h2><p>当助手需要融入团队工作流时，飞书是更好的选择。它支持群组协作、内部审批和共享运营上下文，同时能在个人聊天和工作自动化之间建立更清晰的边界。</p>
<p>如果你追求最快的个人部署，Telegram更合适。它更容易测试，手机端发消息更方便，通常也不受工作区管理员权限的约束。这也是为什么Telegram路线适合作为OpenClaw的首次实验。当助手需要成为团队工作方式的一部分时，飞书是下一步。</p>
<p>如果你还在犹豫OpenClaw是否适合作为基础层，可以阅读<a href="/zh/openclaw-review-2026-is-this-local-ai-assistant-worth-using/">OpenClaw评测</a>以及<a href="/zh/openclaw-vs-dify-which-ai-agent-platform-should-you-use-in-2026/">OpenClaw与Dify的对比</a>。如果部署负担让你觉得过高，<a href="/zh/best-openclaw-alternatives-in-2026-7-picks-by-workflow-fit/">最佳OpenClaw替代方案</a>指南按工作流匹配度列出了更简洁的选项。</p>
<h2>最终结论</h2>
<p>OpenClaw的飞书集成不是尝试AI代理最轻量的方式。当你希望代理真正进入团队工作区，需要私信、群组提及、访问控制、日志以及基于审批的工作流时，飞书是更合适的路径。</p>
<p>从小处着手：连接频道，锁定私信和群组权限，测试状态命令，然后添加一个不会造成损害的工作流。一旦机器人证明自己能在飞书中正常运作，你就可以将其扩展到研究、报告、支持分类或内容运营。这才是这个集成真正发挥价值的地方。</p>
