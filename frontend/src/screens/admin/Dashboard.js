import { renderAdminLayout } from '../../components/AdminLayout';
import { PackageOpen, Users, PhoneCall, TrendingUp } from 'lucide-static';

export function renderAdminDashboard() {
  const content = document.createElement('div');
  
  content.innerHTML = `
    <h1 class="admin-page-title">Dashboard Overview</h1>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; margin-bottom: 30px;">
      <div class="admin-card" style="display: flex; align-items: center; gap: 20px;">
        <div style="width: 50px; height: 50px; border-radius: 12px; background: #e0e7ff; color: #4338ca; display: flex; align-items: center; justify-content: center;">
          ${PackageOpen}
        </div>
        <div>
          <div style="color: var(--admin-text-muted); font-size: 0.85rem; font-weight: 600; text-transform: uppercase;">Total Products</div>
          <div id="stat-products" style="font-size: 1.8rem; font-weight: 700;">...</div>
        </div>
      </div>

      <div class="admin-card" style="display: flex; align-items: center; gap: 20px;">
        <div style="width: 50px; height: 50px; border-radius: 12px; background: #dcfce7; color: #15803d; display: flex; align-items: center; justify-content: center;">
          ${PhoneCall}
        </div>
        <div>
          <div style="color: var(--admin-text-muted); font-size: 0.85rem; font-weight: 600; text-transform: uppercase;">New Inquiries</div>
          <div id="stat-inquiries" style="font-size: 1.8rem; font-weight: 700;">...</div>
        </div>
      </div>

      <div class="admin-card" style="display: flex; align-items: center; gap: 20px;">
        <div style="width: 50px; height: 50px; border-radius: 12px; background: #fef3c7; color: #b45309; display: flex; align-items: center; justify-content: center;">
          ${Users}
        </div>
        <div>
          <div style="color: var(--admin-text-muted); font-size: 0.85rem; font-weight: 600; text-transform: uppercase;">Active Clients</div>
          <div style="font-size: 1.8rem; font-weight: 700;">124</div>
        </div>
      </div>

      <div class="admin-card" style="display: flex; align-items: center; gap: 20px;">
        <div style="width: 50px; height: 50px; border-radius: 12px; background: #fae8ff; color: #a21caf; display: flex; align-items: center; justify-content: center;">
          ${Users}
        </div>
        <div>
          <div style="color: var(--admin-text-muted); font-size: 0.85rem; font-weight: 600; text-transform: uppercase;">Total Team</div>
          <div id="stat-team" style="font-size: 1.8rem; font-weight: 700;">...</div>
        </div>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px;">
      <div class="admin-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <h2 style="font-size: 1.25rem; margin: 0;">Recent Inquiries</h2>
          <button data-route="admin-inquiries" style="font-size: 0.85rem; font-weight: 700; color: var(--primary-color); background: none; border: none; cursor: pointer;">View All &rarr;</button>
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
              <tr><td colspan="4" style="text-align: center; padding: 20px;">Loading from API...</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="admin-card">
        <h2 style="font-size: 1.25rem; margin-bottom: 20px;">System Activity</h2>
        <div style="border-left: 2px solid var(--admin-border); margin-left: 10px; padding-left: 20px; display: flex; flex-direction: column; gap: 20px;">
          <div style="position: relative;">
            <div style="position: absolute; left: -26px; top: 0; width: 10px; height: 10px; border-radius: 50%; background: var(--primary-color);"></div>
            <p style="margin: 0; font-weight: 500;">System Online</p>
            <p style="margin: 5px 0 0; font-size: 0.85rem; color: var(--admin-text-muted);">API Binding initialized</p>
          </div>
        </div>
      </div>
    </div>
  `;

  // Fetch logic
  setTimeout(async () => {
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
            <td><strong>${inquiry.name}</strong><br><span style="color: var(--admin-text-muted); font-size: 0.85rem;">${inquiry.email}</span></td>
            <td>${inquiry.subject}</td>
            <td><span class="badge badge-pending">${inquiry.status}</span></td>
            <td>${inquiry.date}</td>
          </tr>
        `).join('');
      } else {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: var(--admin-text-muted);">No inquiries found.</td></tr>';
      }
    } catch (err) {
      console.error('Failed to load metrics:', err);
    }
  }, 100);

  return renderAdminLayout(content, 'admin-dashboard');
}
