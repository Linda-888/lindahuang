/* The inner pages are leaves of one field notebook. The original HTML remains
   readable when JavaScript is unavailable; this script turns it into the book. */
(() => {
  const main = document.querySelector('main');
  if (!main || document.body.classList.contains('page-home')) return;

  const stations = [
    ['about.html', 'About'], ['story.html', 'My Story'],
    ['research.html', 'Research'], ['projects.html', 'Projects'],
    ['education.html', 'Education'], ['contact.html', 'Contact'],
  ];
  const file = location.pathname.split('/').pop();
  const isResearchDetail = file === 'research-llm.html' || file === 'research-mental-health.html';
  const section = isResearchDetail ? 'Research' : stations.find(([href]) => href === file)?.[1] || 'Portfolio';
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const narrow = matchMedia('(max-width: 780px)');
  const safe = (value = '') => String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
  const text = (root, selector) => root?.querySelector(selector)?.textContent.trim() || '';
  const markup = (root, selector) => root?.querySelector(selector)?.outerHTML || '';
  const paragraph = (value) => `<p>${safe(value)}</p>`;
  const tagList = (values) => `<div class="book-tags">${values.map((value) => `<span>${safe(value)}</span>`).join('')}</div>`;
  const cta = (href, label, external = false) => `<a class="book-link" href="${safe(href)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${safe(label)} <span aria-hidden="true">↗</span></a>`;
  const spread = (id, title, left, right) => ({ id, title, left, right });
  const contentsCard = ({ id, label, title, summary, image, meta }, compact = false) => `
    <a class="book-index-card${compact ? ' book-index-card--compact' : ''}" href="#${safe(id)}" data-book-to="${safe(id)}">
      <span class="book-index-art">${image}</span>
      <span class="book-index-copy"><small>${safe(label)}</small><strong>${safe(title)}</strong><span>${safe(summary)}</span><b>Open chapter <span aria-hidden="true">↗</span></b></span>
    </a>`;

  let spreads = [];

  if (file === 'projects.html') {
    const projectDetails = {
      MindJoy: {
        id: 'mindjoy', theme: 'Support, reflection, connection',
        question: 'How can a digital space make it easier to reflect and ask for support?',
        work: 'MindJoy brings self-assessment, AI Q&A, “Mood Tree Hole,” and “MindJoy Diary” into one mental-health platform.',
        note: 'The platform was informed by research with more than 400 individuals. Its features are designed around different ways people may want to express themselves.',
        points: ['Self-assessment', 'AI Q&A', 'Mood Tree Hole', 'MindJoy Diary'],
        action: cta('http://8.137.13.98/', 'Check out MindJoy platform', true),
      },
      'Security analysis system': {
        id: 'security', theme: 'AI agents, made accountable',
        question: 'How can threat knowledge become a more usable security analysis workflow?',
        work: 'This project combines the ATT&CK framework with an AI Agent Harness for enterprise attack simulation, vulnerability assessment, and reporting.',
        note: 'The work connects structured threat knowledge with a workflow that helps people inspect risks and communicate findings.',
        points: ['ATT&CK framework', 'AI Agent Harness', 'Attack simulation', 'Security reporting'],
        action: '',
      },
      'Underwater Robot': {
        id: 'underwater-robot', theme: 'A system for the physical world',
        question: 'What does it take to move an idea from a model into open water?',
        work: 'I modeled components, assembled hardware, programmed control logic, and completed open-water tests for a robot intended for marine exploration and freshwater assessment.',
        note: 'The project brought mechanical design, software, and real-world testing together in one working system.',
        points: ['Component modeling', 'Hardware assembly', 'Control logic', 'Open-water testing'],
        action: '',
      },
    };
    const projects = [...main.querySelectorAll('.project')].map((node) => {
      const title = text(node, 'h3');
      return {
        ...projectDetails[title], title,
        meta: text(node, '.project-body > span'),
        summary: text(node, '.project-body > p'),
        tags: [...node.querySelectorAll('.tags span')].map((tag) => tag.textContent.trim()),
        image: node.querySelector('.project-image')?.innerHTML || '',
        artClass: node.querySelector('.project-image')?.className || '',
      };
    }).filter((item) => item.id);
    const previews = projects.map((item) => ({
      id: item.id, label: item.meta.split(' · ')[0], title: item.title,
      summary: item.summary, image: item.image, meta: item.meta,
    }));
    spreads.push(spread('contents', 'Projects', `
      <div class="book-chapter-kicker">Selected projects</div>
      <h1 class="book-display">Ideas put<br><em>to work.</em></h1>
      <p class="book-lede">Three different ways of turning a question into something people can use, test, or learn from.</p>
      <div class="book-index-feature">${contentsCard(previews[0])}</div>
    `, `
      <div class="book-chapter-kicker">Explore the chapters</div>
      <h2 class="book-side-title">Inside this book</h2>
      <div class="book-index-stack">${previews.slice(1).map((item) => contentsCard(item, true)).join('')}</div>
      <p class="book-small-note">Select a project to turn to its chapter.</p>
    `));
    projects.forEach((item) => spreads.push(spread(item.id, item.title, `
      <a class="book-back" href="#contents" data-book-to="contents">← Projects</a>
      <div class="book-chapter-kicker">Project chapter</div>
      <div class="book-project-art ${safe(item.artClass)}" role="img" aria-label="Existing abstract illustration for ${safe(item.title)}">${item.image}</div>
      <p class="book-art-caption">Project illustration</p>
      <p class="book-project-date">${safe(item.meta)}</p>
      ${tagList(item.tags)}
    `, `
      <div class="book-chapter-kicker">${safe(item.theme)}</div>
      <h1 class="book-chapter-title">${safe(item.title)}</h1>
      <p class="book-chapter-question">${safe(item.question)}</p>
      <div class="book-rule"></div>
      <h2>What I worked on</h2>${paragraph(item.work)}
      <h2>The human-centered thread</h2>${paragraph(item.note)}
      <div class="book-chips">${item.points.map((point) => `<span>${safe(point)}</span>`).join('')}</div>
      ${item.action ? `<div class="book-chapter-actions">${item.action}</div>` : ''}
    `)));
  } else if (file === 'research.html') {
    const facts = {
      'research-llm.html': {
        id: 'llm-exams', theme: 'Education technology · LLM evaluation',
        question: 'How reliable are language models when a real examination asks for careful reading and multi-step reasoning?',
        method: 'The study compares four language models across mathematics, physics, computer science, and geography, using benchmark questions and custom examination sets.',
        finding: 'Prompt design changed results, but models still made distinct reading, parsing, computation, and reasoning errors.',
        highlights: ['4 models', 'About 1,500 benchmark questions', '4 prompt styles'],
      },
      'research-mental-health.html': {
        id: 'mental-health', theme: 'Human-centered data · Mental health',
        question: 'Can patterns in academic and everyday life support earlier recognition of adolescent mental-health risk?',
        method: 'The study examines academic pressure, sleep, study hours, performance, and psychological indicators through a multimodal machine-learning framework.',
        finding: 'Four models were compared. XGBoost reached an AUC-ROC of about 0.961; the study also discusses privacy, bias, and limits before real-world use.',
        highlights: ['4 models', 'AUC-ROC 0.961', 'Academic + lifestyle signals'],
      },
    };
    const studies = [...main.querySelectorAll('.research-item')].map((node) => {
      const detail = node.querySelector('a[href$=".html"]')?.getAttribute('href');
      const paper = node.querySelector('a[href$=".pdf"]')?.getAttribute('href');
      const image = node.querySelector('.research-card-image img');
      return {
        ...facts[detail], title: text(node, 'h3'), summary: text(node, '.research-content > p:not(.item-meta)'),
        meta: text(node, '.item-meta'), detail, paper,
        image: image ? `<img src="${safe(image.getAttribute('src'))}" alt="${safe(image.getAttribute('alt'))}">` : '',
        caption: text(node, 'figcaption'),
        tags: [...node.querySelectorAll('.tags span')].map((tag) => tag.textContent.trim()),
      };
    }).filter((item) => item.id);
    const previews = studies.map((item) => ({ ...item, label: item.meta }));
    spreads.push(spread('contents', 'Research', `
      <div class="book-chapter-kicker">Selected research</div>
      <h1 class="book-display">Questions<br><em>worth testing.</em></h1>
      <p class="book-lede">Research at the meeting point of intelligent systems, education, and human well-being.</p>
      ${contentsCard(previews[0])}
    `, `
      <div class="book-chapter-kicker">Explore the studies</div>
      <h2 class="book-side-title">Inside this book</h2>
      ${contentsCard(previews[1])}
      <p class="book-small-note">Each chapter introduces the question and points to the complete analysis and paper.</p>
    `));
    studies.forEach((item) => spreads.push(spread(item.id, item.title, `
      <a class="book-back" href="#contents" data-book-to="contents">← Research</a>
      <div class="book-chapter-kicker">Research chapter</div>
      <figure class="book-research-figure">${item.image}<figcaption>From the paper · ${safe(item.caption)}</figcaption></figure>
      ${tagList(item.tags)}
    `, `
      <div class="book-chapter-kicker">${safe(item.theme)}</div>
      <h1 class="book-chapter-title">${safe(item.title)}</h1>
      <p class="book-chapter-question">${safe(item.question)}</p>
      <div class="book-rule"></div>
      <h2>Approach</h2>${paragraph(item.method)}
      <h2>What the paper found</h2>${paragraph(item.finding)}
      <div class="book-chips">${item.highlights.map((value) => `<span>${safe(value)}</span>`).join('')}</div>
      <div class="book-chapter-actions">${cta(item.detail, 'Explore the full analysis')}${cta(item.paper, 'View the paper', true)}</div>
    `)));
  } else if (isResearchDetail) {
    const sections = [...main.querySelectorAll(':scope > section')];
    sections.forEach((node, index) => {
      const heading = node.querySelector('h1, h2');
      const copy = node.cloneNode(true);
      copy.querySelector('.section-number')?.remove();
      copy.querySelector('h1, h2')?.remove();
      const label = text(node, '.section-number') || (index === 0 ? 'Research' : 'Study notes');
      const title = heading?.textContent.trim() || label;
      spreads.push(spread(index === 0 ? 'chapter' : `section-${index}`, title, `
        <a class="book-back" href="research.html">← Research chapters</a>
        <div class="book-chapter-kicker">${safe(label)}</div>
        <div class="book-detail-heading">${heading?.outerHTML || `<h1>${safe(title)}</h1>`}</div>
        <p class="book-detail-aside">Turn the page for methods, findings, and figures from the full study.</p>
      `, `<div class="book-detail-body">${copy.innerHTML}</div>`));
    });
  } else if (file === 'about.html') {
    const about = main.querySelector('#about');
    spreads.push(spread('chapter', 'About', `
      <div class="book-chapter-kicker">About Linda</div>
      <h1 class="book-display">Technology<br><em>for people.</em></h1>
      <p class="book-lede">${safe(text(about, 'h2'))}</p>
      <div class="book-abstract book-abstract--about" aria-hidden="true"><span></span><i></i><b></b></div>
    `, `
      <div class="book-chapter-kicker">Where I work</div>
      <h2 class="book-side-title">Hello, I’m Linda.</h2>
      <div class="book-reading-copy">${about?.querySelector('.about-copy')?.innerHTML || ''}</div>
      ${cta('story.html', 'Read my story')}
    `));
  } else if (file === 'story.html') {
    const story = main.querySelector('#story');
    spreads.push(spread('chapter', 'My Story', `
      <div class="book-chapter-kicker">My Story</div>
      <h1 class="book-display">Curiosity,<br><em>care & change.</em></h1>
      <p class="book-lede">${safe(text(story, 'h2'))}</p>
      <div class="book-abstract book-abstract--story" aria-hidden="true"><span></span><i></i><b></b></div>
    `, `
      <div class="book-chapter-kicker">The path so far</div>
      <h2 class="book-side-title">What shaped the questions</h2>
      <div class="book-reading-copy">${story?.querySelector('.story-copy')?.innerHTML || ''}</div>
    `));
    spreads.push(spread('approach', 'My approach', `
      <div class="book-chapter-kicker">How I approach the work</div>
      <h1 class="book-display">Ask.<br><em>Explore.</em><br>Share.</h1>
      <p class="book-lede">The best tools begin by paying attention.</p>
    `, `
      <div class="book-chapter-kicker">A working practice</div>
      <div class="book-story-steps">${story?.querySelector('.story-steps')?.innerHTML || ''}</div>
      ${cta('research.html', 'Explore the research')}
    `));
  } else if (file === 'education.html') {
    const education = main.querySelector('#experience');
    const articles = [...(education?.querySelectorAll('.timeline article') || [])];
    spreads.push(spread('chapter', 'Education', `
      <div class="book-chapter-kicker">Education & teaching</div>
      <h1 class="book-display">Learning<br><em>by doing.</em></h1>
      <p class="book-lede">Academic training and teaching experiences across classrooms and community programs.</p>
      <div class="book-education-feature">${education?.querySelector('.education-feature')?.innerHTML || ''}</div>
    `, `
      <div class="book-chapter-kicker">Beyond the classroom</div>
      <h2 class="book-side-title">Where learning happens</h2>
      <div class="book-education-list">${articles.map((article) => `<article><small>${safe(text(article, 'span'))}</small><h3>${safe(text(article, 'h3'))}</h3>${paragraph(text(article, 'p'))}</article>`).join('')}</div>
    `));
  } else if (file === 'contact.html') {
    const contact = main.querySelector('#contact');
    spreads.push(spread('chapter', 'Contact', `
      <div class="book-chapter-kicker">Contact</div>
      <h1 class="book-display">Let’s build<br><em>something<br>thoughtful.</em></h1>
      <p class="book-lede">${safe(text(contact, ':scope > p'))}</p>
      <div class="book-abstract book-abstract--contact" aria-hidden="true"><span></span><i></i><b></b></div>
    `, `
      <div class="book-chapter-kicker">Continue the conversation</div>
      <h2 class="book-side-title">Get in touch</h2>
      <div class="book-contact-links">${markup(contact, '.contact-email')}${markup(contact, '.contact-linkedin')}${markup(contact, '.contact-github')}</div>
      <div class="book-contact-meta">${contact?.querySelector('.contact-footer')?.innerHTML || ''}</div>
    `));
  }

  if (!spreads.length) return;
  document.body.classList.add('book-experience');
  const tabs = stations.map(([href, label]) => `<a href="${href}"${label === section ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  main.className = 'book-main';
  main.innerHTML = `
    <div class="book-atmosphere" aria-hidden="true"><i></i><i></i><i></i></div>
    <div class="book-layout">
      <div class="book-overline"><a href="index.html#route-map">← Return to the route</a><span>Linda Huang / Field notes</span><span>${safe(section)}</span></div>
      <div class="book-scene">
        <div class="book-stack" aria-hidden="true"></div>
        <div class="book-surface" tabindex="-1" aria-label="${safe(section)} book"><div class="book-pages"></div></div>
      </div>
      <div class="book-controls"><button type="button" class="book-control book-prev" aria-label="Turn to previous page"><span aria-hidden="true">←</span> Previous page</button><span class="book-position" role="status" aria-live="polite"></span><button type="button" class="book-control book-next" aria-label="Turn to next page">Next page <span aria-hidden="true">→</span></button></div>
      <nav class="book-chapter-nav" aria-label="Other chapters">${tabs}</nav>
    </div>`;

  const surface = main.querySelector('.book-surface');
  const pages = main.querySelector('.book-pages');
  const previous = main.querySelector('.book-prev');
  const next = main.querySelector('.book-next');
  const position = main.querySelector('.book-position');
  const leaf = (content, side, title) => `<section class="book-leaf book-leaf--${side}"><div class="book-leaf-head"><span>Linda Huang</span><span>${safe(title)}</span></div><div class="book-leaf-body">${content}</div><div class="book-leaf-foot"><span>Human-centered technology</span><span>${side === 'left' ? '◂' : '▸'}</span></div></section>`;
  const spreadFromHash = () => {
    const id = location.hash.slice(1);
    if (id === 'email' && file === 'contact.html') return 0;
    return Math.max(0, spreads.findIndex((item) => item.id === id));
  };
  let leafIndex = spreadFromHash() * 2 + (narrow.matches && location.hash === '#email' ? 1 : 0);
  let turning = false;
  const lastLeaf = spreads.length * 2 - 1;
  const currentStep = () => narrow.matches ? 1 : 2;
  const pageContent = (index) => {
    const entry = spreads[Math.floor(index / 2)];
    return leaf(index % 2 ? entry.right : entry.left, index % 2 ? 'right' : 'left', entry.title);
  };
  const render = () => {
    leafIndex = Math.max(0, Math.min(lastLeaf, leafIndex));
    const spreadIndex = Math.floor(leafIndex / 2);
    pages.innerHTML = narrow.matches
      ? pageContent(leafIndex)
      : pageContent(spreadIndex * 2) + pageContent(spreadIndex * 2 + 1);
    position.textContent = `${section} / ${spreads[spreadIndex].title}${narrow.matches ? (leafIndex % 2 ? ' · continued' : '') : ''}`;
    previous.disabled = leafIndex === 0;
    next.disabled = narrow.matches ? leafIndex === lastLeaf : spreadIndex === spreads.length - 1;
    main.dataset.chapter = spreads[spreadIndex].id;
    if (file === 'contact.html' && location.hash === '#email') pages.querySelector('#email')?.classList.add('is-highlighted');
  };
  const turnTo = (index, options = {}) => {
    const target = Math.max(0, Math.min(lastLeaf, narrow.matches ? index : Math.floor(index / 2) * 2));
    if (turning || target === leafIndex) return;
    const forward = target > leafIndex;
    const oldLeaf = narrow.matches ? leafIndex : leafIndex + (forward ? 1 : 0);
    const newLeaf = narrow.matches ? target : target + (forward ? 0 : 1);
    const finish = () => {
      leafIndex = target;
      render();
      if (options.history !== false) history.pushState(null, '', `#${spreads[Math.floor(target / 2)].id}`);
      if (options.focus) { const heading = pages.querySelector('h1, h2, h3'); heading?.setAttribute('tabindex', '-1'); heading?.focus({ preventScroll: true }); }
      turning = false;
    };
    if (reducedMotion.matches) { finish(); return; }
    turning = true;
    const sheet = document.createElement('div');
    sheet.className = `book-turn-sheet ${forward ? 'book-turn-sheet--forward' : 'book-turn-sheet--backward'}`;
    sheet.setAttribute('aria-hidden', 'true');
    sheet.innerHTML = `<div class="book-turn-face book-turn-front">${pageContent(oldLeaf)}</div><div class="book-turn-face book-turn-back">${pageContent(newLeaf)}</div>`;
    surface.append(sheet);
    sheet.addEventListener('animationend', (event) => { if (event.target === sheet) { sheet.remove(); turning = false; } });
    window.setTimeout(() => {
      leafIndex = target;
      render();
      if (options.history !== false) history.pushState(null, '', `#${spreads[Math.floor(target / 2)].id}`);
      if (options.focus) { const heading = pages.querySelector('h1, h2, h3'); heading?.setAttribute('tabindex', '-1'); heading?.focus({ preventScroll: true }); }
    }, 330);
  };
  render();

  if (!reducedMotion.matches) {
    const cover = document.createElement('div');
    cover.className = 'book-opening-cover';
    cover.setAttribute('aria-hidden', 'true');
    cover.innerHTML = `<span>Linda Huang</span><strong>${safe(section)}</strong><small>Open the chapter ↗</small>`;
    surface.append(cover);
    cover.addEventListener('animationend', () => cover.remove(), { once: true });
  }

  previous.addEventListener('click', () => turnTo(leafIndex - currentStep(), { focus: true }));
  next.addEventListener('click', () => turnTo(leafIndex + currentStep(), { focus: true }));
  main.addEventListener('click', (event) => {
    const link = event.target.closest('[data-book-to]');
    if (!link) return;
    const index = spreads.findIndex((entry) => entry.id === link.dataset.bookTo);
    if (index < 0) return;
    event.preventDefault();
    turnTo(index * 2, { focus: true });
  });
  document.addEventListener('keydown', (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey || /INPUT|TEXTAREA|SELECT/.test(event.target.tagName)) return;
    if (event.key === 'ArrowRight' && !next.disabled) { event.preventDefault(); turnTo(leafIndex + currentStep(), { focus: false }); }
    if (event.key === 'ArrowLeft' && !previous.disabled) { event.preventDefault(); turnTo(leafIndex - currentStep(), { focus: false }); }
  });
  let touchStart = null;
  surface.addEventListener('touchstart', (event) => {
    const point = event.changedTouches[0];
    touchStart = { x: point.clientX, y: point.clientY };
  }, { passive: true });
  surface.addEventListener('touchend', (event) => {
    if (!touchStart) return;
    const point = event.changedTouches[0];
    const dx = point.clientX - touchStart.x;
    const dy = point.clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) < 75 || Math.abs(dx) < Math.abs(dy) * 1.4 || event.target.closest('a,button')) return;
    if (dx < 0 && !next.disabled) turnTo(leafIndex + currentStep());
    if (dx > 0 && !previous.disabled) turnTo(leafIndex - currentStep());
  }, { passive: true });
  addEventListener('popstate', () => { leafIndex = spreadFromHash() * 2 + (narrow.matches && location.hash === '#email' ? 1 : 0); render(); });
  narrow.addEventListener('change', () => { leafIndex = Math.floor(leafIndex / 2) * 2; render(); });
})();
