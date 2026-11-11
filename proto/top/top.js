(() => {
 const root = document.getElementById('st-top-gateway');
 const chapters = JSON.parse(root.querySelector('[data-chapters]').textContent);
 const dialog = root.querySelector('dialog');
 const title = dialog.querySelector('h3');
 const teams = dialog.querySelector('[data-teams]');
 const closeButton = dialog.querySelector('.chapter-close');
 const exploreLink = dialog.querySelector('.chapter-explore');
 const reduced = matchMedia('(prefers-reduced-motion: reduce)');
 const hero = root.querySelector('.opening');
 const heroMotion = hero.querySelector('.opening-motion');
 let opening = false;
 let chapterTrigger;

 function visiblePageArea() {
  return new Promise(resolve => {
   const viewportObserver = new IntersectionObserver(([entry]) => {
    viewportObserver.disconnect();
    resolve(entry.intersectionRect);
   });
   viewportObserver.observe(root);
  });
 }

 async function sizeOpening() {
  const {height} = await visiblePageArea();
  if (height >= 280) root.style.setProperty('--opening-view', `${height}px`);
 }
 sizeOpening();
 window.addEventListener('resize', sizeOpening);

 heroMotion.addEventListener('click', () => {
  const paused = hero.classList.toggle('is-paused');
  heroMotion.setAttribute('aria-label', paused ? '冒頭の動きを再開' : '冒頭の動きを一時停止');
  heroMotion.firstElementChild.textContent = paused ? '▶' : 'Ⅱ';
 });

 closeButton.addEventListener('click', () => dialog.close());
 exploreLink.addEventListener('click', event => {
  event.preventDefault();
  const explorer = document.getElementById('st-field-explorer');
  dialog.close();
  explorer.dispatchEvent(new CustomEvent('open-explorer', {
   detail: {theme: chapterTrigger.dataset.chapter, trigger: chapterTrigger}
  }));
 });
 dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
 });
 const openingNext = hero.querySelector('.opening-next');
 openingNext.addEventListener('click', event => {
  event.preventDefault();
  const target = document.getElementById(openingNext.hash.slice(1));
  target.scrollIntoView({block: 'center', behavior: reduced.matches ? 'auto' : 'smooth'});
  target.querySelector('button').focus({preventScroll:true});
 });
 root.addEventListener('click', async event => {
  const button = event.target.closest('[data-chapter]');
  if (!button || opening || dialog.open) return;
  const chapter = chapters.find(item => item.key === button.dataset.chapter);
  if (!chapter) return;
  opening = true;
  chapterTrigger = button;
  const art = root.querySelector(`.choice[data-chapter="${chapter.key}"] .thumb`);
  dialog.querySelector('.dialog-art').src = art.src;
  dialog.style.setProperty('--chapter-light', chapter.light);
  title.textContent = chapter.listDescription;
  teams.replaceChildren(...chapter.teams.map(team => {
   const item = document.createElement('li');
   const region = document.createElement('span');
   region.className = 'chapter-region';
   region.textContent = team.region;
   const link = document.createElement('a');
   link.href = team.portalUrl;
   link.target = '_blank';
   link.rel = 'noopener noreferrer';
   const content = document.createElement('span');
   content.className = 'chapter-team-content';
   const name = document.createElement('span');
   name.className = 'chapter-team-name';
   name.textContent = team.name;
   const summary = document.createElement('span');
   summary.className = 'chapter-team-summary';
   summary.textContent = team.summary;
   const arrow = document.createElement('span');
   arrow.className = 'chapter-team-arrow';
   arrow.setAttribute('aria-hidden', 'true');
   arrow.textContent = '↗';
   content.append(name, summary);
   link.append(region, content, arrow);
   item.append(link);
   return item;
  }));
  if (!reduced.matches) {
   const pulse = button.animate([
    {filter:'brightness(1)'},
    {filter:'brightness(1.35) drop-shadow(0 0 10px #c2fffb)'},
    {filter:'brightness(1.16)'}
   ], {duration:180, easing:'ease-out'});
   await pulse.finished.catch(() => {});
  }
  const visibleArea = await visiblePageArea();
  const center = visibleArea.height ? visibleArea.top + visibleArea.height / 2 : window.innerHeight / 2;
  dialog.style.setProperty('--dialog-center', `${center}px`);
  dialog.style.setProperty('--dialog-height', `${visibleArea.height || window.innerHeight}px`);
  const rect = button.getBoundingClientRect();
  const entryOffset = distance => `${Math.max(-40, Math.min(40, distance * .15))}px`;
  dialog.style.setProperty('--entry-x', entryOffset(rect.x + rect.width / 2 - window.innerWidth / 2));
  dialog.style.setProperty('--entry-y', entryOffset(rect.y + rect.height / 2 - center));
  dialog.showModal();
  dialog.scrollTop = 0;
  opening = false;
 });
 const journey = root.querySelector('.journey');
 const lights = [...root.querySelectorAll('.light')];
 const levels = new Map();
 const observer = new IntersectionObserver(entries => {
  for (const entry of entries) {
   levels.set(entry.target, entry.intersectionRatio);
   if (reduced.matches) continue;
   const level = entry.intersectionRatio;
   entry.target.style.setProperty('--glow', String(level * .79));
   entry.target.style.setProperty('--spark', String(level * .86));
   if (entry.isIntersecting && level > .15) {
    entry.target.getAnimations().forEach(animation => animation.cancel());
    entry.target.animate([{opacity: level * .25}, {opacity: Math.min(1, level + .22)}, {opacity: level * .79}], {duration: 670, easing: 'ease-out'});
   }
  }
  const intensity = Math.max(0, ...levels.values());
  journey.style.setProperty('--tube-brightness', reduced.matches ? '1' : String(.91 + intensity * .2));
  journey.style.setProperty('--tube-saturation', reduced.matches ? '1' : String(1 + intensity * .09));
 }, {threshold: [0, .2, .55, .9, 1]});
 lights.forEach(light => observer.observe(light));
 reduced.addEventListener('change', () => {
  journey.style.setProperty('--tube-brightness', '1');
  journey.style.setProperty('--tube-saturation', '1');
  if (reduced.matches) lights.forEach(light => light.getAnimations().forEach(animation => animation.cancel()));
 });
})();
