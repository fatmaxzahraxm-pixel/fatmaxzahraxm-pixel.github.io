'use strict';

let currentPage = 'feed';
let currentIdx  = 0;

const cursor         = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');
const navProgress    = document.getElementById('nav-progress');
const nav            = document.getElementById('nav');

document.getElementById('yr').textContent = new Date().getFullYear();
buildMasonry();
triggerReveal('feed');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

(function animateCursor() {
  followerX += (mouseX - followerX) * 0.14;
  followerY += (mouseY - followerY) * 0.14;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top  = followerY + 'px';
  requestAnimationFrame(animateCursor);
})();

document.addEventListener('mouseover', (e) => {
  const el = e.target.closest('a, button, .card, .logo, .nav-btn, .m-item');
  document.body.classList.toggle('cursor-hover', !!el);
});

window.addEventListener('scroll', () => {
  const scrollY   = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const pct       = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;

  nav.classList.toggle('scrolled', scrollY > 40);
  navProgress.style.width = pct + '%';
}, { passive: true });

function showPage(name) {
  if (name === currentPage && name !== 'detail') return;

  document.querySelectorAll('.page').forEach(p => p.classList.remove('visible'));

  const target = document.getElementById('page-' + name);
  target.classList.add('visible');
  currentPage = name;

  ['feed', 'contact'].forEach(n => {
    const btn = document.getElementById('btn-' + n);
    if (btn) btn.classList.toggle('active', n === name);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
  triggerReveal(name);
}

function triggerReveal(pageName) {
  const page = document.getElementById('page-' + pageName);
  if (!page) return;

  page.querySelectorAll('.reveal, .reveal-delay-1, .reveal-delay-2, .reveal-delay-3').forEach(el => {
    el.classList.remove('visible');
    void el.offsetWidth;
    el.classList.add('visible');
  });

  if (pageName === 'feed') {
    page.querySelectorAll('.m-item').forEach((el, i) => {
      el.classList.remove('visible');
      setTimeout(() => el.classList.add('visible'), i * 70);
    });
  }

  if (pageName === 'detail') {
    const imgWrap = page.querySelector('.detail-img-wrap');
    const info    = page.querySelector('.detail-info');
    if (imgWrap) { imgWrap.classList.remove('visible'); void imgWrap.offsetWidth; imgWrap.classList.add('visible'); }
    if (info)    { info.classList.remove('visible');    void info.offsetWidth;    info.classList.add('visible'); }
  }
}

function buildMasonry() {
  const masonry = document.getElementById('masonry');
  masonry.innerHTML = '';

  PHOTOS.forEach((photo, i) => {
    const item = document.createElement('div');
    item.className = 'm-item';

    item.innerHTML = `
      <div class="card">
        <img src="${photo.thumb}" alt="${photo.title}" loading="lazy"/>
        <div class="card-overlay">
          <div>
            <p class="card-title">${photo.title}</p>
            <p class="card-loc">${photo.location} — ${photo.year}</p>
          </div>
        </div>
      </div>`;

    item.addEventListener('click', () => openDetail(i));
    masonry.appendChild(item);
  });
}

function openDetail(idx) {
  currentIdx = idx;
  const photo = PHOTOS[idx];

  document.getElementById('detail-img').src   = photo.src;
  document.getElementById('detail-img').alt   = photo.title;
  document.getElementById('detail-num').textContent =
    String(idx + 1).padStart(2, '0') + ' / ' + String(PHOTOS.length).padStart(2, '0');
  document.getElementById('detail-title').textContent = photo.title;
  document.getElementById('detail-desc').textContent  = photo.desc;
  document.getElementById('d-loc').textContent   = photo.location;
  document.getElementById('d-year').textContent  = photo.year;
  document.getElementById('d-cam').textContent   = photo.camera;
  document.getElementById('d-film').textContent  = photo.film;

  const prev = PHOTOS[idx - 1];
  const next = PHOTOS[idx + 1];
  document.getElementById('btn-prev').textContent = prev ? '← ' + prev.title : '';
  document.getElementById('btn-next').textContent = next ? next.title + ' →' : '';

  showPage('detail');
}

function navigate(dir) {
  const next = currentIdx + dir;
  if (next >= 0 && next < PHOTOS.length) openDetail(next);
}

document.getElementById('detail-img').addEventListener('dblclick', () => {
  openLightbox(PHOTOS[currentIdx].src);
});

function openLightbox(src) {
  const lb  = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  img.src   = src;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft'  && currentPage === 'detail') navigate(-1);
  if (e.key === 'ArrowRight' && currentPage === 'detail') navigate(1);
});

function sendForm(e) {
  e.preventDefault();

  const btn = e.target.querySelector('.btn-send');
  btn.classList.add('loading');
  btn.querySelector('span').textContent = 'Envoi…';

  setTimeout(() => showSuccess(), 1000);
}

function showSuccess() {
  document.getElementById('form-area').innerHTML = `
    <div class="sent-msg">
      <h3>Message envoyé.</h3>
      <p>Je te recontacte très vite.</p>
    </div>`;
}

if ('IntersectionObserver' in window) {
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imgObserver.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });

  document.querySelectorAll('img[data-src]').forEach(img => imgObserver.observe(img));
}