import { renderAdminLayout } from '../../components/AdminLayout';
import { PackageOpen, Users, PhoneCall, TrendingUp } from 'lucide-static';

const escapeHTML = (str) => {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

export function renderAdminDashboard() {
  const content = document.createElement('div');
  
  // Dynamic Greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Welcome Back, Sir ☀️';
    if (hour < 17) return 'Good Afternoon, Sir 🌤️';
    return 'Good Evening, Sir 🌙';
  };

  content.innerHTML = `
    <!-- Welcome Banner Widget -->
    <div class="welcome-banner">
      <div class="welcome-banner-glow"></div>
      <h1 style="font-size: 2.2rem; font-weight: 800; margin: 0 0 8px; letter-spacing: -0.03em;">${getGreeting()}</h1>
      <p style="font-size: 1.05rem; font-weight: 500; margin: 0; opacity: 0.85;">Welcome to the Sankara Control Hub. Here is your overview for today.</p>
    </div>

    <h2 class="admin-page-title">Operational Statistics</h2>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; margin-bottom: 40px;">
      <!-- Stats Card 1 -->
      <div class="admin-card" style="display: flex; align-items: center; gap: 20px;">
        <div style="width: 56px; height: 56px; border-radius: 16px; background: rgba(59, 130, 246, 0.1); color: #3b82f6; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);">
          ${PackageOpen}
        </div>
        <div>
          <div style="color: var(--admin-text-muted); font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Total Products</div>
          <div id="stat-products" style="font-size: 2rem; font-weight: 800; color: var(--admin-text); line-height: 1.1;">...</div>
        </div>
      </div>

      <!-- Stats Card 2 -->
      <div class="admin-card" style="display: flex; align-items: center; gap: 20px;">
        <div style="width: 56px; height: 56px; border-radius: 16px; background: rgba(16, 185, 129, 0.1); color: #10b981; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15);">
          ${PhoneCall}
        </div>
        <div>
          <div style="color: var(--admin-text-muted); font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">New Inquiries</div>
          <div id="stat-inquiries" style="font-size: 2rem; font-weight: 800; color: var(--admin-text); line-height: 1.1;">...</div>
        </div>
      </div>

      <!-- Stats Card 3 -->
      <div class="admin-card" style="display: flex; align-items: center; gap: 20px;">
        <div style="width: 56px; height: 56px; border-radius: 16px; background: rgba(245, 158, 11, 0.1); color: #f59e0b; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.15);">
          ${Users}
        </div>
        <div>
          <div style="color: var(--admin-text-muted); font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Active Clients</div>
          <div style="font-size: 2rem; font-weight: 800; color: var(--admin-text); line-height: 1.1;">124</div>
        </div>
      </div>

      <!-- Stats Card 4 -->
      <div class="admin-card" style="display: flex; align-items: center; gap: 20px;">
        <div style="width: 56px; height: 56px; border-radius: 16px; background: rgba(139, 92, 246, 0.1); color: #8b5cf6; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(139, 92, 246, 0.15);">
          ${TrendingUp}
        </div>
        <div>
          <div style="color: var(--admin-text-muted); font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Total Team</div>
          <div id="stat-team" style="font-size: 2rem; font-weight: 800; color: var(--admin-text); line-height: 1.1;">...</div>
        </div>
      </div>
    </div>

    <!-- Recent Inquiries Section -->
    <div class="admin-card" style="margin-bottom: 0; width: 100%; box-sizing: border-box;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <h3 style="font-size: 1.35rem; font-weight: 800; margin: 0; letter-spacing: -0.02em; color: var(--admin-text);">Recent Inquiries</h3>
        <button data-route="admin-inquiries" style="font-size: 0.85rem; font-weight: 700; color: var(--admin-primary); background: var(--admin-primary-light); border: none; padding: 8px 16px; border-radius: 8px; cursor: pointer; transition: all 0.2s;">
          View All &rarr;
        </button>
      </div>
      <div class="admin-table-container">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody id="inquiries-tbody">
            <tr><td colspan="4" style="text-align: center; padding: 40px; color: var(--admin-text-muted);">Loading system assets...</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `;

  const loadMetrics = async () => {
    try {
      const response = await fetch('/api/metrics', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        }
      });
      if (response.status === 401) {
        window.history.pushState({}, '', '/admin/login');
        window.dispatchEvent(new Event('popstate'));
        return;
      }
      
      const data = await response.json();
      content.querySelector('#stat-products').textContent = data.total_products;
      content.querySelector('#stat-inquiries').textContent = data.total_inquiries;
      content.querySelector('#stat-team').textContent = data.total_team;
      
      const tbody = content.querySelector('#inquiries-tbody');
      if (data.recent_inquiries.length > 0) {
        tbody.innerHTML = data.recent_inquiries.map(inquiry => `
          <tr>
            <td>
              <div style="display: flex; flex-direction: column;">
                <span style="font-weight: 700; color: var(--admin-text);">${escapeHTML(inquiry.name)}</span>
                <span style="color: var(--admin-text-muted); font-size: 0.8rem;">${escapeHTML(inquiry.email)}</span>
              </div>
            </td>
            <td style="font-weight: 500;">${escapeHTML(inquiry.subject)}</td>
            <td><span class="badge badge-pending">${escapeHTML(inquiry.status)}</span></td>
            <td style="color: var(--admin-text-muted); font-size: 0.9rem;">${escapeHTML(inquiry.date)}</td>
          </tr>
        `).join('');
      } else {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 40px; color: var(--admin-text-muted);">No inquiries found.</td></tr>';
      }
    } catch (err) {
      console.error('Failed to load metrics:', err);
    }
  };

  loadMetrics();

  return renderAdminLayout(content, 'admin-dashboard');
}
