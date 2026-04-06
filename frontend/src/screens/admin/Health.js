import { renderAdminLayout } from '../../components/AdminLayout';
import { Activity, CheckCircle, AlertCircle, Cpu, HardDrive, RefreshCw } from 'lucide-static';

export function renderAdminHealth() {
  const content = document.createElement('div');
  
  content.innerHTML = `
    <h1 class="admin-page-title">System Health Monitoring</h1>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin-bottom: 30px;" id="health-cards">
      <div class="admin-card" style="text-align: center; padding: 40px;">
        <div style="margin-bottom: 15px; color: var(--admin-text-muted);">Initializating diagnostics...</div>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px;">
      <div class="admin-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
          <h2 style="margin: 0; font-size: 1.25rem;">Server Context</h2>
          <button id="refreshHealthBtn" class="btn-primary" style="display: flex; align-items: center; gap: 8px; padding: 8px 16px; font-size: 0.85rem;">
            ${RefreshCw} Run Live Check
          </button>
        </div>
        
        <div id="system-details" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
          <div style="background: var(--admin-bg); padding: 15px; border-radius: 10px; border: 1px solid var(--admin-border);">
            <div style="color: var(--admin-text-muted); font-size: 0.8rem; margin-bottom: 5px;">PHP Version</div>
            <div id="php-version" style="font-weight: 600; font-family: monospace;">Loading...</div>
          </div>
          <div style="background: var(--admin-bg); padding: 15px; border-radius: 10px; border: 1px solid var(--admin-border);">
            <div style="color: var(--admin-text-muted); font-size: 0.8rem; margin-bottom: 5px;">Memory Usage</div>
            <div id="memory-usage" style="font-weight: 600; font-family: monospace;">Loading...</div>
          </div>
          <div style="background: var(--admin-bg); padding: 15px; border-radius: 10px; border: 1px solid var(--admin-border);">
            <div style="color: var(--admin-text-muted); font-size: 0.8rem; margin-bottom: 5px;">Environment</div>
            <div id="env-mode" style="font-weight: 600; text-transform: uppercase;">Loading...</div>
          </div>
          <div style="background: var(--admin-bg); padding: 15px; border-radius: 10px; border: 1px solid var(--admin-border);">
            <div style="color: var(--admin-text-muted); font-size: 0.8rem; margin-bottom: 5px;">System Uptime</div>
            <div id="system-uptime" style="font-weight: 600;">Loading...</div>
          </div>
        </div>
      </div>

      <div class="admin-card">
        <h2 style="margin-bottom: 20px; font-size: 1.25rem;">Endpoint Status</h2>
        <div style="display: flex; flex-direction: column; gap: 15px;">
          <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 10px; border-bottom: 1px solid var(--admin-border);">
            <span style="font-size: 0.9rem;">Public API (/api/products)</span>
            <span class="badge badge-success">Online</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 10px; border-bottom: 1px solid var(--admin-border);">
            <span style="font-size: 0.9rem;">Admin Auth (/api/login)</span>
            <span class="badge badge-success">Online</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 10px; border-bottom: 1px solid var(--admin-border);">
            <span style="font-size: 0.9rem;">Metrics Hub (/api/metrics)</span>
            <span class="badge badge-success">Online</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 10px; border-bottom: 1px solid var(--admin-border);">
            <span style="font-size: 0.9rem;">Assets Server (/uploads)</span>
            <span class="badge badge-success">Online</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const loadHealthData = async () => {
    const cardsContainer = content.querySelector('#health-cards');
    const refreshBtn = content.querySelector('#refreshHealthBtn');
    
    if (refreshBtn) {
      refreshBtn.disabled = true;
      refreshBtn.innerHTML = `${RefreshCw} Checking...`;
    }

    try {
      const response = await fetch('/api/admin/health', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        }
      });
      
      if (response.status === 401) {
        window.history.pushState({}, '', '/admin/login');
        window.dispatchEvent(new Event('popstate'));
        return;
      }

      const data = await response.json();
      
      // Update System Details
      content.querySelector('#php-version').textContent = data.system.php_version;
      content.querySelector('#memory-usage').textContent = data.system.memory_usage;
      content.querySelector('#env-mode').textContent = data.system.environment;
      content.querySelector('#system-uptime').textContent = data.system.uptime;

      // Update Diagnostics Cards
      cardsContainer.innerHTML = data.diagnostics.map(diag => {
        const isHealthy = diag.status === 'Healthy';
        const icon = isHealthy ? CheckCircle : AlertCircle;
        const color = isHealthy ? '#22c55e' : '#ef4444';
        
        return `
          <div class="admin-card" style="display: flex; flex-direction: column; align-items: center; text-align: center; gap: 15px; border-top: 4px solid ${color};">
            <div style="color: ${color}; transform: scale(1.5);">
              ${icon}
            </div>
            <div>
              <h3 style="margin: 0; font-size: 1.1rem; color: var(--admin-text);">${diag.name}</h3>
              <p style="margin: 5px 0 0; font-size: 0.85rem; color: var(--admin-text-muted);">${diag.message}</p>
            </div>
            <div class="badge ${isHealthy ? 'badge-success' : 'badge-important'}" style="margin-top: auto;">
              ${diag.status.toUpperCase()}
            </div>
          </div>
        `;
      }).join('');

    } catch (err) {
      console.error(err);
      cardsContainer.innerHTML = `
        <div class="admin-card" style="grid-column: 1/-1; text-align: center; padding: 50px; color: #ef4444;">
          ${AlertCircle} <br>
          <p style="margin-top: 15px;">Failed to connect to diagnostic service. Please check your backend connection.</p>
        </div>
      `;
    } finally {
      if (refreshBtn) {
        refreshBtn.disabled = false;
        refreshBtn.innerHTML = `${RefreshCw} Run Live Check`;
      }
    }
  };

  // Initial Load
  setTimeout(loadHealthData, 0);

  // Attach refresh listener
  setTimeout(() => {
    const btn = content.querySelector('#refreshHealthBtn');
    if (btn) btn.onclick = loadHealthData;
  }, 0);

  return renderAdminLayout(content, 'admin-health');
}
