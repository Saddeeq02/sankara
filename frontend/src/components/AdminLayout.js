import { LayoutDashboard, Package, MessageSquare, Image, Activity, LogOut, AlertTriangle, Users } from 'lucide-static';

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
  sidebarHeader.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    box-sizing: border-box;
  `;
  sidebarHeader.innerHTML = `
    <a href="/admin" data-route="admin-dashboard" style="display: flex; align-items: center; justify-content: center; width: 100%;">
      <img src="/assets/logo.png" alt="Sankara Admin Logo" style="height: 48px; width: auto; object-fit: contain;">
    </a>
  `;
  
  const permissions = JSON.parse(localStorage.getItem('admin_permissions') || 'null');
  const hasPermission = (tabName) => {
    if (permissions === null) return true;
    return permissions.includes(tabName);
  };

  let navItemsHtml = '';
  
  if (hasPermission('admin-dashboard')) {
    navItemsHtml += `
      <li>
        <a href="/admin" data-route="admin-dashboard" class="${activeRoute === 'admin-dashboard' ? 'active' : ''}">
          ${LayoutDashboard}
          <span>Dashboard</span>
        </a>
      </li>
    `;
  }
  if (hasPermission('admin-products')) {
    navItemsHtml += `
      <li>
        <a href="/admin/products" data-route="admin-products" class="${activeRoute === 'admin-products' ? 'active' : ''}">
          ${Package}
          <span>Products</span>
        </a>
      </li>
    `;
  }
  if (hasPermission('admin-inquiries')) {
    navItemsHtml += `
      <li>
        <a href="/admin/inquiries" data-route="admin-inquiries" class="${activeRoute === 'admin-inquiries' ? 'active' : ''}">
          ${MessageSquare}
          <span>Inquiries</span>
        </a>
      </li>
    `;
  }
  if (hasPermission('admin-content')) {
    navItemsHtml += `
      <li>
        <a href="/admin/content" data-route="admin-content" class="${activeRoute === 'admin-content' ? 'active' : ''}">
          ${Image}
          <span>Content</span>
        </a>
      </li>
    `;
  }
  if (hasPermission('admin-users')) {
    navItemsHtml += `
      <li>
        <a href="/admin/users" data-route="admin-users" class="${activeRoute === 'admin-users' ? 'active' : ''}">
          ${Users}
          <span>Admins</span>
        </a>
      </li>
    `;
  }

  const nav = document.createElement('nav');
  nav.className = 'admin-nav';
  nav.innerHTML = `
    <ul>
      ${navItemsHtml}
    </ul>
  `;

  // Append logout at bottom of nav
  const logoutContainer = document.createElement('div');
  logoutContainer.style.cssText = `
    padding: 24px;
    border-top: 1px solid var(--admin-border);
    margin-top: auto;
  `;
  logoutContainer.innerHTML = `
    <button id="adminLogoutBtn" style="display: flex; align-items: center; gap: 10px; color: #ef4444; text-decoration: none; font-weight: 600; background: none; border: none; cursor: pointer; font-size: 0.95rem; padding: 12px 16px; width: 100%; border-radius: 12px; transition: all 0.2s;">
      ${LogOut}
      <span>Logout / Exit</span>
    </button>
  `;

  setTimeout(() => {
    const logoutBtn = logoutContainer.querySelector('#adminLogoutBtn');
    if (logoutBtn) {
      logoutBtn.onmouseenter = () => {
        logoutBtn.style.backgroundColor = 'rgba(239, 68, 68, 0.08)';
      };
      logoutBtn.onmouseleave = () => {
        logoutBtn.style.backgroundColor = 'transparent';
      };
      logoutBtn.onclick = (e) => {
        e.preventDefault();
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_permissions');
        localStorage.removeItem('admin_name');
        localStorage.removeItem('admin_email');
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

  const adminName = localStorage.getItem('admin_name') || 'Administrator';
  const roleName = permissions === null ? 'Super User' : 'Sub-Admin';

  // Header
  const header = document.createElement('header');
  header.className = 'admin-header';
  header.innerHTML = `
    <div style="display: flex; align-items: center; gap: 16px;">
      <button id="admin-mob-toggler" style="display: none; background: none; border: none; cursor: pointer; color: var(--admin-text); padding: 8px; border-radius: 8px; transition: background-color 0.2s;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>
      <div style="font-weight: 600; font-size: 0.9rem; color: var(--admin-text-muted); display: flex; align-items: center; gap: 8px;">
        <span>Admin Portal</span>
        <span style="opacity: 0.5;">/</span>
        <span style="color: var(--admin-text); text-transform: capitalize; font-weight: 700;">${activeRoute.replace('admin-', '')}</span>
      </div>
    </div>
    
    <div style="display: flex; align-items: center; gap: 24px;">
      <button id="admin-theme-toggle" style="background: none; border: 1px solid var(--admin-border); border-radius: 12px; cursor: pointer; width: 42px; height: 42px; display: flex; align-items: center; justify-content: center; transition: all 0.2s; color: var(--admin-text); font-size: 1.25rem;">
        🌙
      </button>
      
      <div style="display: flex; align-items: center; gap: 12px; padding: 6px 16px 6px 6px; border: 1px solid var(--admin-border); border-radius: 100px; background: var(--admin-surface);">
        <div style="width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, var(--admin-primary) 0%, #1e3a8a 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 0.85rem; box-shadow: var(--shadow-sm);">
          ${adminName.charAt(0).toUpperCase()}
        </div>
        <div style="display: flex; flex-direction: column;">
          <span class="admin-user-name" style="font-weight: 700; font-size: 0.85rem; line-height: 1.2; color: var(--admin-text);">${adminName}</span>
          <span style="font-size: 0.7rem; color: var(--admin-text-muted); font-weight: 500;">${roleName}</span>
        </div>
      </div>
    </div>
  `;

  // Mobile Toggling Logic
  const toggler = header.querySelector('#admin-mob-toggler');
  toggler.onclick = () => {
    sidebar.classList.toggle('mob-active');
    overlay.classList.toggle('active');
  };

  const overlay = document.createElement('div');
  overlay.className = 'admin-sidebar-overlay';
  overlay.onclick = () => {
    sidebar.classList.remove('mob-active');
    overlay.classList.remove('active');
  };
  container.appendChild(overlay);

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
      <h3 style="margin-bottom: 8px; font-size: 1.3rem; font-weight: 700; color: var(--admin-text);">Are you sure?</h3>
      <p id="confirmMessage" style="color: var(--admin-text-muted); font-size: 0.95rem; line-height: 1.5; margin: 0 0 24px;">This action cannot be undone.</p>
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
