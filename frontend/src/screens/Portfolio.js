import { renderNavbar, renderFooter } from '../components/Navigation';
import { Briefcase, ChevronRight, Globe, Users } from 'lucide-static';

export function renderPortfolioScreen() {
  const container = document.createElement('div');
  let projects = [];

  // 1. Hero Section
  const hero = document.createElement('header');
  hero.style.padding = '160px 0 80px';
  hero.style.background = 'radial-gradient(circle at top right, rgba(253,186,11,0.05), transparent 40%), var(--background-color)';
  hero.style.textAlign = 'center';
  hero.innerHTML = `
    <div class="container">
      <span class="reveal" style="color: var(--primary-color); font-weight: 700; text-transform: uppercase; letter-spacing: 3px; display: block; margin-bottom: 20px;">Our Impact</span>
      <h1 class="reveal" style="font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 900; line-height: 1.1; margin-bottom: 25px;">Large-Scale <br>Mechanization Projects</h1>
      <p class="reveal" style="color: var(--text-muted); font-size: 1.2rem; max-width: 700px; margin: 0 auto; line-height: 1.8;">
        From state-wide government initiatives to private agricultural hubs, discover how Sankara is building the future of Nigerian farming.
      </p>
    </div>
  `;

  // 2. Project List Container
  const projectList = document.createElement('section');
  projectList.style.paddingBottom = '100px';
  projectList.classList.add('project-grid-section');
  projectList.innerHTML = `<div class="container" id="project-container"></div>`;

  const loadData = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/portfolio');
      projects = await res.json();
      renderProjects();
    } catch (err) { console.error(err); }
  };

  const renderProjects = () => {
    const grid = projectList.querySelector('#project-container');
    
    if (projects.length === 0) {
      grid.innerHTML = `
        <div style="text-align: center; padding: 100px 0; background: var(--surface-color); border: 1px solid var(--admin-border); border-radius: 24px;">
           <div style="color: var(--primary-color); margin-bottom: 20px;">${Briefcase}</div>
           <p style="color: var(--text-muted);">Our project history is currently being archived. Check back soon for new case studies.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = projects.map((project, idx) => `
      <div class="project-block reveal ${idx % 2 !== 0 ? 'reverse' : ''}" style="margin-bottom: 120px; animation-delay: ${idx * 0.1}s;">
        <div class="project-image-wrapper">
          <img src="${project.image}" alt="${project.title}">
          <div class="project-stats-float">
             <div class="stat-item">${Users} <span>Impacted ${Math.floor(Math.random() * 500) + 100}+ Farmers</span></div>
          </div>
        </div>
        <div class="project-content">
          <div class="project-meta">
            <span class="p-year">${project.year}</span>
            <span class="p-client">${project.client}</span>
          </div>
          <h2 class="project-title">${project.title}</h2>
          <p class="project-description">${project.description}</p>
          <div style="display: flex; gap: 20px; align-items: center;">
            <button class="btn-primary" style="padding: 12px 30px; font-weight: 700;">Case Study Details</button>
            <span style="color: var(--text-muted); font-size: 0.9rem; display: flex; align-items: center; gap: 5px;">${Globe} Regional Hub</span>
          </div>
        </div>
      </div>
    `).join('');

    if (window.initAnimations) window.initAnimations();
  };

  container.appendChild(renderNavbar());
  container.appendChild(hero);
  container.appendChild(projectList);
  container.appendChild(renderFooter());

  // Component Styles
  const style = document.createElement('style');
  style.innerHTML = `
    .project-block {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: center;
    }
    .project-block.reverse { grid-template-columns: 1fr 1fr; direction: rtl; }
    .project-block.reverse .project-content { direction: ltr; }
    
    .project-image-wrapper {
      position: relative;
      height: 500px;
      border-radius: 30px;
      overflow: hidden;
      box-shadow: 0 40px 80px rgba(0,0,0,0.15);
    }
    .project-image-wrapper img {
      width: 100%; height: 100%; object-fit: cover;
      transition: transform 0.8s cubic-bezier(0.2, 0, 0.2, 1);
    }
    .project-block:hover .project-image-wrapper img { transform: scale(1.05); }

    .project-stats-float {
      position: absolute; bottom: 30px; left: 30px;
      background: rgba(255,255,255,0.1); backdrop-filter: blur(20px);
      padding: 15px 25px; border-radius: 15px; border: 1px solid rgba(255,255,255,0.1);
      color: white; transform: translateY(10px); opacity: 0; transition: all 0.4s;
    }
    .project-block:hover .project-stats-float { opacity: 1; transform: translateY(0); }

    .project-meta { display: flex; gap: 15px; align-items: center; margin-bottom: 20px; }
    .p-year { font-weight: 800; color: var(--primary-color); font-size: 1.1rem; }
    .p-client { font-weight: 600; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); }
    
    .project-title { font-size: 2.8rem; font-weight: 900; margin-bottom: 25px; line-height: 1.1; }
    .project-description { font-size: 1.15rem; color: var(--text-muted); line-height: 1.8; margin-bottom: 40px; }

    @media (max-width: 968px) {
      .project-block, .project-block.reverse { grid-template-columns: 1fr; gap: 30px; direction: ltr; }
      .project-image-wrapper { height: 350px; }
      .project-title { font-size: 2.2rem; }
    }
  `;
  document.head.appendChild(style);

  loadData();
  return container;
}
