import { renderAdminLayout } from '../../components/AdminLayout';
import { Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-static';

export function renderAdminContent() {
  const content = document.createElement('div');
  
  content.innerHTML = `
    <div class="flex-between" style="margin-bottom: 24px;">
      <h1 class="admin-page-title" style="margin-bottom: 0;">Content Manager</h1>
      <div style="display: flex; gap: 15px;">
        <button class="btn-primary" style="display: flex; align-items: center; gap: 8px; padding: 10px 20px; background: var(--admin-surface); color: var(--admin-text); border: 1px solid var(--admin-border);">
          ${ImageIcon} Upload Media
        </button>
        <button class="btn-primary" style="display: flex; align-items: center; gap: 8px; padding: 10px 20px;">
          ${Plus} New Content
        </button>
      </div>
    </div>

    <!-- Tabs (Visual only for now) -->
    <div style="display: flex; gap: 20px; margin-bottom: 24px; border-bottom: 1px solid var(--admin-border);">
      <div style="padding: 10px 0; border-bottom: 2px solid var(--primary-color); font-weight: 600; color: var(--primary-color); cursor: pointer;">Gallery</div>
      <div style="padding: 10px 0; color: var(--admin-text-muted); cursor: pointer;">Portfolio</div>
      <div style="padding: 10px 0; color: var(--admin-text-muted); cursor: pointer;">Activities</div>
      <div style="padding: 10px 0; color: var(--admin-text-muted); cursor: pointer;">Services</div>
    </div>

    <div class="admin-card">
      <h2 style="font-size: 1.25rem; margin-bottom: 20px;">Gallery Images</h2>
      <div id="gallery-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px;">
        <div style="padding: 20px; text-align: center; color: var(--admin-text-muted); grid-column: 1 / -1;">Loading from API...</div>
      </div>
    </div>
  `;

  const loadContent = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/gallery', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` }
      });
      if (response.status === 401) {
        window.history.pushState({}, '', '/admin/login');
        window.dispatchEvent(new Event('popstate'));
        return;
      }
      const data = await response.json();
      const grid = content.querySelector('#gallery-grid');
      
      if (data.length > 0) {
        grid.innerHTML = data.map(item => `
          <div style="border: 1px solid var(--admin-border); border-radius: 8px; overflow: hidden;">
            <div style="height: 150px; background: #eee; position: relative;">
              <img src="${item.image}" style="width: 100%; height: 100%; object-fit: cover;">
              <div style="position: absolute; top: 10px; right: 10px; background: white; border-radius: 4px; padding: 5px; display: flex; gap: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <span style="color: var(--admin-text-muted); cursor: pointer;">${Edit}</span>
                <span style="color: #ef4444; cursor: pointer;">${Trash2}</span>
              </div>
            </div>
            <div style="padding: 12px;">
              <div style="font-weight: 500; font-size: 0.9rem;">${item.title || 'Untitled Image'}</div>
              <div style="color: var(--admin-text-muted); font-size: 0.8rem; margin-top: 5px;">Category: ${item.category || 'General'}</div>
            </div>
          </div>
        `).join('');
      } else {
        grid.innerHTML = '<div style="padding: 20px; text-align: center; color: var(--admin-text-muted); grid-column: 1 / -1;">No images found in gallery database.</div>';
      }
    } catch (err) {
      console.error(err);
    }
  };

  setTimeout(loadContent, 100);

  return renderAdminLayout(content, 'admin-content');
}
