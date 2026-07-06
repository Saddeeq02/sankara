import { renderNavbar, renderFooter } from '../components/Navigation';
import { renderProductCard } from '../components/ProductCard';

export function renderHomeScreen() {
  const container = document.createElement('div');
  container.style.backgroundColor = '#ffffff';
  container.style.color = '#0f172a';
  container.style.fontFamily = "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif";

  // Inject Unique Premium Styles
  const styleTag = document.createElement('style');
  styleTag.textContent = `
    /* Reset & Typography */
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');
    
    .home-root {
      overflow-x: hidden;
    }
    
    /* Hero section with clean gradient background and custom graphic */
    .hero-sec {
      background: linear-gradient(135deg, #022c22 0%, #064e3b 50%, #022c22 100%);
      color: #ffffff;
      padding: 180px 0 160px;
      position: relative;
      overflow: hidden;
    }
    
    .hero-sec::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 120px;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23f8fafc' fill-opacity='1' d='M0,224L80,229.3C160,235,320,245,480,218.7C640,192,800,128,960,117.3C1120,107,1280,149,1360,170.7L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z'%3E%3C/path%3E%3C/svg%3E") no-repeat;
      background-size: cover;
      z-index: 2;
    }
    
    .hero-grid {
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      gap: 50px;
      align-items: center;
      position: relative;
      z-index: 3;
    }
    
    @media (max-width: 968px) {
      .hero-grid {
        grid-template-columns: 1fr;
        text-align: center;
      }
    }
    
    .hero-title-main {
      font-size: clamp(2.6rem, 5vw, 4.4rem);
      font-weight: 900;
      line-height: 1.1;
      letter-spacing: -2px;
      margin-bottom: 25px;
      color: #ffffff;
    }
    
    .hero-title-main span {
      background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .hero-desc {
      font-size: 1.2rem;
      line-height: 1.7;
      color: #d1fae5;
      margin-bottom: 45px;
      max-width: 620px;
    }
    
    @media (max-width: 968px) {
      .hero-desc {
        margin-left: auto;
        margin-right: auto;
      }
    }
    
    /* Interactive Image frame */
    .hero-visual {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .visual-frame {
      position: relative;
      width: 100%;
      max-width: 460px;
      height: 380px;
      border-radius: 24px;
      padding: 10px;
      background: linear-gradient(135deg, rgba(16, 185, 129, 0.4), rgba(52, 211, 153, 0.05));
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.3);
    }
    
    .visual-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 18px;
    }
    
    .floating-gear-bg {
      position: absolute;
      top: -30px;
      right: -30px;
      width: 140px;
      height: 140px;
      opacity: 0.12;
      animation: spin 15s linear infinite;
      pointer-events: none;
    }
    
    /* Action Buttons */
    .btn-main-green {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: #ffffff;
      padding: 16px 36px;
      border-radius: 12px;
      font-weight: 700;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 4px 20px rgba(16, 185, 129, 0.3);
      font-size: 0.95rem;
    }
    
    .btn-main-green:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 30px rgba(16, 185, 129, 0.45);
    }
    
    .btn-main-outline {
      border: 2px solid rgba(255, 255, 255, 0.15);
      background: transparent;
      color: #ffffff;
      padding: 14px 34px;
      border-radius: 12px;
      font-weight: 700;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s ease;
      font-size: 0.95rem;
      margin-left: 15px;
    }
    
    .btn-main-outline:hover {
      border-color: #ffffff;
      background: rgba(255, 255, 255, 0.05);
    }
    
    /* Feature Section */
    .sec-features {
      background: #f8fafc;
      padding: 60px 0 100px;
    }
    
    .features-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
    }
    
    @media (max-width: 968px) {
      .features-grid {
        grid-template-columns: 1fr;
      }
    }
    
    .feature-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 24px;
      padding: 40px 35px;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .feature-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 25px 50px -12px rgba(0,0,0,0.05);
      border-color: #10b981;
    }
    
    /* Geometric Star Badge */
    .star-badge-wrapper {
      width: 60px;
      height: 60px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 30px;
    }
    
    .star-badge-bg {
      position: absolute;
      inset: 0;
      background: rgba(16, 185, 129, 0.1);
      clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
      animation: rotate-star 12s linear infinite;
    }
    
    .star-badge-icon {
      position: relative;
      z-index: 2;
      color: #059669;
    }
    
    .feature-title {
      font-size: 1.4rem;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 15px;
    }
    
    .feature-desc {
      font-size: 1rem;
      color: #475569;
      line-height: 1.6;
    }
    
    /* Fleet Grid */
    .sec-fleet {
      padding: 120px 0;
    }
    
    .fleet-tabs {
      display: flex;
      justify-content: center;
      gap: 12px;
      margin-bottom: 50px;
      flex-wrap: wrap;
    }
    
    .tab-btn {
      background: #f1f5f9;
      border: 1px solid #e2e8f0;
      color: #475569;
      padding: 12px 28px;
      border-radius: 12px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.95rem;
    }
    
    .tab-btn.active, .tab-btn:hover {
      background: #022c22;
      color: #ffffff;
      border-color: #022c22;
    }
    
    /* Stats Section */
    .sec-stats {
      background: #022c22;
      color: #ffffff;
      padding: 100px 0;
      position: relative;
      overflow: hidden;
    }
    
    .stats-layout {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 40px;
      text-align: center;
    }
    
    @media (max-width: 768px) {
      .stats-layout {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    .stat-num-val {
      font-size: 4rem;
      font-weight: 900;
      color: #10b981;
      margin-bottom: 10px;
      line-height: 1;
    }
    
    .stat-lbl-val {
      font-size: 0.9rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #a7f3d0;
    }
    
    /* Custom Wave SVG shapes */
    .wave-top {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 80px;
      transform: rotate(180deg);
      fill: #ffffff;
    }
    
    .wave-bottom {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 80px;
      fill: #ffffff;
    }
    
    /* Partner banner curves */
    .cta-banner {
      background: linear-gradient(135deg, #022c22 0%, #064e3b 100%);
      border-radius: 32px;
      padding: 80px;
      color: #ffffff;
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 40px;
      box-shadow: 0 40px 80px -20px rgba(2, 44, 34, 0.3);
    }
    
    @media (max-width: 968px) {
      .cta-banner {
        flex-direction: column;
        text-align: center;
        padding: 50px 30px;
      }
    }
    
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    @keyframes rotate-star {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  container.appendChild(styleTag);

  const homeRoot = document.createElement('div');
  homeRoot.className = 'home-root';

  // 1. HERO SECTION
  const heroSec = document.createElement('section');
  heroSec.className = 'hero-sec';
  
  // Dynamic Background Images
  const bgImages = [
    '/assets/hero.png',
    '/assets/gallery_farmers.png',
    '/assets/portfolio_aerial.png'
  ];
  let currentBgIndex = 0;
  
  const bgInterval = setInterval(() => {
    if (!document.body.contains(heroSec)) {
      clearInterval(bgInterval);
      return;
    }
    currentBgIndex = (currentBgIndex + 1) % bgImages.length;
    // Set a smooth CSS transition effect on background
    heroVisualImg.src = bgImages[currentBgIndex];
  }, 4000);

  heroSec.innerHTML = `
    <div class="corp-hero-overlay" style="background: linear-gradient(135deg, rgba(2, 44, 34, 0.95) 0%, rgba(2, 44, 34, 0.75) 100%);"></div>
    <div class="container hero-grid">
      <div class="hero-content-block">
        <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(16, 185, 129, 0.15); padding: 8px 16px; border-radius: 100px; border: 1px solid rgba(16, 185, 129, 0.2); margin-bottom: 25px;">
          <span style="width: 8px; height: 8px; background: #34d399; border-radius: 50%; box-shadow: 0 0 10px #34d399;"></span>
          <span style="font-size: 0.75rem; font-weight: 800; letter-spacing: 1px; color: #34d399; text-transform: uppercase;">Heavy-Duty Mechanization</span>
        </div>
        <h1 class="hero-title-main">Driving Growth With <span>Reliable Machinery</span></h1>
        <p class="hero-desc">
          Sankara Nigeria Limited is a certified distributor of high-performance Massey Ferguson tractors and farm implements, engineering durable mechanization models for corporate and smallholder farms across Nigeria.
        </p>
        <div style="display: flex; flex-wrap: wrap; gap: 15px;">
          <a href="/products" class="btn-main-green">
            Explore Machinery
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
          <a href="/contact" class="btn-main-outline">Get a Quote</a>
        </div>
      </div>
      
      <div class="hero-visual">
        <svg class="floating-gear-bg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 25C36.19 25 25 36.19 25 50C25 63.81 36.19 75 50 75C63.81 75 75 63.81 75 50C75 36.19 63.81 25 50 25ZM50 67C40.61 67 33 59.39 33 50C33 40.61 40.61 33 50 33C59.39 33 67 40.61 67 50C67 59.39 59.39 67 50 67Z" fill="#34d399"/>
        </svg>
        <div class="visual-frame">
          <img id="hero-visual-img" class="visual-image" src="/assets/hero.png" alt="Sankara Tractor Showcase">
        </div>
      </div>
    </div>
  `;
  const heroVisualImg = heroSec.querySelector('#hero-visual-img');

  // 2. FEATURE / CAPABILITIES SECTION (With Star Badges)
  const featuresSec = document.createElement('section');
  featuresSec.className = 'sec-features';
  featuresSec.innerHTML = `
    <div class="container">
      <div style="text-align: center; margin-bottom: 70px;">
        <span style="font-size: 0.85rem; font-weight: 800; color: #059669; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px; display: block;">ENGINEERED SOLUTIONS</span>
        <h2 style="font-size: clamp(2.2rem, 4vw, 3.2rem); font-weight: 850; color: #0f172a; letter-spacing: -1px;">Core Capabilities</h2>
      </div>
      
      <div class="features-grid">
        <!-- Card 1 -->
        <div class="feature-card">
          <div class="star-badge-wrapper">
            <div class="star-badge-bg"></div>
            <div class="star-badge-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m10 11 11 .9c.6 0 .9.5.8 1.1l-.8 5h-1"/><circle cx="18" cy="18" r="2"/><circle cx="7" cy="15" r="5"/></svg>
            </div>
          </div>
          <h3 class="feature-title">Tractor Procurement</h3>
          <p class="feature-desc">Delivering certified Massey Ferguson tractors equipped with customized field tires and weights suited for heavy soils.</p>
        </div>
        
        <!-- Card 2 -->
        <div class="feature-card">
          <div class="star-badge-wrapper">
            <div class="star-badge-bg"></div>
            <div class="star-badge-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 1.41-2.83l-1.41-1.41a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            </div>
          </div>
          <h3 class="feature-title">Implements & Spares</h3>
          <p class="feature-desc">Matching tractors with appropriate tillage, seeding, and harvest implements alongside a reliable OEM spare parts supply.</p>
        </div>
        
        <!-- Card 3 -->
        <div class="feature-card">
          <div class="star-badge-wrapper">
            <div class="star-badge-bg"></div>
            <div class="star-badge-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
            </div>
          </div>
          <h3 class="feature-title">Mechanical Training</h3>
          <p class="feature-desc">Deploying on-site maintenance experts and operators to maximize productivity and extend machine life cycles.</p>
        </div>
      </div>
    </div>
  `;

  // 3. PRODUCT showcase section
  const fleetSec = document.createElement('section');
  fleetSec.className = 'sec-fleet';
  fleetSec.innerHTML = `
    <div class="container">
      <div style="text-align: center; margin-bottom: 60px;">
        <span style="font-size: 0.85rem; font-weight: 800; color: #059669; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px; display: block;">OUR FLEET</span>
        <h2 style="font-size: clamp(2.2rem, 4vw, 3.2rem); font-weight: 850; color: #0f172a; letter-spacing: -1px; margin-bottom: 15px;">High-Performance Machinery</h2>
        <p style="color: #475569; font-size: 1.1rem; max-width: 600px; margin: 0 auto;">Filter and view our verified range of agricultural tractors and farm machinery.</p>
      </div>
      
      <div class="fleet-tabs">
        <button class="tab-btn active" data-cat="All">All Fleet</button>
        <button class="tab-btn" data-cat="Tractors">Tractors</button>
        <button class="tab-btn" data-cat="Farm Implements">Implements</button>
        <button class="tab-btn" data-cat="Spare Parts">Spare Parts</button>
      </div>
      
      <div id="fleet-grid-container" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 30px;">
        <div style="grid-column: 1/-1; text-align: center; padding: 60px; color: #64748b;">Loading active fleet...</div>
      </div>
    </div>
  `;

  // 4. STATS SECTION (With beautiful curved transitions)
  const statsSec = document.createElement('section');
  statsSec.className = 'sec-stats';
  statsSec.innerHTML = `
    <!-- Top SVG Wave -->
    <svg class="wave-top" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 100 C150 0, 300 0, 450 100 C600 200, 750 200, 900 100 C1050 0, 1200 0, 1440 100 L1440 0 L0 0 Z" fill="#ffffff"/>
    </svg>
    
    <div class="container" style="position: relative; z-index: 5; padding: 40px 0;">
      <div class="stats-layout">
        <div>
          <div class="stat-num-val">40+</div>
          <div class="stat-lbl-val">Years Experience</div>
        </div>
        <div>
          <div class="stat-num-val">500+</div>
          <div class="stat-lbl-val">Machines Deployed</div>
        </div>
        <div>
          <div class="stat-num-val">100%</div>
          <div class="stat-lbl-val">Support Rating</div>
        </div>
        <div>
          <div class="stat-num-val">24/7</div>
          <div class="stat-lbl-val">Parts Operations</div>
        </div>
      </div>
    </div>
    
    <!-- Bottom SVG Wave -->
    <svg class="wave-bottom" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0 C150 100, 300 100, 450 0 C600 -100, 750 -100, 900 0 C1050 100, 1200 100, 1440 0 L1440 100 L0 100 Z" fill="#ffffff"/>
    </svg>
  `;

  // 5. PARTNERSHIP / CALL TO ACTION BANNER SECTION
  const ctaSec = document.createElement('section');
  ctaSec.style.padding = '80px 0 120px';
  ctaSec.innerHTML = `
    <div class="container">
      <div class="cta-banner">
        <div style="max-width: 650px;">
          <span style="font-size: 0.8rem; font-weight: 800; color: #34d399; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px; display: block;">GET IN TOUCH</span>
          <h2 style="font-size: clamp(2rem, 3.5vw, 2.8rem); font-weight: 850; line-height: 1.2; margin-bottom: 20px;">Ready to Mechanize Your Operations?</h2>
          <p style="color: #d1fae5; font-size: 1.05rem; line-height: 1.6; margin: 0;">
            Partner with Sankara Nigeria Limited to secure robust agricultural machinery, spare parts supply lines, and dedicated field maintenance support.
          </p>
        </div>
        <div>
          <a href="/contact" class="btn-main-green" style="background: #ffffff; color: #022c22; box-shadow: 0 4px 20px rgba(255,255,255,0.15); white-space: nowrap;">
            Contact Corporate Office
          </a>
        </div>
      </div>
    </div>
  `;

  // Append everything
  homeRoot.appendChild(heroSec);
  homeRoot.appendChild(featuresSec);
  homeRoot.appendChild(fleetSec);
  homeRoot.appendChild(statsSec);
  homeRoot.appendChild(ctaSec);

  container.appendChild(renderNavbar());
  container.appendChild(homeRoot);
  container.appendChild(renderFooter());

  // Dynamic Product Fetch & Tab Filtering Logic
  let productsList = [];
  const loadFleet = async () => {
    try {
      const res = await fetch('/api/products');
      productsList = await res.json();
      renderFleet('All');
    } catch (err) {
      console.error(err);
    }
  };

  const renderFleet = (cat) => {
    const grid = fleetSec.querySelector('#fleet-grid-container');
    const filtered = cat === 'All' 
      ? productsList.slice(0, 6) 
      : productsList.filter(p => p.category === cat).slice(0, 6);
      
    if (filtered.length > 0) {
      grid.innerHTML = '';
      filtered.forEach(p => grid.appendChild(renderProductCard(p)));
    } else {
      grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 60px; color: #64748b; border: 1px dashed #e2e8f0; border-radius: 12px; background: #f8fafc;">No products listed in this category currently.</div>`;
    }
  };

  // Bind Tab Click Handlers
  fleetSec.querySelectorAll('.tab-btn').forEach(btn => {
    btn.onclick = (e) => {
      fleetSec.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      renderFleet(e.target.getAttribute('data-cat'));
    };
  });

  loadFleet();

  // Trigger animations
  setTimeout(() => {
    if (window.initAnimations) {
      window.initAnimations();
    }
  }, 100);

  return container;
}
