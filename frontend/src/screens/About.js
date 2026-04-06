import { Target, Eye, ShieldCheck, Award, Users, MapPin, Truck, Settings, ArrowDown, Star, Phone, Mail, Globe, Send, HelpCircle } from 'lucide-static';
import { renderNavbar, renderFooter } from '../components/Navigation';

// Sub-component: Sections only (for Home screen)
export function renderAboutSections() {
  const container = document.createElement('div');
  container.id = 'about-sections-root';

  const strategic = createStrategicSection();
  const timeline = createTimelineSection();
  const team = createTeamSection();

  container.appendChild(strategic);
  container.appendChild(timeline);
  container.appendChild(team);

  return container;
}

// Sub-component: Hero only
function createAboutHero() {
  const hero = document.createElement('header');
  hero.style.padding = '180px 0 100px';
  hero.style.textAlign = 'center';
  hero.style.background = 'var(--background-color)';
  hero.innerHTML = `
    <div class="container">
      <span class="reveal" style="color: var(--primary-color); font-weight: 800; text-transform: uppercase; letter-spacing: 4px; display: block; margin-bottom: 20px;">Nearly 4 Decades of Excellence</span>
      <h1 class="reveal" style="font-size: clamp(3rem, 8vw, 5.5rem); font-weight: 900; line-height: 1; margin-bottom: 30px;">Pioneering Modern <br><span style="color: var(--primary-color);">Agricultural Infrastructure</span></h1>
      <p class="reveal" style="color: var(--text-muted); font-size: 1.3rem; max-width: 750px; margin: 0 auto; line-height: 1.8;">
        Sankara Nigeria Limited is the strategic backbone of Nigerian large-scale mechanization, committed to empowering farmers for nearly four decades.
      </p>
    </div>
  `;
  return hero;
}

function createStrategicSection() {
  const section = document.createElement('section');
  section.style.padding = '100px 0';
  section.style.background = 'var(--background-color)';
  section.innerHTML = `
    <div class="container">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 40px;">
        <div class="premium-glass-card reveal" style="padding: 60px; border-radius: 32px; position: relative; overflow: hidden;">
          <div style="position: absolute; right: -20px; top: -20px; font-size: 10rem; opacity: 0.03; font-weight: 900;">MISSION</div>
          <div style="width: 65px; height: 65px; background: rgba(59, 130, 246, 0.1); border-radius: 16px; display: flex; align-items: center; justify-content: center; color: var(--primary-color); margin-bottom: 35px;">
            ${Target}
          </div>
          <h2 style="font-size: 2.2rem; font-weight: 900; margin-bottom: 25px;">Our Mission</h2>
          <p style="color: var(--text-muted); font-size: 1.2rem; line-height: 1.9;">
            To empower Nigerian farmers with world-class agricultural machinery that enhances productivity, reduces labor costs, and drives sustainable agricultural growth across the nation.
          </p>
        </div>
        <div class="premium-glass-card reveal" style="padding: 60px; border-radius: 32px; position: relative; overflow: hidden; animation-delay: 0.2s;">
          <div style="position: absolute; right: -20px; top: -20px; font-size: 10rem; opacity: 0.03; font-weight: 900;">VISION</div>
          <div style="width: 65px; height: 65px; background: rgba(59, 130, 246, 0.1); border-radius: 16px; display: flex; align-items: center; justify-content: center; color: var(--primary-color); margin-bottom: 35px;">
            ${Eye}
          </div>
          <h2 style="font-size: 2.2rem; font-weight: 900; margin-bottom: 25px;">Our Vision</h2>
          <p style="color: var(--text-muted); font-size: 1.2rem; line-height: 1.9;">
            To become the most recognized and trusted agricultural machinery partner across West Africa; championing modern farming, strengthening partnerships, and delivering innovations that transform communities.
          </p>
        </div>
      </div>
    </div>
  `;
  return section;
}

function createTimelineSection() {
  const section = document.createElement('section');
  section.className = 'legacy-timeline-v2';
  section.style.backgroundColor = 'var(--background-color)';
  section.style.padding = '120px 0';
  section.innerHTML = `
    <div class="container">
      <div style="text-align: center; margin-bottom: 100px;">
        <span class="reveal" style="font-weight: 800; color: var(--primary-color); text-transform: uppercase; letter-spacing: 3px;">Establishing Standards</span>
        <h2 class="reveal" style="font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 900; margin: 15px 0;">Legacy of Trust</h2>
        <p class="reveal" style="color: var(--text-muted); font-size: 1.2rem; max-width: 650px; margin: 0 auto;">Tracing our transformative impact on Nigerian agriculture through nearly four decades of dedication.</p>
      </div>

      <div style="position: relative; padding: 40px 0;">
        <div class="timeline-glow-line"></div>
        
        <div class="timeline-item-v2 reveal">
          <div class="timeline-marker-v2">${Target}</div>
          <div class="timeline-content-v2">
            <span class="timeline-year-v2">1986</span>
            <h4 style="color: var(--primary-color); font-size: 1.6rem; font-weight: 900; margin-bottom: 10px;">The Foundation</h4>
            <p style="color: var(--text-muted); font-size: 1.05rem; line-height: 1.7;">Operations commenced with a focus on high-quality agricultural implements, establishing a new standard for local farming tools.</p>
          </div>
        </div>

        <div class="timeline-item-v2 reveal" style="animation-delay: 0.1s;">
          <div class="timeline-marker-v2">${Users}</div>
          <div class="timeline-content-v2">
            <span class="timeline-year-v2">2012</span>
            <h4 style="color: var(--primary-color); font-size: 1.6rem; font-weight: 900; margin-bottom: 10px;">Global Partnership</h4>
            <p style="color: var(--text-muted); font-size: 1.05rem; line-height: 1.7;">Became an authorized Massey Ferguson dealer, bridging the gap between global technology and Nigerian soil.</p>
          </div>
        </div>

        <div class="timeline-item-v2 reveal" style="animation-delay: 0.2s;">
          <div class="timeline-marker-v2">${Settings}</div>
          <div class="timeline-content-v2">
            <span class="timeline-year-v2">2020</span>
            <h4 style="color: var(--primary-color); font-size: 1.6rem; font-weight: 900; margin-bottom: 10px;">Genuine Network</h4>
            <p style="color: var(--text-muted); font-size: 1.05rem; line-height: 1.7;">Established a nationwide distribution network for 100% authentic OEM parts, ensuring tractor longevity for thousands of farmers.</p>
          </div>
        </div>

        <div class="timeline-item-v2 reveal" style="animation-delay: 0.3s;">
          <div class="timeline-marker-v2">${Award}</div>
          <div class="timeline-content-v2">
            <span class="timeline-year-v2">2026</span>
            <h4 style="color: var(--primary-color); font-size: 1.6rem; font-weight: 900; margin-bottom: 10px;">Ongoing Excellence</h4>
            <p style="color: var(--text-muted); font-size: 1.05rem; line-height: 1.7;">Continuing our legacy as Sankara Nigeria Limited; integrating AI-driven maintenance and advanced telematics into our nationwide distribution network.</p>
          </div>
        </div>

      </div>
    </div>
  `;
  return section;
}

function createTeamSection() {
  const section = document.createElement('section');
  section.style.padding = '120px 0';
  section.style.background = 'var(--background-color)';
  section.innerHTML = `
    <div class="container">
      <div style="text-align: center; margin-bottom: 80px;">
        <span class="reveal" style="font-weight: 800; color: var(--primary-color); text-transform: uppercase; letter-spacing: 3px;">The Strategists</span>
        <h2 class="reveal" style="font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 900; margin: 15px 0;">Executive Leadership</h2>
        <p class="reveal" style="color: var(--text-muted); font-size: 1.2rem; max-width: 650px; margin: 0 auto;">Visionary professionals driving our decade-long commitment to Nigerian agricultural excellence.</p>
      </div>
      <div id="team-grid-modern" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 40px;"></div>
    </div>
  `;

  const fetchTeamData = async () => {
    try {
      const res = await fetch('/api/team');
      const team = await res.json();
      const grid = section.querySelector('#team-grid-modern');
      
      if (team.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 100px; color: var(--text-muted);">Executive profiles are currently being updated.</div>`;
        return;
      }

      grid.innerHTML = team.map((member, index) => {
        // Cycle through the three theme colors defined in CSS
        const themes = ['theme-blue', 'theme-light', 'theme-emerald'];
        const currentTheme = themes[index % themes.length];
        
        return `
        <div class="reveal team-card-v3" style="animation-delay: ${index * 0.15}s;">
          <div class="team-img-container-v3">
             <img src="${member.image}" alt="${member.name}" class="team-img-v3">
             <div class="team-name-badge-v3 ${currentTheme}">${member.name}</div>
          </div>
          <div class="team-content-v3">
            <h3 class="team-role-v3">${member.role}</h3>
            <p class="team-phone-v3">${member.phone || 'Representative'}</p>
            
            <div class="team-icons-v3">
              <span title="Call">${Phone}</span>
              <span title="Email">${Mail}</span>
              <span title="Connect">${Users}</span>
            </div>
          </div>
        </div>
      `}).join('');
      
      if (window.initAnimations) window.initAnimations();
    } catch (err) { console.error(err); }
  };

  fetchTeamData();
  return section;
}

// Main Page Renderer
export function renderAboutScreen() {
  const container = document.createElement('div');
  
  container.appendChild(renderNavbar());
  container.appendChild(createAboutHero());
  container.appendChild(renderAboutSections());
  container.appendChild(renderFooter());

  return container;
}
