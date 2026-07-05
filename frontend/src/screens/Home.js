import { renderNavbar, renderFooter } from '../components/Navigation';
import { renderProductCard } from '../components/ProductCard';

export function renderHomeScreen() {
  const container = document.createElement('div');
  container.style.backgroundColor = '#ffffff'; // Professional light background for main content
  container.style.color = '#1e293b';
  container.style.fontFamily = "'Inter', system-ui, sans-serif";

  // Custom Corporate Styles
  const styleTag = document.createElement('style');
  styleTag.textContent = `
    /* Hero Section */
    .corp-hero {
      position: relative;
      height: 85vh;
      min-height: 600px;
      display: flex;
      align-items: center;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      color: #fff;
      overflow: hidden;
    }
    
    .corp-hero-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, rgba(10, 25, 47, 0.9) 0%, rgba(10, 25, 47, 0.4) 100%);
      z-index: 1;
    }
    
    .corp-hero-content {
      position: relative;
      z-index: 2;
      max-width: 800px;
      padding: 0 20px;
    }
    
    .corp-hero-title {
      font-size: clamp(2.5rem, 5vw, 4.2rem);
      font-weight: 850;
      line-height: 1.1;
      margin-bottom: 25px;
      color: #ffffff;
      letter-spacing: -1px;
    }
    
    .corp-hero-subtitle {
      font-size: clamp(1.1rem, 2vw, 1.35rem);
      line-height: 1.6;
      color: #cbd5e1;
      margin-bottom: 40px;
      font-weight: 400;
    }
    
    /* Buttons */
    .btn-corp-primary {
      background-color: #ff9f00;
      color: #0a192f;
      padding: 16px 36px;
      border-radius: 6px;
      font-weight: 700;
      text-decoration: none;
      display: inline-block;
      transition: all 0.3s ease;
      box-shadow: 0 4px 14px rgba(255, 159, 0, 0.3);
      text-transform: uppercase;
      font-size: 0.9rem;
      letter-spacing: 1px;
    }
    
    .btn-corp-primary:hover {
      background-color: #e08b00;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(255, 159, 0, 0.4);
    }
    
    .btn-corp-secondary {
      background: transparent;
      color: #ffffff;
      border: 2px solid rgba(255, 255, 255, 0.2);
      padding: 14px 34px;
      border-radius: 6px;
      font-weight: 700;
      text-decoration: none;
      display: inline-block;
      transition: all 0.3s ease;
      text-transform: uppercase;
      font-size: 0.9rem;
      letter-spacing: 1px;
      margin-left: 15px;
    }
    
    .btn-corp-secondary:hover {
      border-color: #ffffff;
      background: rgba(255, 255, 255, 0.05);
    }
    
    /* Floating Stats Bar */
    .stats-bar {
      position: relative;
      margin-top: -60px;
      z-index: 10;
      background: #0a192f;
      color: #fff;
      border-radius: 8px;
      padding: 40px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
      border-bottom: 4px solid #ff9f00;
    }
    
    @media (max-width: 768px) {
      .stats-bar {
        grid-template-columns: 1fr;
        margin-top: -20px;
        padding: 30px;
      }
    }
    
    .stat-item {
      text-align: center;
      border-right: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .stat-item:last-child {
      border-right: none;
    }
    
    @media (max-width: 768px) {
      .stat-item {
        border-right: none;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        padding-bottom: 20px;
      }
      .stat-item:last-child {
        border-bottom: none;
        padding-bottom: 0;
      }
    }
    
    .stat-number {
      font-size: 2.8rem;
      font-weight: 900;
      color: #ff9f00;
      line-height: 1;
      margin-bottom: 5px;
    }
    
    .stat-label {
      font-size: 0.85rem;
      font-weight: 700;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }
    
    /* Section Headings */
    .section-title-corp {
      font-size: 2.5rem;
      font-weight: 850;
      color: #0a192f;
      margin-bottom: 15px;
      letter-spacing: -0.5px;
    }
    
    .section-subtitle-corp {
      font-size: 1.1rem;
      color: #64748b;
      max-width: 600px;
      margin: 0 auto 50px;
      line-height: 1.6;
    }
    
    /* Fleet Grid */
    .fleet-tabs {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-bottom: 40px;
    }
    
    .fleet-tab-btn {
      background: #f1f5f9;
      border: 1px solid #e2e8f0;
      color: #475569;
      padding: 10px 24px;
      border-radius: 6px;
      font-weight: 700;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .fleet-tab-btn.active, .fleet-tab-btn:hover {
      background: #0a192f;
      color: #fff;
      border-color: #0a192f;
    }
    
    /* Service Card Grid */
    .service-corp-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 40px;
      margin-top: 50px;
    }
    
    @media (max-width: 968px) {
      .service-corp-grid {
        grid-template-columns: 1fr;
      }
    }
    
    .service-corp-card {
      background: #ffffff;
      border-top: 4px solid #0a192f;
      padding: 40px 30px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
      border-radius: 0 0 8px 8px;
      transition: all 0.3s ease;
      border-left: 1px solid #f1f5f9;
      border-right: 1px solid #f1f5f9;
      border-bottom: 1px solid #f1f5f9;
    }
    
    .service-corp-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
      border-top-color: #ff9f00;
    }
    
    .service-num {
      font-size: 0.85rem;
      font-weight: 800;
      color: #ff9f00;
      letter-spacing: 2px;
      margin-bottom: 20px;
      display: block;
    }
    
    .service-title {
      font-size: 1.4rem;
      font-weight: 800;
      color: #0a192f;
      margin-bottom: 15px;
    }
    
    .service-desc {
      font-size: 0.95rem;
      color: #64748b;
      line-height: 1.6;
    }
    
    /* Partner CTA Banner */
    .partner-banner {
      background: linear-gradient(135deg, #0a192f 0%, #00155b 100%);
      color: #fff;
      padding: 80px 60px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 100px;
    }
    
    @media (max-width: 968px) {
      .partner-banner {
        flex-direction: column;
        text-align: center;
        gap: 40px;
        padding: 60px 30px;
      }
    }
  `;
  container.appendChild(styleTag);

  // HERO SECTION (Professional background slider)
  const hero = document.createElement('section');
  hero.className = 'corp-hero';
  hero.style.backgroundImage = 'url(/assets/hero.png)';
  
  const bgImages = [
    '/assets/hero.png',
    '/assets/gallery_farmers.png',
    '/assets/portfolio_aerial.png'
  ];
  let currentBgIndex = 0;

  const bgInterval = setInterval(() => {
    if (!document.body.contains(hero)) {
      clearInterval(bgInterval);
      return;
    }
    currentBgIndex = (currentBgIndex + 1) % bgImages.length;
    hero.style.backgroundImage = `url(${bgImages[currentBgIndex]})`;
  }, 5000);

  hero.innerHTML = `
    <div class="corp-hero-overlay"></div>
    <div class="container corp-hero-content">
      <h1 class="corp-hero-title">Pioneering Modern Agricultural Infrastructure</h1>
      <p class="corp-hero-subtitle">
        Sankara Nigeria Limited delivers high-performance Massey Ferguson tractors, customized implements, and genuine support network to empower commercial agricultural projects nationwide.
      </p>
      <div>
        <a href="/products" class="btn-corp-primary">View Machinery Fleet</a>
        <a href="/contact" class="btn-corp-secondary">Request Consultation</a>
      </div>
    </div>
  `;

  // MAIN LAYOUT SECTION (To sit below Hero)
  const contentSection = document.createElement('div');
  contentSection.className = 'container';
  contentSection.style.paddingBottom = '100px';

  // FLOATING STATS BAR
  const statsBar = document.createElement('div');
  statsBar.className = 'stats-bar';
  statsBar.innerHTML = `
    <div class="stat-item">
      <div class="stat-number">40+</div>
      <div class="stat-label">Years of Operation</div>
    </div>
    <div class="stat-item">
      <div class="stat-number">500+</div>
      <div class="stat-label">Machineries Supplied</div>
    </div>
    <div class="stat-item">
      <div class="stat-number">100%</div>
      <div class="stat-label">Genuine OEM Parts</div>
    </div>
  `;
  contentSection.appendChild(statsBar);

  // SECTION: LATEST MACHINERY (Clean corporate layout)
  const fleetSection = document.createElement('section');
  fleetSection.style.marginTop = '100px';
  fleetSection.innerHTML = `
    <div style="text-align: center;">
      <span style="font-size: 0.85rem; font-weight: 800; color: #ff9f00; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 10px; display: block;">INVENTORY</span>
      <h2 class="section-title-corp">Featured Equipment</h2>
      <p class="section-subtitle-corp">Browse our lineup of tractors and heavy machinery currently available for commercial deployment.</p>
    </div>
    
    <div class="fleet-tabs">
      <button class="fleet-tab-btn active" data-cat="All">All Fleet</button>
      <button class="fleet-tab-btn" data-cat="Tractors">Tractors</button>
      <button class="fleet-tab-btn" data-cat="Farm Implements">Implements</button>
      <button class="fleet-tab-btn" data-cat="Spare Parts">Spare Parts</button>
    </div>
    
    <div id="fleet-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 30px;">
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #64748b;">Loading machinery data...</div>
    </div>
  `;
  contentSection.appendChild(fleetSection);

  // SECTION: PARTNER SERVICES (Grid columns)
  const servicesSection = document.createElement('section');
  servicesSection.style.marginTop = '120px';
  servicesSection.innerHTML = `
    <div style="text-align: center;">
      <span style="font-size: 0.85rem; font-weight: 800; color: #ff9f00; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 10px; display: block;">OUR CAPABILITIES</span>
      <h2 class="section-title-corp">Commercial Mechanization Support</h2>
      <p class="section-subtitle-corp">We offer end-to-end support to ensure your fleet maintains maximum operational uptime.</p>
    </div>
    
    <div class="service-corp-grid">
      <div class="service-corp-card">
        <span class="service-num">01 / FLEET PROCUREMENT</span>
        <h4 class="service-title">Tractor Sales</h4>
        <p class="service-desc">Providing certified Massey Ferguson tractors equipped with customized field accessories for optimal output.</p>
      </div>
      <div class="service-corp-card">
        <span class="service-num">02 / SPARE PARTS NETWORK</span>
        <h4 class="service-title">Genuine OEM Parts</h4>
        <p class="service-desc">Preventing field downtime with our direct distribution chain of certified replacement filters, tires, and mechanical spares.</p>
      </div>
      <div class="service-corp-card">
        <span class="service-num">03 / TELEMATICS & SUPPORT</span>
        <h4 class="service-title">Mechanical Training</h4>
        <p class="service-desc">Deploying on-site mechanics and operators to train local teams and run automated engine checks.</p>
      </div>
    </div>
  `;
  contentSection.appendChild(servicesSection);

  // SECTION: PARTNERSHIP CTA BANNER
  const partnerBanner = document.createElement('div');
  partnerBanner.className = 'partner-banner';
  partnerBanner.innerHTML = `
    <div style="max-width: 600px;">
      <h3 style="font-size: 2rem; font-weight: 850; margin-bottom: 15px; line-height: 1.2;">Discuss Fleet Requirements</h3>
      <p style="color: #cbd5e1; font-size: 1.05rem; line-height: 1.6; margin: 0;">
        Partner with Sankara Nigeria Limited to scale your agricultural infrastructure. Let's arrange a consultation.
      </p>
    </div>
    <div>
      <a href="/contact" class="btn-corp-primary" style="white-space: nowrap;">Contact Corporate Office</a>
    </div>
  `;
  contentSection.appendChild(partnerBanner);

  // Assemble Main Page
  container.appendChild(renderNavbar());
  container.appendChild(hero);
  container.appendChild(contentSection);
  container.appendChild(renderFooter());

  // Interactive Product Fetch and Filtering
  let allProducts = [];
  const loadFleetData = async () => {
    try {
      const res = await fetch('/api/products');
      allProducts = await res.json();
      renderFilteredFleet('All');
    } catch (err) {
      console.error("Failed to load products: ", err);
    }
  };

  const renderFilteredFleet = (cat) => {
    const grid = fleetSection.querySelector('#fleet-grid');
    const filtered = cat === 'All' 
      ? allProducts.slice(0, 6) 
      : allProducts.filter(p => p.category === cat).slice(0, 6);
      
    if (filtered.length > 0) {
      grid.innerHTML = '';
      filtered.forEach(p => grid.appendChild(renderProductCard(p)));
    } else {
      grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 60px; color: #64748b; border: 1px dashed #e2e8f0; border-radius: 8px;">No machinery in this category is currently listed.</div>`;
    }
  };

  // Bind Fleet Tab Filter Buttons
  fleetSection.querySelectorAll('.fleet-tab-btn').forEach(btn => {
    btn.onclick = (e) => {
      fleetSection.querySelectorAll('.fleet-tab-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const cat = e.target.getAttribute('data-cat');
      renderFilteredFleet(cat);
    };
  });

  loadFleetData();

  // Trigger animations after insertion
  setTimeout(() => {
    if (window.initAnimations) {
      window.initAnimations();
    }
  }, 100);

  return container;
}
