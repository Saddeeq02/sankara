import { renderNavbar, renderFooter } from '../components/Navigation';

export function renderActivitiesScreen() {
  const container = document.createElement('div');
  container.className = 'activities-root';

  let events = [];

  // Inject Stylesheet
  const styleTag = document.createElement('style');
  styleTag.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');
    
    .activities-root {
      font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
      background: #ffffff;
      color: #0f172a;
      overflow-x: hidden;
    }

    .activities-hero {
      background: linear-gradient(135deg, #030712 0%, #7f1d1d 50%, #030712 100%);
      color: #ffffff;
      padding: 180px 0 110px;
      position: relative;
      overflow: hidden;
      border-bottom: 1px solid rgba(220, 38, 38, 0.15);
      text-align: center;
    }

    .activities-hero::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at top, rgba(220, 38, 38, 0.15), transparent 70%);
      pointer-events: none;
      z-index: 1;
    }

    .activities-hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(220, 38, 38, 0.15);
      padding: 8px 16px;
      border-radius: 100px;
      border: 1px solid rgba(220, 38, 38, 0.2);
      margin-bottom: 25px;
      color: #3b82f6;
      font-size: 0.75rem;
      font-weight: 800;
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    .activities-hero-title {
      font-size: clamp(2.6rem, 5vw, 4rem);
      font-weight: 900;
      line-height: 1.15;
      letter-spacing: -1.5px;
      margin-bottom: 20px;
      color: #ffffff;
    }

    .activities-hero-title span {
      background: linear-gradient(135deg, #dc2626 0%, #7f1d1d 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .activities-hero-desc {
      font-size: 1.15rem;
      line-height: 1.6;
      color: #d1fae5;
      max-width: 650px;
      margin: 0 auto;
    }

    /* Timeline Container */
    .timeline-section {
      padding: 100px 0 130px;
      background: #ffffff;
      position: relative;
    }

    .timeline-container {
      max-width: 1100px;
      margin: 0 auto;
      position: relative;
    }

    .timeline-line {
      position: absolute;
      left: 50%;
      top: 0;
      bottom: 0;
      width: 2px;
      background: linear-gradient(180deg, #dc2626 0%, #7f1d1d 80%, transparent 100%);
      transform: translateX(-50%);
    }

    .timeline-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 80px;
      position: relative;
    }

    .timeline-row:nth-child(even) {
      flex-direction: row-reverse;
    }

    .timeline-col-card {
      width: 45%;
    }

    .timeline-col-date {
      width: 45%;
      text-align: right;
    }

    .timeline-row:nth-child(even) .timeline-col-date {
      text-align: left;
    }

    .timeline-node {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 20px;
      height: 20px;
      background: #dc2626;
      border: 4px solid #ffffff;
      border-radius: 50%;
      box-shadow: 0 0 12px rgba(220, 38, 38, 0.4);
      z-index: 10;
    }

    /* Card styling */
    .timeline-card {
      background: #ffffff;
      border: 1px solid rgba(226, 232, 240, 0.9);
      border-radius: 24px;
      padding: 35px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.015);
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .timeline-card:hover {
      transform: translateY(-6px);
      border-color: rgba(220, 38, 38, 0.25);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
    }

    .timeline-card-image {
      width: 100%;
      height: 230px;
      border-radius: 16px;
      overflow: hidden;
      background: #f1f5f9;
    }

    .timeline-card-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.8s ease;
    }

    .timeline-card:hover .timeline-card-image img {
      transform: scale(1.05);
    }

    .timeline-card-title {
      font-size: 1.5rem;
      font-weight: 850;
      color: #0f172a;
      line-height: 1.25;
      margin: 0;
    }

    .timeline-card-desc {
      font-size: 0.98rem;
      color: #475569;
      line-height: 1.6;
      margin: 0;
    }

    .timeline-card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #f1f5f9;
      padding-top: 20px;
      margin-top: 5px;
    }

    .timeline-card-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(220, 38, 38, 0.08);
      color: #991b1b;
      padding: 6px 14px;
      border-radius: 50px;
      font-size: 0.8rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .timeline-card-location {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: #64748b;
      font-size: 0.85rem;
      font-weight: 700;
    }

    /* Date column styles */
    .timeline-date-val {
      font-size: 1.8rem;
      font-weight: 900;
      color: #030712;
      letter-spacing: -0.5px;
    }

    .timeline-date-label {
      font-size: 0.85rem;
      font-weight: 800;
      color: #991b1b;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-top: 4px;
    }

    @media (max-width: 768px) {
      .timeline-line {
        left: 20px;
        transform: none;
      }
      .timeline-row {
        flex-direction: column !important;
        align-items: flex-start;
        padding-left: 45px;
        margin-bottom: 50px;
      }
      .timeline-col-card, .timeline-col-date {
        width: 100%;
        text-align: left !important;
      }
      .timeline-col-date {
        margin-bottom: 15px;
      }
      .timeline-node {
        left: 20px;
        top: 20px;
        transform: translate(-50%, -50%);
      }
      .timeline-date-val {
        font-size: 1.4rem;
      }
    }
  `;
  container.appendChild(styleTag);

  // 1. HERO SECTION
  const heroSec = document.createElement('header');
  heroSec.className = 'activities-hero';
  heroSec.innerHTML = `
    <div class="container">
      <div class="activities-hero-badge">Corporate Journal</div>
      <h1 class="activities-hero-title">Driving Innovation <span>In The Field</span></h1>
      <p class="activities-hero-desc">
        Tracking our journey across Nigeria through specialized workshops, government partnerships, and community-shifting mechanization events.
      </p>
    </div>
  `;

  // 2. TIMELINE SECTION
  const timelineSec = document.createElement('section');
  timelineSec.className = 'timeline-section';
  timelineSec.innerHTML = `
    <div class="container timeline-container">
      <div class="timeline-line"></div>
      <div id="timeline-events-grid">
        <!-- Rendered via JS -->
      </div>
    </div>
  `;

  const loadActivities = async () => {
    try {
      const res = await fetch('/api/activities');
      events = await res.json();
      // Sort descending by id (newest first)
      events.sort((a, b) => b.id - a.id);
      renderEvents();
    } catch (err) {
      console.error('Error loading activities:', err);
    }
  };

  const renderEvents = () => {
    const list = timelineSec.querySelector('#timeline-events-grid');

    if (events.length === 0) {
      list.innerHTML = `
        <div style="text-align: center; padding: 100px 0; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 24px;">
          <p style="color: #64748b; font-size: 1.1rem; font-weight: 600;">Our technical activity log is currently being updated. Check back shortly.</p>
        </div>
      `;
      return;
    }

    list.innerHTML = events.map((event, idx) => `
      <div class="timeline-row">
        <div class="timeline-node"></div>
        
        <div class="timeline-col-date">
          <div class="timeline-date-val">${event.date}</div>
          <div class="timeline-date-label">Field Activity</div>
        </div>

        <div class="timeline-col-card">
          <div class="timeline-card">
            ${event.image ? `
              <div class="timeline-card-image">
                <img src="${event.image}" alt="${event.title}" loading="lazy">
              </div>
            ` : ''}
            <h3 class="timeline-card-title">${event.title}</h3>
            <p class="timeline-card-desc">${event.summary}</p>
            <div class="timeline-card-footer">
              <span class="timeline-card-tag">
                <span style="width: 5px; height: 5px; border-radius: 50%; background: #991b1b; display: inline-block;"></span>
                Recent Fieldwork
              </span>
              <span class="timeline-card-location">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/><circle cx="12" cy="10" r="3"/></svg>
                Nigeria
              </span>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    if (window.initAnimations) {
      setTimeout(window.initAnimations, 100);
    }
  };

  // Assemble Page
  container.appendChild(renderNavbar());
  container.appendChild(heroSec);
  container.appendChild(timelineSec);
  container.appendChild(renderFooter());

  loadActivities();
  return container;
}
