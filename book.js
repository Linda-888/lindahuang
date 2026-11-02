/* A short, skippable book journey introduces each chapter. The content itself
   stays in the original, readable page layout. */
(() => {
  const main = document.querySelector('main');
  if (!main || document.body.classList.contains('page-home')) return;

  const file = location.pathname.split('/').pop();
  const chapterNames = {
    'about.html': 'About',
    'story.html': 'My Story',
    'projects.html': 'Projects',
    'research.html': 'Research',
    'education.html': 'Education',
    'contact.html': 'Contact',
    'research-llm.html': 'LLM research',
    'research-mental-health.html': 'Mental health research',
  };
  const chapterName = chapterNames[file];
  if (!chapterName) return;

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;',
  })[character]);
  const projectNotes = {
    MindJoy: {
      id: 'mindjoy', theme: 'Support, reflection, connection',
      question: 'How can a digital space make it easier to reflect and ask for support?',
      work: 'MindJoy brings self-assessment, AI Q&A, “Mood Tree Hole,” and “MindJoy Diary” into one mental-health platform.',
      thread: 'The platform was informed by research with more than 400 individuals. Its features are designed around different ways people may want to express themselves.',
      actions: '<a class="button" href="http://8.137.13.98/" target="_blank" rel="noopener noreferrer">Check out MindJoy platform ↗</a>',
    },
    'Security analysis system': {
      id: 'security', theme: 'AI agents, made accountable',
      question: 'How can threat knowledge become a more usable security analysis workflow?',
      work: 'This project combines the ATT&CK framework with an AI Agent Harness for enterprise attack simulation, vulnerability assessment, and reporting.',
      thread: 'The work connects structured threat knowledge with a workflow that helps people inspect risks and communicate findings.',
      actions: '',
    },
    'Underwater Robot': {
      id: 'underwater-robot', theme: 'A system for the physical world',
      question: 'What does it take to move an idea from a model into open water?',
      work: 'I modeled components, assembled hardware, programmed control logic, and completed open-water tests for a robot intended for marine exploration and freshwater assessment.',
      thread: 'The project brought mechanical design, software, and real-world testing together in one working system.',
      actions: '',
    },
  };

  document.body.classList.add('chapter-page');
  main.classList.add('chapter-main');
  const topline = document.createElement('div');
  topline.className = 'chapter-topline';
  topline.innerHTML = '<span>Linda Huang / Field notes</span><a href="index.html#route-map">← Back to the route</a>';
  main.prepend(topline);

  let projectChapters = new Map();
  let activeIntro = null;

  function showProject(id, focus = false) {
    if (file !== 'projects.html') return;
    const projectSection = main.querySelector('#projects');
    if (!projectSection) return;
    const match = projectChapters.get(id);
    projectSection.classList.toggle('is-detail-open', Boolean(match));
    for (const [key, panel] of projectChapters) panel.hidden = key !== id;
    if (focus && match) {
      const heading = match.querySelector('h2');
      heading?.setAttribute('tabindex', '-1');
      heading?.focus({ preventScroll: true });
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function makeIntro(label, onDone) {
    if (activeIntro) activeIntro.finish();
    if (reducedMotion.matches) {
      onDone();
      document.body.classList.add('is-revealed');
      return;
    }

    const intro = document.createElement('div');
    intro.className = 'mystery-intro';
    intro.setAttribute('role', 'dialog');
    intro.setAttribute('aria-label', `Opening ${label}`);
    const leaves = Array.from({ length: 5 }, (_, index) =>
      `<span class="mystery-turn-sheet" style="--delay:${(.43 + index * .105).toFixed(3)}s;z-index:${9 - index}" aria-hidden="true"><i></i></span>`
    ).join('');
    intro.innerHTML = `
      <button type="button" class="mystery-skip">Skip intro ↗</button>
      <div class="mystery-stage">
        <div class="mystery-book" aria-hidden="true">
          <div class="mystery-page-edge"></div>
          <div class="mystery-open-pages"><div class="mystery-left-page"><span>Linda Huang</span><small>Human-centered technology<br>Education technology<br>Research & making</small></div><div class="mystery-right-page"><span>Field notes / Chapter</span><strong>${escapeHtml(label)}</strong><small>The story continues here.</small></div></div>
          <div class="mystery-closed-left"></div>
          ${leaves}
          <div class="mystery-cover"><span>Linda Huang</span><strong>Field<br>Notes.</strong><small>Ideas centered on people</small></div>
          <div class="mystery-spine"></div>
        </div>
        <p class="mystery-caption">Turning to <strong>${escapeHtml(label)}</strong></p>
      </div>`;
    document.body.append(intro);
    document.body.classList.remove('is-revealed');
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    let finished = false;
    let timer;
    const onKey = (event) => { if (event.key === 'Escape') finish(); };
    const finish = () => {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      document.removeEventListener('keydown', onKey);
      onDone();
      document.body.classList.add('is-revealed');
      document.body.style.overflow = originalOverflow;
      intro.classList.add('is-exiting');
      window.setTimeout(() => intro.remove(), 280);
      if (activeIntro?.finish === finish) activeIntro = null;
    };
    activeIntro = { finish };
    intro.querySelector('.mystery-skip').addEventListener('click', finish);
    document.addEventListener('keydown', onKey);
    requestAnimationFrame(() => intro.classList.add('is-playing'));
    timer = window.setTimeout(finish, 1530);
  }

  if (file === 'projects.html') {
    const grid = main.querySelector('.project-grid');
    const cards = [...(grid?.querySelectorAll('.project') || [])];
    cards.forEach((card) => {
      const title = card.querySelector('h3')?.textContent.trim();
      const note = projectNotes[title];
      if (!note) return;
      const body = card.querySelector('.project-body');
      const meta = body.querySelector(':scope > span')?.textContent.trim() || '';
      const illustration = card.querySelector('.project-image')?.innerHTML || '';
      const imageClass = card.querySelector('.project-image')?.className || '';
      const tags = [...card.querySelectorAll('.tags span')].map((tag) => `<span>${escapeHtml(tag.textContent.trim())}</span>`).join('');
      const actions = document.createElement('div');
      actions.className = 'project-card-actions';
      actions.innerHTML = `<a class="button" href="#${note.id}" data-open-project="${note.id}">Explore project ↗</a>`;
      const platform = body.querySelector('.mindjoy-link');
      if (platform) actions.append(platform);
      body.append(actions);

      const panel = document.createElement('section');
      panel.className = 'project-chapter';
      panel.id = note.id;
      panel.hidden = true;
      panel.innerHTML = `
        <a class="project-back" href="projects.html" data-project-back>← All projects</a>
        <p class="project-chapter-kicker">${escapeHtml(note.theme)}</p>
        <h2>${escapeHtml(title)}</h2>
        <p class="project-chapter-question">${escapeHtml(note.question)}</p>
        <div class="project-chapter-layout">
          <figure class="project-chapter-visual ${escapeHtml(imageClass)}" role="img" aria-label="Illustration for ${escapeHtml(title)}">${illustration}<figcaption>Project illustration</figcaption></figure>
          <div class="project-chapter-copy"><p class="project-chapter-meta">${escapeHtml(meta)}</p><h3>What I worked on</h3><p>${escapeHtml(note.work)}</p><h3>The human-centered thread</h3><p>${escapeHtml(note.thread)}</p><div class="tags">${tags}</div>${note.actions ? `<div class="project-chapter-actions">${note.actions}</div>` : ''}</div>
        </div>`;
      grid.after(panel);
      projectChapters.set(note.id, panel);
    });

    main.addEventListener('click', (event) => {
      const projectLink = event.target.closest('[data-open-project]');
      if (projectLink) {
        event.preventDefault();
        const id = projectLink.dataset.openProject;
        const title = cards.find((card) => projectNotes[card.querySelector('h3')?.textContent.trim()]?.id === id)?.querySelector('h3')?.textContent.trim() || 'Project';
        makeIntro(title, () => {
          history.pushState(null, '', `#${id}`);
          showProject(id, true);
        });
        return;
      }
      if (event.target.closest('[data-project-back]')) {
        event.preventDefault();
        makeIntro('Projects', () => {
          history.pushState(null, '', location.pathname);
          showProject(null);
        });
      }
    });
    addEventListener('popstate', () => showProject(location.hash.slice(1)));
    showProject(location.hash.slice(1));
  }

  const directProject = file === 'projects.html'
    ? [...Object.entries(projectNotes)].find(([, value]) => value.id === location.hash.slice(1))?.[0]
    : null;
  makeIntro(directProject || chapterName, () => {
    if (file === 'contact.html' && location.hash === '#email') {
      const email = document.querySelector('#email');
      email?.classList.remove('is-highlighted');
      if (email) { void email.offsetWidth; email.classList.add('is-highlighted'); }
    }
  });
})();
