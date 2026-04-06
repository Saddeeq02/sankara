import { renderNavbar, renderFooter } from '../components/Navigation';
import { Settings, Wrench, Package, Truck, GraduationCap, Phone, Zap, ShieldCheck, ArrowRight } from 'lucide-static';

export function renderServicesScreen() {
  const container = document.createElement('div');

  // 1. Hero Section (Premium V2)
  const hero = document.createElement('header');
  hero.style.padding = '180px 0 100px';
  hero.style.textAlign = 'center';
  hero.style.background = 'var(--background-color)';
  hero.innerHTML = `
    <div class="container">
      <span class="reveal" style="color: var(--primary-color); font-weight: 800; text-transform: uppercase; letter-spacing: 4px; display: block; margin-bottom: 20px;">Precision Engineering</span>
      <h1 class="reveal" style="font-size: clamp(3rem, 7vw, 5.5rem); font-weight: 900; line-height: 1.05; margin-bottom: 25px;">Sustaining <br><span style="color: var(--primary-color);">Agricultural Assets</span></h1>
      <p class="reveal" style="color: var(--text-muted); font-size: 1.25rem; max-width: 700px; margin: 0 auto; line-height: 1.8;">
        From factory-backed maintenance to nationwide parts delivery, we provide the technical foundation for Nigeria's largest mechanized farms.
      </p>
    </div>
  `;

  // 2. Core Service Grid (V2 Glassmorphism)
  const serviceGrid = document.createElement('section');
  serviceGrid.style.padding = '100px 0';
  serviceGrid.style.background = 'var(--background-color)';
  
  const services = [
    {
      icon: Settings,
      title: 'Technical Maintenance',
      desc: 'Full-service maintenance, engine diagnostics, and major overhauls by certified factory technicians using the latest calibration tools.',
      features: ['Diagnostics', 'Engine Overhaual', 'System Calibration']
    },
    {
      icon: Package,
      title: 'Genuine OEM Parts',
      desc: '100% authentic Massey Ferguson and OEM parts distribution with a nationwide logistics network for mission-critical delivery.',
      features: ['Nationwide Delivery', 'Authentic OEM', 'Bulk Supply']
    },
    {
      icon: Wrench,
      title: 'Implements Installation',
      desc: 'Expert setup and field calibration of ploughs, harrows, and specialized cultivation equipment for optimal field energy efficiency.',
      features: ['Field Calibration', 'Mounting', 'Optimal Setup']
    },
    {
      icon: GraduationCap,
      title: 'Operator Training',
      desc: 'Comprehensive safety and operation programs to maximize machinery lifecycle and ensure operator safety across all conditions.',
      features: ['Safety Protocols', 'Operation Skills', 'Daily Maintenance']
    }
  ];

  serviceGrid.innerHTML = `
    <div class="container">
      <div style="text-align: center; margin-bottom: 80px;">
        <h2 class="reveal" style="font-size: clamp(2.5rem, 5vw, 3.5rem); font-weight: 900; margin-bottom: 15px;">Industrial Support Lifecycle</h2>
        <p class="reveal" style="color: var(--text-muted); font-size: 1.2rem; max-width: 600px; margin: 0 auto;">We don't just sell machines; we ensure they never stop driving your success.</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px;">
        ${services.map((s, i) => `
          <div class="premium-glass-card reveal" style="padding: 50px; border-radius: 32px; animation-delay: ${i * 0.1}s;">
            <div style="width: 60px; height: 60px; background: rgba(59, 130, 246, 0.1); border-radius: 16px; display: flex; align-items: center; justify-content: center; color: var(--primary-color); margin-bottom: 30px;">
              ${s.icon}
            </div>
            <h3 style="font-size: 1.7rem; font-weight: 900; margin-bottom: 15px;">${s.title}</h3>
            <p style="color: var(--text-muted); font-size: 1.05rem; line-height: 1.7; margin-bottom: 30px;">${s.desc}</p>
            <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 12px; border-top: 1px solid var(--glass-border); padding-top: 25px;">
              ${s.features.map(f => `<li style="font-size: 0.9rem; font-weight: 700; display: flex; align-items: center; gap: 10px; color: var(--text-main);"><span style="color: var(--primary-color); font-size: 1.1rem;">⚡</span> ${f}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // 3. Mobile Response Team (Feature Row)
  const mobileSupport = document.createElement('section');
  mobileSupport.style.padding = '140px 0';
  mobileSupport.style.background = '#0b1120'; // Deep Slate for premium contrast
  mobileSupport.style.color = 'white';
  mobileSupport.style.overflow = 'hidden';
  mobileSupport.style.position = 'relative';
  
  mobileSupport.innerHTML = `
    <div class="container">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;">
        <div class="reveal">
          <div style="display: inline-flex; align-items: center; gap: 12px; background: rgba(59, 130, 246, 0.15); padding: 10px 20px; border-radius: 50px; font-size: 0.85rem; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; color: var(--primary-color); margin-bottom: 30px;">
            <span class="pulse-dot"></span>
            Live Regional Response Units
          </div>
          <h2 style="font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 900; line-height: 1.05; margin-bottom: 35px; color: white;">Rapid Response <br>Mobile Engineering</h2>
          <p style="font-size: 1.25rem; color: rgba(255,255,255,0.7); line-height: 1.9; margin-bottom: 45px;">
            Mechanical failures shouldn't stop your harvest. Our specialized mobile technicians bring factory-level expertise directly to your field, anywhere in the federation.
          </p>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; border-left: 3px solid var(--primary-color); padding-left: 30px;">
            <div>
              <h4 style="font-size: 1.2rem; font-weight: 900; margin-bottom: 10px; color: #fff;">On-Farm Overhaul</h4>
              <p style="font-size: 0.95rem; color: rgba(255,255,255,0.5); line-height: 1.6;">Major system repairs handled on-site to minimize downtime and maximize yield.</p>
            </div>
            <div>
              <h4 style="font-size: 1.2rem; font-weight: 900; margin-bottom: 10px; color: #fff;">24/7 Logistics</h4>
              <p style="font-size: 0.95rem; color: rgba(255,255,255,0.5); line-height: 1.6;">Critical seasonal support during planting and harvest windows nationwide.</p>
            </div>
          </div>
        </div>
        <div class="reveal" style="position: relative; animation-delay: 0.2s;">
          <div class="premium-glass-card" style="padding: 10px; border-radius: 40px;">
             <img src="/assets/services_mobile_team.png" alt="Mobile Support" style="width: 100%; border-radius: 30px; display: block;">
          </div>
          <div style="position: absolute; -right: 20%; -top: 20%; width: 400px; height: 400px; background: var(--primary-color); border-radius: 50%; opacity: 0.15; filter: blur(120px); z-index: -1;"></div>
        </div>
      </div>
    </div>
    <style>
      .pulse-dot { width: 10px; height: 10px; background: var(--primary-color); border-radius: 50%; animation: pulse-v2 2s infinite; box-shadow: 0 0 10px var(--primary-color); }
      @keyframes pulse-v2 {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.4); opacity: 0.4; }
        100% { transform: scale(1); opacity: 1; }
      }
    </style>
  `;

  // 4. CTA (Premium)
  const cta = document.createElement('section');
  cta.style.padding = '100px 0 140px';
  cta.innerHTML = `
    <div class="container reveal">
      <div class="premium-glass-card" style="padding: 80px; border-radius: 40px; text-align: center; background: linear-gradient(135deg, var(--surface-color) 0%, var(--background-color) 100%);">
        <span style="color: var(--primary-color); font-weight: 800; text-transform: uppercase; letter-spacing: 3px; display: block; margin-bottom: 20px;">Ready to Scale?</span>
        <h2 style="font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 900; margin-bottom: 25px; line-height: 1.1;">Optimize Your Fleet Architecture</h2>
        <p style="font-size: 1.2rem; color: var(--text-muted); max-width: 700px; margin: 0 auto 50px; line-height: 1.8;">
          Connect with our technical executives today for comprehensive quotes on service contracts, technical audits, or bulk OEM part supplies.
        </p>
        <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
          <button data-route="contact" class="btn-primary" style="padding: 18px 45px; font-weight: 800; border-radius: 12px; font-size: 1.1rem; display: flex; align-items: center; gap: 15px;">
            Consult with Engineering ${ArrowRight}
          </button>
          <a href="tel:+2348026487775" style="padding: 18px 45px; border: 2px solid var(--primary-color); color: var(--primary-color); text-decoration: none; border-radius: 12px; font-weight: 800; font-size: 1.1rem; transition: all 0.3s;" onmouseover="this.style.background='var(--primary-color)'; this.style.color='white';" onmouseout="this.style.background='none'; this.style.color='var(--primary-color)';">Direct Technical Line</a>
        </div>
      </div>
    </div>
  `;

  container.appendChild(renderNavbar());
  container.appendChild(hero);
  container.appendChild(serviceGrid);
  container.appendChild(mobileSupport);
  container.appendChild(cta);
  container.appendChild(renderFooter());

  // Setup event delegation for internal links
  container.querySelectorAll('[data-route]').forEach(el => {
    el.onclick = (e) => {
      e.preventDefault();
      window.navigate(el.dataset.route);
    };
  });

  if (window.initAnimations) {
    setTimeout(window.initAnimations, 100);
  }

  return container;
}
