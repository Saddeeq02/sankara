import { renderNavbar, renderFooter } from '../components/Navigation';

export function renderActivitiesScreen() {
  const container = document.createElement('div');
  container.className = 'activities-root';

  let events = [];
  let allGalleryItems = [];
  let currentFilter = 'All';
  let filteredItems = [];
  let activeIndex = 0;

  // Inject Stylesheet
  const styleTag = document.createElement('style');
  styleTag.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');
    
    .activities-root {
      font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
      background: #ffffff;
      color: #0f172a;
      overflow-x: hidden;
    }

    .activities-hero {
      background: linear-gradient(135deg, #f8fafc 0%, #fee2e2 50%, #eff6ff 100%);
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

    /* Switcher Tab Bar */
    .switcher-bar {
      border-bottom: 1px solid #e2e8f0;
      background: #f8fafc;
      padding: 24px 0;
      display: flex;
      justify-content: center;
      gap: 15px;
      position: sticky;
      top: 80px;
      z-index: 100;
    }

    .switcher-tab {
      background: #ffffff;
      border: 1px solid rgba(37, 99, 235, 0.12);
      color: #475569;
      padding: 12px 30px;
      border-radius: 100px;
      font-size: 0.95rem;
      font-weight: 800;
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .switcher-tab:hover {
      background: rgba(37, 99, 235, 0.06);
      color: #2563eb;
      border-color: rgba(37, 99, 235, 0.25);
    }

    .switcher-tab.active {
      background: #2563eb;
      color: #ffffff;
      border-color: #2563eb;
      box-shadow: 0 10px 20px rgba(37, 99, 235, 0.25);
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
      border: 1px solid rgba(37, 99, 235, 0.15);
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
      background: #2563eb;
      transform: scale(1.08) rotate(90deg);
      border-color: #2563eb;
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
      background: #2563eb;
      border-color: #2563eb;
      transform: translateY(-50%) scale(1.06);
    }

    .lb-prev { left: 40px; }
    .lb-next { right: 40px; }

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
        Experience our field impact first-hand. Toggle below to explore our media exhibition gallery and our chronological journal of major agricultural activities across Nigeria.
      </p>
    </div>
  `;

  // 2. SWITCHER BAR
  const switcherBar = document.createElement('div');
  switcherBar.className = 'switcher-bar';
  switcherBar.innerHTML = `
    <button class="switcher-tab active" data-tab="gallery">Media Gallery</button>
    <button class="switcher-tab" data-tab="timeline">Field Journal Timeline</button>
  `;

  // 3. MEDIA GALLERY SECTION
  const gallerySec = document.createElement('section');
  gallerySec.className = 'gallery-section';
  gallerySec.id = 'gallery-container-section';
  gallerySec.style.display = 'block';
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

  // 4. TIMELINE SECTION
  const timelineSec = document.createElement('section');
  timelineSec.className = 'timeline-section';
  timelineSec.id = 'timeline-container-section';
  timelineSec.style.display = 'none';
  timelineSec.innerHTML = `
    <div class="container timeline-container">
      <div class="timeline-line"></div>
      <div id="timeline-events-grid">
        <!-- JS-loaded -->
      </div>
    </div>
  `;

  // 5. LIGHTBOX MODAL
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
      <span id="lbCategory" style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 2px; color: #2563eb; font-weight: 800; display: block; margin-bottom: 10px;"></span>
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

  // Load Activities (Timeline)
  const loadActivities = async () => {
    try {
      const res = await fetch('/api/activities');
      events = await res.json();
      events.sort((a, b) => b.id - a.id);
      renderEvents();
    } catch (err) {
      console.error('Error loading activities:', err);
    }
  };

  const renderEvents = () => {
    const list = timelineSec.querySelector('#timeline-events-grid');

    if (events.length === 0) {
      list.innerHTML = `
        <div style="text-align: center; padding: 100px 0; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 24px;">
          <p style="color: #64748b; font-size: 1.1rem; font-weight: 600;">Our technical activity log is currently being updated. Check back shortly.</p>
        </div>
      `;
      return;
    }

    list.innerHTML = events.map((event, idx) => `
      <div class="timeline-row">
        <div class="timeline-node"></div>
        
        <div class="timeline-col-date">
          <div class="timeline-date-val">${event.date}</div>
          <div class="timeline-date-label">Field Activity</div>
        </div>

        <div class="timeline-col-card">
          <div class="timeline-card">
            ${event.image ? `
              <div class="timeline-card-image">
                <img src="${event.image}" alt="${event.title}" loading="lazy">
              </div>
            ` : ''}
            <h3 class="timeline-card-title">${event.title}</h3>
            <p class="timeline-card-desc">${event.summary}</p>
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
    `).join('');

    if (window.initAnimations) {
      setTimeout(window.initAnimations, 100);
    }
  };

  // Load Media Gallery items
  const loadGallery = async () => {
    try {
      const res = await fetch('/api/gallery');
      const dbItems = await res.json();
      
      const dbTitles = new Set(dbItems.map(i => i.title.toLowerCase()));
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
  gallerySec.querySelector('#gallery-filters-bar').onclick = (e) => {
    const pill = e.target.closest('.filter-pill');
    if (pill) {
      gallerySec.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
      pill.classList.add('active');
      currentFilter = pill.dataset.filter;
      renderGalleryItems();
    }
  };

  // Switcher Tab Listeners
  const tabs = switcherBar.querySelectorAll('.switcher-tab');
  tabs.forEach(tab => {
    tab.onclick = () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const selectedTab = tab.dataset.tab;
      if (selectedTab === 'gallery') {
        gallerySec.style.display = 'block';
        timelineSec.style.display = 'none';
      } else {
        gallerySec.style.display = 'none';
        timelineSec.style.display = 'block';
      }

      if (window.initAnimations) {
        setTimeout(window.initAnimations, 100);
      }
    };
  });

  // Assemble Page
  container.appendChild(renderNavbar());
  container.appendChild(heroSec);
  container.appendChild(switcherBar);
  container.appendChild(gallerySec);
  container.appendChild(timelineSec);
  container.appendChild(lightboxOverlay);
  container.appendChild(renderFooter());

  // Load backend content
  loadActivities();
  loadGallery();

  return container;
}
