import { renderNavbar, renderFooter } from '../components/Navigation';
import { Calendar, MapPin, ArrowRight, Newspaper, ChevronRight } from 'lucide-static';

export function renderActivitiesScreen() {
  const container = document.createElement('div');
  let events = [];

  // 1. Header (Premium V2)
  const header = document.createElement('header');
  header.style.padding = '180px 0 80px';
  header.style.textAlign = 'center';
  header.style.background = 'var(--background-color)';
  header.innerHTML = `
    <div class="container">
      <div class="reveal" style="display: inline-flex; align-items: center; gap: 10px; background: rgba(59, 130, 246, 0.1); color: var(--primary-color); padding: 10px 20px; border-radius: 100px; font-size: 0.9rem; font-weight: 800; margin-bottom: 25px; letter-spacing: 1px;">
        ${Newspaper} CORPORATE JOURNAL 2026
      </div>
      <h1 class="reveal" style="font-size: clamp(2.8rem, 7vw, 5rem); font-weight: 900; line-height: 1.05; margin-bottom: 25px;">Driving Innovation <br><span style="color: var(--primary-color);">In The Field</span></h1>
      <p class="reveal" style="color: var(--text-muted); font-size: 1.25rem; max-width: 700px; margin: 0 auto; line-height: 1.8;">
        Tracking our journey across Nigeria through specialized workshops, government partnerships, and community-shifting mechanization events.
      </p>
    </div>
  `;

  // 2. Timeline Grid Section
  const timelineSection = document.createElement('section');
  timelineSection.style.paddingBottom = '140px';
  timelineSection.style.background = 'var(--background-color)';
  timelineSection.innerHTML = `
    <div class="container" style="max-width: 1100px; position: relative;">
      <div id="activities-timeline-line"></div>
      <div id="events-loader-v2" style="display: flex; flex-direction: column; gap: 80px;">
        <!-- Events injected via JS -->
      </div>
    </div>
  `;

  const loadData = async () => {
    try {
      const res = await fetch('/api/activities');
      events = await res.json();
      // Sort newest at the top
      events.sort((a,b) => b.id - a.id);
      renderEvents();
    } catch (err) { console.error(err); }
  };

  const renderEvents = () => {
    const list = timelineSection.querySelector('#events-loader-v2');
    
    if (events.length === 0) {
      list.innerHTML = `<div style="text-align: center; padding: 100px 0; background: var(--surface-color); border: 1px solid var(--glass-border); border-radius: 32px; color: var(--text-muted); font-size: 1.1rem;">Our technical activity log is currently being updated. Check back shortly.</div>`;
      return;
    }

    list.innerHTML = events.map((event, idx) => `
      <div class="activity-block reveal" style="animation-delay: ${idx * 0.15}s;">
        <div class="activity-dot-v2">${Calendar}</div>
        <div class="activity-card-v2 premium-glass-card">
          <div class="activity-top">
            <span class="activity-date-v2">${event.date}</span>
            <span class="activity-tag-v2"><span style="width: 6px; height: 6px; border-radius: 50%; background: var(--primary-color); display: inline-block;"></span> Recent Fieldwork</span>
          </div>
          
          <div class="activity-content-grid">
            ${event.image ? `
              <div class="activity-image-v2">
                <img src="${event.image}" alt="${event.title}" loading="lazy">
              </div>
            ` : ''}
            <div class="activity-text-v2">
              <h2 style="font-size: 2.2rem; font-weight: 900; margin-bottom: 20px; line-height: 1.1; color: var(--primary-color);">${event.title}</h2>
              <p style="color: var(--text-muted); line-height: 1.8; font-size: 1.15rem; margin-bottom: 30px;">${event.summary}</p>
              
              <div style="display: flex; gap: 20px; align-items: center; border-top: 1px solid var(--glass-border); padding-top: 25px;">
                <button class="activity-cta-btn">
                  Read Full Entry <span style="margin-left: 10px;">${ArrowRight}</span>
                </button>
                <div style="display: flex; align-items: center; gap: 6px; color: var(--text-muted); font-size: 0.9rem; font-weight: 600;">
                  ${MapPin} Lagos, Nigeria
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    if (window.initAnimations) window.initAnimations();
  };

  container.appendChild(renderNavbar());
  container.appendChild(header);
  container.appendChild(timelineSection);
  container.appendChild(renderFooter());

  // Component Custom Styles (Scoped)
  const style = document.createElement('style');
  style.innerHTML = `
    #activities-timeline-line {
      position: absolute; left: 40px; top: 0; bottom: 0; width: 4px;
      background: linear-gradient(to bottom, var(--primary-color), var(--secondary-color) 40%, transparent);
      border-radius: 50px; opacity: 0.3;
    }
    .activity-block {
      position: relative; padding-left: 100px; width: 100%;
    }
    .activity-dot-v2 {
      position: absolute; left: 24px; top: 40px; width: 36px; height: 36px;
      background: var(--primary-color); border: 4px solid var(--background-color);
      border-radius: 50%; color: white; display: flex; align-items: center; justify-content: center;
      z-index: 5; box-shadow: 0 0 20px var(--stats-glow-color);
    }
    .activity-card-v2 {
      padding: 50px; border-radius: 32px; overflow: hidden;
    }
    .activity-top {
      display: flex; justify-content: space-between; align-items: center; margin-bottom: 35px;
    }
    .activity-date-v2 {
      padding: 8px 20px; background: rgba(59, 130, 246, 0.08); border: 1px solid rgba(59, 130, 246, 0.1);
      border-radius: 100px; color: var(--primary-color); font-weight: 800; font-size: 0.95rem;
    }
    .activity-tag-v2 {
      font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; color: var(--text-muted); font-weight: 700;
      display: flex; align-items: center; gap: 8px;
    }

    .activity-content-grid {
      display: grid; grid-template-columns: 320px 1fr; gap: 60px; align-items: start;
    }
    .activity-image-v2 {
      width: 100%; height: 300px; border-radius: 20px; overflow: hidden;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    }
    .activity-image-v2 img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
    .activity-card-v2:hover .activity-image-v2 img { transform: scale(1.08); }

    .activity-cta-btn {
      background: none; border: none; padding: 0; color: var(--primary-color); font-weight: 800; cursor: pointer;
      display: flex; align-items: center; font-size: 1.05rem; transition: all 0.3s ease;
    }
    .activity-cta-btn:hover { letter-spacing: 0.5px; opacity: 0.8; }

    @media (max-width: 968px) {
      .activity-content-grid { grid-template-columns: 1fr; gap: 30px; }
      .activity-block { padding-left: 60px; }
      #activities-timeline-line { left: 20px; }
      .activity-dot-v2 { left: 4px; }
      .activity-card-v2 { padding: 30px; }
      .activity-image-v2 { height: 240px; }
    }
  `;
  document.head.appendChild(style);

  loadData();
  return container;
}
