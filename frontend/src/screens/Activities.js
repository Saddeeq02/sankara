import { renderNavbar, renderFooter } from '../components/Navigation';

export function renderActivitiesScreen() {
  const container = document.createElement('div');
  container.className = 'activities-root';

  let allGalleryItems = [];
  let currentFilter = 'All';
  let filteredItems = [];
  let activeIndex = 0;
  let activeImageIndex = 0;

  // Inject Stylesheet
  const styleTag = document.createElement('style');
  styleTag.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');
    
    .activities-root {
      font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
      background: #ffffff;
      color: #0f172a;
      overflow-x: hidden;
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .activities-hero {
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #eff6ff 100%);
      color: #0f172a;
      padding: 180px 0 110px;
      position: relative;
      overflow: hidden;
      border-bottom: 1px solid rgba(37, 99, 235, 0.08);
      text-align: center;
    }

    .activities-hero::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at top, rgba(37, 99, 235, 0.06), transparent 70%);
      pointer-events: none;
      z-index: 1;
    }

    .activities-hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(37, 99, 235, 0.08);
      padding: 8px 16px;
      border-radius: 100px;
      border: 1px solid rgba(37, 99, 235, 0.15);
      margin-bottom: 25px;
      color: #2563eb;
      font-size: 0.75rem;
      font-weight: 800;
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    .activities-hero-title {
      font-size: clamp(2.6rem, 5vw, 4rem);
      font-weight: 900;
      line-height: 1.15;
      letter-spacing: -1.5px;
      margin-bottom: 20px;
      color: #0f172a;
    }

    .activities-hero-title span {
      background: linear-gradient(135deg, #dc2626 0%, #2563eb 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .activities-hero-desc {
      font-size: 1.15rem;
      line-height: 1.6;
      color: #475569;
      max-width: 680px;
      margin: 0 auto;
    }

    /* Media Gallery Filter Pills */
    .filter-wrapper {
      display: flex;
      justify-content: center;
      gap: 12px;
      flex-wrap: wrap;
      margin-bottom: 50px;
    }

    .filter-pill {
      background: #ffffff;
      border: 1px solid rgba(37, 99, 235, 0.12);
      color: #475569;
      padding: 10px 24px;
      border-radius: 100px;
      font-size: 0.9rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .filter-pill:hover {
      background: rgba(37, 99, 235, 0.06);
      color: #2563eb;
      border-color: rgba(37, 99, 235, 0.25);
      transform: translateY(-2px);
    }

    .filter-pill.active {
      background: #2563eb;
      color: #ffffff;
      border-color: #2563eb;
      box-shadow: 0 10px 20px rgba(37, 99, 235, 0.25);
    }

    /* Gallery Grid */
    .gallery-section {
      padding: 80px 0 120px;
      background: #ffffff;
    }

    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 30px;
    }

    .gallery-item-card {
      background: #ffffff;
      border: 1px solid rgba(226, 232, 240, 0.85);
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.015);
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      cursor: pointer;
      position: relative;
    }

    .gallery-item-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 20px 40px rgba(15, 23, 42, 0.05);
      border-color: rgba(37, 99, 235, 0.25);
    }

    .card-img-wrapper {
      position: relative;
      aspect-ratio: 4/3;
      overflow: hidden;
      background: #f1f5f9;
    }

    .card-img-wrapper img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .gallery-item-card:hover .card-img-wrapper img {
      transform: scale(1.08);
    }

    .video-badge {
      position: absolute;
      top: 15px;
      right: 15px;
      background: rgba(15, 23, 42, 0.85);
      border: 1px solid rgba(37, 99, 235, 0.3);
      backdrop-filter: blur(10px);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #2563eb;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }

    .card-body-info {
      padding: 24px 20px;
      border-top: 1px solid #f1f5f9;
    }

    .card-meta-tag {
      font-size: 0.75rem;
      font-weight: 800;
      color: #2563eb;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      display: block;
      margin-bottom: 8px;
    }

    .card-title-text {
      font-size: 1.15rem;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.3;
      margin: 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    /* Lightbox Modal */
    .lb-overlay {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.95);
      backdrop-filter: blur(25px);
      z-index: 9999;
      display: none;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
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
      .lb-prev { left: 15px; }
      .lb-next { right: 15px; }
      .lb-close-btn { top: 20px; right: 20px; }
      .lb-nav-btn { width: 45px; height: 45px; font-size: 1.1rem; }
      .lb-title { font-size: 1.2rem; }
    }
  `;
  container.appendChild(styleTag);

  // 1. HERO SECTION
  const heroSec = document.createElement('header');
  heroSec.className = 'activities-hero';
  heroSec.innerHTML = `
    <div class="container">
      <div class="activities-hero-badge">Corporate Journal & Media</div>
      <h1 class="activities-hero-title">Driving Innovation <span>In The Field</span></h1>
      <p class="activities-hero-desc">
        Explore our Media Exhibition Gallery showing workshops, student visits, regional agricultural excursions, and corporate updates.
      </p>
    </div>
  `;
  container.appendChild(heroSec);

  // 2. MEDIA GALLERY SECTION
  const gallerySec = document.createElement('section');
  gallerySec.className = 'gallery-section';
  gallerySec.innerHTML = `
    <div class="container">
      <div class="filter-wrapper" id="gallery-filters-bar">
        <button class="filter-pill active" data-filter="All">All Photos</button>
        <button class="filter-pill" data-filter="Exhibition">Exhibition</button>
        <button class="filter-pill" data-filter="Workshop">Workshop</button>
        <button class="filter-pill" data-filter="Our Company">Our Company</button>
        <button class="filter-pill" data-filter="Student Visit">Student Visit</button>
        <button class="filter-pill" data-filter="Excursion">Excursion</button>
        <button class="filter-pill" data-filter="ECOWAS Visit">ECOWAS Visit</button>
      </div>
      <div class="gallery-grid" id="gallery-items-grid">
        <!-- JS-loaded -->
      </div>
    </div>
  `;
  container.appendChild(gallerySec);

  // 3. LIGHTBOX MODAL
  const lightboxOverlay = document.createElement('div');
  lightboxOverlay.className = 'lb-overlay';
  lightboxOverlay.innerHTML = `
    <button class="lb-close-btn" id="lbClose">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
    <button class="lb-nav-btn lb-prev" id="lbPrev">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
    </button>
    <button class="lb-nav-btn lb-next" id="lbNext">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
    </button>
    <div class="lb-wrapper">
      <div class="lb-content-area" id="lbContent"></div>
      <div class="lb-thumbnails-row" id="lbThumbnails" style="margin-top: 15px; display: flex; gap: 10px; justify-content: center; overflow-x: auto; max-width: 90vw;"></div>
      <div class="lb-info-box">
        <span id="lbCategory" style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 2px; color: #2563eb; font-weight: 800; display: block; margin-bottom: 10px;"></span>
        <h3 id="lbTitle" style="margin: 0; font-size: 1.6rem; font-weight: 900; line-height: 1.2;"></h3>
        <p id="lbDescription" style="margin: 10px 0 0 0; font-size: 1.05rem; color: #e2e8f0; font-weight: 450; line-height: 1.5;"></p>
      </div>
    </div>
  `;
  container.appendChild(lightboxOverlay);

  const fallbackGalleryItems = [
    {
      "id": "gb-st-1",
      "title": "Lovol Combine Harvester Demonstration (Jigawa State, 2024) - Highlight 1",
      "category": "Exhibition",
      "image": "/assets/gallery/gallery_exhibition_ex1_1.jpg"
    },
    {
      "id": "gb-st-2",
      "title": "Lovol Combine Harvester Demonstration (Jigawa State, 2024) - Highlight 2",
      "category": "Exhibition",
      "image": "/assets/gallery/gallery_exhibition_ex1_2.jpg"
    },
    {
      "id": "gb-st-3",
      "title": "Lovol Combine Harvester Demonstration (Jigawa State, 2024) - Highlight 3",
      "category": "Exhibition",
      "image": "/assets/gallery/gallery_exhibition_ex1_3.jpg"
    },
    {
      "id": "gb-st-4",
      "title": "Lovol Tractors & Harvesters Unveiling (Jigawa State) - Highlight 1",
      "category": "Exhibition",
      "image": "/assets/gallery/gallery_exhibition_ex2_1.jpg"
    },
    {
      "id": "gb-st-5",
      "title": "Lovol Tractors & Harvesters Unveiling (Jigawa State) - Highlight 2",
      "category": "Exhibition",
      "image": "/assets/gallery/gallery_exhibition_ex2_2.jpg"
    },
    {
      "id": "gb-st-6",
      "title": "Lovol Tractors & Harvesters Unveiling (Jigawa State) - Highlight 3",
      "category": "Exhibition",
      "image": "/assets/gallery/gallery_exhibition_ex2_3.jpg"
    },
    {
      "id": "gb-st-7",
      "title": "Lovol Tractors & Harvesters Unveiling (Jigawa State) - Highlight 4",
      "category": "Exhibition",
      "image": "/assets/gallery/gallery_exhibition_ex2_4.jpg"
    },
    {
      "id": "gb-st-8",
      "title": "Lovol Tractors & Harvesters Unveiling (Jigawa State) - Highlight 5",
      "category": "Exhibition",
      "image": "/assets/gallery/gallery_exhibition_ex2_5.jpg"
    },
    {
      "id": "gb-st-9",
      "title": "Lovol Tractors & Harvesters Unveiling (Jigawa State) - Highlight 6",
      "category": "Exhibition",
      "image": "/assets/gallery/gallery_exhibition_ex2_6.jpg"
    },
    {
      "id": "gb-st-10",
      "title": "Lovol × Sankara Agricultural Workshop - Highlight 1",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w1_1.jpg"
    },
    {
      "id": "gb-st-11",
      "title": "Lovol × Sankara Agricultural Workshop - Highlight 2",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w1_2.jpg"
    },
    {
      "id": "gb-st-12",
      "title": "Lovol × Sankara Agricultural Workshop - Highlight 3",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w1_3.jpg"
    },
    {
      "id": "gb-st-13",
      "title": "Lovol × Sankara Agricultural Workshop - Highlight 4",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w1_4.jpg"
    },
    {
      "id": "gb-st-14",
      "title": "Lovol × Sankara Agricultural Workshop - Highlight 5",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w1_5.jpg"
    },
    {
      "id": "gb-st-15",
      "title": "Lovol × Sankara Agricultural Workshop - Highlight 6",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w1_6.jpg"
    },
    {
      "id": "gb-st-16",
      "title": "Lovol × Sankara Agricultural Workshop - Highlight 7",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w1_7.jpg"
    },
    {
      "id": "gb-st-17",
      "title": "Lovol × Sankara Agricultural Workshop - Highlight 8",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w1_8.jpg"
    },
    {
      "id": "gb-st-18",
      "title": "Lovol × Sankara Agricultural Workshop - Highlight 9",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w1_9.jpg"
    },
    {
      "id": "gb-st-19",
      "title": "Lovol × Sankara Agricultural Workshop - Highlight 10",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w1_10.jpg"
    },
    {
      "id": "gb-st-20",
      "title": "NIAEXPO 2025 Agricultural Exhibition - Highlight 1",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w2_1.jpg"
    },
    {
      "id": "gb-st-21",
      "title": "NIAEXPO 2025 Agricultural Exhibition - Highlight 2",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w2_2.jpg"
    },
    {
      "id": "gb-st-22",
      "title": "NIAEXPO 2025 Agricultural Exhibition - Highlight 3",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w2_3.jpg"
    },
    {
      "id": "gb-st-23",
      "title": "NIAEXPO 2025 Agricultural Exhibition - Highlight 4",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w2_4.jpg"
    },
    {
      "id": "gb-st-24",
      "title": "NIAEXPO 2025 Agricultural Exhibition - Highlight 5",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w2_5.jpg"
    },
    {
      "id": "gb-st-25",
      "title": "NIAEXPO 2025 Agricultural Exhibition - Highlight 6",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w2_6.jpg"
    },
    {
      "id": "gb-st-26",
      "title": "NIAEXPO 2025 Agricultural Exhibition - Highlight 7",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w2_7.jpg"
    },
    {
      "id": "gb-st-27",
      "title": "NIAEXPO 2025 Agricultural Exhibition - Highlight 8",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w2_8.jpg"
    },
    {
      "id": "gb-st-28",
      "title": "NIAEXPO 2025 Agricultural Exhibition - Highlight 9",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w2_9.jpg"
    },
    {
      "id": "gb-st-29",
      "title": "NIAEXPO 2025 Agricultural Exhibition - Highlight 10",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w2_10.jpg"
    },
    {
      "id": "gb-st-30",
      "title": "Technical Workshop at Warehouse (Jan 2026) - Highlight 1",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w3_1.jpg"
    },
    {
      "id": "gb-st-31",
      "title": "Technical Workshop at Warehouse (Jan 2026) - Highlight 2",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w3_2.jpg"
    },
    {
      "id": "gb-st-32",
      "title": "Technical Workshop at Warehouse (Jan 2026) - Highlight 3",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w3_3.jpg"
    },
    {
      "id": "gb-st-33",
      "title": "Technical Workshop at Warehouse (Jan 2026) - Highlight 4",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w3_4.jpg"
    },
    {
      "id": "gb-st-34",
      "title": "Technical Workshop at Warehouse (Jan 2026) - Highlight 5",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w3_5.jpg"
    },
    {
      "id": "gb-st-35",
      "title": "Technical Workshop at Warehouse (Jan 2026) - Highlight 6",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w3_6.jpg"
    },
    {
      "id": "gb-st-36",
      "title": "Technical Workshop at Warehouse (Jan 2026) - Highlight 7",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w3_7.jpg"
    },
    {
      "id": "gb-st-37",
      "title": "Technical Workshop at Warehouse (Jan 2026) - Highlight 8",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w3_8.jpg"
    },
    {
      "id": "gb-st-38",
      "title": "Technical Workshop at Warehouse (Jan 2026) - Highlight 9",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w3_9.jpg"
    },
    {
      "id": "gb-st-39",
      "title": "Technical Workshop at Warehouse (Jan 2026) - Highlight 10",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w3_10.jpg"
    },
    {
      "id": "gb-st-40",
      "title": "Technical Workshop at Warehouse (Jan 2026) - Highlight 11",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w3_11.jpg"
    },
    {
      "id": "gb-st-41",
      "title": "Technical Workshop at Warehouse (Jan 2026) - Highlight 12",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w3_12.jpg"
    },
    {
      "id": "gb-st-42",
      "title": "Technical Workshop at Warehouse (Jan 2026) - Highlight 13",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w3_13.jpg"
    },
    {
      "id": "gb-st-43",
      "title": "Technical Workshop at Warehouse (Jan 2026) - Highlight 14",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w3_14.jpg"
    },
    {
      "id": "gb-st-44",
      "title": "Technical Workshop at Warehouse (Jan 2026) - Highlight 15",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w3_15.jpg"
    },
    {
      "id": "gb-st-45",
      "title": "Technical Workshop at Warehouse (Jan 2026) - Highlight 16",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w3_16.jpg"
    },
    {
      "id": "gb-st-46",
      "title": "Technical Workshop at Zaria - Highlight 1",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w4_1.jpg"
    },
    {
      "id": "gb-st-47",
      "title": "Technical Workshop at Zaria - Highlight 2",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w4_2.jpg"
    },
    {
      "id": "gb-st-48",
      "title": "Technical Workshop at Zaria - Highlight 3",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w4_3.jpg"
    },
    {
      "id": "gb-st-49",
      "title": "Technical Workshop at Zaria - Highlight 4",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w4_4.jpg"
    },
    {
      "id": "gb-st-50",
      "title": "Technical Workshop at Zaria - Highlight 5",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w4_5.jpg"
    },
    {
      "id": "gb-st-51",
      "title": "Technical Workshop at Zaria - Highlight 6",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w4_6.jpg"
    },
    {
      "id": "gb-st-52",
      "title": "Technical Workshop at Zaria - Highlight 7",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w4_7.jpg"
    },
    {
      "id": "gb-st-53",
      "title": "Technical Workshop at Zaria - Highlight 8",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w4_8.jpg"
    },
    {
      "id": "gb-st-54",
      "title": "Technical Workshop at Zaria - Highlight 9",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w4_9.jpg"
    },
    {
      "id": "gb-st-55",
      "title": "Technical Workshop at Zaria - Highlight 10",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w4_10.jpg"
    },
    {
      "id": "gb-st-56",
      "title": "Technical Workshop at Zaria - Highlight 11",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w4_11.jpg"
    },
    {
      "id": "gb-st-57",
      "title": "Technical Workshop at Zaria - Highlight 12",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w4_12.jpg"
    },
    {
      "id": "gb-st-58",
      "title": "Technical Workshop at Zaria - Highlight 13",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w4_13.jpg"
    },
    {
      "id": "gb-st-59",
      "title": "Technical Workshop at Zaria - Highlight 14",
      "category": "Workshop",
      "image": "/assets/gallery/gallery_workshop_w4_14.jpg"
    },
    {
      "id": "gb-st-60",
      "title": "Sankara Nigeria Team & Office Operations - Highlight 1",
      "category": "Our Company",
      "image": "/assets/gallery/gallery_our_comapny_1.jpg"
    },
    {
      "id": "gb-st-61",
      "title": "Sankara Nigeria Team & Office Operations - Highlight 2",
      "category": "Our Company",
      "image": "/assets/gallery/gallery_our_comapny_2.jpg"
    },
    {
      "id": "gb-st-62",
      "title": "Sankara Nigeria Team & Office Operations - Highlight 3",
      "category": "Our Company",
      "image": "/assets/gallery/gallery_our_comapny_3.jpg"
    },
    {
      "id": "gb-st-63",
      "title": "Sankara Nigeria Team & Office Operations - Highlight 4",
      "category": "Our Company",
      "image": "/assets/gallery/gallery_our_comapny_4.jpg"
    },
    {
      "id": "gb-st-64",
      "title": "Sankara Nigeria Team & Office Operations - Highlight 5",
      "category": "Our Company",
      "image": "/assets/gallery/gallery_our_comapny_5.jpg"
    },
    {
      "id": "gb-st-65",
      "title": "Sankara Nigeria Team & Office Operations - Highlight 6",
      "category": "Our Company",
      "image": "/assets/gallery/gallery_our_comapny_6.jpg"
    },
    {
      "id": "gb-st-66",
      "title": "Sankara Nigeria Team & Office Operations - Highlight 7",
      "category": "Our Company",
      "image": "/assets/gallery/gallery_our_comapny_7.jpg"
    },
    {
      "id": "gb-st-67",
      "title": "Sankara Nigeria Team & Office Operations - Highlight 8",
      "category": "Our Company",
      "image": "/assets/gallery/gallery_our_comapny_8.jpg"
    },
    {
      "id": "gb-st-68",
      "title": "Sankara Nigeria Team & Office Operations - Highlight 9",
      "category": "Our Company",
      "image": "/assets/gallery/gallery_our_comapny_9.jpg"
    },
{
      "id": "fb-db-100",
      "title": "ECOWAS Delegation Partnership Visit - Highlight 1",
      "category": "ECOWAS Visit",
      "image": "/assets/gallery/ECOWAS/WhatsApp Image 2026-07-13 at 3.22.47 PM.jpeg"
    },
    {
      "id": "fb-db-101",
      "title": "ECOWAS Delegation Partnership Visit - Highlight 2",
      "category": "ECOWAS Visit",
      "image": "/assets/gallery/ECOWAS/WhatsApp Image 2026-07-13 at 3.22.48 PM (1).jpeg"
    },
    {
      "id": "fb-db-102",
      "title": "ECOWAS Delegation Partnership Visit - Highlight 3",
      "category": "ECOWAS Visit",
      "image": "/assets/gallery/ECOWAS/WhatsApp Image 2026-07-13 at 3.22.48 PM.jpeg"
    },
    {
      "id": "fb-db-103",
      "title": "ECOWAS Delegation Partnership Visit - Highlight 4",
      "category": "ECOWAS Visit",
      "image": "/assets/gallery/ECOWAS/WhatsApp Image 2026-07-13 at 3.22.49 PM.jpeg"
    },
    {
      "id": "fb-db-104",
      "title": "ECOWAS Delegation Partnership Visit - Highlight 5",
      "category": "ECOWAS Visit",
      "image": "/assets/gallery/ECOWAS/WhatsApp Image 2026-07-13 at 3.22.50 PM (1).jpeg"
    },
    {
      "id": "fb-db-105",
      "title": "ECOWAS Delegation Partnership Visit - Highlight 6",
      "category": "ECOWAS Visit",
      "image": "/assets/gallery/ECOWAS/WhatsApp Image 2026-07-13 at 3.22.50 PM.jpeg"
    },
    {
      "id": "fb-db-106",
      "title": "ECOWAS Delegation Partnership Visit - Highlight 7",
      "category": "ECOWAS Visit",
      "image": "/assets/gallery/ECOWAS/WhatsApp Image 2026-07-13 at 3.22.52 PM.jpeg"
    },
    {
      "id": "fb-db-107",
      "title": "ECOWAS Delegation Partnership Visit - Highlight 8",
      "category": "ECOWAS Visit",
      "image": "/assets/gallery/ECOWAS/WhatsApp Image 2026-07-13 at 3.22.53 PM (1).jpeg"
    },
    {
      "id": "fb-db-108",
      "title": "ECOWAS Delegation Partnership Visit - Highlight 9",
      "category": "ECOWAS Visit",
      "image": "/assets/gallery/ECOWAS/WhatsApp Image 2026-07-13 at 3.22.53 PM.jpeg"
    },
    {
      "id": "fb-db-109",
      "title": "ECOWAS Delegation Partnership Visit - Highlight 10",
      "category": "ECOWAS Visit",
      "image": "/assets/gallery/ECOWAS/WhatsApp Image 2026-07-13 at 3.22.54 PM (1).jpeg"
    },
    {
      "id": "fb-db-110",
      "title": "ECOWAS Delegation Partnership Visit - Highlight 11",
      "category": "ECOWAS Visit",
      "image": "/assets/gallery/ECOWAS/WhatsApp Image 2026-07-13 at 3.22.54 PM.jpeg"
    },
    {
      "id": "fb-db-111",
      "title": "ECOWAS Delegation Partnership Visit - Highlight 12",
      "category": "ECOWAS Visit",
      "image": "/assets/gallery/ECOWAS/WhatsApp Image 2026-07-13 at 3.22.55 PM.jpeg"
    },
    {
      "id": "fb-db-112",
      "title": "ECOWAS Delegation Partnership Visit - Highlight 13",
      "category": "ECOWAS Visit",
      "image": "/assets/gallery/ECOWAS/WhatsApp Image 2026-07-13 at 3.23.03 PM.jpeg"
    },
    {
      "id": "fb-db-113",
      "title": "ECOWAS Delegation Partnership Visit - Highlight 14",
      "category": "ECOWAS Visit",
      "image": "/assets/gallery/ECOWAS/WhatsApp Image 2026-07-13 at 3.23.04 PM.jpeg"
    },
    {
      "id": "fb-db-114",
      "title": "ECOWAS Delegation Partnership Visit - Highlight 15",
      "category": "ECOWAS Visit",
      "image": "/assets/gallery/ECOWAS/WhatsApp Image 2026-07-13 at 3.23.06 PM.jpeg"
    },
    {
      "id": "fb-db-115",
      "title": "ECOWAS Delegation Partnership Visit - Highlight 16",
      "category": "ECOWAS Visit",
      "image": "/assets/gallery/ECOWAS/WhatsApp Image 2026-07-13 at 3.23.13 PM.jpeg"
    },
    {
      "id": "fb-db-116",
      "title": "ECOWAS Delegation Partnership Visit - Highlight 17",
      "category": "ECOWAS Visit",
      "image": "/assets/gallery/ECOWAS/WhatsApp Image 2026-07-13 at 3.23.16 PM.jpeg"
    },
    {
      "id": "fb-db-117",
      "title": "ECOWAS Delegation Partnership Visit - Highlight 18",
      "category": "ECOWAS Visit",
      "image": "/assets/gallery/ECOWAS/WhatsApp Image 2026-07-13 at 3.23.17 PM.jpeg"
    },
    {
      "id": "fb-db-118",
      "title": "ECOWAS Delegation Partnership Visit - Highlight 19",
      "category": "ECOWAS Visit",
      "image": "/assets/gallery/ECOWAS/WhatsApp Image 2026-07-13 at 3.23.18 PM (1).jpeg"
    },
    {
      "id": "fb-db-119",
      "title": "ECOWAS Delegation Partnership Visit - Highlight 20",
      "category": "ECOWAS Visit",
      "image": "/assets/gallery/ECOWAS/WhatsApp Image 2026-07-13 at 3.23.18 PM.jpeg"
    },
    {
      "id": "fb-db-120",
      "title": "ECOWAS Delegation Partnership Visit - Highlight 21",
      "category": "ECOWAS Visit",
      "image": "/assets/gallery/ECOWAS/WhatsApp Image 2026-07-13 at 3.23.21 PM (1).jpeg"
    },
    {
      "id": "fb-db-121",
      "title": "ECOWAS Delegation Partnership Visit - Highlight 22",
      "category": "ECOWAS Visit",
      "image": "/assets/gallery/ECOWAS/WhatsApp Image 2026-07-13 at 3.23.21 PM.jpeg"
    },
    {
      "id": "fb-db-122",
      "title": "Regional Agricultural Machinery Field Excursion - Highlight 1",
      "category": "Excursion",
      "image": "/assets/gallery/EXCURSION/WhatsApp Image 2026-07-13 at 3.17.21 PM.jpeg"
    },
    {
      "id": "fb-db-123",
      "title": "Regional Agricultural Machinery Field Excursion - Highlight 2",
      "category": "Excursion",
      "image": "/assets/gallery/EXCURSION/WhatsApp Image 2026-07-13 at 3.17.28 PM (1).jpeg"
    },
    {
      "id": "fb-db-124",
      "title": "Regional Agricultural Machinery Field Excursion - Highlight 3",
      "category": "Excursion",
      "image": "/assets/gallery/EXCURSION/WhatsApp Image 2026-07-13 at 3.17.28 PM.jpeg"
    },
    {
      "id": "fb-db-125",
      "title": "Regional Agricultural Machinery Field Excursion - Highlight 4",
      "category": "Excursion",
      "image": "/assets/gallery/EXCURSION/WhatsApp Image 2026-07-13 at 3.17.29 PM (1).jpeg"
    },
    {
      "id": "fb-db-126",
      "title": "Regional Agricultural Machinery Field Excursion - Highlight 5",
      "category": "Excursion",
      "image": "/assets/gallery/EXCURSION/WhatsApp Image 2026-07-13 at 3.17.29 PM (2).jpeg"
    },
    {
      "id": "fb-db-127",
      "title": "Regional Agricultural Machinery Field Excursion - Highlight 6",
      "category": "Excursion",
      "image": "/assets/gallery/EXCURSION/WhatsApp Image 2026-07-13 at 3.17.29 PM.jpeg"
    },
    {
      "id": "fb-db-128",
      "title": "Regional Agricultural Machinery Field Excursion - Highlight 7",
      "category": "Excursion",
      "image": "/assets/gallery/EXCURSION/WhatsApp Image 2026-07-13 at 3.17.30 PM (1).jpeg"
    },
    {
      "id": "fb-db-129",
      "title": "Regional Agricultural Machinery Field Excursion - Highlight 8",
      "category": "Excursion",
      "image": "/assets/gallery/EXCURSION/WhatsApp Image 2026-07-13 at 3.17.30 PM (2).jpeg"
    },
    {
      "id": "fb-db-130",
      "title": "Regional Agricultural Machinery Field Excursion - Highlight 9",
      "category": "Excursion",
      "image": "/assets/gallery/EXCURSION/WhatsApp Image 2026-07-13 at 3.17.30 PM.jpeg"
    },
    {
      "id": "fb-db-131",
      "title": "Regional Agricultural Machinery Field Excursion - Highlight 10",
      "category": "Excursion",
      "image": "/assets/gallery/EXCURSION/WhatsApp Image 2026-07-13 at 3.17.31 PM (1).jpeg"
    },
    {
      "id": "fb-db-132",
      "title": "Regional Agricultural Machinery Field Excursion - Highlight 11",
      "category": "Excursion",
      "image": "/assets/gallery/EXCURSION/WhatsApp Image 2026-07-13 at 3.17.31 PM.jpeg"
    },
    {
      "id": "fb-db-133",
      "title": "Regional Agricultural Machinery Field Excursion - Highlight 12",
      "category": "Excursion",
      "image": "/assets/gallery/EXCURSION/WhatsApp Image 2026-07-13 at 3.17.32 PM.jpeg"
    },
    {
      "id": "fb-db-134",
      "title": "Student Study Tour & Practical Training Day - Highlight 1",
      "category": "Student Visit",
      "image": "/assets/gallery/STUDENT VISIT/WhatsApp Image 2026-07-13 at 3.14.13 PM (1).jpeg"
    },
    {
      "id": "fb-db-135",
      "title": "Student Study Tour & Practical Training Day - Highlight 2",
      "category": "Student Visit",
      "image": "/assets/gallery/STUDENT VISIT/WhatsApp Image 2026-07-13 at 3.14.13 PM.jpeg"
    },
    {
      "id": "fb-db-136",
      "title": "Student Study Tour & Practical Training Day - Highlight 3",
      "category": "Student Visit",
      "image": "/assets/gallery/STUDENT VISIT/WhatsApp Image 2026-07-13 at 3.14.15 PM (1).jpeg"
    },
    {
      "id": "fb-db-137",
      "title": "Student Study Tour & Practical Training Day - Highlight 4",
      "category": "Student Visit",
      "image": "/assets/gallery/STUDENT VISIT/WhatsApp Image 2026-07-13 at 3.14.15 PM (2).jpeg"
    },
    {
      "id": "fb-db-138",
      "title": "Student Study Tour & Practical Training Day - Highlight 5",
      "category": "Student Visit",
      "image": "/assets/gallery/STUDENT VISIT/WhatsApp Image 2026-07-13 at 3.14.15 PM.jpeg"
    },
    {
      "id": "fb-db-139",
      "title": "Student Study Tour & Practical Training Day - Highlight 6",
      "category": "Student Visit",
      "image": "/assets/gallery/STUDENT VISIT/WhatsApp Image 2026-07-13 at 3.14.16 PM (1).jpeg"
    },
    {
      "id": "fb-db-140",
      "title": "Student Study Tour & Practical Training Day - Highlight 7",
      "category": "Student Visit",
      "image": "/assets/gallery/STUDENT VISIT/WhatsApp Image 2026-07-13 at 3.14.16 PM (2).jpeg"
    },
    {
      "id": "fb-db-141",
      "title": "Student Study Tour & Practical Training Day - Highlight 8",
      "category": "Student Visit",
      "image": "/assets/gallery/STUDENT VISIT/WhatsApp Image 2026-07-13 at 3.14.16 PM.jpeg"
    },
    {
      "id": "fb-db-142",
      "title": "Student Study Tour & Practical Training Day - Highlight 9",
      "category": "Student Visit",
      "image": "/assets/gallery/STUDENT VISIT/WhatsApp Image 2026-07-13 at 3.14.17 PM (1).jpeg"
    },
    {
      "id": "fb-db-143",
      "title": "Student Study Tour & Practical Training Day - Highlight 10",
      "category": "Student Visit",
      "image": "/assets/gallery/STUDENT VISIT/WhatsApp Image 2026-07-13 at 3.14.17 PM.jpeg"
    },
    {
      "id": "fb-db-144",
      "title": "Student Study Tour & Practical Training Day - Highlight 11",
      "category": "Student Visit",
      "image": "/assets/gallery/STUDENT VISIT/WhatsApp Image 2026-07-13 at 3.14.21 PM (1).jpeg"
    },
    {
      "id": "fb-db-145",
      "title": "Student Study Tour & Practical Training Day - Highlight 12",
      "category": "Student Visit",
      "image": "/assets/gallery/STUDENT VISIT/WhatsApp Image 2026-07-13 at 3.14.21 PM.jpeg"
    },
    {
      "id": "fb-db-146",
      "title": "Student Study Tour & Practical Training Day - Highlight 13",
      "category": "Student Visit",
      "image": "/assets/gallery/STUDENT VISIT/WhatsApp Image 2026-07-13 at 3.14.22 PM (1).jpeg"
    },
    {
      "id": "fb-db-147",
      "title": "Student Study Tour & Practical Training Day - Highlight 14",
      "category": "Student Visit",
      "image": "/assets/gallery/STUDENT VISIT/WhatsApp Image 2026-07-13 at 3.14.22 PM (2).jpeg"
    },
    {
      "id": "fb-db-148",
      "title": "Student Study Tour & Practical Training Day - Highlight 15",
      "category": "Student Visit",
      "image": "/assets/gallery/STUDENT VISIT/WhatsApp Image 2026-07-13 at 3.14.22 PM (3).jpeg"
    },
    {
      "id": "fb-db-149",
      "title": "Student Study Tour & Practical Training Day - Highlight 16",
      "category": "Student Visit",
      "image": "/assets/gallery/STUDENT VISIT/WhatsApp Image 2026-07-13 at 3.14.22 PM.jpeg"
    },
    {
      "id": "fb-db-150",
      "title": "Student Study Tour & Practical Training Day - Highlight 17",
      "category": "Student Visit",
      "image": "/assets/gallery/STUDENT VISIT/WhatsApp Image 2026-07-13 at 3.14.23 PM (1).jpeg"
    },
    {
      "id": "fb-db-151",
      "title": "Student Study Tour & Practical Training Day - Highlight 18",
      "category": "Student Visit",
      "image": "/assets/gallery/STUDENT VISIT/WhatsApp Image 2026-07-13 at 3.14.23 PM (2).jpeg"
    },
    {
      "id": "fb-db-152",
      "title": "Student Study Tour & Practical Training Day - Highlight 19",
      "category": "Student Visit",
      "image": "/assets/gallery/STUDENT VISIT/WhatsApp Image 2026-07-13 at 3.14.23 PM.jpeg"
    },
    {
      "id": "fb-db-153",
      "title": "Student Study Tour & Practical Training Day - Highlight 20",
      "category": "Student Visit",
      "image": "/assets/gallery/STUDENT VISIT/WhatsApp Image 2026-07-13 at 3.14.27 PM (1).jpeg"
    },
    {
      "id": "fb-db-154",
      "title": "Student Study Tour & Practical Training Day - Highlight 21",
      "category": "Student Visit",
      "image": "/assets/gallery/STUDENT VISIT/WhatsApp Image 2026-07-13 at 3.14.27 PM.jpeg"
    },
    {
      "id": "fb-db-155",
      "title": "Student Study Tour & Practical Training Day - Highlight 22",
      "category": "Student Visit",
      "image": "/assets/gallery/STUDENT VISIT/WhatsApp Image 2026-07-13 at 3.14.28 PM (1).jpeg"
    },
    {
      "id": "fb-db-156",
      "title": "Student Study Tour & Practical Training Day - Highlight 23",
      "category": "Student Visit",
      "image": "/assets/gallery/STUDENT VISIT/WhatsApp Image 2026-07-13 at 3.14.28 PM.jpeg"
    },
    {
      "id": "fb-db-157",
      "title": "Student Study Tour & Practical Training Day - Highlight 24",
      "category": "Student Visit",
      "image": "/assets/gallery/STUDENT VISIT/WhatsApp Image 2026-07-13 at 3.14.29 PM (1).jpeg"
    },
    {
      "id": "fb-db-158",
      "title": "Student Study Tour & Practical Training Day - Highlight 25",
      "category": "Student Visit",
      "image": "/assets/gallery/STUDENT VISIT/WhatsApp Image 2026-07-13 at 3.14.29 PM.jpeg"
    },
    {
      "id": "fb-db-159",
      "title": "Student Study Tour & Practical Training Day - Highlight 26",
      "category": "Student Visit",
      "image": "/assets/gallery/STUDENT VISIT/WhatsApp Image 2026-07-13 at 3.14.30 PM.jpeg"
    },
  ];

  // Load Media Gallery items - fetched from /api/activities
  const loadGallery = async () => {
    try {
      const res = await fetch(`/api/activities?t=${Date.now()}`);
      const dbItems = await res.json();
      
      const dbTitles = new Set(dbItems.map(i => (i.title || i.name || '').toLowerCase()));
      const uniqueFallbacks = fallbackGalleryItems.filter(i => !dbTitles.has(i.title.toLowerCase()));
      
      allGalleryItems = [...dbItems, ...uniqueFallbacks];
      renderGalleryItems();
    } catch (err) {
      console.error('Error loading gallery API, using fallbacks:', err);
      allGalleryItems = [...fallbackGalleryItems];
      renderGalleryItems();
    }
  };

  const renderGalleryItems = () => {
    const grid = gallerySec.querySelector('#gallery-items-grid');
    filteredItems = currentFilter === 'All' ? allGalleryItems : allGalleryItems.filter(i => i.category === currentFilter);

    if (filteredItems.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 100px 0; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 24px;">
          <p style="color: #64748b; font-size: 1.1rem; font-weight: 600;">Our media archive for this category is currently being updated.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filteredItems.map((item, idx) => {
      let firstImage = '';
      if (item.image) {
        try {
          if (item.image.startsWith('[') && item.image.endsWith(']')) {
            const arr = JSON.parse(item.image);
            if (arr.length > 0) firstImage = arr[0];
          } else {
            firstImage = item.image;
          }
        } catch(e) {
          firstImage = item.image;
        }
      }

      return `
        <div class="gallery-item-card" data-idx="${idx}">
          <div class="card-img-wrapper">
            ${firstImage ? `<img src="${firstImage}" alt="${item.title || item.name}" loading="lazy">` : ''}
            ${item.video_url ? `
              <div class="video-badge">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>
            ` : ''}
          </div>
          <div class="card-body-info">
            <span class="card-meta-tag">${item.category}</span>
            <h4 class="card-title-text">${item.title || item.name}</h4>
          </div>
        </div>
      `;
    }).join('');

    // Attach click listeners to cards
    grid.querySelectorAll('.gallery-item-card').forEach(el => {
      el.onclick = () => {
        const idx = parseInt(el.dataset.idx);
        openLightbox(idx);
      };
    });

    if (window.initAnimations) {
      setTimeout(window.initAnimations, 100);
    }
  };

  // Lightbox Operations
  const openLightbox = (index) => {
    activeIndex = index;
    const item = filteredItems[activeIndex];
    const content = lightboxOverlay.querySelector('#lbContent');
    const title = lightboxOverlay.querySelector('#lbTitle');
    const category = lightboxOverlay.querySelector('#lbCategory');
    const description = lightboxOverlay.querySelector('#lbDescription');
    const thumbsContainer = lightboxOverlay.querySelector('#lbThumbnails');

    if (item.video_url) {
      thumbsContainer.style.display = 'none';
      thumbsContainer.innerHTML = '';
      
      const getVideoEmbedHtml = (url) => {
        if (!url) return '';
        let vidId = '';

        // 1. YouTube Shorts
        if (url.includes('youtube.com/shorts/')) {
          vidId = url.split('shorts/')[1].split('?')[0].split('/')[0];
        }
        // 2. YouTube Watch
        else if (url.includes('youtube.com/watch?v=')) {
          vidId = url.split('v=')[1].split('&')[0];
        }
        // 3. YouTube Shortened (youtu.be)
        else if (url.includes('youtu.be/')) {
          vidId = url.split('be/')[1].split('?')[0].split('/')[0];
        }
        // 4. YouTube Embed
        else if (url.includes('youtube.com/embed/')) {
          vidId = url.split('embed/')[1].split('?')[0].split('/')[0];
        }

        if (vidId) {
          return `<iframe src="https://www.youtube.com/embed/${vidId}?autoplay=1" style="width: 80vw; height: 45vw; max-width: 900px; max-height: 60vh; border: none; border-radius: 16px; box-shadow: 0 20px 50px rgba(0,0,0,0.5);" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" allowfullscreen></iframe>`;
        }

        // 5. Google Drive Video
        if (url.includes('drive.google.com')) {
          let driveUrl = url;
          if (driveUrl.includes('/view')) driveUrl = driveUrl.replace('/view', '/preview');
          else if (!driveUrl.includes('/preview')) driveUrl += '/preview';
          return `<iframe src="${driveUrl}" style="width: 80vw; height: 45vw; max-width: 900px; max-height: 60vh; border: none; border-radius: 16px; box-shadow: 0 20px 50px rgba(0,0,0,0.5);" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
        }

        // 6. Vimeo
        if (url.includes('vimeo.com/')) {
          const vimeoId = url.split('vimeo.com/')[1].split('?')[0].split('/')[0];
          if (vimeoId) {
            return `<iframe src="https://player.vimeo.com/video/${vimeoId}?autoplay=1" style="width: 80vw; height: 45vw; max-width: 900px; max-height: 60vh; border: none; border-radius: 16px;" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
          }
        }

        // 7. Direct HTML5 Video File (.mp4, .webm, .mov, data:video/)
        if (url.match(/\.(mp4|webm|ogg|mov)(\?.*)?$/i) || url.startsWith('data:video/') || url.startsWith('blob:')) {
          return `<video src="${url}" controls autoplay style="max-width: 90vw; max-height: 65vh; border-radius: 16px; box-shadow: 0 20px 50px rgba(0,0,0,0.5);"></video>`;
        }

        // 8. General fallback for any other video webpage URL
        return `<div style="width: 80vw; max-width: 650px; padding: 2.5rem; background: #1e293b; border-radius: 16px; text-align: center; color: white;">
          <h3 style="font-size: 1.3rem; margin-bottom: 0.75rem; color: #38bdf8;">Video Stream</h3>
          <p style="color: #94a3b8; margin-bottom: 1.25rem; font-size: 0.95rem;">Click the button below to watch this video stream directly.</p>
          <a href="${url}" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: #0284c7; color: white; padding: 12px 24px; border-radius: 8px; font-weight: 700; text-decoration: none;">Watch Video Source &rarr;</a>
        </div>`;
      };

      content.innerHTML = getVideoEmbedHtml(item.video_url);
    } else {
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
        content.innerHTML = `<img src="${images[imgIdx]}" class="lb-image" alt="${item.title || item.name}" style="max-width: 90vw; max-height: 60vh; border-radius: 16px; object-fit: contain; transition: opacity 0.3s ease;">`;
        
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
    }

    title.textContent = item.title || item.name;
    category.textContent = item.category || 'Field Activity';
    description.textContent = item.description || item.event_description || '';

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
    if (nextIdx < 0) nextIdx = filteredItems.length - 1;
    if (nextIdx >= filteredItems.length) nextIdx = 0;
    openLightbox(nextIdx);
  };

  // Bind Lightbox Event Handlers
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

  // Filter Pill Listeners
  gallerySec.querySelector('#gallery-filters-bar').onclick = (e) => {
    const pill = e.target.closest('.filter-pill');
    if (pill) {
      gallerySec.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
      pill.classList.add('active');
      currentFilter = pill.dataset.filter;
      renderGalleryItems();
    }
  };

  // Assemble Page
  container.appendChild(renderNavbar());
  container.appendChild(heroSec);
  container.appendChild(gallerySec);
  container.appendChild(lightboxOverlay);
  container.appendChild(renderFooter());

  // Load backend content
  loadGallery();

  return container;
}
