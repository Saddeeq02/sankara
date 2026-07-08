import { renderAdminLayout } from '../../components/AdminLayout';
import { Plus, Edit, Trash2, Search, Box } from 'lucide-static';

const escapeHTML = (str) => {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

export function renderAdminProducts() {
  const content = document.createElement('div');
  let allProducts = [];
  let currentSearch = '';
  let currentCategory = 'All';

  content.innerHTML = `
    <!-- Top Action Bar -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; flex-wrap: wrap; gap: 20px;">
      <div>
        <h1 class="admin-page-title" style="margin-bottom: 6px;">Manage Machinery</h1>
        <p style="margin: 0; color: var(--admin-text-muted); font-size: 0.95rem; font-weight: 500;">Add, update, and manage your public product catalog.</p>
      </div>
      
      <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
        <!-- Search -->
        <div style="position: relative; min-width: 280px;">
          <span style="position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: var(--admin-text-muted); pointer-events: none; display: flex; align-items: center;">
            ${Search}
          </span>
          <input type="text" id="adminSearchInput" placeholder="Search equipment catalog..." style="width: 100%; padding: 12px 16px 12px 48px; background: var(--admin-surface); color: var(--admin-text); border: 1px solid var(--admin-border); border-radius: 14px; font-size: 0.9rem; font-weight: 500; outline: none; transition: all 0.2s; box-sizing: border-box;" onfocus="this.style.borderColor='var(--admin-primary)'; this.style.boxShadow='var(--shadow-sm)';" onblur="this.style.borderColor='var(--admin-border)';" />
        </div>
        
        <!-- Category Dropdown -->
        <select id="adminCategoryFilter" style="padding: 12px 20px; background: var(--admin-surface); color: var(--admin-text); border: 1px solid var(--admin-border); border-radius: 14px; font-size: 0.9rem; font-weight: 600; outline: none; cursor: pointer; transition: all 0.2s;">
          <option value="All">All Categories</option>
          <option value="Tractors">Tractors</option>
          <option value="Farm Implements">Farm Implements</option>
          <option value="Spare Parts">Spare Parts</option>
        </select>
        
        <!-- Add Machinery Button -->
        <button id="openModalBtn" style="display: flex; align-items: center; gap: 8px; padding: 12px 24px; background: var(--admin-primary); color: white; border: none; border-radius: 14px; font-weight: 700; font-size: 0.9rem; cursor: pointer; transition: all 0.2s; box-shadow: var(--shadow-sm);" onmouseover="this.style.transform='translateY(-1px)';" onmouseout="this.style.transform='none';">
          ${Plus} Add Equipment
        </button>
      </div>
    </div>

    <!-- Product Catalog List Card -->
    <div class="admin-card" style="padding: 0; overflow: hidden; border-radius: 20px;">
      <div class="admin-table-container">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Equipment Name</th>
              <th>Category</th>
              <th>Status</th>
              <th style="text-align: right; padding-right: 32px;">Actions</th>
            </tr>
          </thead>
          <tbody id="products-tbody">
            <tr>
              <td colspan="4" style="text-align: center; padding: 48px; color: var(--admin-text-muted);">
                <div style="font-weight: 500;">Establishing secure database link...</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Premium Modal Dialogue Overlay -->
    <div id="addProductModal" class="admin-confirm-overlay">
      <div class="admin-confirm-modal" style="max-width: 600px; text-align: left; padding: 36px; border-radius: 24px; max-height: 90vh; overflow-y: auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; border-bottom: 1px solid var(--admin-border); padding-bottom: 16px;">
          <h2 id="modalTitle" style="margin: 0; font-size: 1.45rem; font-weight: 800; color: var(--admin-text); letter-spacing: -0.02em;">Add New Equipment</h2>
          <button type="button" id="closeModalCross" style="background: none; border: none; font-size: 1.75rem; color: var(--admin-text-muted); cursor: pointer; line-height: 1; padding: 0;">&times;</button>
        </div>
        
        <form id="addProductForm" style="display: flex; flex-direction: column; gap: 20px;">
          <div class="form-group-v2">
            <label class="label-v2" style="color: var(--admin-text-muted); font-size: 0.75rem; font-weight: 700; margin-bottom: 6px; display: block; letter-spacing: 0.05em; text-transform: uppercase;">Equipment Name</label>
            <input type="text" name="name" placeholder="e.g. Lovol 754-H Utility Tractor" required style="width: 100%; padding: 12px 16px; background: var(--admin-bg); color: var(--admin-text); border: 1px solid var(--admin-border); border-radius: 12px; font-weight: 500; outline: none; box-sizing: border-box; transition: all 0.2s;" onfocus="this.style.borderColor='var(--admin-primary)';" onblur="this.style.borderColor='var(--admin-border)';" />
          </div>
          
          <div class="form-group-v2">
            <label class="label-v2" style="color: var(--admin-text-muted); font-size: 0.75rem; font-weight: 700; margin-bottom: 6px; display: block; letter-spacing: 0.05em; text-transform: uppercase;">Category</label>
            <select name="category" required style="width: 100%; padding: 12px 16px; background: var(--admin-bg); color: var(--admin-text); border: 1px solid var(--admin-border); border-radius: 12px; font-weight: 600; outline: none; cursor: pointer; box-sizing: border-box; transition: all 0.2s;" onfocus="this.style.borderColor='var(--admin-primary)';" onblur="this.style.borderColor='var(--admin-border)';">
              <option value="Tractors">Tractors</option>
              <option value="Farm Implements">Farm Implements</option>
              <option value="Spare Parts">Spare Parts</option>
            </select>
          </div>

          <div class="form-group-v2">
            <label class="label-v2" style="color: var(--admin-text-muted); font-size: 0.75rem; font-weight: 700; margin-bottom: 6px; display: block; letter-spacing: 0.05em; text-transform: uppercase;">Technical Specifications (Comma Separated)</label>
            <input type="text" name="specs" placeholder="75 HP, 4WD Engine, Dual-Stage Clutch" style="width: 100%; padding: 12px 16px; background: var(--admin-bg); color: var(--admin-text); border: 1px solid var(--admin-border); border-radius: 12px; font-weight: 500; outline: none; box-sizing: border-box; transition: all 0.2s;" onfocus="this.style.borderColor='var(--admin-primary)';" onblur="this.style.borderColor='var(--admin-border)';" />
          </div>

          <div class="form-group-v2">
            <label class="label-v2" style="color: var(--admin-text-muted); font-size: 0.75rem; font-weight: 700; margin-bottom: 6px; display: block; letter-spacing: 0.05em; text-transform: uppercase;">Primary Capability / Task</label>
            <textarea name="task" placeholder="e.g. Optimized for seed bed preparation, soil tillage, and general utility haulage operations." style="width: 100%; padding: 12px 16px; min-height: 60px; background: var(--admin-bg); color: var(--admin-text); border: 1px solid var(--admin-border); border-radius: 12px; font-weight: 500; outline: none; resize: vertical; box-sizing: border-box; transition: all 0.2s;" onfocus="this.style.borderColor='var(--admin-primary)';" onblur="this.style.borderColor='var(--admin-border)';"></textarea>
          </div>

          <div class="form-group-v2">
            <label class="label-v2" style="color: var(--admin-text-muted); font-size: 0.75rem; font-weight: 700; margin-bottom: 6px; display: block; letter-spacing: 0.05em; text-transform: uppercase;">Detailed Overview</label>
            <textarea name="description" placeholder="Provide comprehensive technical specifications, usage recommendations, and durability features..." style="width: 100%; padding: 12px 16px; min-height: 90px; background: var(--admin-bg); color: var(--admin-text); border: 1px solid var(--admin-border); border-radius: 12px; font-weight: 500; outline: none; resize: vertical; box-sizing: border-box; transition: all 0.2s;" onfocus="this.style.borderColor='var(--admin-primary)';" onblur="this.style.borderColor='var(--admin-border)';"></textarea>
          </div>

          <div class="form-group-v2">
            <label class="label-v2" style="color: var(--admin-text-muted); font-size: 0.75rem; font-weight: 700; margin-bottom: 6px; display: block; letter-spacing: 0.05em; text-transform: uppercase;">Marketing Assets (Images)</label>
            <input type="file" name="image[]" accept="image/*" multiple style="width: 100%; padding: 12px; background: var(--admin-bg); color: var(--admin-text); border: 2px dashed var(--admin-border); border-radius: 12px; cursor: pointer; box-sizing: border-box;" />
            <span style="font-size: 0.75rem; color: var(--admin-text-muted); margin-top: 4px; display: block;">Select one or multiple photos to showcase.</span>
          </div>

          <div class="form-group-v2" style="display: flex; align-items: center; gap: 12px; background: rgba(59, 130, 246, 0.04); padding: 16px; border-radius: 12px; border: 1px solid rgba(59, 130, 246, 0.15);">
            <input type="checkbox" name="is_new_arrival" id="is_new_arrival_input" style="width: 20px; height: 20px; cursor: pointer; accent-color: var(--admin-primary);" />
            <div>
              <label for="is_new_arrival_input" style="cursor: pointer; font-weight: 700; color: var(--admin-text); font-size: 0.9rem;">Mark as "New Arrival"</label>
              <span style="font-size: 0.75rem; color: var(--admin-text-muted); display: block; margin-top: 2px;">Will feature a prominent glowing label on the main website portal.</span>
            </div>
          </div>

          <!-- Modal Footer Controls -->
          <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 10px; border-top: 1px solid var(--admin-border); padding-top: 20px;">
            <button type="button" id="closeModalBtn" style="padding: 12px 24px; background: none; border: 1px solid var(--admin-border); color: var(--admin-text); border-radius: 12px; cursor: pointer; font-weight: 600; font-size: 0.9rem; transition: all 0.2s;" onmouseover="this.style.background='var(--admin-hover)';" onmouseout="this.style.background='none';">Cancel</button>
            <button type="submit" id="submitFormBtn" style="padding: 12px 28px; background: var(--admin-primary); color: white; border: none; border-radius: 12px; font-weight: 700; font-size: 0.9rem; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.transform='translateY(-1px)';" onmouseout="this.style.transform='none';">Save Equipment</button>
          </div>
        </form>
      </div>
    </div>
  `;

  let currentEditId = null;

  const modal = content.querySelector('#addProductModal');
  const modalContainer = modal.querySelector('.admin-confirm-modal');
  const modalTitle = modal.querySelector('#modalTitle');
  const openModalBtn = content.querySelector('#openModalBtn');
  const closeModalBtn = content.querySelector('#closeModalBtn');
  const closeModalCross = content.querySelector('#closeModalCross');
  const addForm = content.querySelector('#addProductForm');
  const submitBtn = content.querySelector('#submitFormBtn');
  const tbody = content.querySelector('#products-tbody');
  const searchInput = content.querySelector('#adminSearchInput');
  const categoryFilter = content.querySelector('#adminCategoryFilter');

  const renderTableRows = (dataToRender) => {
    if (dataToRender.length > 0) {
      tbody.innerHTML = dataToRender.map(product => `
        <tr>
          <td>
            <div style="font-weight: 700; color: var(--admin-text);">${escapeHTML(product.name)}</div>
          </td>
          <td style="font-weight: 600; color: var(--admin-text-muted);">${escapeHTML(product.category || 'Tractors')}</td>
          <td>
            <button class="status-btn" data-id="${product.id}" title="Toggle Availability Status" style="border: none; background: none; padding: 0; cursor: pointer;">
              <span class="badge ${product.status === 'Active' ? 'badge-success' : 'badge-pending'}">${product.status}</span>
            </button>
          </td>
          <td style="text-align: right; padding-right: 32px;">
            <button class="edit-btn" data-id="${product.id}" style="background: none; border: none; cursor: pointer; color: var(--admin-text-muted); padding: 6px; border-radius: 8px; transition: all 0.2s; margin-right: 8px;" onmouseover="this.style.color='var(--admin-primary)';" onmouseout="this.style.color='var(--admin-text-muted)';">${Edit}</button>
            <button class="delete-btn" data-id="${product.id}" style="background: none; border: none; cursor: pointer; color: #ef4444; padding: 6px; border-radius: 8px; transition: all 0.2s;" onmouseover="this.style.backgroundColor='rgba(239, 68, 68, 0.08)';" onmouseout="this.style.backgroundColor='transparent';">${Trash2}</button>
          </td>
        </tr>
      `).join('');
    } else {
      tbody.innerHTML = `
        <tr>
          <td colspan="4" style="text-align: center; color: var(--admin-text-muted); padding: 64px 20px;">
            <div style="font-size: 2.5rem; opacity: 0.15; margin-bottom: 12px;">${Box}</div>
            <div style="font-weight: 600; font-size: 1.1rem; margin-bottom: 4px;">No Machinery Found</div>
            <div style="font-size: 0.9rem;">Try adjusting your filters or add a new equipment item above.</div>
          </td>
        </tr>
      `;
    }
  };

  const applyFilters = () => {
    let filtered = allProducts;
    if (currentCategory !== 'All') {
      filtered = filtered.filter(p => p.category === currentCategory);
    }
    if (currentSearch) {
      const q = currentSearch.toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(q));
    }
    renderTableRows(filtered);
  };

  searchInput.oninput = (e) => {
    currentSearch = e.target.value;
    applyFilters();
  };

  categoryFilter.onchange = (e) => {
    currentCategory = e.target.value;
    applyFilters();
  };

  const openEditModal = (product) => {
    currentEditId = product.id;
    modalTitle.textContent = 'Refine Equipment Details';
    submitBtn.textContent = 'Update Record';
    addForm.name.value = product.name;
    addForm.category.value = product.category || 'Tractors';
    addForm.specs.value = (product.specs || []).join(', ');
    addForm.task.value = product.task || '';
    addForm.description.value = product.description || '';
    addForm.is_new_arrival.checked = !!product.is_new_arrival;
    addForm.elements['image[]'].required = false; 
    
    // Open modal with smooth animation
    modal.classList.add('active');
  };

  openModalBtn.onclick = () => {
    currentEditId = null;
    modalTitle.textContent = 'Add New Machinery';
    submitBtn.textContent = 'Save Equipment';
    addForm.reset();
    addForm.elements['image[]'].required = true;
    
    // Open modal with smooth animation
    modal.classList.add('active');
  };

  const hideModal = () => {
    modal.classList.remove('active');
  };

  closeModalBtn.onclick = hideModal;
  closeModalCross.onclick = hideModal;
  modal.onclick = (e) => {
    if (e.target === modal) hideModal();
  };

  const compressImage = (file, maxWidth = 1200, maxHeight = 1200, quality = 0.7) => {
    return new Promise((resolve) => {
      if (!file.type.startsWith('image/')) {
        return resolve(file);
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob((blob) => {
            resolve(new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now()
            }));
          }, 'image/jpeg', quality);
        };
        img.onerror = () => resolve(file);
      };
      reader.onerror = () => resolve(file);
    });
  };

  addForm.onsubmit = async (e) => {
    e.preventDefault();
    submitBtn.textContent = currentEditId ? 'Updating...' : 'Saving...';
    submitBtn.disabled = true;

    const formData = new FormData();
    formData.append('name', addForm.name.value);
    formData.append('category', addForm.category.value);
    formData.append('description', addForm.description.value);
    formData.append('task', addForm.task.value);
    formData.append('is_new_arrival', addForm.is_new_arrival.checked ? '1' : '0');
    formData.append('price', '');
    if (currentEditId) {
      formData.append('status', addForm.status ? addForm.status.value : 'Active');
    }
    
    // Handle Technical Specifications if present
    if (addForm.specs) {
      formData.append('specs', addForm.specs.value);
    }
    
    // Compress and append image files
    const fileInput = addForm.querySelector('input[type="file"]');
    if (fileInput && fileInput.files.length > 0) {
      for (const file of fileInput.files) {
        const compressedFile = await compressImage(file);
        formData.append('image[]', compressedFile);
      }
    }
    
    const url = currentEditId 
      ? `/api/products/${currentEditId}` 
      : '/api/products';
    
    const token = localStorage.getItem('admin_token');
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}` 
        },
        body: formData
      });
      
      const result = await response.json();
      
      if (response.ok) {
        hideModal();
        addForm.reset();
        loadProducts();
      } else {
        console.error('Server Error:', result);
        alert(`Error: ${result.error || 'Failed to process request'}`);
      }
    } catch (err) {
      console.error('Fetch Error:', err);
      alert('Network error. Is the backend running?');
    } finally {
      submitBtn.disabled = false;
    }
  };

  const loadProducts = async () => {
    try {
      const response = await fetch('/api/products?all=1', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` }
      });
      if (response.status === 401) {
        window.history.pushState({}, '', '/admin/login');
        window.dispatchEvent(new Event('popstate'));
        return;
      }
      allProducts = await response.json();
      applyFilters();
    } catch (err) {
      console.error(err);
    }
  };

  // Global Table Actions (Delegation)
  tbody.onclick = async (e) => {
    const deleteBtn = e.target.closest('.delete-btn');
    if (deleteBtn) {
      const id = deleteBtn.getAttribute('data-id');
      if (await window.showConfirm('Are you sure you want to delete this equipment? This action cannot be undone.')) {
        try {
          const res = await fetch(`/api/products/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` }
          });
          if (res.ok) loadProducts();
        } catch (err) { alert('Connection error'); }
      }
      return;
    }

    const editBtn = e.target.closest('.edit-btn');
    if (editBtn) {
      const id = editBtn.getAttribute('data-id');
      const product = allProducts.find(p => p.id.toString() === id.toString());
      if (product) openEditModal(product);
      return;
    }

    const statusBtn = e.target.closest('.status-btn');
    if (statusBtn) {
      const id = statusBtn.getAttribute('data-id');
      try {
        const res = await fetch(`/api/products/${id}/status`, {
          method: 'PATCH',
          headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` }
        });
        if (res.ok) loadProducts();
      } catch (err) { console.error(err); }
      return;
    }
  };

  loadProducts();

  return renderAdminLayout(content, 'admin-products');
}
