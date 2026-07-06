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
      background: radial-gradient(ellipse, rgba(52, 211, 153, 0.45) 0%, rgba(2, 44, 34, 0) 70%);
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
      background: rgba(2, 44, 34, 0.7);
      padding: 8px 20px;
      border-radius: 100px;
      border: 1px solid rgba(52, 211, 153, 0.25);
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
      color: #34d399;
      text-shadow: 0 0 8px rgba(52, 211, 153, 0.6);
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
      background: radial-gradient(circle at center, #023c2d 0%, #011c15 100%);
      color: #ffffff;
      padding: 100px 0;
      position: relative;
      overflow: hidden;
      border-top: 1px solid rgba(16, 185, 129, 0.15);
      border-bottom: 1px solid rgba(16, 185, 129, 0.15);
    }
    
    .sec-stats::before {
      content: '';
      position: absolute;
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%);
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
      background: radial-gradient(circle, rgba(52, 211, 153, 0.05) 0%, transparent 70%);
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
      border: 1px solid rgba(16, 185, 129, 0.12);
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
      background: linear-gradient(180deg, rgba(16, 185, 129, 0.04) 0%, transparent 100%);
      opacity: 0;
      transition: opacity 0.4s ease;
      pointer-events: none;
    }

    .stats-card:hover {
      transform: translateY(-8px);
      border-color: rgba(16, 185, 129, 0.35);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25), 0 0 25px rgba(16, 185, 129, 0.08);
      background: rgba(255, 255, 255, 0.03);
    }

    .stats-card:hover::before {
      opacity: 1;
    }

    .stats-card-icon {
      width: 52px;
      height: 52px;
      border-radius: 16px;
      background: rgba(16, 185, 129, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #34d399;
      margin-bottom: 22px;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .stats-card:hover .stats-card-icon {
      background: #10b981;
      color: #ffffff;
      transform: scale(1.1) rotate(6deg);
      box-shadow: 0 0 15px rgba(16, 185, 129, 0.4);
    }
    
    .stat-num-val {
      font-size: 3.5rem;
      font-weight: 900;
      background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
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
      color: #a7f3d0;
      text-align: center;
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
  
  // Dynamic Background Images fading behind the green gradient overlay
  const bgImages = [
    '/assets/hero.png',
    '/assets/gallery_farmers.png',
    '/assets/portfolio_aerial.png'
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
  }, 5000);

  // Slideshow Logic for the 11 Lovol and Massey Ferguson Machinery Slides
  const machinerySlides = [
    { id: 'tractor-side', src: '/assets/lovol_tractor_754h.png', label: 'TR-SIDE' },
    { id: 'tractor-front', src: '/assets/lovol_tractor_754h_front.png', label: 'TR-FRONT' },
    { id: 'tractor-top', src: '/assets/lovol_tractor_754h_top.png', label: 'TR-TOP' },
    { id: 'harvester-side', src: '/assets/lovol_harvester_rg109plus.png', label: 'HV-SIDE' },
    { id: 'harvester-front', src: '/assets/lovol_harvester_rg109plus_front.png', label: 'HV-FRONT' },
    { id: 'harvester-top', src: '/assets/lovol_harvester_rg109plus_top.png', label: 'HV-TOP' },
    { id: 'fleet-lovol-754h', src: '/assets/fleet_lovol_754h.png', label: 'LOVOL 754H' },
    { id: 'fleet-mf-375', src: '/assets/fleet_mf_375.png', label: 'MF 375' },
    { id: 'fleet-lovol-rg109plus', src: '/assets/fleet_lovol_rg109plus.png', label: 'RG109+' },
    { id: 'fleet-lovol-af108', src: '/assets/fleet_lovol_af108.png', label: 'AF108' }
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
    // Process transparency on all 11 slides
    machinerySlides.forEach(slide => {
      const img = heroSec.querySelector(`#${slide.id}`);
      if (img) makeImageTransparent(img, slide.src);
    });

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
    <div class="corp-hero-overlay" style="background: linear-gradient(135deg, rgba(2, 44, 34, 0.75) 0%, rgba(2, 44, 34, 0.65) 100%);"></div>
    <div class="container hero-grid">
      <div class="hero-content-block">
        <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(16, 185, 129, 0.15); padding: 8px 16px; border-radius: 100px; border: 1px solid rgba(16, 185, 129, 0.2); margin-bottom: 25px;">
          <span style="width: 8px; height: 8px; background: #34d399; border-radius: 50%; box-shadow: 0 0 10px #34d399;"></span>
          <span style="font-size: 0.75rem; font-weight: 800; letter-spacing: 1px; color: #34d399; text-transform: uppercase;">Heavy-Duty Mechanization</span>
        </div>
        <h1 class="hero-title-main">Engineering the Future of <span>Mechanized Farming</span></h1>
        <p class="hero-desc">
          We equip corporate agribusinesses and smallholder farms with robust machinery, high-capacity implements, and comprehensive after-sales services to modernize agricultural production.
        </p>
        <div style="display: flex; flex-wrap: wrap; gap: 15px;">
          <a href="/products" class="btn-main-green">
            Explore Machinery
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
          <a href="/contact" class="btn-main-outline">Get a Quote</a>
        </div>
      </div>
      
      <div class="hero-visual" style="cursor: grab;">
        <svg class="floating-gear-bg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="top:-50px; right:-20px; width:180px; height:180px;">
          <path d="M50 25C36.19 25 25 36.19 25 50C25 63.81 36.19 75 50 75C63.81 75 75 63.81 75 50C75 36.19 63.81 25 50 25ZM50 67C40.61 67 33 59.39 33 50C33 40.61 40.61 33 50 33C59.39 33 67 40.61 67 50C67 59.39 59.39 67 50 67Z" fill="#34d399"/>
        </svg>
        <div class="machinery-shadow"></div>
        
        <!-- Lovol Tractor Views (Original 3D) -->
        <img id="tractor-side" class="visual-slide active" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="Lovol Tractor 754-H Side View">
        <img id="tractor-front" class="visual-slide" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="Lovol Tractor 754-H Front View">
        <img id="tractor-top" class="visual-slide" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="Lovol Tractor 754-H Top View">
        
        <!-- Lovol Harvester Views (Original 3D) -->
        <img id="harvester-side" class="visual-slide" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="Lovol Harvester RG109Plus Side View">
        <img id="harvester-front" class="visual-slide" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="Lovol Harvester RG109Plus Front View">
        <img id="harvester-top" class="visual-slide" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="Lovol Harvester RG109Plus Top View">

        <!-- Uploaded Vehicles (New 5) -->
        <img id="fleet-lovol-754h" class="visual-slide" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="Lovol 754-H Blue Tractor">
        <img id="fleet-mf-375" class="visual-slide" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="Massey Ferguson 375 Tractor">
        <img id="fleet-lovol-rg109plus" class="visual-slide" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="Lovol RG109Plus Harvester">
        <img id="fleet-lovol-af108" class="visual-slide" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="Lovol AF108 Harvester">

        <div class="machinery-view-selector" style="display: flex; flex-wrap: wrap; gap: 6px; justify-content: center; max-width: 95%; margin: 15px auto 0;">
          <span class="view-dot active" style="font-size: 0.62rem; padding: 4px 8px; margin: 1px;">TR-SIDE</span>
          <span class="view-dot" style="font-size: 0.62rem; padding: 4px 8px; margin: 1px;">TR-FRONT</span>
          <span class="view-dot" style="font-size: 0.62rem; padding: 4px 8px; margin: 1px;">TR-TOP</span>
          <span class="view-dot" style="font-size: 0.62rem; padding: 4px 8px; margin: 1px;">HV-SIDE</span>
          <span class="view-dot" style="font-size: 0.62rem; padding: 4px 8px; margin: 1px;">HV-FRONT</span>
          <span class="view-dot" style="font-size: 0.62rem; padding: 4px 8px; margin: 1px;">HV-TOP</span>
          <span class="view-dot" style="font-size: 0.62rem; padding: 4px 8px; margin: 1px;">LOVOL-754H</span>
          <span class="view-dot" style="font-size: 0.62rem; padding: 4px 8px; margin: 1px;">MF-375</span>
          <span class="view-dot" style="font-size: 0.62rem; padding: 4px 8px; margin: 1px;">RG109+</span>
          <span class="view-dot" style="font-size: 0.62rem; padding: 4px 8px; margin: 1px;">AF108</span>
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

      <!-- Partner Brands Section -->
      <div class="reveal" style="margin-top: 90px; text-align: center; animation-delay: 0.2s;">
        <h5 style="color: #059669; font-size: 0.85rem; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 15px;">STRATEGIC PARTNERSHIPS</h5>
        <h2 style="font-size: clamp(2rem, 3.5vw, 2.6rem); font-weight: 850; color: #0f172a; letter-spacing: -1px; margin-bottom: 25px;">Our Trusted Partners & Brands</h2>
        
        <p style="color: #475569; font-size: 1.1rem; max-width: 800px; margin: 0 auto 50px; line-height: 1.8;">
          Sankara Nigeria Limited is proud to collaborate with global leaders in agricultural machinery and industrial power. As authorized distributors and engineering partners, we deliver genuine products, specialized maintenance support, and custom-fit parts supply chains across the region.
        </p>

        <div class="partner-logos-grid" style="display: flex; justify-content: center; align-items: center; gap: 70px; flex-wrap: wrap; margin-bottom: 30px; padding: 40px 20px; background: rgba(248, 250, 252, 0.6); border: 1px solid rgba(226, 232, 240, 0.8); border-radius: 24px; backdrop-filter: blur(10px);">
          <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; min-width: 140px;">
            <img src="/assets/brand_lovol.png" alt="Lovol" style="height: 60px; object-fit: contain; transition: transform 0.3s; cursor: pointer;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
            <span style="font-size: 0.75rem; font-weight: 700; color: #64748b; letter-spacing: 1px; text-transform: uppercase;">Official Distributor</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; min-width: 140px;">
            <img src="/assets/brand_zoomlion.png" alt="Zoomlion" style="height: 60px; object-fit: contain; transition: transform 0.3s; cursor: pointer;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
            <span style="font-size: 0.75rem; font-weight: 700; color: #64748b; letter-spacing: 1px; text-transform: uppercase;">Machinery Partner</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; min-width: 140px;">
            <img src="/assets/brand_senci.png" alt="Senci" style="height: 60px; object-fit: contain; transition: transform 0.3s; cursor: pointer;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
            <span style="font-size: 0.75rem; font-weight: 700; color: #64748b; letter-spacing: 1px; text-transform: uppercase;">Power Systems</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; min-width: 140px;">
            <img src="/assets/brand_massey.png" alt="Massey Ferguson" style="height: 70px; object-fit: contain; transition: transform 0.3s; cursor: pointer;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
            <span style="font-size: 0.75rem; font-weight: 700; color: #64748b; letter-spacing: 1px; text-transform: uppercase;">Tractor Sourcing</span>
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
        <span style="font-size: 0.85rem; font-weight: 800; color: #059669; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px; display: block;">OUR LEGACY</span>
        <h2 style="font-size: clamp(2.2rem, 4vw, 3.2rem); font-weight: 850; color: #0f172a; letter-spacing: -1.5px; line-height: 1.1; margin-bottom: 30px;">Powering Nigeria's <br><span style="color: #059669;">Modern Farming</span></h2>
        
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
            <h4 style="font-size: 2.2rem; font-weight: 900; color: #059669; margin-bottom: 5px;">1200+</h4>
            <span style="font-size: 0.85rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">Tractors Delivered</span>
          </div>
        </div>
      </div>

      <!-- Right Column: Mission & Vision Cards Stack -->
      <div style="display: flex; flex-direction: column; gap: 30px;">
        
        <!-- Mission Card -->
        <div class="reveal premium-glass-card" style="padding: 35px; border-radius: 24px; background: #ffffff; border: 1px solid #e2e8f0; animation-delay: 0.2s; transition: all 0.3s; box-shadow: 0 4px 20px rgba(0,0,0,0.02);" onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='#059669';" onmouseout="this.style.transform='none'; this.style.borderColor='#e2e8f0';">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; background: rgba(5, 150, 105, 0.1); color: #059669; border-radius: 12px; margin-bottom: 20px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
          </div>
          <h3 style="font-size: 1.3rem; font-weight: 850; color: #0f172a; margin-bottom: 12px;">Our Mission</h3>
          <p style="color: #475569; font-size: 0.98rem; line-height: 1.6; margin: 0;">
            To empower Nigerian farmers with world-class agricultural machinery that enhances productivity, reduces labor costs, and drives sustainable agricultural growth across the nation.
          </p>
        </div>

        <!-- Vision Card -->
        <div class="reveal premium-glass-card" style="padding: 35px; border-radius: 24px; background: #ffffff; border: 1px solid #e2e8f0; animation-delay: 0.3s; transition: all 0.3s; box-shadow: 0 4px 20px rgba(0,0,0,0.02);" onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='#059669';" onmouseout="this.style.transform='none'; this.style.borderColor='#e2e8f0';">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; background: rgba(5, 150, 105, 0.1); color: #059669; border-radius: 12px; margin-bottom: 20px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
          </div>
          <h3 style="font-size: 1.3rem; font-weight: 850; color: #0f172a; margin-bottom: 12px;">Our Vision</h3>
          <p style="color: #475569; font-size: 0.98rem; line-height: 1.6; margin: 0;">
            Driven by passion and purpose, our vision is to become the most recognized and trusted agricultural machinery partner across West Africa; championing modern farming, strengthening partnerships, and delivering innovations that transform communities and protect the environment.
          </p>
        </div>

        <!-- Values Card -->
        <div class="reveal premium-glass-card" style="padding: 35px; border-radius: 24px; background: #ffffff; border: 1px solid #e2e8f0; animation-delay: 0.4s; transition: all 0.3s; box-shadow: 0 4px 20px rgba(0,0,0,0.02);" onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='#059669';" onmouseout="this.style.transform='none'; this.style.borderColor='#e2e8f0';">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; background: rgba(5, 150, 105, 0.1); color: #059669; border-radius: 12px; margin-bottom: 20px;">
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
        <span style="font-size: 0.85rem; font-weight: 800; color: #059669; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px; display: block;">UNCOMPROMISING SERVICE</span>
        <h2 style="font-size: clamp(2rem, 3.5vw, 2.8rem); font-weight: 850; color: #0f172a; letter-spacing: -1px; margin-bottom: 20px;">Why Choose Us</h2>
        <p style="color: #475569; font-size: 1.1rem; max-width: 700px; margin: 0 auto; line-height: 1.7;">
          We go beyond selling machinery. We provide comprehensive solutions, unwavering support, and genuine commitment to your agricultural success.
        </p>
      </div>

      <div class="about-why-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 24px;">
        <!-- Card 1: Support -->
        <div class="reveal premium-glass-card" style="padding: 30px; border-radius: 20px; background: #ffffff; border: 1px solid #e2e8f0; transition: all 0.3s;" onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='#059669';" onmouseout="this.style.transform='none'; this.style.borderColor='#e2e8f0';">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 44px; height: 44px; background: rgba(5, 150, 105, 0.1); color: #059669; border-radius: 10px; margin-bottom: 20px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </div>
          <h4 style="font-size: 1.1rem; font-weight: 800; color: #0f172a; margin-bottom: 12px;">24/7 Support</h4>
          <p style="color: #475569; font-size: 0.92rem; line-height: 1.5; margin: 0;">
            Round-the-clock assistance for all your queries, technical support, and emergency services. We're always here when you need us.
          </p>
        </div>

        <!-- Card 2: OEM Parts -->
        <div class="reveal premium-glass-card" style="padding: 30px; border-radius: 20px; background: #ffffff; border: 1px solid #e2e8f0; transition: all 0.3s; animation-delay: 0.1s;" onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='#059669';" onmouseout="this.style.transform='none'; this.style.borderColor='#e2e8f0';">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 44px; height: 44px; background: rgba(5, 150, 105, 0.1); color: #059669; border-radius: 10px; margin-bottom: 20px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
          </div>
          <h4 style="font-size: 1.1rem; font-weight: 800; color: #0f172a; margin-bottom: 12px;">Genuine Spare Parts</h4>
          <p style="color: #475569; font-size: 0.92rem; line-height: 1.5; margin: 0;">
            100% authentic OEM parts ensuring optimal performance, longevity, and warranty compliance for all your machinery needs.
          </p>
        </div>

        <!-- Card 3: Delivery -->
        <div class="reveal premium-glass-card" style="padding: 30px; border-radius: 20px; background: #ffffff; border: 1px solid #e2e8f0; transition: all 0.3s; animation-delay: 0.2s;" onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='#059669';" onmouseout="this.style.transform='none'; this.style.borderColor='#e2e8f0';">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 44px; height: 44px; background: rgba(5, 150, 105, 0.1); color: #059669; border-radius: 10px; margin-bottom: 20px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
          </div>
          <h4 style="font-size: 1.1rem; font-weight: 800; color: #0f172a; margin-bottom: 12px;">Nationwide Delivery</h4>
          <p style="color: #475569; font-size: 0.92rem; line-height: 1.5; margin: 0;">
            Reliable delivery services covering all 36 states of Nigeria. Your equipment reaches you safely and on time, anywhere in the country.
          </p>
        </div>

        <!-- Card 4: Experts -->
        <div class="reveal premium-glass-card" style="padding: 30px; border-radius: 20px; background: #ffffff; border: 1px solid #e2e8f0; transition: all 0.3s; animation-delay: 0.3s;" onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='#059669';" onmouseout="this.style.transform='none'; this.style.borderColor='#e2e8f0';">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 44px; height: 44px; background: rgba(5, 150, 105, 0.1); color: #059669; border-radius: 10px; margin-bottom: 20px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <h4 style="font-size: 1.1rem; font-weight: 800; color: #0f172a; margin-bottom: 12px;">Trained Experts</h4>
          <p style="color: #475569; font-size: 0.92rem; line-height: 1.5; margin: 0;">
            Certified technicians with extensive training and experience. Expert maintenance, repairs, and consultation services you can trust.
          </p>
        </div>

        <!-- Card 5: Maintenance -->
        <div class="reveal premium-glass-card" style="padding: 30px; border-radius: 20px; background: #ffffff; border: 1px solid #e2e8f0; transition: all 0.3s; animation-delay: 0.4s;" onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='#059669';" onmouseout="this.style.transform='none'; this.style.borderColor='#e2e8f0';">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 44px; height: 44px; background: rgba(5, 150, 105, 0.1); color: #059669; border-radius: 10px; margin-bottom: 20px;">
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
        <span style="font-size: 0.85rem; font-weight: 800; color: #059669; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px; display: block;">B2B TRUST & AUTHORITY</span>
        <h2 style="font-size: clamp(2rem, 3.5vw, 2.8rem); font-weight: 850; color: #0f172a; letter-spacing: -1px; margin-bottom: 20px;">Why Manufacturers Choose Sankara</h2>
        <p style="color: #475569; font-size: 1.1rem; max-width: 700px; margin: 0 auto; line-height: 1.7;">
          Global heavy agricultural brands select Sankara Nigeria Limited to manage their market deployment due to our long-standing authority and reliable support.
        </p>
      </div>

      <div class="about-why-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px;">
        <!-- Fact 1 -->
        <div class="reveal" style="padding: 30px; border-left: 4px solid #059669; background: rgba(248, 250, 252, 0.5);">
          <h4 style="font-size: 1.15rem; font-weight: 850; color: #0f172a; margin-bottom: 10px;">Proven Track Record</h4>
          <p style="color: #475569; font-size: 0.95rem; line-height: 1.6; margin: 0;">
            Nearly 40 years of successful operations and customer satisfaction in the Nigerian agricultural market.
          </p>
        </div>

        <!-- Fact 2 -->
        <div class="reveal" style="padding: 30px; border-left: 4px solid #059669; background: rgba(248, 250, 252, 0.5); animation-delay: 0.1s;">
          <h4 style="font-size: 1.15rem; font-weight: 850; color: #0f172a; margin-bottom: 10px;">Extensive Network</h4>
          <p style="color: #475569; font-size: 0.95rem; line-height: 1.6; margin: 0;">
            Nationwide presence covering all 36 states with reliable delivery and service infrastructure.
          </p>
        </div>

        <!-- Fact 3 -->
        <div class="reveal" style="padding: 30px; border-left: 4px solid #059669; background: rgba(248, 250, 252, 0.5); animation-delay: 0.2s;">
          <h4 style="font-size: 1.15rem; font-weight: 850; color: #0f172a; margin-bottom: 10px;">Technical Expertise</h4>
          <p style="color: #475569; font-size: 0.95rem; line-height: 1.6; margin: 0;">
            Certified technicians and comprehensive after-sales support capabilities.
          </p>
        </div>

        <!-- Fact 4 -->
        <div class="reveal" style="padding: 30px; border-left: 4px solid #059669; background: rgba(248, 250, 252, 0.5); animation-delay: 0.3s;">
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
        <span style="font-size: 0.85rem; font-weight: 800; color: #059669; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px; display: block;">OUR MILESTONES</span>
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
            <span style="font-size: 1.25rem; font-weight: 900; color: #059669;">1986</span>
            <h4 style="font-size: 1.2rem; font-weight: 850; color: #0f172a; margin: 5px 0 10px;">Company Founded</h4>
            <p style="color: #475569; font-size: 0.95rem; line-height: 1.6; margin: 0;">
              Sankara Nigeria Limited was established with a vision to transform Nigerian agriculture through reliable machinery.
            </p>
          </div>
          <!-- Center Dot -->
          <div style="position: absolute; left: 50%; transform: translateX(-50%); width: 20px; height: 20px; background: #059669; border: 4px solid #ffffff; border-radius: 50%; box-shadow: 0 0 0 4px rgba(5,150,105,0.15); z-index: 2;"></div>
          <div style="width: 44%;"></div>
        </div>

        <!-- Node 2: First Major Partnership -->
        <div class="reveal timeline-row" style="display: flex; justify-content: space-between; align-items: center; width: 100%; margin-bottom: 50px; position: relative;">
          <div style="width: 44%;"></div>
          <!-- Center Dot -->
          <div style="position: absolute; left: 50%; transform: translateX(-50%); width: 20px; height: 20px; background: #059669; border: 4px solid #ffffff; border-radius: 50%; box-shadow: 0 0 0 4px rgba(5,150,105,0.15); z-index: 2;"></div>
          <div class="timeline-pane" style="width: 44%; text-align: left; padding-left: 30px;">
            <span style="font-size: 1.25rem; font-weight: 900; color: #059669;">Dealer Certification</span>
            <h4 style="font-size: 1.2rem; font-weight: 850; color: #0f172a; margin: 5px 0 10px;">First Major Partnership</h4>
            <p style="color: #475569; font-size: 0.95rem; line-height: 1.6; margin: 0;">
              Became authorized dealer for Massey Ferguson, establishing our reputation for quality and reliability.
            </p>
          </div>
        </div>

        <!-- Node 3: Nationwide Expansion -->
        <div class="reveal timeline-row" style="display: flex; justify-content: space-between; align-items: center; width: 100%; margin-bottom: 50px; position: relative;">
          <div class="timeline-pane" style="width: 44%; text-align: right; padding-right: 30px;">
            <span style="font-size: 1.25rem; font-weight: 900; color: #059669;">Logistics Scale</span>
            <h4 style="font-size: 1.2rem; font-weight: 850; color: #0f172a; margin: 5px 0 10px;">Nationwide Expansion</h4>
            <p style="color: #475569; font-size: 0.95rem; line-height: 1.6; margin: 0;">
              Expanded operations to serve farmers across all 36 states of Nigeria with a comprehensive delivery network.
            </p>
          </div>
          <!-- Center Dot -->
          <div style="position: absolute; left: 50%; transform: translateX(-50%); width: 20px; height: 20px; background: #059669; border: 4px solid #ffffff; border-radius: 50%; box-shadow: 0 0 0 4px rgba(5,150,105,0.15); z-index: 2;"></div>
          <div style="width: 44%;"></div>
        </div>

        <!-- Node 4: 500+ Tractors -->
        <div class="reveal timeline-row" style="display: flex; justify-content: space-between; align-items: center; width: 100%; margin-bottom: 50px; position: relative;">
          <div style="width: 44%;"></div>
          <!-- Center Dot -->
          <div style="position: absolute; left: 50%; transform: translateX(-50%); width: 20px; height: 20px; background: #059669; border: 4px solid #ffffff; border-radius: 50%; box-shadow: 0 0 0 4px rgba(5,150,105,0.15); z-index: 2;"></div>
          <div class="timeline-pane" style="width: 44%; text-align: left; padding-left: 30px;">
            <span style="font-size: 1.25rem; font-weight: 900; color: #059669;">Sales Milestone</span>
            <h4 style="font-size: 1.2rem; font-weight: 850; color: #0f172a; margin: 5px 0 10px;">500+ Tractors Delivered</h4>
            <p style="color: #475569; font-size: 0.95rem; line-height: 1.6; margin: 0;">
              Reached milestone of delivering over 500 tractors, becoming one of Nigeria's leading agricultural machinery suppliers.
            </p>
          </div>
        </div>

        <!-- Node 5: Parts Network -->
        <div class="reveal timeline-row" style="display: flex; justify-content: space-between; align-items: center; width: 100%; margin-bottom: 50px; position: relative;">
          <div class="timeline-pane" style="width: 44%; text-align: right; padding-right: 30px;">
            <span style="font-size: 1.25rem; font-weight: 900; color: #059669;">Supply Chain</span>
            <h4 style="font-size: 1.2rem; font-weight: 850; color: #0f172a; margin: 5px 0 10px;">Genuine Parts Network</h4>
            <p style="color: #475569; font-size: 0.95rem; line-height: 1.6; margin: 0;">
              Established nationwide spare parts distribution network ensuring authentic OEM parts availability.
            </p>
          </div>
          <!-- Center Dot -->
          <div style="position: absolute; left: 50%; transform: translateX(-50%); width: 20px; height: 20px; background: #059669; border: 4px solid #ffffff; border-radius: 50%; box-shadow: 0 0 0 4px rgba(5,150,105,0.15); z-index: 2;"></div>
          <div style="width: 44%;"></div>
        </div>

        <!-- Node 6: 1200+ Tractors & 24/7 Support -->
        <div class="reveal timeline-row" style="display: flex; justify-content: space-between; align-items: center; width: 100%; position: relative;">
          <div style="width: 44%;"></div>
          <!-- Center Dot -->
          <div style="position: absolute; left: 50%; transform: translateX(-50%); width: 20px; height: 20px; background: #059669; border: 4px solid #ffffff; border-radius: 50%; box-shadow: 0 0 0 4px rgba(5,150,105,0.15); z-index: 2;"></div>
          <div class="timeline-pane" style="width: 44%; text-align: left; padding-left: 30px;">
            <span style="font-size: 1.25rem; font-weight: 900; color: #059669;">Current Legacy</span>
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

  // Append everything
  homeRoot.appendChild(heroSec);
  homeRoot.appendChild(featuresSec);
  homeRoot.appendChild(fleetSec);
  homeRoot.appendChild(statsSec);
  homeRoot.appendChild(ctaSec);
  homeRoot.appendChild(aboutSec);

  container.appendChild(renderNavbar());
  container.appendChild(homeRoot);
  container.appendChild(renderFooter());

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
