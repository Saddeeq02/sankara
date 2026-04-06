export function renderNavbar() {
  const nav = document.createElement('nav');
  nav.className = 'glass-navbar';
  nav.innerHTML = `
    <div class="container" style="display: flex; justify-content: space-between; align-items: center; padding: 15px 20px;">
      <a href="/" data-route="home" class="logo" style="display: flex; align-items: center; text-decoration: none;">
        <img src="/assets/logo.png" alt="Sankara Nigeria Limited Logo" style="height: 45px; object-fit: contain;">
      </a>
      <ul style="display: flex; gap: 20px; list-style: none; align-items: center; margin: 0;">
        <li><a href="/" data-route="home" style="text-decoration: none; color: var(--text-main); font-weight: 500;">Home</a></li>
        <li><a href="#about" data-route="about" style="text-decoration: none; color: var(--text-main); font-weight: 500;">About</a></li>
        <li><a href="/products" data-route="products" style="text-decoration: none; color: var(--text-main); font-weight: 500;">Products</a></li>
        <li><a href="/services" data-route="services" style="text-decoration: none; color: var(--text-main); font-weight: 500;">Services</a></li>
        <li><a href="/gallery" data-route="gallery" style="text-decoration: none; color: var(--text-main); font-weight: 500;">Gallery</a></li>
        <li><a href="/activities" data-route="activities" style="text-decoration: none; color: var(--text-main); font-weight: 500;">Activities</a></li>
        <li><a href="/portfolio" data-route="portfolio" style="text-decoration: none; color: var(--text-main); font-weight: 500;">Portfolio</a></li>
        <li><a href="/contact" data-route="contact" class="btn-primary">Contact</a></li>
        <li>
          <button id="theme-toggle" style="background: none; border: none; cursor: pointer; font-size: 1.5rem; display: flex; align-items: center; justify-content: center; padding: 5px; color: var(--text-main);">
            🌙
          </button>
        </li>
      </ul>
    </div>
  `;

  const toggleBtn = nav.querySelector('#theme-toggle');
  const currentTheme = localStorage.getItem('theme') || 'light';
  if (currentTheme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
  toggleBtn.innerHTML = currentTheme === 'dark' ? '☀️' : '🌙';

  toggleBtn.onclick = () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    toggleBtn.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
  };

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
          <a href="/" data-route="home" style="display: inline-block; margin-bottom: 20px;">
            <img src="/assets/logo.png" alt="Sankara Logo" style="height: 45px; object-fit: contain;">
          </a>
          <p style="color: var(--footer-link); font-size: 0.95rem; line-height: 1.6; margin-bottom: 30px;">
            Sankara Nigeria Limited is your trusted partner for premium heavy-duty tractors, farm implements, and genuine spare parts across Nigeria.
          </p>
          <div style="display: flex; gap: 15px;">
            <div style="width: 40px; height: 40px; background: rgba(255,255,255,0.05); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: bold; cursor: pointer; transition: background 0.3s;" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='rgba(255,255,255,0.05)'">f</div>
            <div style="width: 40px; height: 40px; background: rgba(255,255,255,0.05); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: bold; cursor: pointer; transition: background 0.3s;" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='rgba(255,255,255,0.05)'">ig</div>
            <div style="width: 40px; height: 40px; background: rgba(255,255,255,0.05); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: bold; cursor: pointer; transition: background 0.3s;" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='rgba(255,255,255,0.05)'">tw</div>
            <div style="width: 40px; height: 40px; background: rgba(255,255,255,0.05); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: bold; cursor: pointer; transition: background 0.3s;" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='rgba(255,255,255,0.05)'">in</div>
          </div>
        </div>

        <!-- Column 2: Company -->
        <div class="reveal" style="animation-delay: 0.2s">
          <h4 style="margin-bottom: 25px; font-size: 1.1rem; font-weight: 600;">Company</h4>
          <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 15px;">
            <li><a href="#about" data-route="about" style="color: var(--footer-link); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--primary-color)'" onmouseout="this.style.color='var(--footer-link)'">About Us</a></li>
            <li><a href="/services" data-route="services" style="color: var(--footer-link); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--primary-color)'" onmouseout="this.style.color='var(--footer-link)'">Services</a></li>
            <li><a href="/products" data-route="products" style="color: var(--footer-link); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--primary-color)'" onmouseout="this.style.color='var(--footer-link)'">Products</a></li>
            <li><a href="/contact" data-route="contact" style="color: var(--footer-link); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--primary-color)'" onmouseout="this.style.color='var(--footer-link)'">Contact</a></li>
          </ul>
        </div>
        <!-- Column 3: Products -->
        <div class="reveal" style="animation-delay: 0.3s">
          <h4 style="margin-bottom: 25px; font-size: 1.1rem; font-weight: 600;">Products</h4>
          <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 15px;">
            <li><a href="/products" data-route="products" style="color: var(--footer-link); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--primary-color)'" onmouseout="this.style.color='var(--footer-link)'">Massey Ferguson Tractors</a></li>
            <li><a href="/products" data-route="products" style="color: var(--footer-link); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--primary-color)'" onmouseout="this.style.color='var(--footer-link)'">Lovol Tractors</a></li>
            <li><a href="/products" data-route="products" style="color: var(--footer-link); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--primary-color)'" onmouseout="this.style.color='var(--footer-link)'">Zoomlion Tractors</a></li>
            <li><a href="/products" data-route="products" style="color: var(--footer-link); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--primary-color)'" onmouseout="this.style.color='var(--footer-link)'">Farm Implements</a></li>
            <li><a href="/products" data-route="products" style="color: var(--footer-link); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--primary-color)'" onmouseout="this.style.color='var(--footer-link)'">Spare Parts</a></li>
          </ul>
        </div>

        <!-- Column 4: Contact Us -->
        <div class="reveal" style="animation-delay: 0.4s">
          <h4 style="margin-bottom: 25px; font-size: 1.1rem; font-weight: 600;">Contact Us</h4>
          <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 15px; color: var(--footer-link);">
            <li style="display: flex; gap: 10px; align-items: center;">📞 Sales: +234 809 993 3644</li>
            <li style="display: flex; gap: 10px; align-items: center;">📞 Parts: +234 802 648 7775</li>
            <li style="display: flex; gap: 10px; align-items: center;">✉️ sankaranigerialimited@gmail.com</li>
            <li style="display: flex; gap: 10px; align-items: center;">📍 Nigeria</li>
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
