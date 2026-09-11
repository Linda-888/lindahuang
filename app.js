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
if(getInTouch){getInTouch.href='#contact';getInTouch.addEventListener('click',event=>{const target=document.querySelector('#contact');if(target){event.preventDefault();target.scrollIntoView({behavior:'smooth'});}});}
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
  heroRight.innerHTML='<div class="hero-panel"><div class="hero-panel-top"><span>Research direction</span><i>2026</i></div><div class="hero-panel-main"><span class="panel-mark">LH</span><div><strong>Building human-centered systems</strong><p>Researching how intelligent technology can support mental health, learning, and everyday communication.</p></div></div><div class="hero-panel-details"><div><span>School</span><b>University of Illinois<br>Urbana-Champaign</b></div><div><span>Major</span><b>Computer Science<br>+ Education</b></div><div><span>Interests</span><b>AI · Data Structures<br>Learning Sciences</b></div></div><div class="hero-panel-footer"><span>Open to thoughtful collaboration</span><a href="mailto:lindah6@illinois.edu">Email me ↗</a></div></div>';
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
if(researchIntro)researchIntro.textContent='Selected research in language-model evaluation and early mental-health issue detection.';
const researchListUpdated=document.querySelector('#research .research-list');
if(researchListUpdated){
  researchListUpdated.innerHTML='<article class="research-item"><span class="item-number">01</span><div><p class="item-meta">Remote · Student Researcher · March 2025 - November 2025</p><h3>Evaluation of Large Language Models</h3><p>Benchmarked GPT-5, Gemini 2.5 Pro, ChatGLM-4.5, and DeepSeek across academic subjects using MMLU, LogiQA, and C-Eval. Constructed and open-sourced four exam datasets, compared prompting strategies, and designed a six-category error taxonomy for model failure patterns.</p><div class="tags"><span>LLM evaluation</span><span>Datasets</span><span>Prompt strategy</span></div></div></article><article class="research-item"><span class="item-number">02</span><div><p class="item-meta">Remote · Student Researcher · April 2025 - September 2025</p><h3>Early Mental Health Issue Detection System</h3><p>Built an early-warning framework for adolescent depression risk using multimodal survey data across academic pressure, CGPA, sleep duration, study hours, and lifestyle indicators. Preprocessed a 28K-record dataset, benchmarked four models, and identified XGBoost as the strongest predictor.</p><div class="tags"><span>Machine learning</span><span>XGBoost</span><span>Health data</span></div></div></article>';
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
