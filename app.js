const TAG_LABEL = {
  '3d': '3D 互動',
  architecture: '建築',
  office: '辦公室',
  education: '教學',
  soon: '即將推出'
};

const VERSION = '1';
let data = null;
let active = 'all';

function catLabel(cat) {
  return cat.labelZh;
}

function matches(project, filter) {
  if (filter === 'all') return true;
  if (filter === 'soon') return project.status === 'soon' || (project.tags || []).includes('soon');
  return (project.tags || []).includes(filter) && project.status !== 'soon';
}

function renderFilters() {
  const nav = document.getElementById('filters');
  const cats = data.categories || [];
  nav.innerHTML = cats.map((c) => {
    const on = c.id === active ? ' is-on' : '';
    return `<button type="button" class="chip${on}" data-id="${c.id}" aria-pressed="${c.id === active}">${catLabel(c)}</button>`;
  }).join('');
  nav.querySelectorAll('.chip').forEach((btn) => {
    btn.addEventListener('click', () => {
      active = btn.dataset.id;
      renderFilters();
      renderGrid();
    });
  });
}

function cardHtml(p) {
  const soon = p.status === 'soon';
  const tags = (p.tags || []).map((t) => `<span class="tag t-${t}">${TAG_LABEL[t] || t}</span>`).join('');
  const thumb = p.thumb
    ? `<img src="${p.thumb}" alt="${p.nameZh} 預覽" width="1280" height="800" loading="lazy">`
    : `<div class="placeholder" aria-hidden="true">✦ ✧ ✦</div>`;
  const year = p.year ? `<span class="year">${p.year}</span>` : '';
  const action = soon || !p.url
    ? `<div class="soon-label">即將推出</div>`
    : `<a class="open" href="${p.url}" target="_blank" rel="noopener noreferrer">開啟作品 <span aria-hidden="true">↗</span></a>`;
  return `<article class="card${soon ? ' soon' : ''}">
    <div class="thumb">${thumb}${year}</div>
    <div class="body">
      <div class="tags">${tags}</div>
      <h3 class="name-zh">${p.nameZh}</h3>
      <p class="name-en">${p.nameEn || ''}</p>
      <p class="summary">${p.summaryZh}</p>
      ${action}
    </div>
  </article>`;
}

function renderGrid() {
  const list = (data.projects || []).filter((p) => matches(p, active));
  const grid = document.getElementById('grid');
  const empty = document.getElementById('empty');
  grid.innerHTML = list.map(cardHtml).join('');
  empty.hidden = list.length > 0;
}

function applyPlatform(platform) {
  if (!platform) return;
  if (platform.nameZh) {
    const zh = document.querySelector('h1 .zh');
    if (zh) zh.innerHTML = platform.nameZh.replace(' 作品平台', '<br>作品平台');
  }
  if (platform.nameEn) {
    const en = document.querySelector('h1 .en');
    if (en) en.textContent = platform.nameEn;
  }
  if (platform.taglineZh) {
    const t = document.querySelector('.tagline .zh');
    if (t) t.textContent = platform.taglineZh;
  }
  if (platform.taglineEn) {
    const t = document.querySelector('.tagline .en');
    if (t) t.textContent = platform.taglineEn;
  }
}

async function boot() {
  const res = await fetch(`projects.json?v=${VERSION}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('projects.json ' + res.status);
  data = await res.json();
  applyPlatform(data.platform);
  renderFilters();
  renderGrid();
}

boot().catch((err) => {
  const empty = document.getElementById('empty');
  empty.hidden = false;
  empty.textContent = '作品清單暫時讀不到，請稍後再重新整理。';
  console.error(err);
});
