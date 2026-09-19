document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',event=>{const target=document.querySelector(link.getAttribute('href'));if(target){event.preventDefault();target.scrollIntoView({behavior:'smooth'})}}));
const cards=document.querySelectorAll('.project-card');
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('seen')}),{threshold:.15});
cards.forEach(card=>observer.observe(card));
const experienceSection=document.querySelector('#experience');
const timeline=experienceSection?.querySelector('.timeline');
if(timeline){
  timeline.querySelectorAll('article').forEach(article=>{
    if(article.textContent.includes('University of Illinois Urbana-Champaign'))article.remove();
  });
  const educationCard=document.createElement('div');
  educationCard.className='education-feature';
  educationCard.innerHTML='<div><h3>University of Illinois Urbana-Champaign</h3><p>B.S. in Computer Science + Education, Learning Sciences · Expected May 2030</p></div><strong>UIUC</strong>';
  timeline.before(educationCard);
}
const resumeLink=document.querySelector('.teach-links a[href^="/Users/"]');
if(resumeLink){resumeLink.href='mailto:lindah6@illinois.edu?subject=Resume%20request';resumeLink.textContent='Ask for my résumé ↗';}
document.querySelectorAll('.brand').forEach(el=>{el.textContent='Linda Huang';});
document.querySelector('.nav-search')?.remove();
const aboutNav=document.querySelector('.nav nav a[href="#about"]');
if(aboutNav){
  const storyNav=document.createElement('a');
  storyNav.href='#story';
  storyNav.textContent='My Story';
  aboutNav.after(storyNav);
}
const aboutSection=document.querySelector('#about');
const researchSection=document.querySelector('#research');
if(aboutSection&&researchSection){
  const storySection=document.createElement('section');
  storySection.className='story section';
  storySection.id='story';
  storySection.innerHTML='<div class="section-number">02 / My Story</div><div class="story-layout"><h2>A path shaped by <em>curiosity, care, and change.</em></h2><div class="story-copy"><p>I started with a nontraditional path through homeschool, where learning often meant following a question farther than the textbook expected.</p><p>At UIUC, I found a home in Computer Science + Education, Learning Sciences — a place where technical systems and human experience could belong in the same conversation.</p><p>Since then, research, teaching, and community work have kept showing me the same thing: the best tools begin by paying attention.</p></div></div><div class="story-steps"><div><span>01</span><b>Ask</b><p>Start with the person and the question.</p></div><div><span>02</span><b>Explore</b><p>Test ideas across disciplines and contexts.</p></div><div><span>03</span><b>Share</b><p>Make what I learn useful to others.</p></div></div>';
  researchSection.before(storySection);
}
const sectionNumbers={research:'03 / Research',projects:'04 / Key Projects',experience:'05 / Education & Teaching',contact:'06 / Contact'};
Object.entries(sectionNumbers).forEach(([id,label])=>{const marker=document.querySelector(`#${id} .section-number`);if(marker)marker.textContent=label;});
const projectsHeading=document.querySelector('#projects h2');
if(projectsHeading)projectsHeading.textContent='Building tools for minds, classrooms, and communities.';
const getInTouch=document.querySelector('.hero-actions .text-link');
if(getInTouch)getInTouch.href='contact.html#email';
const aboutHeading=document.querySelector('#about h2');
if(aboutHeading)aboutHeading.textContent='Building systems that support people and center the human experience.';
const contactEmail=document.querySelector('.contact-email');
if(contactEmail){
  const linkedin=document.createElement('a');
  linkedin.className='contact-linkedin';
  linkedin.href='https://www.linkedin.com/in/lingya-huang-1180a6435';
  linkedin.target='_blank';
  linkedin.rel='noopener noreferrer';
  linkedin.textContent='LinkedIn ↗';
  contactEmail.after(linkedin);
  const github=document.createElement('a');
  github.className='contact-github';
  github.href='https://github.com/Linda-888';
  github.target='_blank';
  github.rel='noopener noreferrer';
  github.textContent='GitHub ↗';
  linkedin.after(github);
}
const portraitHead=document.querySelector('.portrait-head');
if(portraitHead)portraitHead.textContent='Linda Huang';
const heroRight=document.querySelector('.hero-right');
if(heroRight){
  heroRight.innerHTML='<div class="hero-panel"><div class="hero-panel-top"><span>Research direction</span><i>2026</i></div><div class="hero-panel-main"><span class="panel-mark">LH</span><div><strong>Building human-centered systems</strong><p>Researching how intelligent technology can support mental health, learning, and everyday communication.</p></div></div><div class="hero-panel-details"><div><span>School</span><b>University of Illinois<br>Urbana-Champaign</b></div><div><span>Major</span><b>Computer Science<br>+ Education</b></div><div><span>Interests</span><b>AI · Data Structures<br>Learning Sciences</b></div></div><div class="hero-panel-footer"><span>Open to thoughtful collaboration</span><a href="contact.html#email">Email me ↗</a></div></div>';
}
const heroRole=document.querySelector('.hero-role');
if(heroRole){
  heroRole.textContent='Human-centered AI, learning sciences, and data structures.';
  const educationLine=document.createElement('p');
  educationLine.className='hero-education';
  educationLine.innerHTML='<span>B.S. in Computer Science + Education, Learning Sciences</span><span>University of Illinois Urbana-Champaign</span>';
  heroRole.after(educationLine);
}
const heroEyebrow=document.querySelector('.hero .eyebrow');
if(heroEyebrow)heroEyebrow.textContent='Computer Science + Education';
document.querySelectorAll('.focus-tags span').forEach(tag=>{if(tag.textContent.trim()==='Robotics')tag.textContent='Data Structures';});
const mindjoyHeading=[...document.querySelectorAll('.project h3')].find(el=>el.textContent.trim()==='MindJoy');
if(mindjoyHeading){
  const mindjoyButton=document.createElement('a');
  mindjoyButton.className='mindjoy-link';
  mindjoyButton.href='http://8.137.13.98/';
  mindjoyButton.target='_blank';
  mindjoyButton.rel='noopener noreferrer';
  mindjoyButton.textContent='Check out MindJoy platform ↗';
  mindjoyHeading.closest('.project-body').appendChild(mindjoyButton);
}
const heroArea=document.querySelector('.hero');
const focusArea=heroArea?.querySelector('.hero-right');
if(heroArea&&focusArea){focusArea.remove();heroArea.classList.add('hero-solo');}
const heroRoleUpdated=document.querySelector('.hero-role');
if(heroRoleUpdated)heroRoleUpdated.textContent='Human-Computer Interaction, Education Technology, and human-centered AI.';
const aboutCopy=document.querySelector('#about .about-copy');
if(aboutCopy){
  aboutCopy.innerHTML='<p>Hi, I’m Linda Huang, a Computer Science + Education, Learning Sciences student at the University of Illinois Urbana-Champaign.</p><p>My story is centered on Human-Computer Interaction and Education Technology: how people understand systems, how learning tools support real lives, and how technology can feel more accessible and humane.</p><p>I’m interested in designing experiences that connect technical ideas to classrooms, communities, and everyday communication.</p><div class="focus-tags"><span>Human-Computer Interaction</span><span>Education Technology</span><span>Artificial Intelligence</span><span>Data Structures</span></div>';
}
const researchIntro=document.querySelector('#research .section-intro');
if(researchIntro)researchIntro.textContent='Selected research in language-model evaluation and early mental-health forecasting.';
const researchListUpdated=document.querySelector('#research .research-list');
if(researchListUpdated){
  researchListUpdated.innerHTML=`<article class="research-item"><span class="item-number">01</span><div class="research-content"><p class="item-meta">Co-author · Research article</p><h3>LLM Performance on Standardized Examinations</h3><p>Compared ChatGPT-5, Gemini 2.5 Pro, ChatGLM-4.5, and DeepSeek-V3 across mathematics, physics, computer science, and geography. The study combines benchmark datasets with custom exam sets to examine reliability, prompt design, and model-specific error patterns.</p><figure class="research-media llm-media" aria-label="Illustration of a large language model evaluation workflow"><div class="media-kicker">BENCHMARK / 01</div><div class="model-row"><span>Gemini</span><i class="bar bar-one"></i><b>best overall</b></div><div class="model-row"><span>GPT-5</span><i class="bar bar-two"></i><b>reasoning</b></div><div class="model-row"><span>DeepSeek</span><i class="bar bar-three"></i><b>specialist</b></div><div class="media-foot"><span>~1,500 benchmark questions</span><span>4 prompt styles</span></div></figure><div class="research-actions"><a class="button" href="research-llm-standardized-exams.pdf" target="_blank" rel="noopener noreferrer">View the paper ↗</a><a class="text-link" href="research-llm.html">Learn more about the research</a></div><div class="tags"><span>LLM evaluation</span><span>Educational assessment</span><span>Prompt strategy</span></div></div></article><article class="research-item"><span class="item-number">02</span><div class="research-content"><p class="item-meta">Lead author · Research article</p><h3>Predictive Analytics for Adolescent Mental Health</h3><p>Developed a multimodal framework that connects academic pressure, sleep, study hours, performance, and psychological indicators to early mental-health forecasting. Four models were compared, with XGBoost reaching an AUC-ROC of about 0.961.</p><figure class="research-media health-media" aria-label="Illustration of connected survey signals used in an early mental-health detection system"><div class="media-kicker">SIGNALS / MULTIMODAL DATA</div><div class="signal-map"><span class="signal-node node-center">risk</span><span class="signal-node node-sleep">sleep</span><span class="signal-node node-stress">stress</span><span class="signal-node node-study">study</span><span class="signal-node node-social">lifestyle</span><span class="signal-line line-a"></span><span class="signal-line line-b"></span><span class="signal-line line-c"></span><span class="signal-line line-d"></span></div><div class="media-foot"><span>behavior + academic + lifestyle</span><span>AUC-ROC 0.961</span></div></figure><div class="research-actions"><a class="button" href="research-adolescent-mental-health.pdf" target="_blank" rel="noopener noreferrer">View the paper ↗</a><a class="text-link" href="research-mental-health.html">Learn more about the research</a></div><div class="tags"><span>Machine learning</span><span>Adolescent mental health</span><span>Human-centered data</span></div></div></article>`;
}
const projectGridUpdated=document.querySelector('#projects .project-grid');
if(projectGridUpdated){
  projectGridUpdated.innerHTML='<article class="project"><div class="project-image project-mindjoy">☼</div><div class="project-body"><span>Founder · Remote · October 2023 - Present</span><h3>MindJoy</h3><p>Built an integrated AI mental-health platform with self-assessment, AI Q&amp;A, “Mood Tree Hole,” and “MindJoy Diary,” informed by research with more than 400 individuals.</p><div class="tags"><span>AI Q&amp;A</span><span>HCI</span><span>Education technology</span></div></div></article><article class="project"><div class="project-image project-security">⌁</div><div class="project-body"><span>Independent Research · Tencent Spark Programme · June 2026 - August 2026</span><h3>Security analysis system</h3><p>Combined ATT&amp;CK with an AI Agent Harness for enterprise attack simulation, vulnerability assessment, and security reporting.</p><div class="tags"><span>AI agents</span><span>ATT&amp;CK</span><span>Risk analysis</span></div></div></article><article class="project"><div class="project-image project-robot">≈</div><div class="project-body"><span>Project Lead · Shenzhen, China · July 2025 - October 2025</span><h3>Underwater Robot</h3><p>Modeled components, assembled hardware, programmed control logic, and completed open-water tests for marine exploration and freshwater assessment.</p><div class="tags"><span>Robotics</span><span>Hardware</span><span>Open water</span></div></div></article>';
  const newMindjoy=projectGridUpdated.querySelector('.project h3');
  if(newMindjoy){const button=document.createElement('a');button.className='mindjoy-link';button.href='http://8.137.13.98/';button.target='_blank';button.rel='noopener noreferrer';button.textContent='Check out MindJoy platform ↗';newMindjoy.closest('.project-body').appendChild(button);}
}
document.querySelectorAll('#experience .timeline article').forEach(article=>{
  const title=article.querySelector('h3')?.textContent||'';
  const date=article.querySelector('span');
  if(!date)return;
  if(title.includes('Event Planner'))date.textContent='May 2025 - Present';
  if(title.includes('Summer Camp Counselor'))date.textContent='April 2025 - Present';
  if(title.includes('Teaching Assistant'))date.textContent='February 2025 - August 2025';
});
const contactSection=document.querySelector('#contact');
const contactEmailTarget=document.querySelector('.contact-email');
if(contactEmailTarget&&window.location.hash==='#email')contactEmailTarget.classList.add('is-highlighted');
const contactJumpLinks=document.querySelectorAll('.nav-social a[href^="mailto:"], .hero-panel-footer a[href^="mailto:"]');
contactJumpLinks.forEach(link=>{
  link.href='#contact';
  link.addEventListener('click',event=>{
    if(!contactSection||!contactEmailTarget)return;
    event.preventDefault();
    history.replaceState(null,'','#contact');
    contactSection.scrollIntoView({behavior:'smooth',block:'start'});
    contactEmailTarget.classList.remove('is-highlighted');
    void contactEmailTarget.offsetWidth;
    contactEmailTarget.classList.add('is-highlighted');
    window.setTimeout(()=>contactEmailTarget.classList.remove('is-highlighted'),2400);
  });
});
const projectIcons={
  'MindJoy':'<svg viewBox="0 0 96 96" aria-hidden="true"><circle cx="48" cy="48" r="16"/><path d="M48 8v16M48 72v16M8 48h16M72 48h16M19.7 19.7l11.3 11.3M65 65l11.3 11.3M76.3 19.7 65 31M31 65 19.7 76.3"/><path d="M48 25c7 8 15 11 15 21a15 15 0 0 1-30 0c0-10 8-13 15-21Z"/></svg>',
  'Security analysis system':'<svg viewBox="0 0 96 96" aria-hidden="true"><path d="M48 8 78 19v23c0 20-12 35-30 46C30 77 18 62 18 42V19L48 8Z"/><rect x="34" y="43" width="28" height="22" rx="3"/><path d="M40 43v-7a8 8 0 0 1 16 0v7M48 51v6"/></svg>',
  'Underwater Robot':'<svg viewBox="0 0 96 96" aria-hidden="true"><path d="M13 55c9-8 18-8 27 0s18 8 27 0 18-8 27 0M13 71c9-8 18-8 27 0s18 8 27 0 18-8 27 0"/><path d="M27 43h34a10 10 0 0 0 10-10v-5H37a10 10 0 0 0-10 10v5Z"/><circle cx="43" cy="34" r="4"/><path d="M71 28h9M76 28v-8M57 43v8"/></svg>'
};
document.querySelectorAll('#projects .project').forEach(project=>{
  const title=project.querySelector('h3')?.textContent.trim();
  const icon=projectIcons[title];
  const image=project.querySelector('.project-image');
  if(icon&&image)image.innerHTML=icon;
});
const generatedProjectMedia={
  'MindJoy':'<svg class="generated-media" viewBox="0 0 160 120" aria-label="Animated abstract wellness interface"><circle class="media-orb" cx="80" cy="58" r="30"/><path d="M80 39c11 12 18 17 18 27a18 18 0 0 1-36 0c0-10 7-15 18-27Z"/><path class="media-orbit" d="M26 58c15-36 93-45 110 0-17 45-95 36-110 0Z"/><circle class="media-dot" cx="34" cy="47" r="4"/><circle class="media-dot" cx="126" cy="70" r="4"/></svg>',
  'Security analysis system':'<svg class="generated-media" viewBox="0 0 160 120" aria-label="Animated abstract security analysis system"><path d="M80 12 122 27v31c0 27-17 43-42 54C55 101 38 85 38 58V27L80 12Z"/><path class="media-scan" d="M47 62h66"/><rect x="66" y="48" width="28" height="23" rx="4"/><path d="M72 48v-7a8 8 0 0 1 16 0v7M80 57v6"/><circle class="media-dot" cx="128" cy="29" r="4"/></svg>',
  'Underwater Robot':'<svg class="generated-media" viewBox="0 0 160 120" aria-label="Animated underwater robot illustration"><path d="M15 84c17-13 34-13 51 0s34 13 51 0 34-13 51 0M15 103c17-13 34-13 51 0s34 13 51 0 34-13 51 0"/><path d="M46 64h57a14 14 0 0 0 14-14v-7H58a14 14 0 0 0-14 14v7Z"/><circle cx="68" cy="51" r="6"/><path d="M103 43h15M110 43V29M86 64v12"/><circle class="media-bubble bubble-one" cx="35" cy="38" r="4"/><circle class="media-bubble bubble-two" cx="24" cy="22" r="2.5"/></svg>'
};
document.querySelectorAll('#projects .project').forEach(project=>{
  const title=project.querySelector('h3')?.textContent.trim();
  const media=generatedProjectMedia[title];
  const image=project.querySelector('.project-image');
  if(media&&image)image.innerHTML=media;
});
const mentalHealthVisual=document.querySelector('.health-media .signal-map');
if(mentalHealthVisual)mentalHealthVisual.innerHTML='<svg class="mental-health-icon" viewBox="0 0 180 150" aria-label="Brain model connected to survey signals"><path class="brain-shape" d="M78 35c-9-12-29-7-29 8-12-3-21 11-13 21-12 8-7 26 7 27 1 14 20 18 28 8 8 9 24 5 26-7 14-3 16-21 5-28 9-12 0-28-13-25-1-9-6-15-11-15Z"/><path class="brain-fold" d="M64 35c-7 8 3 12-4 19s7 9 0 17 6 10 2 18M83 37c8 7-2 13 5 19s-6 9 1 16-5 11-1 18"/><circle class="signal-node-real node-real-a" cx="25" cy="44" r="5"/><circle class="signal-node-real node-real-b" cx="27" cy="108" r="5"/><circle class="signal-node-real node-real-c" cx="151" cy="48" r="5"/><circle class="signal-node-real node-real-d" cx="151" cy="103" r="5"/><path class="signal-connector connector-a" d="M30 46 48 55M32 106l31-15M146 50l-25 12M146 101l-29-13"/><path class="detect-line" d="M15 130h24l6-9 8 14 10-18 9 13h27l8-9 7 9h34"/></svg>';
const motionTargets=document.querySelectorAll('.section,.project,.research-item,.timeline article,.story-steps>div');
if('IntersectionObserver' in window){
  const motionObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('is-visible');motionObserver.unobserve(entry.target);}
  }),{threshold:.12,rootMargin:'0px 0px -8% 0px'});
  motionTargets.forEach((element,index)=>{
    element.classList.add('motion-reveal');
    element.style.setProperty('--reveal-delay',`${Math.min(index*55,330)}ms`);
    motionObserver.observe(element);
  });
}else motionTargets.forEach(element=>element.classList.add('is-visible'));
