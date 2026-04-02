import { renderNavbar, renderFooter } from '../components/Navigation';

export function renderServicesScreen() {
  const container = document.createElement('div');

  const pageHeader = document.createElement('header');
  pageHeader.style.padding = '120px 0 40px';
  pageHeader.style.background = '#f9f9f9';
  pageHeader.innerHTML = `
    <div class="container" style="text-align: center;">
      <h1 style="font-size: 3.5rem; font-weight: 800; margin-bottom: 10px;">Our Services</h1>
      <p style="color: var(--text-muted); font-size: 1.2rem; max-width: 700px; margin: 0 auto;">
        Comprehensive agricultural solutions designed to maximize your farm's productivity and operational efficiency.
      </p>
    </div>
  `;

  const servicesSection = document.createElement('section');
  servicesSection.style.padding = '80px 0';
  servicesSection.innerHTML = `
    <div class="container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px;">
      
      <div class="card reveal" style="padding: 40px; background: white; border-radius: var(--border-radius); box-shadow: var(--card-shadow); border-top: 4px solid var(--primary-color);">
        <h3 style="margin-bottom: 15px; font-size: 1.5rem;">Machinery Sales</h3>
        <p style="color: var(--text-muted); margin-bottom: 20px;">
          Distribution of world-class tractors, harvesters, and implements from top global brands tailored to Nigerian soil.
        </p>
        <span style="color: var(--primary-color); font-weight: 600;">Learn more &rarr;</span>
      </div>

      <div class="card reveal" style="padding: 40px; background: white; border-radius: var(--border-radius); box-shadow: var(--card-shadow); border-top: 4px solid var(--secondary-color); animation-delay: 0.1s;">
        <h3 style="margin-bottom: 15px; font-size: 1.5rem;">Maintenance & Repair</h3>
        <p style="color: var(--text-muted); margin-bottom: 20px;">
          Expert diagnostic, preventive maintenance, and rapid repair services to keep your equipment running during critical seasons.
        </p>
        <span style="color: var(--primary-color); font-weight: 600;">Learn more &rarr;</span>
      </div>

      <div class="card reveal" style="padding: 40px; background: white; border-radius: var(--border-radius); box-shadow: var(--card-shadow); border-top: 4px solid var(--accent-color); animation-delay: 0.2s;">
        <h3 style="margin-bottom: 15px; font-size: 1.5rem;">Spare Parts Supply</h3>
        <p style="color: var(--text-muted); margin-bottom: 20px;">
          Readily available stock of authentic OEM spare parts to guarantee longevity and optimal performance of your fleet.
        </p>
        <span style="color: var(--primary-color); font-weight: 600;">Learn more &rarr;</span>
      </div>

      <div class="card reveal" style="padding: 40px; background: white; border-radius: var(--border-radius); box-shadow: var(--card-shadow); border-top: 4px solid var(--primary-color); animation-delay: 0.3s;">
        <h3 style="margin-bottom: 15px; font-size: 1.5rem;">Farm Consultancy</h3>
        <p style="color: var(--text-muted); margin-bottom: 20px;">
          Professional advice on farm setup, mechanization strategy, and optimal equipment selection for your specific crops.
        </p>
        <span style="color: var(--primary-color); font-weight: 600;">Learn more &rarr;</span>
      </div>

    </div>
  `;

  container.appendChild(renderNavbar());
  container.appendChild(pageHeader);
  container.appendChild(servicesSection);
  container.appendChild(renderFooter());

  return container;
}
