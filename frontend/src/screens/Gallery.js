import { renderNavbar, renderFooter } from '../components/Navigation';
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-static';

export function renderGalleryScreen() {
  const container = document.createElement('div');
  let allItems = [];
  let currentFilter = 'All';

  // 1. Hero Section
  const hero = document.createElement('header');
  hero.style.padding = '140px 0 60px';
  hero.style.textAlign = 'center';
  hero.style.background = 'var(--background-color)';
  hero.innerHTML = `
    <div class="container">
      <span class="reveal" style="color: var(--primary-color); font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">Kura 2025 Exhibition</span>
      <h1 class="reveal" style="font-size: clamp(2.5rem, 5vw, 3.5rem); font-weight: 900; margin-top: 10px;">Moments & Movements</h1>
      <p class="reveal" style="color: var(--text-muted); font-size: 1.1rem; max-width: 600px; margin: 20px auto 40px;">
        Explore our visual journey of agricultural innovation, community impact, and regional partnerships.
      </p>
      
      <!-- Filters -->
      <div class="reveal" id="gallery-filters" style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; margin-bottom: 20px;">
        <button class="filter-btn active" data-filter="All">All</button>
        <button class="filter-btn" data-filter="Exhibition">Exhibition</button>
        <button class="filter-btn" data-filter="Workshop">Workshop</button>
        <button class="filter-btn" data-filter="Visit">Visit</button>
        <button class="filter-btn" data-filter="Excursion">Excursion</button>
      </div>
    </div>
  `;

  // 2. Gallery Grid Container
  const gridSection = document.createElement('section');
  gridSection.style.paddingBottom = '100px';
  gridSection.innerHTML = `
    <div class="container">
      <div id="gallery-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px;">
        <!-- Items injected via JS -->
      </div>
    </div>
  `;

  // 3. Lightbox Modal
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.style.cssText = `
    position: fixed; inset: 0; background: rgba(0,0,0,0.95); z-index: 9999;
    display: none; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s;
  `;
  lightbox.innerHTML = `
    <button id="closeLightbox" style="position: absolute; top: 30px; right: 30px; background: none; border: none; color: white; cursor: pointer; z-index: 10;">${X}</button>
    <div id="lightboxContent" style="max-width: 90%; max-height: 85%; position: relative;">
      <!-- Content (Img or Video) -->
    </div>
    <div style="position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%); color: white; text-align: center;">
      <h3 id="lightboxTitle" style="margin: 0; font-size: 1.2rem;"></h3>
      <p id="lightboxCategory" style="margin: 5px 0 0; font-size: 0.9rem; color: var(--primary-color); font-weight: 600;"></p>
    </div>
  `;

  const loadData = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/gallery');
      allItems = await res.json();
      renderItems();
    } catch (err) { console.error(err); }
  };

  const renderItems = () => {
    const grid = gridSection.querySelector('#gallery-grid');
    const filtered = currentFilter === 'All' ? allItems : allItems.filter(i => i.category === currentFilter);
    
    if (filtered.length === 0) {
      grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 100px 0; color: var(--text-muted);">No media found in this category.</div>`;
      return;
    }

    grid.innerHTML = filtered.map((item, idx) => `
      <div class="gallery-item reveal" data-idx="${idx}" style="position: relative; aspect-ratio: 4/3; border-radius: 16px; overflow: hidden; cursor: pointer; animation-delay: ${idx * 0.05}s;">
        <img src="${item.image}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s;">
        <div class="overlay" style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent 60%); opacity: 0; transition: opacity 0.3s; display: flex; flex-direction: column; justify-content: flex-end; padding: 25px; color: white;">
          <span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; color: var(--primary-color); margin-bottom: 5px;">${item.category}</span>
          <h3 style="margin: 0; font-size: 1.2rem; font-weight: 800;">${item.title}</h3>
        </div>
        ${item.video_url ? `<div style="position: absolute; top: 20px; right: 20px; width: 40px; height: 40px; background: var(--primary-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: black; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">${Play}</div>` : ''}
      </div>
    `).join('');

    // Re-trigger reveal animations
    if (window.initAnimations) window.initAnimations();

    // Setup Click Listeners
    grid.querySelectorAll('.gallery-item').forEach(el => {
      el.onclick = () => openLightbox(filtered[el.dataset.idx]);
    });
  };

  const openLightbox = (item) => {
    const content = lightbox.querySelector('#lightboxContent');
    lightbox.querySelector('#lightboxTitle').textContent = item.title;
    lightbox.querySelector('#lightboxCategory').textContent = item.category;

    if (item.video_url) {
      // Basic YouTube Embed logic
      let vidId = '';
      if (item.video_url.includes('youtube.com/watch?v=')) vidId = item.video_url.split('v=')[1].split('&')[0];
      else if (item.video_url.includes('youtu.be/')) vidId = item.video_url.split('be/')[1].split('?')[0];

      if (vidId) {
        content.innerHTML = `<iframe src="https://www.youtube.com/embed/${vidId}?autoplay=1" style="width: 80vw; height: 45vw; max-height: 70vh; border: none; border-radius: 12px;" allow="autoplay; fullscreen"></iframe>`;
      } else {
        content.innerHTML = `<video src="${item.video_url}" controls autoplay style="max-width: 100%; max-height: 80vh; border-radius: 12px;"></video>`;
      }
    } else {
      content.innerHTML = `<img src="${item.image}" style="max-width: 100%; max-height: 80vh; border-radius: 12px; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">`;
    }

    lightbox.style.display = 'flex';
    setTimeout(() => lightbox.style.opacity = '1', 10);
  };

  lightbox.querySelector('#closeLightbox').onclick = () => {
    lightbox.style.opacity = '0';
    setTimeout(() => {
      lightbox.style.display = 'none';
      lightbox.querySelector('#lightboxContent').innerHTML = '';
    }, 300);
  };

  // Filter Logic
  hero.onclick = (e) => {
    if (e.target.classList.contains('filter-btn')) {
      hero.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');
      currentFilter = e.target.dataset.filter;
      renderItems();
    }
  };

  container.appendChild(renderNavbar());
  container.appendChild(hero);
  container.appendChild(gridSection);
  container.appendChild(lightbox);
  container.appendChild(renderFooter());

  // Global styles for gallery
  const style = document.createElement('style');
  style.innerHTML = `
    .filter-btn {
      padding: 10px 25px; border-radius: 100px; border: 1px solid var(--admin-border);
      background: var(--surface-color); color: var(--text-muted); font-weight: 700;
      cursor: pointer; transition: all 0.3s; font-size: 0.9rem;
    }
    .filter-btn.active {
      background: var(--primary-color); color: black; border-color: var(--primary-color);
      box-shadow: 0 4px 12px rgba(253,186,11,0.3);
    }
    .gallery-item:hover img { transform: scale(1.05); }
    .gallery-item:hover .overlay { opacity: 1; }
  `;
  document.head.appendChild(style);

  loadData();
  return container;
}
