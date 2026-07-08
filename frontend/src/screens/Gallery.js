import { renderNavbar, renderFooter } from '../components/Navigation';

export function renderGalleryScreen() {
  const container = document.createElement('div');
  container.className = 'gallery-root';

  let allItems = [];
  let currentFilter = 'All';

  // Inject Stylesheet
  const styleTag = document.createElement('style');
  styleTag.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');
    
    .gallery-root {
      font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
      background: #ffffff;
      color: #0f172a;
      overflow-x: hidden;
    }

    .gallery-hero {
      background: linear-gradient(135deg, #022c22 0%, #064e3b 50%, #022c22 100%);
      color: #ffffff;
      padding: 180px 0 110px;
      position: relative;
      overflow: hidden;
      border-bottom: 1px solid rgba(16, 185, 129, 0.15);
      text-align: center;
    }

    .gallery-hero::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at top, rgba(16, 185, 129, 0.15), transparent 70%);
      pointer-events: none;
      z-index: 1;
    }

    .gallery-hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(16, 185, 129, 0.15);
      padding: 8px 16px;
      border-radius: 100px;
      border: 1px solid rgba(16, 185, 129, 0.2);
      margin-bottom: 25px;
      color: #34d399;
      font-size: 0.75rem;
      font-weight: 800;
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    .gallery-hero-title {
      font-size: clamp(2.6rem, 5vw, 4rem);
      font-weight: 900;
      line-height: 1.15;
      letter-spacing: -1.5px;
      margin-bottom: 20px;
      color: #ffffff;
    }

    .gallery-hero-title span {
      background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .gallery-hero-desc {
      font-size: 1.15rem;
      line-height: 1.6;
      color: #d1fae5;
      max-width: 650px;
      margin: 0 auto 45px;
    }

    /* Filter Pills */
    .filter-wrapper {
      display: flex;
      justify-content: center;
      gap: 12px;
      flex-wrap: wrap;
      position: relative;
      z-index: 2;
    }

    .filter-pill {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(16, 185, 129, 0.15);
      color: #a7f3d0;
      padding: 10px 24px;
      border-radius: 100px;
      font-size: 0.9rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .filter-pill:hover {
      background: rgba(16, 185, 129, 0.12);
      color: #ffffff;
      border-color: rgba(16, 185, 129, 0.3);
      transform: translateY(-2px);
    }

    .filter-pill.active {
      background: #10b981;
      color: #ffffff;
      border-color: #10b981;
      box-shadow: 0 10px 20px rgba(16, 185, 129, 0.3);
    }

    /* Gallery Grid */
    .gallery-section {
      padding: 100px 0 130px;
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
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.015);
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      cursor: pointer;
      position: relative;
    }

    .gallery-item-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
      border-color: rgba(16, 185, 129, 0.25);
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

    /* Video Play Overlay Badge */
    .video-badge {
      position: absolute;
      top: 15px;
      right: 15px;
      background: rgba(2, 44, 34, 0.85);
      border: 1px solid rgba(52, 211, 153, 0.3);
      backdrop-filter: blur(10px);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #34d399;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }

    /* Text info under image card */
    .card-body-info {
      padding: 24px 20px;
      border-top: 1px solid #f1f5f9;
    }

    .card-meta-tag {
      font-size: 0.75rem;
      font-weight: 800;
      color: #059669;
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
      background: rgba(2, 28, 21, 0.95);
      backdrop-filter: blur(25px);
      z-index: 9999;
      display: none;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .lb-wrapper {
      max-width: 90%;
      max-height: 80%;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 40px 100px rgba(0,0,0,0.5);
    }

    .lb-image {
      max-width: 100%;
      max-height: 75vh;
      object-fit: contain;
      border-radius: 16px;
      border: 1px solid rgba(16, 185, 129, 0.15);
    }

    .lb-close-btn {
      position: absolute;
      top: 40px;
      right: 40px;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: white;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      cursor: pointer;
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }

    .lb-close-btn:hover {
      background: #10b981;
      transform: scale(1.08) rotate(90deg);
      border-color: #10b981;
    }

    .lb-info-box {
      position: absolute;
      bottom: 50px;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      width: 90%;
      max-width: 700px;
      color: #ffffff;
      z-index: 10000;
    }

    .lb-nav-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: white;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      z-index: 10000;
    }

    .lb-nav-btn:hover {
      background: #10b981;
      border-color: #10b981;
      transform: translateY(-50%) scale(1.06);
    }

    .lb-prev { left: 40px; }
    .lb-next { right: 40px; }

    @media (max-width: 768px) {
      .lb-prev { left: 15px; }
      .lb-next { right: 15px; }
      .lb-close-btn { top: 20px; right: 20px; }
    }
  `;
  container.appendChild(styleTag);

  // 1. HERO SECTION
  const heroSec = document.createElement('header');
  heroSec.className = 'gallery-hero';
  heroSec.innerHTML = `
    <div class="container">
      <div class="gallery-hero-badge">Exhibition Highlights</div>
      <h1 class="gallery-hero-title">Browse Our <span>Photo Gallery</span></h1>
      <p class="gallery-hero-desc">
        Relive the highlights from our exhibitions. Browse through memorable moments showcasing our products, services, and vibrant community.
      </p>
      
      <div class="filter-wrapper" id="gallery-filters-bar">
        <button class="filter-pill active" data-filter="All">All Photos</button>
        <button class="filter-pill" data-filter="Exhibition">Exhibition</button>
        <button class="filter-pill" data-filter="Workshop">Workshop</button>
        <button class="filter-pill" data-filter="Our Company">Our Company</button>
        <button class="filter-pill" data-filter="Student Visit">Student Visit</button>
        <button class="filter-pill" data-filter="Excursion">Excursion</button>
        <button class="filter-pill" data-filter="ECOWAS Visit">ECOWAS Visit</button>
      </div>
    </div>
  `;

  // 2. GRID SECTION
  const gridSec = document.createElement('section');
  gridSec.className = 'gallery-section';
  gridSec.innerHTML = `
    <div class="container">
      <div class="gallery-grid" id="gallery-items-grid">
        <!-- Rendered via JS -->
      </div>
    </div>
  `;

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
    <div class="lb-wrapper" id="lbContent"></div>
    <div class="lb-info-box">
      <span id="lbCategory" style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 2px; color: #34d399; font-weight: 800; display: block; margin-bottom: 10px;"></span>
      <h3 id="lbTitle" style="margin: 0; font-size: 1.6rem; font-weight: 900; line-height: 1.2;"></h3>
    </div>
  `;

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
    "title": "Lovol Tractors & Harvesters Unveiling (Kura) - Highlight 1",
    "category": "Exhibition",
    "image": "/assets/gallery/gallery_exhibition_ex2_1.jpg"
  },
  {
    "id": "gb-st-5",
    "title": "Lovol Tractors & Harvesters Unveiling (Kura) - Highlight 2",
    "category": "Exhibition",
    "image": "/assets/gallery/gallery_exhibition_ex2_2.jpg"
  },
  {
    "id": "gb-st-6",
    "title": "Lovol Tractors & Harvesters Unveiling (Kura) - Highlight 3",
    "category": "Exhibition",
    "image": "/assets/gallery/gallery_exhibition_ex2_3.jpg"
  },
  {
    "id": "gb-st-7",
    "title": "Lovol Tractors & Harvesters Unveiling (Kura) - Highlight 4",
    "category": "Exhibition",
    "image": "/assets/gallery/gallery_exhibition_ex2_4.jpg"
  },
  {
    "id": "gb-st-8",
    "title": "Lovol Tractors & Harvesters Unveiling (Kura) - Highlight 5",
    "category": "Exhibition",
    "image": "/assets/gallery/gallery_exhibition_ex2_5.jpg"
  },
  {
    "id": "gb-st-9",
    "title": "Lovol Tractors & Harvesters Unveiling (Kura) - Highlight 6",
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
  }
];

  let filteredItems = [];
  let activeIndex = 0;

  const loadGallery = async () => {
    try {
      const res = await fetch('/api/gallery');
      const dbItems = await res.json();
      
      const dbTitles = new Set(dbItems.map(i => i.title.toLowerCase()));
      const uniqueFallbacks = fallbackGalleryItems.filter(i => !dbTitles.has(i.title.toLowerCase()));
      
      allItems = [...dbItems, ...uniqueFallbacks];
      renderItems();
    } catch (err) {
      console.error('Error loading gallery API, using fallbacks:', err);
      allItems = [...fallbackGalleryItems];
      renderItems();
    }
  };

  const renderItems = () => {
    const grid = gridSec.querySelector('#gallery-items-grid');
    filteredItems = currentFilter === 'All' ? allItems : allItems.filter(i => i.category === currentFilter);

    if (filteredItems.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 100px 0; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 24px;">
          <p style="color: #64748b; font-size: 1.1rem; font-weight: 600;">Our media archive for this category is currently being updated.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filteredItems.map((item, idx) => `
      <div class="gallery-item-card" data-idx="${idx}">
        <div class="card-img-wrapper">
          <img src="${item.image}" alt="${item.title}" loading="lazy">
          ${item.video_url ? `
            <div class="video-badge">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </div>
          ` : ''}
        </div>
        <div class="card-body-info">
          <span class="card-meta-tag">${item.category}</span>
          <h4 class="card-title-text">${item.title}</h4>
        </div>
      </div>
    `).join('');

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

    if (item.video_url) {
      let vidId = '';
      if (item.video_url.includes('youtube.com/watch?v=')) vidId = item.video_url.split('v=')[1].split('&')[0];
      else if (item.video_url.includes('youtu.be/')) vidId = item.video_url.split('be/')[1].split('?')[0];

      if (vidId) {
        content.innerHTML = `<iframe src="https://www.youtube.com/embed/${vidId}?autoplay=1" style="width: 80vw; height: 45vw; max-height: 70vh; border: none; border-radius: 16px;" allow="autoplay; fullscreen"></iframe>`;
      } else {
        content.innerHTML = `<video src="${item.video_url}" controls autoplay style="max-width: 100%; max-height: 70vh; border-radius: 16px;"></video>`;
      }
    } else {
      content.innerHTML = `<img src="${item.image}" class="lb-image" alt="${item.title}">`;
    }

    title.textContent = item.title;
    category.textContent = item.category;

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
  heroSec.querySelector('#gallery-filters-bar').onclick = (e) => {
    const pill = e.target.closest('.filter-pill');
    if (pill) {
      heroSec.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
      pill.classList.add('active');
      currentFilter = pill.dataset.filter;
      renderItems();
    }
  };

  // Assemble Page
  container.appendChild(renderNavbar());
  container.appendChild(heroSec);
  container.appendChild(gridSec);
  container.appendChild(lightboxOverlay);
  container.appendChild(renderFooter());

  loadGallery();
  return container;
}
