export function renderProductCard(product) {
  const card = document.createElement('div');
  card.className = 'premium-glass-card reveal';
  card.style.cssText = `
    border-radius: 24px;
    overflow: hidden;
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    height: 100%;
  `;

  const mainImage = product.images && product.images.length > 0 ? product.images[0] : (product.image || 'https://via.placeholder.com/400x300?text=Sankara+Machinery');
  const specs = product.specs || [];
  
  card.innerHTML = `
    <div style="height: 280px; position: relative; overflow: hidden; border-bottom: 1px solid var(--glass-border);">
      <img src="${mainImage}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s ease;" class="card-img-v2">
      
      ${product.is_new_arrival ? `
        <div class="new-arrival-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          NEW ARRIVAL
        </div>
      ` : ''}

      <div style="position: absolute; top: 15px; left: 15px; background: var(--primary-color); color: white; padding: 6px 16px; border-radius: 100px; font-size: 0.7rem; font-weight: 800; z-index: 10; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 4px 10px rgba(0, 21, 91, 0.2);">
        ${product.category || 'Machinery'}
      </div>
      <div class="card-overlay-v2">

        <span style="font-weight: 800; font-size: 0.9rem; letter-spacing: 1px;">VIEW TECHNICAL SPECS</span>
      </div>
    </div>

    <div style="padding: 30px; display: flex; flex-direction: column; flex: 1;">
      <h3 style="font-size: 1.5rem; font-weight: 900; margin-bottom: 12px; line-height: 1.2; color: var(--text-main);">${product.name}</h3>
      
      ${product.task ? `<p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 20px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; height: 3em;">${product.task}</p>` : ''}
      
      <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 25px;">
        ${specs.slice(0, 3).map(s => `<span style="background: rgba(59, 130, 246, 0.05); color: var(--primary-color); padding: 5px 12px; border-radius: 50px; font-size: 0.75rem; font-weight: 700; border: 1px solid rgba(59, 130, 246, 0.1);">${s}</span>`).join('')}
        ${specs.length > 3 ? `<span style="background: var(--surface-color); color: var(--text-muted); padding: 5px 10px; border-radius: 50px; font-size: 0.75rem; font-weight: 700; border: 1px solid var(--glass-border);">+${specs.length - 3}</span>` : ''}
      </div>

      <div style="margin-top: auto; display: flex; gap: 12px; align-items: center; border-top: 1px solid var(--glass-border); padding-top: 20px;">
        <button class="btn-primary" style="flex: 1; padding: 12px; border-radius: 12px; font-weight: 800; font-size: 0.9rem;" onclick="event.stopPropagation(); window.location.href='tel:+2348099933644'">
          INQUIRE NOW
        </button>
        <button style="width: 45px; height: 45px; border-radius: 12px; border: 1px solid #25d366; background: rgba(37, 211, 102, 0.1); color: #25d366; display: flex; align-items: center; justify-content: center; transition: all 0.3s;" 
                onclick="event.stopPropagation(); window.open('https://wa.me/2348099933644?text=Hello Sankara, I am interested in the ${product.name}.', '_blank')"
                onmouseover="this.style.background='#25d366'; this.style.color='white'"
                onmouseout="this.style.background='rgba(37, 211, 102, 0.1)'; this.style.color='#25d366'">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7c.9 0 1.8.1 2.7.4L21 3l-1.3 5.4c.1.9.3 1.8.3 3.1z"/></svg>
        </button>
      </div>
    </div>

    <style>
      .card-overlay-v2 {
        position: absolute; inset: 0; background: rgba(0, 21, 91, 0.4); backdrop-filter: blur(4px);
        display: flex; align-items: center; justify-content: center; color: white; opacity: 0; transition: all 0.4s ease;
      }
      .premium-glass-card:hover .card-overlay-v2 { opacity: 1; }
      .premium-glass-card:hover .card-img-v2 { transform: scale(1.1); }
      .premium-glass-card:hover { transform: translateY(-12px); border-color: var(--primary-color) !important; box-shadow: 0 20px 40px rgba(0, 21, 91, 0.15) !important; }
    </style>
  `;

  card.addEventListener('click', () => {
    openProductModal(product);
  });

  return card;
}

function openProductModal(product) {
  const images = product.images && product.images.length > 0 
    ? product.images 
    : [product.image || 'https://via.placeholder.com/400x300?text=Sankara+Machinery'];

  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'detail-modal-overlay-v2';
  
  modalOverlay.innerHTML = `
    <div class="detail-modal-container-v2 premium-glass-card">
      <button class="modal-close-btn-v2">&times;</button>
      
      <div class="modal-content-grid-v2">
        <!-- Gallery -->
        <div class="modal-gallery-v2">
          <img src="${images[0]}" alt="${product.name}" class="modal-main-img-v2">
          <div class="thumb-grid-v2">
             ${images.map((img, i) => `<img src="${img}" class="thumb-v2 ${i === 0 ? 'active' : ''}" data-index="${i}">`).join('')}
          </div>
        </div>
        
        <!-- Info -->
        <div class="modal-info-v2">
          <span style="color: var(--primary-color); text-transform: uppercase; font-size: 0.85rem; font-weight: 800; letter-spacing: 2px; margin-bottom: 12px; display: block;">${product.category || 'Machinery'}</span>
          <h1 style="font-size: 2.8rem; font-weight: 900; margin-bottom: 20px; line-height: 1.1; color: var(--text-main);">${product.name}</h1>
          <div style="font-size: 1.8rem; font-weight: 900; color: var(--primary-color); margin-bottom: 30px;">${product.price || 'Price on Request'}</div>
          
          <div style="margin-bottom: 30px; border-top: 1px solid var(--glass-border); padding-top: 30px;">
            <h4 style="margin-bottom: 12px; font-size: 0.9rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px;">Primary Task / Capability</h4>
            <p style="color: var(--text-main); font-size: 1.15rem; line-height: 1.6; font-weight: 500;">${product.task || 'Universal high-performance agricultural operations.'}</p>
          </div>
          
          <div style="margin-bottom: 30px;">
            <h4 style="margin-bottom: 15px; font-size: 0.9rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px;">Technical Specifications</h4>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              ${(product.specs || ['Industrial Grade', 'Certified', 'High Efficiency']).map(s => `<span class="spec-pill-v2">${s}</span>`).join('')}
            </div>
          </div>
          
          <div style="margin-bottom: 40px;">
            <h4 style="margin-bottom: 12px; font-size: 0.9rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px;">Product Overview</h4>
            <p style="color: var(--text-muted); line-height: 1.8; font-size: 1rem;">
              ${product.description || 'Premium quality agricultural solution engineered for maximum durability and efficiency in diverse regional conditions. This equipment complies with all international safety and performance standards.'}
            </p>
          </div>
          
          <div style="margin-top: auto; display: flex; gap: 15px;">
            <a href="tel:+2348099933644" class="btn-primary" style="flex: 1; padding: 18px; text-align: center; border-radius: 16px; font-weight: 800; font-size: 1.1rem; text-decoration: none;">
               Request Executive Quote
            </a>
            <a href="https://wa.me/2348099933644?text=Interested in ${product.name}" target="_blank" style="padding: 18px 25px; border-radius: 16px; border: 2px solid #25d366; color: #25d366; display: flex; align-items: center; justify-content: center;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7c.9 0 1.8.1 2.7.4L21 3l-1.3 5.4c.1.9.3 1.8.3 3.1z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
    
    <style>
      .detail-modal-overlay-v2 {
        position: fixed; inset: 0; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(12px);
        display: flex; align-items: center; justify-content: center; z-index: 2000; padding: 40px;
        opacity: 0; transition: opacity 0.4s ease;
      }
      .detail-modal-container-v2 {
        width: 100%; max-width: 1200px; max-height: 90vh; background: var(--background-color);
        border-radius: 40px; position: relative; overflow-y: auto; padding: 50px;
        transform: scale(0.95); transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .modal-close-btn-v2 {
        position: absolute; top: 25px; right: 25px; background: var(--surface-color); border: 1px solid var(--glass-border);
        width: 45px; height: 45px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
        font-size: 1.8rem; cursor: pointer; transition: all 0.3s; z-index: 10;
      }
      .modal-close-btn-v2:hover { background: var(--primary-color); color: white; border-color: var(--primary-color); transform: rotate(90deg); }
      
      .modal-content-grid-v2 { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; }
      
      .modal-main-img-v2 { width: 100%; height: 500px; object-fit: cover; border-radius: 30px; margin-bottom: 20px; border: 1px solid var(--glass-border); }
      .thumb-grid-v2 { display: flex; gap: 15px; flex-wrap: wrap; }
      .thumb-v2 { width: 80px; height: 80px; object-fit: cover; border-radius: 12px; cursor: pointer; opacity: 0.6; transition: all 0.3s; border: 2px solid transparent; }
      .thumb-v2.active { opacity: 1; border-color: var(--primary-color); }
      
      .spec-pill-v2 { padding: 8px 18px; border-radius: 100px; background: rgba(59, 130, 246, 0.08); border: 1px solid rgba(59, 130, 246, 0.1); color: var(--primary-color); font-size: 0.9rem; font-weight: 700; }
      
      @media (max-width: 968px) {
        .modal-content-grid-v2 { grid-template-columns: 1fr; gap: 40px; }
        .detail-modal-container-v2 { padding: 30px; border-radius: 30px; }
        .modal-main-img-v2 { height: 300px; }
      }
    </style>
  `;

  document.body.appendChild(modalOverlay);
  document.body.style.overflow = 'hidden';

  // Modal Interactive Logic
  setTimeout(() => {
    modalOverlay.style.opacity = '1';
    modalOverlay.querySelector('.detail-modal-container-v2').style.transform = 'scale(1)';
  }, 10);

  const mainImg = modalOverlay.querySelector('.modal-main-img-v2');
  const thumbs = modalOverlay.querySelectorAll('.thumb-v2');
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      mainImg.src = thumb.src;
    });
  });

  const closeBtn = modalOverlay.querySelector('.modal-close-btn-v2');
  const closeModal = () => {
    modalOverlay.style.opacity = '0';
    modalOverlay.querySelector('.detail-modal-container-v2').style.transform = 'scale(0.95)';
    setTimeout(() => {
      modalOverlay.remove();
      document.body.style.overflow = '';
    }, 400);
  };
  closeBtn.onclick = closeModal;
  modalOverlay.onclick = (e) => { if (e.target === modalOverlay) closeModal(); };
}
