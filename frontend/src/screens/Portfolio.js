import { renderNavbar, renderFooter } from '../components/Navigation';
import { Briefcase, ChevronRight, Globe, Users, Award, TrendingUp } from 'lucide-static';

export function renderPortfolioScreen() {
  const container = document.createElement('div');
  let projects = [];

  // 1. Hero Section (Premium V2)
  const hero = document.createElement('header');
  hero.style.padding = '200px 0 100px';
  hero.style.textAlign = 'center';
  hero.style.background = 'var(--background-color)';
  hero.style.position = 'relative';
  hero.innerHTML = `
    <div class="container">
      <span class="reveal" style="color: var(--primary-color); font-weight: 800; text-transform: uppercase; letter-spacing: 4px; display: block; margin-bottom: 20px;">Strategic Impact</span>
      <h1 class="reveal" style="font-size: clamp(3rem, 8vw, 5.5rem); font-weight: 900; line-height: 1; margin-bottom: 30px;">Engineering <br><span style="color: var(--primary-color);">National Growth</span></h1>
      <p class="reveal" style="color: var(--text-muted); font-size: 1.3rem; max-width: 750px; margin: 0 auto; line-height: 1.8;">
        From state-wide government food security initiatives to private industrial hubs, we deploy the mechanization that scales Nigerian agriculture.
      </p>
    </div>
    
    <!-- Background Decoration -->
    <div style="position: absolute; top: 10%; right: 5%; width: 300px; height: 300px; background: radial-gradient(circle, rgba(0, 21, 91, 0.03) 0%, transparent 70%); z-index: -1;"></div>
  `;

  // 2. Project List Section
  const projectSection = document.createElement('section');
  projectSection.style.paddingBottom = '160px';
  projectSection.innerHTML = `
    <div class="container">
      <div id="portfolio-list-v2" style="display: flex; flex-direction: column; gap: 100px;">
        <!-- Projects injected via JS -->
      </div>
    </div>
  `;

  const loadData = async () => {
    try {
      const res = await fetch('/api/portfolio');
      projects = await res.json();
      renderProjects();
    } catch (err) { console.error(err); }
  };

  const renderProjects = () => {
    const list = projectSection.querySelector('#portfolio-list-v2');
    
    if (projects.length === 0) {
      list.innerHTML = `
        <div style="text-align: center; padding: 120px 0; background: var(--surface-color); border: 1px solid var(--glass-border); border-radius: 32px;">
           <div style="color: var(--primary-color); margin-bottom: 25px; transform: scale(1.5);">${Award}</div>
           <p style="color: var(--text-muted); font-size: 1.1rem; font-weight: 600;">Our strategic project archive is being updated with recent 2026 data.</p>
        </div>
      `;
      return;
    }

    list.innerHTML = projects.map((project, idx) => `
      <div class="project-card-v2 reveal ${idx % 2 !== 0 ? 'reverse-layout' : ''}" style="animation-delay: ${idx * 0.1}s;">
        <div class="project-visual-side">
          <div class="visual-container premium-glass-card">
            <img src="${project.image}" alt="${project.title}" class="project-hero-img">
            <div class="project-badge-float">
               <div class="badge-v2">${TrendingUp} High Impact</div>
            </div>
            <div class="project-stat-pill">
              <div class="stat-icon-v2">${Users}</div>
              <div class="stat-text-v2">
                <span class="stat-val-v2">${Math.floor(Math.random() * 500) + 150}+</span>
                <span class="stat-lbl-v2">Farmers Impacted</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="project-details-side">
          <div class="project-meta-v2">
            <span class="meta-year">${project.year}</span>
            <span class="meta-dot"></span>
            <span class="meta-client">${project.client}</span>
          </div>
          <h2 class="project-title-v2">${project.title}</h2>
          <p class="project-desc-v2">${project.description}</p>
          
          <div class="project-actions-v2">
            <button class="btn-primary" style="padding: 15px 40px; font-weight: 800; border-radius: 12px; display: flex; align-items: center; gap: 12px;">
              Executive Case Study ${ChevronRight}
            </button>
            <div class="project-locale">
              <span style="color: var(--primary-color);">${Globe}</span>
              <span>Regional Operational Hub</span>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    if (window.initAnimations) window.initAnimations();
  };

  container.appendChild(renderNavbar());
  container.appendChild(hero);
  container.appendChild(projectSection);
  container.appendChild(renderFooter());

  // Advanced Component Styles
  const style = document.createElement('style');
  style.innerHTML = `
    .project-card-v2 {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 80px;
      align-items: center;
    }
    .project-card-v2.reverse-layout {
      grid-template-columns: 0.8fr 1.2fr;
    }
    .project-card-v2.reverse-layout .project-visual-side { order: 2; }
    .project-card-v2.reverse-layout .project-details-side { order: 1; }

    .visual-container {
      position: relative;
      height: 550px;
      border-radius: 40px;
      overflow: hidden;
      box-shadow: 0 40px 80px rgba(0,0,0,0.2);
    }
    .project-hero-img {
      width: 100%; height: 100%; object-fit: cover;
      transition: transform 1.5s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .project-card-v2:hover .project-hero-img { transform: scale(1.08); }

    .project-badge-float {
      position: absolute; top: 30px; left: 30px; z-index: 5;
    }
    .badge-v2 {
      background: var(--primary-color); color: white;
      padding: 8px 18px; border-radius: 100px; font-size: 0.8rem; font-weight: 800;
      text-transform: uppercase; letter-spacing: 1px; display: flex; align-items: center; gap: 8px;
      box-shadow: 0 10px 20px rgba(0, 21, 91, 0.3);
    }

    .project-stat-pill {
      position: absolute; bottom: 40px; right: 40px;
      background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 15px 25px; border-radius: 20px;
      display: flex; align-items: center; gap: 15px; color: white;
      transform: translateY(20px); opacity: 0; transition: all 0.5s ease;
    }
    .project-card-v2:hover .project-stat-pill { transform: translateY(0); opacity: 1; }
    
    .stat-icon-v2 { font-size: 1.5rem; color: var(--primary-color); }
    .stat-val-v2 { display: block; font-size: 1.4rem; font-weight: 900; line-height: 1; }
    .stat-lbl-v2 { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; opacity: 0.8; }

    .project-meta-v2 { display: flex; align-items: center; gap: 12px; margin-bottom: 25px; }
    .meta-year { font-weight: 900; color: var(--primary-color); font-size: 1.4rem; font-family: 'Space Grotesk', sans-serif; }
    .meta-dot { width: 5px; height: 5px; background: var(--glass-border); border-radius: 50%; }
    .meta-client { font-size: 0.9rem; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; color: var(--text-muted); }

    .project-title-v2 { font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 900; margin-bottom: 30px; line-height: 1.05; color: var(--text-main); }
    .project-desc-v2 { font-size: 1.25rem; color: var(--text-muted); line-height: 1.9; margin-bottom: 45px; max-width: 90%; }
    
    .project-actions-v2 { display: flex; gap: 30px; align-items: center; flex-wrap: wrap; }
    .project-locale { display: flex; align-items: center; gap: 10px; font-size: 0.9rem; font-weight: 700; color: var(--text-muted); }

    @media (max-width: 1100px) {
      .project-card-v2, .project-card-v2.reverse-layout { grid-template-columns: 1fr; gap: 40px; }
      .project-card-v2.reverse-layout .project-visual-side { order: 1; }
      .project-card-v2.reverse-layout .project-details-side { order: 2; }
      .visual-container { height: 400px; border-radius: 30px; }
      .project-desc-v2 { max-width: 100%; }
    }
  `;
  document.head.appendChild(style);

  loadData();
  return container;
}
