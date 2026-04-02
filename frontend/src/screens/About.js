import { renderNavbar, renderFooter } from '../components/Navigation';

export function renderAboutScreen() {
  const container = document.createElement('div');

  const pageHeader = document.createElement('header');
  pageHeader.style.padding = '120px 0 40px';
  pageHeader.style.background = '#f9f9f9';
  pageHeader.innerHTML = `
    <div class="container" style="text-align: center;">
      <h1 style="font-size: 3.5rem; font-weight: 800; margin-bottom: 10px;">About Sankara</h1>
      <p style="color: var(--text-muted); font-size: 1.2rem; max-width: 700px; margin: 0 auto;">
        We are passionate about transforming agriculture in Nigeria through innovation, mechanization, and sustainable practices.
      </p>
    </div>
  `;

  const visionMissionSection = document.createElement('section');
  visionMissionSection.style.padding = '80px 0';
  visionMissionSection.innerHTML = `
    <div class="container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 40px;">
      <div class="card reveal" style="padding: 50px; background: white; border-radius: var(--border-radius); box-shadow: var(--card-shadow); text-align: center;">
        <div style="font-size: 3rem; margin-bottom: 20px;">👁️</div>
        <h2 style="margin-bottom: 20px; color: var(--primary-color);">Our Vision</h2>
        <p style="color: var(--text-muted); font-size: 1.1rem; line-height: 1.8;">
          To be the leading provider of agricultural machinery and services in Africa, driving food security and prosperity for farming communities through modern, reliable, and sustainable solutions.
        </p>
      </div>
      <div class="card reveal" style="padding: 50px; background: white; border-radius: var(--border-radius); box-shadow: var(--card-shadow); text-align: center; animation-delay: 0.2s;">
        <div style="font-size: 3rem; margin-bottom: 20px;">🎯</div>
        <h2 style="margin-bottom: 20px; color: var(--primary-color);">Our Mission</h2>
        <p style="color: var(--text-muted); font-size: 1.1rem; line-height: 1.8;">
          We empower farmers by delivering high-quality equipment, comprehensive technical support, and innovative agricultural practices that maximize yield and promote long-term environmental health.
        </p>
      </div>
    </div>
  `;

  const historySection = document.createElement('section');
  historySection.style.padding = '80px 0';
  historySection.style.background = 'var(--text-main)';
  historySection.style.color = 'white';
  historySection.innerHTML = `
    <div class="container reveal">
      <h2 style="margin-bottom: 40px; font-size: 2.5rem; text-align: center;">Our Story</h2>
      <div style="max-width: 800px; margin: 0 auto; text-align: justify; font-size: 1.1rem; color: #ccc;">
        <p style="margin-bottom: 20px;">
          Sankara Nigeria Limited was founded with a clear mandate: to bridge the mechanization gap in Nigerian agriculture. Recognizing that access to modern machinery is the cornerstone of robust food production, we set out to build partnerships with global agricultural leaders.
        </p>
        <p>
          Today, we are proud to represent brands like Massey Ferguson, Lovol, and Zoomlion. From supplying a single tractor to outfitting entire commercial farms, our commitment remains the same—delivering excellence, ensuring reliability, and standing by our farmers every step of the way.
        </p>
      </div>
    </div>
  `;

  container.appendChild(renderNavbar());
  container.appendChild(pageHeader);
  container.appendChild(visionMissionSection);
  container.appendChild(historySection);
  container.appendChild(renderFooter());

  return container;
}
