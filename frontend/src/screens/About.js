import { renderNavbar, renderFooter } from '../components/Navigation';

export function renderAboutScreen() {
  const container = document.createElement('div');
  container.className = 'about-page-root';

  // Section 1: Hero & Stats
  const heroSec = document.createElement('header');
  heroSec.className = 'about-hero';
  heroSec.style.padding = '160px 0 100px';
  heroSec.style.background = 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)';
  heroSec.style.color = '#ffffff';
  heroSec.style.position = 'relative';
  heroSec.style.overflow = 'hidden';
  heroSec.innerHTML = `
    <!-- Decorative background elements -->
    <div style="position: absolute; top: -50%; left: -20%; width: 80%; height: 150%; background: radial-gradient(circle, rgba(153, 27, 27, 0.08) 0%, transparent 60%); pointer-events: none;"></div>
    <div style="position: absolute; bottom: -50%; right: -20%; width: 80%; height: 150%; background: radial-gradient(circle, rgba(153, 27, 27, 0.05) 0%, transparent 60%); pointer-events: none;"></div>
    
    <div class="container" style="position: relative; z-index: 1;">
      <div style="max-width: 800px; margin: 0 auto; text-align: center; margin-bottom: 70px;">
        <span class="reveal" style="font-size: 0.85rem; font-weight: 800; color: #3b82f6; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 20px; display: inline-block; background: rgba(59, 130, 246, 0.1); padding: 8px 18px; border-radius: 100px; border: 1px solid rgba(59, 130, 246, 0.25);">
          About Sankara Nigeria Limited
        </span>
        <h1 class="reveal" style="font-size: clamp(2.5rem, 6vw, 4.8rem); font-weight: 900; line-height: 1.1; letter-spacing: -2px; margin-bottom: 25px;">
          Powering Nigeria's <br><span style="color: #3b82f6;">Modern Farming</span>
        </h1>
        <p class="reveal" style="color: #94a3b8; font-size: 1.25rem; line-height: 1.8; margin-bottom: 40px; font-weight: 450;">
          Since 1986, we've been Nigeria's trusted partner in agricultural mechanization, delivering quality machinery and exceptional service to farmers nationwide.
        </p>
        
        <div class="reveal" style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
          <a href="tel:+2348099933644" class="btn-primary" style="background: #991b1b; color: #ffffff; border: none; padding: 16px 32px; font-weight: 700; border-radius: 12px; display: inline-flex; align-items: center; gap: 10px; text-decoration: none; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='none'">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            Call Sales (+2348099933644)
          </a>
          <button data-route="contact" class="btn-secondary" style="background: transparent; color: #ffffff; border: 2px solid rgba(255,255,255,0.2); padding: 16px 32px; font-weight: 700; border-radius: 12px; cursor: pointer; transition: background 0.2s, border-color 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.05)'; this.style.borderColor='rgba(255,255,255,0.4)';" onmouseout="this.style.background='transparent'; this.style.borderColor='rgba(255,255,255,0.2)';">
            Get Quote
          </button>
        </div>
      </div>
      
      <!-- Stats block -->
      <div class="reveal about-stats-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px; margin-top: 60px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 60px;">
        <div style="text-align: center;">
          <h3 style="font-size: 3rem; font-weight: 900; color: #3b82f6; margin-bottom: 8px; line-height: 1;">40+</h3>
          <span style="color: #94a3b8; font-weight: 700; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px;">Years of Excellence</span>
        </div>
        <div style="text-align: center;">
          <h3 style="font-size: 3rem; font-weight: 900; color: #3b82f6; margin-bottom: 8px; line-height: 1;">1200+</h3>
          <span style="color: #94a3b8; font-weight: 700; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px;">Tractors Delivered</span>
        </div>
        <div style="text-align: center;">
          <h3 style="font-size: 3rem; font-weight: 900; color: #3b82f6; margin-bottom: 8px; line-height: 1;">5000+</h3>
          <span style="color: #94a3b8; font-weight: 700; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px;">Farmers Served</span>
        </div>
        <div style="text-align: center;">
          <h3 style="font-size: 3rem; font-weight: 900; color: #3b82f6; margin-bottom: 8px; line-height: 1;">36</h3>
          <span style="color: #94a3b8; font-weight: 700; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px;">States Covered</span>
        </div>
      </div>
    </div>
  `;

  // Section 2: A Legacy of Agricultural Excellence
  const legacySec = document.createElement('section');
  legacySec.style.padding = '120px 0';
  legacySec.style.background = '#ffffff';
  legacySec.innerHTML = `
    <div class="container" style="display: grid; grid-template-columns: 1fr 1.2fr; gap: 80px; align-items: center;">
      <!-- Left side decorative element -->
      <div class="reveal" style="position: relative; background: linear-gradient(135deg, rgba(153, 27, 27, 0.05) 0%, rgba(153, 27, 27, 0.15) 100%); border-radius: 32px; padding: 60px; border: 1px solid rgba(153, 27, 27, 0.1);">
        <div style="font-size: 15rem; font-weight: 900; color: rgba(153, 27, 27, 0.03); position: absolute; top: -50px; right: -20px; pointer-events: none; user-select: none;">1986</div>
        <h3 style="font-size: 1.8rem; font-weight: 850; color: #0f172a; margin-bottom: 20px;">Serving Farmers Nationwide</h3>
        <p style="color: #475569; font-size: 1.05rem; line-height: 1.7; margin-bottom: 0;">
          For nearly 40 years, we have worked directly with regional farming unions, private enterprise, and national institutions to mechanize production, enhance harvests, and support local farming communities.
        </p>
      </div>
      
      <!-- Right side story narrative -->
      <div class="reveal" style="animation-delay: 0.2s;">
        <span style="font-size: 0.85rem; font-weight: 800; color: #991b1b; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px; display: block;">Company Story</span>
        <h2 style="font-size: clamp(2rem, 3.5vw, 2.8rem); font-weight: 850; color: #0f172a; letter-spacing: -1.5px; line-height: 1.2; margin-bottom: 30px;">A Legacy of Agricultural Excellence</h2>
        
        <p style="color: #334155; font-size: 1.12rem; font-weight: 600; line-height: 1.7; margin-bottom: 20px;">
          Since its establishment in 1986, Sankara Nigeria Limited has remained a trusted force in agricultural transformation across Nigeria and the wider region. Built on a foundation of integrity, innovation, and dedicated service, we have led the advancement of mechanized and sustainable farming for nearly four decades.
        </p>
        
        <p style="color: #475569; font-size: 1.05rem; line-height: 1.8; margin-bottom: 20px;">
          Our impact spans the entire Nigerian landscape and extends into neighbouring countries such as Niger, Chad, Cameroon, and Benin, as well as customers all over the world, delivering reliable machinery, genuine spare parts, and expert technical support wherever farmers need us.
        </p>
        
        <p style="color: #475569; font-size: 1.05rem; line-height: 1.8; margin-bottom: 0;">
          At Sankara, we don't just supply equipment; we provide complete agricultural solutions that empower farmers, agribusinesses, and institutions to achieve greater productivity, efficiency, and long-term growth.
        </p>
      </div>
    </div>
  `;

  // Section 3: Our Mission, Vision, and Values
  const mvvSec = document.createElement('section');
  mvvSec.style.padding = '100px 0 120px';
  mvvSec.style.background = '#f8fafc';
  mvvSec.innerHTML = `
    <div class="container" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px;">
      <!-- Mission Card -->
      <div class="reveal premium-glass-card" style="padding: 45px; border-radius: 28px; background: #ffffff; border: 1px solid #e2e8f0; transition: all 0.3s;" onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='#991b1b';" onmouseout="this.style.transform='none'; this.style.borderColor='#e2e8f0';">
        <div style="display: inline-flex; align-items: center; justify-content: center; width: 56px; height: 56px; background: rgba(153, 27, 27, 0.1); color: #991b1b; border-radius: 14px; margin-bottom: 25px;">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
        </div>
        <h3 style="font-size: 1.4rem; font-weight: 850; color: #0f172a; margin-bottom: 15px;">Our Mission</h3>
        <p style="color: #475569; font-size: 0.98rem; line-height: 1.7; margin: 0;">
          To empower Nigerian farmers with world-class agricultural machinery that enhances productivity, reduces labor costs, and drives sustainable agricultural growth across the nation.
        </p>
      </div>

      <!-- Vision Card -->
      <div class="reveal premium-glass-card" style="padding: 45px; border-radius: 28px; background: #ffffff; border: 1px solid #e2e8f0; transition: all 0.3s; animation-delay: 0.15s;" onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='#991b1b';" onmouseout="this.style.transform='none'; this.style.borderColor='#e2e8f0';">
        <div style="display: inline-flex; align-items: center; justify-content: center; width: 56px; height: 56px; background: rgba(153, 27, 27, 0.1); color: #991b1b; border-radius: 14px; margin-bottom: 25px;">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
        </div>
        <h3 style="font-size: 1.4rem; font-weight: 850; color: #0f172a; margin-bottom: 15px;">Our Vision</h3>
        <p style="color: #475569; font-size: 0.98rem; line-height: 1.7; margin: 0;">
          Driven by passion and purpose, our vision is to become the most recognized and trusted agricultural machinery partner across West Africa; championing modern farming, strengthening partnerships, and delivering innovations that transform communities and protect the environment.
        </p>
      </div>

      <!-- Values Card -->
      <div class="reveal premium-glass-card" style="padding: 45px; border-radius: 28px; background: #ffffff; border: 1px solid #e2e8f0; transition: all 0.3s; animation-delay: 0.3s;" onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='#991b1b';" onmouseout="this.style.transform='none'; this.style.borderColor='#e2e8f0';">
        <div style="display: inline-flex; align-items: center; justify-content: center; width: 56px; height: 56px; background: rgba(153, 27, 27, 0.1); color: #991b1b; border-radius: 14px; margin-bottom: 25px;">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>
        </div>
        <h3 style="font-size: 1.4rem; font-weight: 850; color: #0f172a; margin-bottom: 15px;">Our Values</h3>
        <p style="color: #475569; font-size: 0.98rem; line-height: 1.7; margin: 0;">
          Integrity, excellence, and customer satisfaction guide everything we do. We believe in building lasting relationships through honest dealings and superior service.
        </p>
      </div>
    </div>
  `;

  // Section 4: Your Trusted Partner in Agricultural Success
  const chooseSec = document.createElement('section');
  chooseSec.style.padding = '120px 0';
  chooseSec.style.background = '#ffffff';
  chooseSec.innerHTML = `
    <div class="container">
      <div style="text-align: center; margin-bottom: 70px;">
        <span class="reveal" style="font-size: 0.85rem; font-weight: 800; color: #991b1b; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px; display: block;">Why Choose Us</span>
        <h2 class="reveal" style="font-size: clamp(2rem, 3.5vw, 2.8rem); font-weight: 850; color: #0f172a; letter-spacing: -1px; margin-bottom: 20px;">Your Trusted Partner in Agricultural Success</h2>
        <p class="reveal" style="color: #475569; font-size: 1.1rem; max-width: 750px; margin: 0 auto; line-height: 1.7;">
          We go beyond selling machinery. We provide comprehensive solutions, unwavering support, and genuine commitment to your agricultural success.
        </p>
      </div>

      <div class="about-why-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px;">
        <!-- Card 1: 24/7 Customer Support -->
        <div class="reveal premium-glass-card" style="padding: 35px; border-radius: 24px; background: #ffffff; border: 1px solid #e2e8f0; transition: all 0.3s;" onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='#991b1b';" onmouseout="this.style.transform='none'; this.style.borderColor='#e2e8f0';">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; background: rgba(153, 27, 27, 0.1); color: #991b1b; border-radius: 12px; margin-bottom: 22px;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72(12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </div>
          <h4 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-bottom: 12px;">24/7 Customer Support</h4>
          <p style="color: #475569; font-size: 0.95rem; line-height: 1.6; margin: 0;">
            Round-the-clock assistance for all your queries, technical support, and emergency services. We're always here when you need us.
          </p>
        </div>

        <!-- Card 2: Genuine Spare Parts -->
        <div class="reveal premium-glass-card" style="padding: 35px; border-radius: 24px; background: #ffffff; border: 1px solid #e2e8f0; transition: all 0.3s; animation-delay: 0.1s;" onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='#991b1b';" onmouseout="this.style.transform='none'; this.style.borderColor='#e2e8f0';">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; background: rgba(153, 27, 27, 0.1); color: #991b1b; border-radius: 12px; margin-bottom: 22px;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
          </div>
          <h4 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-bottom: 12px;">Genuine Spare Parts</h4>
          <p style="color: #475569; font-size: 0.95rem; line-height: 1.6; margin: 0;">
            100% authentic OEM parts ensuring optimal performance, longevity, and warranty compliance for all your machinery needs.
          </p>
        </div>

        <!-- Card 3: Nationwide Tractor Delivery -->
        <div class="reveal premium-glass-card" style="padding: 35px; border-radius: 24px; background: #ffffff; border: 1px solid #e2e8f0; transition: all 0.3s; animation-delay: 0.2s;" onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='#991b1b';" onmouseout="this.style.transform='none'; this.style.borderColor='#e2e8f0';">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; background: rgba(153, 27, 27, 0.1); color: #991b1b; border-radius: 12px; margin-bottom: 22px;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
          </div>
          <h4 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-bottom: 12px;">Nationwide Tractor Delivery</h4>
          <p style="color: #475569; font-size: 0.95rem; line-height: 1.6; margin: 0;">
            Reliable delivery services covering all 36 states of Nigeria. Your equipment reaches you safely and on time, anywhere in the country.
          </p>
        </div>

        <!-- Card 4: Trained Technical Experts -->
        <div class="reveal premium-glass-card" style="padding: 35px; border-radius: 24px; background: #ffffff; border: 1px solid #e2e8f0; transition: all 0.3s; animation-delay: 0.3s;" onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='#991b1b';" onmouseout="this.style.transform='none'; this.style.borderColor='#e2e8f0';">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; background: rgba(153, 27, 27, 0.1); color: #991b1b; border-radius: 12px; margin-bottom: 22px;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <h4 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-bottom: 12px;">Trained Technical Experts</h4>
          <p style="color: #475569; font-size: 0.95rem; line-height: 1.6; margin: 0;">
            Our team of factory-trained technicians provides expert installation, operator training, and troubleshooting support.
          </p>
        </div>

        <!-- Card 5: After-Sales Maintenance -->
        <div class="reveal premium-glass-card" style="padding: 35px; border-radius: 24px; background: #ffffff; border: 1px solid #e2e8f0; transition: all 0.3s; animation-delay: 0.4s;" onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='#991b1b';" onmouseout="this.style.transform='none'; this.style.borderColor='#e2e8f0';">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; background: rgba(153, 27, 27, 0.1); color: #991b1b; border-radius: 12px; margin-bottom: 22px;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
          </div>
          <h4 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-bottom: 12px;">After-Sales Maintenance</h4>
          <p style="color: #475569; font-size: 0.95rem; line-height: 1.6; margin: 0;">
            Comprehensive service packages and scheduled maintenance plans to keep your equipment running at peak efficiency.
          </p>
        </div>
      </div>
    </div>
  `;

  // Section 5: Trusted by Leading Machinery Brands & B2B Partnerships
  const brandSec = document.createElement('section');
  brandSec.style.padding = '120px 0';
  brandSec.style.background = '#f8fafc';
  brandSec.innerHTML = `
    <div class="container">
      <div style="text-align: center; margin-bottom: 70px;">
        <span class="reveal" style="font-size: 0.85rem; font-weight: 800; color: #991b1b; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px; display: block;">Strategic Partnerships</span>
        <h2 class="reveal" style="font-size: clamp(2rem, 3.5vw, 2.8rem); font-weight: 850; color: #0f172a; letter-spacing: -1px; margin-bottom: 20px;">Trusted by Leading Machinery Brands</h2>
        <p class="reveal" style="color: #475569; font-size: 1.1rem; max-width: 750px; margin: 0 auto; line-height: 1.7;">
          We partner with the world's most trusted manufacturers to bring you high-quality, durable, and efficient agricultural machinery tailored to West African soils.
        </p>
      </div>

      <!-- Grid of 6 Brand Partnership Cards -->
      <div class="reveal brand-partnership-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; margin-bottom: 80px;">
        
        <!-- Card 1 -->
        <div class="premium-glass-card" style="padding: 30px; border-radius: 20px; background: #ffffff; border: 1px solid #e2e8f0; transition: all 0.3s;" onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='#991b1b';" onmouseout="this.style.transform='none'; this.style.borderColor='#e2e8f0';">
          <h4 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-bottom: 12px;">Authorized Dealerships</h4>
          <p style="color: #475569; font-size: 0.92rem; line-height: 1.5; margin: 0;">
            Official partnerships with leading global brands ensure authentic products, warranty coverage, and factory-backed support for all our customers.
          </p>
        </div>

        <!-- Card 2 -->
        <div class="premium-glass-card" style="padding: 30px; border-radius: 20px; background: #ffffff; border: 1px solid #e2e8f0; transition: all 0.3s; animation-delay: 0.05s;" onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='#991b1b';" onmouseout="this.style.transform='none'; this.style.borderColor='#e2e8f0';">
          <h4 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-bottom: 12px;">Genuine OEM Parts</h4>
          <p style="color: #475569; font-size: 0.92rem; line-height: 1.5; margin: 0;">
            Direct access to original equipment manufacturer parts through our partnerships, guaranteeing quality, compatibility, and optimal performance.
          </p>
        </div>

        <!-- Card 3 -->
        <div class="premium-glass-card" style="padding: 30px; border-radius: 20px; background: #ffffff; border: 1px solid #e2e8f0; transition: all 0.3s; animation-delay: 0.1s;" onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='#991b1b';" onmouseout="this.style.transform='none'; this.style.borderColor='#e2e8f0';">
          <h4 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-bottom: 12px;">Technical Training</h4>
          <p style="color: #475569; font-size: 0.92rem; line-height: 1.5; margin: 0;">
            Continuous training programs from our manufacturing partners keep our technicians updated with the latest technologies and service techniques.
          </p>
        </div>

        <!-- Card 4 -->
        <div class="premium-glass-card" style="padding: 30px; border-radius: 20px; background: #ffffff; border: 1px solid #e2e8f0; transition: all 0.3s; animation-delay: 0.15s;" onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='#991b1b';" onmouseout="this.style.transform='none'; this.style.borderColor='#e2e8f0';">
          <h4 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-bottom: 12px;">Global Standards</h4>
          <p style="color: #475569; font-size: 0.92rem; line-height: 1.5; margin: 0;">
            Our partnerships ensure we maintain international quality standards and best practices in sales, service, and customer support.
          </p>
        </div>

        <!-- Card 5 -->
        <div class="premium-glass-card" style="padding: 30px; border-radius: 20px; background: #ffffff; border: 1px solid #e2e8f0; transition: all 0.3s; animation-delay: 0.2s;" onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='#991b1b';" onmouseout="this.style.transform='none'; this.style.borderColor='#e2e8f0';">
          <h4 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-bottom: 12px;">Latest Technology</h4>
          <p style="color: #475569; font-size: 0.92rem; line-height: 1.5; margin: 0;">
            Early access to cutting-edge agricultural innovations and technologies through our strong relationships with machinery manufacturers.
          </p>
        </div>

        <!-- Card 6 -->
        <div class="premium-glass-card" style="padding: 30px; border-radius: 20px; background: #ffffff; border: 1px solid #e2e8f0; transition: all 0.3s; animation-delay: 0.25s;" onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='#991b1b';" onmouseout="this.style.transform='none'; this.style.borderColor='#e2e8f0';">
          <h4 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-bottom: 12px;">Certified Excellence</h4>
          <p style="color: #475569; font-size: 0.92rem; line-height: 1.5; margin: 0;">
            Recognition and certification from our partners for outstanding performance in sales, service quality, and customer satisfaction.
          </p>
        </div>

      </div>

      <!-- Why Manufacturers Choose Sankara section -->
      <div style="background: #ffffff; border-radius: 32px; border: 1px solid #e2e8f0; padding: 60px; margin-bottom: 80px;" class="reveal">
        <h3 style="font-size: 1.8rem; font-weight: 850; color: #0f172a; margin-bottom: 35px; text-align: center;">Why Manufacturers Choose Sankara</h3>
        
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 40px;" class="about-why-grid">
          <div>
            <h4 style="font-size: 1.15rem; font-weight: 850; color: #0f172a; margin-bottom: 10px; display: flex; align-items: center; gap: 10px;">
              <span style="color: #991b1b;">✔</span> Proven Track Record
            </h4>
            <p style="color: #475569; font-size: 0.98rem; line-height: 1.6; margin: 0; padding-left: 24px;">
              Nearly 40 years of successful operations and customer satisfaction in the Nigerian market.
            </p>
          </div>
          <div>
            <h4 style="font-size: 1.15rem; font-weight: 850; color: #0f172a; margin-bottom: 10px; display: flex; align-items: center; gap: 10px;">
              <span style="color: #991b1b;">✔</span> Extensive Network
            </h4>
            <p style="color: #475569; font-size: 0.98rem; line-height: 1.6; margin: 0; padding-left: 24px;">
              Nationwide presence covering all 36 states with reliable delivery and service infrastructure.
            </p>
          </div>
          <div>
            <h4 style="font-size: 1.15rem; font-weight: 850; color: #0f172a; margin-bottom: 10px; display: flex; align-items: center; gap: 10px;">
              <span style="color: #991b1b;">✔</span> Technical Expertise
            </h4>
            <p style="color: #475569; font-size: 0.98rem; line-height: 1.6; margin: 0; padding-left: 24px;">
              Certified technicians and comprehensive after-sales support capabilities.
            </p>
          </div>
          <div>
            <h4 style="font-size: 1.15rem; font-weight: 850; color: #0f172a; margin-bottom: 10px; display: flex; align-items: center; gap: 10px;">
              <span style="color: #991b1b;">✔</span> Market Leadership
            </h4>
            <p style="color: #475569; font-size: 0.98rem; line-height: 1.6; margin: 0; padding-left: 24px;">
              Leading position in agricultural machinery sales with over 1200 tractors delivered.
            </p>
          </div>
        </div>
      </div>

      <!-- Multiple Brand Partnerships Panel -->
      <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 32px; padding: 60px 80px; display: grid; grid-template-columns: 1.2fr 1fr; gap: 60px; align-items: center; color: #ffffff; margin-bottom: 80px;" class="reveal about-panel-grid">
        <div>
          <h3 style="font-size: 1.8rem; font-weight: 850; margin-bottom: 15px;">Strategic Global Networks</h3>
          <p style="color: #94a3b8; font-size: 1.05rem; line-height: 1.7; margin: 0;">
            We maintain strategic partnerships with numerous leading agricultural machinery manufacturers worldwide.
          </p>
        </div>
        <div style="display: flex; gap: 40px; justify-content: flex-end;" class="about-panel-stats">
          <div style="text-align: center;">
            <div style="font-size: 3rem; font-weight: 900; color: #3b82f6; line-height: 1;">15+</div>
            <span style="color: #94a3b8; font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; display: block; margin-top: 5px;">Brand Partners</span>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 3rem; font-weight: 900; color: #3b82f6; line-height: 1;">100%</div>
            <span style="color: #94a3b8; font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; display: block; margin-top: 5px;">Authentic Products</span>
          </div>
        </div>
      </div>

      <!-- Partnership Categories -->
      <div class="reveal" style="margin-bottom: 40px;">
        <div style="text-align: center; margin-bottom: 50px;">
          <h3 style="font-size: 1.8rem; font-weight: 850; color: #0f172a; margin-bottom: 10px;">Our Partnership Categories</h3>
          <p style="color: #475569; font-size: 1rem; max-width: 600px; margin: 0 auto;">
            Comprehensive partnerships across all agricultural machinery segments.
          </p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;" class="about-why-grid">
          <!-- Cat 1 -->
          <div style="background: #ffffff; border-radius: 20px; border: 1px solid #e2e8f0; padding: 30px; text-align: center;">
            <div style="font-size: 1.6rem; font-weight: 900; color: #991b1b; margin-bottom: 10px;">8+</div>
            <h4 style="font-size: 1.05rem; font-weight: 800; color: #0f172a; margin-bottom: 8px;">Tractor Manufacturers</h4>
            <p style="color: #64748b; font-size: 0.85rem; line-height: 1.5; margin: 0;">
              Leading global tractor brands for all farming applications.
            </p>
          </div>
          <!-- Cat 2 -->
          <div style="background: #ffffff; border-radius: 20px; border: 1px solid #e2e8f0; padding: 30px; text-align: center;">
            <div style="font-size: 1.6rem; font-weight: 900; color: #991b1b; margin-bottom: 10px;">12+</div>
            <h4 style="font-size: 1.05rem; font-weight: 800; color: #0f172a; margin-bottom: 8px;">Implement Suppliers</h4>
            <p style="color: #64748b; font-size: 0.85rem; line-height: 1.5; margin: 0;">
              Farm implements and cultivation equipment partners.
            </p>
          </div>
          <!-- Cat 3 -->
          <div style="background: #ffffff; border-radius: 20px; border: 1px solid #e2e8f0; padding: 30px; text-align: center;">
            <div style="font-size: 1.6rem; font-weight: 900; color: #991b1b; margin-bottom: 10px;">5+</div>
            <h4 style="font-size: 1.05rem; font-weight: 800; color: #0f172a; margin-bottom: 8px;">Harvesting Equipment</h4>
            <p style="color: #64748b; font-size: 0.85rem; line-height: 1.5; margin: 0;">
              Combine harvesters and specialized harvesting machinery.
            </p>
          </div>
          <!-- Cat 4 -->
          <div style="background: #ffffff; border-radius: 20px; border: 1px solid #e2e8f0; padding: 30px; text-align: center;">
            <div style="font-size: 1.6rem; font-weight: 900; color: #991b1b; margin-bottom: 10px;">20+</div>
            <h4 style="font-size: 1.05rem; font-weight: 800; color: #0f172a; margin-bottom: 8px;">Parts & Service</h4>
            <p style="color: #64748b; font-size: 0.85rem; line-height: 1.5; margin: 0;">
              Genuine parts suppliers and technical service partners.
            </p>
          </div>
        </div>
      </div>

    </div>
  `;

  // Section 6: Team Section (Dynamic Profiles)
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

      <div class="team-grid" id="about-team-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 30px;">
        <div style="grid-column: 1/-1; text-align: center; padding: 40px 0; color: #64748b;">Loading team profiles...</div>
      </div>
    </div>
  `;

  const loadTeam = async () => {
    try {
      const res = await fetch('/api/team');
      const team = await res.json();
      const grid = teamSec.querySelector('#about-team-grid');
      
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
          ${member.phone ? `
            <div class="team-member-phone">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>${member.phone}</span>
            </div>
          ` : ''}
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

  // Inject responsive stylesheet for About & Team page
  const pageStyle = document.createElement('style');
  pageStyle.innerHTML = `
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

    @media (max-width: 991px) {
      .about-page-root .container {
        grid-template-columns: 1fr !important;
        gap: 50px !important;
        padding-left: 20px !important;
        padding-right: 20px !important;
      }
      .about-stats-grid {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 40px !important;
      }
      .about-why-grid {
        grid-template-columns: 1fr !important;
      }
      .about-panel-grid {
        grid-template-columns: 1fr !important;
        padding: 40px 30px !important;
        gap: 40px !important;
      }
      .about-panel-stats {
        justify-content: center !important;
      }
    }
  `;
  document.head.appendChild(pageStyle);

  // Assemble screen page
  container.appendChild(renderNavbar());
  container.appendChild(heroSec);
  container.appendChild(legacySec);
  container.appendChild(mvvSec);
  container.appendChild(chooseSec);
  container.appendChild(brandSec);
  container.appendChild(teamSec);
  container.appendChild(renderFooter());

  // Attach dynamic data-route navigate triggers
  setTimeout(() => {
    container.querySelectorAll('[data-route]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const route = e.target.closest('[data-route]').getAttribute('data-route');
        if (window.navigate) window.navigate(route);
      });
    });
    if (window.initAnimations) window.initAnimations();
  }, 100);

  return container;
}
