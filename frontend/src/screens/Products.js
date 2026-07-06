import { renderNavbar, renderFooter } from '../components/Navigation';
import { renderProductCard } from '../components/ProductCard';
import { Search, Filter, Box } from 'lucide-static';

export function renderProductsScreen() {
  const container = document.createElement('div');
  let allProducts = [];
  let currentCategory = 'All';
  let searchQuery = '';

  // 1. Hero Section (Premium V2)
  const hero = document.createElement('header');
  hero.style.padding = '180px 0 80px';
  hero.style.textAlign = 'center';
  hero.style.background = 'var(--background-color)';
  hero.innerHTML = `
    <div class="container">
      <span class="reveal" style="color: var(--primary-color); font-weight: 800; text-transform: uppercase; letter-spacing: 4px; display: block; margin-bottom: 20px;">Precision Machinery</span>
      <h1 class="reveal" style="font-size: clamp(3rem, 7vw, 5.5rem); font-weight: 900; line-height: 1.05; margin-bottom: 25px;">Engineered For <br><span style="color: var(--primary-color);">Maximum Performance</span></h1>
      <p class="reveal" style="color: var(--text-muted); font-size: 1.25rem; max-width: 700px; margin: 0 auto 60px; line-height: 1.8;">
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
      <div class="premium-glass-card" style="padding: 15px 30px; border-radius: 100px; display: flex; justify-content: space-between; align-items: center; gap: 20px; flex-wrap: wrap;">
        
        <div id="category-filters-v2" style="display: flex; gap: 10px; flex-wrap: wrap;">
          <button class="prod-filter-pill active" data-category="All">All Equipment</button>
          <button class="prod-filter-pill" data-category="Tractors">Tractors</button>
          <button class="prod-filter-pill" data-category="Farm Implements">Implements</button>
          <button class="prod-filter-pill" data-category="Spare Parts">Spare Parts</button>
        </div>
        
        <div style="position: relative; flex: 1; max-width: 350px; min-width: 250px;">
          <span style="position: absolute; left: 18px; top: 50%; transform: translateY(-50%); color: var(--primary-color); opacity: 0.7;">${Search}</span>
          <input type="text" id="product-search-v2" placeholder="Search our inventory..." 
            style="width: 100%; padding: 14px 20px 14px 48px; border-radius: 50px; border: 1px solid var(--glass-border); outline: none; font-size: 0.95rem; background: var(--background-color); color: var(--text-main); transition: all 0.3s; font-weight: 600;"
            onfocus="this.style.borderColor='var(--primary-color)'; this.style.boxShadow='0 0 15px rgba(0,21,91,0.05)';"
            onblur="this.style.borderColor='var(--glass-border)'; this.style.boxShadow='none';">
        </div>
        
      </div>
    </div>
    
    <style>
      .prod-filter-pill {
        padding: 10px 22px; border-radius: 50px; border: 1px solid var(--glass-border);
        background: var(--surface-color); color: var(--text-muted); font-weight: 700;
        font-size: 0.9rem; cursor: pointer; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .prod-filter-pill:hover { transform: translateY(-2px); border-color: var(--primary-color); color: var(--primary-color); }
      .prod-filter-pill.active {
        background: var(--primary-color); color: white; border-color: var(--primary-color);
        box-shadow: 0 8px 16px rgba(0, 21, 91, 0.2);
      }
    </style>
  `;

  const productsGrid = document.createElement('section');
  productsGrid.style.padding = '80px 0 140px';
  const productsContainer = document.createElement('div');
  productsContainer.className = 'container';
  productsContainer.style.display = 'grid';
  productsContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(320px, 1fr))';
  productsContainer.style.gap = '40px';

  productsContainer.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 100px; color: var(--text-muted); font-size: 1.2rem;">Establishing secure link to machinery database...</div>';

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
        productsContainer.appendChild(renderProductCard(product));
      });
      if (window.initAnimations) window.initAnimations();
    } else {
      productsContainer.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 120px 20px; background: var(--surface-color); border: 1px solid var(--glass-border); border-radius: 32px;">
          <div style="font-size: 4rem; margin-bottom: 25px; opacity: 0.1;">${Box}</div>
          <h3 style="font-size: 1.8rem; font-weight: 900; margin-bottom: 10px; color: var(--primary-color);">No Equipment Found</h3>
          <p style="color: var(--text-muted); font-size: 1.1rem;">Your search criteria did not match any items in our current inventory.</p>
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
  };

  const loadPublicProducts = async () => {
    try {
      const response = await fetch('/api/products');
      allProducts = await response.json();
      applyFilters();
      setupEventListeners();
    } catch (err) {
      console.error(err);
      productsContainer.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 100px; color: #ef4444; font-weight: 700;">Connection Error: Database currently unavailable.</div>';
    }
  };

  loadPublicProducts();

  productsGrid.appendChild(productsContainer);
  container.appendChild(renderNavbar());
  container.appendChild(hero);
  container.appendChild(controls);
  container.appendChild(productsGrid);
  container.appendChild(renderFooter());

  return container;
}
