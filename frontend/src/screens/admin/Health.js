import { renderAdminLayout } from '../../components/AdminLayout';
import { Activity, CheckCircle, AlertCircle, Cpu, HardDrive, RefreshCw, Database, Globe, Terminal, Play } from 'lucide-static';

export function renderAdminHealth() {
  const content = document.createElement('div');
  let activeTab = 'website'; // 'website', 'id_system', 'dev_tools'
  let healthData = null;
  let webLogs = [];
  let attendanceLogs = [];
  
  const renderContainer = () => {
    content.innerHTML = `
      <div class="flex-between" style="margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
        <h1 class="admin-page-title" style="margin-bottom: 0; display: flex; align-items: center; gap: 10px;">
          ${Terminal} Developer Dashboard & Health
        </h1>
        <div style="display: flex; gap: 12px; align-items: center;">
          <div style="display: flex; background: var(--admin-border); padding: 4px; border-radius: 8px;">
            <button id="btnWeb" style="border: none; padding: 8px 16px; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 0.85rem; transition: all 0.2s;">🖥️ Website Portal</button>
            <button id="btnID" style="border: none; padding: 8px 16px; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 0.85rem; transition: all 0.2s;">🆔 ID Cards System</button>
            <button id="btnTools" style="border: none; padding: 8px 16px; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 0.85rem; transition: all 0.2s;">🛠️ Dev Tools</button>
          </div>
          <button id="refreshBtn" class="btn-primary" style="display: flex; align-items: center; gap: 8px; padding: 10px 18px; font-size: 0.85rem;">
            ${RefreshCw} Run Live Check
          </button>
        </div>
      </div>

      <!-- WEBSITE PORTAL VIEW -->
      <div id="webPortalView" style="display: block;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; margin-bottom: 24px;" id="web-diagnostics-cards">
          <div class="admin-card" style="text-align: center; padding: 30px;">
            <div style="margin-bottom: 10px; color: var(--admin-text-muted);">Initializing website diagnostics...</div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px; margin-bottom: 24px; flex-wrap: wrap;">
          <div class="admin-card">
            <h2 style="margin: 0 0 20px; font-size: 1.25rem; display: flex; align-items: center; gap: 8px;">
              ${Cpu} Server Context
            </h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px;">
              <div style="background: var(--admin-bg); padding: 16px; border-radius: 10px; border: 1px solid var(--admin-border);">
                <div style="color: var(--admin-text-muted); font-size: 0.8rem; margin-bottom: 4px;">PHP Version</div>
                <div id="php-version" style="font-weight: 700; font-family: monospace; color: var(--admin-text);">Loading...</div>
              </div>
              <div style="background: var(--admin-bg); padding: 16px; border-radius: 10px; border: 1px solid var(--admin-border);">
                <div style="color: var(--admin-text-muted); font-size: 0.8rem; margin-bottom: 4px;">Memory Usage</div>
                <div id="memory-usage" style="font-weight: 700; font-family: monospace; color: var(--admin-text);">Loading...</div>
              </div>
              <div style="background: var(--admin-bg); padding: 16px; border-radius: 10px; border: 1px solid var(--admin-border);">
                <div style="color: var(--admin-text-muted); font-size: 0.8rem; margin-bottom: 4px;">Environment</div>
                <div id="env-mode" style="font-weight: 700; text-transform: uppercase; color: var(--admin-text);">Loading...</div>
              </div>
              <div style="background: var(--admin-bg); padding: 16px; border-radius: 10px; border: 1px solid var(--admin-border);">
                <div style="color: var(--admin-text-muted); font-size: 0.8rem; margin-bottom: 4px;">System Uptime</div>
                <div id="system-uptime" style="font-weight: 700; color: var(--admin-text);">Loading...</div>
              </div>
            </div>
          </div>

          <div class="admin-card">
            <h2 style="margin-bottom: 20px; font-size: 1.25rem; display: flex; align-items: center; gap: 8px;">
              ${Globe} Endpoint Status
            </h2>
            <div style="display: flex; flex-direction: column; gap: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 8px; border-bottom: 1px solid var(--admin-border);">
                <span style="font-size: 0.9rem; color: var(--admin-text);">Public Web API (/api/products)</span>
                <span class="badge badge-success" style="background: rgba(34, 197, 94, 0.1); color: #22c55e; padding: 4px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: 600;">ONLINE</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 8px; border-bottom: 1px solid var(--admin-border);">
                <span style="font-size: 0.9rem; color: var(--admin-text);">Admin Auth (/api/login)</span>
                <span class="badge badge-success" style="background: rgba(34, 197, 94, 0.1); color: #22c55e; padding: 4px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: 600;">ONLINE</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 8px; border-bottom: 1px solid var(--admin-border);">
                <span style="font-size: 0.9rem; color: var(--admin-text);">Image Storage Bucket</span>
                <span class="badge badge-success" style="background: rgba(34, 197, 94, 0.1); color: #22c55e; padding: 4px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: 600;">ONLINE</span>
              </div>
            </div>
          </div>
        </div>

        <div class="admin-card">
          <h2 style="font-size: 1.25rem; margin-bottom: 20px; display: flex; align-items: center; gap: 8px;">
            ${Database} Recent Website Admin Activities
          </h2>
          <div class="admin-table-container">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Action</th>
                  <th>Description</th>
                  <th>IP Address</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody id="web-logs-tbody">
                <tr>
                  <td colspan="5" style="padding: 30px; text-align: center; color: var(--admin-text-muted);">Loading log stream...</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ID CARD SYSTEM VIEW -->
      <div id="idSystemView" style="display: none;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; margin-bottom: 24px;">
          <div class="admin-card" style="display: flex; align-items: center; gap: 20px;">
            <div style="background: rgba(37, 99, 235, 0.1); color: #2563eb; width: 50px; height: 50px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: bold;">
              👥
            </div>
            <div>
              <div style="color: var(--admin-text-muted); font-size: 0.85rem; font-weight: 600;">Total Registered Staff</div>
              <div id="staff-count-badge" style="font-size: 1.75rem; font-weight: 800; color: var(--admin-text);">0</div>
            </div>
          </div>
          <div class="admin-card" style="display: flex; align-items: center; gap: 20px;">
            <div style="background: rgba(34, 197, 94, 0.1); color: #22c55e; width: 50px; height: 50px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: bold;">
              📝
            </div>
            <div>
              <div style="color: var(--admin-text-muted); font-size: 0.85rem; font-weight: 600;">Attendance Records</div>
              <div id="attendance-count-badge" style="font-size: 1.75rem; font-weight: 800; color: var(--admin-text);">0</div>
            </div>
          </div>
          <div class="admin-card" style="display: flex; align-items: center; gap: 20px;">
            <div style="background: rgba(239, 68, 68, 0.1); color: #ef4444; width: 50px; height: 50px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: bold;">
              ⚠️
            </div>
            <div>
              <div style="color: var(--admin-text-muted); font-size: 0.85rem; font-weight: 600;">Feedback & Complaints</div>
              <div id="complaints-count-badge" style="font-size: 1.75rem; font-weight: 800; color: var(--admin-text);">0</div>
            </div>
          </div>
        </div>

        <div class="admin-card">
          <h2 style="font-size: 1.25rem; margin-bottom: 20px; display: flex; align-items: center; gap: 8px;">
            🆔 Recent Staff Attendance & Device Logins (ID App)
          </h2>
          <div class="admin-table-container">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Staff Member</th>
                  <th>Action</th>
                  <th>Device / Status</th>
                  <th>Location (Lat/Lon)</th>
                  <th>Date & Time</th>
                </tr>
              </thead>
              <tbody id="attendance-logs-tbody">
                <tr>
                  <td colspan="5" style="padding: 30px; text-align: center; color: var(--admin-text-muted);">Loading ID attendance stream...</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- DEV TOOLS VIEW -->
      <div id="devToolsView" style="display: none;">
        <div class="admin-card" style="margin-bottom: 24px;">
          <h2 style="font-size: 1.25rem; margin-bottom: 20px; display: flex; align-items: center; gap: 8px;">
            ⚡ Superuser System Operations
          </h2>
          <p style="color: var(--admin-text-muted); font-size: 0.9rem; margin-bottom: 20px;">
            These controls bypass standard CMS features and perform administrative tasks directly on the application backend databases.
          </p>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
            <div style="border: 1px solid var(--admin-border); padding: 20px; border-radius: 12px; background: var(--admin-bg); display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <h3 style="font-weight: 700; color: var(--admin-text); margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
                  ${Database} Force DB Migration
                </h3>
                <p style="font-size: 0.85rem; color: var(--admin-text-muted); margin-bottom: 16px; line-height: 1.4;">
                  Executes <code>php artisan migrate --force</code> on the Vercel PostgreSQL database to synchronize schemas.
                </p>
              </div>
              <button id="btnRunMigration" class="btn-primary" style="display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px; font-weight: 700; background: #2563eb;">
                ${Play} Run Schema Migrations
              </button>
            </div>

            <div style="border: 1px solid var(--admin-border); padding: 20px; border-radius: 12px; background: var(--admin-bg); display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <h3 style="font-weight: 700; color: var(--admin-text); margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
                  🏆 Reset ID Staff Performance
                </h3>
                <p style="font-size: 0.85rem; color: var(--admin-text-muted); margin-bottom: 16px; line-height: 1.4;">
                  Calls the ID API to archive staff scores into the monthly leaderboard history database table and reset active scores to 0.
                </p>
              </div>
              <button id="btnResetScores" class="btn-primary" style="display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px; font-weight: 700; background: #ef4444; border-color: #ef4444;">
                🔄 Reset Leaderboard Scores
              </button>
            </div>
          </div>
        </div>

        <div class="admin-card" id="migration-output-card" style="display: none; border-top: 4px solid var(--admin-primary);">
          <h3 style="margin-bottom: 12px; font-size: 1.1rem; color: var(--admin-text);">Migration Output Console</h3>
          <pre id="migration-output" style="background: #111827; color: #10b981; padding: 16px; border-radius: 8px; font-family: monospace; font-size: 0.85rem; overflow-x: auto; white-space: pre-wrap; max-height: 250px;"></pre>
        </div>
      </div>
    `;

    // Tab Navigation setup
    const btnWeb = content.querySelector('#btnWeb');
    const btnID = content.querySelector('#btnID');
    const btnTools = content.querySelector('#btnTools');
    const refreshBtn = content.querySelector('#refreshBtn');

    const webView = content.querySelector('#webPortalView');
    const idView = content.querySelector('#idSystemView');
    const toolsView = content.querySelector('#devToolsView');

    const switchTab = (tab) => {
      activeTab = tab;
      [btnWeb, btnID, btnTools].forEach(b => {
        b.style.background = 'none';
        b.style.color = 'var(--admin-text-muted)';
      });

      webView.style.display = 'none';
      idView.style.display = 'none';
      toolsView.style.display = 'none';

      if (tab === 'website') {
        btnWeb.style.background = 'var(--admin-card-bg)';
        btnWeb.style.color = 'var(--admin-text)';
        webView.style.display = 'block';
        renderDiagnostics();
        renderWebLogs();
      } else if (tab === 'id_system') {
        btnID.style.background = 'var(--admin-card-bg)';
        btnID.style.color = 'var(--admin-text)';
        idView.style.display = 'block';
        renderIDStats();
        renderAttendanceLogs();
      } else if (tab === 'dev_tools') {
        btnTools.style.background = 'var(--admin-card-bg)';
        btnTools.style.color = 'var(--admin-text)';
        toolsView.style.display = 'block';
      }
    };

    btnWeb.onclick = () => switchTab('website');
    btnID.onclick = () => switchTab('id_system');
    btnTools.onclick = () => switchTab('dev_tools');

    refreshBtn.onclick = async () => {
      refreshBtn.disabled = true;
      refreshBtn.innerHTML = `${RefreshCw} Checking...`;
      await loadAllData();
      refreshBtn.disabled = false;
      refreshBtn.innerHTML = `${RefreshCw} Run Live Check`;
    };

    // Attach operation listeners
    content.querySelector('#btnRunMigration').onclick = runMigrationAction;
    content.querySelector('#btnResetScores').onclick = resetScoresAction;

    switchTab('website');
  };

  const renderDiagnostics = () => {
    const container = content.querySelector('#web-diagnostics-cards');
    if (!container || !healthData) return;

    container.innerHTML = healthData.diagnostics.map(diag => {
      const isHealthy = diag.status === 'Healthy';
      const icon = isHealthy ? CheckCircle : AlertCircle;
      const color = isHealthy ? '#22c55e' : '#ef4444';
      
      return `
        <div class="admin-card" style="display: flex; flex-direction: column; align-items: center; text-align: center; gap: 15px; border-top: 4px solid ${color};">
          <div style="color: ${color}; transform: scale(1.4);">
            ${icon}
          </div>
          <div>
            <h3 style="margin: 0; font-size: 1.05rem; color: var(--admin-text);">${diag.name}</h3>
            <p style="margin: 5px 0 0; font-size: 0.85rem; color: var(--admin-text-muted);">${diag.message}</p>
          </div>
          <span style="background: ${isHealthy ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)'}; color: ${color}; padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; margin-top: auto;">
            ${diag.status}
          </span>
        </div>
      `;
    }).join('');

    // Update server context variables
    content.querySelector('#php-version').textContent = healthData.system.php_version;
    content.querySelector('#memory-usage').textContent = healthData.system.memory_usage;
    content.querySelector('#env-mode').textContent = healthData.system.environment;
    content.querySelector('#system-uptime').textContent = healthData.system.uptime;
  };

  const renderWebLogs = () => {
    const tbody = content.querySelector('#web-logs-tbody');
    if (!tbody) return;

    if (webLogs.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" style="padding: 30px; text-align: center; color: var(--admin-text-muted);">No recent logs recorded.</td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = webLogs.slice(0, 10).map(log => {
      const date = new Date(log.created_at).toLocaleString();
      let badgeColor = '#3b82f6';
      let badgeBg = 'rgba(59, 130, 246, 0.1)';
      if (log.action.includes('CREATE')) {
        badgeColor = '#22c55e';
        badgeBg = 'rgba(34, 197, 94, 0.1)';
      } else if (log.action.includes('DELETE')) {
        badgeColor = '#ef4444';
        badgeBg = 'rgba(239, 68, 68, 0.1)';
      }

      return `
        <tr>
          <td style="font-weight: 700; color: var(--admin-text);">${log.user_name || 'System/Guest'}</td>
          <td>
            <span style="background: ${badgeBg}; color: ${badgeColor}; padding: 3px 8px; border-radius: 6px; font-size: 0.7rem; font-weight: 700;">
              ${log.action}
            </span>
          </td>
          <td style="color: var(--admin-text-muted); font-size: 0.85rem;">${log.description}</td>
          <td style="font-family: monospace; font-size: 0.8rem;">${log.ip_address || '-'}</td>
          <td style="font-size: 0.8rem; color: var(--admin-text-muted);">${date}</td>
        </tr>
      `;
    }).join('');
  };

  const renderIDStats = () => {
    if (!healthData || !healthData.id_system) return;
    const stats = healthData.id_system.stats;
    content.querySelector('#staff-count-badge').textContent = stats.staff_count;
    content.querySelector('#attendance-count-badge').textContent = stats.attendance_count;
    content.querySelector('#complaints-count-badge').textContent = stats.complaints_count;
  };

  const renderAttendanceLogs = () => {
    const tbody = content.querySelector('#attendance-logs-tbody');
    if (!tbody) return;

    if (attendanceLogs.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" style="padding: 30px; text-align: center; color: var(--admin-text-muted);">No attendance records recorded yet.</td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = attendanceLogs.slice(0, 15).map(log => {
      const checkInTime = log.clock_in_time ? new Date(log.clock_in_time).toLocaleTimeString() : '-';
      const checkOutTime = log.clock_out_time ? new Date(log.clock_out_time).toLocaleTimeString() : '-';
      
      let proxyWarning = '';
      if (log.is_proxy) {
        proxyWarning = `<span style="background: rgba(239, 68, 68, 0.1); color: #ef4444; padding: 2px 6px; border-radius: 4px; font-size: 0.65rem; font-weight: 700; margin-left: 6px;">PROXY DEVICE WARNING</span>`;
      }

      return `
        <tr>
          <td style="font-weight: 700; color: var(--admin-text);">${log.staff_name}</td>
          <td>
            <span style="background: rgba(34, 197, 94, 0.1); color: #22c55e; padding: 4px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: 600;">
              ATTENDANCE RECORD
            </span>
          </td>
          <td style="color: var(--admin-text-muted); font-size: 0.85rem;">
            In: <strong>${checkInTime}</strong> | Out: <strong>${checkOutTime}</strong>
            ${proxyWarning}
          </td>
          <td style="font-family: monospace; font-size: 0.8rem;">${log.latitude || '-'}, ${log.longitude || '-'}</td>
          <td style="font-size: 0.8rem; color: var(--admin-text-muted);">${log.date}</td>
        </tr>
      `;
    }).join('');
  };

  const loadAllData = async () => {
    // 1. Fetch Health Status from Laravel
    try {
      const healthRes = await fetch(`/api/admin/health?t=${Date.now()}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` }
      });
      if (healthRes.ok) {
        healthData = await healthRes.json();
        renderDiagnostics();
        renderIDStats();
      }
    } catch(e) {
      console.error("Health fetch error", e);
    }

    // 2. Fetch Web Admin Logs from Laravel
    try {
      const logsRes = await fetch(`/api/admin/logs?t=${Date.now()}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` }
      });
      if (logsRes.ok) {
        webLogs = await logsRes.json();
        renderWebLogs();
      }
    } catch(e) {
      console.error("Web logs fetch error", e);
    }

    // 3. Fetch Attendance Logs from Python FastAPI (using direct client request, since allowed by CORS)
    try {
      const attRes = await fetch(`https://sankara-id.vercel.app/attendance/?limit=20&t=${Date.now()}`);
      if (attRes.ok) {
        attendanceLogs = await attRes.json();
        renderAttendanceLogs();
      }
    } catch(e) {
      console.error("Attendance logs fetch error", e);
    }
  };

  const runMigrationAction = async () => {
    const confirm = await window.showConfirm("Are you sure you want to trigger database migrations on the production server?");
    if (!confirm) return;

    const btn = content.querySelector('#btnRunMigration');
    const outputCard = content.querySelector('#migration-output-card');
    const outputConsole = content.querySelector('#migration-output');

    btn.disabled = true;
    btn.innerHTML = `${RefreshCw} Migrating...`;
    outputCard.style.display = 'block';
    outputConsole.textContent = "Connecting to backend Artisan console...\n";

    try {
      const res = await fetch('/api/admin/migrate', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` }
      });
      const data = await res.json();
      if (res.ok && data.status === 'success') {
        outputConsole.textContent = data.output || "Migration completed successfully with no new output.";
        alert("Database schemas synchronized successfully!");
        await loadAllData();
      } else {
        outputConsole.textContent = `Migration Failed:\n${data.message || 'Unknown error occurred'}`;
        alert("Error executing migrations.");
      }
    } catch(e) {
      outputConsole.textContent = `Network Error:\n${e.message}`;
      alert("Network communication error.");
    } finally {
      btn.disabled = false;
      btn.innerHTML = `${Play} Run Schema Migrations`;
    }
  };

  const resetScoresAction = async () => {
    const confirm = await window.showConfirm("Are you absolutely sure you want to reset all staff scores? Active monthly scores will be archived, and reset to 0.");
    if (!confirm) return;

    const btn = content.querySelector('#btnResetScores');
    btn.disabled = true;
    btn.innerHTML = `${RefreshCw} Resetting...`;

    try {
      const res = await fetch('/api/admin/id-system/reset-scores', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` }
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.detail || "Scores reset and archived successfully!");
        await loadAllData();
      } else {
        alert(`Reset Failed: ${data.error || 'Server error'}`);
      }
    } catch(e) {
      console.error(e);
      alert("Network communication error.");
    } finally {
      btn.disabled = false;
      btn.innerHTML = `🔄 Reset Leaderboard Scores`;
    }
  };

  renderContainer();
  loadAllData();

  return renderAdminLayout(content, 'admin-health');
}
