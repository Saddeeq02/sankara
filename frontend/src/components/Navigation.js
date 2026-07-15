export function renderNavbar() {
  const nav = document.createElement('nav');
  nav.className = 'glass-navbar';
  nav.innerHTML = `
    <div class="container nav-row">
      <a href="/home" data-route="home" class="logo">
        <img src="/assets/logo.png" alt="Sankara Logo" class="nav-logo">
      </a>
      
      <!-- Hamburger Toggle -->
      <div class="hamburger" id="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <!-- Navigation Menu Wrapper -->
      <div class="nav-menu-wrapper" id="nav-menu">
        <div class="mobile-nav-header">
          <img src="/assets/logo.png" alt="Sankara Logo" style="height: 50px; object-fit: contain;">
        </div>
        <ul class="nav-links">
          <li><a href="/home" data-route="home" class="nav-link-item">Home</a></li>
          <li><a href="/about" data-route="about" class="nav-link-item">About Us</a></li>
          <li><a href="/product" data-route="products" class="nav-link-item">Products</a></li>
          <li><a href="/service" data-route="services" class="nav-link-item">Services</a></li>
          <li><a href="/gallery" data-route="gallery" class="nav-link-item">Gallery</a></li>
          <li><a href="/activities" data-route="activities" class="nav-link-item">Activities</a></li>
        </ul>
        <div class="nav-actions">
          <a href="/contact" data-route="contact" class="btn-primary contact-nav-btn" style="padding: 10px 24px; font-size: 0.9rem; text-decoration: none; border-radius: 50px;">Contact Us</a>
        </div>
      </div>
    </div>
  `;

  const toggle = nav.querySelector('#nav-toggle');
  const menu = nav.querySelector('#nav-menu');

  // Mobile Menu Toggle
  toggle.onclick = () => {
    menu.classList.toggle('mobile-active');
    toggle.classList.toggle('toggle-active');
  };

  // Close menu when clicking a link or button
  menu.querySelectorAll('a, button').forEach(link => {
    link.onclick = (e) => {
      menu.classList.remove('mobile-active');
      toggle.classList.remove('toggle-active');
    }
  });

  // Apply saved theme preference silently
  const currentTheme = localStorage.getItem('theme') || 'light';
  if (currentTheme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');

  return nav;
}

export function renderFooter() {
  const footer = document.createElement('footer');
  footer.className = 'premium-footer';
  
  // Inject style block
  const styleBlock = document.createElement('style');
  styleBlock.textContent = `
    .premium-footer {
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%) !important;
      color: #475569 !important;
      padding: 90px 0 45px 0;
      position: relative;
      overflow: hidden;
      border-top: 1px solid rgba(220, 38, 38, 0.1);
      font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
    }
    .premium-footer::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.2), transparent);
    }
    .footer-col-title {
      font-size: 1.15rem;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 25px;
      position: relative;
      padding-bottom: 12px;
      letter-spacing: 0.5px;
    }
    .footer-col-title::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 35px;
      height: 3px;
      background: linear-gradient(90deg, #dc2626, #2563eb);
      border-radius: 50px;
    }
    .footer-links-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .footer-link-item {
      color: #475569;
      text-decoration: none;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.95rem;
    }
    .footer-link-item:hover {
      color: #dc2626;
      transform: translateX(6px);
    }
    .footer-social-btn {
      width: 40px;
      height: 40px;
      background: #ffffff;
      border: 1px solid rgba(0, 0, 0, 0.08);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #475569;
      text-decoration: none;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .footer-social-btn:hover {
      background: rgba(220, 38, 38, 0.05);
      border-color: #dc2626;
      color: #dc2626;
      transform: translateY(-4px);
      box-shadow: 0 8px 20px rgba(220, 38, 38, 0.15);
    }
    .footer-contact-item {
      display: flex;
      gap: 12px;
      align-items: flex-start;
      margin-bottom: 20px;
    }
    .footer-contact-icon {
      color: #dc2626;
      flex-shrink: 0;
      margin-top: 3px;
    }
    .footer-contact-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .footer-contact-label {
      font-weight: 800;
      color: #0f172a;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }
    .footer-contact-value {
      color: #475569;
      text-decoration: none;
      transition: color 0.2s ease;
      font-size: 0.95rem;
    }
    .footer-contact-value:hover {
      color: #dc2626;
    }
    .footer-bottom-bar {
      border-top: 1px solid rgba(0, 0, 0, 0.06);
      padding-top: 35px;
      margin-top: 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #64748b;
      font-size: 0.9rem;
      flex-wrap: wrap;
      gap: 20px;
    }
    .footer-bottom-links {
      display: flex;
      gap: 25px;
    }
    .footer-bottom-link {
      color: #64748b;
      text-decoration: none;
      transition: color 0.2s ease;
    }
    .footer-bottom-link:hover {
      color: #dc2626;
    }
  `;
  footer.appendChild(styleBlock);

  footer.innerHTML += `
    <div class="container">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 40px; margin-bottom: 60px;">
        <!-- Column 1: Info and Socials -->
        <div class="reveal" style="animation-delay: 0.1s">
          <a href="/home" data-route="home" style="display: inline-flex; background: #ffffff; border: 1px solid rgba(0, 0, 0, 0.05); padding: 10px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); margin-bottom: 25px;">
            <img src="/assets/logo.png" alt="Sankara Logo" style="height: 50px; object-fit: contain;">
          </a>
          <p style="color: #475569; font-size: 0.95rem; line-height: 1.6; margin-bottom: 30px;">
            Sankara Nigeria Limited is your trusted partner for premium heavy-duty tractors, farm implements, and genuine spare parts across Nigeria.
          </p>
          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <a href="https://tinyurl.com/3u7ht39v" target="_blank" class="footer-social-btn" title="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://tinyurl.com/529wxjbh" target="_blank" class="footer-social-btn" title="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="https://tinyurl.com/2vx447h9" target="_blank" class="footer-social-btn" title="Twitter">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://tinyurl.com/yc3rknhx" target="_blank" class="footer-social-btn" title="TikTok">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
            </a>
            <a href="https://tinyurl.com/yc3tfjmc" target="_blank" class="footer-social-btn" title="YouTube">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/sankaranigerialimited" target="_blank" class="footer-social-btn" title="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>

        <!-- Column 2: Company -->
        <div class="reveal" style="animation-delay: 0.2s">
          <h4 class="footer-col-title">Company</h4>
          <ul class="footer-links-list">
            <li><a href="/about" data-route="about" class="footer-link-item"><svg width="6" height="10" viewBox="0 0 6 10" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 9l4-4-4-4"/></svg> About Us</a></li>
            <li><a href="/service" data-route="services" class="footer-link-item"><svg width="6" height="10" viewBox="0 0 6 10" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 9l4-4-4-4"/></svg> Services</a></li>
            <li><a href="/product" data-route="products" class="footer-link-item"><svg width="6" height="10" viewBox="0 0 6 10" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 9l4-4-4-4"/></svg> Products</a></li>
            <li><a href="/contact" data-route="contact" class="footer-link-item"><svg width="6" height="10" viewBox="0 0 6 10" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 9l4-4-4-4"/></svg> Contact Us</a></li>
          </ul>
        </div>

        <!-- Column 3: Products -->
        <div class="reveal" style="animation-delay: 0.3s">
          <h4 class="footer-col-title">Products</h4>
          <ul class="footer-links-list">
            <li><a href="/product" data-route="products" class="footer-link-item"><svg width="6" height="10" viewBox="0 0 6 10" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 9l4-4-4-4"/></svg> Massey Ferguson</a></li>
            <li><a href="/product" data-route="products" class="footer-link-item"><svg width="6" height="10" viewBox="0 0 6 10" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 9l4-4-4-4"/></svg> Lovol Tractors</a></li>
            <li><a href="/product" data-route="products" class="footer-link-item"><svg width="6" height="10" viewBox="0 0 6 10" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 9l4-4-4-4"/></svg> Zoomlion Tractors</a></li>
            <li><a href="/product" data-route="products" class="footer-link-item"><svg width="6" height="10" viewBox="0 0 6 10" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 9l4-4-4-4"/></svg> Farm Implements</a></li>
            <li><a href="/product" data-route="products" class="footer-link-item"><svg width="6" height="10" viewBox="0 0 6 10" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 9l4-4-4-4"/></svg> Spare Parts</a></li>
          </ul>
        </div>

        <!-- Column 4: Contact Us -->
        <div class="reveal" style="animation-delay: 0.4s">
          <h4 class="footer-col-title">Contact Us</h4>
          
          <div class="footer-contact-item">
            <div class="footer-contact-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <div class="footer-contact-info">
              <span class="footer-contact-label">Sales Desk</span>
              <a href="tel:+2348099933644" class="footer-contact-value">+234 809 993 3644</a>
              <a href="tel:+2348038074309" class="footer-contact-value">+234 803 807 4309</a>
            </div>
          </div>

          <div class="footer-contact-item">
            <div class="footer-contact-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <div class="footer-contact-info">
              <span class="footer-contact-label">Spare Parts</span>
              <a href="tel:+2348026487775" class="footer-contact-value">+234 802 648 7775</a>
            </div>
          </div>

          <div class="footer-contact-item">
            <div class="footer-contact-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 .7 2.81A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <div class="footer-contact-info">
              <span class="footer-contact-label">Management</span>
              <a href="tel:+2347034528752" class="footer-contact-value">+234 703 452 8752</a>
            </div>
          </div>

          <div class="footer-contact-item">
            <div class="footer-contact-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <div class="footer-contact-info">
              <span class="footer-contact-label">Email Strategy</span>
              <a href="mailto:sankaranigerialimited@gmail.com" class="footer-contact-value" style="word-break: break-all;">sankaranigerialimited@gmail.com</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Copyright Bottom Bar -->
      <div class="footer-bottom-bar reveal" style="animation-delay: 0.5s;">
        <div>© 2026 Sankara Nigeria Limited. All rights reserved.</div>
        <div class="footer-bottom-links">
          <a href="#" class="footer-bottom-link">Privacy Policy</a>
          <a href="#" class="footer-bottom-link">Terms of Service</a>
        </div>
      </div>
    </div>
  `;
  
  // Need to wait for DOM insertion for intersections to compute
  setTimeout(() => {
    if (window.initAnimations) {
      window.initAnimations();
    }
  }, 100);

  return footer;
}
