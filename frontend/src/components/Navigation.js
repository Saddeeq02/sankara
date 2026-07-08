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
  footer.style.backgroundColor = 'var(--footer-bg)'; 
  footer.style.color = 'var(--footer-text)';
  footer.style.padding = '80px 0 30px 0';
  footer.style.transition = 'background-color var(--transition-speed)';
  
  footer.innerHTML = `
    <div class="container">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px; margin-bottom: 60px;">
        <!-- Column 1: Info and Socials -->
        <div class="reveal" style="animation-delay: 0.1s">
          <a href="/home" data-route="home" style="display: inline-block; margin-bottom: 20px;">
            <img src="/assets/logo.png" alt="Sankara Logo" style="height: 60px; object-fit: contain;">
          </a>
          <p style="color: var(--footer-link); font-size: 0.95rem; line-height: 1.6; margin-bottom: 30px;">
            Sankara Nigeria Limited is your trusted partner for premium heavy-duty tractors, farm implements, and genuine spare parts across Nigeria.
          </p>
          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <a href="https://tinyurl.com/3u7ht39v" target="_blank" style="width: 40px; height: 40px; background: rgba(255,255,255,0.05); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: bold; color: var(--footer-text); text-decoration: none; transition: background 0.3s;" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='rgba(255,255,255,0.05)'" title="Facebook">f</a>
            <a href="https://tinyurl.com/529wxjbh" target="_blank" style="width: 40px; height: 40px; background: rgba(255,255,255,0.05); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: bold; color: var(--footer-text); text-decoration: none; transition: background 0.3s;" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='rgba(255,255,255,0.05)'" title="Instagram">ig</a>
            <a href="https://tinyurl.com/2vx447h9" target="_blank" style="width: 40px; height: 40px; background: rgba(255,255,255,0.05); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: bold; color: var(--footer-text); text-decoration: none; transition: background 0.3s;" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='rgba(255,255,255,0.05)'" title="Twitter">tw</a>
            <a href="https://tinyurl.com/yc3rknhx" target="_blank" style="width: 40px; height: 40px; background: rgba(255,255,255,0.05); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: bold; color: var(--footer-text); text-decoration: none; transition: background 0.3s;" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='rgba(255,255,255,0.05)'" title="TikTok">tt</a>
            <a href="https://tinyurl.com/yc3tfjmc" target="_blank" style="width: 40px; height: 40px; background: rgba(255,255,255,0.05); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: bold; color: var(--footer-text); text-decoration: none; transition: background 0.3s;" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='rgba(255,255,255,0.05)'" title="YouTube">yt</a>
            <a href="https://www.linkedin.com/in/sankaranigerialimited" target="_blank" style="width: 40px; height: 40px; background: rgba(255,255,255,0.05); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: bold; color: var(--footer-text); text-decoration: none; transition: background 0.3s;" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='rgba(255,255,255,0.05)'" title="LinkedIn">in</a>
          </div>
        </div>

        <!-- Column 2: Company -->
        <div class="reveal" style="animation-delay: 0.2s">
          <h4 style="margin-bottom: 25px; font-size: 1.1rem; font-weight: 600;">Company</h4>
          <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 15px;">
            <li><a href="/about" data-route="about" style="color: var(--footer-link); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--primary-color)'" onmouseout="this.style.color='var(--footer-link)'">About Us</a></li>
            <li><a href="/service" data-route="services" style="color: var(--footer-link); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--primary-color)'" onmouseout="this.style.color='var(--footer-link)'">Services</a></li>
            <li><a href="/product" data-route="products" style="color: var(--footer-link); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--primary-color)'" onmouseout="this.style.color='var(--footer-link)'">Products</a></li>
            <li><a href="/contact" data-route="contact" style="color: var(--footer-link); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--primary-color)'" onmouseout="this.style.color='var(--footer-link)'">Contact</a></li>
          </ul>
        </div>
        <!-- Column 3: Products -->
        <div class="reveal" style="animation-delay: 0.3s">
          <h4 style="margin-bottom: 25px; font-size: 1.1rem; font-weight: 600;">Products</h4>
          <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 15px;">
            <li><a href="/product" data-route="products" style="color: var(--footer-link); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--primary-color)'" onmouseout="this.style.color='var(--footer-link)'">Massey Ferguson Tractors</a></li>
            <li><a href="/product" data-route="products" style="color: var(--footer-link); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--primary-color)'" onmouseout="this.style.color='var(--footer-link)'">Lovol Tractors</a></li>
            <li><a href="/product" data-route="products" style="color: var(--footer-link); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--primary-color)'" onmouseout="this.style.color='var(--footer-link)'">Zoomlion Tractors</a></li>
            <li><a href="/product" data-route="products" style="color: var(--footer-link); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--primary-color)'" onmouseout="this.style.color='var(--footer-link)'">Farm Implements</a></li>
            <li><a href="/product" data-route="products" style="color: var(--footer-link); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--primary-color)'" onmouseout="this.style.color='var(--footer-link)'">Spare Parts</a></li>
          </ul>
        </div>

        <!-- Column 4: Contact Us -->
        <div class="reveal" style="animation-delay: 0.4s">
          <h4 style="margin-bottom: 25px; font-size: 1.1rem; font-weight: 600;">Contact Us</h4>
          <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 12px; color: var(--footer-link); font-size: 0.9rem;">
            <li style="display: flex; gap: 4px; flex-direction: column;">
              <span style="font-weight: 700; color: var(--footer-text);">Sales Desk:</span>
              <a href="tel:+2348099933644" style="color: var(--footer-link); text-decoration: none;" onmouseover="this.style.color='var(--primary-color)'" onmouseout="this.style.color='var(--footer-link)'">+234 809 993 3644</a>
              <a href="tel:+2348038074309" style="color: var(--footer-link); text-decoration: none;" onmouseover="this.style.color='var(--primary-color)'" onmouseout="this.style.color='var(--footer-link)'">+234 803 807 4309</a>
            </li>
            <li style="display: flex; gap: 4px; flex-direction: column;">
              <span style="font-weight: 700; color: var(--footer-text);">Spare Parts:</span>
              <a href="tel:+2348026487775" style="color: var(--footer-link); text-decoration: none;" onmouseover="this.style.color='var(--primary-color)'" onmouseout="this.style.color='var(--footer-link)'">+234 802 648 7775</a>
            </li>
            <li style="display: flex; gap: 4px; flex-direction: column;">
              <span style="font-weight: 700; color: var(--footer-text);">Management:</span>
              <a href="tel:+2347034528752" style="color: var(--footer-link); text-decoration: none;" onmouseover="this.style.color='var(--primary-color)'" onmouseout="this.style.color='var(--footer-link)'">+234 703 452 8752</a>
            </li>
            <li style="display: flex; gap: 4px; flex-direction: column;">
              <span style="font-weight: 700; color: var(--footer-text);">Email:</span>
              <a href="mailto:sankaranigerialimited@gmail.com" style="color: var(--footer-link); text-decoration: none; word-break: break-all;" onmouseover="this.style.color='var(--primary-color)'" onmouseout="this.style.color='var(--footer-link)'">sankaranigerialimited@gmail.com</a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Copyright Bottom Bar -->
      <div class="reveal" style="border-top: 1px solid rgba(125,125,125,0.2); padding-top: 30px; display: flex; justify-content: space-between; align-items: center; color: var(--footer-link); font-size: 0.9rem; animation-delay: 0.5s;">
        <div>© 2026 Sankara Nigeria Limited. All rights reserved.</div>
        <div style="display: flex; gap: 20px;">
          <a href="#" style="color: var(--footer-link); text-decoration: none;">Privacy Policy</a>
          <a href="#" style="color: var(--footer-link); text-decoration: none;">Terms of Service</a>
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
