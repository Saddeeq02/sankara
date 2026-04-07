import { renderNavbar, renderFooter } from '../components/Navigation';
import { renderAboutSections } from './About';

export function renderHomeScreen() {
  const container = document.createElement('div');

  // Hero Section
  const hero = document.createElement('section');
  hero.className = 'hero reveal';
  // ... (rest of hero logic)
  hero.style.backgroundImage = 'url(/assets/hero.png)';
  hero.style.backgroundSize = 'cover';
  hero.style.backgroundPosition = 'center';
  hero.style.transition = 'background-image 1.5s ease-in-out';

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
  }, 4000); 

  hero.innerHTML = `
    <div class="hero-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.4); z-index: 1;"></div>
    <div class="hero-content container" style="position: relative; z-index: 2; color: white;">
      <h1 class="hero-title" style="color: white; -webkit-text-fill-color: white;">Driving Agricultural Growth With <br> Reliable Machinery</h1>
      <p class="hero-subtitle" style="font-size: 1.25rem; font-weight: 500; margin-bottom: 40px; color: #eee;">
        Empowering Nigerian farmers with premium tractors and high-performance agricultural machinery.
      </p>
      <div class="hero-btns" style="display: flex; gap: 20px; justify-content: center;">
        <a href="/products" class="btn-primary">Explore Machinery</a>
        <a href="/contact" class="btn-secondary-outline">Get a Quote</a>
      </div>
    </div>

  `;

  // System Count / Stats Section (V2 Redesign)
  const stats = document.createElement('section');
  stats.className = 'stats-section-v2';
  
  stats.innerHTML = `
    <div class="container">
      <div class="impact-header reveal">
        <span class="impact-badge">Our Impact</span>
        <h2 style="font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 800; margin-bottom: 25px; line-height: 1.1; color: #fff;">
          Pioneering Agricultural<br><span style="color: var(--stats-accent);">Excellence In Nigeria</span>
        </h2>
        <p style="font-size: 1.2rem; max-width: 700px; color: var(--stats-text-muted); line-height: 1.7;">
          With a legacy of trust and a vision for the future, we empower farmers with cutting-edge machinery and unwavering support to drive national food security.
        </p>
      </div>
      
      <div class="stats-grid-v2" style="grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));">
        <div class="stat-card-v2 reveal" style="animation-delay: 0.1s;">
          <div class="icon-wrapper">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <h3 class="counter-value" data-target="40">0</h3>
          <p>Years Experience</p>
        </div>
        
        <div class="stat-card-v2 reveal" style="animation-delay: 0.2s;">
          <div class="icon-wrapper">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 17h4V5H2v12h3m0 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0m5 0a2 2 0 1 1 4 0 2 2 0 1 1-4 0m3-2h4l2-3v-6h-7v9m7-6h-7m-3 10V5a2 2 0 0 1 2-2h7"/></svg>
          </div>
          <h3 class="counter-value" data-target="500">0</h3>
          <p>Machinery Delivered</p>
        </div>
        
        <div class="stat-card-v2 reveal" style="animation-delay: 0.3s;">
          <div class="icon-wrapper">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>
          </div>
          <h3 class="counter-value" data-target="100" data-suffix="%">0</h3>
          <p>Support Rating</p>
        </div>

        <div class="stat-card-v2 reveal" style="animation-delay: 0.4s;">
          <div class="icon-wrapper">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/><path d="m9.01 19 1.98-7.92a2 2 0 0 1 3.92 0l1.98 7.92"/></svg>
          </div>
          <h3 class="counter-value" data-target="1000" data-suffix="+">0</h3>
          <p>Clients Served</p>
        </div>
      </div>
    </div>
  `;

  // Counter Animation Logic
  const initCounters = () => {
    const counters = stats.querySelectorAll('.counter-value');
    const speed = 200; // The lower the slower

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = +counter.getAttribute('data-target');
          const suffix = counter.getAttribute('data-suffix') || '';
          const count = +counter.innerText;

          const updateCount = () => {
            const current = +counter.innerText.replace(/[^\d]/g, '');
            const inc = target / speed;

            if (current < target) {
              counter.innerText = Math.ceil(current + inc) + suffix;
              setTimeout(updateCount, 1);
            } else {
              counter.innerText = target + suffix;
            }
          };

          updateCount();
          observer.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  };

  // Run counters after element is in DOM
  setTimeout(initCounters, 500);

  // Services Section
  const servicesGrid = document.createElement('section');
  servicesGrid.style.padding = '100px 0';
  servicesGrid.style.backgroundColor = 'var(--background-color)';
  servicesGrid.innerHTML = `
    <div class="container" style="text-align: center;">
      <h3 class="reveal" style="color: var(--primary-color); font-size: 0.9rem; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 15px; font-weight: 700;">Our Services</h3>
      <h2 class="reveal" style="font-size: clamp(2.2rem, 4vw, 3.5rem); font-weight: 800; color: var(--primary-color); margin-bottom: 20px; line-height: 1.1; animation-delay: 0.1s;">Comprehensive Agricultural<br>Solutions</h2>
      <p class="reveal" style="font-size: 1.1rem; color: var(--text-muted); max-width: 700px; margin: 0 auto 60px auto; animation-delay: 0.2s;">
        From sales to support, we offer end-to-end services to keep your farming operations running smoothly.
      </p>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px;">
        <div class="premium-glass-card reveal" style="padding: 40px 30px; border-radius: 20px; text-align: left; animation-delay: 0.1s;">
          <div style="width: 50px; height: 50px; background: var(--accent-color); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; margin-bottom: 25px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m10 11 11 .9c.6 0 .9.5.8 1.1l-.8 5h-1"/><path d="M16 18h-5"/><path d="M18 5a1 1 0 0 0-1 1v5.573"/><path d="M3 4h9l1 7.246"/><path d="M4 11V4"/><path d="M7 15h.01"/><path d="M8 10.1V4"/><circle cx="18" cy="18" r="2"/><circle cx="7" cy="15" r="5"/></svg>
          </div>
          <h4 style="font-size: 1.25rem; font-weight: 700; color: var(--primary-color); margin-bottom: 15px;">Tractor Sales</h4>
          <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">Premium tractors from leading global brands with flexible payment options.</p>
        </div>

        <div class="premium-glass-card reveal" style="padding: 40px 30px; border-radius: 20px; text-align: left; animation-delay: 0.2s;">
          <div style="width: 50px; height: 50px; background: var(--accent-color); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; margin-bottom: 25px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 1.41-2.83l-1.41-1.41a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          </div>
          <h4 style="font-size: 1.25rem; font-weight: 700; color: var(--primary-color); margin-bottom: 15px;">Farm Implements</h4>
          <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">Complete range of farming equipment for tillage, planting, and harvesting.</p>
        </div>

        <div class="premium-glass-card reveal" style="padding: 40px 30px; border-radius: 20px; text-align: left; animation-delay: 0.3s;">
          <div style="width: 50px; height: 50px; background: var(--accent-color); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; margin-bottom: 25px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
          </div>
          <h4 style="font-size: 1.25rem; font-weight: 700; color: var(--primary-color); margin-bottom: 15px;">Spare Parts Supply</h4>
          <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">Genuine OEM parts with nationwide delivery and competitive pricing.</p>
        </div>
      </div>
    </div>
  `;

  // About Section Integration
  const aboutWrapper = document.createElement('section');
  aboutWrapper.id = 'about';
  aboutWrapper.className = 'reveal';
  aboutWrapper.appendChild(renderAboutSections());

  container.appendChild(renderNavbar());
  container.appendChild(hero);
  container.appendChild(stats);
  container.appendChild(servicesGrid);
  container.appendChild(aboutWrapper);
  container.appendChild(renderFooter());

  // Trigger animations after insertion
  setTimeout(() => {
    if (window.initAnimations) {
      window.initAnimations();
    }
  }, 100);

  return container;
}
