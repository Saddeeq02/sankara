import { renderNavbar, renderFooter } from '../components/Navigation';
import { renderProductCard } from '../components/ProductCard';
import { Search, Filter, Box } from 'lucide-static';

const fallbackProducts = [
  {
    id: 'fb-1',
    name: 'Lovol 754-H Utility Tractor',
    category: 'Tractors',
    price: 'Price on Request',
    image: '/assets/fleet_lovol_754h.png',
    images: ['/assets/fleet_lovol_754h.png', '/assets/lovol_tractor_754h.png', '/assets/lovol_tractor_754h_front.png'],
    specs: ['75 HP Engine', 'Heavy-Duty 4WD', 'Synchromesh Transmission', 'Ergonomic Operator Station'],
    task: 'Highly efficient general utility farming, deep tillage, and cargo transportation.',
    description: 'The Lovol 754-H is an exceptionally engineered utility tractor designed to withstand challenging soil conditions. Equipped with a high-torque, fuel-efficient engine and a robust synchromesh gearbox, it delivers smooth mechanical power for continuous daily operations.',
    status: 'Active',
    is_new_arrival: true
  },
  {
    id: 'fb-2',
    name: 'Massey Ferguson MF 375',
    category: 'Tractors',
    price: 'Price on Request',
    image: '/assets/fleet_mf_375.png',
    images: ['/assets/fleet_mf_375.png'],
    specs: ['75 HP Power', 'Durability Focused', 'High Torque Engine', 'Simplified Maintenance'],
    task: 'Heavy tillage, disc ploughing, and large-scale industrial haulage.',
    description: 'The Massey Ferguson MF 375 is a legendary agricultural workhorse built for maximum durability and low operating costs. Featuring a heavy-duty rear axle, high-capacity lift controls, and a robust Perkins engine, it remains the standard for tough agricultural jobs across West Africa.',
    status: 'Active'
  },
  {
    id: 'fb-3',
    name: 'Lovol RG109+ Combine Harvester',
    category: 'Farm Implements',
    price: 'Price on Request',
    image: '/assets/fleet_lovol_rg109plus.png',
    images: ['/assets/fleet_lovol_rg109plus.png', '/assets/lovol_harvester_rg109plus.png', '/assets/lovol_harvester_rg109plus_front.png'],
    specs: ['109 HP Turbocharged', 'Heavy-Duty Crawler Tracks', 'Clean Threshing System', 'Low Grain Loss Rate'],
    task: 'High-speed automated rice, wheat, and soy harvesting.',
    description: 'Designed for optimal paddy and grain field performance, the Lovol RG109+ features advanced crawler tracks for navigating soft, wet mud. With an optimized threshing cylinder and cleaning sieves, it maximizes yield retrieval while keeping grain damage to a absolute minimum.',
    status: 'Active',
    is_new_arrival: true
  },
  {
    id: 'fb-4',
    name: 'Lovol AF108 Combine Harvester',
    category: 'Farm Implements',
    price: 'Price on Request',
    image: '/assets/fleet_lovol_af108.png',
    images: ['/assets/fleet_lovol_af108.png'],
    specs: ['108 HP Engine', 'Adjustable Header', 'High Grain Capacity Tank', 'Smart Cabin Interface'],
    task: 'Automated wheat, corn, and general grain harvesting.',
    description: 'The Lovol AF108 is a premium multi-crop harvester built for large-scale agricultural contractors and corporate agribusinesses. Featuring a spacious cabin with panoramic visibility, it integrates advanced yield sensors and automated header leveling for maximum harvesting efficiency.',
    status: 'Active'
  },
  {
    id: 'fb-5',
    name: 'Genuine Lovol Tractor Filter Kit',
    category: 'Spare Parts',
    price: 'Price on Request',
    image: '/assets/portfolio_aerial.png',
    images: ['/assets/portfolio_aerial.png'],
    specs: ['100% Genuine OEM', 'All-in-One Service Kit', 'Enhanced Filtration', 'Extended Maintenance Interval'],
    task: 'Routine tractor engine servicing and warranty compliance.',
    description: 'An original OEM spare parts maintenance kit consisting of oil filters, secondary fuel filters, and water separators for Lovol tractor models. Ensures clean engine intake and combustion, safeguarding internal mechanical parts from wear.',
    status: 'Active'
  }
];

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

  return container;
}
