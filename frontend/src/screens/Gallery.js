import { renderNavbar, renderFooter } from '../components/Navigation';

const galleryImages = [
  { src: '/src/assets/gallery_farmers.png', alt: 'Farmers with new tractor', category: 'Community' },
  { src: '/src/assets/gallery_workshop.png', alt: 'Tractor engine and tools', category: 'Maintenance' },
  { src: '/src/assets/hero.png', alt: 'Red tractor in field', category: 'Field Operation' },
];

export function renderGalleryScreen() {
  const container = document.createElement('div');

  const pageHeader = document.createElement('header');
  pageHeader.style.padding = '120px 0 40px';
  pageHeader.style.background = '#f9f9f9';
  pageHeader.innerHTML = `
    <div class="container" style="text-align: center;">
      <h1 style="font-size: 3.5rem; font-weight: 800; margin-bottom: 10px;">Our Gallery</h1>
      <p style="color: var(--text-muted); font-size: 1.2rem; max-width: 700px; margin: 0 auto;">
        A visual journey through our impact, operations, and the community we serve.
      </p>
    </div>
  `;

  const gallerySection = document.createElement('section');
  gallerySection.style.padding = '80px 0';

  let gridHTML = `<div class="container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">`;
  
  galleryImages.forEach((img, index) => {
    gridHTML += `
      <div class="reveal" style="position: relative; border-radius: var(--border-radius); overflow: hidden; box-shadow: var(--card-shadow); animation-delay: ${index * 0.1}s; cursor: pointer; aspect-ratio: 1;">
        <img src="${img.src}" alt="${img.alt}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s;">
        <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); opacity: 0; transition: opacity 0.3s; display: flex; align-items: flex-end; padding: 20px;">
          <h3 style="color: white; font-size: 1.5rem;">${img.category}</h3>
        </div>
      </div>
    `;
  });

  gridHTML += `</div>`;
  gallerySection.innerHTML = gridHTML;

  // Add hover effects via JS since it's injected HTML
  setTimeout(() => {
    const items = gallerySection.querySelectorAll('.reveal');
    items.forEach(item => {
      item.addEventListener('mouseenter', () => {
        item.querySelector('img').style.transform = 'scale(1.1)';
        item.querySelector('div').style.opacity = '1';
      });
      item.addEventListener('mouseleave', () => {
        item.querySelector('img').style.transform = 'scale(1)';
        item.querySelector('div').style.opacity = '0';
      });
    });
  }, 100);

  container.appendChild(renderNavbar());
  container.appendChild(pageHeader);
  container.appendChild(gallerySection);
  container.appendChild(renderFooter());

  return container;
}
