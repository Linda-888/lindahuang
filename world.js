(() => {
  const stations = [
    { href: 'about.html', label: 'About', key: 'about' },
    { href: 'story.html', label: 'My Story', key: 'story' },
    { href: 'education.html', label: 'Education', key: 'education' },
    { href: 'research.html', label: 'Research', key: 'research' },
    { href: 'projects.html', label: 'Projects', key: 'projects' },
    { href: 'contact.html', label: 'Contact', key: 'contact' },
  ];

  const pageForPath = (path) => {
    if (path.startsWith('research-')) return 'research';
    if (path === 'index.html' || path === '') return 'home';
    if (path === 'education.html') return 'education';
    return path.replace('.html', '') || 'home';
  };

  const currentFile = location.pathname.split('/').pop();
  const page = pageForPath(currentFile);
  const roomForPage = currentFile === 'research-llm.html'
    ? 'research-llm'
    : currentFile === 'research-mental-health.html'
      ? 'research-health'
      : page;
  const header = document.querySelector('.nav');
  const main = document.querySelector('main');

  if (header && page !== 'home') {
    const wayfinder = document.createElement('nav');
    wayfinder.className = 'world-wayfinder';
    wayfinder.setAttribute('aria-label', 'Explore Linda’s website route');
    wayfinder.innerHTML = `<span class="wayfinder-label"><i aria-hidden="true"></i> A path shaped around people</span><div class="wayfinder-stops">${stations.map((station) => {
      const active = station.key === page;
      return `<a href="${station.href}"${active ? ' aria-current="page"' : ''}><span aria-hidden="true"></span>${station.label}</a>`;
    }).join('')}</div>`;
    header.after(wayfinder);
  }

  const roomArt = {
    about: '<circle class="orb-core" cx="100" cy="100" r="30"/><ellipse class="orb-ring" cx="100" cy="100" rx="72" ry="30"/><ellipse class="orb-ring orb-ring-two" cx="100" cy="100" rx="48" ry="77"/><circle class="orb-person" cx="100" cy="63" r="9"/><path class="orb-person" d="M81 105c2-17 10-26 19-26s17 9 19 26c-10 9-28 9-38 0Z"/>',
    story: '<path class="path-shadow" d="M22 143c29-1 21-76 54-77 30-1 28 45 52 44 18-1 12-37 48-45"/><path class="path-line" d="M22 143c29-1 21-76 54-77 30-1 28 45 52 44 18-1 12-37 48-45"/><g class="memory-card"><path d="M61 34h42v56H61z"/><path d="M69 47h26M69 56h20M69 65h23"/></g><circle class="room-node" cx="22" cy="143" r="7"/><circle class="room-node" cx="176" cy="65" r="7"/>',
    education: '<path class="book-side" d="M43 83 100 55l58 28-58 30-57-30Z"/><path class="book-top" d="m43 83 57 30v59l-57-30V83Z"/><path class="book-front" d="m100 113 58-30v59l-58 30v-59Z"/><path class="book-line" d="m56 91 44 23m0 0 44-23M57 104l43 22m0 0 43-22"/>',
    research: '<path class="chart-platform" d="M34 151 101 116l67 35-67 35-67-35Z"/><path class="chart-axis" d="M53 139v-46m0 46 96 0"/><path class="chart-bar" d="M66 130v-20h13v20m13 0V91h13v39m13 0v-52h13v52"/><path class="chart-line" d="m65 103 21 5 21-25 20 8 19-27"/><circle class="room-node" cx="146" cy="64" r="7"/>',
    'research-llm': '<path class="chart-platform" d="M26 151 100 112l74 39-74 39-74-39Z"/><path class="chart-axis" d="M46 139v-52m0 52 108 0"/><path class="chart-bar" d="M58 128V99h12v29m13 0V81h12v47m13 0V92h12v36m13 0V69h12v59"/><path class="chart-line" d="m58 91 25-15 25 18 25-33 24 15"/><circle class="room-node" cx="157" cy="62" r="7"/>',
    'research-health': '<path class="chart-platform" d="M26 151 100 112l74 39-74 39-74-39Z"/><path class="signal-link" d="m100 101-43-29m43 29 43-31m-43 31-48 40m48-40 48 38"/><circle class="signal-core" cx="100" cy="101" r="18"/><circle class="signal-point" cx="57" cy="72" r="10"/><circle class="signal-point" cx="143" cy="70" r="10"/><circle class="signal-point" cx="52" cy="141" r="10"/><circle class="signal-point" cx="148" cy="139" r="10"/>',
    projects: '<path class="build-back" d="m52 67 52-27 52 27v62l-52 28-52-28V67Z"/><path class="build-left" d="m52 67 52 28v62l-52-28V67Z"/><path class="build-right" d="m104 95 52-28v62l-52 28V95Z"/><path class="build-top" d="m52 67 52-27 52 27-52 28-52-28Z"/><circle class="room-node" cx="104" cy="71" r="8"/>',
    contact: '<circle class="signal-ring" cx="100" cy="100" r="68"/><circle class="signal-ring signal-ring-two" cx="100" cy="100" r="46"/><path class="message-box" d="M65 79h70v47H65z"/><path class="message-line" d="m66 82 34 27 34-27"/><circle class="room-node" cx="159" cy="49" r="7"/>',
  };

  if (main && page !== 'home') {
    const firstSection = main.querySelector(':scope > section');
    if (firstSection) {
      firstSection.classList.add('station-page-hero', `station-${roomForPage}`);
      firstSection.dataset.station = roomForPage;
      const scene = document.createElement('div');
      scene.className = 'station-room-scene';
      scene.setAttribute('aria-hidden', 'true');
      scene.innerHTML = `<div class="room-wall"></div><div class="room-floor"></div><div class="room-light"></div><svg class="room-sculpture" viewBox="0 0 200 200" focusable="false">${roomArt[roomForPage] || roomArt.projects}</svg>`;
      firstSection.prepend(scene);
      const routeLink = document.createElement('a');
      routeLink.className = 'station-route-return';
      routeLink.href = 'index.html#route-map';
      routeLink.innerHTML = '<span aria-hidden="true">←</span> View the whole route';
      const marker = firstSection.querySelector('.section-number');
      if (marker) marker.after(routeLink);
      else firstSection.prepend(routeLink);
    }
  }

  const routeWorld = document.querySelector('.route-world');
  if (routeWorld) {
    const routeStations = [...routeWorld.querySelectorAll('.route-station')];
    const setActive = (station) => {
      routeStations.forEach((item) => item.classList.toggle('is-active', item === station));
      routeWorld.dataset.activeStation = station?.querySelector('strong')?.textContent || '';
    };
    routeStations.forEach((station) => {
      station.addEventListener('mouseenter', () => setActive(station));
      station.addEventListener('focus', () => setActive(station));
      station.addEventListener('mouseleave', () => setActive(null));
      station.addEventListener('blur', () => setActive(null));
    });

    if (matchMedia('(hover: hover) and (pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      routeWorld.addEventListener('pointermove', (event) => {
        const rect = routeWorld.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        routeWorld.style.setProperty('--pointer-x', `${x.toFixed(3)}`);
        routeWorld.style.setProperty('--pointer-y', `${y.toFixed(3)}`);
      });
      routeWorld.addEventListener('pointerleave', () => {
        routeWorld.style.setProperty('--pointer-x', '0');
        routeWorld.style.setProperty('--pointer-y', '0');
      });
    }
  }

  document.querySelectorAll('.project, .home-work-card, .research-item, .timeline article').forEach((card) => {
    card.classList.add('world-object');
  });

  document.documentElement.classList.add('world-ready');
})();
