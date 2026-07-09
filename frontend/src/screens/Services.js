import { renderNavbar, renderFooter } from '../components/Navigation';

export function renderServicesScreen() {
  const container = document.createElement('div');
  container.className = 'services-root';

  // Inject Custom Stylesheet
  const styleTag = document.createElement('style');
  styleTag.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');
    
    .services-root {
      font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
      overflow-x: hidden;
      background: #ffffff;
      color: #0f172a;
    }
    
    .services-hero {
      background: linear-gradient(135deg, #0b0f19 0%, #030712 100%);
      color: #ffffff;
      padding: 180px 0 130px;
      position: relative;
      overflow: hidden;
      border-bottom: 1px solid rgba(220, 38, 38, 0.15);
    }
    
    .services-hero::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at top right, rgba(220, 38, 38, 0.18), transparent 70%),
                  radial-gradient(circle at bottom left, rgba(59, 130, 246, 0.12), transparent 70%);
      pointer-events: none;
      z-index: 1;
    }

    .services-hero-grid {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 60px;
      align-items: center;
      position: relative;
      z-index: 3;
    }

    @media (max-width: 968px) {
      .services-hero-grid {
        grid-template-columns: 1fr;
        text-align: center;
      }
    }

    .services-hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(220, 38, 38, 0.15);
      padding: 8px 16px;
      border-radius: 100px;
      border: 1px solid rgba(220, 38, 38, 0.2);
      margin-bottom: 25px;
      color: #3b82f6;
      font-size: 0.75rem;
      font-weight: 800;
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    .services-hero-title {
      font-size: clamp(2.8rem, 5.5vw, 4.4rem);
      font-weight: 900;
      line-height: 1.1;
      letter-spacing: -2px;
      margin-bottom: 25px;
      color: #ffffff;
    }

    .services-hero-title span {
      background: linear-gradient(135deg, #3b82f6 0%, #dc2626 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .services-hero-desc {
      font-size: 1.15rem;
      line-height: 1.7;
      color: #cbd5e1;
      margin-bottom: 40px;
      max-width: 620px;
    }

    @media (max-width: 968px) {
      .services-hero-desc {
        margin-left: auto;
        margin-right: auto;
      }
    }

    .hero-image-wrapper {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 2;
    }

    .hero-image-card {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(220, 38, 38, 0.2);
      border-radius: 30px;
      padding: 12px;
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(220, 38, 38, 0.1);
      backdrop-filter: blur(8px);
      transition: all 0.5s ease;
      width: 100%;
      max-width: 480px;
    }

    .hero-image-card:hover {
      transform: translateY(-8px) scale(1.02);
      border-color: rgba(59, 130, 246, 0.4);
      box-shadow: 0 40px 80px rgba(0, 0, 0, 0.5), 0 0 50px rgba(220, 38, 38, 0.15);
    }

    .hero-image-card img {
      width: 100%;
      height: auto;
      border-radius: 20px;
      object-fit: cover;
    }

    /* Core Services Grid Layout */
    .services-showcase {
      padding: 120px 0;
      background: #ffffff;
    }

    .section-header {
      text-align: center;
      margin-bottom: 80px;
    }

    .section-badge {
      font-size: 0.85rem;
      font-weight: 800;
      color: #991b1b;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 12px;
      display: block;
    }

    .section-title {
      font-size: clamp(2.2rem, 4vw, 3rem);
      font-weight: 850;
      color: #0f172a;
      letter-spacing: -1.5px;
      margin-bottom: 20px;
      line-height: 1.15;
    }

    .section-desc {
      color: #475569;
      font-size: 1.1rem;
      max-width: 750px;
      margin: 0 auto;
      line-height: 1.7;
    }

    .services-grid-9 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
    }

    @media (max-width: 1024px) {
      .services-grid-9 {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .services-grid-9 {
        grid-template-columns: 1fr;
      }
    }

    /* Service Card Styling */
    .service-premium-card {
      background: #ffffff;
      border: 1px solid rgba(226, 232, 240, 0.9);
      border-radius: 24px;
      padding: 45px 30px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.015);
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .service-premium-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: linear-gradient(90deg, #dc2626, #3b82f6);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .service-premium-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 45px rgba(0, 0, 0, 0.05), 0 0 25px rgba(220, 38, 38, 0.02);
      border-color: rgba(220, 38, 38, 0.25);
    }

    .service-premium-card:hover::before {
      transform: scaleX(1);
    }

    .service-card-icon-box {
      width: 56px;
      height: 56px;
      border-radius: 16px;
      background: rgba(220, 38, 38, 0.08);
      color: #991b1b;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 25px;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .service-premium-card:hover .service-card-icon-box {
      background: #991b1b;
      color: #ffffff;
      transform: scale(1.08) rotate(5deg);
      box-shadow: 0 5px 15px rgba(153, 27, 27, 0.2);
    }

    .service-card-title {
      font-size: 1.35rem;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 12px;
      letter-spacing: -0.5px;
    }

    .service-card-desc {
      font-size: 0.96rem;
      line-height: 1.6;
      color: #475569;
      margin-bottom: 25px;
      flex-grow: 1;
    }

    .service-card-points {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
      border-top: 1px solid #f1f5f9;
      padding-top: 20px;
    }

    .service-card-point {
      font-size: 0.88rem;
      font-weight: 700;
      color: #334155;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .service-card-point-dot {
      width: 6px;
      height: 6px;
      background: #3b82f6;
      border-radius: 50%;
      box-shadow: 0 0 6px #3b82f6;
    }

    /* Why Choose Us Section */
    .sec-why-choose {
      padding: 120px 0;
      background: #f8fafc;
      border-top: 1px solid #e2e8f0;
      border-bottom: 1px solid #e2e8f0;
    }

    .why-choose-layout {
      display: grid;
      grid-template-columns: 1.05fr 0.95fr;
      gap: 80px;
      align-items: center;
    }

    @media (max-width: 968px) {
      .why-choose-layout {
        grid-template-columns: 1fr;
        gap: 50px;
      }
    }

    .why-choose-feature {
      display: flex;
      gap: 20px;
      margin-bottom: 24px;
      background: #ffffff;
      padding: 24px;
      border-radius: 20px;
      border: 1px solid rgba(226, 232, 240, 0.8);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.01);
      transition: all 0.3s ease;
    }

    .why-choose-feature:hover {
      transform: translateX(6px);
      border-color: rgba(220, 38, 38, 0.25);
    }

    .why-choose-icon-box {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: rgba(220, 38, 38, 0.1);
      color: #991b1b;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-weight: bold;
    }

    .why-choose-feat-title {
      font-size: 1.12rem;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 6px;
    }

    .why-choose-feat-desc {
      font-size: 0.94rem;
      color: #475569;
      line-height: 1.5;
    }

    /* Stats Grid */
    .why-choose-stats {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }

    .why-stat-card {
      background: #ffffff;
      border: 1px solid rgba(226, 232, 240, 0.8);
      border-radius: 24px;
      padding: 40px 30px;
      text-align: center;
      box-shadow: 0 10px 25px rgba(0,0,0,0.01);
      transition: all 0.3s ease;
    }
    
    .why-stat-card:hover {
      border-color: rgba(220, 38, 38, 0.2);
      transform: translateY(-4px);
    }

    .why-stat-num {
      font-size: 3.2rem;
      font-weight: 900;
      color: #991b1b;
      line-height: 1;
      margin-bottom: 10px;
      letter-spacing: -1px;
    }

    .why-stat-label {
      font-size: 0.85rem;
      font-weight: 750;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #64748b;
    }

    /* Training Programs Section */
    .sec-training {
      padding: 120px 0;
      background: #0b0f19;
      color: #ffffff;
      position: relative;
      overflow: hidden;
    }

    .sec-training::before {
      content: '';
      position: absolute;
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, rgba(220, 38, 38, 0.08) 0%, transparent 70%);
      top: -200px;
      right: -200px;
      pointer-events: none;
    }

    .training-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
      margin-top: 60px;
    }

    @media (max-width: 968px) {
      .training-grid {
        grid-template-columns: 1fr;
      }
    }

    .training-card {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(220, 38, 38, 0.15);
      border-radius: 24px;
      padding: 45px 35px;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: hidden;
    }

    .training-card::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(220, 38, 38, 0.04) 0%, transparent 100%);
      opacity: 0;
      transition: opacity 0.4s ease;
      pointer-events: none;
    }

    .training-card:hover {
      transform: translateY(-8px);
      border-color: rgba(220, 38, 38, 0.35);
      background: rgba(255, 255, 255, 0.035);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }

    .training-card:hover::before {
      opacity: 1;
    }

    .training-card-icon {
      width: 52px;
      height: 52px;
      border-radius: 16px;
      background: rgba(220, 38, 38, 0.12);
      color: #3b82f6;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 25px;
      transition: all 0.4s ease;
    }

    .training-card:hover .training-card-icon {
      background: #dc2626;
      color: #ffffff;
      transform: scale(1.08) rotate(5deg);
      box-shadow: 0 0 15px rgba(220, 38, 38, 0.3);
    }

    .training-title {
      font-size: 1.45rem;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 15px;
    }

    .training-desc {
      font-size: 1.02rem;
      line-height: 1.6;
      color: #cbd5e1;
      margin-bottom: 30px;
      flex-grow: 1;
    }

    .training-points {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 12px;
      border-top: 1px solid rgba(220, 38, 38, 0.15);
      padding-top: 25px;
    }

    .training-point {
      font-size: 0.92rem;
      font-weight: 700;
      color: #a7f3d0;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    /* Premium CTA */
    .sec-cta-serv {
      padding: 120px 0 140px;
      background: #ffffff;
    }

    .cta-card-serv {
      background: linear-gradient(135deg, #0b0f19 0%, #030712 100%);
      border-radius: 32px;
      padding: 80px;
      color: #ffffff;
      position: relative;
      overflow: hidden;
      text-align: center;
      box-shadow: 0 40px 80px -20px rgba(2, 44, 34, 0.3);
    }

    .cta-card-serv::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at center, rgba(220, 38, 38, 0.1), transparent 70%);
      pointer-events: none;
    }

    @media (max-width: 968px) {
      .cta-card-serv {
        padding: 50px 30px;
      }
    }
  `;
  container.appendChild(styleTag);

  // 1. HERO SECTION
  const heroSec = document.createElement('header');
  heroSec.className = 'services-hero';
  heroSec.innerHTML = `
    <div class="container services-hero-grid">
      <div class="reveal">
        <div class="services-hero-badge">Premium Agricultural Services</div>
        <h1 class="services-hero-title">Expert Solutions for <span>Modern Farming</span></h1>
        <p class="services-hero-desc">
          From maintenance to training, we deliver comprehensive agricultural services that keep your operations running smoothly and efficiently.
        </p>
        <div style="display: flex; flex-wrap: wrap; gap: 15px;">
          <a href="/contact" class="btn-main-green" data-route="contact">Get Started</a>
          <a href="/product" class="btn-main-outline" data-route="products" style="border-color: #ffffff; color: #ffffff;">View Products</a>
        </div>
      </div>
      <div class="hero-image-wrapper reveal">
        <div class="hero-image-card">
          <img src="/assets/services_hero_premium.png" alt="Sankara Premium Machinery Support">
        </div>
      </div>
    </div>
  `;

  // 2. CORE SERVICE GRID (9 services)
  const serviceGrid = document.createElement('section');
  serviceGrid.className = 'services-showcase';
  
  const services = [
    {
      title: 'Tractor Maintenance & Repairs',
      desc: 'Professional maintenance and repair services by certified technicians. Keep your tractors running at peak performance with scheduled maintenance and emergency repairs.',
      points: ['24/7 Emergency Support', 'Certified Technicians', 'Genuine Parts Only'],
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`
    },
    {
      title: 'Farm Implements Installation',
      desc: 'Expert installation and setup of all farm implements including ploughs, harrows, sprayers, and cultivation equipment. Proper installation ensures optimal performance.',
      points: ['Professional Setup', 'Performance Testing', 'Usage Training'],
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`
    },
    {
      title: 'Agricultural Training Sessions',
      desc: 'Comprehensive training programs for farmers and operators on modern agricultural techniques, machinery operation, and maintenance. Hands-on sessions to maximize productivity and safety.',
      points: ['Hands-On Training', 'Expert Instructors', 'Certification Provided'],
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2.5 3 6 3s6-1 6-3v-5"/></svg>`
    },
    {
      title: 'Genuine Spare Parts Supply',
      desc: '100% authentic OEM spare parts ensuring optimal performance and longevity. Extensive inventory for all brands with fast nationwide delivery.',
      points: ['100% Authentic OEM', 'Fast Delivery', 'Extensive Inventory'],
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`
    },
    {
      title: 'Hydraulics & Transmission Service',
      desc: 'Specialized service for hydraulic systems and transmission components. Expert diagnostics, repairs, and replacements to keep your machinery operating smoothly.',
      points: ['Advanced Diagnostics', 'Expert Repairs', 'Quality Guaranteed'],
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-11-7-11S5 10.7 5 15a7 7 0 0 0 7 7z"/></svg>`
    },
    {
      title: 'On-Site Farm Machinery Support',
      desc: 'Mobile service team available for on-site repairs and maintenance. We come to your farm to minimize downtime and keep your operations running.',
      points: ['Mobile Service', 'Quick Response', 'Minimize Downtime'],
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`
    },
    {
      title: 'Engine Overhaul & Diagnostics',
      desc: 'Comprehensive engine diagnostics and complete overhaul services. Expert technicians use advanced equipment to identify and fix engine issues efficiently.',
      points: ['Complete Overhaul', 'Advanced Equipment', 'Efficient Service'],
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`
    },
    {
      title: 'Harvesting Equipment Services',
      desc: 'Specialized maintenance and repair services for harvesting equipment. Keep your harvesters, combines, and related machinery in perfect working condition.',
      points: ['Specialized Service', 'Peak Season Ready', 'Expert Maintenance'],
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`
    },
    {
      title: 'Scheduled Preventive Maintenance',
      desc: 'Proactive maintenance programs designed to prevent breakdowns and extend equipment lifespan. Regular servicing keeps your machinery reliable and efficient.',
      points: ['Prevent Breakdowns', 'Extend Lifespan', 'Regular Servicing'],
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`
    }
  ];

  serviceGrid.innerHTML = `
    <div class="container">
      <div class="section-header">
        <span class="section-badge">Our Services</span>
        <h2 class="section-title">Peak Operational Efficiency</h2>
        <p class="section-desc">
          Comprehensive solutions designed to keep your agricultural operations running at peak efficiency day in, day out.
        </p>
      </div>

      <div class="services-grid-9">
        ${services.map(s => `
          <div class="service-premium-card reveal">
            <div class="service-card-icon-box">
              ${s.icon}
            </div>
            <h3 class="service-card-title">${s.title}</h3>
            <p class="service-card-desc">${s.desc}</p>
            <ul class="service-card-points">
              ${s.points.map(p => `
                <li class="service-card-point">
                  <span class="service-card-point-dot"></span>
                  ${p}
                </li>
              `).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // 3. INTERACTIVE DIAGNOSTIC SIMULATOR (Epic Widget)
  const simulatorSec = document.createElement('section');
  simulatorSec.className = 'services-showcase';
  simulatorSec.style.background = '#f8fafc';
  simulatorSec.style.borderTop = '1px solid #e2e8f0';
  simulatorSec.style.padding = '100px 0';
  
  simulatorSec.innerHTML = `
    <div class="container">
      <div class="section-header" style="margin-bottom: 60px;">
        <span class="section-badge">Interactive Tools</span>
        <h2 class="section-title">Virtual Machinery Diagnostics</h2>
        <p class="section-desc">
          Select a system module below to run a virtual diagnostics health check and generate a simulated maintenance assessment report.
        </p>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 50px; align-items: center;">
        <!-- Left: Diagnostic Control Panel -->
        <div class="reveal" style="background: #ffffff; border: 1px solid #e2e8f0; padding: 40px; border-radius: 28px; box-shadow: 0 20px 40px rgba(0,0,0,0.02);">
          <h3 style="font-size: 1.4rem; font-weight: 800; margin-bottom: 25px; color: #0f172a;">Select Machinery Module</h3>
          
          <div style="display: flex; flex-direction: column; gap: 15px;">
            <button class="diag-btn active" data-module="engine">
              <span class="diag-btn-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg></span>
              <div style="text-align: left;">
                <div class="diag-btn-title">Engine Combustion & Fuel Line</div>
                <div class="diag-btn-desc">Check cylinder pressure, injector timing & cooling flow.</div>
              </div>
            </button>
            
            <button class="diag-btn" data-module="hydraulics">
              <span class="diag-btn-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-11-7-11S5 10.7 5 15a7 7 0 0 0 7 7z"/></svg></span>
              <div style="text-align: left;">
                <div class="diag-btn-title">Hydraulic Lift & Pump Pressure</div>
                <div class="diag-btn-desc">Check pump efficiency, actuator valves & fluid temperature.</div>
              </div>
            </button>

            <button class="diag-btn" data-module="transmission">
              <span class="diag-btn-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></span>
              <div style="text-align: left;">
                <div class="diag-btn-title">Gearbox & Differential Linkage</div>
                <div class="diag-btn-desc">Verify gear sync, clutch play & differential lock feedback.</div>
              </div>
            </button>

            <button class="diag-btn" data-module="electrical">
              <span class="diag-btn-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></span>
              <div style="text-align: left;">
                <div class="diag-btn-title">Smart Telemetry & Alternator Volt</div>
                <div class="diag-btn-desc">Audit GPS tracking, battery voltage & digital dashboard metrics.</div>
              </div>
            </button>
          </div>
        </div>

        <!-- Right: Screen / Results -->
        <div class="reveal" style="background: #0b0f19; border: 1px solid rgba(220, 38, 38, 0.2); border-radius: 28px; padding: 40px; color: #ffffff; min-height: 380px; display: flex; flex-direction: column; justify-content: space-between; position: relative; overflow: hidden; box-shadow: 0 30px 60px rgba(2, 44, 34, 0.25);">
          <!-- Futuristic background elements -->
          <div style="position: absolute; inset: 0; background: radial-gradient(circle at top right, rgba(59, 130, 246, 0.15), transparent 60%); pointer-events: none;"></div>
          
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 15px; margin-bottom: 25px;">
              <span style="font-weight: 900; letter-spacing: 2px; text-transform: uppercase; font-size: 0.75rem; color: #3b82f6;">System Health Screen</span>
              <div style="display: flex; gap: 6px; align-items: center;">
                <span id="diag-indicator-light" style="width: 8px; height: 8px; border-radius: 50%; background: #3b82f6; display: inline-block; box-shadow: 0 0 10px #3b82f6;"></span>
                <span id="diag-status-text" style="font-size: 0.75rem; font-weight: 800; color: #3b82f6;">SYSTEM: READY</span>
              </div>
            </div>

            <div id="diag-results-content" style="transition: all 0.3s ease;">
              <h4 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 15px; color: #ffffff;">Engine Diagnostics</h4>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px 30px; margin-bottom: 25px;">
                <div>
                  <div style="font-size: 0.75rem; color: #a7f3d0; text-transform: uppercase; letter-spacing: 0.5px;">Injector Timing</div>
                  <div style="font-size: 1.1rem; font-weight: 700; color: #ffffff;">0.02ms (Optimal)</div>
                </div>
                <div>
                  <div style="font-size: 0.75rem; color: #a7f3d0; text-transform: uppercase; letter-spacing: 0.5px;">Cylinder Pressure</div>
                  <div style="font-size: 1.1rem; font-weight: 700; color: #ffffff;">29.4 Bar (Normal)</div>
                </div>
                <div>
                  <div style="font-size: 0.75rem; color: #a7f3d0; text-transform: uppercase; letter-spacing: 0.5px;">Cooling Flow</div>
                  <div style="font-size: 1.1rem; font-weight: 700; color: #ffffff;">45L/min (Stable)</div>
                </div>
                <div>
                  <div style="font-size: 0.75rem; color: #a7f3d0; text-transform: uppercase; letter-spacing: 0.5px;">Efficiency Ratio</div>
                  <div style="font-size: 1.1rem; font-weight: 700; color: #ffffff;">98.4% (Excellent)</div>
                </div>
              </div>
              <p style="color: #cbd5e1; font-size: 0.95rem; line-height: 1.5; margin: 0;">
                All parameters are within safe factory operational ranges. Scheduled service is recommended in approximately 250 operating hours.
              </p>
            </div>
          </div>

          <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 20px; display: flex; justify-content: space-between; align-items: center; margin-top: 30px;">
            <span style="font-size: 0.8rem; color: #a7f3d0; font-weight: 600;">Need physical maintenance support?</span>
            <a href="/contact" data-route="contact" class="btn-main-green" style="padding: 10px 20px; font-size: 0.85rem; border-radius: 50px; background: #3b82f6; color: #022c22; text-decoration: none;">Book Service</a>
          </div>
        </div>
      </div>
    </div>

    <style>
      .diag-btn {
        width: 100%;
        display: flex;
        gap: 15px;
        align-items: center;
        background: #ffffff;
        border: 1px solid #e2e8f0;
        padding: 18px 24px;
        border-radius: 18px;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .diag-btn:hover {
        border-color: #dc2626;
        background: rgba(220, 38, 38, 0.02);
      }
      .diag-btn.active {
        border-color: #dc2626;
        background: rgba(220, 38, 38, 0.04);
        box-shadow: 0 4px 15px rgba(220, 38, 38, 0.05);
      }
      .diag-btn-icon {
        width: 38px;
        height: 38px;
        border-radius: 10px;
        background: #f1f5f9;
        color: #64748b;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        transition: all 0.3s;
      }
      .diag-btn.active .diag-btn-icon {
        background: #dc2626;
        color: #ffffff;
        box-shadow: 0 4px 10px rgba(220, 38, 38, 0.2);
      }
      .diag-btn-title {
        font-weight: 800;
        font-size: 0.95rem;
        color: #0f172a;
        margin-bottom: 3px;
        text-align: left;
      }
      .diag-btn-desc {
        font-size: 0.8rem;
        color: #64748b;
        text-align: left;
      }
    </style>
  `;

  // Simulator Interactive Logic
  const diagData = {
    engine: {
      title: 'Engine Combustion & Fuel Line',
      specs: [
        { label: 'Injector Timing', val: '0.02ms (Optimal)' },
        { label: 'Cylinder Pressure', val: '29.4 Bar (Normal)' },
        { label: 'Cooling Flow', val: '45L/min (Stable)' },
        { label: 'Efficiency Ratio', val: '98.4% (Excellent)' }
      ],
      desc: 'All parameters are within safe factory operational ranges. Scheduled service is recommended in approximately 250 operating hours.'
    },
    hydraulics: {
      title: 'Hydraulic Lift & Pump Pressure',
      specs: [
        { label: 'Pump Efficiency', val: '94% (Stable)' },
        { label: 'Control Valves', val: 'Active (Optimal)' },
        { label: 'Fluid Temp', val: '64°C (Normal)' },
        { label: 'Actuator Pressure', val: '185 Bar (Normal)' }
      ],
      desc: 'Hydraulic lift cylinder operating within target margins. Secondary filters should be inspected during routine quarterly maintenance.'
    },
    transmission: {
      title: 'Gearbox & Differential Linkage',
      specs: [
        { label: 'Gearbox Sync', val: '98% (Perfect)' },
        { label: 'Clutch Play', val: '12mm (Normal)' },
        { label: 'Differential Lock', val: 'Engaged (Healthy)' },
        { label: 'Gear Ratio Feedback', val: 'Instantaneous' }
      ],
      desc: 'Gear shifts are responding seamlessly. Transaxle lubrication is adequate. Differential lock telemetry is fully active.'
    },
    electrical: {
      title: 'Smart Telemetry & Alternator Volt',
      specs: [
        { label: 'GPS Tracking', val: 'Online (12 Satellites)' },
        { label: 'Battery Voltage', val: '14.2V (Optimal)' },
        { label: 'Alternator Load', val: '45 Amps (Stable)' },
        { label: 'Canbus Link', val: 'Healthy (0 Errors)' }
      ],
      desc: 'Smart telematics modules are transmitting real-time tracking coordinates correctly. Alternator charge is stable under load.'
    }
  };

  const diagBtns = simulatorSec.querySelectorAll('.diag-btn');
  const resultsBox = simulatorSec.querySelector('#diag-results-content');
  const indicatorLight = simulatorSec.querySelector('#diag-indicator-light');
  const statusText = simulatorSec.querySelector('#diag-status-text');

  diagBtns.forEach(btn => {
    btn.onclick = () => {
      diagBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const mod = btn.dataset.module;
      const data = diagData[mod];

      // Play minor animation
      resultsBox.style.opacity = '0.3';
      resultsBox.style.transform = 'translateY(5px)';
      indicatorLight.style.background = '#f59e0b';
      indicatorLight.style.boxShadow = '0 0 10px #f59e0b';
      statusText.style.color = '#f59e0b';
      statusText.textContent = 'SCANNING...';

      setTimeout(() => {
        resultsBox.innerHTML = `
          <h4 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 15px; color: #ffffff;">${data.title}</h4>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px 30px; margin-bottom: 25px;">
            ${data.specs.map(s => `
              <div>
                <div style="font-size: 0.75rem; color: #a7f3d0; text-transform: uppercase; letter-spacing: 0.5px;">${s.label}</div>
                <div style="font-size: 1.1rem; font-weight: 700; color: #ffffff;">${s.val}</div>
              </div>
            `).join('')}
          </div>
          <p style="color: #cbd5e1; font-size: 0.95rem; line-height: 1.5; margin: 0;">
            ${data.desc}
          </p>
        `;
        resultsBox.style.opacity = '1';
        resultsBox.style.transform = 'none';
        indicatorLight.style.background = '#3b82f6';
        indicatorLight.style.boxShadow = '0 0 10px #3b82f6';
        statusText.style.color = '#3b82f6';
        statusText.textContent = 'SYSTEM: READY';
      }, 500);
    };
  });

  // 4. WHY CHOOSE US & STATS SECTION
  const whyChooseSec = document.createElement('section');
  whyChooseSec.className = 'sec-why-choose';
  
  const reasons = [
    {
      title: 'Certified Technicians',
      desc: 'Expert team with direct industry manufacturer training and specialized diagnostics toolkits.',
      num: '01'
    },
    {
      title: '24/7 Support',
      desc: 'Round-the-clock emergency assistance lines and immediate dispatch logistics to keep you running.',
      num: '02'
    },
    {
      title: 'Quality Guaranteed',
      desc: '100% satisfaction assurance on all service contracts, replacement tasks, and field adjustments.',
      num: '03'
    },
    {
      title: 'Fast Response',
      desc: 'Quick on-site service delivery powered by a dedicated regional fleet of support vans.',
      num: '04'
    }
  ];

  const stats = [
    { num: '500+', label: 'Happy Clients' },
    { num: '15+', label: 'Years Experience' },
    { num: '9+', label: 'Services Offered' },
    { num: '98%', label: 'Success Rate' }
  ];

  whyChooseSec.innerHTML = `
    <div class="container why-choose-layout">
      <div class="reveal">
        <span class="section-badge">Why Choose Us</span>
        <h2 class="section-title" style="text-align: left; margin-bottom: 30px;">Your Trusted Agricultural Partner</h2>
        <p style="color: #475569; font-size: 1.1rem; line-height: 1.7; margin-bottom: 45px;">
          With over 15 years of industry excellence, we've built a solid reputation for robust agricultural support. Our commitment to high quality standards, speed, and customer satisfaction sets us apart as a premier partner in mechanization.
        </p>
        
        <div>
          ${reasons.map(r => `
            <div class="why-choose-feature">
              <div class="why-choose-icon-box">${r.num}</div>
              <div>
                <h4 class="why-choose-feat-title">${r.title}</h4>
                <p class="why-choose-feat-desc">${r.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      
      <div class="why-choose-stats reveal">
        ${stats.map(st => `
          <div class="why-stat-card">
            <div class="why-stat-num">${st.num}</div>
            <div class="why-stat-label">${st.label}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // 5. TRAINING & EDUCATION SECTION (Premium Dark Row)
  const trainingSec = document.createElement('section');
  trainingSec.className = 'sec-training';
  
  const trainingPrograms = [
    {
      title: 'Machinery Operation',
      desc: 'Master tractor and implement operation with hands-on training directly on the field.',
      points: ['Safety Protocols', 'Implement Usage', 'Field Techniques'],
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`
    },
    {
      title: 'Maintenance & Repair',
      desc: 'Learn essential machinery maintenance and hardware troubleshooting skills for operators.',
      points: ['Preventive Care', 'Troubleshooting', 'Parts Replacement'],
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`
    },
    {
      title: 'Modern Techniques',
      desc: 'Stay updated with the latest precision agricultural practices, sustainability, and soil tools.',
      points: ['Precision Farming', 'Sustainability', 'Soil Management'],
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2.5 3 6 3s6-1 6-3v-5"/></svg>`
    }
  ];

  trainingSec.innerHTML = `
    <div class="container">
      <div style="text-align: center; margin-bottom: 60px;" class="reveal">
        <span class="section-badge" style="color: #3b82f6;">Training & Education</span>
        <h2 class="section-title" style="color: #ffffff;">Agricultural Training Programs</h2>
        <p style="color: #cbd5e1; font-size: 1.1rem; max-width: 650px; margin: 0 auto;">
          Empower your farming crew with expert technical knowledge and hands-on operational routines to maximize output.
        </p>
      </div>

      <div class="training-grid">
        ${trainingPrograms.map(tp => `
          <div class="training-card reveal">
            <div class="training-card-icon">
              ${tp.icon}
            </div>
            <h3 class="training-title">${tp.title}</h3>
            <p class="training-desc">${tp.desc}</p>
            <ul class="training-points">
              ${tp.points.map(pt => `
                <li class="training-point">
                  <span class="service-card-point-dot"></span>
                  ${pt}
                </li>
              `).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // 6. CALL TO ACTION SECTION
  const ctaSec = document.createElement('section');
  ctaSec.className = 'sec-cta-serv';
  ctaSec.innerHTML = `
    <div class="container">
      <div class="cta-card-serv reveal">
        <span style="font-size: 0.8rem; font-weight: 800; color: #3b82f6; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 15px; display: block;">GET IN TOUCH</span>
        <h2 style="font-size: clamp(2rem, 3.5vw, 2.8rem); font-weight: 850; line-height: 1.2; margin-bottom: 25px; color: #ffffff;">Ready to Mechanize Your Operations?</h2>
        <p style="color: #cbd5e1; font-size: 1.1rem; line-height: 1.7; max-width: 680px; margin: 0 auto 40px;">
          Partner with Sankara Nigeria Limited to secure robust agricultural machinery, spare parts supply lines, and dedicated field maintenance support.
        </p>
        <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
          <a href="/contact" class="btn-main-green" data-route="contact" style="background: #ffffff; color: #0b0f19; box-shadow: 0 4px 20px rgba(255,255,255,0.15); text-decoration: none;">
            Contact Corporate Office
          </a>
        </div>
      </div>
    </div>
  `;

  // Assemble Elements
  container.appendChild(renderNavbar());
  container.appendChild(heroSec);
  container.appendChild(serviceGrid);
  container.appendChild(simulatorSec);
  container.appendChild(whyChooseSec);
  container.appendChild(trainingSec);
  container.appendChild(ctaSec);
  container.appendChild(renderFooter());

  // Setup routing delegation
  container.querySelectorAll('[data-route]').forEach(el => {
    el.onclick = (e) => {
      e.preventDefault();
      window.navigate(el.dataset.route);
    };
  });

  // Retrigger transitions if global scroll trigger is active
  if (window.initAnimations) {
    setTimeout(window.initAnimations, 100);
  }

  return container;
}
