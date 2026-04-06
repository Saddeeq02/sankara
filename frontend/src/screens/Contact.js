import { renderNavbar, renderFooter } from '../components/Navigation';
import { Phone, Mail, MapPin, Send, HelpCircle, Globe, MessageSquare, Camera } from 'lucide-static';

export function renderContactScreen() {
  const container = document.createElement('div');
  container.className = 'bg-body'; // Theme-aware background
  container.style.color = 'var(--text-main)';

  // 1. Hero Section
  const hero = document.createElement('header');
  hero.style.padding = '180px 0 60px';
  hero.style.textAlign = 'center';
  hero.innerHTML = `
    <div class="container">
      <span class="reveal" style="color: var(--primary-color); font-weight: 800; text-transform: uppercase; letter-spacing: 4px; display: block; margin-bottom: 20px;">Contact</span>
      <p class="reveal" style="color: var(--text-muted); font-size: 1.1rem; opacity: 0.8;">for enquiry and Product Information</p>
    </div>
  `;

  // 2. Main Content Grid
  const contactSection = document.createElement('section');
  contactSection.style.padding = '40px 0 100px';
  contactSection.innerHTML = `
    <div class="container">
      <div class="contact-v2-grid">
        <!-- Left Side: Form Card -->
        <div class="reveal contact-glass-form">
          <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 40px; text-align: center;">
            <div style="width: 70px; height: 70px; background: var(--primary-color); border-radius: 20px; display: flex; align-items: center; justify-content: center; margin-bottom: 25px; box-shadow: 0 10px 30px rgba(0, 21, 91, 0.3);">
              ${MessageSquare}
            </div>
            <h2 style="font-size: 2.2rem; font-weight: 900; margin-bottom: 10px;">Direct Inquiry</h2>
            <p style="color: var(--text-muted); font-size: 1rem; line-height: 1.5; max-width: 300px;">
              Contact Sankara Nigeria Limited for Massey Ferguson tractors, implements, and genuine spare parts.
            </p>
          </div>

          <form id="contact-v2-form-modern" style="display: flex; flex-direction: column; gap: 20px;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
              <input type="text" name="name" placeholder="Your Name" required 
                style="background: var(--background-color); border: 1px solid var(--glass-border); padding: 15px 20px; border-radius: 12px; color: var(--text-main); font-family: inherit;">
              <input type="email" name="email" placeholder="Email Address" required
                style="background: var(--background-color); border: 1px solid var(--glass-border); padding: 15px 20px; border-radius: 12px; color: var(--text-main); font-family: inherit;">
            </div>
            <input type="text" name="subject" placeholder="Interested In (e.g. Tractors, Implements, Spares)"
              style="background: var(--background-color); border: 1px solid var(--glass-border); padding: 15px 20px; border-radius: 12px; color: var(--text-main); font-family: inherit;">
            <textarea name="message" placeholder="Describe your farm requirements..." rows="5"
              style="background: var(--background-color); border: 1px solid var(--glass-border); padding: 15px 20px; border-radius: 12px; color: var(--text-main); font-family: inherit; resize: none;"></textarea>
            
            <button type="submit" id="submit-btn-modern" class="btn-primary" 
              style="padding: 18px; border-radius: 15px; display: flex; align-items: center; justify-content: center; gap: 12px; font-size: 1.1rem; margin-top: 10px;">
              Send Message ${Send}
            </button>
          </form>
        </div>

        <!-- Right Side: Info -->
        <div class="reveal" style="padding-top: 20px; animation-delay: 0.2s;">
          <h2 style="font-size: 3rem; font-weight: 800; margin-bottom: 30px; line-height: 1.1;">Scale Your <span style="color: var(--primary-color);">Agricultural Success</span></h2>
          <p style="color: var(--text-muted); font-size: 1.1rem; line-height: 1.7; margin-bottom: 50px;">
            Sankara Nigeria Limited is your strategic partner for large-scale mechanization. 
            Connect with our technical desk to discuss machinery acquisition, statewide hubs, or genuine maintenance services.
          </p>

          <div class="contact-info-list" style="display: flex; flex-direction: column; gap: 15px;">
            <a href="mailto:sankaranigerialimited@gmail.com" class="contact-info-widget">
              <div style="color: var(--primary-color); opacity: 0.8;">${Mail}</div>
              <div>
                <h5 style="font-size: 1rem; font-weight: 800; margin-bottom: 4px; color: var(--text-main);">Email Strategy Desk</h5>
                <p style="color: var(--primary-color); font-weight: 600; font-size: 0.95rem;">sankaranigerialimited@gmail.com</p>
                <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 2px;">Consultation Response: 2-4 hours</p>
              </div>
            </a>

            <a href="https://wa.me/2348099933644" target="_blank" class="contact-info-widget">
              <div style="color: #25D366; opacity: 1;">${Phone}</div>
              <div>
                <h5 style="font-size: 1rem; font-weight: 800; margin-bottom: 4px; color: var(--text-main);">WhatsApp Connect</h5>
                <p style="color: #25D366; font-weight: 600; font-size: 0.95rem;">+234 809 993 3644</p>
                <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 2px;">Direct Instant Support</p>
              </div>
            </a>

            <a href="https://www.google.com/maps/search/?api=1&query=Sankara+Nigeria+Limited+Kano" target="_blank" class="contact-info-widget">
              <div style="color: var(--primary-color); opacity: 0.8;">${MapPin}</div>
              <div>
                <h5 style="font-size: 1rem; font-weight: 800; margin-bottom: 4px; color: var(--text-main);">Visit Our Office</h5>
                <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.4;">C21 Suite 1, First Floor Safiya House Zaria Road, Kano</p>
                <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 2px;">Click to navigate via GPS</p>
              </div>
            </a>
          </div>

          <div style="margin-top: 60px; text-align: center; border-bottom: none;">
             <p style="font-size: 0.9rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 25px; color: var(--text-muted);">Connect with Sankara</p>
             <div style="display: flex; gap: 15px; justify-content: center;">
                <div style="width: 45px; height: 45px; background: var(--surface-color); border: 1px solid var(--glass-border); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--text-muted); transition: all 0.3s;" class="social-icon">${Globe}</div>
                <div style="width: 45px; height: 45px; background: var(--surface-color); border: 1px solid var(--glass-border); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--text-muted); transition: all 0.3s;" class="social-icon">${Camera}</div>
                <div style="width: 45px; height: 45px; background: var(--surface-color); border: 1px solid var(--glass-border); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--text-muted); transition: all 0.3s;" class="social-icon">${Mail}</div>
             </div>
          </div>
        </div>
      </div>
    </div>
    
    <style>
      .social-icon:hover {
        background: var(--primary-color) !important;
        color: white !important;
        transform: translateY(-5px);
      }
      .bg-body {
        background-color: var(--background-color);
      }
    </style>
  `;

  // Attach form logic
  const form = contactSection.querySelector('#contact-v2-form-modern');
  const submitBtn = contactSection.querySelector('#submit-btn-modern');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = 'TRANSMITTING...';

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
      submitBtn.textContent = 'Send Message';
    }
  });

  container.appendChild(renderNavbar());
  container.appendChild(hero);
  container.appendChild(contactSection);
  container.appendChild(renderFooter());

  return container;
}
