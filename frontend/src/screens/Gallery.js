import { renderNavbar, renderFooter } from '../components/Navigation';
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-static';

export function renderGalleryScreen() {
  const container = document.createElement('div');
  let allItems = [];
  let currentFilter = 'All';

  // 1. Hero Section (Premium V2)
  const hero = document.createElement('header');
  hero.style.padding = '180px 0 80px';
  hero.style.textAlign = 'center';
  hero.style.background = 'var(--background-color)';
  hero.innerHTML = `
    <div class="container">
      <span class="reveal" style="color: var(--primary-color); font-weight: 700; text-transform: uppercase; letter-spacing: 4px; display: block; margin-bottom: 20px;">Capturing Excellence</span>
      <h1 class="reveal" style="font-size: clamp(2.8rem, 7vw, 5rem); font-weight: 900; line-height: 1.05; margin-bottom: 25px;">Moments & <br><span style="color: var(--primary-color);">Movements</span></h1>
      <p class="reveal" style="color: var(--text-muted); font-size: 1.25rem; max-width: 700px; margin: 0 auto 60px; line-height: 1.8;">
        Explore our visual journey of agricultural innovation, community impact, and regional partnerships across Nigeria.
      </p>
      
      <!-- Filters (Modern Pill Design) -->
      <div class="reveal" id="gallery-filters" style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap; margin-bottom: 20px;">
        <button class="gallery-filter-pill active" data-filter="All">All Projects</button>
        <button class="gallery-filter-pill" data-filter="Exhibition">Exhibitions</button>
        <button class="gallery-filter-pill" data-filter="Workshop">Workshops</button>
        <button class="gallery-filter-pill" data-filter="Visit">Field Visits</button>
        <button class="gallery-filter-pill" data-filter="Excursion">Excursions</button>
      </div>
    </div>
  `;

  // 2. Gallery Grid Section
  const gridSection = document.createElement('section');
  gridSection.style.paddingBottom = '140px';
  gridSection.innerHTML = `
    <div class="container">
      <div id="gallery-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 30px;">
        <!-- Items injected via JS -->
      </div>
    </div>
  `;

  // 3. Lightbox (Refined Architecture)
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.style.cssText = `
    position: fixed; inset: 0; background: rgba(0,0,0,0.92); backdrop-filter: blur(15px); z-index: 9999;
    display: none; align-items: center; justify-content: center; opacity: 0; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  `;
  lightbox.innerHTML = `
    <button id="closeLightbox" style="position: absolute; top: 40px; right: 40px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.1); color: white; width: 56px; height: 56px; border-radius: 50%; cursor: pointer; z-index: 10; font-size: 1.5rem; display: flex; align-items: center; justify-content: center; transition: all 0.3s;" onmouseover="this.style.background='rgba(255,255,255,0.2)'; this.style.transform='scale(1.1)';" onmouseout="this.style.background='rgba(255,255,255,0.1)'; this.style.transform='scale(1)';">${X}</button>
    
    <div id="lightboxContent" style="max-width: 85%; max-height: 80%; position: relative; border-radius: 24px; overflow: hidden; box-shadow: 0 40px 100px rgba(0,0,0,0.5);">
      <!-- DYNAMIC CONTENT -->
    </div>
    
    <div style="position: absolute; bottom: 50px; left: 50%; transform: translateX(-50%); color: white; text-align: center; width: 90%; max-width: 700px;">
      <span id="lb-cat" style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 3px; color: var(--primary-color); font-weight: 800; display: block; margin-bottom: 12px;"></span>
      <h3 id="lb-title" style="margin: 0; font-size: 2rem; font-weight: 900; line-height: 1.2;"></h3>
    </div>
  `;

  const loadData = async () => {
    try {
      const res = await fetch('/api/gallery');
      allItems = await res.json();
      renderItems();
    } catch (err) { console.error(err); }
  };

  const renderItems = () => {
    const grid = gridSection.querySelector('#gallery-grid');
    const filtered = currentFilter === 'All' ? allItems : allItems.filter(i => i.category === currentFilter);
    
    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 140px 0; background: var(--surface-color); border: 1px solid var(--glass-border); border-radius: 32px;">
          <p style="color: var(--text-muted); font-size: 1.2rem;">Our media archive for this category is currently being updated.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map((item, idx) => `
      <div class="gallery-card-v2 reveal premium-glass-card" data-idx="${idx}" style="animation-delay: ${idx * 0.05}s;">
        <div class="card-inner" style="position: relative; aspect-ratio: 4/5; overflow: hidden; border-radius: 20px;">
          <img src="${item.image}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 1.2s cubic-bezier(0.2, 0, 0.2, 1);">
          <div class="card-overlay-v2">
            <span class="cat-tag">${item.category}</span>
            <h3 class="title-tag">${item.title}</h3>
            <div class="cta-tag">View Presentation →</div>
          </div>
          ${item.video_url ? `<div class="play-icon-v2">${Play}</div>` : ''}
        </div>
      </div>
    `).join('');

    if (window.initAnimations) window.initAnimations();

    grid.querySelectorAll('.gallery-card-v2').forEach((el, index) => {
      el.onclick = () => openLightbox(filtered[index]);
    });
  };

  const openLightbox = (item) => {
    const content = lightbox.querySelector('#lightboxContent');
    const title = lightbox.querySelector('#lb-title');
    const category = lightbox.querySelector('#lb-cat');

    if (item.video_url) {
      // Basic YouTube Embed
      let vidId = '';
      if (item.video_url.includes('youtube.com/watch?v=')) vidId = item.video_url.split('v=')[1].split('&')[0];
      else if (item.video_url.includes('youtu.be/')) vidId = item.video_url.split('be/')[1].split('?')[0];

      if (vidId) {
        content.innerHTML = `<iframe src="https://www.youtube.com/embed/${vidId}?autoplay=1" style="width: 85vw; height: 48vw; max-height: 75vh; border: none;" allow="autoplay; fullscreen"></iframe>`;
      } else {
        content.innerHTML = `<video src="${item.video_url}" controls autoplay style="max-width: 100%; max-height: 80vh;"></video>`;
      }
    } else {
      content.innerHTML = `<img src="${item.image}" style="max-width: 100%; max-height: 80vh; object-fit: contain;">`;
    }
    
    title.textContent = item.title;
    category.textContent = item.category;

    lightbox.style.display = 'flex';
    setTimeout(() => lightbox.style.opacity = '1', 10);
    document.body.style.overflow = 'hidden';
  };

  lightbox.querySelector('#closeLightbox').onclick = () => {
    lightbox.style.opacity = '0';
    setTimeout(() => {
      lightbox.style.display = 'none';
      lightbox.querySelector('#lightboxContent').innerHTML = '';
      document.body.style.overflow = 'auto';
    }, 400);
  };

  // Component Styles Refinement
  const style = document.createElement('style');
  style.innerHTML = `
    .gallery-filter-pill {
      padding: 12px 28px; border-radius: 100px; border: 1px solid var(--glass-border);
      background: var(--surface-color); color: var(--text-muted); font-weight: 700;
      font-size: 0.95rem; cursor: pointer; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 4px 15px rgba(0,0,0,0.02);
    }
    .gallery-filter-pill:hover { transform: translateY(-3px); color: var(--primary-color); border-color: var(--primary-color); }
    .gallery-filter-pill.active {
      background: var(--primary-color); color: white; border-color: var(--primary-color);
      box-shadow: 0 12px 24px rgba(0, 21, 91, 0.25);
    }

    .gallery-card-v2:hover img { transform: scale(1.1); }
    .card-overlay-v2 {
      position: absolute; inset: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%);
      display: flex; flex-direction: column; justify-content: flex-end;
      padding: 40px; opacity: 0; transition: all 0.5s ease; transform: translateY(30px);
    }
    .gallery-card-v2:hover .card-overlay-v2 { opacity: 1; transform: translateY(0); }
    
    .cat-tag { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 3px; color: var(--primary-color); font-weight: 800; margin-bottom: 12px; }
    .title-tag { color: white; font-size: 1.6rem; font-weight: 900; margin-bottom: 15px; line-height: 1.1; }
    .cta-tag { color: rgba(255,255,255,0.7); font-size: 0.9rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
    
    .play-icon-v2 {
      position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
      width: 70px; height: 70px; background: white; border-radius: 50%;
      display: flex; align-items: center; justify-content: center; color: var(--primary-color);
      box-shadow: 0 20px 40px rgba(0,0,0,0.3); z-index: 5; font-size: 1.5rem;
    }
  `;
  document.head.appendChild(style);

  // Setup Filtering Logic
  setTimeout(() => {
    hero.onclick = (e) => {
      const btn = e.target.closest('.gallery-filter-pill');
      if (btn) {
        hero.querySelectorAll('.gallery-filter-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderItems();
      }
    };
  }, 100);

  container.appendChild(renderNavbar());
  container.appendChild(hero);
  container.appendChild(gridSection);
  container.appendChild(lightbox);
  container.appendChild(renderFooter());

  loadData();
  return container;
}
