(() => {
  if (document.body.classList.contains('book-experience')) return;
  const stations = [
    { href: 'about.html', label: 'About Me', key: 'about' },
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

  const trackSvg = document.querySelector('.route-track');
  if (trackSvg) {
    const guide = trackSvg.querySelector('.track-guide');
    const tiesLayer = trackSvg.querySelector('.track-ties');
    const railsLayer = trackSvg.querySelector('.track-rails');
    const beacon = trackSvg.querySelector('.track-beacon');
    const desktopPath = 'M110 690 C230 690 230 455 350 455 C460 455 485 520 600 520 C715 520 715 260 830 260 C945 260 980 330 1090 330';
    const mobilePath = 'M80 72 C180 72 220 176 320 176 C220 176 180 280 80 280 C180 280 220 384 320 384 C220 384 180 488 80 488';
    const narrowRoute = matchMedia('(max-width: 780px)');
    const svgNamespace = 'http://www.w3.org/2000/svg';
    let runner = null;

    const svgElement = (name, attributes = {}) => {
      const element = document.createElementNS(svgNamespace, name);
      Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
      return element;
    };

    const pointAndNormal = (path, distance) => {
      const length = path.getTotalLength();
      const at = Math.max(0, Math.min(length, distance));
      const before = path.getPointAtLength(Math.max(0, at - 1));
      const after = path.getPointAtLength(Math.min(length, at + 1));
      const point = path.getPointAtLength(at);
      const tangentLength = Math.hypot(after.x - before.x, after.y - before.y) || 1;
      return { point, normal: { x: -(after.y - before.y) / tangentLength, y: (after.x - before.x) / tangentLength } };
    };

    const offsetPathData = (path, offset, step = 5) => {
      const length = path.getTotalLength();
      const commands = [];
      for (let distance = 0; distance <= length; distance += step) {
        const { point, normal } = pointAndNormal(path, distance);
        commands.push(`${commands.length ? 'L' : 'M'}${(point.x + normal.x * offset).toFixed(2)} ${(point.y + normal.y * offset).toFixed(2)}`);
      }
      const { point, normal } = pointAndNormal(path, length);
      commands.push(`L${(point.x + normal.x * offset).toFixed(2)} ${(point.y + normal.y * offset).toFixed(2)}`);
      return commands.join(' ');
    };

    const buildPhysicalTrack = () => {
      const pathData = narrowRoute.matches ? mobilePath : desktopPath;
      trackSvg.setAttribute('viewBox', narrowRoute.matches ? '0 0 400 560' : '0 0 1200 800');
      trackSvg.querySelectorAll('.track-guide, .track-shadow, .track-bed, .track-light').forEach((path) => path.setAttribute('d', pathData));
      guide.setAttribute('d', pathData);
      tiesLayer.replaceChildren();
      railsLayer.replaceChildren();

      const railOffset = narrowRoute.matches ? 10 : 15;
      [-railOffset, railOffset].forEach((offset) => {
        railsLayer.append(svgElement('path', { class: 'track-rail-shadow', d: offsetPathData(guide, offset, 4) }));
      });

      const length = guide.getTotalLength();
      const tieSpacing = narrowRoute.matches ? 17 : 18;
      for (let distance = 8; distance < length - 8; distance += tieSpacing) {
        const { point, normal } = pointAndNormal(guide, distance);
        const halfWidth = narrowRoute.matches ? 31 : 31;
        const start = { x: point.x - normal.x * halfWidth, y: point.y - normal.y * halfWidth };
        const end = { x: point.x + normal.x * halfWidth, y: point.y + normal.y * halfWidth };
        const tie = svgElement('line', {
          class: 'track-tie',
          x1: start.x.toFixed(2), y1: start.y.toFixed(2),
          x2: end.x.toFixed(2), y2: end.y.toFixed(2),
        });
        const plate = svgElement('line', {
          class: 'track-tie-glint',
          x1: (start.x + normal.x * 4).toFixed(2), y1: (start.y + normal.y * 4).toFixed(2),
          x2: (end.x - normal.x * 4).toFixed(2), y2: (end.y - normal.y * 4).toFixed(2),
        });
        tiesLayer.append(tie, plate);
      }

      [-railOffset, railOffset].forEach((offset) => {
        railsLayer.append(svgElement('path', { class: 'track-rail', d: offsetPathData(guide, offset, 4) }));
      });

      const start = guide.getPointAtLength(0);
      beacon.setAttribute('cx', start.x.toFixed(2));
      beacon.setAttribute('cy', start.y.toFixed(2));
      if (!runner) {
        runner = svgElement('g', { class: 'track-runner', 'aria-hidden': 'true' });
        runner.innerHTML = '<ellipse class="track-runner-halo" cx="0" cy="0" rx="25" ry="13"/><rect class="track-runner-body" x="-13" y="-6" width="26" height="12" rx="5"/><rect class="track-runner-window" x="-6" y="-3.5" width="7" height="5" rx="1.5"/><circle class="track-runner-light" cx="10" cy="0" r="2.4"/><circle class="track-runner-wheel" cx="-7" cy="7" r="2"/><circle class="track-runner-wheel" cx="7" cy="7" r="2"/>';
        trackSvg.append(runner);
      }
    };

    buildPhysicalTrack();
    narrowRoute.addEventListener('change', buildPhysicalTrack);

    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      let animationFrame = 0;
      let startTime = 0;
      const animateRunner = (time) => {
        if (document.hidden) {
          animationFrame = 0;
          return;
        }
        if (!startTime) startTime = time;
        const length = guide.getTotalLength();
        const distance = ((time - startTime) * 0.019) % length;
        const { point } = pointAndNormal(guide, distance);
        const before = guide.getPointAtLength(Math.max(0, distance - 2));
        const after = guide.getPointAtLength(Math.min(length, distance + 2));
        const angle = Math.atan2(after.y - before.y, after.x - before.x) * 180 / Math.PI;
        runner.setAttribute('transform', `translate(${point.x.toFixed(2)} ${point.y.toFixed(2)}) rotate(${angle.toFixed(2)})`);
        animationFrame = requestAnimationFrame(animateRunner);
      };
      const startRunner = () => {
        if (!animationFrame && !document.hidden) animationFrame = requestAnimationFrame(animateRunner);
      };
      const stopRunner = () => {
        if (animationFrame) cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      };
      document.addEventListener('visibilitychange', () => document.hidden ? stopRunner() : startRunner());
      startRunner();
    }
  }

  if (main && page !== 'home') {
    const spine = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    spine.classList.add('page-route-spine');
    spine.setAttribute('aria-hidden', 'true');
    spine.setAttribute('preserveAspectRatio', 'none');
    const spineDefs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    spineDefs.innerHTML = '<linearGradient id="spineMetal" x1="0" x2="0.9" y1="0" y2="1"><stop offset="0" stop-color="#70838a"/><stop offset=".55" stop-color="#293f4a"/><stop offset="1" stop-color="#162c37"/></linearGradient><filter id="spineGlow" x="-100%" y="-20%" width="300%" height="140%"><feGaussianBlur stdDeviation="2.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>';
    spine.append(spineDefs);

    const spineLayers = Object.fromEntries(['shadow', 'bed', 'ties', 'rails', 'light', 'stops', 'runner'].map((name) => {
      const layer = document.createElementNS('http://www.w3.org/2000/svg', name === 'ties' || name === 'rails' || name === 'stops' || name === 'runner' ? 'g' : 'path');
      layer.classList.add(`spine-${name}`);
      spine.append(layer);
      return [name, layer];
    }));
    const spineRunner = svgElement('circle', { class: 'spine-runner', r: '5' });
    spineLayers.runner.append(spineRunner);
    main.prepend(spine);

    const updatePageSpine = () => {
      const height = Math.max(main.scrollHeight, window.innerHeight);
      const mobile = matchMedia('(max-width: 780px)').matches;
      const viewWidth = mobile ? 32 : 120;
      const leftX = mobile ? 8 : 30;
      const rightX = mobile ? 24 : 90;
      spine.setAttribute('viewBox', `0 0 ${viewWidth} ${height}`);
      spine.style.height = `${height}px`;

      const sections = [...main.children].filter((element) => element.tagName === 'SECTION');
      const points = [{ x: (leftX + rightX) / 2, y: 8 }];
      sections.forEach((section, index) => {
        const sectionTop = section.getBoundingClientRect().top - main.getBoundingClientRect().top;
        const y = Math.max(points.at(-1).y + 40, Math.min(height - 28, sectionTop + Math.min(76, Math.max(32, section.offsetHeight * 0.11))));
        points.push({ x: index % 2 ? leftX : rightX, y });
      });
      points.push({ x: (leftX + rightX) / 2, y: height - 8 });
      const pathData = points.reduce((data, point, index) => {
        if (index === 0) return `M${point.x} ${point.y}`;
        const previous = points[index - 1];
        const middleY = (previous.y + point.y) / 2;
        return `${data} C${previous.x} ${middleY} ${point.x} ${middleY} ${point.x} ${point.y}`;
      }, '');

      spine.querySelectorAll('.spine-shadow, .spine-bed, .spine-light').forEach((path) => path.setAttribute('d', pathData));
      spineLayers.ties.replaceChildren();
      spineLayers.rails.replaceChildren();
      spineLayers.stops.replaceChildren();
      const path = spineLayers.bed;
      path.setAttribute('d', pathData);
      const laneOffset = mobile ? 2.2 : 7;
      [-laneOffset, laneOffset].forEach((offset) => spineLayers.rails.append(svgElement('path', { class: 'spine-rail', d: offsetPathData(path, offset, 8) })));
      const pathLength = path.getTotalLength();
      for (let distance = 10; distance < pathLength - 10; distance += mobile ? 25 : 34) {
        const { point, normal } = pointAndNormal(path, distance);
        spineLayers.ties.append(svgElement('line', {
          class: 'spine-tie',
          x1: (point.x - normal.x * (mobile ? 9 : 23)).toFixed(2),
          y1: (point.y - normal.y * (mobile ? 9 : 23)).toFixed(2),
          x2: (point.x + normal.x * (mobile ? 9 : 23)).toFixed(2),
          y2: (point.y + normal.y * (mobile ? 9 : 23)).toFixed(2),
        }));
      }
      points.slice(1, -1).forEach((point, index) => spineLayers.stops.append(svgElement('circle', {
        class: 'spine-stop', cx: point.x, cy: point.y, r: index === 0 ? 4 : 3,
      })));

      const progress = Math.max(0, Math.min(1, (window.scrollY + window.innerHeight * 0.42 - (window.scrollY + main.getBoundingClientRect().top)) / height));
      const position = path.getPointAtLength(progress * pathLength);
      spineRunner.setAttribute('cx', position.x.toFixed(2));
      spineRunner.setAttribute('cy', position.y.toFixed(2));
    };
    let spineUpdateFrame = 0;
    const scheduleSpineUpdate = () => {
      if (spineUpdateFrame) return;
      spineUpdateFrame = requestAnimationFrame(() => {
        spineUpdateFrame = 0;
        updatePageSpine();
      });
    };
    updatePageSpine();
    window.addEventListener('scroll', scheduleSpineUpdate, { passive: true });
    window.addEventListener('resize', scheduleSpineUpdate, { passive: true });
    window.addEventListener('load', scheduleSpineUpdate, { once: true });
    if ('ResizeObserver' in window) new ResizeObserver(scheduleSpineUpdate).observe(main);
  }

  document.querySelectorAll('.project, .home-work-card, .research-item, .timeline article').forEach((card) => {
    card.classList.add('world-object');
  });

  document.documentElement.classList.add('world-ready');
})();
