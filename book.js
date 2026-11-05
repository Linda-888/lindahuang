/* The book is a short entrance for work chapters. Personal and contact pages
   open directly, and each work chapter has its own visual language. */
(() => {
  const main = document.querySelector('main');
  if (!main || document.body.classList.contains('page-home')) return;

  const file = location.pathname.split('/').pop();
  const chapterNames = {
    'about.html': 'Meet Linda!',
    'projects.html': 'Projects',
    'research.html': 'Research',
    'internship.html': 'Internships',
    'extracurricular.html': 'Activities & Leadership',
    'contact.html': 'Contact',
    'research-llm.html': 'LLM research',
    'research-mental-health.html': 'Mental health research',
  };
  const chapterName = chapterNames[file];
  if (!chapterName) return;

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
  const chapterThemes = {
    research: { cover: 'Evidence<br>Files.', label: 'Research / evidence', left: 'Observe a question<br>Compare the evidence<br>Follow what the data shows', line: 'Looking closer at the evidence', mark: '<path d="M20 17h49v67H20zM30 32h27m-27 11h27m-27 11h17"/><path d="M68 68 91 91"/><circle cx="62" cy="61" r="19"/><path d="M55 55a10 10 0 0 1 10-7"/>' },
    llm: { cover: 'Model<br>Notes.', label: 'Research / learning systems', left: 'Exams as a real test<br>Prompts as design choices<br>Reliability beyond a score', line: 'Examining model reasoning', mark: '<path d="M20 91h82M29 81V55h12v26m9 0V39h12v42m9 0V48h12v33m9 0V25h12v56"/><path d="m31 46 23-15 22 8 18-24"/>' },
    health: { cover: 'Signals<br>& Care.', label: 'Research / wellbeing', left: 'Patterns in everyday life<br>Care in interpretation<br>Support before certainty', line: 'Connecting human signals', mark: '<circle cx="60" cy="54" r="15"/><circle cx="21" cy="28" r="6"/><circle cx="98" cy="27" r="6"/><circle cx="24" cy="91" r="6"/><circle cx="97" cy="91" r="6"/><path d="M47 45 27 31m46 13 20-14M47 65 29 87m43-22 20 22"/>' },
    projects: { cover: 'Making<br>Things.', label: 'Projects / in practice', left: 'Ideas meet people<br>Prototypes meet reality<br>Learning by building', line: 'Opening the workshop', mark: '<path d="M60 104V50m0 31L35 58m25 13 27-36M60 104l-23 10m23-10 24 10"/><circle cx="60" cy="35" r="23"/><circle cx="34" cy="55" r="18"/><circle cx="87" cy="51" r="19"/><circle cx="37" cy="44" r="3"/><circle cx="72" cy="29" r="3"/><circle cx="88" cy="60" r="3"/>' },
    mindjoy: { cover: 'Mind<br>Joy.', label: 'Project / reflection', left: 'Space to reflect<br>Ways to ask for support<br>Technology with care', line: 'Entering a supportive space', mark: '<path d="M60 24c13 14 23 23 23 39a23 23 0 0 1-46 0c0-16 10-25 23-39Z"/><path d="M20 69c14 24 66 25 80 0M28 39c14-18 50-19 64 0"/>' },
    jobmaxxing: { cover: 'Next<br>Move.', label: 'Project / career discovery', left: 'Start with interests<br>Explore real openings<br>Save a direction', line: 'Finding a path forward', mark: '<path d="M20 88c18-4 31-13 40-29 9-16 20-24 40-27M86 20l16 10-14 14"/><circle cx="26" cy="87" r="6"/><circle cx="61" cy="58" r="6"/><circle cx="99" cy="31" r="6"/>' },
    workbuddy: { cover: 'Work<br>Buddy.', label: 'Project / student life', left: 'Plan what matters<br>Make room to focus<br>Celebrate steady progress', line: 'Making space to study', mark: '<circle cx="60" cy="70" r="18"/><circle cx="29" cy="40" r="8"/><circle cx="49" cy="30" r="8"/><circle cx="72" cy="30" r="8"/><circle cx="92" cy="42" r="8"/>' },
    security: { cover: 'Threat<br>Map.', label: 'Project / security', left: 'Identify a risk<br>Trace the attack path<br>Make findings usable', line: 'Mapping the system', mark: '<path d="M60 16 96 30v28c0 25-14 40-36 50-22-10-36-25-36-50V30L60 16Z"/><rect x="46" y="54" width="28" height="23" rx="3"/><path d="M52 54v-7a8 8 0 0 1 16 0v7"/>' },
    'underwater-robot': { cover: 'Open<br>Water.', label: 'Project / engineering', left: 'Model the components<br>Build the hardware<br>Test beyond the lab', line: 'Going from model to water', mark: '<path d="M18 78c12-9 24-9 36 0s24 9 36 0 24-9 36 0M18 94c12-9 24-9 36 0s24 9 36 0 24-9 36 0M35 58h51c8 0 13-5 13-12v-7H48c-8 0-13 5-13 12v7Z"/><circle cx="57" cy="48" r="5"/>' },
  };
  const pageTheme = {
    'research.html': 'research',
    'research-llm.html': 'llm', 'research-mental-health.html': 'health',
    'projects.html': 'projects',
  }[file];
  const projectNotes = {
    MindJoy: {
      id: 'mindjoy', theme: 'Support, reflection, connection',
      question: 'How can a digital space make it easier to reflect and ask for support?',
      work: 'MindJoy brings self-assessment, AI Q&A, “Mood Tree Hole,” and “MindJoy Diary” into one mental-health platform.',
      contextHeading: 'Survey-informed design',
      thread: 'A questionnaire survey of 327 individuals informed MindJoy’s design. Its features offer different ways for people to reflect and seek support.',
      actions: '<a class="button" href="https://www.mindjoyspace.com/" target="_blank" rel="noopener noreferrer">Check out MindJoy platform ↗</a>',
    },
    JobMaxxing: {
      id: 'jobmaxxing', theme: 'Career exploration, made actionable',
      question: 'How can exploring what you enjoy lead to real opportunities worth investigating?',
      work: 'I built JobMaxxing as a career workspace where visitors can browse current public job postings, talk through possible directions with an AI guide, set preferences such as job type and work setup, compare a resume with openings, and save roles to revisit.',
      contextHeading: 'From interests to a shortlist',
      thread: 'The journey can begin with a conversation, a resume, or a search. An editable direction profile brings interests, skills, location, and practical needs together to surface possible connections in current listings. Matches are starting points for exploration: visitors can inspect the source and verify eligibility, pay, and availability with the employer.',
      actions: '<a class="button" href="https://jobmaxxing-linda.onrender.com/" target="_blank" rel="noopener noreferrer">Open JobMaxxing ↗</a>',
    },
    WorkBuddy: {
      id: 'workbuddy', theme: 'A study companion for everyday progress',
      question: 'How can planning and focus feel more supportive as students build a study routine?',
      work: 'I built WorkBuddy to put the essentials of studying in one workspace. Students can make to-dos, break a larger project into steps and deadlines, run a focus timer, keep PDF, EPUB, and text readings on a shelf, and review their study history.',
      contextHeading: 'Plan, focus, track, grow',
      thread: 'WorkBuddy turns a study session into a small cycle: choose the next step, spend time on it, and see the progress afterward. Daily goals and streaks make effort visible, while Peanut the hamster levels up with study time and unlocks rewards. Students can start on one device; Canvas and Google Calendar connection options help bring in assignments and plans, and signing in adds a shared profile across devices.',
      actions: '<a class="button" href="https://workbuddy.workbuddybtw.workers.dev/" target="_blank" rel="noopener noreferrer">Open WorkBuddy ↗</a>',
    },
    'AI Agent Harness': {
      id: 'security', theme: 'Security boundaries for AI agents',
      question: 'How can an AI security agent analyze a target and stay inside its authorized scope?',
      work: 'I built a local Docker lab with DVWA and mapped a simulated enterprise attack chain to MITRE ATT&CK. The agent follows a repeatable reconnaissance workflow and produces a structured findings report.',
      contextHeading: 'A four-layer safety harness',
      thread: 'CLAUDE.md defines the local lab and target scope; the recon-a-host skill guides the workflow; FastMCP connects the agent to tools; and a PreToolUse hook checks target scope, tool permissions, and parameters before each call. Eight scope checks allowed 3 in-scope targets and blocked all 5 out-of-scope targets. The report grouped findings into 8 vulnerability classes and paired them with remediation guidance.',
      actions: '',
    },
    'Underwater Robot': {
      id: 'underwater-robot', theme: 'A system for the physical world',
      question: 'What does it take to move an idea from a model into open water?',
      work: 'I modeled components, assembled hardware, programmed control logic, and completed open-water tests for a robot intended for marine exploration and freshwater assessment.',
      contextHeading: 'Learning through field tests',
      thread: 'The project brought mechanical design, software, and real-world testing together in one working system.',
      actions: '',
    },
  };

  document.body.classList.add('chapter-page');
  const directPage = ['about.html', 'internship.html', 'extracurricular.html', 'contact.html'].includes(file);
  if (directPage) document.body.classList.add('chapter-direct');
  main.classList.add('chapter-main');
  const topline = document.createElement('div');
  topline.className = 'chapter-topline';
  const noteLabel = file === 'about.html' ? 'About me' : file === 'internship.html' ? 'Internships' : file === 'extracurricular.html' ? 'Activities & leadership' : file === 'contact.html' ? 'Say hello' : 'Field notes';
  topline.innerHTML = `<span>Linda Huang / ${noteLabel}</span><a href="index.html#route-map">← Back to the route</a>`;
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

  function makeIntro(label, onDone, themeKey = pageTheme || 'projects') {
    if (activeIntro) activeIntro.finish();
    if (reducedMotion.matches) {
      onDone();
      document.body.classList.add('is-revealed');
      return;
    }

    const intro = document.createElement('div');
    intro.className = 'mystery-intro';
    intro.dataset.theme = themeKey;
    intro.setAttribute('role', 'dialog');
    intro.setAttribute('aria-label', `Opening ${label}`);
    const theme = chapterThemes[themeKey] || chapterThemes.projects;
    const leaves = Array.from({ length: 5 }, (_, index) =>
      `<span class="mystery-turn-sheet" style="--delay:${(.43 + index * .105).toFixed(3)}s;z-index:${9 - index}" aria-hidden="true"><i></i></span>`
    ).join('');
    intro.innerHTML = `
      <button type="button" class="mystery-skip">Skip intro ↗</button>
      <div class="mystery-stage">
        <div class="mystery-book" aria-hidden="true">
          <div class="mystery-page-edge"></div>
          <div class="mystery-open-pages"><div class="mystery-left-page"><span>Linda Huang</span><small>${theme.left}</small></div><div class="mystery-right-page"><span>${escapeHtml(theme.label)}</span><strong>${escapeHtml(label)}</strong><small>${escapeHtml(theme.line)}</small></div></div>
          <div class="mystery-closed-left"></div>
          ${leaves}
          <div class="mystery-cover"><span>Linda Huang</span><strong>${theme.cover}</strong><small>${escapeHtml(theme.label)}</small><svg class="mystery-cover-mark" viewBox="0 0 120 120" aria-hidden="true">${theme.mark}</svg></div>
          <div class="mystery-spine"></div>
        </div>
        <p class="mystery-caption">${escapeHtml(theme.line)} <strong>/ ${escapeHtml(label)}</strong></p>
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
      const hasCoverImage = Boolean(card.querySelector('.project-image img'));
      const visualAttributes = hasCoverImage ? '' : `role="img" aria-label="Illustration for ${escapeHtml(title)}"`;
      const visualCaption = hasCoverImage ? '' : 'Project illustration';
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
          <figure class="project-chapter-visual ${escapeHtml(imageClass)}" ${visualAttributes}>${illustration}${visualCaption ? `<figcaption>${visualCaption}</figcaption>` : ''}</figure>
          <div class="project-chapter-copy"><p class="project-chapter-meta">${escapeHtml(meta)}</p><h3>What I worked on</h3><p>${escapeHtml(note.work)}</p><h3>${escapeHtml(note.contextHeading || 'Design choices')}</h3><p>${escapeHtml(note.thread)}</p><div class="tags">${tags}</div>${note.actions ? `<div class="project-chapter-actions">${note.actions}</div>` : ''}</div>
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
        }, id);
        return;
      }
      if (event.target.closest('[data-project-back]')) {
        event.preventDefault();
        makeIntro('Projects', () => {
          history.pushState(null, '', location.pathname);
          showProject(null);
        }, 'projects');
      }
    });
    addEventListener('popstate', () => showProject(location.hash.slice(1)));
    showProject(location.hash.slice(1));
  }

  const directProject = file === 'projects.html'
    ? [...Object.entries(projectNotes)].find(([, value]) => value.id === location.hash.slice(1))?.[0]
    : null;
  const finishEntry = () => {
    if (file === 'contact.html' && location.hash === '#email') {
      const email = document.querySelector('#email');
      email?.classList.remove('is-highlighted');
      if (email) { void email.offsetWidth; email.classList.add('is-highlighted'); }
    }
  };
  if (directPage) {
    document.body.classList.add('is-revealed');
    finishEntry();
  } else {
    makeIntro(directProject || chapterName, finishEntry, directProject ? projectNotes[directProject].id : pageTheme);
  }
})();
