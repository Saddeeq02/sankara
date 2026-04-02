import { renderNavbar, renderFooter } from '../components/Navigation';

export function renderHomeScreen() {
  const container = document.createElement('div');

  // Hero Section
  const hero = document.createElement('section');
  hero.className = 'hero reveal';
  hero.style.backgroundImage = 'url(/src/assets/hero.png)';
  hero.style.backgroundSize = 'cover';
  hero.style.backgroundPosition = 'center';
  hero.style.transition = 'background-image 1.5s ease-in-out';

  const bgImages = [
    '/src/assets/hero.png',
    '/src/assets/gallery_farmers.png',
    '/src/assets/portfolio_aerial.png'
  ];
  let currentBgIndex = 0;

  const bgInterval = setInterval(() => {
    if (!document.body.contains(hero)) {
      clearInterval(bgInterval);
      return;
    }
    currentBgIndex = (currentBgIndex + 1) % bgImages.length;
    hero.style.backgroundImage = `url(${bgImages[currentBgIndex]})`;
  }, 4000); // 4 seconds auto slide
  hero.innerHTML = `
    <div class="hero-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.4); z-index: 1;"></div>
    <div class="hero-content" style="position: relative; z-index: 2; color: white;">
      <h1 style="color: white; -webkit-text-fill-color: white;">Driving Agricultural Growth With <br>  Reliable Machinery</h1>
      <p style="font-size: 1.25rem; font-weight: 500; margin-bottom: 40px; color: #eee;">
        Empowering Nigerian farmers with premium tractors and high-performance agricultural machinery.
      </p>
      <div style="display: flex; gap: 20px; justify-content: center;">
        <a href="/products" class="btn-primary">Explore Machinery</a>
        <a href="/contact" style="padding: 12px 30px; border: 2px solid var(--primary-color); border-radius: 50px; text-decoration: none; color: var(--primary-color); font-weight: 600;">Get a Quote</a>
      </div>
    </div>
  `;

  // System Count / Stats Section
  const stats = document.createElement('section');
  stats.className = 'reveal';
  stats.style.backgroundColor = 'var(--stats-bg)';
  stats.style.color = 'var(--stats-text-primary)';
  stats.style.padding = '100px 0 140px 0';
  stats.style.clipPath = 'polygon(0 0, 100% 0, 100% 90%, 0 100%)';
  stats.style.marginTop = '-1px'; // avoid rendering gaps

  stats.innerHTML = `
    <div class="container" style="text-align: center;">
      <h2 style="font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 800; margin-bottom: 20px; line-height: 1.1;">Your Trusted Partner in<br>Agricultural Growth</h2>
      <p style="font-size: 1.15rem; max-width: 800px; margin: 0 auto 60px auto; color: var(--stats-text-muted); line-height: 1.6;">
        With decades of experience and unwavering commitment to quality, we've become Nigeria's preferred choice for agricultural machinery.
      </p>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 30px;">
        <div class="reveal" style="background: var(--stats-card-bg); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: var(--border-radius); padding: 50px 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); transition: transform 0.3s;" onmouseover="this.style.transform='translateY(-10px)'" onmouseout="this.style.transform='translateY(0)'">
          <div style="font-size: 4rem; font-weight: 800; color: var(--stats-accent); margin-bottom: 10px; line-height: 1;">40+</div>
          <div style="font-size: 1rem; color: var(--stats-text-muted);">Years Experience</div>
        </div>
        
        <div class="reveal" style="background: var(--stats-card-bg); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: var(--border-radius); padding: 50px 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); transition: transform 0.3s; animation-delay: 0.2s" onmouseover="this.style.transform='translateY(-10px)'" onmouseout="this.style.transform='translateY(0)'">
          <div style="font-size: 4rem; font-weight: 800; color: var(--stats-accent); margin-bottom: 10px; line-height: 1;">500+</div>
          <div style="font-size: 1rem; color: var(--stats-text-muted);">Tractors Delivered</div>
        </div>
        
        <div class="reveal" style="background: var(--stats-card-bg); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: var(--border-radius); padding: 50px 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); transition: transform 0.3s; animation-delay: 0.4s" onmouseover="this.style.transform='translateY(-10px)'" onmouseout="this.style.transform='translateY(0)'">
          <div style="font-size: 4rem; font-weight: 800; color: var(--stats-accent); margin-bottom: 10px; line-height: 1;">24/7</div>
          <div style="font-size: 1rem; color: var(--stats-text-muted);">Support Available</div>
        </div>

        <div class="reveal" style="background: var(--stats-card-bg); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: var(--border-radius); padding: 50px 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); transition: transform 0.3s; animation-delay: 0.6s" onmouseover="this.style.transform='translateY(-10px)'" onmouseout="this.style.transform='translateY(0)'">
          <div style="font-size: 4rem; font-weight: 800; color: var(--stats-accent); margin-bottom: 10px; line-height: 1;">100%</div>
          <div style="font-size: 1rem; color: var(--stats-text-muted);">Genuine Parts</div>
        </div>
      </div>
    </div>
  `;

  // Comprehensive Agricultural Solutions Section
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
        <!-- Card 1 -->
        <div class="card reveal" style="background: var(--surface-color); padding: 40px 30px; border-radius: 20px; border: 1px solid var(--glass-border); box-shadow: var(--card-shadow); text-align: left; animation-delay: 0.1s; transition: transform 0.3s;" onmouseover="this.style.transform='translateY(-10px)'" onmouseout="this.style.transform='translateY(0)'">
          <div style="width: 50px; height: 50px; background: var(--accent-color); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; margin-bottom: 25px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m10 11 11 .9c.6 0 .9.5.8 1.1l-.8 5h-1"/><path d="M16 18h-5"/><path d="M18 5a1 1 0 0 0-1 1v5.573"/><path d="M3 4h9l1 7.246"/><path d="M4 11V4"/><path d="M7 15h.01"/><path d="M8 10.1V4"/><circle cx="18" cy="18" r="2"/><circle cx="7" cy="15" r="5"/></svg>
          </div>
          <h4 style="font-size: 1.25rem; font-weight: 700; color: var(--primary-color); margin-bottom: 15px;">Tractor Sales</h4>
          <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">Premium tractors from leading global brands with flexible payment options.</p>
        </div>

        <!-- Card 2 -->
        <div class="card reveal" style="background: var(--surface-color); padding: 40px 30px; border-radius: 20px; border: 1px solid var(--glass-border); box-shadow: var(--card-shadow); text-align: left; animation-delay: 0.2s; transition: transform 0.3s;" onmouseover="this.style.transform='translateY(-10px)'" onmouseout="this.style.transform='translateY(0)'">
          <div style="width: 50px; height: 50px; background: var(--accent-color); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; margin-bottom: 25px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          </div>
          <h4 style="font-size: 1.25rem; font-weight: 700; color: var(--primary-color); margin-bottom: 15px;">Farm Implements</h4>
          <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">Complete range of farming equipment for tillage, planting, and harvesting.</p>
        </div>

        <!-- Card 3 -->
        <div class="card reveal" style="background: var(--surface-color); padding: 40px 30px; border-radius: 20px; border: 1px solid var(--glass-border); box-shadow: var(--card-shadow); text-align: left; animation-delay: 0.3s; transition: transform 0.3s;" onmouseover="this.style.transform='translateY(-10px)'" onmouseout="this.style.transform='translateY(0)'">
          <div style="width: 50px; height: 50px; background: var(--accent-color); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; margin-bottom: 25px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
          </div>
          <h4 style="font-size: 1.25rem; font-weight: 700; color: var(--primary-color); margin-bottom: 15px;">Spare Parts Supply</h4>
          <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">Genuine OEM parts with nationwide delivery and competitive pricing.</p>
        </div>

        <!-- Card 4 -->
        <div class="card reveal" style="background: var(--surface-color); padding: 40px 30px; border-radius: 20px; border: 1px solid var(--glass-border); box-shadow: var(--card-shadow); text-align: left; animation-delay: 0.4s; transition: transform 0.3s;" onmouseover="this.style.transform='translateY(-10px)'" onmouseout="this.style.transform='translateY(0)'">
          <div style="width: 50px; height: 50px; background: var(--accent-color); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; margin-bottom: 25px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>
          </div>
          <h4 style="font-size: 1.25rem; font-weight: 700; color: var(--primary-color); margin-bottom: 15px;">After-sales Support</h4>
          <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">Dedicated technical support and maintenance services across Nigeria.</p>
        </div>

        <!-- Card 5 -->
        <div class="card reveal" style="background: var(--surface-color); padding: 40px 30px; border-radius: 20px; border: 1px solid var(--glass-border); box-shadow: var(--card-shadow); text-align: left; animation-delay: 0.5s; transition: transform 0.3s;" onmouseover="this.style.transform='translateY(-10px)'" onmouseout="this.style.transform='translateY(0)'">
          <div style="width: 50px; height: 50px; background: var(--accent-color); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; margin-bottom: 25px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <h4 style="font-size: 1.25rem; font-weight: 700; color: var(--primary-color); margin-bottom: 15px;">Maintenance & Repairs</h4>
          <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">Expert technicians for servicing and repairs of all machinery brands.</p>
        </div>

        <!-- Card 6 -->
        <div class="card reveal" style="background: var(--surface-color); padding: 40px 30px; border-radius: 20px; border: 1px solid var(--glass-border); box-shadow: var(--card-shadow); text-align: left; animation-delay: 0.6s; transition: transform 0.3s;" onmouseover="this.style.transform='translateY(-10px)'" onmouseout="this.style.transform='translateY(0)'">
          <div style="width: 50px; height: 50px; background: var(--accent-color); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; margin-bottom: 25px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
          </div>
          <h4 style="font-size: 1.25rem; font-weight: 700; color: var(--primary-color); margin-bottom: 15px;">Farm Mechanization</h4>
          <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">Consultation services to optimize your agricultural operations.</p>
        </div>
      </div>
    </div>
  `;

  container.appendChild(renderNavbar());
  container.appendChild(hero);
  container.appendChild(stats);
  container.appendChild(servicesGrid);
  container.appendChild(renderFooter());

  return container;
}
