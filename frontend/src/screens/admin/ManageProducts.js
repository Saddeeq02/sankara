import { renderAdminLayout } from '../../components/AdminLayout';
import { Plus, Edit, Trash2 } from 'lucide-static';

export function renderAdminProducts() {
  const content = document.createElement('div');
  
  content.innerHTML = `
    <div class="flex-between" style="margin-bottom: 24px;">
      <h1 class="admin-page-title" style="margin-bottom: 0;">Manage Products</h1>
      <button id="openModalBtn" class="btn-primary" style="display: flex; align-items: center; gap: 8px; padding: 10px 20px;">
        ${Plus} Add Product
      </button>
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
        <form id="addProductForm" style="display: flex; flex-direction: column; gap: 15px;">
          <input type="text" name="name" placeholder="Product Name (e.g. Massey Ferguson 385)" required style="padding: 10px; background: var(--admin-bg); color: var(--admin-text); border: 1px solid var(--admin-border); border-radius: 6px;">
          <select name="category" required style="padding: 10px; background: var(--admin-bg); color: var(--admin-text); border: 1px solid var(--admin-border); border-radius: 6px;">
            <option value="Tractors">Tractors</option>
            <option value="Farm Implements">Farm Implements</option>
            <option value="Spare Parts">Spare Parts</option>
          </select>
          <input type="text" name="price" placeholder="Price (e.g. ₦15,000,000)" required style="padding: 10px; background: var(--admin-bg); color: var(--admin-text); border: 1px solid var(--admin-border); border-radius: 6px;">
          <textarea name="description" placeholder="Short description of features..." style="padding: 10px; min-height: 100px; background: var(--admin-bg); color: var(--admin-text); border: 1px solid var(--admin-border); border-radius: 6px;"></textarea>
          <div>
            <label style="display: block; font-size: 0.85rem; margin-bottom: 5px; font-weight: 600;">Product Image</label>
            <input type="file" name="image" accept="image/*" required style="font-size: 0.85rem; padding: 5px 0;">
          </div>
          <div style="display: flex; gap: 10px; justify-content: flex-end; margin-top: 10px;">
            <button type="button" id="closeModalBtn" style="padding: 10px 20px; background: none; border: 1px solid var(--admin-border); color: var(--admin-text); border-radius: 6px; cursor: pointer;">Cancel</button>
            <button type="submit" class="btn-primary" style="padding: 10px 20px; border-radius: 6px;">Save Product</button>
          </div>
        </form>
      </div>
    </div>

    <div id="adminConfirmOverlay" class="admin-confirm-overlay">
      <div class="admin-confirm-modal">
        <div class="admin-confirm-icon">${Trash2}</div>
        <h2 style="margin: 0 0 10px; color: var(--admin-text);">Delete Product?</h2>
        <p style="margin: 0; color: var(--admin-text-muted); line-height: 1.5;">This action cannot be undone. Are you sure you want to remove this equipment from the database?</p>
        <div class="admin-confirm-btns">
          <button class="confirm-no">Cancel</button>
          <button class="confirm-yes">Yes, Delete</button>
        </div>
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

  const customConfirm = () => {
    return new Promise((resolve) => {
      const overlay = content.querySelector('#adminConfirmOverlay');
      overlay.classList.add('active');
      const yesBtn = overlay.querySelector('.confirm-yes');
      const noBtn = overlay.querySelector('.confirm-no');
      const cleanup = (val) => {
        overlay.classList.remove('active');
        yesBtn.onclick = null;
        noBtn.onclick = null;
        resolve(val);
      };
      yesBtn.onclick = () => cleanup(true);
      noBtn.onclick = () => cleanup(false);
    });
  };

  const openEditModal = (product) => {
    currentEditId = product.id;
    modalTitle.textContent = 'Edit Product';
    submitBtn.textContent = 'Update Product';
    addForm.name.value = product.name;
    addForm.category.value = product.category || 'Tractors';
    addForm.price.value = product.price;
    addForm.description.value = product.description || '';
    addForm.image.required = false; // Not required for edit
    modal.style.display = 'flex';
  };

  openModalBtn.onclick = () => {
    currentEditId = null;
    modalTitle.textContent = 'Add New Product';
    submitBtn.textContent = 'Save Product';
    addForm.reset();
    addForm.image.required = true;
    modal.style.display = 'flex';
  };

  closeModalBtn.onclick = () => modal.style.display = 'none';

  addForm.onsubmit = async (e) => {
    e.preventDefault();
    submitBtn.textContent = currentEditId ? 'Updating...' : 'Saving...';
    submitBtn.disabled = true;

    const formData = new FormData(addForm);
    const url = currentEditId 
      ? `http://localhost:8080/api/products/${currentEditId}` 
      : 'http://localhost:8080/api/products';
    
    try {
      const response = await fetch(url, {
        method: 'POST', // Both use POST (Add is standard, Edit uses POST/{id} for multipart ease)
        headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` },
        body: formData
      });
      
      if (response.ok) {
        modal.style.display = 'none';
        addForm.reset();
        loadProducts();
      } else {
        alert('Failed to process request');
      }
    } catch (err) {
      console.error(err);
      alert('Network error');
    } finally {
      submitBtn.disabled = false;
    }
  };

  const loadProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/products?all=1', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` }
      });
      if (response.status === 401) {
        window.history.pushState({}, '', '/admin/login');
        window.dispatchEvent(new Event('popstate'));
        return;
      }
      const data = await response.json();
      const tbody = content.querySelector('#products-tbody');
      
      if (data.length > 0) {
        tbody.innerHTML = data.map(product => `
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
        
        // Robust Event Delegation for all table actions
        tbody.onclick = async (e) => {
          // Handle Delete
          const deleteBtn = e.target.closest('.delete-btn');
          if (deleteBtn) {
            const id = deleteBtn.getAttribute('data-id');
            if (await customConfirm()) {
              try {
                const res = await fetch(`http://localhost:8080/api/products/${id}`, {
                  method: 'DELETE',
                  headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` }
                });
                if (res.ok) {
                  loadProducts();
                } else {
                  const error = await res.json();
                  alert(`Error: ${error.error || 'Failed to delete product'}`);
                }
              } catch (err) {
                alert('Connection error. Please try again.');
              }
            }
            return;
          }

          // Handle Edit
          const editBtn = e.target.closest('.edit-btn');
          if (editBtn) {
            const id = editBtn.getAttribute('data-id');
            const product = data.find(p => p.id.toString() === id.toString());
            if (product) openEditModal(product);
            return;
          }

          // Handle Status Toggle
          const statusBtn = e.target.closest('.status-btn');
          if (statusBtn) {
            const id = statusBtn.getAttribute('data-id');
            try {
              const res = await fetch(`http://localhost:8080/api/products/${id}/status`, {
                method: 'PATCH',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` }
              });
              if (res.ok) {
                loadProducts();
              }
            } catch (err) {
              console.error('Status update failed:', err);
            }
            return;
          }
        };

      } else {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: var(--admin-text-muted);">No products found.</td></tr>';
      }
    } catch (err) {
      console.error(err);
    }
  };

  setTimeout(loadProducts, 100);

  return renderAdminLayout(content, 'admin-products');
}
