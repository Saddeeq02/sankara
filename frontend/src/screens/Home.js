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
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #eff6ff 100%);
      color: #0f172a;
      padding: 180px 0 160px;
      position: relative;
      overflow: hidden;
      border-bottom: 1px solid rgba(37, 99, 235, 0.08);
    }
    
    .corp-hero-overlay {
      position: absolute;
      inset: 0;
      z-index: 1;
      pointer-events: none;
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
      text-shadow: 0 4px 15px rgba(0, 0, 0, 0.8);
    }
    
    .hero-title-main span {
      background: linear-gradient(135deg, #dc2626 0%, #3b82f6 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .hero-desc {
      font-size: 1.2rem;
      line-height: 1.7;
      color: #ffffff;
      margin-bottom: 45px;
      max-width: 620px;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
    }
    
    @media (max-width: 968px) {
      .hero-desc {
        margin-left: auto;
        margin-right: auto;
      }
    }
    
    /* Interactive 3D Machinery Slider */
    .hero-visual {
      position: relative;
      width: 100%;
      height: 420px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .machinery-shadow {
      position: absolute;
      bottom: 25px;
      width: 85%;
      height: 25px;
      background: radial-gradient(ellipse, rgba(59, 130, 246, 0.45) 0%, rgba(3, 7, 18, 0) 70%);
      filter: blur(8px);
      z-index: 1;
      pointer-events: none;
    }
    
    .visual-slide {
      position: absolute;
      width: 100%;
      max-width: 520px;
      height: auto;
      object-fit: contain;
      opacity: 0;
      transform: perspective(1000px) rotateX(0deg) rotateY(0deg) scale(0.95);
      transition: opacity 0.8s ease-in-out, transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
      z-index: 2;
      pointer-events: none;
    }
    
    .visual-slide.active {
      opacity: 1;
      transform: perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1);
      pointer-events: auto;
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
    
    .machinery-view-selector {
      position: absolute;
      bottom: -15px;
      display: flex;
      gap: 16px;
      z-index: 10;
      background: rgba(3, 7, 18, 0.8);
      padding: 8px 20px;
      border-radius: 100px;
      border: 1px solid rgba(59, 130, 246, 0.25);
      backdrop-filter: blur(8px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }
    
    .view-dot {
      font-size: 0.72rem;
      font-weight: 800;
      letter-spacing: 1px;
      color: rgba(255, 255, 255, 0.5);
      cursor: pointer;
      transition: all 0.3s ease;
      text-transform: uppercase;
    }
    
    .view-dot:hover, .view-dot.active {
      color: #3b82f6;
      text-shadow: 0 0 8px rgba(59, 130, 246, 0.6);
    }
    
    /* Action Buttons */
    .btn-main-green {
      background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
      color: #ffffff;
      padding: 16px 36px;
      border-radius: 12px;
      font-weight: 700;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 4px 20px rgba(220, 38, 38, 0.3);
      font-size: 0.95rem;
    }
    
    .btn-main-green:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 30px rgba(220, 38, 38, 0.45);
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
      border-color: #dc2626;
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
      background: rgba(220, 38, 38, 0.1);
      clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
      animation: rotate-star 12s linear infinite;
    }
    
    .star-badge-icon {
      position: relative;
      z-index: 2;
      color: #991b1b;
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
      background: var(--secondary-color);
      color: #ffffff;
      border-color: var(--secondary-color);
      box-shadow: 0 8px 20px rgba(37, 99, 235, 0.2);
    }
    
    /* Stats Section */
    .sec-stats {
      background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%);
      color: #0f172a;
      padding: 100px 0;
      position: relative;
      overflow: hidden;
      border-top: 1px solid rgba(37, 99, 235, 0.1);
      border-bottom: 1px solid rgba(37, 99, 235, 0.1);
    }
    
    .sec-stats::before {
      content: '';
      position: absolute;
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, rgba(220, 38, 38, 0.08) 0%, transparent 70%);
      top: -100px;
      left: -100px;
      pointer-events: none;
      z-index: 1;
    }

    .sec-stats::after {
      content: '';
      position: absolute;
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%);
      bottom: -100px;
      right: -100px;
      pointer-events: none;
      z-index: 1;
    }
    
    .stats-layout {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 30px;
      position: relative;
      z-index: 2;
    }
    
    @media (max-width: 968px) {
      .stats-layout {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 576px) {
      .stats-layout {
        grid-template-columns: 1fr;
      }
    }

    .stats-card {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(220, 38, 38, 0.12);
      border-radius: 24px;
      padding: 40px 25px;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    .stats-card::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(220, 38, 38, 0.04) 0%, transparent 100%);
      opacity: 0;
      transition: opacity 0.4s ease;
      pointer-events: none;
    }

    .stats-card:hover {
      transform: translateY(-8px);
      border-color: rgba(220, 38, 38, 0.35);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25), 0 0 25px rgba(220, 38, 38, 0.08);
      background: rgba(255, 255, 255, 0.03);
    }

    .stats-card:hover::before {
      opacity: 1;
    }

    .stats-card-icon {
      width: 52px;
      height: 52px;
      border-radius: 16px;
      background: rgba(220, 38, 38, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #3b82f6;
      margin-bottom: 22px;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .stats-card:hover .stats-card-icon {
      background: #dc2626;
      color: #ffffff;
      transform: scale(1.1) rotate(6deg);
      box-shadow: 0 0 15px rgba(220, 38, 38, 0.4);
    }
    
    .stat-num-val {
      font-size: 3.5rem;
      font-weight: 900;
      background: linear-gradient(135deg, #dc2626 0%, #2563eb 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 12px;
      line-height: 1;
      letter-spacing: -1px;
    }
    
    .stat-lbl-val {
      font-size: 0.85rem;
      font-weight: 750;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #1e3a8a;
      text-align: center;
    }
    
    /* Partner banner curves */
    .cta-banner {
      background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
      border-radius: 32px;
      padding: 80px;
      color: #0f172a;
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 40px;
      box-shadow: 0 20px 40px rgba(15, 23, 42, 0.05);
      border: 1px solid rgba(37, 99, 235, 0.08);
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

    /* Partner logos redesign */
    .partner-logos-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;
      margin: 40px auto 30px;
      max-width: 1100px;
    }
    
    @media (max-width: 968px) {
      .partner-logos-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 480px) {
      .partner-logos-grid {
        grid-template-columns: 1fr;
      }
    }

    .partner-card {
      background: #ffffff;
      border: 1px solid rgba(226, 232, 240, 0.9);
      border-radius: 20px;
      padding: 30px 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.015);
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      min-height: 145px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .partner-card::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(220, 38, 38, 0.02) 0%, transparent 100%);
      opacity: 0;
      transition: opacity 0.4s ease;
      pointer-events: none;
    }

    .partner-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.05), 0 0 15px rgba(220, 38, 38, 0.05);
      border-color: rgba(220, 38, 38, 0.3);
    }

    .partner-card:hover::before {
      opacity: 1;
    }

    .partner-card img {
      max-height: 80px;
      width: auto;
      max-width: 90%;
      object-fit: contain;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .partner-card:hover img {
      transform: scale(1.06);
    }

    /* Team Section CSS styling */
    .team-member-card {
      background: var(--surface-color, #ffffff);
      border: 1px solid var(--glass-border, rgba(226, 232, 240, 0.85));
      border-radius: 28px;
      padding: 20px;
      text-align: center;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 10px 30px rgba(0,0,0,0.02);
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    [data-theme="dark"] .team-member-card {
      background: rgba(30, 41, 59, 0.4);
      border-color: rgba(255, 255, 255, 0.08);
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }

    .team-member-card:hover {
      transform: translateY(-8px);
      border-color: #dc2626;
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.08);
    }

    [data-theme="dark"] .team-member-card:hover {
      border-color: #3b82f6;
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
    }

    .team-member-img-box {
      width: 100%;
      height: 280px;
      margin: 0 auto 20px;
      position: relative;
      background: transparent;
      border: none;
      box-shadow: none;
      overflow: visible;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .team-member-card:hover .team-member-img-box {
      transform: scale(1.06) translateY(-4px);
    }

    .team-member-img-box img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: bottom;
      display: block;
      filter: drop-shadow(0 15px 25px rgba(0, 0, 0, 0.08));
      transition: filter 0.4s ease;
    }

    [data-theme="dark"] .team-member-img-box img {
      filter: drop-shadow(0 15px 25px rgba(0, 0, 0, 0.3));
    }

    .team-member-card:hover .team-member-img-box img {
      filter: drop-shadow(0 20px 35px rgba(153, 27, 27, 0.18));
    }

    [data-theme="dark"] .team-member-card:hover .team-member-img-box img {
      filter: drop-shadow(0 20px 35px rgba(59, 130, 246, 0.25));
    }

    .team-member-name {
      font-size: 1.4rem;
      font-weight: 800;
      color: var(--text-main, #0f172a);
      margin-bottom: 6px;
      letter-spacing: -0.02em;
      font-family: 'Outfit', sans-serif;
    }

    .team-member-role {
      font-size: 0.8rem;
      font-weight: 800;
      color: #991b1b;
      background: rgba(153, 27, 27, 0.06);
      padding: 6px 14px;
      border-radius: 100px;
      margin-bottom: 18px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      display: inline-block;
      border: 1px solid rgba(153, 27, 27, 0.12);
    }

    [data-theme="dark"] .team-member-role {
      color: #3b82f6;
      background: rgba(59, 130, 246, 0.06);
      border-color: rgba(59, 130, 246, 0.12);
    }

    .team-member-phone {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      background: #0f172a;
      color: #ffffff;
      padding: 10px 20px;
      border-radius: 14px;
      font-size: 0.9rem;
      font-weight: 700;
      border: none;
      width: 100%;
      box-sizing: border-box;
      transition: all 0.3s ease;
      text-decoration: none;
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
    }

    [data-theme="dark"] .team-member-phone {
      background: #334155;
      color: #f8fafc;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    }

    .team-member-card:hover .team-member-phone {
      background: #991b1b;
      color: #ffffff;
      box-shadow: 0 6px 20px rgba(153, 27, 27, 0.3);
    }

    [data-theme="dark"] .team-member-card:hover .team-member-phone {
      background: #dc2626;
      color: #ffffff;
      box-shadow: 0 6px 20px rgba(220, 38, 38, 0.3);
    }
  `;
  container.appendChild(styleTag);

  const homeRoot = document.createElement('div');
  homeRoot.className = 'home-root';

  // 1. HERO SECTION
  const heroSec = document.createElement('section');
  heroSec.className = 'hero-sec';
  
  // Dynamic Background Images fading behind the green gradient overlay
  const bgImages = [
    '/assets/hero.png',
    '/assets/hero2.png',
    '/assets/hero3.png',
    '/assets/hero4.png',
    '/assets/hero5.png',
    '/assets/hero6.png'
  ];
  let currentBgIndex = 0;
  heroSec.style.backgroundImage = `url(${bgImages[currentBgIndex]})`;
  heroSec.style.backgroundSize = 'cover';
  heroSec.style.backgroundPosition = 'center';
  heroSec.style.transition = 'background-image 1.5s ease-in-out';
  
  const bgInterval = setInterval(() => {
    if (!document.body.contains(heroSec)) {
      clearInterval(bgInterval);
      return;
    }
    currentBgIndex = (currentBgIndex + 1) % bgImages.length;
    heroSec.style.backgroundImage = `url(${bgImages[currentBgIndex]})`;
  }, 600000); // 10 minutes interval

  // Slideshow Logic for the Machinery Slides
  const machinerySlides = [
    { id: 'slide-lovol-754', src: '/assets/hero_slides/LOVOL-754.webp', label: 'LOVOL 754' },
    { id: 'slide-lovol-754-front', src: '/assets/hero_slides/LOVOL754FRONT.webp', label: 'LOVOL 754 FRONT' },
    { id: 'slide-lovol-back', src: '/assets/hero_slides/LOVOLBACK.webp', label: 'LOVOL BACK' },
    { id: 'slide-mf375', src: '/assets/hero_slides/MF375.webp', label: 'MF 375' },
    { id: 'slide-rg108-plus', src: '/assets/hero_slides/RG108%2B.webp', label: 'RG108+' },
    { id: 'slide-rg108-side', src: '/assets/hero_slides/RG108-SIDE.webp', label: 'RG108 SIDE' },
    { id: 'slide-rk904', src: '/assets/hero_slides/RK904.webp', label: 'RK 904' },
    { id: 'slide-rk904-side', src: '/assets/hero_slides/RK904SIDE.webp', label: 'RK 904 SIDE' },
    { id: 'slide-zl110-s', src: '/assets/hero_slides/ZL110-S.webp', label: 'ZL110-S' },
    { id: 'slide-zl110', src: '/assets/hero_slides/ZL110.webp', label: 'ZL 110' },
    { id: 'slide-tiller', src: '/assets/hero_slides/tiller.webp', label: 'TILLER' }
  ];
  
  let currentSlide = 0;
  
  const updateActiveSlide = (index) => {
    currentSlide = index;
    machinerySlides.forEach((slide, idx) => {
      const img = heroSec.querySelector(`#${slide.id}`);
      if (img) {
        if (idx === currentSlide) {
          img.classList.add('active');
        } else {
          img.classList.remove('active');
          img.style.transform = ''; // Reset transform on inactive slides
        }
      }
    });
 
    // Update active label dot
    const dots = heroSec.querySelectorAll('.view-dot');
    dots.forEach((dot, idx) => {
      if (idx === currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  };

  const slideshowInterval = setInterval(() => {
    if (!document.body.contains(heroSec)) {
      clearInterval(slideshowInterval);
      return;
    }
    const nextIndex = (currentSlide + 1) % machinerySlides.length;
    updateActiveSlide(nextIndex);
  }, 5000);

  // Canvas transparentizer helper
  const makeImageTransparent = (imgElement, srcUrl) => {
    const img = new Image();
    img.src = srcUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      
      // Filter white background pixels with saturation checking and edge feathering
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i+1];
        const b = data[i+2];
        
        const maxVal = Math.max(r, g, b);
        const minVal = Math.min(r, g, b);
        const saturation = maxVal - minVal;
        
        // Only process neutral/gray/white backdrop pixels
        if (saturation < 35) {
          const brightness = (r + g + b) / 3;
          if (brightness > 235) {
            data[i+3] = 0; // Completely transparent
          } else if (brightness > 190) {
            // Smoothly feather anti-aliased edge values
            const alpha = (brightness - 190) / 45; // 0 to 1
            data[i+3] = Math.min(data[i+3], Math.round((1 - alpha) * 255));
          }
        }
      }
      ctx.putImageData(imgData, 0, 0);
      imgElement.src = canvas.toDataURL();
    };
  };

  // Bind transparency, interactivity, and selectors
  setTimeout(() => {
    // Process transparency on slides (Bypassed: new slides are already transparent PNGs)
    /*
    machinerySlides.forEach(slide => {
      const img = heroSec.querySelector(`#${slide.id}`);
      if (img) makeImageTransparent(img, slide.src);
    });
    */

    const container = heroSec.querySelector('.hero-visual');
    if (!container) return;

    // Direct click handler on view selector dots
    const dots = container.querySelectorAll('.view-dot');
    dots.forEach((dot, idx) => {
      dot.onclick = (e) => {
        e.stopPropagation();
        updateActiveSlide(idx);
      };
    });

    const handleMove = (e) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      
      if (!clientX || !clientY) return;

      const x = clientX - rect.left;
      const y = clientY - rect.top;
      
      // Rotate between -20deg and +20deg for deeper tactile response
      const rotateX = -((y / rect.height) - 0.5) * 40;
      const rotateY = ((x / rect.width) - 0.5) * 40;
      
      const activeSlide = container.querySelector('.visual-slide.active');
      if (activeSlide) {
        activeSlide.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.08)`;
      }
    };

    const handleReset = () => {
      const activeSlide = container.querySelector('.visual-slide.active');
      if (activeSlide) {
        activeSlide.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
      }
    };

    container.addEventListener('mousemove', handleMove);
    container.addEventListener('mouseleave', handleReset);
    container.addEventListener('touchmove', handleMove, { passive: true });
    container.addEventListener('touchend', handleReset);
  }, 100);

  heroSec.innerHTML = `
    <div class="corp-hero-overlay" style="background: linear-gradient(135deg, rgba(3, 7, 18, 0.3) 0%, rgba(3, 7, 18, 0.15) 100%);"></div>
    <div class="container hero-grid">
      <div class="hero-content-block">
        <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(220, 38, 38, 0.15); padding: 8px 16px; border-radius: 100px; border: 1px solid rgba(220, 38, 38, 0.2); margin-bottom: 25px;">
          <span style="width: 8px; height: 8px; background: #3b82f6; border-radius: 50%; box-shadow: 0 0 10px #3b82f6;"></span>
          <span style="font-size: 0.75rem; font-weight: 800; letter-spacing: 1px; color: #3b82f6; text-transform: uppercase;">Heavy-Duty Mechanization</span>
        </div>
        <h1 class="hero-title-main">Engineering the Future of <span>Mechanized Farming</span></h1>
        <p class="hero-desc">
          We equip corporate agribusinesses and smallholder farms with robust machinery, high-capacity implements, and comprehensive after-sales services to modernize agricultural production.
        </p>
        <div style="display: flex; flex-wrap: wrap; gap: 15px;">
          <a href="/product" data-route="products" class="btn-main-green">
            Explore Machinery
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
          <a href="/contact" data-route="contact" class="btn-main-outline">Get a Quote</a>
        </div>
      </div>
      
      <div class="hero-visual" style="cursor: grab;">
        <svg class="floating-gear-bg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="top:-50px; right:-20px; width:180px; height:180px;">
          <path d="M50 25C36.19 25 25 36.19 25 50C25 63.81 36.19 75 50 75C63.81 75 75 63.81 75 50C75 36.19 63.81 25 50 25ZM50 67C40.61 67 33 59.39 33 50C33 40.61 40.61 33 50 33C59.39 33 67 40.61 67 50C67 59.39 59.39 67 50 67Z" fill="#3b82f6"/>
        </svg>
        <div class="machinery-shadow"></div>
        
        <!-- Dynamic transparent machinery slides -->
        ${machinerySlides.map((slide, idx) => `
          <img id="${slide.id}" class="visual-slide ${idx === 0 ? 'active' : ''}" src="${slide.src}" alt="${slide.label}">
        `).join('')}

        <div class="machinery-view-selector" style="display: flex; flex-wrap: wrap; gap: 6px; justify-content: center; max-width: 95%; margin: 15px auto 0;">
          ${machinerySlides.map((slide, idx) => `
            <span class="view-dot ${idx === 0 ? 'active' : ''}" style="font-size: 0.62rem; padding: 4px 8px; margin: 1px;">${slide.label}</span>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  // 2. FEATURE / CAPABILITIES SECTION (With Star Badges)
  const featuresSec = document.createElement('section');
  featuresSec.className = 'sec-features';
  featuresSec.innerHTML = `
    <div class="container">
      <div style="text-align: center; margin-bottom: 70px;">
        <span style="font-size: 0.85rem; font-weight: 800; color: #991b1b; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px; display: block;">ENGINEERED SOLUTIONS</span>
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
        <span style="font-size: 0.85rem; font-weight: 800; color: #991b1b; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px; display: block;">OUR FLEET</span>
        <h2 style="font-size: clamp(2.2rem, 4vw, 3.2rem); font-weight: 850; color: #0f172a; letter-spacing: -1px; margin-bottom: 15px;">High-Performance Machinery</h2>
        <p style="color: #475569; font-size: 1.1rem; max-width: 600px; margin: 0 auto;">Filter and view our verified range of agricultural tractors and farm machinery.</p>
      </div>
      
      <div class="fleet-tabs">
        <button class="tab-btn active" data-cat="All">All Fleet</button>
        <button class="tab-btn" data-cat="Tractors">Tractors</button>
        <button class="tab-btn" data-cat="Farm Implements">Implements</button>
        <button class="tab-btn" data-cat="Specialized Equipment">Specialized</button>
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
    <div class="container" style="position: relative; z-index: 5;">
      <div class="stats-layout">
        <!-- Card 1: Experience -->
        <div class="stats-card">
          <div class="stats-card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="8" r="6"/>
              <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
            </svg>
          </div>
          <div class="stat-num-val">40+</div>
          <div class="stat-lbl-val">Years Experience</div>
        </div>
        
        <!-- Card 2: Deployed -->
        <div class="stats-card">
          <div class="stats-card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <polyline points="9 11 11 13 15 9"/>
            </svg>
          </div>
          <div class="stat-num-val">500+</div>
          <div class="stat-lbl-val">Machines Deployed</div>
        </div>
        
        <!-- Card 3: Support -->
        <div class="stats-card">
          <div class="stats-card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
          </div>
          <div class="stat-num-val">100%</div>
          <div class="stat-lbl-val">Support Rating</div>
        </div>
        
        <!-- Card 4: Operations -->
        <div class="stats-card">
          <div class="stats-card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
            </svg>
          </div>
          <div class="stat-num-val">24/7</div>
          <div class="stat-lbl-val">Parts Operations</div>
        </div>
      </div>
    </div>
  `;

  // 5. PARTNERSHIP / CALL TO ACTION BANNER SECTION
  const ctaSec = document.createElement('section');
  ctaSec.style.padding = '80px 0 120px';
  ctaSec.innerHTML = `
    <div class="container">
      <div class="cta-banner">
        <div style="max-width: 650px;">
          <span style="font-size: 0.8rem; font-weight: 800; color: #2563eb; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px; display: block;">GET IN TOUCH</span>
          <h2 style="font-size: clamp(2rem, 3.5vw, 2.8rem); font-weight: 850; line-height: 1.2; margin-bottom: 20px; color: #0f172a;">Ready to Mechanize Your Operations?</h2>
          <p style="color: #475569; font-size: 1.05rem; line-height: 1.6; margin: 0;">
            Partner with Sankara Nigeria Limited to secure robust agricultural machinery, spare parts supply lines, and dedicated field maintenance support.
          </p>
        </div>
        <div>
          <a href="/contact" data-route="contact" class="btn-main-green" style="background: #2563eb; color: #ffffff; box-shadow: 0 4px 20px rgba(37,99,235,0.25); white-space: nowrap;">
            Contact Corporate Office
          </a>
        </div>
      </div>

      <!-- Partner Brands Section -->
      <div class="reveal" style="margin-top: 90px; text-align: center; animation-delay: 0.2s;">
        <h5 style="color: #991b1b; font-size: 0.85rem; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 15px;">STRATEGIC PARTNERSHIPS</h5>
        <h2 style="font-size: clamp(2rem, 3.5vw, 2.6rem); font-weight: 850; color: #0f172a; letter-spacing: -1px; margin-bottom: 25px;">Our Trusted Partners & Brands</h2>
        
        <p style="color: #475569; font-size: 1.1rem; max-width: 800px; margin: 0 auto 50px; line-height: 1.8;">
          Sankara Nigeria Limited is proud to collaborate with global leaders in agricultural machinery and industrial power. As authorized distributors and engineering partners, we deliver genuine products, specialized maintenance support, and custom-fit parts supply chains across the region.
        </p>

        <div class="partner-logos-grid">
          <div class="partner-card">
            <img src="/assets/brand_lovol.png" alt="Lovol">
          </div>
          <div class="partner-card">
            <img src="/assets/brand_zoomlion.png" alt="Zoomlion">
          </div>
          <div class="partner-card">
            <img src="/assets/brand_senci.png" alt="Senci">
          </div>
          <div class="partner-card">
            <img src="/assets/brand_massey.png" alt="Massey Ferguson">
          </div>
        </div>
      </div>
    </div>
  `;



  // 6. ABOUT US SECTION (Right below Strategic Partnerships)
  const aboutSec = document.createElement('section');
  aboutSec.className = 'sec-about-us';
  aboutSec.style.padding = '100px 0 140px';
  aboutSec.style.background = '#f8fafc'; // Subtle light background to separate from footer
  aboutSec.innerHTML = `
    <!-- Part 1: Company Profile & Core Pillars -->
    <div class="container" style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 80px; align-items: start; margin-bottom: 120px;">
      <!-- Left Column: Company Story -->
      <div class="reveal" style="animation-delay: 0.1s;">
        <span style="font-size: 0.85rem; font-weight: 800; color: #991b1b; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px; display: block;">OUR LEGACY</span>
        <h2 style="font-size: clamp(2.2rem, 4vw, 3.2rem); font-weight: 850; color: #0f172a; letter-spacing: -1.5px; line-height: 1.1; margin-bottom: 30px;">Powering Nigeria's <br><span style="color: #991b1b;">Modern Farming</span></h2>
        
        <p style="color: #334155; font-size: 1.15rem; font-weight: 600; line-height: 1.7; margin-bottom: 20px;">
          Since its establishment in 1986, Sankara Nigeria Limited has remained a trusted force in agricultural transformation across Nigeria and the wider region.
        </p>
        
        <p style="color: #475569; font-size: 1.05rem; line-height: 1.8; margin-bottom: 20px;">
          Built on a foundation of integrity, innovation, and dedicated service, we have led the advancement of mechanized and sustainable farming for nearly four decades. Our impact spans the entire Nigerian landscape and extends into neighbouring countries such as Niger, Chad, Cameroon, and Benin, as well as customers all over the world, delivering reliable machinery, genuine spare parts, and expert technical support wherever farmers need us.
        </p>
        
        <p style="color: #475569; font-size: 1.05rem; line-height: 1.8; margin-bottom: 35px;">
          At Sankara, we don't just supply equipment; we provide complete agricultural solutions that empower farmers, agribusinesses, and institutions to achieve greater productivity, efficiency, and long-term growth.
        </p>
        
        <div style="display: flex; gap: 30px; border-top: 1px solid #e2e8f0; padding-top: 30px;">
          <div>
            <h4 style="font-size: 2.2rem; font-weight: 900; color: #0f172a; margin-bottom: 5px;">40+</h4>
            <span style="font-size: 0.85rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">Years of Experience</span>
          </div>
          <div>
            <h4 style="font-size: 2.2rem; font-weight: 900; color: #991b1b; margin-bottom: 5px;">1200+</h4>
            <span style="font-size: 0.85rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">Tractors Delivered</span>
          </div>
        </div>
      </div>

      <!-- Right Column: Mission & Vision Cards Stack -->
      <div style="display: flex; flex-direction: column; gap: 30px;">
        
        <!-- Mission Card -->
        <div class="reveal premium-glass-card" style="padding: 35px; border-radius: 24px; background: #ffffff; border: 1px solid #e2e8f0; animation-delay: 0.2s; transition: all 0.3s; box-shadow: 0 4px 20px rgba(0,0,0,0.02);" onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='#991b1b';" onmouseout="this.style.transform='none'; this.style.borderColor='#e2e8f0';">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; background: rgba(153, 27, 27, 0.1); color: #991b1b; border-radius: 12px; margin-bottom: 20px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
          </div>
          <h3 style="font-size: 1.3rem; font-weight: 850; color: #0f172a; margin-bottom: 12px;">Our Mission</h3>
          <p style="color: #475569; font-size: 0.98rem; line-height: 1.6; margin: 0;">
            To empower Nigerian farmers with world-class agricultural machinery that enhances productivity, reduces labor costs, and drives sustainable agricultural growth across the nation.
          </p>
        </div>

        <!-- Vision Card -->
        <div class="reveal premium-glass-card" style="padding: 35px; border-radius: 24px; background: #ffffff; border: 1px solid #e2e8f0; animation-delay: 0.3s; transition: all 0.3s; box-shadow: 0 4px 20px rgba(0,0,0,0.02);" onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='#991b1b';" onmouseout="this.style.transform='none'; this.style.borderColor='#e2e8f0';">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; background: rgba(153, 27, 27, 0.1); color: #991b1b; border-radius: 12px; margin-bottom: 20px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
          </div>
          <h3 style="font-size: 1.3rem; font-weight: 850; color: #0f172a; margin-bottom: 12px;">Our Vision</h3>
          <p style="color: #475569; font-size: 0.98rem; line-height: 1.6; margin: 0;">
            Driven by passion and purpose, our vision is to become the most recognized and trusted agricultural machinery partner across West Africa; championing modern farming, strengthening partnerships, and delivering innovations that transform communities and protect the environment.
          </p>
        </div>

        <!-- Values Card -->
        <div class="reveal premium-glass-card" style="padding: 35px; border-radius: 24px; background: #ffffff; border: 1px solid #e2e8f0; animation-delay: 0.4s; transition: all 0.3s; box-shadow: 0 4px 20px rgba(0,0,0,0.02);" onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='#991b1b';" onmouseout="this.style.transform='none'; this.style.borderColor='#e2e8f0';">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; background: rgba(153, 27, 27, 0.1); color: #991b1b; border-radius: 12px; margin-bottom: 20px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>
          </div>
          <h3 style="font-size: 1.3rem; font-weight: 850; color: #0f172a; margin-bottom: 12px;">Our Core Values</h3>
          <p style="color: #475569; font-size: 0.98rem; line-height: 1.6; margin: 0;">
            Integrity, excellence, and customer satisfaction guide everything we do. We believe in building lasting relationships through honest dealings and superior service.
          </p>
        </div>
      </div>
    </div>

    <!-- Part 2: Why Choose Us Section -->
    <div class="container" style="margin-bottom: 120px;">
      <div style="text-align: center; margin-bottom: 60px;">
        <span style="font-size: 0.85rem; font-weight: 800; color: #991b1b; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px; display: block;">UNCOMPROMISING SERVICE</span>
        <h2 style="font-size: clamp(2rem, 3.5vw, 2.8rem); font-weight: 850; color: #0f172a; letter-spacing: -1px; margin-bottom: 20px;">Why Choose Us</h2>
        <p style="color: #475569; font-size: 1.1rem; max-width: 700px; margin: 0 auto; line-height: 1.7;">
          We go beyond selling machinery. We provide comprehensive solutions, unwavering support, and genuine commitment to your agricultural success.
        </p>
      </div>

      <div class="about-why-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 24px;">
        <!-- Card 1: Support -->
        <div class="reveal premium-glass-card" style="padding: 30px; border-radius: 20px; background: #ffffff; border: 1px solid #e2e8f0; transition: all 0.3s;" onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='#991b1b';" onmouseout="this.style.transform='none'; this.style.borderColor='#e2e8f0';">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 44px; height: 44px; background: rgba(153, 27, 27, 0.1); color: #991b1b; border-radius: 10px; margin-bottom: 20px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </div>
          <h4 style="font-size: 1.1rem; font-weight: 800; color: #0f172a; margin-bottom: 12px;">24/7 Support</h4>
          <p style="color: #475569; font-size: 0.92rem; line-height: 1.5; margin: 0;">
            Round-the-clock assistance for all your queries, technical support, and emergency services. We're always here when you need us.
          </p>
        </div>

        <!-- Card 2: OEM Parts -->
        <div class="reveal premium-glass-card" style="padding: 30px; border-radius: 20px; background: #ffffff; border: 1px solid #e2e8f0; transition: all 0.3s; animation-delay: 0.1s;" onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='#991b1b';" onmouseout="this.style.transform='none'; this.style.borderColor='#e2e8f0';">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 44px; height: 44px; background: rgba(153, 27, 27, 0.1); color: #991b1b; border-radius: 10px; margin-bottom: 20px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
          </div>
          <h4 style="font-size: 1.1rem; font-weight: 800; color: #0f172a; margin-bottom: 12px;">Genuine Spare Parts</h4>
          <p style="color: #475569; font-size: 0.92rem; line-height: 1.5; margin: 0;">
            100% authentic OEM parts ensuring optimal performance, longevity, and warranty compliance for all your machinery needs.
          </p>
        </div>

        <!-- Card 3: Delivery -->
        <div class="reveal premium-glass-card" style="padding: 30px; border-radius: 20px; background: #ffffff; border: 1px solid #e2e8f0; transition: all 0.3s; animation-delay: 0.2s;" onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='#991b1b';" onmouseout="this.style.transform='none'; this.style.borderColor='#e2e8f0';">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 44px; height: 44px; background: rgba(153, 27, 27, 0.1); color: #991b1b; border-radius: 10px; margin-bottom: 20px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
          </div>
          <h4 style="font-size: 1.1rem; font-weight: 800; color: #0f172a; margin-bottom: 12px;">Nationwide Delivery</h4>
          <p style="color: #475569; font-size: 0.92rem; line-height: 1.5; margin: 0;">
            Reliable delivery services covering all 36 states of Nigeria. Your equipment reaches you safely and on time, anywhere in the country.
          </p>
        </div>

        <!-- Card 4: Experts -->
        <div class="reveal premium-glass-card" style="padding: 30px; border-radius: 20px; background: #ffffff; border: 1px solid #e2e8f0; transition: all 0.3s; animation-delay: 0.3s;" onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='#991b1b';" onmouseout="this.style.transform='none'; this.style.borderColor='#e2e8f0';">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 44px; height: 44px; background: rgba(153, 27, 27, 0.1); color: #991b1b; border-radius: 10px; margin-bottom: 20px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <h4 style="font-size: 1.1rem; font-weight: 800; color: #0f172a; margin-bottom: 12px;">Trained Experts</h4>
          <p style="color: #475569; font-size: 0.92rem; line-height: 1.5; margin: 0;">
            Certified technicians with extensive training and experience. Expert maintenance, repairs, and consultation services you can trust.
          </p>
        </div>

        <!-- Card 5: Maintenance -->
        <div class="reveal premium-glass-card" style="padding: 30px; border-radius: 20px; background: #ffffff; border: 1px solid #e2e8f0; transition: all 0.3s; animation-delay: 0.4s;" onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='#991b1b';" onmouseout="this.style.transform='none'; this.style.borderColor='#e2e8f0';">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 44px; height: 44px; background: rgba(153, 27, 27, 0.1); color: #991b1b; border-radius: 10px; margin-bottom: 20px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
          </div>
          <h4 style="font-size: 1.1rem; font-weight: 800; color: #0f172a; margin-bottom: 12px;">After-Sales Service</h4>
          <p style="color: #475569; font-size: 0.92rem; line-height: 1.5; margin: 0;">
            Comprehensive maintenance programs, scheduled servicing, and emergency repairs to keep your machinery running at peak performance.
          </p>
        </div>
      </div>
    </div>

    <!-- Part 3: Why Manufacturers Choose Sankara -->
    <div class="container" style="margin-bottom: 120px;">
      <div style="text-align: center; margin-bottom: 60px;">
        <span style="font-size: 0.85rem; font-weight: 800; color: #991b1b; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px; display: block;">B2B TRUST & AUTHORITY</span>
        <h2 style="font-size: clamp(2rem, 3.5vw, 2.8rem); font-weight: 850; color: #0f172a; letter-spacing: -1px; margin-bottom: 20px;">Why Manufacturers Choose Sankara</h2>
        <p style="color: #475569; font-size: 1.1rem; max-width: 700px; margin: 0 auto; line-height: 1.7;">
          Global heavy agricultural brands select Sankara Nigeria Limited to manage their market deployment due to our long-standing authority and reliable support.
        </p>
      </div>

      <div class="about-why-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px;">
        <!-- Fact 1 -->
        <div class="reveal" style="padding: 30px; border-left: 4px solid #991b1b; background: rgba(248, 250, 252, 0.5);">
          <h4 style="font-size: 1.15rem; font-weight: 850; color: #0f172a; margin-bottom: 10px;">Proven Track Record</h4>
          <p style="color: #475569; font-size: 0.95rem; line-height: 1.6; margin: 0;">
            Nearly 40 years of successful operations and customer satisfaction in the Nigerian agricultural market.
          </p>
        </div>

        <!-- Fact 2 -->
        <div class="reveal" style="padding: 30px; border-left: 4px solid #991b1b; background: rgba(248, 250, 252, 0.5); animation-delay: 0.1s;">
          <h4 style="font-size: 1.15rem; font-weight: 850; color: #0f172a; margin-bottom: 10px;">Extensive Network</h4>
          <p style="color: #475569; font-size: 0.95rem; line-height: 1.6; margin: 0;">
            Nationwide presence covering all 36 states with reliable delivery and service infrastructure.
          </p>
        </div>

        <!-- Fact 3 -->
        <div class="reveal" style="padding: 30px; border-left: 4px solid #991b1b; background: rgba(248, 250, 252, 0.5); animation-delay: 0.2s;">
          <h4 style="font-size: 1.15rem; font-weight: 850; color: #0f172a; margin-bottom: 10px;">Technical Expertise</h4>
          <p style="color: #475569; font-size: 0.95rem; line-height: 1.6; margin: 0;">
            Certified technicians and comprehensive after-sales support capabilities.
          </p>
        </div>

        <!-- Fact 4 -->
        <div class="reveal" style="padding: 30px; border-left: 4px solid #991b1b; background: rgba(248, 250, 252, 0.5); animation-delay: 0.3s;">
          <h4 style="font-size: 1.15rem; font-weight: 850; color: #0f172a; margin-bottom: 10px;">Market Leadership</h4>
          <p style="color: #475569; font-size: 0.95rem; line-height: 1.6; margin: 0;">
            Leading position in agricultural machinery sales with over 1200 tractors delivered.
          </p>
        </div>
      </div>
    </div>

    <!-- Part 4: Milestones Timeline Section -->
    <div class="container" style="margin-bottom: 40px;">
      <div style="text-align: center; margin-bottom: 80px;">
        <span style="font-size: 0.85rem; font-weight: 800; color: #991b1b; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px; display: block;">OUR MILESTONES</span>
        <h2 style="font-size: clamp(2rem, 3.5vw, 2.8rem); font-weight: 850; color: #0f172a; letter-spacing: -1px; margin-bottom: 20px;">Milestones of Excellence</h2>
        <p style="color: #475569; font-size: 1.1rem; max-width: 700px; margin: 0 auto; line-height: 1.7;">
          Tracing our transformative impact on Nigerian agriculture through nearly four decades of dedication.
        </p>
      </div>

      <!-- Vertical Timeline Wrapper -->
      <div style="position: relative; max-width: 900px; margin: 0 auto; padding: 20px 0;">
        <!-- Timeline Line -->
        <div style="position: absolute; left: 50%; top: 0; bottom: 0; width: 4px; background: #e2e8f0; transform: translateX(-50%);"></div>

        <!-- Node 1: Founding (1986) -->
        <div class="reveal timeline-row" style="display: flex; justify-content: space-between; align-items: center; width: 100%; margin-bottom: 50px; position: relative;">
          <div class="timeline-pane" style="width: 44%; text-align: right; padding-right: 30px;">
            <span style="font-size: 1.25rem; font-weight: 900; color: #991b1b;">1986</span>
            <h4 style="font-size: 1.2rem; font-weight: 850; color: #0f172a; margin: 5px 0 10px;">Company Founded</h4>
            <p style="color: #475569; font-size: 0.95rem; line-height: 1.6; margin: 0;">
              Sankara Nigeria Limited was established with a vision to transform Nigerian agriculture through reliable machinery.
            </p>
          </div>
          <!-- Center Dot -->
          <div style="position: absolute; left: 50%; transform: translateX(-50%); width: 20px; height: 20px; background: #991b1b; border: 4px solid #ffffff; border-radius: 50%; box-shadow: 0 0 0 4px rgba(153, 27, 27, 0.15); z-index: 2;"></div>
          <div style="width: 44%;"></div>
        </div>

        <!-- Node 2: First Major Partnership -->
        <div class="reveal timeline-row" style="display: flex; justify-content: space-between; align-items: center; width: 100%; margin-bottom: 50px; position: relative;">
          <div style="width: 44%;"></div>
          <!-- Center Dot -->
          <div style="position: absolute; left: 50%; transform: translateX(-50%); width: 20px; height: 20px; background: #991b1b; border: 4px solid #ffffff; border-radius: 50%; box-shadow: 0 0 0 4px rgba(153, 27, 27, 0.15); z-index: 2;"></div>
          <div class="timeline-pane" style="width: 44%; text-align: left; padding-left: 30px;">
            <span style="font-size: 1.25rem; font-weight: 900; color: #991b1b;">Dealer Certification</span>
            <h4 style="font-size: 1.2rem; font-weight: 850; color: #0f172a; margin: 5px 0 10px;">First Major Partnership</h4>
            <p style="color: #475569; font-size: 0.95rem; line-height: 1.6; margin: 0;">
              Became authorized dealer for Massey Ferguson, establishing our reputation for quality and reliability.
            </p>
          </div>
        </div>

        <!-- Node 3: Nationwide Expansion -->
        <div class="reveal timeline-row" style="display: flex; justify-content: space-between; align-items: center; width: 100%; margin-bottom: 50px; position: relative;">
          <div class="timeline-pane" style="width: 44%; text-align: right; padding-right: 30px;">
            <span style="font-size: 1.25rem; font-weight: 900; color: #991b1b;">Logistics Scale</span>
            <h4 style="font-size: 1.2rem; font-weight: 850; color: #0f172a; margin: 5px 0 10px;">Nationwide Expansion</h4>
            <p style="color: #475569; font-size: 0.95rem; line-height: 1.6; margin: 0;">
              Expanded operations to serve farmers across all 36 states of Nigeria with a comprehensive delivery network.
            </p>
          </div>
          <!-- Center Dot -->
          <div style="position: absolute; left: 50%; transform: translateX(-50%); width: 20px; height: 20px; background: #991b1b; border: 4px solid #ffffff; border-radius: 50%; box-shadow: 0 0 0 4px rgba(153, 27, 27, 0.15); z-index: 2;"></div>
          <div style="width: 44%;"></div>
        </div>

        <!-- Node 4: 500+ Tractors -->
        <div class="reveal timeline-row" style="display: flex; justify-content: space-between; align-items: center; width: 100%; margin-bottom: 50px; position: relative;">
          <div style="width: 44%;"></div>
          <!-- Center Dot -->
          <div style="position: absolute; left: 50%; transform: translateX(-50%); width: 20px; height: 20px; background: #991b1b; border: 4px solid #ffffff; border-radius: 50%; box-shadow: 0 0 0 4px rgba(153, 27, 27, 0.15); z-index: 2;"></div>
          <div class="timeline-pane" style="width: 44%; text-align: left; padding-left: 30px;">
            <span style="font-size: 1.25rem; font-weight: 900; color: #991b1b;">Sales Milestone</span>
            <h4 style="font-size: 1.2rem; font-weight: 850; color: #0f172a; margin: 5px 0 10px;">500+ Tractors Delivered</h4>
            <p style="color: #475569; font-size: 0.95rem; line-height: 1.6; margin: 0;">
              Reached milestone of delivering over 500 tractors, becoming one of Nigeria's leading agricultural machinery suppliers.
            </p>
          </div>
        </div>

        <!-- Node 5: Parts Network -->
        <div class="reveal timeline-row" style="display: flex; justify-content: space-between; align-items: center; width: 100%; margin-bottom: 50px; position: relative;">
          <div class="timeline-pane" style="width: 44%; text-align: right; padding-right: 30px;">
            <span style="font-size: 1.25rem; font-weight: 900; color: #991b1b;">Supply Chain</span>
            <h4 style="font-size: 1.2rem; font-weight: 850; color: #0f172a; margin: 5px 0 10px;">Genuine Parts Network</h4>
            <p style="color: #475569; font-size: 0.95rem; line-height: 1.6; margin: 0;">
              Established nationwide spare parts distribution network ensuring authentic OEM parts availability.
            </p>
          </div>
          <!-- Center Dot -->
          <div style="position: absolute; left: 50%; transform: translateX(-50%); width: 20px; height: 20px; background: #991b1b; border: 4px solid #ffffff; border-radius: 50%; box-shadow: 0 0 0 4px rgba(153, 27, 27, 0.15); z-index: 2;"></div>
          <div style="width: 44%;"></div>
        </div>

        <!-- Node 6: 1200+ Tractors & 24/7 Support -->
        <div class="reveal timeline-row" style="display: flex; justify-content: space-between; align-items: center; width: 100%; position: relative;">
          <div style="width: 44%;"></div>
          <!-- Center Dot -->
          <div style="position: absolute; left: 50%; transform: translateX(-50%); width: 20px; height: 20px; background: #991b1b; border: 4px solid #ffffff; border-radius: 50%; box-shadow: 0 0 0 4px rgba(153, 27, 27, 0.15); z-index: 2;"></div>
          <div class="timeline-pane" style="width: 44%; text-align: left; padding-left: 30px;">
            <span style="font-size: 1.25rem; font-weight: 900; color: #991b1b;">Current Legacy</span>
            <h4 style="font-size: 1.2rem; font-weight: 850; color: #0f172a; margin: 5px 0 10px;">1200+ Tractors Delivered</h4>
            <p style="color: #475569; font-size: 0.95rem; line-height: 1.6; margin: 0;">
              Achieved milestone of delivering over 1200 tractors, supporting 5000+ farmers across Nigeria with 24/7 assistance and training programs.
            </p>
          </div>
        </div>

      </div>
    </div>
  `;

  // Inject responsive stylesheet for About Us section
  const aboutStyle = document.createElement('style');
  aboutStyle.innerHTML = `
    @media (max-width: 991px) {
      .sec-about-us .container {
        grid-template-columns: 1fr !important;
        gap: 50px !important;
        padding-left: 20px !important;
        padding-right: 20px !important;
      }
      .sec-about-us .timeline-row {
        flex-direction: column !important;
        align-items: flex-start !important;
        margin-bottom: 40px !important;
      }
      .sec-about-us .timeline-pane {
        width: 100% !important;
        text-align: left !important;
        padding-left: 40px !important;
        padding-right: 0 !important;
      }
      .sec-about-us div[style*="left: 50%"] {
        left: 15px !important;
        transform: none !important;
      }
      .sec-about-us div[style*="width: 4px"] {
        left: 15px !important;
        transform: none !important;
      }
    }
  `;
  document.head.appendChild(aboutStyle);

  // Section 7: Team Section (After Milestones of Excellence)
  const teamSec = document.createElement('section');
  teamSec.className = 'sec-team';
  teamSec.style.padding = '120px 0';
  teamSec.style.background = '#ffffff';
  teamSec.style.borderTop = '1px solid #e2e8f0';
  teamSec.innerHTML = `
    <div class="container">
      <div style="text-align: center; margin-bottom: 70px;">
        <span class="reveal" style="font-size: 0.85rem; font-weight: 800; color: #991b1b; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px; display: block;">Our Team</span>
        <h2 class="reveal" style="font-size: clamp(2rem, 3.5vw, 2.8rem); font-weight: 850; color: #0f172a; letter-spacing: -1px; margin-bottom: 20px;">The Leadership & Technical Experts</h2>
        <p class="reveal" style="color: #475569; font-size: 1.1rem; max-width: 750px; margin: 0 auto; line-height: 1.7;">
          The dedicated professionals working round the clock to power modern agriculture and customer success across Nigeria.
        </p>
      </div>

      <div class="team-grid" id="home-team-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 30px;">
        <div style="grid-column: 1/-1; text-align: center; padding: 40px 0; color: #64748b;">Loading team profiles...</div>
      </div>
    </div>
  `;

  const loadTeam = async () => {
    try {
      const res = await fetch('/api/team');
      const team = await res.json();
      const grid = teamSec.querySelector('#home-team-grid');
      
      if (team.length === 0) {
        grid.innerHTML = `
          <div style="grid-column: 1/-1; text-align: center; padding: 60px 0; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 24px;">
            <p style="color: #64748b; font-size: 1.1rem; font-weight: 600;">Meet our team soon! Our member profile listings are being updated.</p>
          </div>
        `;
        return;
      }

      grid.innerHTML = team.map((member, idx) => `
        <div class="reveal team-member-card" style="animation-delay: ${idx * 0.1}s;">
          <div class="team-member-img-box">
            <img src="${member.image}" alt="${member.name}" loading="lazy">
          </div>
          <h3 class="team-member-name">${member.name}</h3>
          <div class="team-member-role">${member.role}</div>
        </div>
      `).join('');

      if (window.initAnimations) {
        setTimeout(window.initAnimations, 100);
      }
    } catch (err) {
      console.error('Error loading team data:', err);
    }
  };

  loadTeam();

  // Append everything
  homeRoot.appendChild(heroSec);
  homeRoot.appendChild(featuresSec);
  homeRoot.appendChild(fleetSec);
const fallbackProducts = [
  {
    "id": "p-1",
    "name": "13HP Tata Power Tiller",
    "category": "Specialized Equipment",
    "price": "Price on Request",
    "image": "/assets/products_staging/OTHER/13HP Tata Power Tiller/WhatsApp Image 2026-07-09 at 11.34.23 AM.jpeg",
    "images": [
      "/assets/products_staging/OTHER/13HP Tata Power Tiller/WhatsApp Image 2026-07-09 at 11.34.23 AM.jpeg",
      "/assets/products_staging/OTHER/13HP Tata Power Tiller/WhatsApp Image 2026-07-09 at 11.34.30 AM.jpeg"
    ],
    "specs": [
      "13 HP Heavy-Duty Engine",
      "Dual-Speed Transmission",
      "Extra-Wide Rotary Tines",
      "Reinforced Mechanical Frame"
    ],
    "task": "Medium-scale soil cultivation, rotary plowing, and hauling in smallholder fields or hard clay soils.",
    "description": "Providing nearly double the power of the smaller model, the 13HP Tata Power Tiller handles tough, compacted soils with ease. It supports deeper row-tilling and can pull small farm carts, making it a rugged and versatile primary tool for medium-scale vegetable farms.",
    "status": "Active"
  },
  {
    "id": "p-2",
    "name": "4-Row Corn Harvester Header",
    "category": "Specialized Equipment",
    "price": "Price on Request",
    "image": "/assets/products_staging/OTHER/4 ROW CORN HARVESTER HEADER/WhatsApp Image 2026-07-09 at 11.34.04 AM (1).jpeg",
    "images": [
      "/assets/products_staging/OTHER/4 ROW CORN HARVESTER HEADER/WhatsApp Image 2026-07-09 at 11.34.04 AM (1).jpeg",
      "/assets/products_staging/OTHER/4 ROW CORN HARVESTER HEADER/WhatsApp Image 2026-07-09 at 11.34.04 AM.jpeg",
      "/assets/products_staging/OTHER/4 ROW CORN HARVESTER HEADER/WhatsApp Image 2026-07-09 at 11.34.22 AM (1).jpeg"
    ],
    "specs": [
      "4-Row Harvesting Capacity",
      "High-Strength Steel Construction",
      "Compatible with Major Combine Harvesters",
      "Optimized Row Spacing"
    ],
    "task": "Efficiently snapping and harvesting corn ears from stalks while minimizing grain damage and field loss.",
    "description": "This high-performance 4-Row Corn Harvester Header is engineered for seamless integration with combine harvesters. It cleanly separates corn ears from stalks, directing them into the feeder house while leaving chopped stalks on the field, maximizing efficiency during the harvest season.",
    "status": "Active"
  },
  {
    "id": "p-3",
    "name": "7HP Tata Power Tiller",
    "category": "Specialized Equipment",
    "price": "Price on Request",
    "image": "/assets/products_staging/OTHER/7HP Tata Power Tiller/WhatsApp Image 2026-07-09 at 11.34.24 AM (1).jpeg",
    "images": [
      "/assets/products_staging/OTHER/7HP Tata Power Tiller/WhatsApp Image 2026-07-09 at 11.34.24 AM (1).jpeg",
      "/assets/products_staging/OTHER/7HP Tata Power Tiller/WhatsApp Image 2026-07-09 at 11.34.29 AM (1).jpeg"
    ],
    "specs": [
      "7 HP Gasoline/Diesel Engine",
      "Compact Walking Frame",
      "Multi-Blade Rotary Tines",
      "Adjustable Handlebars"
    ],
    "task": "Small-scale soil tilling, weeding, and seedbed preparation in home gardens, narrow orchards, and greenhouses.",
    "description": "The 7HP Tata Power Tiller is a light, agile walk-behind cultivator built for intensive work in tight spaces. Perfect for smallholders and vegetable gardeners, it breaks up topsoil and cuts down weeds with minimal user effort, navigating narrow pathways where full-sized tractors cannot fit.",
    "status": "Active"
  },
  {
    "id": "p-4",
    "name": "Bamford Baler",
    "category": "Specialized Equipment",
    "price": "Price on Request",
    "image": "/assets/products_staging/OTHER/Bamford Baler/BamfordBaler-x1zE2RlD.jpeg",
    "images": [
      "/assets/products_staging/OTHER/Bamford Baler/BamfordBaler-x1zE2RlD.jpeg"
    ],
    "specs": [
      "High-Density Compression Chamber",
      "Automated Knotter System",
      "Adjustable Bale Size",
      "PTO Driven"
    ],
    "task": "Gathering and compressing loose hay, straw, or forage into compact, transportable, and stackable bales.",
    "description": "The Bamford Baler is an essential implement for managing post-harvest straw and livestock forage. It cleans fields by pulling in loose material, compacting it inside a high-density chamber, and securing it with an automated knotting mechanism. The resulting uniform bales are easy to transport and store over long winters.",
    "status": "Active"
  },
  {
    "id": "p-5",
    "name": "Bamford Forage Harvester (Chopper)",
    "category": "Specialized Equipment",
    "price": "Price on Request",
    "image": "/assets/products_staging/OTHER/Bamford Forage Harvester (Chopper)/BamfordForageHarvesterChopper-DfRrIS-T.jpeg",
    "images": [
      "/assets/products_staging/OTHER/Bamford Forage Harvester (Chopper)/BamfordForageHarvesterChopper-DfRrIS-T.jpeg",
      "/assets/products_staging/OTHER/Bamford Forage Harvester (Chopper)/WhatsApp Image 2026-07-09 at 11.34.01 AM.jpeg"
    ],
    "specs": [
      "PTO Driven",
      "High-Speed Cutting Flywheel",
      "Adjustable Chop Length",
      "Directional Discharge Chute"
    ],
    "task": "Cutting and fine-chopping green fodder crops (such as maize or sorghum) for high-quality silage production.",
    "description": "This tractor-driven forage harvester cuts green standing crops and immediately processes them through a high-speed chopping mechanism. It guarantees uniform chop lengths, which optimizes anaerobic compaction during silage fermentation, improving the overall nutritional retention of livestock feed.",
    "status": "Active"
  },
  {
    "id": "p-6",
    "name": "Multi-Crop Thresher",
    "category": "Specialized Equipment",
    "price": "Price on Request",
    "image": "/assets/products_staging/OTHER/THRESHER/WhatsApp Image 2026-07-09 at 11.33.51 AM.jpeg",
    "images": [
      "/assets/products_staging/OTHER/THRESHER/WhatsApp Image 2026-07-09 at 11.33.51 AM.jpeg",
      "/assets/products_staging/OTHER/THRESHER/WhatsApp Image 2026-07-09 at 11.34.05 AM.jpeg",
      "/assets/products_staging/OTHER/THRESHER/WhatsApp Image 2026-07-09 at 11.34.06 AM.jpeg"
    ],
    "specs": [
      "High-Speed Threshing Cylinder",
      "Adjustable Blow Speed",
      "Interchangeable Screen Sieves",
      "Tractor PTO or Engine Powered"
    ],
    "task": "Separating grains from harvested crops (maize, sorghum, rice, beans) rapidly and cleanly.",
    "description": "The Multi-Crop Thresher is a robust post-harvest machine designed to separate grain from chaff. Powered by a tractor PTO or an auxiliary engine, it processes harvested stalks, yielding clean, polished grain with minimal kernel damage, dramatically cutting down manual threshing labor.",
    "status": "Active"
  },
  {
    "id": "p-7",
    "name": "Tata 2BYZF-4 No-Till Planter with Fertilizer Applicator",
    "category": "Specialized Equipment",
    "price": "Price on Request",
    "image": "/assets/products_staging/OTHER/Tata 2BYZF-4 No-Till Planter with Fertilizer Applicator/FertilizerApplicator4Planter--V26CKtd.jpeg",
    "images": [
      "/assets/products_staging/OTHER/Tata 2BYZF-4 No-Till Planter with Fertilizer Applicator/FertilizerApplicator4Planter--V26CKtd.jpeg",
      "/assets/products_staging/OTHER/Tata 2BYZF-4 No-Till Planter with Fertilizer Applicator/WhatsApp Image 2026-07-09 at 11.33.50 AM.jpeg",
      "/assets/products_staging/OTHER/Tata 2BYZF-4 No-Till Planter with Fertilizer Applicator/WhatsApp Image 2026-07-09 at 11.34.26 AM.jpeg",
      "/assets/products_staging/OTHER/Tata 2BYZF-4 No-Till Planter with Fertilizer Applicator/WhatsApp Image 2026-07-09 at 11.34.27 AM (1).jpeg",
      "/assets/products_staging/OTHER/Tata 2BYZF-4 No-Till Planter with Fertilizer Applicator/WhatsApp Image 2026-07-09 at 11.34.27 AM.jpeg"
    ],
    "specs": [
      "4-Row Seeding Assembly",
      "No-Till Disc Openers",
      "Integrated Dual Fertilizer Hoppers",
      "Depth-Control Press Wheels"
    ],
    "task": "Simultaneous direct seeding and precise fertilizer placement into unplowed crop fields in a single pass.",
    "description": "The Tata 2BYZF-4 is an advanced 4-row planter engineered for conservation agriculture. Its sharp disc cutters cut through old crop residues to place seeds directly into the unplowed earth, while simultaneously laying down fertilizer. This method protects the soil structure and conserves ground moisture.",
    "status": "Active"
  },
  {
    "id": "p-8",
    "name": "Tata 2BYZF-6 No-Till Planter with Fertilizer Applicator",
    "category": "Specialized Equipment",
    "price": "Price on Request",
    "image": "/assets/products_staging/OTHER/Tata 2BYZF-6 No-Till Planter with Fertilizer Applicator/FertilizerApplicator-DRJGsdIk.jpeg",
    "images": [
      "/assets/products_staging/OTHER/Tata 2BYZF-6 No-Till Planter with Fertilizer Applicator/FertilizerApplicator-DRJGsdIk.jpeg",
      "/assets/products_staging/OTHER/Tata 2BYZF-6 No-Till Planter with Fertilizer Applicator/WhatsApp Image 2026-07-09 at 11.34.00 AM.jpeg",
      "/assets/products_staging/OTHER/Tata 2BYZF-6 No-Till Planter with Fertilizer Applicator/WhatsApp Image 2026-07-09 at 11.34.23 AM (1).jpeg",
      "/assets/products_staging/OTHER/Tata 2BYZF-6 No-Till Planter with Fertilizer Applicator/WhatsApp Image 2026-07-09 at 11.34.24 AM.jpeg"
    ],
    "specs": [
      "6-Row Seeding Assembly",
      "Heavy-Duty No-Till Disc Coulters",
      "Large Capacity Seed/Fertilizer Tanks",
      "Precision Metering Units"
    ],
    "task": "High-capacity direct seeding and fertilizer application across larger acreage fields to preserve soil moisture.",
    "description": "This 6-row configuration maximizes planting efficiency for larger farming operations. It shares the same no-till design as the 4-row model, but features larger seed and fertilizer capacities to minimize refilling stops, allowing farmers to cover fields rapidly while preventing soil erosion.",
    "status": "Active"
  },
  {
    "id": "p-9",
    "name": "Tata 6N2018X-G Rice Mill",
    "category": "Specialized Equipment",
    "price": "Price on Request",
    "image": "/assets/products_staging/OTHER/Tata 6N2018X-G Rice Mill/WhatsApp Image 2026-07-09 at 11.33.52 AM.jpeg",
    "images": [
      "/assets/products_staging/OTHER/Tata 6N2018X-G Rice Mill/WhatsApp Image 2026-07-09 at 11.33.52 AM.jpeg",
      "/assets/products_staging/OTHER/Tata 6N2018X-G Rice Mill/WhatsApp Image 2026-07-09 at 11.34.28 AM.jpeg",
      "/assets/products_staging/OTHER/Tata 6N2018X-G Rice Mill/WhatsApp Image 2026-07-09 at 11.34.29 AM.jpeg"
    ],
    "specs": [
      "Integrated De-husking System",
      "Multistage Rice Polishing System",
      "High-Output Electric Motor",
      "Compact Footprint"
    ],
    "task": "Processing harvested field paddy into fully de-husked, polished, and market-ready white rice.",
    "description": "The Tata 6N2018X-G is an efficient, all-in-one rice milling machine built for decentralized agricultural processing. It gently separates the tough outer husk from raw paddy grains before running them through an integrated polishing system, producing clean, high-grade white rice with a very low percentage of broken grains.",
    "status": "Active"
  },
  {
    "id": "p-10",
    "name": "Tata Boom Sprayer",
    "category": "Specialized Equipment",
    "price": "Price on Request",
    "image": "/assets/products_staging/OTHER/Tata Boom Sprayer/TataBoomSprayer-DdUxDens.jpeg",
    "images": [
      "/assets/products_staging/OTHER/Tata Boom Sprayer/TataBoomSprayer-DdUxDens.jpeg"
    ],
    "specs": [
      "Tractor-Mounted Frame",
      "Wide-Span Folding Booms",
      "Adjustable Spray Nozzles",
      "Chemical-Resistant Poly Tank"
    ],
    "task": "Wide-coverage, precise application of liquid pesticides, liquid fertilizers, and herbicides across large crop fields.",
    "description": "The Tata Boom Sprayer provides uniform chemical coverage across a wide path, drastically reducing field time. It features adjustable nozzles to minimize chemical drift, ensuring targeted and efficient crop protection. Its durable boom arms fold compactly for safe transport between fields.",
    "status": "Active"
  },
  {
    "id": "p-11",
    "name": "Tata Rice Transplanter",
    "category": "Specialized Equipment",
    "price": "Price on Request",
    "image": "/assets/products_staging/OTHER/Tata Rice Transplanter/RiceTransplanter-nXZtJxAL.jpeg",
    "images": [
      "/assets/products_staging/OTHER/Tata Rice Transplanter/RiceTransplanter-nXZtJxAL.jpeg"
    ],
    "specs": [
      "Mechanized Row Planting Fingers",
      "Uniform Seedling Spacing",
      "Low-Compaction Paddy Wheels",
      "High-Speed Float Board"
    ],
    "task": "Mechanized, high-speed transplanting of young rice seedlings into flooded paddy fields.",
    "description": "This specialized machine replaces intensive manual labor by automatically planting young rice seedlings into wet paddies. It places seedlings at precise, uniform depths and intervals, ensuring optimal crop spacing that maximizes field yields while significantly lowering manual labor costs.",
    "status": "Active"
  },
  {
    "id": "p-12",
    "name": "Lovol Harvester RG108 (Standard Combine)",
    "category": "Combine Harvester",
    "price": "Price on Request",
    "image": "/assets/products_staging/combine harvestor/LOVOL-RG108_Plus/WhatsApp Image 2026-07-09 at 11.33.11 AM.jpeg",
    "images": [
      "/assets/products_staging/combine harvestor/LOVOL-RG108_Plus/WhatsApp Image 2026-07-09 at 11.33.11 AM.jpeg",
      "/assets/products_staging/combine harvestor/LOVOL-RG108_Plus/WhatsApp Image 2026-07-09 at 11.33.13 AM.jpeg",
      "/assets/products_staging/combine harvestor/LOVOL-RG108_Plus/WhatsApp Image 2026-07-09 at 11.33.14 AM (1).jpeg",
      "/assets/products_staging/combine harvestor/LOVOL-RG108_Plus/WhatsApp Image 2026-07-09 at 11.33.14 AM.jpeg",
      "/assets/products_staging/combine harvestor/LOVOL-RG108_Plus/WhatsApp Image 2026-07-09 at 11.33.17 AM.jpeg",
      "/assets/products_staging/combine harvestor/LOVOL-RG108_Plus/WhatsApp Image 2026-07-09 at 11.33.18 AM.jpeg"
    ],
    "specs": [
      "Reliable Mechanical Drive",
      "High-Volume Grain Tank",
      "Optimized Cutting Width",
      "Tangential Flow Threshing Drum"
    ],
    "task": "Continuous harvesting of diverse grain crops including rice, wheat, and barley under varied climate conditions.",
    "description": "The Lovol RG108 is a robust combine harvester favored for its straightforward, reliable mechanical operation and excellent crop throughput. Its threshing mechanics cleanly separate grains from stalks, minimizing crop damage. The durable chassis and broad tires minimize soil compaction while keeping harvest operations smooth and highly efficient.",
    "status": "Active"
  },
  {
    "id": "p-13",
    "name": "Zoomlion Crawler Type Harvester ZL105",
    "category": "Combine Harvester",
    "price": "Price on Request",
    "image": "/assets/products_staging/combine harvestor/ZOOMLION/WhatsApp Image 2026-07-09 at 11.33.18 AM (1).jpeg",
    "images": [
      "/assets/products_staging/combine harvestor/ZOOMLION/WhatsApp Image 2026-07-09 at 11.33.18 AM (1).jpeg",
      "/assets/products_staging/combine harvestor/ZOOMLION/WhatsApp Image 2026-07-09 at 11.33.19 AM.jpeg",
      "/assets/products_staging/combine harvestor/ZOOMLION/WhatsApp Image 2026-07-09 at 11.33.22 AM.jpeg",
      "/assets/products_staging/combine harvestor/ZOOMLION/WhatsApp Image 2026-07-09 at 11.33.49 AM.jpeg"
    ],
    "specs": [
      "High-Traction Crawler Tracks",
      "High Ground Clearance",
      "High-Capacity Grain Tank",
      "Heavy-Duty Rubber Tracks",
      "Turbocharged Engine"
    ],
    "task": "Harvesting grain crops in waterlogged, muddy, or highly uneven and challenging wetland fields.",
    "description": "The Zoomlion ZL105 is built with heavy-duty crawler tracks specifically to operate where wheeled harvesters fail. It floats effortlessly over muddy soils and paddy environments, delivering exceptional stability and high traction. Its high-capacity harvesting drum processes dense wet crops cleanly, making it indispensable for intensive rice farming regions.",
    "status": "Active"
  },
  {
    "id": "p-14",
    "name": "Alvan Blanch Disc Harrow",
    "category": "Farm Implements",
    "price": "Price on Request",
    "image": "/assets/products_staging/implements/Alvan Blanch Disc Harrow/OffsetDiscPlough-DO6luG0F.jpeg",
    "images": [
      "/assets/products_staging/implements/Alvan Blanch Disc Harrow/OffsetDiscPlough-DO6luG0F.jpeg",
      "/assets/products_staging/implements/Alvan Blanch Disc Harrow/WhatsApp Image 2026-07-09 at 11.33.49 AM (1).jpeg",
      "/assets/products_staging/implements/Alvan Blanch Disc Harrow/WhatsApp Image 2026-07-09 at 11.34.41 AM.jpeg"
    ],
    "specs": [
      "Premium Alvan Blanch Steel Structure",
      "Multiple Heavy Discs",
      "Adjustable Working Angle",
      "Sealed Heavy-Duty Bearings"
    ],
    "task": "High-quality secondary tillage, clod breaking, seedbed leveling, and active weed eradication.",
    "description": "Manufactured by Alvan Blanch, this disc harrow is an exceptional tool for secondary cultivation. Following a primary plow, it pulverizes large dirt clods into a fine, flat tilth. It is highly adjustable to ensure full surface coverage, making it ideal for final seedbed preparation.",
    "status": "Active"
  },
  {
    "id": "p-15",
    "name": "Disc Ridger",
    "category": "Farm Implements",
    "price": "Price on Request",
    "image": "/assets/products_staging/implements/Disc Ridger/WhatsApp Image 2026-07-09 at 11.34.07 AM.jpeg",
    "images": [
      "/assets/products_staging/implements/Disc Ridger/WhatsApp Image 2026-07-09 at 11.34.07 AM.jpeg",
      "/assets/products_staging/implements/Disc Ridger/WhatsApp Image 2026-07-09 at 11.34.12 AM.jpeg",
      "/assets/products_staging/implements/Disc Ridger/WhatsApp Image 2026-07-09 at 11.34.41 AM (1).jpeg",
      "/assets/products_staging/implements/Disc Ridger/WhatsApp Image 2026-07-09 at 11.34.41 AM (2).jpeg"
    ],
    "specs": [
      "Adjustable Gang Angle",
      "Durable Steel Discs",
      "Heavy-Duty Frame",
      "Variable Ridge Width Settings"
    ],
    "task": "Creating uniform ridges and furrows for row crops, irrigation planning, and localized soil water management.",
    "description": "The Disc Ridger utilizes heavy rotating discs to gather loose soil into perfectly shaped ridges. It is highly adjustable, allowing operators to match row spacing requirements for crops such as potatoes, maize, and vegetables, while creating neat channels that optimize field drainage.",
    "status": "Active"
  },
  {
    "id": "p-16",
    "name": "Mould Board Plough",
    "category": "Farm Implements",
    "price": "Price on Request",
    "image": "/assets/products_staging/implements/Mould Board Plough/MouldBoardPlough-roKwaKOA.jpeg",
    "images": [
      "/assets/products_staging/implements/Mould Board Plough/MouldBoardPlough-roKwaKOA.jpeg",
      "/assets/products_staging/implements/Mould Board Plough/WhatsApp Image 2026-07-09 at 11.33.59 AM.jpeg",
      "/assets/products_staging/implements/Mould Board Plough/WhatsApp Image 2026-07-09 at 11.34.40 AM (1).jpeg",
      "/assets/products_staging/implements/Mould Board Plough/WhatsApp Image 2026-07-09 at 11.34.40 AM.jpeg"
    ],
    "specs": [
      "Classic Mould Board Share Design",
      "High-Clearance Frame",
      "Deep Tillage Shares",
      "Reversible or Fixed Configurations"
    ],
    "task": "Traditional deep tillage, complete soil inversion, burial of organic crop residue, and weed seed suppression.",
    "description": "The Mould Board Plough is the definitive tool for deep soil preparation. By cutting, lifting, and completely turning over the soil profile, it buries surface trash and weed seeds deep underground. This process enhances aeration, improves water infiltration, and establishes a clean, fertile seedbed.",
    "status": "Active"
  },
  {
    "id": "p-17",
    "name": "Mould Board Ridger",
    "category": "Farm Implements",
    "price": "Price on Request",
    "image": "/assets/products_staging/implements/Mould Board Ridger/MouldBoardRidger-CZahw9XL.jpeg",
    "images": [
      "/assets/products_staging/implements/Mould Board Ridger/MouldBoardRidger-CZahw9XL.jpeg"
    ],
    "specs": [
      "Dual Mould Board Wings",
      "Deep Penetration Point",
      "Adjustable Wing Span",
      "High-Strength Steel Frame"
    ],
    "task": "Forming deep, well-defined raised beds and clean furrows for crops requiring strict root drainage profiles.",
    "description": "The Mould Board Ridger uses symmetric wings to plow through soil, pushing equal amounts to both sides to form raised beds. It provides deep soil penetration, ensuring that the root zone of the crop remains loosely packed and highly aerated, which is ideal for root crop health.",
    "status": "Active"
  },
  {
    "id": "p-18",
    "name": "Offset Disc Plough",
    "category": "Farm Implements",
    "price": "Price on Request",
    "image": "/assets/products_staging/implements/Offset Disc Plough/OffsetDiscPlough-DO6luG0F.jpeg",
    "images": [
      "/assets/products_staging/implements/Offset Disc Plough/OffsetDiscPlough-DO6luG0F.jpeg"
    ],
    "specs": [
      "Offset Frame Design",
      "High-Carbon Steel Discs",
      "Adjustable Cutting Depth",
      "Heavy-Duty Scrapers"
    ],
    "task": "Primary tillage in hard, dry, and stony soils, breaking up hardpan layers and chopping weed root systems.",
    "description": "The Offset Disc Plough is designed to aggressively penetrate tough, uncultivated soils where traditional shares might break. The heavy, sharp discs spin freely to slash through crop residue and blend it into the topsoil. It features highly adjustable angles to accommodate changing ground hardness levels.",
    "status": "Active"
  },
  {
    "id": "p-19",
    "name": "Shrubmaster Rotary Slasher",
    "category": "Farm Implements",
    "price": "Price on Request",
    "image": "/assets/products_staging/implements/Shrubmaster Rotary Slasher/ShrubmasterRotarySlasher-bgnnic4k.jpeg",
    "images": [
      "/assets/products_staging/implements/Shrubmaster Rotary Slasher/ShrubmasterRotarySlasher-bgnnic4k.jpeg",
      "/assets/products_staging/implements/Shrubmaster Rotary Slasher/WhatsApp Image 2026-07-09 at 11.33.54 AM.jpeg",
      "/assets/products_staging/implements/Shrubmaster Rotary Slasher/WhatsApp Image 2026-07-09 at 11.34.14 AM.jpeg",
      "/assets/products_staging/implements/Shrubmaster Rotary Slasher/WhatsApp Image 2026-07-09 at 11.34.15 AM.jpeg",
      "/assets/products_staging/implements/Shrubmaster Rotary Slasher/WhatsApp Image 2026-07-09 at 11.34.20 AM.jpeg",
      "/assets/products_staging/implements/Shrubmaster Rotary Slasher/WhatsApp Image 2026-07-09 at 11.34.22 AM.jpeg"
    ],
    "specs": [
      "Heavy-Duty Rotary Cutting Blades",
      "Reinforced Steel Deck",
      "Adjustable Skid Shoes",
      "Friction Clutch Protection"
    ],
    "task": "Heavy-duty clearing of tough field bushes, tall shrubs, overgrown vegetation, and pasture maintenance.",
    "description": "The Shrubmaster Rotary Slasher is engineered to clear wild, untamed fields and scrublands. Driven by the tractor's PTO, its heavy-duty blades rotate at high speeds to shred through thick brushwood and small saplings. It features built-in slip-clutch protection to safeguard the tractor's internal drive from sudden subterranean impacts.",
    "status": "Active"
  },
  {
    "id": "p-20",
    "name": "Tipping Trailer",
    "category": "Farm Implements",
    "price": "Price on Request",
    "image": "/assets/products_staging/implements/Tipping Trailer/TippingTrailer-C2RhSgR1.jpeg",
    "images": [
      "/assets/products_staging/implements/Tipping Trailer/TippingTrailer-C2RhSgR1.jpeg"
    ],
    "specs": [
      "Heavy-Duty Steel Construction",
      "Hydraulic Tipping Mechanism",
      "Various Payload Capacities",
      "Multi-Leaf Spring Suspension"
    ],
    "task": "Highly efficient transport and automated unloading of harvested crops, fertilizer bags, and loose farm materials.",
    "description": "This heavy-duty tipping trailer is built to handle the rigorous hauling needs of a busy farm. Operated directly by the tractor\u2019s hydraulic system, its smooth tipping mechanism allows for rapid, effortless unloading of bulk materials. The reinforced steel box structure ensures long-term resistance to denting and heavy impacts.",
    "status": "Active"
  },
  {
    "id": "p-21",
    "name": "Lovol H754 H-Series 4WD Utility Tractor",
    "category": "Tractors",
    "price": "Price on Request",
    "image": "/assets/products_staging/tractor/LOVOL/WhatsApp Image 2026-07-09 at 11.33.23 AM (1).jpeg",
    "images": [
      "/assets/products_staging/tractor/LOVOL/WhatsApp Image 2026-07-09 at 11.33.23 AM (1).jpeg",
      "/assets/products_staging/tractor/LOVOL/WhatsApp Image 2026-07-09 at 11.33.27 AM.jpeg",
      "/assets/products_staging/tractor/LOVOL/WhatsApp Image 2026-07-09 at 11.33.28 AM.jpeg",
      "/assets/products_staging/tractor/LOVOL/WhatsApp Image 2026-07-09 at 11.33.29 AM.jpeg",
      "/assets/products_staging/tractor/LOVOL/WhatsApp Image 2026-07-09 at 11.33.34 AM (1).jpeg",
      "/assets/products_staging/tractor/LOVOL/WhatsApp Image 2026-07-09 at 11.33.34 AM.jpeg"
    ],
    "specs": [
      "75 HP Engine",
      "Xinchai 4-Cylinder Water-Cooled Diesel Engine",
      "12 Forward + 12 Reverse Gears with Mechanical Synchronizer Shuttle Shift",
      "Heavy-Duty 4WD",
      "Category II Three-Point Hitch with dual auxiliary cylinders",
      "and Independent Dual-Speed PTO (540/1000 RPM)"
    ],
    "task": "Highly efficient dry and paddy field operations, deep plowing, rotary tillage, farm hauling, and heavy-duty front/rear implement attachments.",
    "description": "The Lovol H754 H-Series is an exceptionally engineered, multifunctional utility tractor independently developed to deliver unmatched power and adaptability for small to medium-sized farms. Powered by a robust Xinchai 4-cylinder engine, it satisfies modern emission regulations while providing an impressive torque reserve coefficient of over 30% and a heavy traction force reaching up to 17 KN. Built to survive challenging environments, it features a specialized shared-oil chassis integrated with a chassis oil radiator that continuously optimizes thermal control and overall operational efficiency during deep tillage or long hauling tasks.",
    "status": "Active"
  },
  {
    "id": "p-22",
    "name": "Massey Ferguson MF-375 Utility Tractor",
    "category": "Tractors",
    "price": "Price on Request",
    "image": "/assets/products_staging/tractor/MF/WhatsApp Image 2026-07-09 at 11.33.35 AM (1).jpeg",
    "images": [
      "/assets/products_staging/tractor/MF/WhatsApp Image 2026-07-09 at 11.33.35 AM (1).jpeg",
      "/assets/products_staging/tractor/MF/WhatsApp Image 2026-07-09 at 11.33.35 AM.jpeg",
      "/assets/products_staging/tractor/MF/WhatsApp Image 2026-07-09 at 11.33.43 AM.jpeg",
      "/assets/products_staging/tractor/MF/WhatsApp Image 2026-07-09 at 11.33.44 AM.jpeg"
    ],
    "specs": [
      "75 HP Engine",
      "4.41L 4-Cylinder Perkins Diesel Engine",
      "Sliding Spur Transmission (8 Forward / 2 Reverse Gears)",
      "2",
      "145 kg Maximum Lifting Capacity",
      "Hydrostatic Power Steering"
    ],
    "task": "High-efficiency primary cultivation, heavy-duty plowing, medium-to-large scale crop hauling, and reliable multi-implement farm management.",
    "description": "The Massey Ferguson MF-375 is a legendary, durable, and highly versatile utility tractor engineered specifically to tackle demanding agricultural tasks under challenging field conditions. Powered by a robust and fuel-efficient 4-cylinder Perkins engine, it delivers high pulling power and maximum torque at low RPMs, minimizing engine wear while maximizing field productivity. Its aerodynamic body profile is paired with an upgraded oil cooler system to ensure steady engine performance without overheating during prolonged operations in hot climates.  The tractor's heavy-duty transmission and independent 540 RPM PTO allow it to seamlessly operate deep-tillage implements, large planters, and harvesting tools. For operator safety and comfort, it features an oil-immersed multi-disc braking system for responsive stopping power, responsive hydrostatic steering to lower steering effort, and a spring-suspension seat designed to absorb vibrations during long working days in the field.",
    "status": "Active"
  },
  {
    "id": "p-23",
    "name": "Zoomlion RC Series 1104 - 4WD Heavy-Duty Tractor",
    "category": "Tractors",
    "price": "Price on Request",
    "image": "/assets/products_staging/tractor/Zoomlion RC SERIES 1104 - 4WD /WhatsApp Image 2026-07-09 at 11.32.55 AM.jpeg",
    "images": [
      "/assets/products_staging/tractor/Zoomlion RC SERIES 1104 - 4WD /WhatsApp Image 2026-07-09 at 11.32.55 AM.jpeg",
      "/assets/products_staging/tractor/Zoomlion RC SERIES 1104 - 4WD /WhatsApp Image 2026-07-09 at 11.32.56 AM.jpeg",
      "/assets/products_staging/tractor/Zoomlion RC SERIES 1104 - 4WD /WhatsApp Image 2026-07-09 at 11.33.01 AM.jpeg",
      "/assets/products_staging/tractor/Zoomlion RC SERIES 1104 - 4WD /WhatsApp Image 2026-07-09 at 11.33.46 AM (1).jpeg"
    ],
    "specs": [
      "110 HP Engine",
      "4WD",
      "16 Forward Gears",
      "High-Pressure Common Rail Diesel Engine",
      "High Lifting Capacity Category II Hitch"
    ],
    "task": "Intensive large-scale farming, deep tillage, heavy secondary cultivation, and continuous heavy machinery pulling.",
    "description": "The Zoomlion RC Series 1104 is a heavy-duty agricultural tractor designed to dominate demanding farm tasks. Featuring 16 forward speeds and an advanced 110 HP engine, it delivers high torque to pull wider implements and deep-subsoilers effortlessly. The advanced cabin ergonomics and technological control loops allow operators to remain productive during extended seasonal windows.",
    "status": "Active"
  },
  {
    "id": "p-24",
    "name": "Zoomlion RK Series 504 - 4WD Compact Tractor",
    "category": "Tractors",
    "price": "Price on Request",
    "image": "/assets/products_staging/tractor/Zoomlion RK SERIES 504K - 4WD/WhatsApp Image 2026-07-09 at 11.32.55 AM.jpeg",
    "images": [
      "/assets/products_staging/tractor/Zoomlion RK SERIES 504K - 4WD/WhatsApp Image 2026-07-09 at 11.32.55 AM.jpeg",
      "/assets/products_staging/tractor/Zoomlion RK SERIES 504K - 4WD/WhatsApp Image 2026-07-09 at 11.32.58 AM.jpeg",
      "/assets/products_staging/tractor/Zoomlion RK SERIES 504K - 4WD/WhatsApp Image 2026-07-09 at 11.33.01 AM.jpeg",
      "/assets/products_staging/tractor/Zoomlion RK SERIES 504K - 4WD/WhatsApp Image 2026-07-09 at 11.33.46 AM (1).jpeg"
    ],
    "specs": [
      "50 HP Engine",
      "4WD",
      "Compact Frame Design",
      "Shuttle Shift Transmission",
      "Multi-Way Hydraulic Valve System"
    ],
    "task": "Perfect for small-to-medium farms, orchards, vineyard management, and tight-space maneuverability.",
    "description": "The Zoomlion RK Series 504 delivers efficient performance in a compact, highly maneuverable 4WD frame. It is specially built to navigate narrow rows and smaller plots without sacrificing the hydraulic and pulling power required for plowing and planting. Its high fuel efficiency and straightforward operation make it a staple tool for diverse small-scale farmers.",
    "status": "Active"
  },
  {
    "id": "p-25",
    "name": "Zoomlion RK Series 754 - 4WD Tractor",
    "category": "Tractors",
    "price": "Price on Request",
    "image": "/assets/products_staging/tractor/Zoomlion RK SERIES 754 - 4WD/WhatsApp Image 2026-07-09 at 11.33.02 AM (1).jpeg",
    "images": [
      "/assets/products_staging/tractor/Zoomlion RK SERIES 754 - 4WD/WhatsApp Image 2026-07-09 at 11.33.02 AM (1).jpeg",
      "/assets/products_staging/tractor/Zoomlion RK SERIES 754 - 4WD/WhatsApp Image 2026-07-09 at 11.33.02 AM.jpeg",
      "/assets/products_staging/tractor/Zoomlion RK SERIES 754 - 4WD/WhatsApp Image 2026-07-09 at 11.33.23 AM.jpeg",
      "/assets/products_staging/tractor/Zoomlion RK SERIES 754 - 4WD/WhatsApp Image 2026-07-09 at 11.33.45 AM.jpeg",
      "/assets/products_staging/tractor/Zoomlion RK SERIES 754 - 4WD/WhatsApp Image 2026-07-09 at 11.33.46 AM.jpeg"
    ],
    "specs": [
      "75 HP Engine",
      "4WD",
      "12 Forward Gears",
      "Dual-Stage Clutch",
      "Ergonomic Operator Platform"
    ],
    "task": "Powerful general agriculture, row-crop cultivation, medium-scale seeding, and intensive field spraying.",
    "description": "The Zoomlion RK Series 754 provides outstanding versatility and power for modern farming conditions. Featuring a robust 12-speed transmission and dual-stage clutch mechanics, it gives the operator precise control over ground speeds and PTO speeds. Its aggressive 4WD axle enables steady operation through heavy clay and undulating topographies.",
    "status": "Active"
  },
  {
    "id": "p-26",
    "name": "Zoomlion RK Series 904 - 4WD Heavy-Duty Tractor",
    "category": "Tractors",
    "price": "Price on Request",
    "image": "/assets/products_staging/tractor/Zoomlion RK SERIES 904 - 4WD/WhatsApp Image 2026-07-09 at 11.32.55 AM.jpeg",
    "images": [
      "/assets/products_staging/tractor/Zoomlion RK SERIES 904 - 4WD/WhatsApp Image 2026-07-09 at 11.32.55 AM.jpeg",
      "/assets/products_staging/tractor/Zoomlion RK SERIES 904 - 4WD/WhatsApp Image 2026-07-09 at 11.33.01 AM.jpeg",
      "/assets/products_staging/tractor/Zoomlion RK SERIES 904 - 4WD/WhatsApp Image 2026-07-09 at 11.33.22 AM (1).jpeg",
      "/assets/products_staging/tractor/Zoomlion RK SERIES 904 - 4WD/WhatsApp Image 2026-07-09 at 11.33.46 AM (1).jpeg"
    ],
    "specs": [
      "90 HP Engine",
      "4WD",
      "16 Forward Gears",
      "High-Pressure Common Rail Diesel Engine",
      "High Lifting Capacity Category II Hitch"
    ],
    "task": "Intensive large-scale farming, deep tillage, heavy secondary cultivation, and continuous heavy machinery pulling.",
    "description": "The Zoomlion RK Series 904 is a heavy-duty agricultural tractor designed to dominate demanding farm tasks. Featuring 16 forward speeds and an advanced 90 HP engine, it delivers high torque to pull wider implements and deep-subsoilers effortlessly. The advanced cabin ergonomics and technological control loops allow operators to remain productive during extended seasonal windows.",
    "status": "Active"
  }
];

  homeRoot.appendChild(statsSec);
  homeRoot.appendChild(ctaSec);
  homeRoot.appendChild(aboutSec);
  homeRoot.appendChild(teamSec);

  container.appendChild(renderNavbar());
  container.appendChild(homeRoot);
  container.appendChild(renderFooter());

  let productsList = [];
  const sortProducts = (list) => {
    return [...list].sort((a, b) => {
      const isTractorA = a.category === 'Tractors' || a.name.toLowerCase().includes('tractor');
      const isRealHarvesterA = a.category === 'Combine Harvester';
      const isOtherHarvesterA = !isRealHarvesterA && (a.category?.toLowerCase().includes('harvester') || a.category?.toLowerCase().includes('combine') || a.name.toLowerCase().includes('harvester') || a.name.toLowerCase().includes('combine'));
      const priorityA = isTractorA ? 3 : (isRealHarvesterA ? 2 : (isOtherHarvesterA ? 1 : 0));

      const isTractorB = b.category === 'Tractors' || b.name.toLowerCase().includes('tractor');
      const isRealHarvesterB = b.category === 'Combine Harvester';
      const isOtherHarvesterB = !isRealHarvesterB && (b.category?.toLowerCase().includes('harvester') || b.category?.toLowerCase().includes('combine') || b.name.toLowerCase().includes('harvester') || b.name.toLowerCase().includes('combine'));
      const priorityB = isTractorB ? 3 : (isRealHarvesterB ? 2 : (isOtherHarvesterB ? 1 : 0));

      return priorityB - priorityA;
    });
  };

  const loadFleet = async () => {
    try {
      const res = await fetch('/api/products');
      const dbProducts = await res.json();
      
      const dbNames = new Set(dbProducts.map(p => p.name.toLowerCase()));
      const uniqueFallbacks = fallbackProducts.filter(p => !dbNames.has(p.name.toLowerCase()));
      
      productsList = sortProducts([...dbProducts, ...uniqueFallbacks]);
      renderFleet('All');
    } catch (err) {
      console.error('Error fetching fleet, using fallbacks:', err);
      productsList = sortProducts([...fallbackProducts]);
      renderFleet('All');
    }
  };

  const renderFleet = (cat) => {
    const grid = fleetSec.querySelector('#fleet-grid-container');
    let filtered;
    if (cat === 'All') {
      const tractors = productsList.filter(p => p.category === 'Tractors' || p.name.toLowerCase().includes('tractor')).slice(0, 3);
      const combines = productsList.filter(p => p.category === 'Combine Harvester' || p.name.toLowerCase().includes('harvester') || p.name.toLowerCase().includes('combine')).slice(0, 3);
      const selected = [...tractors, ...combines];
      
      if (selected.length < 6) {
        const selectedIds = new Set(selected.map(p => p.id));
        const others = productsList.filter(p => !selectedIds.has(p.id)).slice(0, 6 - selected.length);
        filtered = [...selected, ...others];
      } else {
        filtered = selected;
      }
    } else {
      filtered = productsList.filter(p => p.category === cat).slice(0, 6);
    }
      
    if (filtered.length > 0) {
      grid.innerHTML = '';
      filtered.forEach(p => grid.appendChild(renderProductCard(p)));
      if (window.initAnimations) {
        window.initAnimations();
      }
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
