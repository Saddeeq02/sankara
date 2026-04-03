import { renderNavbar, renderFooter } from '../components/Navigation';
import { Settings, Wrench, Package, Truck, GraduationCap, Phone, Zap, ShieldCheck } from 'lucide-static';

export function renderServicesScreen() {
  const container = document.createElement('div');

  // 1. Hero Section
  const hero = document.createElement('header');
  hero.style.height = '70vh';
  hero.style.minHeight = '500px';
  hero.style.position = 'relative';
  hero.style.display = 'flex';
  hero.style.alignItems = 'center';
  hero.style.overflow = 'hidden';
  hero.style.color = 'white';
  hero.style.background = `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.2)), url('/src/assets/services_hero.png') center/cover no-repeat fixed`;

  hero.innerHTML = `
    <div class="container" style="z-index: 2;">
      <div style="max-width: 600px;">
        <span class="reveal" style="font-weight: 700; color: var(--primary-color); text-transform: uppercase; letter-spacing: 2px; display: block; margin-bottom: 15px;">Elite Tech Support</span>
        <h1 class="reveal" style="font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 900; line-height: 1.1; margin-bottom: 20px;">Engineering <br>Agricultural Success</h1>
        <p class="reveal" style="font-size: 1.2rem; color: rgba(255,255,255,0.8); line-height: 1.6; margin-bottom: 35px; animation-delay: 0.2s;">
          From factory-backed maintenance to nationwide parts delivery, we provide the technical foundation for Nigeria's largest farms.
        </p>
        <div class="reveal" style="display: flex; gap: 15px; animation-delay: 0.3s;">
          <a href="/contact" data-route="contact" class="btn-primary" style="padding: 15px 30px; font-weight: 700;">Request Service</a>
          <a href="tel:+2348099933644" class="btn-secondary" style="padding: 15px 30px; color: white; border: 1px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); font-weight: 700; text-decoration: none; border-radius: 8px;">Call Support</a>
        </div>
      </div>
    </div>
  `;

  // 2. Core Service Grid
  const serviceGrid = document.createElement('section');
  serviceGrid.style.padding = '100px 0';
  serviceGrid.style.background = 'var(--background-color)';
  
  const services = [
    {
      icon: Settings,
      title: 'Technical Maintenance',
      desc: 'Full-service maintenance, engine diagnostics, and major overhauls by certified factory technicians.',
      features: ['Diagnostics', 'Engine Overhaul', 'System Calibration']
    },
    {
      icon: Package,
      title: 'Genuine OEM Parts',
      desc: '100% authentic manufacturer parts distribution with a nationwide logistics network for fast delivery.',
      features: ['Nationwide Delivery', 'Authentic OEM', 'Bulk Supply']
    },
    {
      icon: Wrench,
      title: 'Implements Installation',
      desc: 'Expert setup and field calibration of ploughs, harrows, and specialized cultivation equipment.',
      features: ['Field Calibration', 'Mounting', 'Optimal Setup']
    },
    {
      icon: GraduationCap,
      title: 'Operator Training',
      desc: 'Comprehensive safety and operation programs to maximize machinery lifecycle and operator efficiency.',
      features: ['Safety Protocols', 'Operation Skills', 'Daily Maintenance']
    }
  ];

  serviceGrid.innerHTML = `
    <div class="container">
      <div style="text-align: center; margin-bottom: 70px;">
        <h2 class="reveal" style="font-size: 3rem; font-weight: 900; margin-bottom: 15px;">A Full Lifecycle of Support</h2>
        <p class="reveal" style="color: var(--text-muted); font-size: 1.1rem; max-width: 600px; margin: 0 auto;">We don't just sell machines; we ensure they never stop working for you.</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px;">
        ${services.map((s, i) => `
          <div class="card reveal" style="padding: 40px; background: var(--surface-color); border: 1px solid var(--admin-border); border-radius: 20px; transition: transform 0.3s ease, box-shadow 0.3s ease; animation-delay: ${i * 0.1}s;">
            <div style="width: 50px; height: 50px; background: rgba(253,186,11,0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--primary-color); margin-bottom: 25px;">
              ${s.icon}
            </div>
            <h3 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 15px;">${s.title}</h3>
            <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 25px;">${s.desc}</p>
            <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 10px;">
              ${s.features.map(f => `<li style="font-size: 0.85rem; font-weight: 600; display: flex; align-items: center; gap: 8px;"><span style="color: var(--primary-color)">✔</span> ${f}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // 3. Mobile Response Team (Feature Row)
  const mobileSupport = document.createElement('section');
  mobileSupport.style.padding = '120px 0';
  mobileSupport.style.background = '#0f172a'; // Fixed: Deep Industrial Blue for high contrast
  mobileSupport.style.color = 'white';
  mobileSupport.style.overflow = 'hidden';
  mobileSupport.style.position = 'relative';
  
  mobileSupport.innerHTML = `
    <div class="container">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;">
        <div class="reveal">
          <div style="display: inline-flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.15); padding: 8px 15px; border-radius: 30px; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--primary-color); margin-bottom: 25px;">
            <span style="display: block; width: 8px; height: 8px; background: var(--primary-color); border-radius: 50%; animation: pulse 2s infinite;"></span>
            Live Field Support Available
          </div>
          <h2 style="font-size: 3.5rem; font-weight: 900; line-height: 1.1; margin-bottom: 30px; color: white;">Rapid Response <br>Mobile Support</h2>
          <p style="font-size: 1.15rem; color: rgba(255,255,255,0.85); line-height: 1.8; margin-bottom: 40px;">
            Mechanical failures shouldn't stop your harvest. Our specialized mobile technicians bring factory-level expertise directly to your farm, anywhere in Nigeria.
          </p>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
            <div>
              <h4 style="font-size: 1.1rem; font-weight: 800; margin-bottom: 10px; color: var(--primary-color);">On-Farm Repairs</h4>
              <p style="font-size: 0.9rem; color: rgba(255,255,255,0.6);">Major repairs handled on-site to minimize downtime.</p>
            </div>
            <div>
              <h4 style="font-size: 1.1rem; font-weight: 800; margin-bottom: 10px; color: var(--primary-color);">24/7 Availability</h4>
              <p style="font-size: 0.9rem; color: rgba(255,255,255,0.6);">Critical seasonal support during planting and harvest.</p>
            </div>
          </div>
        </div>
        <div class="reveal" style="position: relative; animation-delay: 0.2s;">
          <img src="/src/assets/services_mobile_team.png" alt="Mobile Support" style="width: 100%; border-radius: 20px; box-shadow: 0 30px 60px rgba(0,0,0,0.5); position: relative; z-index: 2;">
          <div style="position: absolute; -right: 20%; -top: 20%; width: 400px; height: 400px; background: var(--primary-color); border-radius: 50%; opacity: 0.1; filter: blur(100px);"></div>
        </div>
      </div>
    </div>
    <style>
      @keyframes pulse {
        0% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.5; transform: scale(1.2); }
        100% { opacity: 1; transform: scale(1); }
      }
    </style>
  `;

  // 4. Service Workflow (Process)
  const workflow = document.createElement('section');
  workflow.style.padding = '100px 0';
  workflow.style.background = 'var(--background-color)';
  workflow.innerHTML = `
    <div class="container">
      <div style="text-align: center; margin-bottom: 70px;">
        <h2 class="reveal" style="font-size: 2.5rem; font-weight: 800; margin-bottom: 15px;">The Service Lifecycle</h2>
        <p class="reveal" style="color: var(--text-muted); font-size: 1.1rem;">A structured approach to equipment reliability.</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 40px; position: relative;">
        <!-- Step 1 -->
        <div class="reveal" style="text-align: center;">
          <div style="width: 80px; height: 80px; background: var(--surface-color); border: 1px solid var(--admin-border); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 25px; font-size: 1.5rem; font-weight: 800; color: var(--primary-color); position: relative;">
            01
          </div>
          <h4 style="font-weight: 800; font-size: 1.2rem; margin-bottom: 10px;">Diagnostic Review</h4>
          <p style="color: var(--text-muted); font-size: 0.9rem;">Advanced analysis to pinpoint mechanical and electrical issues.</p>
        </div>
        <!-- Step 2 -->
        <div class="reveal" style="text-align: center; animation-delay: 0.1s;">
          <div style="width: 80px; height: 80px; background: var(--surface-color); border: 1px solid var(--admin-border); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 25px; font-size: 1.5rem; font-weight: 800; color: var(--primary-color);">
            02
          </div>
          <h4 style="font-weight: 800; font-size: 1.2rem; margin-bottom: 10px;">Specialized Repair</h4>
          <p style="color: var(--text-muted); font-size: 0.9rem;">Implementation of OEM fixes and part replacements.</p>
        </div>
        <!-- Step 3 -->
        <div class="reveal" style="text-align: center; animation-delay: 0.2s;">
          <div style="width: 80px; height: 80px; background: var(--surface-color); border: 1px solid var(--admin-border); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 25px; font-size: 1.5rem; font-weight: 800; color: var(--primary-color);">
            03
          </div>
          <h4 style="font-weight: 800; font-size: 1.2rem; margin-bottom: 10px;">Continuous Support</h4>
          <p style="color: var(--text-muted); font-size: 0.9rem;">Scheduled follow-ups and performance monitoring.</p>
        </div>
      </div>
    </div>
  `;

  // 5. Final CTA
  const cta = document.createElement('section');
  cta.style.padding = '80px 0';
  cta.innerHTML = `
    <div class="container reveal">
      <div style="background: linear-gradient(135deg, var(--primary-color) 0%, #ca960b 100%); padding: 60px; border-radius: 30px; text-align: center; color: white; box-shadow: 0 30px 60px rgba(253,186,11,0.2);">
        <h2 style="font-size: 2.5rem; font-weight: 900; margin-bottom: 20px;">Ready to optimize your fleet?</h2>
        <p style="font-size: 1.1rem; opacity: 0.9; max-width: 600px; margin: 0 auto 40px; line-height: 1.6;">
          Connect with our technical team today for quotes on maintenance contracts or bulk spare parts supply.
        </p>
        <div style="display: flex; gap: 20px; justify-content: center;">
          <a href="/contact" data-route="contact" class="btn-primary" style="background: white; color: var(--primary-color); font-weight: 800; padding: 15px 40px;">Contact Technical Team</a>
          <a href="tel:+2348026487775" style="border: 2px solid white; color: white; text-decoration: none; padding: 15px 40px; border-radius: 8px; font-weight: 800; transition: background 0.3s;" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='none'">Direct Parts Line</a>
        </div>
      </div>
    </div>
  `;

  container.appendChild(renderNavbar());
  container.appendChild(hero);
  container.appendChild(serviceGrid);
  container.appendChild(mobileSupport);
  container.appendChild(workflow);
  container.appendChild(cta);
  container.appendChild(renderFooter());

  // Trigger animations
  setTimeout(() => {
    if (window.initAnimations) {
      window.initAnimations();
    }
  }, 100);

  return container;
}
