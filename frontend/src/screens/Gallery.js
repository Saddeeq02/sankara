import { renderNavbar, renderFooter } from '../components/Navigation';

export function renderGalleryScreen() {
  const container = document.createElement('div');
  container.className = 'gallery-root';

  const styleTag = document.createElement('style');
  styleTag.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');
    
    .gallery-root {
      font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
      background: #ffffff;
      color: #0f172a;
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .gallery-hero {
      padding: 180px 20px 80px;
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #eff6ff 100%);
      text-align: center;
      position: relative;
      border-bottom: 1px solid rgba(226, 232, 240, 0.8);
    }

    .gallery-hero::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at top, rgba(37, 99, 235, 0.04), transparent 70%);
      pointer-events: none;
    }

    .gallery-hero-badge {
      display: inline-flex;
      background: rgba(37, 99, 235, 0.08);
      padding: 8px 16px;
      border-radius: 100px;
      border: 1px solid rgba(37, 99, 235, 0.15);
      margin-bottom: 20px;
      color: #2563eb;
      font-size: 0.75rem;
      font-weight: 800;
      letter-spacing: 2px;
      text-transform: uppercase;
      z-index: 2;
      position: relative;
    }

    .gallery-hero-title {
      font-size: 3.2rem;
      font-weight: 900;
      line-height: 1.15;
      color: #0f172a;
      margin-bottom: 20px;
      letter-spacing: -2px;
      z-index: 2;
      position: relative;
    }

    .gallery-hero-title span {
      background: linear-gradient(135deg, #2563eb 0%, #dc2626 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .gallery-hero-desc {
      font-size: 1.15rem;
      line-height: 1.6;
      color: #475569;
      max-width: 650px;
      margin: 0 auto;
      z-index: 2;
      position: relative;
    }

    /* Timeline Container */
    .timeline-section {
      padding: 80px 0 120px;
      background: #ffffff;
      position: relative;
    }

    .timeline-container {
      max-width: 1100px;
      margin: 0 auto;
      position: relative;
    }

    .timeline-line {
      position: absolute;
      left: 50%;
      top: 0;
      bottom: 0;
      width: 2px;
      background: linear-gradient(180deg, #2563eb 0%, #dc2626 80%, transparent 100%);
      transform: translateX(-50%);
    }

    .timeline-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 80px;
      position: relative;
    }

    .timeline-row:nth-child(even) {
      flex-direction: row-reverse;
    }

    .timeline-col-card {
      width: 45%;
    }

    .timeline-col-date {
      width: 45%;
      text-align: right;
    }

    .timeline-row:nth-child(even) .timeline-col-date {
      text-align: left;
    }

    .timeline-node {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 20px;
      height: 20px;
      background: #2563eb;
      border: 4px solid #ffffff;
      border-radius: 50%;
      box-shadow: 0 0 12px rgba(37, 99, 235, 0.4);
      z-index: 10;
    }

    .timeline-card {
      background: #ffffff;
      border: 1px solid rgba(226, 232, 240, 0.9);
      border-radius: 24px;
      padding: 35px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.015);
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      flex-direction: column;
      gap: 20px;
      cursor: pointer;
    }

    .timeline-card:hover {
      transform: translateY(-6px);
      border-color: rgba(37, 99, 235, 0.25);
      box-shadow: 0 20px 40px rgba(15, 23, 42, 0.05);
    }

    .timeline-card-image {
      width: 100%;
      height: 230px;
      border-radius: 16px;
      overflow: hidden;
      background: #f1f5f9;
    }

    .timeline-card-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.8s ease;
    }

    .timeline-card:hover .timeline-card-image img {
      transform: scale(1.05);
    }

    .timeline-card-title {
      font-size: 1.5rem;
      font-weight: 850;
      color: #0f172a;
      line-height: 1.25;
      margin: 0;
    }

    .timeline-card-desc {
      font-size: 0.98rem;
      color: #475569;
      line-height: 1.6;
      margin: 0;
    }

    .timeline-card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #f1f5f9;
      padding-top: 20px;
      margin-top: 5px;
    }

    .timeline-card-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(37, 99, 235, 0.08);
      color: #2563eb;
      padding: 6px 14px;
      border-radius: 50px;
      font-size: 0.8rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .timeline-card-location {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: #64748b;
      font-size: 0.85rem;
      font-weight: 700;
    }

    .timeline-date-val {
      font-size: 1.8rem;
      font-weight: 900;
      color: #0f172a;
      letter-spacing: -0.5px;
    }

    .timeline-date-label {
      font-size: 0.85rem;
      font-weight: 800;
      color: #2563eb;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-top: 4px;
    }

    /* Lightbox Styles */
    .lightbox-overlay {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.95);
      z-index: 10000;
      display: none;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.4s ease;
      backdrop-filter: blur(10px);
    }
    
    .lb-wrapper {
      max-width: 1000px;
      width: 90%;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
    }
    
    .lb-content-area {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 200px;
    }
    
    .lb-image {
      max-width: 100%;
      max-height: 60vh;
      border-radius: 16px;
      object-fit: contain;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    }

    .lb-info-box {
      margin-top: 20px;
      color: #ffffff;
      text-align: center;
      max-width: 650px;
      width: 100%;
    }

    .lb-category-pill {
      display: inline-flex;
      background: rgba(37, 99, 235, 0.2);
      border: 1px solid rgba(37, 99, 235, 0.4);
      color: #3b82f6;
      padding: 4px 12px;
      border-radius: 100px;
      font-size: 0.75rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 10px;
    }

    .lb-title {
      font-size: 1.6rem;
      font-weight: 850;
      margin: 0 0 10px 0;
      letter-spacing: -0.5px;
    }

    .lb-description {
      font-size: 0.95rem;
      color: #94a3b8;
      line-height: 1.6;
      margin: 0;
    }

    .lb-close-btn {
      position: absolute;
      top: 30px;
      right: 30px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      width: 50px;
      height: 50px;
      border-radius: 50%;
      color: #ffffff;
      font-size: 1.8rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      z-index: 10;
    }

    .lb-close-btn:hover {
      background: rgba(220, 38, 38, 0.8);
      border-color: transparent;
      transform: rotate(90deg);
    }

    .lb-nav-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      width: 60px;
      height: 60px;
      border-radius: 50%;
      color: #ffffff;
      font-size: 1.5rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      z-index: 10;
    }

    .lb-nav-btn:hover {
      background: #2563eb;
      border-color: transparent;
      transform: translateY(-50%) scale(1.1);
    }

    .lb-prev { left: 40px; }
    .lb-next { right: 40px; }

    @media (max-width: 768px) {
      .timeline-line {
        left: 20px;
        transform: none;
      }
      .timeline-row {
        flex-direction: column !important;
        align-items: flex-start;
        padding-left: 45px;
        margin-bottom: 50px;
      }
      .timeline-col-card, .timeline-col-date {
        width: 100%;
        text-align: left !important;
      }
      .timeline-col-date {
        margin-bottom: 15px;
      }
      .timeline-node {
        left: 20px;
        top: 20px;
        transform: translate(-50%, -50%);
      }
      .timeline-date-val {
        font-size: 1.4rem;
      }
      .lb-prev { left: 15px; }
      .lb-next { right: 15px; }
      .lb-close-btn { top: 20px; right: 20px; }
      .lb-nav-btn { width: 45px; height: 45px; font-size: 1.1rem; }
      .lb-title { font-size: 1.2rem; }
    }
  `;
  container.appendChild(styleTag);

  // Render Hero
  const hero = document.createElement('section');
  hero.className = 'gallery-hero';
  hero.innerHTML = `
    <div class="gallery-hero-badge">Field Journal</div>
    <h1 class="gallery-hero-title">Our Operational <span>Gallery</span></h1>
    <p class="gallery-hero-desc">
      A photographic log documenting our machines deployed in the field, technical milestones, and our regional agricultural operations.
    </p>
  `;
  container.appendChild(hero);

  // Render Timeline Section
  const timelineSec = document.createElement('section');
  timelineSec.className = 'timeline-section';
  timelineSec.innerHTML = `
    <div class="container">
      <div class="timeline-container">
        <div class="timeline-line"></div>
        <div id="timeline-events-grid">
          <div style="text-align: center; padding: 100px 0;">
            <p style="color: #64748b; font-size: 1.1rem; font-weight: 600;">Loading operational events...</p>
          </div>
        </div>
      </div>
    </div>
  `;
  container.appendChild(timelineSec);

  // Render Lightbox Overlay
  const lightboxOverlay = document.createElement('div');
  lightboxOverlay.className = 'lightbox-overlay';
  lightboxOverlay.id = 'lbOverlay';
  lightboxOverlay.innerHTML = `
    <button class="lb-close-btn" id="lbClose">&times;</button>
    <button class="lb-nav-btn lb-prev" id="lbPrev">&#10094;</button>
    <div class="lb-wrapper">
      <div class="lb-content-area" id="lbContent"></div>
      <div class="lb-thumbnails-row" id="lbThumbnails" style="margin-top: 15px; display: flex; gap: 10px; justify-content: center; overflow-x: auto; max-width: 90vw;"></div>
      <div class="lb-info-box">
        <span class="lb-category-pill" id="lbCategory">Fieldwork</span>
        <h3 class="lb-title" id="lbTitle"></h3>
        <p class="lb-description" id="lbDescription"></p>
      </div>
    </div>
    <button class="lb-nav-btn lb-next" id="lbNext">&#10095;</button>
  `;
  container.appendChild(lightboxOverlay);

  // Load Data
  let events = [];
  let activeIndex = 0;
  let activeImageIndex = 0;

  const loadActivities = async () => {
    try {
      const res = await fetch('/api/gallery');
      events = await res.json();
      events.sort((a, b) => b.id - a.id);
      renderEvents();
    } catch (err) {
      console.error('Error loading gallery timeline:', err);
      timelineSec.querySelector('#timeline-events-grid').innerHTML = `
        <div style="text-align: center; padding: 100px 0; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 24px;">
          <p style="color: #64748b; font-size: 1.1rem; font-weight: 600;">Our operational log is currently being updated. Check back shortly.</p>
        </div>
      `;
    }
  };

  const renderEvents = () => {
    const list = timelineSec.querySelector('#timeline-events-grid');

    if (events.length === 0) {
      list.innerHTML = `
        <div style="text-align: center; padding: 100px 0; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 24px;">
          <p style="color: #64748b; font-size: 1.1rem; font-weight: 600;">Our operational log is currently being updated. Check back shortly.</p>
        </div>
      `;
      return;
    }

    list.innerHTML = events.map((event, idx) => {
      let firstImage = '';
      if (event.image) {
        try {
          if (event.image.startsWith('[') && event.image.endsWith(']')) {
            const arr = JSON.parse(event.image);
            if (arr.length > 0) firstImage = arr[0];
          } else {
            firstImage = event.image;
          }
        } catch(e) {
          firstImage = event.image;
        }
      }

      return `
        <div class="timeline-row">
          <div class="timeline-node"></div>
          
          <div class="timeline-col-date">
            <div class="timeline-date-val">${event.date || 'Recent'}</div>
            <div class="timeline-date-label">Field Activity</div>
          </div>

          <div class="timeline-col-card">
            <div class="timeline-card" data-idx="${idx}">
              ${firstImage ? `
                <div class="timeline-card-image">
                  <img src="${firstImage}" alt="${event.title}" loading="lazy">
                </div>
              ` : ''}
              <h3 class="timeline-card-title">${event.title}</h3>
              <p class="timeline-card-desc">${event.description || event.summary || ''}</p>
              <div class="timeline-card-footer">
                <span class="timeline-card-tag">
                  <span style="width: 5px; height: 5px; border-radius: 50%; background: #2563eb; display: inline-block;"></span>
                  Fieldwork
                </span>
                <span class="timeline-card-location">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/><circle cx="12" cy="10" r="3"/></svg>
                  Nigeria
                </span>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach click listeners to cards to open lightbox
    list.querySelectorAll('.timeline-card').forEach(el => {
      el.onclick = () => {
        const idx = parseInt(el.dataset.idx);
        openLightbox(idx);
      };
    });

    if (window.initAnimations) {
      setTimeout(window.initAnimations, 100);
    }
  };

  const openLightbox = (index) => {
    activeIndex = index;
    const item = events[activeIndex];
    const content = lightboxOverlay.querySelector('#lbContent');
    const title = lightboxOverlay.querySelector('#lbTitle');
    const category = lightboxOverlay.querySelector('#lbCategory');
    const description = lightboxOverlay.querySelector('#lbDescription');
    const thumbsContainer = lightboxOverlay.querySelector('#lbThumbnails');

    // Parse image array
    let images = [];
    try {
      if (item.image && item.image.startsWith('[') && item.image.endsWith(']')) {
        images = JSON.parse(item.image);
      } else if (item.image) {
        images = [item.image];
      }
    } catch(e) {
      images = [item.image];
    }

    activeImageIndex = 0;

    const renderMainImage = (imgIdx) => {
      content.innerHTML = `<img src="${images[imgIdx]}" class="lb-image" alt="${item.title}" style="max-width: 90vw; max-height: 60vh; border-radius: 16px; object-fit: contain; transition: opacity 0.3s ease;">`;
      
      // Update active thumbnail border
      thumbsContainer.querySelectorAll('.lb-thumb-item').forEach((thumb, idx) => {
        if (idx === imgIdx) {
          thumb.style.borderColor = '#2563eb';
          thumb.style.opacity = '1';
        } else {
          thumb.style.borderColor = 'transparent';
          thumb.style.opacity = '0.6';
        }
      });
    };

    // Render thumbnails if multiple images
    if (images.length > 1) {
      thumbsContainer.style.display = 'flex';
      thumbsContainer.innerHTML = images.map((img, idx) => `
        <div class="lb-thumb-item" data-img-idx="${idx}" style="width: 60px; height: 60px; border-radius: 8px; overflow: hidden; cursor: pointer; border: 2px solid transparent; opacity: 0.6; transition: all 0.2s ease;">
          <img src="${img}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
      `).join('');
      
      thumbsContainer.querySelectorAll('.lb-thumb-item').forEach(el => {
        el.onclick = (e) => {
          e.stopPropagation();
          const imgIdx = parseInt(el.dataset.imgIdx);
          activeImageIndex = imgIdx;
          renderMainImage(imgIdx);
        };
      });
    } else {
      thumbsContainer.style.display = 'none';
      thumbsContainer.innerHTML = '';
    }

    renderMainImage(0);

    title.textContent = item.title;
    category.textContent = 'Fieldwork';
    description.textContent = item.description || item.summary || '';

    lightboxOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      lightboxOverlay.style.opacity = '1';
    }, 10);
  };

  const closeLightbox = () => {
    lightboxOverlay.style.opacity = '0';
    setTimeout(() => {
      lightboxOverlay.style.display = 'none';
      lightboxOverlay.querySelector('#lbContent').innerHTML = '';
      document.body.style.overflow = '';
    }, 400);
  };

  const navigateLightbox = (dir) => {
    let nextIdx = activeIndex + dir;
    if (nextIdx < 0) nextIdx = events.length - 1;
    if (nextIdx >= events.length) nextIdx = 0;
    openLightbox(nextIdx);
  };

  // Bind Lightbox Events
  lightboxOverlay.querySelector('#lbClose').onclick = closeLightbox;
  lightboxOverlay.querySelector('#lbPrev').onclick = () => navigateLightbox(-1);
  lightboxOverlay.querySelector('#lbNext').onclick = () => navigateLightbox(1);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (lightboxOverlay.style.display === 'flex') {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    }
  });

  container.appendChild(renderNavbar());
  container.appendChild(timelineSec);
  container.appendChild(renderFooter());

  // Trigger data fetch
  loadActivities();

  return container;
}
