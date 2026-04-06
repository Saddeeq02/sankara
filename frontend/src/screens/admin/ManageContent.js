import { renderAdminLayout } from '../../components/AdminLayout';
import { Plus, Trash2, Play, X, Briefcase, Calendar, Image as ImageIcon } from 'lucide-static';

export function renderAdminContent() {
  const content = document.createElement('div');
  let activeTab = 'gallery';
  let data = { gallery: [], portfolio: [], activities: [], team: [] };

  const renderContainer = () => {
    content.innerHTML = `
      <div class="flex-between" style="margin-bottom: 24px;">
        <h1 class="admin-page-title" style="margin-bottom: 0;">Content Manager</h1>
        <button id="addBtn" class="btn-primary" style="display: flex; align-items: center; gap: 8px; padding: 10px 20px;">
          ${Plus} Add ${activeTab === 'activities' ? 'Activity' : activeTab === 'team' ? 'Member' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1, -1)}
        </button>
      </div>

      <!-- Tab Navigation -->
      <div style="display: flex; gap: 20px; margin-bottom: 24px; border-bottom: 1px solid var(--admin-border);">
        <div class="tab-item ${activeTab === 'gallery' ? 'active' : ''}" data-tab="gallery" style="padding: 10px 0; cursor: pointer; font-weight: 600; color: ${activeTab === 'gallery' ? 'var(--primary-color)' : 'var(--admin-text-muted)'}; border-bottom: 2px solid ${activeTab === 'gallery' ? 'var(--primary-color)' : 'transparent'}">Gallery</div>
        <div class="tab-item ${activeTab === 'portfolio' ? 'active' : ''}" data-tab="portfolio" style="padding: 10px 0; cursor: pointer; font-weight: 600; color: ${activeTab === 'portfolio' ? 'var(--primary-color)' : 'var(--admin-text-muted)'}; border-bottom: 2px solid ${activeTab === 'portfolio' ? 'var(--primary-color)' : 'transparent'}">Portfolio</div>
        <div class="tab-item ${activeTab === 'activities' ? 'active' : ''}" data-tab="activities" style="padding: 10px 0; cursor: pointer; font-weight: 600; color: ${activeTab === 'activities' ? 'var(--primary-color)' : 'var(--admin-text-muted)'}; border-bottom: 2px solid ${activeTab === 'activities' ? 'var(--primary-color)' : 'transparent'}">Activities</div>
        <div class="tab-item ${activeTab === 'team' ? 'active' : ''}" data-tab="team" style="padding: 10px 0; cursor: pointer; font-weight: 600; color: ${activeTab === 'team' ? 'var(--primary-color)' : 'var(--admin-text-muted)'}; border-bottom: 2px solid ${activeTab === 'team' ? 'var(--primary-color)' : 'transparent'}">Team</div>
      </div>

      <div class="admin-card">
        <h2 style="font-size: 1.25rem; margin-bottom: 20px; text-transform: capitalize;">Manage ${activeTab}</h2>
        <div id="items-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px;">
          <div style="padding: 40px; text-align: center; color: var(--admin-text-muted); grid-column: 1 / -1;">Loading section data...</div>
        </div>
      </div>

      <!-- Modals injected below -->
      <div id="modalContainer"></div>
    `;

    // Tab Logic
    content.querySelectorAll('.tab-item').forEach(tab => {
      tab.onclick = () => {
        activeTab = tab.dataset.tab;
        renderContainer();
        loadSectionData();
      };
    });

    content.querySelector('#addBtn').onclick = () => openModal();
    renderGrid();
  };

  const renderGrid = () => {
    const grid = content.querySelector('#items-grid');
    const items = data[activeTab] || [];
    
    if (items.length === 0) {
      grid.innerHTML = `<div style="padding: 60px; text-align: center; color: var(--admin-text-muted); grid-column: 1/-1;">No ${activeTab} entries found.</div>`;
      return;
    }

    grid.innerHTML = items.map(item => {
      if (activeTab === 'gallery') {
        return `
          <div style="border: 1px solid var(--admin-border); background: var(--admin-bg); border-radius: 12px; overflow: hidden;">
            <div style="height: 180px; position: relative; background: #000;">
              <img src="${item.image}" style="width: 100%; height: 100%; object-fit: cover;">
              ${item.video_url ? `<div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: white;">${Play}</div>` : ''}
              <button class="delete-btn" data-id="${item.id}" style="position: absolute; top: 10px; right: 10px; padding: 6px; background: rgba(239,68,68,0.9); border: none; border-radius: 6px; color: white; cursor: pointer;">${Trash2}</button>
            </div>
            <div style="padding: 15px;">
              <div style="font-weight: 600;">${item.title}</div>
              <div style="font-size: 0.75rem; color: var(--admin-text-muted);">${item.category}</div>
            </div>
          </div>
        `;
      } else if (activeTab === 'portfolio') {
        return `
          <div style="border: 1px solid var(--admin-border); background: var(--admin-bg); border-radius: 12px; overflow: hidden;">
            <div style="height: 160px; position: relative;">
              <img src="${item.image}" style="width: 100%; height: 100%; object-fit: cover;">
              <button class="delete-btn" data-id="${item.id}" style="position: absolute; top: 10px; right: 10px; padding: 6px; background: rgba(239,68,68,0.9); border: none; border-radius: 6px; color: white; cursor: pointer;">${Trash2}</button>
            </div>
            <div style="padding: 15px;">
              <div style="font-weight: 700; margin-bottom: 5px;">${item.title}</div>
              <div style="font-size: 0.8rem; color: var(--primary-color); font-weight: 600;">${item.client} | ${item.year}</div>
              <div style="font-size: 0.85rem; color: var(--admin-text-muted); margin-top: 8px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${item.description}</div>
            </div>
          </div>
        `;
      } else if (activeTab === 'activities') {
        return `
          <div style="border: 1px solid var(--admin-border); background: var(--admin-bg); border-radius: 12px; padding: 15px; display: flex; gap: 15px; align-items: flex-start;">
            <div style="width: 80px; height: 80px; border-radius: 8px; overflow: hidden; flex-shrink: 0; background: #eee;">
              ${item.image ? `<img src="${item.image}" style="width: 100%; height: 100%; object-fit: cover;">` : `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; color:#999;">${ImageIcon}</div>`}
            </div>
            <div style="flex-grow: 1;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div style="font-weight: 700;">${item.title}</div>
                <button class="delete-btn" data-id="${item.id}" style="padding: 4px; background: none; border: none; color: #ef4444; cursor: pointer;">${Trash2}</button>
              </div>
              <div style="font-size: 0.8rem; color: var(--primary-color); font-weight: 600; margin: 4px 0;">${item.date}</div>
              <div style="font-size: 0.85rem; color: var(--admin-text-muted); line-height: 1.4;">${item.summary}</div>
            </div>
          </div>
        `;
      } else if (activeTab === 'team') {
        return `
          <div style="border: 1px solid var(--admin-border); background: var(--admin-bg); border-radius: 12px; padding: 20px; text-align: center; position: relative;">
            <button class="delete-btn" data-id="${item.id}" style="position: absolute; top: 10px; right: 10px; padding: 4px; background: none; border: none; color: #ef4444; cursor: pointer;">${Trash2}</button>
            <div style="width: 100px; height: 100px; border-radius: 50%; overflow: hidden; margin: 0 auto 15px; border: 2px solid var(--primary-color);">
              <img src="${item.image}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div style="font-weight: 700; font-size: 1.1rem;">${item.name}</div>
            <div style="font-size: 0.85rem; color: var(--primary-color); font-weight: 600; margin-top: 5px;">${item.role}</div>
            <div style="font-size: 0.8rem; color: var(--admin-text-muted); margin-top: 5px;">${item.phone || 'No phone set'}</div>
          </div>
        `;
      }
      return '';
    }).join('');

    grid.querySelectorAll('.delete-btn').forEach(btn => {
      btn.onclick = async () => {
        const confirmed = await window.showConfirm(`Delete this ${activeTab} item?`);
        if (confirmed) {
          const res = await fetch(`/api/${activeTab}/${btn.dataset.id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` }
          });
          if (res.ok) loadSectionData();
        }
      };
    });
  };

  const openModal = () => {
    const container = content.querySelector('#modalContainer');
    let formFields = '';
    
    if (activeTab === 'gallery') {
       formFields = `
         <input type="text" name="title" placeholder="Title" required class="theme-input">
         <select name="category" required class="theme-input">
           <option value="Exhibition">Exhibition</option>
           <option value="Workshop">Workshop</option>
           <option value="Visit">Visit</option>
         </select>
         <input type="url" name="video_url" placeholder="Video URL (Optional)" class="theme-input">
         <input type="file" name="image" required style="font-size:0.8rem; color: var(--admin-text);">
       `;
    } else if (activeTab === 'portfolio') {
       formFields = `
         <input type="text" name="title" placeholder="Project Title" required class="theme-input">
         <input type="text" name="client" placeholder="Client (e.g. Oyo State Govt)" required class="theme-input">
         <input type="text" name="year" placeholder="Year (e.g. 2024)" required class="theme-input">
         <textarea name="description" placeholder="Project Description" required class="theme-input" style="min-height:100px;"></textarea>
         <input type="file" name="image" required style="font-size:0.8rem; color: var(--admin-text);">
       `;
    } else if (activeTab === 'activities') {
       formFields = `
         <input type="text" name="title" placeholder="Event Title" required class="theme-input">
         <input type="text" name="date" placeholder="Date (e.g. Oct 12, 2024)" required class="theme-input">
         <textarea name="summary" placeholder="Brief Summary" required class="theme-input" style="min-height:80px;"></textarea>
         <input type="file" name="image" style="font-size:0.8rem; color: var(--admin-text);">
       `;
    } else if (activeTab === 'team') {
       formFields = `
         <input type="text" name="name" placeholder="Full Name" required class="theme-input">
         <input type="text" name="role" placeholder="Job Title / Role" required class="theme-input">
         <input type="tel" name="phone" placeholder="Phone Number (e.g. +234 ...)" class="theme-input">
         <input type="file" name="image" required style="font-size:0.8rem; color: var(--admin-text);">
       `;
    }

    container.innerHTML = `
      <div style="position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:1000; display:flex; align-items:center; justify-content:center;">
        <div style="background:var(--admin-surface); padding:30px; border-radius:12px; width:450px; border:1px solid var(--admin-border);">
          <div style="display:flex; justify-content:space-between; margin-bottom:20px;">
            <h3 style="margin:0; color: var(--admin-text);">Add New ${activeTab === 'activities' ? 'Activity' : activeTab === 'team' ? 'Member' : activeTab.slice(0,-1)}</h3>
            <button id="closeModal" style="background:none; border:none; cursor:pointer; color: var(--admin-text);">${X}</button>
          </div>
          <form id="addForm" style="display:flex; flex-direction:column; gap:15px;">
            ${formFields}
            <button type="submit" class="btn-primary" style="padding:12px; margin-top:10px;">Upload Content</button>
          </form>
        </div>
      </div>
    `;

    container.querySelector('#closeModal').onclick = () => container.innerHTML = '';
    
    container.querySelector('#addForm').onsubmit = async (e) => {
      e.preventDefault();
      const btn = e.target.querySelector('button');
      btn.textContent = 'Uploading...';
      btn.disabled = true;

      const formData = new FormData(e.target);
      const res = await fetch(`/api/${activeTab}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` },
        body: formData
      });

      if (res.ok) {
        container.innerHTML = '';
        loadSectionData();
      } else {
        alert('Upload failed');
        btn.textContent = 'Upload Content';
        btn.disabled = false;
      }
    };
  };

  const loadSectionData = async () => {
    try {
      const res = await fetch(`/api/${activeTab}`);
      data[activeTab] = await res.json();
      renderGrid();
    } catch (err) { console.error(err); }
  };

  loadSectionData();
  renderContainer();
  return renderAdminLayout(content, 'admin-content');
}
