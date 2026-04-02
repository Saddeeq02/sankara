import { renderNavbar, renderFooter } from '../components/Navigation';
import { renderProductCard } from '../components/ProductCard';
import { Search } from 'lucide-static';

export function renderProductsScreen() {
  const container = document.createElement('div');
  let allProducts = [];
  let currentCategory = 'All';
  let searchQuery = '';

  const pageHeader = document.createElement('header');
  pageHeader.style.padding = '120px 0 40px';
  pageHeader.style.background = '#f9f9f9';
  pageHeader.innerHTML = `
    <div class="container">
      <h1 style="font-size: 3rem; font-weight: 800; margin-bottom: 10px;">Our Premium Machinery</h1>
      <p style="color: var(--text-muted); font-size: 1.1rem; max-width: 600px;">
        Browse through our collection of high-performance agricultural equipment, from world-class tractors to specialized farm implements and genuine spare parts.
      </p>
    </div>
  `;

  const filterSection = document.createElement('section');
  filterSection.style.padding = '20px 0';
  filterSection.innerHTML = `
    <div class="container" style="display: flex; justify-content: space-between; align-items: center; gap: 30px; flex-wrap: wrap;">
      <div id="category-filters" style="display: flex; gap: 12px; overflow-x: auto; padding-bottom: 5px;">
        <button class="filter-btn active" data-category="All" style="padding: 10px 22px; border-radius: 50px; border: 1px solid var(--primary-color); background: var(--primary-color); color: white; cursor: pointer; transition: all 0.3s; font-weight: 600;">All Equipment</button>
        <button class="filter-btn" data-category="Tractors" style="padding: 10px 22px; border-radius: 50px; border: 1px solid var(--admin-border); background: white; cursor: pointer; transition: all 0.3s; white-space: nowrap; font-weight: 500;">Tractors</button>
        <button class="filter-btn" data-category="Farm Implements" style="padding: 10px 22px; border-radius: 50px; border: 1px solid var(--admin-border); background: white; cursor: pointer; transition: all 0.3s; white-space: nowrap; font-weight: 500;">Farm Implements</button>
        <button class="filter-btn" data-category="Spare Parts" style="padding: 10px 22px; border-radius: 50px; border: 1px solid var(--admin-border); background: white; cursor: pointer; transition: all 0.3s; white-space: nowrap; font-weight: 500;">Spare Parts</button>
      </div>
      
      <div style="position: relative; flex: 1; max-width: 400px; min-width: 280px;">
        <span style="position: absolute; left: 15px; top: 50%; transform: translateY(-50%); color: var(--text-muted); pointer-events: none;">${Search}</span>
        <input type="text" id="product-search" placeholder="Search by name or description..." style="width: 100%; padding: 12px 15px 12px 45px; border-radius: 50px; border: 1px solid var(--admin-border); outline: none; font-size: 0.95rem; background: var(--surface-color); color: var(--text-main); box-shadow: 0 4px 10px rgba(0,0,0,0.02); transition: all 0.3s;">
      </div>
    </div>
  `;

  const productsGrid = document.createElement('section');
  productsGrid.style.padding = '40px 0 100px';
  const productsContainer = document.createElement('div');
  productsContainer.className = 'container';
  productsContainer.style.display = 'grid';
  productsContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
  productsContainer.style.gap = '30px';

  productsContainer.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 50px; color: #666;">Loading machinery catalog...</div>';

  const applyFilters = () => {
    productsContainer.innerHTML = '';
    
    // Filter by Category
    let filtered = currentCategory === 'All' 
      ? allProducts 
      : allProducts.filter(p => p.category === currentCategory);
    
    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(q) || 
        (p.description && p.description.toLowerCase().includes(q))
      );
    }

    if (filtered.length > 0) {
      filtered.forEach(product => {
        productsContainer.appendChild(renderProductCard(product));
      });
      if (window.initAnimations) window.initAnimations();
    } else {
      productsContainer.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 80px 20px;">
          <div style="font-size: 3rem; margin-bottom: 20px;">🚜</div>
          <h3 style="font-size: 1.5rem; margin-bottom: 10px;">No matching equipment found</h3>
          <p style="color: var(--text-muted);">Try adjusting your filters or search keywords.</p>
        </div>
      `;
    }
  };

  const setupEventListeners = () => {
    const searchInput = filterSection.querySelector('#product-search');
    const filterBtns = filterSection.querySelectorAll('.filter-btn');

    searchInput.oninput = (e) => {
      searchQuery = e.target.value;
      applyFilters();
    };

    filterBtns.forEach(btn => {
      btn.onclick = () => {
        // Toggle Active Classes
        filterBtns.forEach(b => {
          b.classList.remove('active');
          b.style.background = 'white';
          b.style.color = 'var(--text-main)';
          b.style.borderColor = 'var(--admin-border)';
        });
        btn.classList.add('active');
        btn.style.background = 'var(--primary-color)';
        btn.style.color = 'white';
        btn.style.borderColor = 'var(--primary-color)';

        currentCategory = btn.getAttribute('data-category');
        applyFilters();
      };
    });
  };

  const loadPublicProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/products');
      allProducts = await response.json();
      applyFilters();
      setupEventListeners();
    } catch (err) {
      console.error(err);
      productsContainer.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 50px; color: #ef4444;">Error connecting to machinery database.</div>';
    }
  };

  loadPublicProducts();

  productsGrid.appendChild(productsContainer);
  container.appendChild(renderNavbar());
  container.appendChild(pageHeader);
  container.appendChild(filterSection);
  container.appendChild(productsGrid);
  container.appendChild(renderFooter());

  return container;
}
