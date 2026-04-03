import { renderNavbar, renderFooter } from '../components/Navigation';
import { Target, Eye, ShieldCheck, Award, Users, MapPin, Truck, Settings } from 'lucide-static';

export function renderAboutScreen() {
  const container = document.createElement('div');

  // 1. Hero Section
  const hero = document.createElement('header');
  hero.style.height = '80vh';
  hero.style.minHeight = '600px';
  hero.style.position = 'relative';
  hero.style.display = 'flex';
  hero.style.alignItems = 'center';
  hero.style.justifyContent = 'center';
  hero.style.overflow = 'hidden';
  hero.style.color = 'white';
  hero.style.background = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('/src/assets/about_hero.png') center/cover no-repeat fixed`;

  hero.innerHTML = `
    <div class="container" style="text-align: center; z-index: 2;">
      <span class="reveal" style="text-transform: uppercase; letter-spacing: 4px; font-weight: 700; color: var(--primary-color); display: block; margin-bottom: 20px;">Est. 1986</span>
      <h1 class="reveal" style="font-size: clamp(3rem, 8vw, 5rem); font-weight: 900; line-height: 1.1; margin-bottom: 20px; text-shadow: 0 10px 30px rgba(0,0,0,0.3);">Powering Nigeria's <br>Agricultural Future</h1>
      <p class="reveal" style="font-size: 1.25rem; max-width: 800px; margin: 0 auto; color: rgba(255,255,255,0.9); line-height: 1.6; animation-delay: 0.2s;">
        Bridging the mechanization gap with world-class machinery, genuine parts, and expert support since 1986.
      </p>
    </div>
  `;

  // 2. Stats Bar
  const statsBar = document.createElement('section');
  statsBar.style.padding = '50px 0';
  statsBar.style.background = 'var(--admin-surface)';
  statsBar.style.borderBottom = '1px solid var(--admin-border)';
  statsBar.innerHTML = `
    <div class="container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 30px; text-align: center;">
      <div class="reveal">
        <h3 style="font-size: 2.5rem; font-weight: 800; color: var(--primary-color); margin-bottom: 5px;">1,200+</h3>
        <p style="color: var(--text-muted); font-weight: 600; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 1px;">Tractors Delivered</p>
      </div>
      <div class="reveal" style="animation-delay: 0.1s;">
        <h3 style="font-size: 2.5rem; font-weight: 800; color: var(--primary-color); margin-bottom: 5px;">5,000+</h3>
        <p style="color: var(--text-muted); font-weight: 600; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 1px;">Farmers Supported</p>
      </div>
      <div class="reveal" style="animation-delay: 0.2s;">
        <h3 style="font-size: 2.5rem; font-weight: 800; color: var(--primary-color); margin-bottom: 5px;">20+</h3>
        <p style="color: var(--text-muted); font-weight: 600; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 1px;">Service Centers</p>
      </div>
      <div class="reveal" style="animation-delay: 0.3s;">
        <h3 style="font-size: 2.5rem; font-weight: 800; color: var(--primary-color); margin-bottom: 5px;">38+</h3>
        <p style="color: var(--text-muted); font-weight: 600; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 1px;">Years of Excellence</p>
      </div>
    </div>
  `;

  // 3. Mission & Vision (Glassmorphism)
  const strategicSection = document.createElement('section');
  strategicSection.style.padding = '100px 0';
  strategicSection.style.background = 'var(--background-color)';
  strategicSection.innerHTML = `
    <div class="container">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 40px;">
        <div class="card reveal" style="padding: 60px; background: var(--surface-color); border: 1px solid var(--admin-border); border-radius: 24px; position: relative; overflow: hidden;">
          <div style="position: absolute; right: -20px; top: -20px; font-size: 10rem; opacity: 0.03; font-weight: 900;">MISSION</div>
          <div style="width: 60px; height: 60px; background: rgba(253,186,11,0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--primary-color); margin-bottom: 30px;">
            ${Target}
          </div>
          <h2 style="font-size: 2rem; font-weight: 800; margin-bottom: 20px;">Our Mission</h2>
          <p style="color: var(--text-muted); font-size: 1.15rem; line-height: 1.8;">
            To empower Nigerian farmers with world-class agricultural machinery that enhances productivity, reduces labor costs, and drives sustainable agricultural growth across the nation.
          </p>
        </div>
        <div class="card reveal" style="padding: 60px; background: var(--surface-color); border: 1px solid var(--admin-border); border-radius: 24px; position: relative; overflow: hidden; animation-delay: 0.2s;">
          <div style="position: absolute; right: -20px; top: -20px; font-size: 10rem; opacity: 0.03; font-weight: 900;">VISION</div>
          <div style="width: 60px; height: 60px; background: rgba(253,186,11,0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--primary-color); margin-bottom: 30px;">
            ${Eye}
          </div>
          <h2 style="font-size: 2rem; font-weight: 800; margin-bottom: 20px;">Our Vision</h2>
          <p style="color: var(--text-muted); font-size: 1.15rem; line-height: 1.8;">
            To become the most recognized and trusted agricultural machinery partner across West Africa; championing modern farming, strengthening partnerships, and delivering innovations that transform communities.
          </p>
        </div>
      </div>
    </div>
  `;

  // 4. Legacy Timeline
  const timelineSection = document.createElement('section');
  timelineSection.style.padding = '100px 0';
  timelineSection.style.background = 'var(--admin-bg)';
  timelineSection.innerHTML = `
    <div class="container">
      <div style="text-align: center; margin-bottom: 70px;">
        <h2 class="reveal" style="font-size: 3rem; font-weight: 900; margin-bottom: 15px;">A Legacy of Excellence</h2>
        <p class="reveal" style="color: var(--text-muted); font-size: 1.1rem;">Tracing our impact on Nigerian agriculture through the decades.</p>
      </div>

      <div style="position: relative; max-width: 900px; margin: 0 auto; padding: 40px 0;">
        <!-- Center Line -->
        <div style="position: absolute; left: 50%; top: 0; bottom: 0; width: 2px; background: var(--admin-border); transform: translateX(-50%);"></div>

        <!-- Timeline Items -->
        <div style="display: flex; flex-direction: column; gap: 60px;">
          <div class="reveal" style="display: flex; justify-content: flex-end; width: 50%; padding-right: 50px; position: relative;">
            <div style="text-align: right;">
              <h4 style="color: var(--primary-color); font-size: 1.5rem; font-weight: 800; margin-bottom: 5px;">1986</h4>
              <h5 style="margin-bottom: 10px; font-size: 1.2rem;">Company Founded</h5>
              <p style="color: var(--text-muted); font-size: 0.95rem;">Operations commenced with a focus on high-quality agricultural implements.</p>
            </div>
            <div style="position: absolute; right: -7px; top: 10px; width: 14px; height: 14px; background: var(--primary-color); border-radius: 50%; box-shadow: 0 0 10px var(--primary-color);"></div>
          </div>

          <div class="reveal" style="display: flex; justify-content: flex-start; width: 50%; align-self: flex-end; padding-left: 50px; position: relative;">
            <div style="text-align: left;">
              <h4 style="color: var(--primary-color); font-size: 1.5rem; font-weight: 800; margin-bottom: 5px;">2012</h4>
              <h5 style="margin-bottom: 10px; font-size: 1.2rem;">Partnership with Massey Ferguson</h5>
              <p style="color: var(--text-muted); font-size: 0.95rem;">Became an authorized dealer, bringing premium global technology to Nigeria.</p>
            </div>
            <div style="position: absolute; left: -7px; top: 10px; width: 14px; height: 14px; background: var(--primary-color); border-radius: 50%;"></div>
          </div>

          <div class="reveal" style="display: flex; justify-content: flex-end; width: 50%; padding-right: 50px; position: relative;">
            <div style="text-align: right;">
              <h4 style="color: var(--primary-color); font-size: 1.5rem; font-weight: 800; margin-bottom: 5px;">2020</h4>
              <h5 style="margin-bottom: 10px; font-size: 1.2rem;">Genuine Parts Network</h5>
              <p style="color: var(--text-muted); font-size: 0.95rem;">Established a nationwide distribution network for 100% authentic OEM parts.</p>
            </div>
            <div style="position: absolute; right: -7px; top: 10px; width: 14px; height: 14px; background: var(--primary-color); border-radius: 50%;"></div>
          </div>

          <div class="reveal" style="display: flex; justify-content: flex-start; width: 50%; align-self: flex-end; padding-left: 50px; position: relative;">
            <div style="text-align: left;">
              <h4 style="color: var(--primary-color); font-size: 1.5rem; font-weight: 800; margin-bottom: 5px;">2024</h4>
              <h5 style="margin-bottom: 10px; font-size: 1.2rem;">Industry Recognition</h5>
              <p style="color: var(--text-muted); font-size: 0.95rem;">Awarded Top Agricultural Machinery Provider for excellence in service and impact.</p>
            </div>
            <div style="position: absolute; left: -7px; top: 10px; width: 14px; height: 14px; background: var(--primary-color); border-radius: 50%;"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  // 5. Why Choose Us (USPs)
  const uspSection = document.createElement('section');
  uspSection.style.padding = '100px 0';
  uspSection.innerHTML = `
    <div class="container">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;">
        <div class="reveal">
          <span style="font-weight: 700; color: var(--primary-color); text-transform: uppercase; letter-spacing: 2px;">Core Advantages</span>
          <h2 style="font-size: 3rem; font-weight: 900; margin: 20px 0 30px; line-height: 1.1;">The Sankara <br>Difference</h2>
          <p style="color: var(--text-muted); font-size: 1.15rem; margin-bottom: 40px; line-height: 1.8;">
            We don't just sell machinery; we build long-term partnerships with farmers to ensure the success of every harvest.
          </p>
          <div style="display: flex; flex-direction: column; gap: 25px;">
            <div style="display: flex; gap: 20px; align-items: flex-start;">
              <div style="color: var(--primary-color); flex-shrink: 0;">${ShieldCheck}</div>
              <div>
                <h4 style="font-weight: 700; margin-bottom: 5px;">100% Genuine Parts</h4>
                <p style="color: var(--text-muted); font-size: 0.95rem;">Direct from manufacturers to ensure longevity and peak performance.</p>
              </div>
            </div>
            <div style="display: flex; gap: 20px; align-items: flex-start;">
              <div style="color: var(--primary-color); flex-shrink: 0;">${Users}</div>
              <div>
                <h4 style="font-weight: 700; margin-bottom: 5px;">Expert Technical Support</h4>
                <p style="color: var(--text-muted); font-size: 0.95rem;">Factory-trained technicians providing round-the-clock assistance.</p>
              </div>
            </div>
            <div style="display: flex; gap: 20px; align-items: flex-start;">
              <div style="color: var(--primary-color); flex-shrink: 0;">${MapPin}</div>
              <div>
                <h4 style="font-weight: 700; margin-bottom: 5px;">Nationwide Network</h4>
                <p style="color: var(--text-muted); font-size: 0.95rem;">Service centers and delivery coverage across all 36 states.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="reveal" style="animation-delay: 0.2s;">
            <div style="background: var(--admin-surface); border: 1px solid var(--admin-border); padding: 40px; border-radius: 30px; position: relative;">
                <div style="position: absolute; -left: 20px; top: 20px; width: 100px; height: 100px; background: var(--primary-color); border-radius: 50%; opacity: 0.1; filter: blur(40px);"></div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div style="padding: 30px; background: var(--background-color); border-radius: 20px; text-align: center; border: 1px solid var(--admin-border);">
                        <div style="margin-bottom: 15px; color: var(--primary-color);">${Award}</div>
                        <h4 style="font-size: 1.2rem; font-weight: 800;">40Yrs</h4>
                        <p style="font-size: 0.75rem; color: var(--text-muted);">Experience</p>
                    </div>
                    <div style="padding: 30px; background: var(--background-color); border-radius: 20px; text-align: center; border: 1px solid var(--admin-border);">
                        <div style="margin-bottom: 15px; color: var(--primary-color);">${Truck}</div>
                        <h4 style="font-size: 1.2rem; font-weight: 800;">Fast</h4>
                        <p style="font-size: 0.75rem; color: var(--text-muted);">Delivery</p>
                    </div>
                    <div style="padding: 30px; background: var(--background-color); border-radius: 20px; text-align: center; border: 1px solid var(--admin-border);">
                        <div style="margin-bottom: 15px; color: var(--primary-color);">${Settings}</div>
                        <h4 style="font-size: 1.2rem; font-weight: 800;">Full</h4>
                        <p style="font-size: 0.75rem; color: var(--text-muted);">Warranty</p>
                    </div>
                    <div style="padding: 30px; background: var(--background-color); border-radius: 20px; text-align: center; border: 1px solid var(--admin-border);">
                        <div style="margin-bottom: 15px; color: var(--primary-color);">${Users}</div>
                        <h4 style="font-size: 1.2rem; font-weight: 800;">24/7</h4>
                        <p style="font-size: 0.75rem; color: var(--text-muted);">Support</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  `;

  // 6. Leadership & Team (Dynamic)
  const teamSection = document.createElement('section');
  teamSection.style.padding = '100px 0';
  teamSection.style.background = 'var(--background-color)';
  teamSection.innerHTML = `
    <div class="container">
      <div style="text-align: center; margin-bottom: 70px;">
        <span class="reveal" style="font-weight: 700; color: var(--primary-color); text-transform: uppercase; letter-spacing: 2px;">Management Excellence</span>
        <h2 class="reveal" style="font-size: 3rem; font-weight: 900; margin: 20px 0 15px;">Meet Our Leadership team</h2>
        <p class="reveal" style="color: var(--text-muted); font-size: 1.1rem; max-width: 700px; margin: 0 auto;">
          The visionary professionals behind our decade-long commitment to Nigerian agricultural excellence.
        </p>
      </div>
      <div id="team-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 40px;">
        <!-- Dynamic Content -->
      </div>
    </div>
  `;

  const fetchTeam = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/team');
      const team = await res.json();
      const grid = teamSection.querySelector('#team-grid');
      
      if (team.length === 0) {
        grid.innerHTML = `
          <div class="reveal" style="grid-column: 1/-1; text-align: center; padding: 60px; background: var(--admin-surface); border: 1px solid var(--admin-border); border-radius: 20px;">
            <p style="color: var(--text-muted); font-size: 1.1rem; margin-bottom: 0;">Our management profile is currently being updated. Please check back shortly.</p>
          </div>
        `;
        return;
      }

      grid.innerHTML = team.map((member, index) => `
        <div class="reveal team-card" style="animation-delay: ${index * 0.1}s; group: hover; text-align: center;">
          <div style="width: 200px; height: 200px; border-radius: 50%; overflow: hidden; margin: 0 auto 25px; border: 4px solid var(--admin-border); transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); position: relative; cursor: pointer;" onmouseover="this.style.borderColor='var(--primary-color)'; this.style.transform='scale(1.05)';" onmouseout="this.style.borderColor='var(--admin-border)'; this.style.transform='scale(1)';" >
            <img src="${member.image}" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <h3 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 8px; transition: color 0.3s ease;">${member.name}</h3>
          <p style="color: var(--primary-color); font-weight: 700; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 1px;">${member.role}</p>
        </div>
      `).join('');
      
      if (window.initAnimations) window.initAnimations();
    } catch (err) { console.error(err); }
  };

  fetchTeam();

  container.appendChild(renderNavbar());
  container.appendChild(hero);
  container.appendChild(statsBar);
  container.appendChild(strategicSection);
  container.appendChild(timelineSection);
  container.appendChild(uspSection);
  container.appendChild(teamSection);
  container.appendChild(renderFooter());

  // Trigger animations after insertion
  setTimeout(() => {
    if (window.initAnimations) {
      window.initAnimations();
    }
  }, 100);

  return container;
}
