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
    { id: 'fleet-mf-385', src: '/assets/fleet_mf_385.png', label: 'MF 385' },
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
    <div class="corp-hero-overlay" style="background: linear-gradient(135deg, rgba(2, 44, 34, 0.95) 0%, rgba(2, 44, 34, 0.90) 100%);"></div>
    <div class="container hero-grid">
      <div class="hero-content-block">
        <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(16, 185, 129, 0.15); padding: 8px 16px; border-radius: 100px; border: 1px solid rgba(16, 185, 129, 0.2); margin-bottom: 25px;">
          <span style="width: 8px; height: 8px; background: #34d399; border-radius: 50%; box-shadow: 0 0 10px #34d399;"></span>
          <span style="font-size: 0.75rem; font-weight: 800; letter-spacing: 1px; color: #34d399; text-transform: uppercase;">Heavy-Duty Mechanization</span>
        </div>
        <h1 class="hero-title-main">Driving Growth With <span>Lovol Machinery</span></h1>
        <p class="hero-desc">
          Sankara Nigeria Limited is a certified distributor of high-performance Lovol tractors (754-H) and Lovol combine harvesters (RG109Plus), engineering durable mechanization models for corporate and smallholder farms across Nigeria.
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
        <img id="fleet-mf-385" class="visual-slide" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="Massey Ferguson 385 Tractor">
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
          <span class="view-dot" style="font-size: 0.62rem; padding: 4px 8px; margin: 1px;">MF-385</span>
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
    <div class="container" style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 80px; align-items: start;">
      
      <!-- Left Column: Company Story -->
      <div class="reveal" style="animation-delay: 0.1s;">
        <span style="font-size: 0.85rem; font-weight: 800; color: #059669; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px; display: block;">OUR LEGACY</span>
        <h2 style="font-size: clamp(2.2rem, 4vw, 3.2rem); font-weight: 850; color: #0f172a; letter-spacing: -1.5px; line-height: 1.1; margin-bottom: 30px;">Powering Nigeria's <br><span style="color: #059669;">Modern Farming</span></h2>
        
        <p style="color: #334155; font-size: 1.15rem; font-weight: 600; line-height: 1.7; margin-bottom: 20px;">
          Since 1986, Sankara Nigeria Limited has been Nigeria's trusted partner in agricultural mechanization, delivering quality machinery and exceptional service nationwide.
        </p>
        
        <p style="color: #475569; font-size: 1.05rem; line-height: 1.8; margin-bottom: 20px;">
          Built on a foundation of integrity, innovation, and dedicated service, we have led the advancement of mechanized and sustainable farming for nearly four decades. Our impact spans the entire Nigerian landscape and extends into neighbouring countries such as Niger, Chad, Cameroon, and Benin.
        </p>
        
        <p style="color: #475569; font-size: 1.05rem; line-height: 1.8; margin-bottom: 35px;">
          At Sankara, we don't just supply equipment; we provide complete agricultural solutions that empower farmers, agribusinesses, and institutions to achieve greater productivity, efficiency, and long-term growth.
        </p>
        
        <div style="display: flex; gap: 30px; border-top: 1px solid #e2e8f0; padding-top: 30px;">
          <div>
            <h4 style="font-size: 2.2rem; font-weight: 900; color: #0f172a; margin-bottom: 5px;">40+</h4>
            <span style="font-size: 0.85rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">Years of Excellence</span>
          </div>
          <div>
            <h4 style="font-size: 2.2rem; font-weight: 900; color: #059669; margin-bottom: 5px;">1200+</h4>
            <span style="font-size: 0.85rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">Tractors Delivered</span>
          </div>
        </div>
      </div>

      <!-- Right Column: Mission, Vision, Values Stack -->
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
            Driven by passion and purpose, our vision is to become the most recognized and trusted agricultural machinery partner across West Africa; championing modern farming, strengthening partnerships, and transforming communities.
          </p>
        </div>

        <!-- Core Values Card -->
        <div class="reveal premium-glass-card" style="padding: 35px; border-radius: 24px; background: #ffffff; border: 1px solid #e2e8f0; animation-delay: 0.4s; transition: all 0.3s; box-shadow: 0 4px 20px rgba(0,0,0,0.02);" onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='#059669';" onmouseout="this.style.transform='none'; this.style.borderColor='#e2e8f0';">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; background: rgba(5, 150, 105, 0.1); color: #059669; border-radius: 12px; margin-bottom: 20px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>
          </div>
          <h3 style="font-size: 1.3rem; font-weight: 850; color: #0f172a; margin-bottom: 12px;">Our Values</h3>
          <p style="color: #475569; font-size: 0.98rem; line-height: 1.6; margin: 0;">
            Integrity, excellence, and customer satisfaction guide everything we do. We believe in building lasting relationships through honest dealings, reliability, and superior service.
          </p>
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
