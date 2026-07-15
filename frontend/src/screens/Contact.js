import { renderNavbar, renderFooter } from '../components/Navigation';

export function renderContactScreen() {
  const container = document.createElement('div');
  container.className = 'contact-root';

  // Inject Stylesheet
  const styleTag = document.createElement('style');
  styleTag.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');
    
    .contact-root {
      font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
      background: #ffffff;
      color: #0f172a;
      overflow-x: hidden;
    }

    .contact-hero {
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #eff6ff 100%);
      color: #0f172a;
      padding: 180px 0 110px;
      position: relative;
      overflow: hidden;
      border-bottom: 1px solid rgba(37, 99, 235, 0.08);
      text-align: center;
    }

    .contact-hero::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at top, rgba(37, 99, 235, 0.06), transparent 70%);
      pointer-events: none;
      z-index: 1;
    }

    .contact-hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(37, 99, 235, 0.08);
      padding: 8px 16px;
      border-radius: 100px;
      border: 1px solid rgba(37, 99, 235, 0.15);
      margin-bottom: 25px;
      color: #2563eb;
      font-size: 0.75rem;
      font-weight: 800;
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    .contact-hero-title {
      font-size: clamp(2.6rem, 5vw, 4rem);
      font-weight: 900;
      line-height: 1.15;
      letter-spacing: -1.5px;
      margin-bottom: 20px;
      color: #0f172a;
    }

    .contact-hero-title span {
      background: linear-gradient(135deg, #dc2626 0%, #2563eb 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .contact-hero-desc {
      font-size: 1.15rem;
      line-height: 1.6;
      color: #475569;
      max-width: 650px;
      margin: 0 auto;
    }

    /* Main Section Layout */
    .contact-main {
      padding: 100px 0;
      background: #ffffff;
    }

    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1.1fr;
      gap: 60px;
      align-items: start;
    }

    @media (max-width: 968px) {
      .contact-grid {
        grid-template-columns: 1fr;
        gap: 50px;
      }
    }

    /* Left Column Styling */
    .contact-info-card {
      background: #ffffff;
      border: 1px solid rgba(37, 99, 235, 0.12);
      border-radius: 28px;
      padding: 50px 40px;
      color: #0f172a;
      box-shadow: 0 15px 35px rgba(15, 23, 42, 0.04);
      position: relative;
      overflow: hidden;
    }

    .contact-info-card::before {
      content: '';
      position: absolute;
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, rgba(37, 99, 235, 0.05) 0%, transparent 70%);
      bottom: -150px;
      right: -150px;
      pointer-events: none;
    }

    .contact-info-title {
      font-size: 1.8rem;
      font-weight: 850;
      margin-bottom: 15px;
      letter-spacing: -0.5px;
      color: #0f172a;
    }

    .contact-info-subtitle {
      color: #475569;
      font-size: 1.02rem;
      line-height: 1.6;
      margin-bottom: 45px;
    }

    .contact-channel {
      display: flex;
      gap: 20px;
      margin-bottom: 30px;
      align-items: flex-start;
      transition: transform 0.3s ease;
    }

    .contact-channel:hover {
      transform: translateX(5px);
    }

    .contact-channel-icon {
      width: 46px;
      height: 46px;
      border-radius: 12px;
      background: rgba(37, 99, 235, 0.08);
      color: #2563eb;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .contact-channel-details h5 {
      font-size: 0.85rem;
      font-weight: 800;
      color: #2563eb;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-bottom: 6px;
    }

    .contact-channel-details p {
      font-size: 1.15rem;
      font-weight: 700;
      color: #0f172a;
      margin: 0;
    }

    .contact-channel-details a {
      color: #0f172a;
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .contact-channel-details a:hover {
      color: #2563eb;
    }

    /* Hours Block */
    .hours-block {
      border-top: 1px solid rgba(37, 99, 235, 0.12);
      margin-top: 40px;
      padding-top: 35px;
    }

    .hours-title {
      font-size: 0.85rem;
      font-weight: 800;
      color: #2563eb;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-bottom: 15px;
    }

    .hours-row {
      display: flex;
      justify-content: space-between;
      font-size: 0.95rem;
      margin-bottom: 10px;
      color: #475569;
    }

    .hours-row span:last-child {
      font-weight: 700;
      color: #0f172a;
    }

    /* Form Column Styling */
    .contact-form-wrapper {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 28px;
      padding: 50px;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.02);
    }

    @media (max-width: 480px) {
      .contact-form-wrapper {
        padding: 35px 20px;
      }
    }

    .form-title {
      font-size: 2rem;
      font-weight: 850;
      margin-bottom: 10px;
      letter-spacing: -0.5px;
      color: #0f172a;
    }

    .form-subtitle {
      font-size: 0.98rem;
      color: #64748b;
      margin-bottom: 40px;
    }

    .form-group {
      margin-bottom: 24px;
      position: relative;
    }

    .form-label {
      display: block;
      font-size: 0.85rem;
      font-weight: 800;
      color: #475569;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 8px;
    }

    .form-input {
      width: 100%;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 16px 20px;
      font-size: 1rem;
      color: #0f172a;
      transition: all 0.3s ease;
      font-family: inherit;
      box-sizing: border-box;
    }

    .form-input:focus {
      outline: none;
      border-color: #dc2626;
      background: #ffffff;
      box-shadow: 0 0 0 4px rgba(220, 38, 38, 0.1);
    }

    .form-textarea {
      resize: none;
      min-height: 120px;
    }

    /* Why Us Checklist in Contact */
    .contact-why-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-top: 45px;
      border-top: 1px solid rgba(37, 99, 235, 0.12);
      padding-top: 35px;
    }

    @media (max-width: 480px) {
      .contact-why-grid {
        grid-template-columns: 1fr;
      }
    }

    .contact-why-item {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.9rem;
      font-weight: 700;
      color: #475569;
    }

    .contact-why-dot {
      width: 6px;
      height: 6px;
      background: #2563eb;
      border-radius: 50%;
      box-shadow: 0 0 6px #2563eb;
    }

    /* Map & Visit Section */
    .sec-visit-office {
      padding: 100px 0 120px;
      background: #f8fafc;
      border-top: 1px solid #e2e8f0;
    }

    .visit-card {
      background: #ffffff;
      border: 1px solid rgba(226, 232, 240, 0.8);
      border-radius: 32px;
      padding: 60px;
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 60px;
      align-items: center;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.015);
    }

    @media (max-width: 968px) {
      .visit-card {
        grid-template-columns: 1fr;
        padding: 40px 30px;
        gap: 40px;
      }
    }

    .visit-map-mock {
      background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
      border-radius: 24px;
      height: 300px;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border: 1px solid rgba(37, 99, 235, 0.1);
    }

    .visit-map-mock::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, transparent 80%);
      pointer-events: none;
    }

    .visit-map-pin {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #991b1b;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
      animation: float-pin 3s ease-in-out infinite;
      z-index: 2;
      margin-bottom: 15px;
    }

    @keyframes float-pin {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }

    .whatsapp-sticky {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #25d366;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 10px 25px rgba(37, 211, 102, 0.4);
      z-index: 100;
      transition: all 0.3s ease;
      text-decoration: none;
    }

    .whatsapp-sticky:hover {
      transform: scale(1.08) translateY(-3px);
      box-shadow: 0 15px 30px rgba(37, 211, 102, 0.5);
    }
  `;
  container.appendChild(styleTag);

  // 1. HERO SECTION
  const heroSec = document.createElement('header');
  heroSec.className = 'contact-hero';
  heroSec.innerHTML = `
    <div class="container">
      <div class="contact-hero-badge">Contact Desk</div>
      <h1 class="contact-hero-title">Let's Discuss Your <span>Farming Needs</span></h1>
      <p class="contact-hero-desc">
        Our agricultural machinery experts are ready to help you find the right equipment, spare parts, or service solution for your operation.
      </p>
    </div>
  `;

  // 2. MAIN SECTION
  const mainSec = document.createElement('section');
  mainSec.className = 'contact-main';
  mainSec.innerHTML = `
    <div class="container contact-grid">
      <!-- Left Column: Contact Cards -->
      <div class="contact-info-card">
        <h2 class="contact-info-title">We're Here to Help</h2>
        <p class="contact-info-subtitle">
          Whether you need a new tractor, spare parts, maintenance service, or expert advice — our team is ready to assist you.
        </p>

        <div class="contact-channel">
          <div class="contact-channel-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </div>
          <div class="contact-channel-details">
            <h5>Sales Hotline</h5>
            <p style="display: flex; flex-direction: column; gap: 4px;">
              <a href="tel:+2348099933644">+234 809 993 3644</a>
              <a href="tel:+2348038074309">+234 803 807 4309</a>
            </p>
          </div>
        </div>

        <div class="contact-channel">
          <div class="contact-channel-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </div>
          <div class="contact-channel-details">
            <h5>Spare-parts Hotline</h5>
            <p><a href="tel:+2348026487775">+234 802 648 7775</a></p>
          </div>
        </div>

        <div class="contact-channel">
          <div class="contact-channel-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </div>
          <div class="contact-channel-details">
            <h5>Management Hotline</h5>
            <p><a href="tel:+2347034528752">+234 703 452 8752</a></p>
          </div>
        </div>

        <div class="contact-channel">
          <div class="contact-channel-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </div>
          <div class="contact-channel-details">
            <h5>Email Strategy</h5>
            <p><a href="mailto:sankaranigerialimited@gmail.com">sankaranigerialimited@gmail.com</a></p>
          </div>
        </div>

        <div class="contact-channel">
          <div class="contact-channel-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <div class="contact-channel-details">
            <h5>Head Office Location</h5>
            <p><a href="https://maps.app.goo.gl/tkP6Bmp7WNF2BaVJ8" target="_blank">Gadon Kaya, Kano, Nigeria</a></p>
          </div>
        </div>

        <div class="hours-block">
          <h4 class="hours-title">Working Hours</h4>
          <div class="hours-row">
            <span>Monday – Friday</span>
            <span>8:00 AM – 6:00 PM</span>
          </div>
          <div class="hours-row">
            <span>Saturday</span>
            <span>9:00 AM – 4:00 PM</span>
          </div>
          <div class="hours-row">
            <span>Sunday</span>
            <span>Closed</span>
          </div>
        </div>

        <div class="hours-block" style="margin-top: 30px; padding-top: 25px;">
          <h4 class="hours-title">Follow Us</h4>
          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <a href="https://tinyurl.com/3u7ht39v" target="_blank" style="padding: 8px 14px; background: rgba(59, 130, 246, 0.12); border-radius: 8px; color: #3b82f6; font-weight: 700; text-decoration: none; font-size: 0.8rem; transition: background 0.2s;" onmouseover="this.style.background='rgba(59, 130, 246, 0.25)'" onmouseout="this.style.background='rgba(59, 130, 246, 0.12)'" title="Facebook">Facebook</a>
            <a href="https://tinyurl.com/529wxjbh" target="_blank" style="padding: 8px 14px; background: rgba(59, 130, 246, 0.12); border-radius: 8px; color: #3b82f6; font-weight: 700; text-decoration: none; font-size: 0.8rem; transition: background 0.2s;" onmouseover="this.style.background='rgba(59, 130, 246, 0.25)'" onmouseout="this.style.background='rgba(59, 130, 246, 0.12)'" title="Instagram">Instagram</a>
            <a href="https://tinyurl.com/2vx447h9" target="_blank" style="padding: 8px 14px; background: rgba(59, 130, 246, 0.12); border-radius: 8px; color: #3b82f6; font-weight: 700; text-decoration: none; font-size: 0.8rem; transition: background 0.2s;" onmouseover="this.style.background='rgba(59, 130, 246, 0.25)'" onmouseout="this.style.background='rgba(59, 130, 246, 0.12)'" title="Twitter">Twitter</a>
            <a href="https://tinyurl.com/yc3rknhx" target="_blank" style="padding: 8px 14px; background: rgba(59, 130, 246, 0.12); border-radius: 8px; color: #3b82f6; font-weight: 700; text-decoration: none; font-size: 0.8rem; transition: background 0.2s;" onmouseover="this.style.background='rgba(59, 130, 246, 0.25)'" onmouseout="this.style.background='rgba(59, 130, 246, 0.12)'" title="TikTok">TikTok</a>
            <a href="https://tinyurl.com/yc3tfjmc" target="_blank" style="padding: 8px 14px; background: rgba(59, 130, 246, 0.12); border-radius: 8px; color: #3b82f6; font-weight: 700; text-decoration: none; font-size: 0.8rem; transition: background 0.2s;" onmouseover="this.style.background='rgba(59, 130, 246, 0.25)'" onmouseout="this.style.background='rgba(59, 130, 246, 0.12)'" title="YouTube">YouTube</a>
            <a href="https://www.linkedin.com/in/sankaranigerialimited" target="_blank" style="padding: 8px 14px; background: rgba(59, 130, 246, 0.12); border-radius: 8px; color: #3b82f6; font-weight: 700; text-decoration: none; font-size: 0.8rem; transition: background 0.2s;" onmouseover="this.style.background='rgba(59, 130, 246, 0.25)'" onmouseout="this.style.background='rgba(59, 130, 246, 0.12)'" title="LinkedIn">LinkedIn</a>
          </div>
        </div>

        <div class="contact-why-grid">
          <div class="contact-why-item">
            <span class="contact-why-dot"></span>
            40+ Years Expertise
          </div>
          <div class="contact-why-item">
            <span class="contact-why-dot"></span>
            Genuine OEM Parts
          </div>
          <div class="contact-why-item">
            <span class="contact-why-dot"></span>
            Nationwide Delivery
          </div>
          <div class="contact-why-item">
            <span class="contact-why-dot"></span>
            Certified Tech Support
          </div>
        </div>
      </div>

      <!-- Right Column: Interactive Form Card -->
      <div class="contact-form-wrapper">
        <h2 class="form-title">Send Us a Message</h2>
        <p class="form-subtitle">We'll respond within 24 business hours</p>

        <form id="contact-v2-form-modern">
          <div class="form-group">
            <label class="form-label" for="contact-name">Full Name *</label>
            <input type="text" id="contact-name" name="name" class="form-input" placeholder="John Doe" required>
          </div>

          <div class="form-group">
            <label class="form-label" for="contact-email">Email Address *</label>
            <input type="email" id="contact-email" name="email" class="form-input" placeholder="you@example.com" required>
          </div>

          <div class="form-group">
            <label class="form-label" for="contact-phone">Phone Number</label>
            <input type="text" id="contact-phone" name="phone" class="form-input" placeholder="+234 xxx xxx xxxx">
          </div>

          <div class="form-group">
            <label class="form-label" for="contact-subject">Subject *</label>
            <input type="text" id="contact-subject" name="subject" class="form-input" placeholder="e.g. Tractor Inquiry" required>
          </div>

          <div class="form-group">
            <label class="form-label" for="contact-message">Message *</label>
            <textarea id="contact-message" name="message" class="form-input form-textarea" placeholder="Tell us about your requirements — machinery type, farm size, location, or any specific questions..." required></textarea>
          </div>

          <button type="submit" id="submit-btn-modern" class="btn-main-green" style="width: 100%; border: none; padding: 18px; border-radius: 14px; font-size: 1.05rem; font-weight: 800; cursor: pointer; background: #2563eb; color: #ffffff; box-shadow: 0 4px 20px rgba(37,99,235,0.25);">
            Send Inquiry
          </button>
        </form>

        <div style="margin-top: 30px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 12px;">
          <span style="font-size: 0.85rem; color: #64748b; font-weight: 700; display: block; text-transform: uppercase; letter-spacing: 1px;">Or Connect Instantly</span>
          <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
            <a href="https://wa.me/2348099933644" target="_blank" class="btn-main-outline" style="display: inline-flex; align-items: center; gap: 10px; border-color: #25d366; color: #25d366; text-decoration: none; padding: 12px 25px; border-radius: 12px; font-weight: 800; font-size: 0.95rem;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.386 9.805-9.778.002-2.611-1.011-5.067-2.855-6.913-1.845-1.845-4.298-2.857-6.911-2.858-5.406 0-9.808 4.387-9.81 9.782-.001 1.9.49 3.5 1.46 5.097l-.97 3.546 3.656-.957z"/></svg>
              Chat Sales 1
            </a>
            <a href="https://wa.me/2348038074309" target="_blank" class="btn-main-outline" style="display: inline-flex; align-items: center; gap: 10px; border-color: #25d366; color: #25d366; text-decoration: none; padding: 12px 25px; border-radius: 12px; font-weight: 800; font-size: 0.95rem;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.386 9.805-9.778.002-2.611-1.011-5.067-2.855-6.913-1.845-1.845-4.298-2.857-6.911-2.858-5.406 0-9.808 4.387-9.81 9.782-.001 1.9.49 3.5 1.46 5.097l-.97 3.546 3.656-.957z"/></svg>
              Chat Sales 2
            </a>
          </div>
        </div>
      </div>
    </div>
  `;

  // 3. MAP SECTION
  const mapSec = document.createElement('section');
  mapSec.className = 'sec-visit-office';
  mapSec.innerHTML = `
    <div class="container">
      <div class="visit-card">
        <div>
          <span class="section-badge">Visit Our Office</span>
          <h3 class="section-title" style="text-align: left; font-size: 1.8rem; margin-bottom: 20px;">Welcome to Our Kano Headquarters</h3>
          <p style="color: #475569; font-size: 1.05rem; line-height: 1.7; margin-bottom: 30px;">
            Located in Gadon Kaya, Kano, Nigeria — serving farmers, co-operatives, and agribusiness fleets across all 36 states of the federation.
          </p>
          <a href="https://maps.app.goo.gl/tkP6Bmp7WNF2BaVJ8" target="_blank" class="btn-main-green" style="display: inline-block;">Get Directions on Google Maps</a>
        </div>
        <div class="visit-map-mock">
          <div class="visit-map-pin">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <span style="color: #0f172a; font-size: 0.95rem; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; position: relative; z-index: 2;">Sankara Nigeria Ltd</span>
          <span style="color: #475569; font-size: 0.8rem; font-weight: 600; margin-top: 5px; position: relative; z-index: 2;">Kano, Nigeria</span>
        </div>
      </div>
    </div>
  `;

  // WhatsApp Floating Button
  const waFloating = document.createElement('a');
  waFloating.className = 'whatsapp-sticky';
  waFloating.href = "https://wa.me/2348099933644?text=Hello%2C%20I'm%20interested%20in%20your%20agricultural%20machinery%20products.";
  waFloating.target = "_blank";
  waFloating.innerHTML = `<svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.386 9.805-9.778.002-2.611-1.011-5.067-2.855-6.913-1.845-1.845-4.298-2.857-6.911-2.858-5.406 0-9.808 4.387-9.81 9.782-.001 1.9.49 3.5 1.46 5.097l-.97 3.546 3.656-.957z"/></svg>`;

  // Assemble Page
  container.appendChild(renderNavbar());
  container.appendChild(heroSec);
  container.appendChild(mainSec);
  container.appendChild(mapSec);
  container.appendChild(waFloating);
  container.appendChild(renderFooter());

  // Form Submission Logic
  const form = mainSec.querySelector('#contact-v2-form-modern');
  const submitBtn = mainSec.querySelector('#submit-btn-modern');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = 'Transmitting inquiry...';

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert('Transmission successful. An executive will follow up shortly.');
        form.reset();
      } else {
        throw new Error('Failed to send');
      }
    } catch (err) {
      alert('Transmission error. Check technical connectivity.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Inquiry';
    }
  });

  // Setup click listeners for routing
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
