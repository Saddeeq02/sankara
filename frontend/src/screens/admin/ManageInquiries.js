import { renderAdminLayout } from '../../components/AdminLayout';
import { Mail, Search, Trash2, CheckCircle, Clock, Eye, X } from 'lucide-static';

export function renderAdminInquiries() {
  const content = document.createElement('div');
  let inquiries = [];
  let searchTerm = '';

  const renderContainer = () => {
    content.innerHTML = `
      <div class="flex-between" style="margin-bottom: 24px;">
        <h1 class="admin-page-title" style="margin-bottom: 0;">Inquiry Management</h1>
        <div style="background: var(--admin-surface); border: 1px solid var(--admin-border); border-radius: 8px; padding: 10px 15px; display: flex; align-items: center; gap: 10px; width: 350px;">
          <span style="color: var(--admin-text-muted);">${Search}</span>
          <input type="text" id="searchInput" placeholder="Search by name, email or subject..." value="${searchTerm}" style="background: none; border: none; color: white; width: 100%; outline: none;">
        </div>
      </div>

      <div class="admin-card" style="padding: 0; overflow: hidden;">
        <table style="width: 100%; border-collapse: collapse;">
          <thead style="background: var(--admin-surface); border-bottom: 1px solid var(--admin-border);">
            <tr>
              <th style="padding: 15px 20px; text-align: left; font-size: 0.85rem; text-transform: uppercase; color: var(--admin-text-muted);">Sender</th>
              <th style="padding: 15px 20px; text-align: left; font-size: 0.85rem; text-transform: uppercase; color: var(--admin-text-muted);">Subject</th>
              <th style="padding: 15px 20px; text-align: left; font-size: 0.85rem; text-transform: uppercase; color: var(--admin-text-muted);">Date</th>
              <th style="padding: 15px 20px; text-align: center; font-size: 0.85rem; text-transform: uppercase; color: var(--admin-text-muted);">Status</th>
              <th style="padding: 15px 20px; text-align: right; font-size: 0.85rem; text-transform: uppercase; color: var(--admin-text-muted);">Actions</th>
            </tr>
          </thead>
          <tbody id="inquiry-body">
            <tr><td colspan="5" style="padding: 100px; text-align: center; color: var(--admin-text-muted);">Loading inquiries...</td></tr>
          </tbody>
        </table>
      </div>

      <div id="modal-portal"></div>
    `;

    const searchInput = content.querySelector('#searchInput');
    searchInput.oninput = (e) => {
      searchTerm = e.target.value.toLowerCase();
      renderTable();
    };

    renderTable();
  };

  const renderTable = () => {
    const tbody = content.querySelector('#inquiry-body');
    const filtered = inquiries.filter(i => 
      i.name.toLowerCase().includes(searchTerm) || 
      i.email.toLowerCase().includes(searchTerm) || 
      i.subject.toLowerCase().includes(searchTerm)
    );

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="padding: 60px; text-align: center; color: var(--admin-text-muted);">No inquiries found matches your search.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map(item => `
      <tr style="border-bottom: 1px solid var(--admin-border);">
        <td style="padding: 15px 20px;">
          <div style="font-weight: 700;">${item.name}</div>
          <div style="font-size: 0.8rem; color: var(--admin-text-muted);">${item.email}</div>
        </td>
        <td style="padding: 15px 20px;">
          <div style="font-weight: 500;">${item.subject}</div>
        </td>
        <td style="padding: 15px 20px; font-size: 0.9rem;">${item.date}</td>
        <td style="padding: 15px 20px; text-align: center;">
          <span class="status-badge" data-status="${item.status}" style="padding: 5px 12px; border-radius: 100px; font-size: 0.75rem; font-weight: 700; background: ${item.status === 'Resolved' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)'}; color: ${item.status === 'Resolved' ? '#22c55e' : '#ef4444'}; border: 1px solid ${item.status === 'Resolved' ? '#22c55e' : '#ef4444'};">
            ${item.status}
          </span>
        </td>
        <td style="padding: 15px 20px; text-align: right;">
          <div style="display: flex; gap: 10px; justify-content: flex-end;">
            <button class="action-btn view-btn" data-id="${item.id}" style="padding: 8px; background: var(--admin-surface); border: 1px solid var(--admin-border); border-radius: 6px; cursor: pointer; color: var(--primary-color);">${Eye}</button>
            <button class="action-btn status-btn" data-id="${item.id}" style="padding: 8px; background: var(--admin-surface); border: 1px solid var(--admin-border); border-radius: 6px; cursor: pointer; color: #22c55e;">${CheckCircle}</button>
            <button class="action-btn delete-btn" data-id="${item.id}" style="padding: 8px; background: var(--admin-surface); border: 1px solid var(--admin-border); border-radius: 6px; cursor: pointer; color: #ef4444;">${Trash2}</button>
          </div>
        </td>
      </tr>
    `).join('');

    // Attach Listeners
    tbody.querySelectorAll('.view-btn').forEach(btn => {
      btn.onclick = () => openMessageModal(filtered.find(i => String(i.id) === String(btn.dataset.id)));
    });

    tbody.querySelectorAll('.status-btn').forEach(btn => {
      btn.onclick = async () => toggleStatus(btn.dataset.id);
    });

    tbody.querySelectorAll('.delete-btn').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        const portal = content.querySelector('#modal-portal');
        portal.innerHTML = `
          <div style="position:fixed; inset:0; background:rgba(0,0,0,0.8); z-index:3000; display:flex; align-items:center; justify-content:center; backdrop-filter: blur(8px);">
            <div style="background:var(--admin-surface); border:1px solid var(--admin-border); border-radius:15px; width:400px; padding:30px; text-align:center;">
              <div style="color:#ef4444; font-size:3rem; margin-bottom:20px;">⚠️</div>
              <h3 style="margin-bottom:10px; font-size:1.5rem;">Delete Inquiry?</h3>
              <p style="color:var(--admin-text-muted); margin-bottom:30px;">This action cannot be undone. Are you sure you want to remove this message?</p>
              <div style="display:flex; gap:15px; justify-content:center;">
                <button id="cancelDel" style="padding:10px 25px; background:var(--admin-bg); border:1px solid var(--admin-border); color:white; border-radius:8px; cursor:pointer;">Cancel</button>
                <button id="confirmDel" style="padding:10px 25px; background:#ef4444; border:none; color:white; border-radius:8px; cursor:pointer; font-weight:700;">Delete Forever</button>
              </div>
            </div>
          </div>
        `;
        
        portal.querySelector('#cancelDel').onclick = () => portal.innerHTML = '';
        portal.querySelector('#confirmDel').onclick = async () => {
          portal.querySelector('#confirmDel').textContent = 'Deleting...';
          const res = await fetch(`http://localhost:8080/api/inquiries/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` }
          });
          if (res.ok) {
            portal.innerHTML = '';
            loadData();
          }
        };
      };
    });
  };

  const openMessageModal = (inquiry) => {
    if (!inquiry) return;
    const portal = content.querySelector('#modal-portal');
    portal.innerHTML = `
      <div style="position:fixed; inset:0; background:rgba(0,0,0,0.7); z-index:2000; display:flex; align-items:center; justify-content:center; backdrop-filter: blur(5px);">
        <div style="background:var(--admin-surface); border:1px solid var(--admin-border); border-radius:20px; width:600px; max-width:95%; padding:40px; position:relative;">
          <button id="closeInqModal" style="position:absolute; top:20px; right:20px; background:none; border:none; color:white; cursor:pointer;">${X}</button>
          <div style="margin-bottom:30px;">
             <div style="color:var(--primary-color); font-weight:800; text-transform:uppercase; font-size:0.8rem; letter-spacing:1px; margin-bottom:10px;">Customer Message</div>
             <h2 style="margin:0; font-size:2rem; font-weight:900;">${inquiry.subject}</h2>
          </div>
          <div style="display:flex; gap:20px; margin-bottom:30px; align-items:center;">
             <div style="width:50px; height:50px; border-radius:50%; background:var(--primary-color); display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:1.2rem;">${inquiry.name[0]}</div>
             <div>
                <div style="font-weight:700;">${inquiry.name}</div>
                <div style="color:var(--admin-text-muted);">${inquiry.email}</div>
             </div>
          </div>
          <div style="background:var(--admin-bg); padding:30px; border-radius:15px; border:1px solid var(--admin-border); margin-bottom:30px; font-size:1.1rem; line-height:1.8; max-height:300px; overflow-y:auto;">
             ${inquiry.message || 'No message content available.'}
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap: wrap; gap: 20px;">
             <div style="color:var(--admin-text-muted); font-size:0.9rem;">Received on ${inquiry.date}</div>
             <div style="display:flex; gap:12px; flex-wrap: wrap;">
                <button id="cancelModalBtn" style="padding:10px 20px; background:var(--admin-bg); border:1px solid var(--admin-border); color:white; border-radius:8px; cursor:pointer; font-weight:600;">Close</button>
                
                <div style="display:flex; gap:8px; background:rgba(255,255,255,0.05); padding:5px; border-radius:10px; border:1px solid var(--admin-border);">
                   <button id="copyEmailBtn" title="Copy Email" style="padding:8px; background:none; border:none; color:var(--admin-text-muted); cursor:pointer;">${Search}</button>
                   <a href="https://mail.google.com/mail/?view=cm&fs=1&to=${inquiry.email}&su=Re: ${encodeURIComponent(inquiry.subject)}&body=Hello ${encodeURIComponent(inquiry.name)},%0D%0A%0D%0A" target="_blank" title="Reply via Gmail" style="padding:8px; background:none; border:none; color:#ea4335; cursor:pointer; display:flex;">
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h9"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><path d="M18 15v6"/><path d="M15 18h6"/></svg>
                   </a>
                   <a href="mailto:${inquiry.email}?subject=Re: ${encodeURIComponent(inquiry.subject)}" class="btn-primary" style="text-decoration:none; display:inline-flex; align-items:center; gap:8px; padding:8px 15px; font-size:0.9rem;">
                     ${Mail} Default Mail App
                   </a>
                </div>
             </div>
          </div>
        </div>
      </div>
    `;
    
    // Copy Logic
    portal.querySelector('#copyEmailBtn').onclick = () => {
      navigator.clipboard.writeText(inquiry.email).then(() => {
        const btn = portal.querySelector('#copyEmailBtn');
        const oldHtml = btn.innerHTML;
        btn.innerHTML = '<span style="color:#22c55e; font-size:0.7rem; font-weight:bold;">COPIED!</span>';
        setTimeout(() => btn.innerHTML = oldHtml, 2000);
      });
    };

    portal.querySelector('#closeInqModal').onclick = () => portal.innerHTML = '';
    portal.querySelector('#cancelModalBtn').onclick = () => portal.innerHTML = '';
  };

  const toggleStatus = async (id) => {
    const res = await fetch(`http://localhost:8080/api/inquiries/${id}/status`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` }
    });
    if (res.ok) loadData();
  };

  const loadData = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/inquiries', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` }
      });
      if (res.ok) {
        inquiries = await res.json();
        renderTable();
      }
    } catch (err) { console.error(err); }
  };

  loadData();
  renderContainer();
  return renderAdminLayout(content, 'admin-inquiries');
}
