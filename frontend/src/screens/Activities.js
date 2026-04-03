import { renderNavbar, renderFooter } from '../components/Navigation';
import { Calendar, MapPin, ArrowRight, Newspaper } from 'lucide-static';

export function renderActivitiesScreen() {
  const container = document.createElement('div');
  let events = [];

  // 1. Header
  const header = document.createElement('header');
  header.style.padding = '140px 0 60px';
  header.style.textAlign = 'center';
  header.style.background = 'var(--background-color)';
  header.innerHTML = `
    <div class="container">
      <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(253,186,11,0.1); color: var(--primary-color); padding: 8px 16px; border-radius: 100px; font-size: 0.85rem; font-weight: 700; margin-bottom: 20px;">
        ${Newspaper} LATEST NEWS & UPDATES
      </div>
      <h1 class="reveal" style="font-size: clamp(2.5rem, 5vw, 3.5rem); font-weight: 900; margin-bottom: 15px;">Corporate Activities</h1>
      <p class="reveal" style="color: var(--text-muted); font-size: 1.1rem; max-width: 650px; margin: 0 auto; line-height: 1.6;">
        Tracking our journey across Nigeria through workshops, government partnerships, and community mechanization events.
      </p>
    </div>
  `;

  // 2. Timeline Container
  const timelineSection = document.createElement('section');
  timelineSection.style.paddingBottom = '100px';
  timelineSection.innerHTML = `
    <div class="container" style="max-width: 1000px; position: relative;">
      <div class="timeline-line"></div>
      <div id="events-loader"></div>
    </div>
  `;

  const loadData = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/activities');
      events = await res.json();
      // Sort newest at the top
      events.sort((a,b) => b.id - a.id);
      renderEvents();
    } catch (err) { console.error(err); }
  };

  const renderEvents = () => {
    const list = timelineSection.querySelector('#events-loader');
    
    if (events.length === 0) {
      list.innerHTML = `<div style="text-align: center; padding: 60px; color: var(--text-muted);">No recent activities posted.</div>`;
      return;
    }

    list.innerHTML = events.map((event, idx) => `
      <div class="timeline-item reveal" style="animation-delay: ${idx * 0.1}s;">
        <div class="timeline-dot"></div>
        <div class="timeline-card">
          <div class="timeline-date">${event.date}</div>
          <div style="display: flex; gap: 25px; flex-wrap: wrap;">
            ${event.image ? `
              <div class="event-img">
                <img src="${event.image}" alt="${event.title}">
              </div>
            ` : ''}
            <div class="event-text" style="flex: 1; min-width: 250px;">
              <h3 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 12px; line-height: 1.2;">${event.title}</h3>
              <p style="color: var(--text-muted); line-height: 1.7; font-size: 1rem; margin-bottom: 20px;">${event.summary}</p>
              <button style="background: none; border: none; padding: 0; color: var(--primary-color); font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                Read Full Entry ${ArrowRight}
              </button>
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

  // Component Styles
  const style = document.createElement('style');
  style.innerHTML = `
    .timeline-line {
      position: absolute; left: 50%; top: 0; bottom: 0; width: 2px;
      background: linear-gradient(to bottom, var(--primary-color), var(--admin-border) 80%);
      transform: translateX(-50%);
    }
    .timeline-item {
      position: relative; margin-bottom: 60px; width: 100%;
      display: flex; justify-content: center;
    }
    .timeline-dot {
      position: absolute; left: 50%; top: 20px; width: 16px; height: 16px;
      background: var(--primary-color); border: 4px solid var(--background-color);
      border-radius: 50%; transform: translateX(-50%); z-index: 2;
    }
    .timeline-card {
      width: 85%; background: var(--surface-color); padding: 35px;
      border-radius: 24px; border: 1px solid var(--admin-border);
      box-shadow: 0 10px 30px rgba(0,0,0,0.05); transition: transform 0.3s ease;
    }
    .timeline-card:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
    
    .timeline-date {
      display: inline-block; padding: 5px 15px; background: var(--admin-bg);
      border-radius: 100px; font-size: 0.85rem; font-weight: 800; color: var(--primary-color);
      margin-bottom: 20px;
    }
    .event-img { width: 180px; height: 120px; border-radius: 12px; overflow: hidden; flex-shrink: 0; }
    .event-img img { width: 100%; height: 100%; object-fit: cover; }

    @media (max-width: 768px) {
      .timeline-line { left: 20px; }
      .timeline-dot { left: 20px; }
      .timeline-card { width: calc(100% - 60px); margin-left: 60px; padding: 25px; }
      .event-img { width: 100%; height: 200px; }
    }
  `;
  document.head.appendChild(style);

  loadData();
  return container;
}
