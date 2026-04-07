import { renderAdminLayout } from '../../components/AdminLayout';
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-static';

export function renderAdminProducts() {
  const content = document.createElement('div');
  let allProducts = [];
  let currentSearch = '';
  let currentCategory = 'All';

  content.innerHTML = `
    <div class="flex-between" style="margin-bottom: 24px; flex-wrap: wrap; gap: 15px;">
      <h1 class="admin-page-title" style="margin-bottom: 0;">Manage Products</h1>
      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <div style="position: relative;">
          <span style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--admin-text-muted); pointer-events: none;">${Search}</span>
          <input type="text" id="adminSearchInput" placeholder="Search product name..." style="padding: 10px 15px 10px 40px; background: var(--admin-surface); color: var(--admin-text); border: 1px solid var(--admin-border); border-radius: 8px; font-size: 0.9rem; min-width: 250px; outline: none;">
        </div>
        <select id="adminCategoryFilter" style="padding: 10px 15px; background: var(--admin-surface); color: var(--admin-text); border: 1px solid var(--admin-border); border-radius: 8px; font-size: 0.9rem; outline: none; cursor: pointer;">
          <option value="All">All Categories</option>
          <option value="Tractors">Tractors</option>
          <option value="Farm Implements">Farm Implements</option>
          <option value="Spare Parts">Spare Parts</option>
        </select>
        <button id="openModalBtn" class="btn-primary" style="display: flex; align-items: center; gap: 8px; padding: 10px 20px;">
          ${Plus} Add Product
        </button>
      </div>
    </div>

    <div class="admin-card">
      <div class="admin-table-container">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th style="text-align: right;">Actions</th>
            </tr>
          </thead>
          <tbody id="products-tbody">
            <tr><td colspan="5" style="text-align: center; padding: 20px;">Loading from API...</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div id="addProductModal" class="admin-modal" style="display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 1000; align-items: center; justify-content: center;">
      <div style="background: var(--admin-surface); padding: 30px; border-radius: 12px; width: 500px; max-width: 90%; border: 1px solid var(--admin-border);">
        <h2 style="margin-top: 0; margin-bottom: 20px; font-size: 1.25rem;">Add New Product</h2>
        <form id="addProductForm" style="display: flex; flex-direction: column; gap: 18px;">
          <div class="form-group-v2">
            <label class="label-v2" style="color: var(--admin-text-muted); font-size: 0.75rem; margin-bottom: 5px; display: block;">EQUIPMENT NAME</label>
            <input type="text" name="name" placeholder="e.g. Massey Ferguson 385" required style="width: 100%; padding: 12px; background: var(--admin-bg); color: var(--admin-text); border: 1px solid var(--admin-border); border-radius: 8px; outline: none;">
          </div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
            <div class="form-group-v2">
              <label class="label-v2" style="color: var(--admin-text-muted); font-size: 0.75rem; margin-bottom: 5px; display: block;">CATEGORY</label>
              <select name="category" required style="width: 100%; padding: 12px; background: var(--admin-bg); color: var(--admin-text); border: 1px solid var(--admin-border); border-radius: 8px; outline: none; cursor: pointer;">
                <option value="Tractors">Tractors</option>
                <option value="Farm Implements">Farm Implements</option>
                <option value="Spare Parts">Spare Parts</option>
              </select>
            </div>
            <div class="form-group-v2">
              <label class="label-v2" style="color: var(--admin-text-muted); font-size: 0.75rem; margin-bottom: 5px; display: block;">ESTIMATED PRICE / TAG</label>
              <input type="text" name="price" placeholder="e.g. ₦15,000,000" required style="width: 100%; padding: 12px; background: var(--admin-bg); color: var(--admin-text); border: 1px solid var(--admin-border); border-radius: 8px; outline: none;">
            </div>
          </div>

          <div class="form-group-v2">
            <label class="label-v2" style="color: var(--admin-text-muted); font-size: 0.75rem; margin-bottom: 5px; display: block;">TECHNICAL SPECIFICATIONS (COMMA SEPARATED)</label>
            <input type="text" name="specs" placeholder="75 HP, 2WD, Fuel Efficient, Direct Injection" style="width: 100%; padding: 12px; background: var(--admin-bg); color: var(--admin-text); border: 1px solid var(--admin-border); border-radius: 8px; outline: none;">
          </div>

          <div class="form-group-v2">
            <label class="label-v2" style="color: var(--admin-text-muted); font-size: 0.75rem; margin-bottom: 5px; display: block;">PRIMARY CAPABILITY / TASK</label>
            <textarea name="task" placeholder="Ideal for large-scale plowing, heavy-duty hauling, and intensive soil preparation." style="width: 100%; padding: 12px; min-height: 70px; background: var(--admin-bg); color: var(--admin-text); border: 1px solid var(--admin-border); border-radius: 8px; outline: none; resize: vertical;"></textarea>
          </div>

          <div class="form-group-v2">
            <label class="label-v2" style="color: var(--admin-text-muted); font-size: 0.75rem; margin-bottom: 5px; display: block;">DETAILED OVERVIEW</label>
            <textarea name="description" placeholder="Provide a comprehensive breakdown of the equipment's history, condition, and value proposition." style="width: 100%; padding: 12px; min-height: 100px; background: var(--admin-bg); color: var(--admin-text); border: 1px solid var(--admin-border); border-radius: 8px; outline: none; resize: vertical;"></textarea>
          </div>

          <div class="form-group-v2">
            <label class="label-v2" style="color: var(--admin-text-muted); font-size: 0.75rem; margin-bottom: 5px; display: block;">MARKETING ASSETS (MAX 5 IMAGES)</label>
            <input type="file" name="image[]" accept="image/*" multiple style="width: 100%; padding: 10px; background: var(--admin-bg); color: var(--admin-text); border: 1px dashed var(--admin-border); border-radius: 8px; cursor: pointer;">
          </div>

          <div class="form-group-v2" style="display: flex; align-items: center; gap: 10px; background: rgba(59, 130, 246, 0.05); padding: 15px; border-radius: 8px; border: 1px solid rgba(59, 130, 246, 0.2);">
            <input type="checkbox" name="is_new_arrival" id="is_new_arrival_input" style="width: 20px; height: 20px; cursor: pointer;">
            <label for="is_new_arrival_input" style="cursor: pointer; font-weight: 600; color: var(--admin-text);">Mark as "New Arrival"</label>
            <span style="font-size: 0.8rem; color: var(--admin-text-muted); margin-left: auto;">Displays a badge on the site</span>
          </div>

          <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 15px; border-top: 1px solid var(--admin-border); padding-top: 20px;">

            <button type="button" id="closeModalBtn" style="padding: 12px 25px; background: none; border: 1px solid var(--admin-border); color: var(--admin-text); border-radius: 8px; cursor: pointer; font-weight: 600;">Cancel</button>
            <button type="submit" class="btn-primary" style="padding: 12px 30px; border-radius: 8px; font-weight: 700;">COMMIT CHANGES</button>
          </div>
        </form>
      </div>
    </div>

  `;

  let currentEditId = null;

  const modal = content.querySelector('#addProductModal');
  const modalTitle = modal.querySelector('h2');
  const openModalBtn = content.querySelector('#openModalBtn');
  const closeModalBtn = content.querySelector('#closeModalBtn');
  const addForm = content.querySelector('#addProductForm');
  const submitBtn = addForm.querySelector('button[type="submit"]');
  const tbody = content.querySelector('#products-tbody');
  const searchInput = content.querySelector('#adminSearchInput');
  const categoryFilter = content.querySelector('#adminCategoryFilter');

  const renderTableRows = (dataToRender) => {
    if (dataToRender.length > 0) {
      tbody.innerHTML = dataToRender.map(product => `
        <tr>
          <td><strong>${product.name}</strong></td>
          <td>${product.category || 'Tractors'}</td>
          <td>${product.price}</td>
          <td>
            <button class="status-btn" data-id="${product.id}" title="Click to toggle status" style="border: none; background: none; cursor: pointer;">
              <span class="badge ${product.status === 'Active' ? 'badge-success' : 'badge-pending'}">${product.status}</span>
            </button>
          </td>
          <td style="text-align: right;">
            <button class="edit-btn" data-id="${product.id}" style="background: none; border: none; cursor: pointer; color: var(--admin-text-muted); margin-right: 12px;">${Edit}</button>
            <button class="delete-btn" data-id="${product.id}" style="background: none; border: none; cursor: pointer; color: #ef4444;">${Trash2}</button>
          </td>
        </tr>
      `).join('');
    } else {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: var(--admin-text-muted); padding: 40px;">No matching products found.</td></tr>';
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
    submitBtn.textContent = 'UPDATE RECODRD';
    addForm.name.value = product.name;
    addForm.category.value = product.category || 'Tractors';
    addForm.price.value = product.price;
    addForm.specs.value = (product.specs || []).join(', ');
    addForm.task.value = product.task || '';
    addForm.description.value = product.description || '';
    addForm.is_new_arrival.checked = !!product.is_new_arrival;
    addForm.elements['image[]'].required = false; 
    modal.style.display = 'flex';
  };

  openModalBtn.onclick = () => {
    currentEditId = null;
    modalTitle.textContent = 'Add New Product';
    submitBtn.textContent = 'Save Product';
    addForm.reset();
    addForm.elements['image[]'].required = true;
    modal.style.display = 'flex';
  };

  closeModalBtn.onclick = () => modal.style.display = 'none';

  addForm.onsubmit = async (e) => {
    e.preventDefault();
    submitBtn.textContent = currentEditId ? 'Updating...' : 'Saving...';
    submitBtn.disabled = true;

    const formData = new FormData(addForm);
    // Explicitly set boolean string for backend compatibility
    formData.set('is_new_arrival', addForm.is_new_arrival.checked ? '1' : '0');
    
    // In case we want to support PUT/PATCH via FormData (Laravel convention)
    // if (currentEditId) formData.append('_method', 'POST'); 
    
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
        modal.style.display = 'none';
        addForm.reset();
        loadProducts();
        alert(currentEditId ? 'Product updated successfully!' : 'Product added successfully!');
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
