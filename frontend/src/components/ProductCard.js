export function renderProductCard(product) {
  const card = document.createElement('div');
  card.className = 'card reveal';
  card.style.cssText = `
    background: var(--surface-color);
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: var(--card-shadow);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
  `;

  card.innerHTML = `
    <div style="height: 200px; background: #eee; position: relative; overflow: hidden;">
      <img src="${product.image || 'https://via.placeholder.com/400x300?text=Sankara+Machinery'}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">
      <div style="position: absolute; top: 10px; right: 10px; background: var(--secondary-color); color: white; padding: 4px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: 600;">
        ${product.category || 'Machinery'}
      </div>
    </div>
    <div style="padding: 20px;">
      <h3 style="margin-bottom: 10px; font-size: 1.25rem;">${product.name}</h3>
      <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 20px; height: 3.6em; overflow: hidden;">
        ${product.description || 'Premium agricultural solution engineered for high productivity and durability in Nigerian soil.'}
      </p>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-weight: 700; color: var(--primary-color); font-size: 1.1rem;">${product.price || 'Price on Request'}</span>
        <button class="btn-primary" style="padding: 8px 16px; font-size: 0.85rem;">View Details</button>
      </div>
    </div>
  `;

  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px)';
    card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
    card.style.boxShadow = 'var(--card-shadow)';
  });

  return card;
}
