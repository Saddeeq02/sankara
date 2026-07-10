import { renderNavbar, renderFooter } from '../components/Navigation';

export function renderGalleryScreen() {
  const container = document.createElement('div');
  container.className = 'gallery-redirect-root';

  const styleTag = document.createElement('style');
  styleTag.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');
    
    .gallery-redirect-root {
      font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
      background: #ffffff;
      color: #0f172a;
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .gallery-redirect-content {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 140px 20px 100px;
      background: linear-gradient(135deg, #f8fafc 0%, #fee2e2 50%, #eff6ff 100%);
      position: relative;
    }

    .gallery-redirect-content::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at top, rgba(37, 99, 235, 0.05), transparent 75%);
      pointer-events: none;
    }

    .gallery-redirect-card {
      background: #ffffff;
      border: 1px solid rgba(37, 99, 235, 0.1);
      border-radius: 32px;
      padding: 50px 40px;
      max-width: 550px;
      text-align: center;
      box-shadow: 0 30px 60px rgba(15, 23, 42, 0.05);
      z-index: 2;
    }

    .gallery-redirect-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(37, 99, 235, 0.08);
      padding: 8px 16px;
      border-radius: 100px;
      border: 1px solid rgba(37, 99, 235, 0.15);
      margin-bottom: 25px;
      color: #2563eb;
      font-size: 0.75rem;
      font-weight: 800;
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    .gallery-redirect-title {
      font-size: 2.2rem;
      font-weight: 900;
      line-height: 1.2;
      margin-bottom: 15px;
      letter-spacing: -1px;
    }

    .gallery-redirect-title span {
      background: linear-gradient(135deg, #dc2626 0%, #2563eb 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .gallery-redirect-desc {
      font-size: 1.05rem;
      line-height: 1.6;
      color: #475569;
      margin-bottom: 35px;
    }

    .gallery-redirect-btn {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: #2563eb;
      color: #ffffff;
      padding: 16px 36px;
      border-radius: 100px;
      font-size: 0.95rem;
      font-weight: 800;
      text-decoration: none;
      box-shadow: 0 10px 25px rgba(37, 99, 235, 0.3);
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      cursor: pointer;
      border: none;
    }

    .gallery-redirect-btn:hover {
      background: #dc2626;
      transform: translateY(-2px);
      box-shadow: 0 12px 30px rgba(220, 38, 38, 0.35);
    }

    @media (max-width: 576px) {
      .gallery-redirect-card {
        padding: 40px 20px;
      }
      .gallery-redirect-title {
        font-size: 1.8rem;
      }
    }
  `;
  container.appendChild(styleTag);

  const mainContent = document.createElement('main');
  mainContent.className = 'gallery-redirect-content';
  mainContent.innerHTML = `
    <div class="gallery-redirect-card">
      <div class="gallery-redirect-badge">Archive Update</div>
      <h2 class="gallery-redirect-title">Our Media Gallery <span>Has Relocated</span></h2>
      <p class="gallery-redirect-desc">
        To provide a more cohesive experience, our complete exhibition archive, technical workshop photos, and regional field visit media have been merged with our Field Journal timeline.
      </p>
      <button class="gallery-redirect-btn" id="goToActivitiesBtn">
        Explore Activities & Gallery
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </button>
    </div>
  `;

  // Navigate to Activities on click
  setTimeout(() => {
    const btn = mainContent.querySelector('#goToActivitiesBtn');
    if (btn) {
      btn.onclick = () => {
        if (window.navigate) {
          window.navigate('activities');
        }
      };
    }
  }, 0);

  container.appendChild(renderNavbar());
  container.appendChild(mainContent);
  container.appendChild(renderFooter());

  return container;
}
