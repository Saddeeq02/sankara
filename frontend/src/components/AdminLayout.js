import { LayoutDashboard, Package, MessageSquare, Image, Activity, LogOut, AlertTriangle } from 'lucide-static';

export function renderAdminLayout(contentElement, activeRoute) {
  const container = document.createElement('div');
  container.className = 'admin-container';

  // Toggle body class for admin styles
  document.body.classList.add('admin-mode');

  // 1. Sidebar
  const sidebar = document.createElement('aside');
  sidebar.className = 'admin-sidebar';
  
  const sidebarHeader = document.createElement('div');
  sidebarHeader.className = 'admin-sidebar-header';
  sidebarHeader.style.justifyContent = 'center';
  sidebarHeader.innerHTML = `<img src="/assets/logo.png" alt="Sankara Admin Logo" style="height: 40px; object-fit: contain;">`;
  
  const nav = document.createElement('nav');
  nav.className = 'admin-nav';
  nav.innerHTML = `
    <ul>
      <li><a href="/admin" data-route="admin-dashboard" class="${activeRoute === 'admin-dashboard' ? 'active' : ''}">${LayoutDashboard} Dashboard</a></li>
      <li><a href="/admin/products" data-route="admin-products" class="${activeRoute === 'admin-products' ? 'active' : ''}">${Package} Products</a></li>
      <li><a href="/admin/inquiries" data-route="admin-inquiries" class="${activeRoute === 'admin-inquiries' ? 'active' : ''}">${MessageSquare} Inquiries</a></li>
      <li><a href="/admin/content" data-route="admin-content" class="${activeRoute === 'admin-content' ? 'active' : ''}">${Image} Content</a></li>
      <li><a href="/admin/health" data-route="admin-health" class="${activeRoute === 'admin-health' ? 'active' : ''}">${Activity} System Health</a></li>
    </ul>
  `;

  // Append logout at bottom of nav
  const logoutContainer = document.createElement('div');
  logoutContainer.style.padding = '20px';
  logoutContainer.style.marginTop = 'auto';
  logoutContainer.innerHTML = `
    <button id="adminLogoutBtn" style="display: flex; align-items: center; color: #ef4444; text-decoration: none; font-weight: 500; background: none; border: none; cursor: pointer; font-size: 1rem; padding: 0;">
      ${LogOut} <span style="margin-left: 10px;">Logout / Exit</span>
    </button>
  `;

  setTimeout(() => {
    const logoutBtn = logoutContainer.querySelector('#adminLogoutBtn');
    if (logoutBtn) {
      logoutBtn.onclick = (e) => {
        e.preventDefault();
        localStorage.removeItem('admin_token');
        window.navigate('admin-login');
      };
    }
  }, 0);
  sidebar.appendChild(sidebarHeader);
  sidebar.appendChild(nav);
  sidebar.appendChild(logoutContainer);

  // 2. Main Content Area
  const main = document.createElement('main');
  main.className = 'admin-main';

  // Header
  const header = document.createElement('header');
  header.className = 'admin-header';
  header.innerHTML = `
    <div style="font-weight: 500; color: var(--admin-text-muted);">
      Admin Portal / <span style="color: var(--admin-text); text-transform: capitalize;">${activeRoute.replace('admin-', '')}</span>
    </div>
    <div style="display: flex; align-items: center; gap: 20px;">
      <button id="admin-theme-toggle" style="background: none; border: none; cursor: pointer; font-size: 1.5rem; display: flex; align-items: center; justify-content: center; padding: 5px; color: var(--admin-text);">
        🌙
      </button>
      <div style="display: flex; align-items: center; gap: 15px;">
        <div style="width: 35px; height: 35px; border-radius: 50%; background: var(--primary-color); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
          A
        </div>
        <span style="font-weight: 500;">Administrator</span>
      </div>
    </div>
  `;

  // Apply Current Theme
  const toggleBtn = header.querySelector('#admin-theme-toggle');
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

  const contentArea = document.createElement('div');
  contentArea.className = 'admin-content';
  contentArea.appendChild(contentElement);

  main.appendChild(header);
  main.appendChild(contentArea);

  container.appendChild(sidebar);
  container.appendChild(main);

  // 3. Global Confirm Modal Implementation
  const confirmOverlay = document.createElement('div');
  confirmOverlay.className = 'admin-confirm-overlay';
  confirmOverlay.innerHTML = `
    <div class="admin-confirm-modal">
      <div class="admin-confirm-icon">${AlertTriangle}</div>
      <h3 style="margin-bottom: 10px; font-size: 1.25rem;">Are you sure?</h3>
      <p id="confirmMessage" style="color: var(--admin-text-muted); font-size: 0.95rem;">This action cannot be undone.</p>
      <div class="admin-confirm-btns">
        <button id="confirmNo" class="confirm-no">Cancel</button>
        <button id="confirmYes" class="confirm-yes">Confirm</button>
      </div>
    </div>
  `;
  container.appendChild(confirmOverlay);

  window.showConfirm = (message) => {
    return new Promise((resolve) => {
      confirmOverlay.querySelector('#confirmMessage').textContent = message || 'This action cannot be undone.';
      confirmOverlay.classList.add('active');
      
      const handleResponse = (result) => {
        confirmOverlay.classList.remove('active');
        resolve(result);
      };

      confirmOverlay.querySelector('#confirmYes').onclick = () => handleResponse(true);
      confirmOverlay.querySelector('#confirmNo').onclick = () => handleResponse(false);
      confirmOverlay.onclick = (e) => { if(e.target === confirmOverlay) handleResponse(false); };
    });
  };

  return container;
}
