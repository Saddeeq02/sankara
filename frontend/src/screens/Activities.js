import { renderNavbar, renderFooter } from '../components/Navigation';

const mockActivities = [
  { id: 1, title: 'Annual Farmers Expo 2023', date: 'Oct 15, 2023', summary: 'Showcasing the latest Lovol tractors to over 500 local farmers in Kano state.' },
  { id: 2, title: 'Mechanization Workshop', date: 'Aug 22, 2023', summary: 'Training session on preventive maintenance for heavy-duty Zoomlion equipment.' },
  { id: 3, title: 'Partnership with State Govt', date: 'May 10, 2023', summary: 'Signed an MoU to supply 50 Massey Ferguson tractors for the youth farming initiative.' }
];

export function renderActivitiesScreen() {
  const container = document.createElement('div');

  const pageHeader = document.createElement('header');
  pageHeader.style.padding = '120px 0 40px';
  pageHeader.style.background = '#f9f9f9';
  pageHeader.innerHTML = `
    <div class="container" style="text-align: center;">
      <h1 style="font-size: 3.5rem; font-weight: 800; margin-bottom: 10px;">Recent Activities</h1>
      <p style="color: var(--text-muted); font-size: 1.2rem; max-width: 700px; margin: 0 auto;">
        Stay updated with our latest events, workshops, and milestones.
      </p>
    </div>
  `;

  const timelineSection = document.createElement('section');
  timelineSection.style.padding = '80px 0';
  
  let timelineHTML = `<div class="container" style="max-width: 800px;">`;
  
  mockActivities.forEach((activity, index) => {
    timelineHTML += `
      <div class="reveal" style="display: flex; gap: 30px; margin-bottom: 50px; animation-delay: ${index * 0.1}s;">
        <div style="flex-shrink: 0; width: 120px; text-align: right; pt-2;">
          <strong style="color: var(--primary-color); font-size: 1.1rem;">${activity.date}</strong>
        </div>
        <div style="position: relative; padding-left: 30px; border-left: 2px solid #ddd; padding-bottom: 20px;">
          <div style="position: absolute; left: -8px; top: 0; width: 14px; height: 14px; border-radius: 50%; background: var(--secondary-color);"></div>
          <h3 style="margin-bottom: 15px; font-size: 1.5rem;">${activity.title}</h3>
          <p style="color: var(--text-muted); font-size: 1.1rem; line-height: 1.6;">${activity.summary}</p>
          <button style="margin-top: 15px; background: none; border: none; color: var(--primary-color); font-weight: 600; cursor: pointer;">Read full story &rarr;</button>
        </div>
      </div>
    `;
  });

  timelineHTML += `</div>`;
  timelineSection.innerHTML = timelineHTML;

  container.appendChild(renderNavbar());
  container.appendChild(pageHeader);
  container.appendChild(timelineSection);
  container.appendChild(renderFooter());

  return container;
}
