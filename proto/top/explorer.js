(() => {
 const root = document.getElementById('st-field-explorer');
 const chapters = JSON.parse(root.querySelector('[data-chapters]').textContent);
 const tabs = [...root.querySelectorAll('[data-theme]')];
 const topic = root.querySelector('[data-filter="topic"]');
 const region = root.querySelector('[data-filter="region"]');
 const results = root.querySelector('[data-results]');
 const context = root.querySelector('[data-context]');
 const count = root.querySelector('[data-count]');
 const state = { theme: 'all' };
 const top = document.getElementById('st-top-gateway');
 const back = root.querySelector('[data-back]');
 let origin;
 let pendingScroll;
 root.querySelector('[data-scene="all"]').src = top.querySelector('.opening img').src;
 for (const choice of top.querySelectorAll('.choice')) {
  root.querySelector(`[data-scene="${choice.dataset.chapter}"]`).src = choice.querySelector('.thumb').src;
 }
 const all = [...new Map(chapters.flatMap(chapter => chapter.teams).map(row => [row.portalUrl, row])).values()];
 function available() {
  return state.theme === 'all' ? all : chapters.find(chapter => chapter.key === state.theme).teams;
 }
 function fill(select, items, label) {
  const previous = select.value;
  select.replaceChildren(new Option(label, ''), ...[...new Set(items)].map(item => new Option(item, item)));
  if ([...select.options].some(option => option.value === previous)) select.value = previous;
 }
 function element(tag, text, className) {
  const el = document.createElement(tag);
  el.textContent = text;
  if (className) el.className = className;
  return el;
 }
 function link(label, href) {
  const el = element('a', label);
  el.href = href;
  el.target = '_blank';
  el.rel = 'noopener noreferrer';
  return el;
 }
 function render() {
  const rows = available().filter(row => (!topic.value || row.topic === topic.value) && (!region.value || row.region === region.value));
  const active = chapters.find(chapter => chapter.key === state.theme);
  context.textContent = active ? active.title + ' ／ ' + active.filterLabel : '章を横断して探す';
  count.textContent = rows.length + '件 ／ 掲載例';
  results.replaceChildren();
  if (!rows.length) {
   results.append(element('p', 'この組み合わせの掲載例はありません。条件を変えて探せます。', 'empty'));
   return;
  }
  for (const row of rows) {
   const article = element('article', '', 'row');
   const links = element('div', '', 'links');
   links.append(link('チームを見る ↗', row.portalUrl), link(row.sourceLabel || '公式資料 ↗', row.sourceUrl));
   article.append(
    element('div', row.topic + ' ／ ' + row.region + ' ／ ' + row.stage, 'meta'),
    element('h3', row.headline),
    element('p', row.summary.replace(/^.*?｜/, ''), 'feature'),
    element('p', row.name, 'team'),
    links
   );
   results.append(article);
  }
 }
 function selectTheme(theme) {
  state.theme = theme;
  root.dataset.activeTheme = theme;
  for (const tab of tabs) tab.setAttribute('aria-pressed', String(tab.dataset.theme === theme));
  topic.value = '';
  fill(topic, available().map(row => row.topic), 'すべての取り組み');
  fill(region, all.map(row => row.region), 'すべての地域');
  render();
 }
 for (const tab of tabs) tab.addEventListener('click', () => selectTheme(tab.dataset.theme));
 topic.addEventListener('change', render);
 region.addEventListener('change', render);
 root.addEventListener('open-explorer', event => {
  origin = event.detail.trigger;
  region.value = '';
  selectTheme(event.detail.theme);
  root.hidden = false;
  pendingScroll?.abort();
  const viewportUpdate = new AbortController();
  pendingScroll = viewportUpdate;
  const positionExplorer = () => {
   root.scrollIntoView({block: 'start'});
   back.focus({preventScroll: true});
  };
  // The surrounding preview can resize its frame after this section becomes visible.
  window.addEventListener('resize', positionExplorer, {once: true, signal: viewportUpdate.signal});
  requestAnimationFrame(positionExplorer);
  setTimeout(() => viewportUpdate.abort(), 500);
 });
 back.addEventListener('click', event => {
  event.preventDefault();
  pendingScroll?.abort();
  origin.scrollIntoView({block: 'center'});
  origin.focus({preventScroll: true});
  root.hidden = true;
 });
})();
