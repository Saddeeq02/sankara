import { renderAdminLayout } from '../../components/AdminLayout';
import { Plus, Trash2, X, Shield, Mail, User as UserIcon, CheckSquare } from 'lucide-static';

export function renderAdminUsers() {
  const content = document.createElement('div');
  let users = [];

  const renderContainer = () => {
    content.innerHTML = `
      <div class="flex-between" style="margin-bottom: 24px;">
        <h1 class="admin-page-title" style="margin-bottom: 0;">Admin Management</h1>
        <button id="addBtn" class="btn-primary" style="display: flex; align-items: center; gap: 8px; padding: 10px 20px;">
          ${Plus} Add Administrator
        </button>
      </div>

      <div class="admin-card">
        <h2 style="font-size: 1.25rem; margin-bottom: 20px;">System Administrators</h2>
        <div class="admin-table-container">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Permissions / Allowed Tabs</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="users-tbody">
              <tr>
                <td colspan="4" style="padding: 40px; text-align: center; color: var(--admin-text-muted);">Loading administrators...</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div id="modalContainer"></div>
    `;

    content.querySelector('#addBtn').onclick = () => openModal();
    renderTable();
  };

  const renderTable = () => {
    const tbody = content.querySelector('#users-tbody');
    if (!tbody) return;

    if (users.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="4" style="padding: 40px; text-align: center; color: var(--admin-text-muted);">No administrators found.</td>
        </tr>
      `;
      return;
    }

    const currentEmail = localStorage.getItem('admin_email');

    tbody.innerHTML = users.map(user => {
      let permsBadge = '';
      if (!user.permissions || user.permissions === null) {
        permsBadge = `<span class="badge badge-success" style="background: rgba(34, 197, 94, 0.1); color: #22c55e; padding: 4px 10px; border-radius: 6px; font-size: 0.8rem; font-weight: 600;">Super User (All Access)</span>`;
      } else if (user.permissions.length === 0) {
        permsBadge = `<span class="badge badge-danger" style="background: rgba(239, 68, 68, 0.1); color: #ef4444; padding: 4px 10px; border-radius: 6px; font-size: 0.8rem; font-weight: 600;">No Access</span>`;
      } else {
        permsBadge = user.permissions.map(p => {
          const cleanName = p.replace('admin-', '');
          return `<span style="background: var(--admin-border); color: var(--admin-text); padding: 4px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: 600; text-transform: capitalize; margin-right: 6px; display: inline-block; margin-bottom: 4px;">${cleanName}</span>`;
        }).join('');
      }

      const isSelf = user.email === currentEmail;

      return `
        <tr>
          <td style="font-weight: 700; color: var(--admin-text);">${user.name} ${isSelf ? '<span style="font-size:0.75rem; font-weight:normal; opacity:0.6;">(You)</span>' : ''}</td>
          <td>${user.email}</td>
          <td>${permsBadge}</td>
          <td>
            ${isSelf ? `
              <span style="font-size: 0.85rem; color: var(--admin-text-muted); font-style: italic;">Protected</span>
            ` : `
              <button class="delete-btn" data-id="${user.id}" style="background: none; border: none; color: #ef4444; cursor: pointer; padding: 6px; border-radius: 6px; transition: background 0.2s;">
                ${Trash2}
              </button>
            `}
          </td>
        </tr>
      `;
    }).join('');

    tbody.querySelectorAll('.delete-btn').forEach(btn => {
      btn.onclick = async () => {
        const id = btn.dataset.id;
        const confirm = await window.showConfirm("Are you sure you want to remove this administrator? They will immediately lose access.");
        if (confirm) {
          try {
            const res = await fetch(`/api/admin/users/${id}`, {
              method: 'DELETE',
              headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` }
            });
            if (res.ok) {
              await loadUsers();
            } else {
              const err = await res.json().catch(() => ({}));
              alert(`Failed to delete user: ${err.error || 'Server error'}`);
            }
          } catch(e) {
            console.error(e);
            alert("Network error occurred.");
          }
        }
      };
    });
  };

  const openModal = () => {
    const modalContainer = content.querySelector('#modalContainer');
    modalContainer.innerHTML = `
      <div class="admin-modal-overlay active">
        <div class="admin-modal" style="max-width: 500px;">
          <div class="admin-modal-header">
            <h3>Add New Administrator</h3>
            <button class="modal-close">${X}</button>
          </div>
          <form id="adminForm" style="display: flex; flex-direction: column; gap: 16px; padding: 20px 0 0;">
            <div>
              <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 0.85rem; color: var(--admin-text);">Name</label>
              <div style="position: relative;">
                <span style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--admin-text-muted); height: 16px;">${UserIcon}</span>
                <input type="text" name="name" required placeholder="Full Name" style="width: 100%; box-sizing: border-box; padding: 10px 12px 10px 38px; border: 1px solid var(--admin-border); border-radius: 8px; background: var(--admin-background); color: var(--admin-text);">
              </div>
            </div>

            <div>
              <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 0.85rem; color: var(--admin-text);">Email</label>
              <div style="position: relative;">
                <span style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--admin-text-muted); height: 16px;">${Mail}</span>
                <input type="email" name="email" required placeholder="admin@sankara.com" style="width: 100%; box-sizing: border-box; padding: 10px 12px 10px 38px; border: 1px solid var(--admin-border); border-radius: 8px; background: var(--admin-background); color: var(--admin-text);">
              </div>
            </div>

            <div>
              <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 0.85rem; color: var(--admin-text);">Password</label>
              <input type="password" name="password" required placeholder="••••••••" style="width: 100%; box-sizing: border-box; padding: 10px 12px; border: 1px solid var(--admin-border); border-radius: 8px; background: var(--admin-background); color: var(--admin-text);">
            </div>

            <div>
              <label style="display: block; margin-bottom: 10px; font-weight: 600; font-size: 0.85rem; color: var(--admin-text); display: flex; align-items: center; gap: 6px;">
                ${Shield} Assign Allowed Tabs (Permissions)
              </label>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; padding: 12px; background: var(--admin-background); border: 1px solid var(--admin-border); border-radius: 8px;">
                <label style="display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: var(--admin-text); cursor: pointer;">
                  <input type="checkbox" name="permissions" value="admin-dashboard" checked> Dashboard
                </label>
                <label style="display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: var(--admin-text); cursor: pointer;">
                  <input type="checkbox" name="permissions" value="admin-products" checked> Products
                </label>
                <label style="display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: var(--admin-text); cursor: pointer;">
                  <input type="checkbox" name="permissions" value="admin-inquiries" checked> Inquiries
                </label>
                <label style="display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: var(--admin-text); cursor: pointer;">
                  <input type="checkbox" name="permissions" value="admin-content" checked> Content
                </label>
                <label style="display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: var(--admin-text); cursor: pointer;">
                  <input type="checkbox" name="permissions" value="admin-health" checked> System Health
                </label>
                <label style="display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: var(--admin-text); cursor: pointer;">
                  <input type="checkbox" name="permissions" value="admin-users"> Admins Tab
                </label>
              </div>
            </div>

            <button type="submit" class="btn-primary" style="padding: 12px; width: 100%; font-weight: 700; margin-top: 10px;">
              Create Administrator
            </button>
          </form>
        </div>
      </div>
    `;

    const form = modalContainer.querySelector('#adminForm');
    const overlay = modalContainer.querySelector('.admin-modal-overlay');
    const closeBtn = modalContainer.querySelector('.modal-close');

    const closeModal = () => {
      overlay.classList.remove('active');
      modalContainer.innerHTML = '';
    };

    closeBtn.onclick = closeModal;
    overlay.onclick = (e) => { if(e.target === overlay) closeModal(); };

    form.onsubmit = async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Creating...';

      const formData = new FormData(form);
      const name = formData.get('name');
      const email = formData.get('email');
      const password = formData.get('password');
      
      const permissions = [];
      form.querySelectorAll('input[name="permissions"]:checked').forEach(cb => {
        permissions.push(cb.value);
      });

      try {
        const res = await fetch('/api/admin/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
          },
          body: JSON.stringify({ name, email, password, permissions })
        });

        if (res.ok) {
          closeModal();
          await loadUsers();
        } else {
          const err = await res.json().catch(() => ({}));
          alert(`Failed to create admin: ${err.error || err.message || 'Server error'}`);
          submitBtn.disabled = false;
          submitBtn.textContent = 'Create Administrator';
        }
      } catch (e) {
        console.error(e);
        alert("Network error occurred.");
        submitBtn.disabled = false;
        submitBtn.textContent = 'Create Administrator';
      }
    };
  };

  const loadUsers = async () => {
    try {
      const res = await fetch(`/api/admin/users?t=${Date.now()}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` }
      });
      if (res.ok) {
        users = await res.json();
        renderTable();
      } else if (res.status === 403) {
        users = [];
        const tbody = content.querySelector('#users-tbody');
        if (tbody) {
          tbody.innerHTML = `
            <tr>
              <td colspan="4" style="padding: 40px; text-align: center; color: var(--admin-text-muted); font-weight: 600;">
                Access Denied: You do not have permissions to manage other administrators.
              </td>
            </tr>
          `;
        }
      }
    } catch(err) {
      console.error(err);
    }
  };

  renderContainer();
  loadUsers();

  return renderAdminLayout(content, 'admin-users');
}
