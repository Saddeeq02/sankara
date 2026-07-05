import { renderNavbar, renderFooter } from '../components/Navigation';
import { renderProductCard } from '../components/ProductCard';

export function renderHomeScreen() {
  const container = document.createElement('div');
  container.style.backgroundColor = '#030712';
  container.style.minHeight = '100vh';

  // Inject Custom Styles for Bento Grid
  const styleTag = document.createElement('style');
  styleTag.textContent = `
    .bento-layout {
      max-width: 1400px;
      margin: 0 auto;
      padding: 140px 20px 80px;
      display: grid;
      grid-template-columns: 360px 1fr;
      gap: 30px;
    }
    
    @media (max-width: 1024px) {
      .bento-layout {
        grid-template-columns: 1fr;
        padding-top: 100px;
      }
    }
    
    /* Branding Panel */
    .brand-panel {
      background: linear-gradient(180deg, rgba(15, 23, 42, 0.4) 0%, rgba(15, 23, 42, 0.1) 100%);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 32px;
      padding: 45px 35px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      backdrop-filter: blur(20px);
      position: sticky;
      top: 120px;
      height: calc(100vh - 180px);
      min-height: 500px;
    }
    
    @media (max-width: 1024px) {
      .brand-panel {
        position: relative;
        top: 0;
        height: auto;
        min-height: auto;
        gap: 40px;
      }
    }
    
    .brand-glow {
      position: absolute;
      top: -100px;
      left: -100px;
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0) 70%);
      pointer-events: none;
    }
    
    /* Bento Grid */
    .bento-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-auto-rows: minmax(180px, auto);
      gap: 25px;
    }
    
    @media (max-width: 1200px) {
      .bento-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (max-width: 640px) {
      .bento-grid {
        grid-template-columns: 1fr;
      }
    }
    
    /* Card Styles */
    .bento-card {
      background: rgba(15, 23, 42, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.04);
      border-radius: 28px;
      padding: 30px;
      position: relative;
      overflow: hidden;
      backdrop-filter: blur(15px);
      transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), 
                  border-color 0.4s ease, 
                  box-shadow 0.4s ease;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    
    .bento-card:hover {
      transform: translateY(-6px);
      border-color: rgba(0, 210, 255, 0.25);
      box-shadow: 0 20px 40px -20px rgba(0, 210, 255, 0.2);
    }
    
    /* Card Sizes */
    .col-span-2 { grid-column: span 2; }
    .row-span-2 { grid-row: span 2; }
    
    @media (max-width: 1200px) {
      .col-span-2 { grid-column: span 2; }
      .row-span-2 { grid-row: span 1; }
    }
    
    @media (max-width: 640px) {
      .col-span-2 { grid-column: span 1; }
      .row-span-2 { grid-row: span 1; }
    }
    
    /* Custom Scrollbar for list card */
    .bento-list {
      max-height: 250px;
      overflow-y: auto;
      padding-right: 5px;
    }
    
    .bento-list::-webkit-scrollbar {
      width: 4px;
    }
    
    .bento-list::-webkit-scrollbar-track {
      background: rgba(255,255,255,0.02);
    }
    
    .bento-list::-webkit-scrollbar-thumb {
      background: rgba(255,255,255,0.1);
      border-radius: 4px;
    }
    
    .bento-list::-webkit-scrollbar-thumb:hover {
      background: rgba(0, 210, 255, 0.3);
    }
    
    /* Interactive Tabs */
    .bento-tab-btn {
      background: none;
      border: none;
      color: rgba(255, 255, 255, 0.5);
      font-size: 0.85rem;
      font-weight: 700;
      letter-spacing: 1px;
      cursor: pointer;
      padding: 6px 12px;
      border-radius: 8px;
      transition: all 0.3s ease;
    }
    
    .bento-tab-btn.active {
      background: rgba(59, 130, 246, 0.1);
      color: #00d2ff;
    }
    
    /* Stats */
    .bento-stat-num {
      font-size: 3.5rem;
      font-weight: 900;
      line-height: 1;
      background: linear-gradient(135deg, #00d2ff 0%, #3b82f6 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 5px;
    }
  `;
  container.appendChild(styleTag);

  // Layout Node
  const layout = document.createElement('div');
  layout.className = 'bento-layout';

  // BRAND PANEL (LEFT SIDEBAR)
  const sidebar = document.createElement('div');
  sidebar.className = 'brand-panel';
  sidebar.innerHTML = `
    <div class="brand-glow"></div>
    <div>
      <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(59, 130, 246, 0.1); padding: 8px 16px; border-radius: 100px; border: 1px solid rgba(59, 130, 246, 0.15); margin-bottom: 30px;">
        <span style="width: 8px; height: 8px; background: #10b981; border-radius: 50%; box-shadow: 0 0 10px #10b981;"></span>
        <span style="font-size: 0.75rem; font-weight: 700; letter-spacing: 1px; color: rgba(255,255,255,0.7); text-transform: uppercase;">Direct CDN Upload Active</span>
      </div>
      <h1 style="font-size: clamp(2rem, 3.5vw, 3.2rem); font-weight: 950; line-height: 1.05; color: #fff; margin-bottom: 20px;">
        SANKARA<br><span style="background: linear-gradient(135deg, #00d2ff 0%, #3b82f6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">NIGERIA</span>
      </h1>
      <p style="color: rgba(255,255,255,0.55); font-size: 1.05rem; line-height: 1.6; margin-bottom: 30px;">
        Empowering large-scale agricultural projects with heavy-duty mechanization infrastructure since 1986.
      </p>
    </div>
    
    <div>
      <div style="display: flex; gap: 15px; margin-bottom: 25px;">
        <a href="/products" class="btn-primary" style="flex: 1; text-align: center; font-weight: 700; padding: 14px 20px;">Explore Fleet</a>
      </div>
      <div style="font-size: 0.8rem; color: rgba(255,255,255,0.3); border-top: 1px solid rgba(255,255,255,0.05); padding-top: 20px;">
        Authorized Massey Ferguson Dealer & Support Network.
      </div>
    </div>
  `;

  // BENTO GRID (RIGHT CONTENT)
  const grid = document.createElement('div');
  grid.className = 'bento-grid';

  // 1. Featured Equipment Card (span 2-2)
  const featuredCard = document.createElement('div');
  featuredCard.className = 'bento-card col-span-2 row-span-2';
  featuredCard.style.minHeight = '480px';
  featuredCard.innerHTML = `
    <div style="position: absolute; inset: 0; background: radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.12) 0%, transparent 60%); pointer-events: none;"></div>
    <div id="featured-loader" style="position: absolute; inset: 0; background: #0b1120; z-index: 20; display: flex; align-items: center; justify-content: center; transition: opacity 0.5s;">
      <div style="text-align: center;">
        <svg class="splash-gear" style="width: 50px; height: 50px; animation: spin 4s linear infinite; opacity: 0.5; margin-bottom: 15px;" viewBox="0 0 100 100" fill="none"><path d="M50 25C36.19 25 25 36.19 25 50C25 63.81 36.19 75 50 75C63.81 75 75 63.81 75 50C75 36.19 63.81 25 50 25ZM50 67C40.61 67 33 59.39 33 50C33 40.61 40.61 33 50 33C59.39 33 67 40.61 67 50C67 59.39 59.39 67 50 67Z" fill="#00d2ff"/></svg>
        <div style="font-size: 0.85rem; font-weight: 700; color: rgba(255,255,255,0.4); letter-spacing: 1px;">LOADING FLEET...</div>
      </div>
    </div>
    <div id="featured-content" style="opacity: 0; transition: opacity 0.5s; display: flex; flex-direction: column; justify-content: space-between; height: 100%; z-index: 10;">
      <!-- Header -->
      <div class="flex-between" style="width:100%;">
        <span style="font-size: 0.75rem; font-weight: 800; letter-spacing: 2px; color: #00d2ff; text-transform: uppercase;">FLAGSHIP MACHINERY</span>
        <div style="display: flex; gap: 5px;">
          <button class="bento-tab-btn active" data-tab="specs">SPECS</button>
          <button class="bento-tab-btn" data-tab="task">CAPABILITY</button>
        </div>
      </div>
      
      <!-- Visuals & Specs -->
      <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 30px; margin: 30px 0; align-items: center;">
        <div style="position: relative; border-radius: 20px; overflow: hidden; height: 220px; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.05);">
          <img id="featured-img" src="" alt="Featured Machinery" style="width: 100%; height: 100%; object-fit: cover;">
          <div style="position: absolute; inset:0; background: linear-gradient(to top, rgba(15,23,42,0.8), transparent)"></div>
        </div>
        <div>
          <h2 id="featured-name" style="font-size: 1.8rem; font-weight: 850; color: #fff; margin-bottom: 15px; line-height: 1.1;">-</h2>
          <div id="featured-tab-content" style="color: rgba(255,255,255,0.6); font-size: 0.95rem; line-height: 1.6;">
            <!-- Dynamic spec table -->
          </div>
        </div>
      </div>
      
      <!-- Action -->
      <div class="flex-between" style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 20px;">
        <div>
          <div style="font-size: 0.75rem; color: rgba(255,255,255,0.4); text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px;">Estimated Investment</div>
          <div id="featured-price" style="font-size: 1.35rem; font-weight: 850; color: #10b981;">-</div>
        </div>
        <button id="featured-inquire-btn" class="btn-primary" style="padding: 10px 25px; border-radius: 12px; font-weight: 700;">Secure Quote</button>
      </div>
    </div>
  `;

  // 2. Interactive Direct Inquiry Card (span 1-2)
  const inquiryCard = document.createElement('div');
  inquiryCard.className = 'bento-card row-span-2';
  inquiryCard.innerHTML = `
    <div style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
      <div>
        <span style="font-size: 0.75rem; font-weight: 800; letter-spacing: 2px; color: #10b981; text-transform: uppercase;">Direct Line</span>
        <h3 style="font-size: 1.35rem; font-weight: 850; color: #fff; margin: 10px 0 20px;">Instant Quotation</h3>
        <form id="bento-inquiry-form" style="display: flex; flex-direction: column; gap: 15px;">
          <input type="text" name="name" placeholder="Your Name" required style="width:100%; padding: 12px; background: rgba(0,0,0,0.25); color:#fff; border: 1px solid rgba(255,255,255,0.05); border-radius: 10px; outline:none; font-size: 0.85rem;">
          <input type="email" name="email" placeholder="Your Email" required style="width:100%; padding: 12px; background: rgba(0,0,0,0.25); color:#fff; border: 1px solid rgba(255,255,255,0.05); border-radius: 10px; outline:none; font-size: 0.85rem;">
          <input type="text" id="inquiry-machinery" name="machinery" placeholder="Machinery Selected" style="width:100%; padding: 12px; background: rgba(0,0,0,0.25); color:#fff; border: 1px solid rgba(255,255,255,0.05); border-radius: 10px; outline:none; font-size: 0.85rem;">
          <textarea name="message" placeholder="Message or specifications required..." required style="width:100%; padding: 12px; height: 110px; background: rgba(0,0,0,0.25); color:#fff; border: 1px solid rgba(255,255,255,0.05); border-radius: 10px; outline:none; font-size: 0.85rem; resize:none;"></textarea>
          <button type="submit" class="btn-primary" style="width:100%; padding:14px; border-radius:10px; font-weight:700; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border:none; box-shadow: 0 4px 15px rgba(16,185,129,0.2);">Transmit Request</button>
        </form>
      </div>
    </div>
  `;

  // 3. Category Filter Card (span 1-1)
  const categoryCard = document.createElement('div');
  categoryCard.className = 'bento-card';
  categoryCard.innerHTML = `
    <div>
      <span style="font-size: 0.75rem; font-weight: 800; letter-spacing: 2px; color: rgba(255,255,255,0.4); text-transform: uppercase;">FILTER INVENTORY</span>
      <h3 style="font-size: 1.2rem; font-weight: 850; color: #fff; margin: 8px 0 20px;">Category Selector</h3>
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <button class="bento-tab-btn active category-btn" data-cat="All" style="text-align: left; padding: 10px 15px; border-radius: 10px; width: 100%; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); color: #fff;">All Machinery</button>
        <button class="bento-tab-btn category-btn" data-cat="Tractors" style="text-align: left; padding: 10px 15px; border-radius: 10px; width: 100%; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); color: #fff;">Tractors</button>
        <button class="bento-tab-btn category-btn" data-cat="Farm Implements" style="text-align: left; padding: 10px 15px; border-radius: 10px; width: 100%; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); color: #fff;">Implements</button>
      </div>
    </div>
  `;

  // 4. Logistics & Distribution Card (span 1-1)
  const logisticsCard = document.createElement('div');
  logisticsCard.className = 'bento-card';
  logisticsCard.innerHTML = `
    <div style="height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
      <div>
        <span style="font-size: 0.75rem; font-weight: 800; letter-spacing: 2px; color: rgba(255,255,255,0.4); text-transform: uppercase;">SUPPORT NETWORK</span>
        <h3 style="font-size: 1.2rem; font-weight: 850; color: #fff; margin: 8px 0 10px;">Nationwide Reach</h3>
        <p style="font-size: 0.85rem; color: rgba(255,255,255,0.5); line-height: 1.5;">
          Strategically deployed hubs in Kano, Abuja, and Lagos to guarantee immediate technical support.
        </p>
      </div>
      <div style="background: rgba(0,210,255,0.05); border: 1px solid rgba(0,210,255,0.1); border-radius: 12px; padding: 10px 15px; display: flex; align-items: center; gap: 10px;">
        <span style="width: 8px; height: 8px; background: #00d2ff; border-radius: 50%; animation: pulse-text 1.5s infinite;"></span>
        <span style="font-size: 0.8rem; font-weight: 800; color: #00d2ff;">SPARES ON-DEMAND</span>
      </div>
    </div>
  `;

  // 5. Impact Metrics Card (span 1-1)
  const impactCard = document.createElement('div');
  impactCard.className = 'bento-card';
  impactCard.innerHTML = `
    <div style="height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
      <div>
        <span style="font-size: 0.75rem; font-weight: 800; letter-spacing: 2px; color: rgba(255,255,255,0.4); text-transform: uppercase;">OUR METRICS</span>
        <h3 style="font-size: 1.2rem; font-weight: 850; color: #fff; margin: 8px 0 15px;">Proven Performance</h3>
      </div>
      <div style="display: flex; gap: 20px; align-items: baseline;">
        <div>
          <div class="bento-stat-num">40+</div>
          <div style="font-size: 0.75rem; color: rgba(255,255,255,0.4); font-weight: 700;">YEARS</div>
        </div>
        <div>
          <div class="bento-stat-num">500+</div>
          <div style="font-size: 0.75rem; color: rgba(255,255,255,0.4); font-weight: 700;">DELIVERED</div>
        </div>
      </div>
    </div>
  `;

  // 6. Our Heritage / About Card (span 3-1 or 2-1)
  const heritageCard = document.createElement('div');
  heritageCard.className = 'bento-card col-span-2';
  heritageCard.id = 'about';
  heritageCard.innerHTML = `
    <div style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
      <div>
        <span style="font-size: 0.75rem; font-weight: 800; letter-spacing: 2px; color: #3b82f6; text-transform: uppercase;">Our Legacy</span>
        <h3 style="font-size: 1.4rem; font-weight: 850; color: #fff; margin: 8px 0 15px;">Building Agricultural Strength</h3>
        <p style="font-size: 0.95rem; color: rgba(255,255,255,0.55); line-height: 1.6;">
          Since our inception in 1986, Sankara Nigeria Limited has partnered with corporate farming ventures, government schemes, and smallholders to deliver durable Massey Ferguson machinery and custom technical configurations suited to Nigerian soil conditions.
        </p>
      </div>
      <div style="display: flex; gap: 20px; margin-top: 20px; flex-wrap: wrap;">
        <div style="display:flex; align-items:center; gap: 8px; font-size:0.85rem; font-weight:700; color: #fff;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          Genuine Parts Only
        </div>
        <div style="display:flex; align-items:center; gap: 8px; font-size:0.85rem; font-weight:700; color: #fff;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          Expert Field Operators
        </div>
      </div>
    </div>
  `;

  // 7. Mini team preview card
  const teamPreviewCard = document.createElement('div');
  teamPreviewCard.className = 'bento-card';
  teamPreviewCard.innerHTML = `
    <div style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
      <div>
        <span style="font-size: 0.75rem; font-weight: 800; letter-spacing: 2px; color: rgba(255,255,255,0.4); text-transform: uppercase;">MEET LEADERSHIP</span>
        <h3 style="font-size: 1.2rem; font-weight: 850; color: #fff; margin: 8px 0 12px;">Executive Board</h3>
        <p style="font-size: 0.85rem; color: rgba(255,255,255,0.5); line-height: 1.5;">
          Our leadership board consists of veteran agronomists and mechanical specialists.
        </p>
      </div>
      <a href="/about" class="bento-tab-btn" style="text-align: left; padding:0; color:#3b82f6; font-weight:700; display: inline-flex; align-items: center; gap: 5px;">
        View Executive Profiles
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </a>
    </div>
  `;

  // Assemble Bento
  grid.appendChild(featuredCard);
  grid.appendChild(inquiryCard);
  grid.appendChild(categoryCard);
  grid.appendChild(logisticsCard);
  grid.appendChild(impactCard);
  grid.appendChild(heritageCard);
  grid.appendChild(teamPreviewCard);

  layout.appendChild(sidebar);
  layout.appendChild(grid);

  container.appendChild(renderNavbar());
  container.appendChild(layout);
  container.appendChild(renderFooter());

  // Interactive Logic
  let activeCategory = 'All';
  let activeTab = 'specs';
  let productsData = [];
  let featuredIndex = 0;

  const loadBentoProducts = async () => {
    try {
      const res = await fetch('/api/products');
      productsData = await res.json();
      updateFeaturedProduct();
      
      const loader = featuredCard.querySelector('#featured-loader');
      const content = featuredCard.querySelector('#featured-content');
      if (loader) loader.style.opacity = '0';
      if (content) content.style.opacity = '1';
      setTimeout(() => loader && loader.remove(), 500);
    } catch (err) {
      console.error(err);
    }
  };

  const updateFeaturedProduct = () => {
    const filtered = activeCategory === 'All' 
      ? productsData 
      : productsData.filter(p => p.category === activeCategory);

    const fContent = featuredCard.querySelector('#featured-content');
    if (filtered.length === 0) {
      featuredCard.querySelector('#featured-name').textContent = "No stock available";
      featuredCard.querySelector('#featured-price').textContent = "-";
      featuredCard.querySelector('#featured-img').src = "https://images.unsplash.com/photo-1594411139708-ba98d5f30e06?auto=format&fit=crop&q=80&w=800";
      featuredCard.querySelector('#featured-tab-content').innerHTML = "Check back soon for available equipment in this category.";
      return;
    }

    const prod = filtered[featuredIndex % filtered.length] || filtered[0];
    
    // Update fields
    featuredCard.querySelector('#featured-name').textContent = prod.name;
    featuredCard.querySelector('#featured-price').textContent = prod.price || 'Contact for price';
    featuredCard.querySelector('#featured-img').src = prod.image || "https://images.unsplash.com/photo-1594411139708-ba98d5f30e06?auto=format&fit=crop&q=80&w=800";
    
    // Auto fill inquiry form when featured machinery changes
    const inquiryField = inquiryCard.querySelector('#inquiry-machinery');
    if (inquiryField) {
      inquiryField.value = prod.name;
    }

    const specContent = featuredCard.querySelector('#featured-tab-content');
    if (activeTab === 'specs') {
      const specsList = prod.specs || [];
      if (specsList.length > 0) {
        specContent.innerHTML = `<ul style="padding-left: 20px; margin: 0; display:flex; flex-direction:column; gap: 8px;">
          ${specsList.map(s => `<li>${s}</li>`).join('')}
        </ul>`;
      } else {
        specContent.innerHTML = `<p style="margin:0;">No technical specifications defined for this equipment model.</p>`;
      }
    } else {
      specContent.innerHTML = `<p style="margin:0; font-style: italic;">"${prod.task || 'Heavy-duty agricultural mechanization support.'}"</p>`;
    }
  };

  // Bind category filters
  categoryCard.querySelectorAll('.category-btn').forEach(btn => {
    btn.onclick = (e) => {
      categoryCard.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      activeCategory = e.target.getAttribute('data-cat');
      featuredIndex = 0;
      updateFeaturedProduct();
    };
  });

  // Bind tabs
  featuredCard.querySelectorAll('.bento-tab-btn').forEach(btn => {
    btn.onclick = (e) => {
      featuredCard.querySelectorAll('.bento-tab-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      activeTab = e.target.getAttribute('data-tab');
      updateFeaturedProduct();
    };
  });

  // Inquire button focus
  featuredCard.querySelector('#featured-inquire-btn').onclick = () => {
    const form = inquiryCard.querySelector('#bento-inquiry-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth', block: 'center' });
      form.name.focus();
      // Visual feedback
      inquiryCard.style.borderColor = 'rgba(16, 185, 129, 0.6)';
      setTimeout(() => {
        inquiryCard.style.borderColor = 'rgba(255, 255, 255, 0.04)';
      }, 2000);
    }
  };

  // Inquiry Form Submission
  const inquiryForm = inquiryCard.querySelector('#bento-inquiry-form');
  inquiryForm.onsubmit = async (e) => {
    e.preventDefault();
    const btn = inquiryForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Transmitting...';

    const payload = {
      name: inquiryForm.name.value,
      email: inquiryForm.email.value,
      machinery: inquiryForm.machinery.value,
      message: inquiryForm.message.value
    };

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        alert('Your inquiry has been logged! Our sales representatives will reach out shortly.');
        inquiryForm.reset();
      } else {
        alert('Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      alert('Connection error.');
    } finally {
      btn.disabled = false;
      btn.textContent = 'Transmit Request';
    }
  };

  loadBentoProducts();

  return container;
}
