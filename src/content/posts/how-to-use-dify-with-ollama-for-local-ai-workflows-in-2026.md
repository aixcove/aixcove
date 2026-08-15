---
title: How to Use Dify with Ollama for Local AI Workflows in 2026
date: '2026-05-16T00:08:24'
modified: '2026-08-11T19:14:32'
slug: how-to-use-dify-with-ollama-for-local-ai-workflows-in-2026
description: Use Dify with Ollama for local AI workflows, private model calls, and self-hosted experiments, with setup notes and tool comparisons.
categories:
- ai-tutorials-how-tos
featured: /uploads/2026/05/image-1-bd01b6da-5804-4b3b-a9a6-5b8a74708ad3.jpg
wpId: 811
titleZh: "Dify与Ollama本地AI工作流使用教程2026"
descriptionZh: "使用Dify搭配Ollama搭建本地AI工作流，实现私有模型调用与自托管实验，附详细配置说明及工具对比。"
bodyZh: |
  <h2>2026年如何用Dify搭配Ollama搭建本地AI工作流</h2>
  <p>如果你想运行Dify又不想为每次模型调用付费，把它连到Ollama就行。这样Dify负责工作流构建和应用层，Ollama在你自己的机器上跑模型。</p>
  <p>这里有一个明显的取舍。Dify不是轻量级玩具。它比简单的本地聊天前端要重，如果硬件不够强，本地模型会感觉慢。不过，如果你想要的是私有AI工作流栈而不是一个基础聊天窗口，这个组合是合理的。</p>
  <h2>谁适合用Dify搭配Ollama</h2>
  <p>这个组合适合构建者、运营人员和小团队，他们想把提示词和文档留在本地。想想本地知识机器人、内部问答应用、简单代理工作流，或者不想从第一天就依赖托管API的早期原型。</p>
  <p>它并不是所有人的最佳答案。</p>
  <p>如果你只想要一个干净的本地聊天机器人，<a href="/how-to-use-open-webui-with-ollama-for-a-local-ai-chatbot-in-2026/">Open WebUI搭配Ollama</a>通常更简单。如果你的主要场景是私有文档聊天，<a href="/how-to-use-anythingllm-with-ollama-for-private-document-chat-in-2026-2/">AnythingLLM搭配Ollama</a>可能是更直接的路。</p>
  <p>关键问题是：你是否需要工作流构建器。如果需要，Dify就开始显得合理多了。</p>
  <h2>价格、适配和限制先说清楚</h2>
  <p>教程开始前，先给个简短版本。</p>
  <ul>
  <li><strong>Dify Cloud：</strong>免费Sandbox层级，之后付费计划从每工作区每月59美元（Professional）和每工作区每月159美元（Team）起。</li>
  <li><strong>Dify自托管：</strong>没有SaaS费用，但计算、存储、搭建时间和维护成本还是要你自己承担。</li>
  <li><strong>Ollama：</strong>本地模型没有按token的API费用，但模型速度取决于你自己的硬件。</li>
  </ul>
  <p>Dify的GitHub文档列出的自托管最低基线是2个CPU核心和4 GiB内存。这够起步。但这不等于舒服的配置，尤其是加上文档、嵌入或更大模型之后。</p>
  <p><strong>结论：</strong>Dify搭配Ollama最适合那些更看重控制权、隐私和工作流逻辑，而不是纯粹便利性的人。</p>
  <h2>开始前你需要准备什么</h2>
  <p>很多教程跳过这部分，然后让你盲调。不如一开始就说清楚。</p>
  <h3>一台有足够余量的机器</h3><p>Dify 以完整应用栈的形式运行。Ollama 也需要空间来存放你拉取的模型。在配置一般的硬件上，这套方案可以运行，但体验会因内存大小和是否有 GPU 支持而有很大差异。</p>
  <h3>用于 Dify 的 Docker 和 Docker Compose</h3>
  <p>最简单的自托管路径仍然是 Dify 官方的 Docker Compose 配置。这也是 Dify 团队在 GitHub README 中推荐的方式。</p>
  <h3>安装并运行 Ollama</h3>
  <p>Ollama 通常会在 <code>http://localhost:11434</code> 暴露其本地 API。这个 URL 很重要，因为 Dify 需要访问它。</p>
  <h3>一个现实的首个模型</h3>
  <p>不要一开始就选用排行榜上最大的模型。从你的机器能轻松运行的模型开始。快速反馈比理论上的强大性能更重要。</p>
  <h2>第一步：安装 Ollama 并拉取模型</h2>
  <p>从官网安装 Ollama，启动服务，然后拉取你想在 Dify 中使用的模型。</p>
  <p>这里的关键很简单：模型必须已经存在于本地，Dify 才能调用它。Ollama 启动后，其本地 API 通常可在 <code>http://localhost:11434</code> 访问。</p>
  <p>如果该端点没有响应，先停下来修复 Ollama。其他所有步骤都依赖它。</p>
  <h2>第二步：安装 Dify</h2>
  <p>如果你选择自托管，使用 Dify 仓库中的标准 Docker Compose 部署方式。Dify 官方文档中的常规流程是：</p>
  <ul>
  <li>克隆 Dify 仓库</li>
  <li>进入 <code>docker</code> 目录</li>
  <li>将 <code>.env.example</code> 复制为 <code>.env</code></li>
  <li>使用 Docker Compose 启动整个栈</li>
  </ul>
  <p>容器启动完成后，在浏览器中打开 Dify 仪表盘并创建工作区。</p>
  <p>你也可以使用 Dify Cloud 并连接到本地 Ollama 实例，但这需要权衡。它更容易上手，但如果你使用 Ollama 的主要原因是隐私，这种方式就不那么整洁。</p>
  <h2>第三步：在 Dify 中将 Ollama 添加为模型提供商</h2>
  <p>现在到了容易出问题的部分。</p>
  <p>在 Dify 中，打开工作区的模型提供商设置并添加 Ollama。你通常需要填写这些字段：</p>
  <ul>
  <li>你在 Ollama 中拉取的确切模型名称</li>
  <li>Dify 能访问 Ollama 服务器的基础 URL</li>
  <li>模型类型，通常是 LLM 或文本嵌入</li>
  <li>上下文长度和令牌限制</li>
  <li>视觉支持，如果模型确实支持图像输入</li>
  </ul>
  <p>基础 URL 是大家容易出错的地方。</p><p>如果 Dify 在本地运行且不在 Docker 中，使用 <code>http://localhost:11434</code>。如果 Dify 在 macOS 或 Windows 的 Docker 中运行，<code>http://host.docker.internal:11434</code> 通常是正确选择。如果 Dify 在 Linux 或其他主机的 Docker 中，使用容器实际能访问到的主机 IP 地址。</p>
  <p>这听起来像个小细节，其实不是。<code>localhost</code> 在容器内部指向的是容器自身，而不是你的主机。很多“Dify 连不上 Ollama”的问题，根源就在这一个错误上。</p>
  <h2>第 4 步：构建工作流之前先测试模型</h2>
  <p>先做一个简单的测试提示。</p>
  <p>真的，别急着搭建完整的检索流程。</p>
  <p>如果 Dify 能调用模型并返回响应，说明连接正常。如果不行，先修好提供商配置，再继续下一步。</p>
  <p>最常见的失败点都很普通，这其实是好消息：</p>
  <ul>
  <li>Ollama 没有运行</li>
  <li>模型从未拉取过</li>
  <li>输入的模型名称有误</li>
  <li>Dify 在 Docker 内部尝试调用 <code>localhost</code></li>
  <li>防火墙或主机网络阻止了 11434 端口</li>
  </ul>
  <p>关键是，一旦提供商配置正常，教程的其余部分会顺利很多。</p>
  <h2>第 5 步：构建一个小型初始工作流</h2>
  <p>从小处开始。Dify 很容易让人第一天就过度构建。</p>
  <p>一个合理的本地初始工作流如下：</p>
  <ol>
  <li>用户输入</li>
  <li>可选的知识检索</li>
  <li>使用你的 Ollama 模型的一个 LLM 步骤</li>
  <li>输出</li>
  </ol>
  <p>这足以测试延迟、提示质量，以及本地模型是否适合你计划的任务。</p>
  <p>如果你还在学习 Dify 界面本身，<a href="/how-to-use-dify-to-build-your-first-ai-workflow-in-2026/">2026 年如何使用 Dify 构建你的第一个 AI 工作流</a> 涵盖了更广泛的产品设置。如果你在决定选择哪个工作流构建器，<a href="/dify-vs-flowise-in-2026-which-ai-workflow-builder-should-you-choose/">2026 年 Dify 与 Flowise 对比</a> 是更好的参考。</p>
  <h2>第 6 步：留意真正的限制</h2>
  <p>这个技术栈有用，但也有一些局限。</p>
  <h3>Dify 比本地聊天工具更重</h3>
  <p>如果你只需要一个私密的提示框，Dify 可能超出了你的需求。这就是为什么更轻量的工具在简单易用上一直占优。</p>
  <h3>本地模型速度可能成为瓶颈</h3><p>当响应感觉迟钝时，问题往往出在模型选择上，而不是提示词更复杂。较小的本地模型有时是更好的生产决策。</p>
  <h3>部分模型功能需要额外注意</h3>
  <p>Dify的Ollama市场文档指出，Ollama官方不支持rerank模型。所以如果你的工作流依赖这一层，你可能需要另一个本地服务，而不是强迫Ollama包揽一切。</p>
  <h3>自托管意味着持续维护</h3>
  <p>首次安装完成后，你仍需负责更新、容器、存储和备份。有些人对此没问题。有些人则发现他们真正想要的是便利。</p>
  <h2>快速结论</h2>
  <p>如果你想要一个比简单聊天应用更有结构的本地优先AI工作流构建器，Dify搭配Ollama在2026年值得使用。它特别适合私有内部工具、早期RAG工作流，以及希望更严格控制成本的团队。</p>
  <p>如果你想要最快的本地聊天路径，用更轻量的工具。如果你想要更完整的AI应用层，并且能接受更重的部署，这是一个好组合。</p>
  <p>如果你试了之后觉得Dify平台感太强，<a href="/best-dify-alternatives-in-2026-6-picks-by-workflow-fit/">2026年最佳Dify替代品</a>能帮你省几个标签页。</p>
  <p><!-- aixcove-seo-refresh-2026-07 --></p>
  <h2>谁适合用Dify搭配Ollama？</h2>
  <p>这种设置适合想要Dify的应用构建工作流，但更倾向于本地模型调用的用户。它对原型、内部助手、私有文档工作流，以及想在付费托管API之前测试开源模型的团队很有用。</p>
  <p>当质量、速度或长上下文推理比本地控制更重要时，选择云端模型。如果你的工作流主要是自动化而非AI应用，阅读<a href="/how-to-use-n8n-with-ollama-for-private-ai-automation-in-2026/">n8n搭配Ollama指南</a>作为下一步比较。</p>
  <h2>Dify加Ollama与其他本地AI工具对比</h2>
  <ul>
  <li><strong>Dify加Ollama：</strong>最适合围绕本地模型构建AI应用。</li>
  <li><strong>AnythingLLM：</strong>最适合本地文档聊天和简单的私有知识库。</li>
  <li><strong>Open WebUI：</strong>最适合多模型的本地ChatGPT风格界面。</li>
  <li><strong>Flowise：</strong>最适合可视化LLM链和快速实验。</li>
  </ul>
  <h2>常见问题</h2>
  <h3>Dify能完全本地运行Ollama吗？</h3><p>你可以用 Ollama 在本地跑模型推理，但具体部署方式取决于你怎么托管 Dify，以及数据源放在哪里。</p>
  <h3>Ollama 能支撑生产环境的 Dify 应用吗？</h3>
  <p>可以，尤其是窄范围的内部工作流。在替换云端模型之前，先测试答案质量、延迟和硬件成本。</p>
  <h3>接下来该对比什么？</h3>
  <p>根据你需要应用搭建、链式搭建还是文档问答，对比 <a href="/listing/dify/">Dify</a>、<a href="/listing/flowise/">Flowise</a> 和 <a href="/listing/anythingllm/">AnythingLLM</a>。</p>
---

<h2>How to Use Dify with Ollama for Local AI Workflows in 2026</h2>
<p>If you want to run Dify without paying for every model call, connect it to Ollama. That gives you Dify’s workflow builder and app layer, while Ollama runs the model on your own machine.</p>
<p>There is one obvious tradeoff. Dify is not a lightweight toy. It is heavier than a simple local chat front end, and local models will feel slow if your hardware is weak. Still, if you want a private AI workflow stack instead of a basic chat window, this setup makes sense.</p>
<h2>Who should use Dify with Ollama</h2>
<p>This setup is a good fit for builders, operators, and small teams that want to keep prompts and documents close to home. Think local knowledge bots, internal Q&amp;A apps, simple agent workflows, or early prototypes that should not depend on a hosted API from day one.</p>
<p>It is not the best answer for everyone.</p>
<p>If all you want is a clean local chatbot, <a href="/how-to-use-open-webui-with-ollama-for-a-local-ai-chatbot-in-2026/">Open WebUI with Ollama</a> is usually easier. If your main use case is private document chat, <a href="/how-to-use-anythingllm-with-ollama-for-private-document-chat-in-2026-2/">AnythingLLM with Ollama</a> can be the simpler route.</p>
<p>The key question is whether you need a workflow builder. If you do, Dify starts to look much more reasonable.</p>
<h2>Pricing, fit, and limitations up front</h2>
<p>Here is the short version before the tutorial starts.</p>
<ul>
<li><strong>Dify Cloud:</strong> free Sandbox tier, then paid plans starting at $59 per workspace per month for Professional and $159 per workspace per month for Team.</li>
<li><strong>Dify self-hosted:</strong> no SaaS fee, but you still pay in compute, storage, setup time, and maintenance.</li>
<li><strong>Ollama:</strong> local models without per-token API charges, but model speed depends on your own hardware.</li>
</ul>
<p>Dify’s GitHub documentation lists a minimum self-hosted baseline of 2 CPU cores and 4 GiB RAM. That is enough to start. It is not the same thing as a comfortable setup, especially once you add documents, embeddings, or larger models.</p>
<p><strong>Bottom line:</strong> Dify with Ollama is best for people who care about control, privacy, and workflow logic more than raw convenience.</p>
<h2>What you need before you start</h2>
<p>A lot of guides rush past this part, then leave you debugging blind. Better to be clear.</p>
<h3>A machine with enough headroom</h3>
<p>Dify runs as a full application stack. Ollama also needs room for the models you pull. On modest hardware, the setup can work, but the experience changes a lot depending on RAM and whether you have GPU support.</p>
<h3>Docker and Docker Compose for Dify</h3>
<p>The easiest self-hosted path is still Dify’s official Docker Compose setup. That is what the Dify team points people to in the GitHub README.</p>
<h3>Ollama installed and running</h3>
<p>Ollama normally exposes its local API at <code>http://localhost:11434</code>. That URL matters because Dify needs to reach it.</p>
<h3>A realistic first model</h3>
<p>Do not start with the biggest model on the leaderboard. Start with something your machine can actually run without pain. Faster feedback beats theoretical power every time.</p>
<h2>Step 1: Install Ollama and pull a model</h2>
<p>Install Ollama from the official site, start the service, and pull the model you want to use in Dify.</p>
<p>What matters here is simple: the model must already exist locally before Dify can call it. Once Ollama is up, its local API is usually available at <code>http://localhost:11434</code>.</p>
<p>If that endpoint is not live, stop and fix Ollama first. Everything else depends on it.</p>
<h2>Step 2: Install Dify</h2>
<p>If you are self-hosting, use the standard Docker Compose deployment from the Dify repository. The usual flow in Dify’s own docs is:</p>
<ul>
<li>clone the Dify repository</li>
<li>go into the <code>docker</code> directory</li>
<li>copy <code>.env.example</code> to <code>.env</code></li>
<li>start the stack with Docker Compose</li>
</ul>
<p>Once the containers finish starting, open the Dify dashboard in your browser and create your workspace.</p>
<p>You can also use Dify Cloud and connect it to a local Ollama instance, but that is a different tradeoff. It is easier to get started, just less tidy if your main reason for using Ollama is privacy.</p>
<h2>Step 3: Add Ollama as a model provider in Dify</h2>
<p>Now you are at the part that tends to break.</p>
<p>Inside Dify, open the workspace model provider settings and add Ollama. You will usually need these fields:</p>
<ul>
<li>the exact model name you pulled in Ollama</li>
<li>the base URL where Dify can reach the Ollama server</li>
<li>the model type, usually LLM or Text Embedding</li>
<li>context length and token limits</li>
<li>vision support, if the model actually supports image input</li>
</ul>
<p>The base URL is where people trip up.</p>
<p>Use <code>http://localhost:11434</code> if Dify is running locally outside Docker on the same machine. If Dify is running in Docker on macOS or Windows, <code>http://host.docker.internal:11434</code> is often the right choice. If Dify is in Docker on Linux or another host, use the host IP address that the container can actually reach.</p>
<p>That sounds like a tiny detail. It is not. <code>localhost</code> inside a container points back to the container itself, not your host machine. A lot of “Dify cannot connect to Ollama” problems come down to that one mistake.</p>
<h2>Step 4: Test the model before building a workflow</h2>
<p>Do one plain test prompt.</p>
<p>Seriously. Do not build a whole retrieval pipeline first.</p>
<p>If Dify can call the model and return a response, the connection is working. If it cannot, fix the provider config before moving on.</p>
<p>The most common failure points are boring, which is actually good news:</p>
<ul>
<li>Ollama is not running</li>
<li>the model was never pulled</li>
<li>the wrong model name was entered</li>
<li>Dify is trying to call <code>localhost</code> from inside Docker</li>
<li>the firewall or host networking blocks port 11434</li>
</ul>
<p>The thing is, once the provider works, the rest of the tutorial gets much easier.</p>
<h2>Step 5: Build a small first workflow</h2>
<p>Start small. Dify makes it easy to overbuild on day one.</p>
<p>A sensible first local workflow looks like this:</p>
<ol>
<li>user input</li>
<li>optional knowledge retrieval</li>
<li>one LLM step using your Ollama model</li>
<li>output</li>
</ol>
<p>That is enough to test latency, prompt quality, and whether the local model is good enough for the job you have in mind.</p>
<p>If you are still learning the Dify interface itself, <a href="/how-to-use-dify-to-build-your-first-ai-workflow-in-2026/">How to Use Dify to Build Your First AI Workflow in 2026</a> covers the broader product setup. If you are deciding between workflow builders, <a href="/dify-vs-flowise-in-2026-which-ai-workflow-builder-should-you-choose/">Dify vs Flowise in 2026</a> is the better comparison.</p>
<h2>Step 6: Watch for the real limitations</h2>
<p>This stack is useful, but it has some edges.</p>
<h3>Dify is heavier than local chat tools</h3>
<p>If you only need a private prompt box, Dify is probably more platform than you need. That is why lighter tools keep winning on pure ease of setup.</p>
<h3>Local model speed can be the bottleneck</h3>
<p>When responses feel sluggish, the fix is often model choice, not a more complicated prompt. Smaller local models are sometimes the better production decision.</p>
<h3>Some model features need extra care</h3>
<p>Dify’s Ollama marketplace documentation notes that Ollama does not officially support rerank models. So if your workflow depends on that layer, you may need another local service instead of forcing Ollama to do everything.</p>
<h3>Self-hosting means ongoing upkeep</h3>
<p>Once the first install is done, you still own updates, containers, storage, and backups. Some people are fine with that. Some discover they were really shopping for convenience.</p>
<h2>Quick verdict</h2>
<p>Dify with Ollama is worth using in 2026 if you want a local-first AI workflow builder with more structure than a simple chat app. It is especially solid for private internal tools, early RAG workflows, and teams that want tighter cost control.</p>
<p>If you want the fastest possible route to local chat, use something lighter. If you want a fuller AI app layer and you can live with a heavier setup, this is a good stack.</p>
<p>And if you try it and decide Dify is too much platform for the job, <a href="/best-dify-alternatives-in-2026-6-picks-by-workflow-fit/">Best Dify Alternatives in 2026</a> will save you a few tabs.</p>
<p><!-- aixcove-seo-refresh-2026-07 --></p>
<h2>Who should use Dify with Ollama?</h2>
<p>This setup is a good fit if you want Dify’s app-building workflow but prefer to keep model calls local. It is useful for prototypes, internal assistants, private document workflows, and teams that want to test open models before paying for hosted APIs.</p>
<p>Choose cloud models instead when quality, speed, or long-context reasoning matters more than local control. If your workflow is mostly automation rather than an AI app, read the <a href="/how-to-use-n8n-with-ollama-for-private-ai-automation-in-2026/">n8n with Ollama guide</a> as the next comparison.</p>
<h2>Dify plus Ollama vs other local AI tools</h2>
<ul>
<li><strong>Dify plus Ollama:</strong> best for building AI apps around local models.</li>
<li><strong>AnythingLLM:</strong> best for local document chat and simple private knowledge bases.</li>
<li><strong>Open WebUI:</strong> best for a local ChatGPT-style interface for multiple models.</li>
<li><strong>Flowise:</strong> best for visual LLM chains and quick experiments.</li>
</ul>
<h2>FAQ</h2>
<h3>Can Dify run fully locally with Ollama?</h3>
<p>You can keep model inference local with Ollama, but deployment details depend on how you host Dify and where your data sources live.</p>
<h3>Is Ollama good enough for production Dify apps?</h3>
<p>It can be, especially for narrow internal workflows. Test answer quality, latency, and hardware cost before replacing cloud models.</p>
<h3>What should I compare next?</h3>
<p>Compare <a href="/listing/dify/">Dify</a>, <a href="/listing/flowise/">Flowise</a>, and <a href="/listing/anythingllm/">AnythingLLM</a> based on whether you need an app builder, a chain builder, or document chat.</p>

