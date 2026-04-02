import { renderNavbar, renderFooter } from '../components/Navigation';

const portfolioProjects = [
  { 
    id: 1, 
    title: 'Kano State Commercial Farm Setup', 
    client: 'Ministry of Agriculture', 
    date: 'Dec 2023',
    description: 'Complete deployment of 20 high-capacity Zoomlion tractors and modern irrigation pivot systems for a 5,000-hectare government farm project.',
    image: '/src/assets/portfolio_aerial.png'
  },
  { 
    id: 2, 
    title: 'Oyo Cooperative Mechanization', 
    client: 'Farmers Union', 
    date: 'Sep 2023',
    description: 'Supplied and maintained an array of Lovol multi-purpose tractors and implements to a cooperative of 200 local farmers, boosting yield by 40%.',
    image: '/src/assets/products_lovol_m504.png'
  }
];

export function renderPortfolioScreen() {
  const container = document.createElement('div');

  const pageHeader = document.createElement('header');
  pageHeader.style.padding = '120px 0 40px';
  pageHeader.style.background = '#f9f9f9';
  pageHeader.innerHTML = `
    <div class="container" style="text-align: center;">
      <h1 style="font-size: 3.5rem; font-weight: 800; margin-bottom: 10px;">Our Portfolio</h1>
      <p style="color: var(--text-muted); font-size: 1.2rem; max-width: 700px; margin: 0 auto;">
        Discover how Sankara Nigeria Limited is driving large-scale agricultural transformation.
      </p>
    </div>
  `;

  const portfolioSection = document.createElement('section');
  portfolioSection.style.padding = '80px 0';

  let projectsHTML = `<div class="container" style="display: grid; gap: 60px;">`;
  
  portfolioProjects.forEach((project, index) => {
    // Alternate layout image left/right
    const isImageLeft = index % 2 === 0;
    
    projectsHTML += `
      <div class="reveal" style="display: flex; flex-direction: ${isImageLeft ? 'row' : 'row-reverse'}; gap: 40px; align-items: center; background: white; border-radius: var(--border-radius); box-shadow: var(--card-shadow); overflow: hidden;">
        <div style="flex: 1; height: 400px;">
          <img src="${project.image}" alt="${project.title}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div style="flex: 1; padding: 40px;">
          <p style="color: var(--primary-color); font-weight: 700; margin-bottom: 10px; text-transform: uppercase; font-size: 0.9rem;">${project.date} &bull; ${project.client}</p>
          <h2 style="font-size: 2.5rem; margin-bottom: 20px;">${project.title}</h2>
          <p style="color: var(--text-muted); font-size: 1.1rem; line-height: 1.8; margin-bottom: 30px;">
            ${project.description}
          </p>
          <button class="btn-primary" style="padding: 10px 25px;">View Case Study</button>
        </div>
      </div>
    `;
  });

  projectsHTML += `</div>`;
  portfolioSection.innerHTML = projectsHTML;

  container.appendChild(renderNavbar());
  container.appendChild(pageHeader);
  container.appendChild(portfolioSection);
  container.appendChild(renderFooter());

  return container;
}
