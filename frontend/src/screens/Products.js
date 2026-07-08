import { renderNavbar, renderFooter } from '../components/Navigation';
import { renderProductCard } from '../components/ProductCard';
import { Search, Box } from 'lucide-static';

const fallbackProducts = [];


export function renderProductsScreen() {
  const container = document.createElement('div');
  container.className = 'products-root';
  let allProducts = [];
  let currentCategory = 'All';
  let searchQuery = '';
  let selectedToCompare = [];

  // Inject Stylesheet
  const styleTag = document.createElement('style');
  styleTag.textContent = `
    .products-root {
      font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
      background: #ffffff;
      color: #0f172a;
    }
    .products-hero {
      background: linear-gradient(135deg, #021a15 0%, #010d0a 100%);
      padding: 180px 0 100px;
      text-align: center;
      position: relative;
      overflow: hidden;
      border-bottom: 1px solid rgba(16, 185, 129, 0.15);
    }
    .products-hero::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at top right, rgba(16, 185, 129, 0.15), transparent 70%),
                  radial-gradient(circle at bottom left, rgba(52, 211, 153, 0.1), transparent 70%);
      pointer-events: none;
    }
    .prod-filter-pill {
      padding: 10px 22px; 
      border-radius: 50px; 
      border: 1px solid rgba(16, 185, 129, 0.15);
      background: rgba(16, 185, 129, 0.03); 
      color: #475569; 
      font-weight: 700;
      font-size: 0.9rem; 
      cursor: pointer; 
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .prod-filter-pill:hover { 
      transform: translateY(-2px); 
      border-color: #10b981; 
      color: #10b981; 
    }
    .prod-filter-pill.active {
      background: #10b981; 
      color: white; 
      border-color: #10b981;
      box-shadow: 0 8px 24px rgba(16, 185, 129, 0.25);
    }

    /* Compare Drawer */
    .compare-drawer {
      position: fixed;
      bottom: -100px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(2, 26, 21, 0.95);
      border: 1px solid rgba(16, 185, 129, 0.2);
      border-radius: 50px;
      padding: 15px 35px;
      display: flex;
      align-items: center;
      gap: 25px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(12px);
      z-index: 1000;
      transition: bottom 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      color: #ffffff;
    }
    .compare-drawer.active {
      bottom: 30px;
    }
    .compare-btn {
      background: #10b981;
      color: #ffffff;
      border: none;
      padding: 10px 24px;
      border-radius: 50px;
      font-weight: 800;
      cursor: pointer;
      font-size: 0.9rem;
      transition: all 0.3s;
      box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
    }
    .compare-btn:hover {
      background: #34d399;
      box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
      transform: translateY(-2px);
    }

    /* Comparison Modal */
    .compare-modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
      padding: 40px;
      opacity: 0;
      transition: opacity 0.4s ease;
    }
    .compare-modal-container {
      width: 100%;
      max-width: 1100px;
      max-height: 90vh;
      background: #ffffff;
      border-radius: 40px;
      position: relative;
      overflow-y: auto;
      padding: 50px;
      transform: scale(0.95);
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      color: #0f172a;
    }
    .compare-modal-grid {
      display: grid;
      grid-template-columns: 1.2fr 1fr 1fr;
      gap: 30px;
    }
    @media (max-width: 768px) {
      .compare-modal-grid {
        grid-template-columns: 1fr;
      }
      .compare-row-header {
        display: none;
      }
    }
    .compare-row-header {
      font-weight: 800;
      color: #64748b;
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #e2e8f0;
      padding: 20px 0;
    }
    .compare-row-cell {
      padding: 20px 0;
      border-bottom: 1px solid #e2e8f0;
      font-size: 0.95rem;
      line-height: 1.5;
    }
  `;
  container.appendChild(styleTag);

  // 1. Hero Section (Premium V2)
  const hero = document.createElement('header');
  hero.className = 'products-hero';
  hero.innerHTML = `
    <div class="container">
      <span class="reveal" style="color: #34d399; font-weight: 800; text-transform: uppercase; letter-spacing: 4px; display: block; margin-bottom: 20px;">Precision Machinery</span>
      <h1 class="reveal" style="font-size: clamp(3rem, 7vw, 5.5rem); font-weight: 900; line-height: 1.05; margin-bottom: 25px; color: #ffffff;">Engineered For <br><span style="background: linear-gradient(135deg, #34d399 0%, #10b981 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Maximum Performance</span></h1>
      <p class="reveal" style="color: #cbd5e1; font-size: 1.25rem; max-width: 700px; margin: 0 auto; line-height: 1.8;">
        Explore our curated collection of high-performance agricultural equipment, from world-class Massey Ferguson tractors to specialized industrial implements.
      </p>
    </div>
  `;

  // 2. Control Bar (Filters & Search - Premium V2)
  const controls = document.createElement('section');
  controls.style.padding = '30px 0';
  controls.style.position = 'sticky';
  controls.style.top = '100px';
  controls.style.zIndex = '100';
  controls.innerHTML = `
    <div class="container">
      <div class="premium-glass-card" style="padding: 15px 30px; border-radius: 100px; display: flex; justify-content: space-between; align-items: center; gap: 20px; flex-wrap: wrap; background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(10px); border: 1px solid rgba(16, 185, 129, 0.15);">
        
        <div id="category-filters-v2" style="display: flex; gap: 10px; flex-wrap: wrap;">
          <button class="prod-filter-pill active" data-category="All">All Equipment</button>
          <button class="prod-filter-pill" data-category="Tractors">Tractors</button>
          <button class="prod-filter-pill" data-category="Farm Implements">Implements</button>
          <button class="prod-filter-pill" data-category="Spare Parts">Spare Parts</button>
        </div>
        
        <div style="position: relative; flex: 1; max-width: 350px; min-width: 250px;">
          <span style="position: absolute; left: 18px; top: 50%; transform: translateY(-50%); color: #10b981; opacity: 0.7;">${Search}</span>
          <input type="text" id="product-search-v2" placeholder="Search our inventory..." 
            style="width: 100%; padding: 14px 20px 14px 48px; border-radius: 50px; border: 1px solid rgba(16, 185, 129, 0.15); outline: none; font-size: 0.95rem; background: #ffffff; color: #0f172a; transition: all 0.3s; font-weight: 600;"
            onfocus="this.style.borderColor='#10b981'; this.style.boxShadow='0 0 15px rgba(16,185,129,0.1)';"
            onblur="this.style.borderColor='rgba(16, 185, 129, 0.15)'; this.style.boxShadow='none';">
        </div>
        
      </div>
    </div>
  `;

  // Compare Drawer Element
  const compareDrawer = document.createElement('div');
  compareDrawer.className = 'compare-drawer';
  compareDrawer.innerHTML = `
    <span style="font-weight: 800; font-size: 0.95rem;">Select equipment to compare specifications side-by-side</span>
    <button class="compare-btn" id="trigger-compare-btn">Compare Now (0)</button>
  `;
  document.body.appendChild(compareDrawer);

  const productsGrid = document.createElement('section');
  productsGrid.style.padding = '80px 0 140px';
  const productsContainer = document.createElement('div');
  productsContainer.className = 'container';
  productsContainer.style.display = 'grid';
  productsContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(320px, 1fr))';
  productsContainer.style.gap = '40px';

  productsContainer.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 100px; color: #64748b; font-size: 1.2rem;">Establishing secure link to machinery database...</div>';

  const updateCompareDrawer = () => {
    const btn = compareDrawer.querySelector('#trigger-compare-btn');
    btn.textContent = `Compare Now (${selectedToCompare.length})`;
    if (selectedToCompare.length > 0) {
      compareDrawer.classList.add('active');
    } else {
      compareDrawer.classList.remove('active');
    }
  };

  const handleCompareChange = (checkbox, product) => {
    if (checkbox.checked) {
      if (selectedToCompare.length >= 2) {
        checkbox.checked = false;
        alert('You can compare up to 2 items at a time.');
        return;
      }
      selectedToCompare.push(product);
    } else {
      selectedToCompare = selectedToCompare.filter(p => p.id !== product.id);
    }
    updateCompareDrawer();
  };

  const applyFilters = () => {
    productsContainer.innerHTML = '';
    
    let filtered = currentCategory === 'All' 
      ? allProducts 
      : allProducts.filter(p => p.category === currentCategory);
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(q) || 
        (p.description && p.description.toLowerCase().includes(q))
      );
    }

    if (filtered.length > 0) {
      filtered.forEach(product => {
        const card = renderProductCard(product);
        card.style.position = 'relative';

        // Add Compare Checkbox Panel
        const compareContainer = document.createElement('div');
        compareContainer.style.cssText = `
          position: absolute;
          top: 15px;
          right: 15px;
          background: rgba(255, 255, 255, 0.95);
          padding: 6px 12px;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.06);
          z-index: 11;
          color: #021a15;
          border: 1px solid rgba(16, 185, 129, 0.15);
        `;
        
        const isChecked = selectedToCompare.some(p => p.id === product.id);
        compareContainer.innerHTML = `
          <input type="checkbox" class="compare-checkbox" data-id="${product.id}" ${isChecked ? 'checked' : ''} style="accent-color: #10b981; cursor: pointer;">
          <span style="user-select: none; cursor: pointer;">Compare</span>
        `;

        const checkbox = compareContainer.querySelector('input');
        checkbox.onclick = (e) => {
          e.stopPropagation();
          handleCompareChange(checkbox, product);
        };
        compareContainer.onclick = (e) => {
          e.stopPropagation();
          checkbox.checked = !checkbox.checked;
          handleCompareChange(checkbox, product);
        };

        card.appendChild(compareContainer);
        productsContainer.appendChild(card);
      });
      if (window.initAnimations) window.initAnimations();
    } else {
      productsContainer.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 120px 20px; background: #f8fafc; border: 1px solid rgba(16, 185, 129, 0.15); border-radius: 32px;">
          <div style="font-size: 4rem; margin-bottom: 25px; opacity: 0.1;">${Box}</div>
          <h3 style="font-size: 1.8rem; font-weight: 900; margin-bottom: 10px; color: #021a15;">No Equipment Found</h3>
          <p style="color: #64748b; font-size: 1.1rem;">Your search criteria did not match any items in our current inventory.</p>
        </div>
      `;
    }
  };

  const setupEventListeners = () => {
    const searchInput = controls.querySelector('#product-search-v2');
    const filterBtns = controls.querySelectorAll('.prod-filter-pill');

    searchInput.oninput = (e) => {
      searchQuery = e.target.value;
      applyFilters();
    };

    filterBtns.forEach(btn => {
      btn.onclick = () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.getAttribute('data-category');
        applyFilters();
      };
    });

    const triggerBtn = compareDrawer.querySelector('#trigger-compare-btn');
    triggerBtn.onclick = () => {
      if (selectedToCompare.length === 0) return;
      openComparisonModal(selectedToCompare);
    };
  };

  const loadPublicProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const dbProducts = await response.json();
      
      const dbNames = new Set(dbProducts.map(p => p.name.toLowerCase()));
      const uniqueFallbacks = fallbackProducts.filter(p => !dbNames.has(p.name.toLowerCase()));
      
      allProducts = [...dbProducts, ...uniqueFallbacks];
      applyFilters();
      setupEventListeners();
    } catch (err) {
      console.error('Error fetching products, using fallbacks:', err);
      allProducts = [...fallbackProducts];
      applyFilters();
      setupEventListeners();
    }
  };

  loadPublicProducts();

  productsGrid.appendChild(productsContainer);
  container.appendChild(renderNavbar());
  container.appendChild(hero);
  container.appendChild(controls);
  container.appendChild(productsGrid);
  container.appendChild(renderFooter());

  // Clean drawer on page leaving
  const originalNavigate = window.navigate;
  window.navigate = function(...args) {
    compareDrawer.remove();
    window.navigate = originalNavigate;
    return originalNavigate.apply(this, args);
  };

  return container;
}

function openComparisonModal(products) {
  const overlay = document.createElement('div');
  overlay.className = 'compare-modal-overlay';
  
  const p1 = products[0];
  const p2 = products[1] || {
    name: 'Select Equipment...',
    category: 'N/A',
    image: 'https://via.placeholder.com/400x300?text=Empty',
    task: 'Select another item on the product screen to compare values side-by-side.',
    specs: [],
    description: ''
  };

  overlay.innerHTML = `
    <div class="compare-modal-container">
      <button class="modal-close-btn-v2" id="close-compare-btn">&times;</button>
      
      <h2 style="font-size: 2.2rem; font-weight: 900; margin-bottom: 40px; border-bottom: 1px solid #e2e8f0; padding-bottom: 20px;">Equipment Specifications Comparison</h2>
      
      <div class="compare-modal-grid">
        <!-- Row 1: Images -->
        <div class="compare-row-header" style="align-items: flex-end;">Product Preview</div>
        <div class="compare-row-cell">
          <img src="${p1.image}" alt="${p1.name}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 20px; border: 1px solid #e2e8f0; margin-bottom: 15px;">
          <h3 style="font-size: 1.25rem; font-weight: 800;">${p1.name}</h3>
        </div>
        <div class="compare-row-cell">
          ${p2.id ? `<img src="${p2.image}" alt="${p2.name}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 20px; border: 1px solid #e2e8f0; margin-bottom: 15px;">` : `<div style="width:100%; height:200px; background:#f8fafc; border-radius:20px; display:flex; align-items:center; justify-content:center; color:#94a3b8; font-weight:700; border:1px dashed #cbd5e1; margin-bottom:15px;">Empty Selection</div>`}
          <h3 style="font-size: 1.25rem; font-weight: 800; color: ${p2.id ? '#0f172a' : '#94a3b8'};">${p2.name}</h3>
        </div>

        <!-- Row 2: Category -->
        <div class="compare-row-header">Category</div>
        <div class="compare-row-cell"><span style="background: rgba(16, 185, 129, 0.08); color: #059669; padding: 6px 16px; border-radius: 50px; font-weight: 700; font-size: 0.8rem;">${p1.category}</span></div>
        <div class="compare-row-cell">${p2.id ? `<span style="background: rgba(16, 185, 129, 0.08); color: #059669; padding: 6px 16px; border-radius: 50px; font-weight: 700; font-size: 0.8rem;">${p2.category}</span>` : '—'}</div>

        <!-- Row 3: Capabilities -->
        <div class="compare-row-header">Primary capability</div>
        <div class="compare-row-cell" style="font-weight: 600; color: #334155;">${p1.task || 'Universal utility farming.'}</div>
        <div class="compare-row-cell" style="font-weight: 600; color: #334155;">${p2.id ? (p2.task || 'Universal utility farming.') : '—'}</div>

        <!-- Row 4: Specs -->
        <div class="compare-row-header">Technical Specifications</div>
        <div class="compare-row-cell">
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            ${(p1.specs || []).map(s => `<span style="background:#f1f5f9; color:#475569; padding:5px 12px; border-radius:50px; font-size:0.75rem; font-weight:700;">${s}</span>`).join('')}
          </div>
        </div>
        <div class="compare-row-cell">
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            ${p2.id ? (p2.specs || []).map(s => `<span style="background:#f1f5f9; color:#475569; padding:5px 12px; border-radius:50px; font-size:0.75rem; font-weight:700;">${s}</span>`).join('') : '—'}
          </div>
        </div>

        <!-- Row 5: Overview -->
        <div class="compare-row-header">Description</div>
        <div class="compare-row-cell" style="color: #64748b; font-size: 0.9rem;">${p1.description || 'N/A'}</div>
        <div class="compare-row-cell" style="color: #64748b; font-size: 0.9rem;">${p2.id ? (p2.description || 'N/A') : '—'}</div>

        <!-- Row 6: Quote Request -->
        <div class="compare-row-header">Action</div>
        <div class="compare-row-cell">
          <a href="tel:+2348099933644" class="compare-btn" style="display: inline-block; text-decoration: none; text-align: center;">Call Sales Desk</a>
        </div>
        <div class="compare-row-cell">
          ${p2.id ? `<a href="tel:+2348099933644" class="compare-btn" style="display: inline-block; text-decoration: none; text-align: center;">Call Sales Desk</a>` : '—'}
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  setTimeout(() => {
    overlay.style.opacity = '1';
    overlay.querySelector('.compare-modal-container').style.transform = 'scale(1)';
  }, 10);

  const closeBtn = overlay.querySelector('#close-compare-btn');
  const closeModal = () => {
    overlay.style.opacity = '0';
    overlay.querySelector('.compare-modal-container').style.transform = 'scale(0.95)';
    setTimeout(() => {
      overlay.remove();
      document.body.style.overflow = '';
    }, 400);
  };
  closeBtn.onclick = closeModal;
  overlay.onclick = (e) => { if (e.target === overlay) closeModal(); };
}
