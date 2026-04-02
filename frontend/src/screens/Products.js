import { renderNavbar, renderFooter } from '../components/Navigation';
import { renderProductCard } from '../components/ProductCard';

const mockProducts = [
  { id: 1, name: 'Massey Ferguson 385', category: 'Tractor', description: 'Power: 85 HP. Engine: 4.41L. 2WD/4WD options available.', image: '/src/assets/products_mf_385.png' },
  { id: 2, name: 'Lovol M504', category: 'Tractor', description: 'Compact and efficient tractor for versatile farming needs.', image: '/src/assets/products_lovol_m504.png' },
  { id: 3, name: 'Zoomlion RG1804', category: 'Tractor', description: 'Heavy-duty 180 HP tractor with advanced hydraulic systems.', image: '/src/assets/products_zoomlion_rg1804.png' },
  { id: 4, name: 'Disc Plough 3-Furrow', category: 'Implement', description: 'Reinforced tubular frame for heavy-duty soil preparation.', image: 'https://images.unsplash.com/photo-1614531341773-3bff8b7cb3fc?auto=format&fit=crop&q=80&w=800' },
  { id: 5, name: 'Seed Drill Pro', category: 'Implement', description: 'High-precision sowing for a variety of seed types.', image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=800' },
  { id: 6, name: 'Rotary Tiller XL', category: 'Implement', description: 'Optimized for soil tilling and weed control.', image: 'https://images.unsplash.com/photo-1594411139708-ba98d5f30e06?auto=format&fit=crop&q=80&w=800' },
];

export function renderProductsScreen() {
  const container = document.createElement('div');

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
    <div class="container" style="display: flex; gap: 15px; overflow-x: auto; padding-bottom: 10px;">
      <button style="padding: 10px 20px; border-radius: 50px; border: 1px solid var(--primary-color); background: var(--primary-color); color: white; cursor: pointer;">All Equipment</button>
      <button style="padding: 10px 20px; border-radius: 50px; border: 1px solid #ddd; background: white; cursor: pointer; white-space: nowrap;">Tractors</button>
      <button style="padding: 10px 20px; border-radius: 50px; border: 1px solid #ddd; background: white; cursor: pointer; white-space: nowrap;">Farm Implements</button>
      <button style="padding: 10px 20px; border-radius: 50px; border: 1px solid #ddd; background: white; cursor: pointer; white-space: nowrap;">Spare Parts</button>
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

  const loadPublicProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/products');
      const data = await response.json();
      productsContainer.innerHTML = '';
      
      if (data.length > 0) {
        data.forEach(product => {
          productsContainer.appendChild(renderProductCard(product));
        });
        
        // Trigger animations for the newly added cards
        if (window.initAnimations) {
          window.initAnimations();
        }
      } else {
        productsContainer.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 50px; color: #666;">No equipment currently listed. Check back soon.</div>';
      }
    } catch (err) {
      console.error(err);
      productsContainer.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 50px; color: #ef4444;">Error connecting to machinery database.</div>';
    }
  };

  setTimeout(loadPublicProducts, 100);

  productsGrid.appendChild(productsContainer);

  container.appendChild(renderNavbar());
  container.appendChild(pageHeader);
  container.appendChild(filterSection);
  container.appendChild(productsGrid);
  container.appendChild(renderFooter());

  return container;
}
