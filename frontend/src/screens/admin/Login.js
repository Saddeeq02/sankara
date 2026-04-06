export function renderLogin() {
  const container = document.createElement('div');
  container.className = 'admin-login-v2';
  container.style.minHeight = '100vh';
  container.style.display = 'flex';
  container.style.alignItems = 'center';
  container.style.justifyContent = 'center';
  container.style.position = 'relative';
  container.style.overflow = 'hidden';
  container.style.background = 'var(--background-color)';
  
  // Dynamic Background Elements
  const bgGlow = document.createElement('div');
  bgGlow.style.cssText = `
    position: absolute; width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(0, 21, 91, 0.1) 0%, transparent 70%);
    top: -200px; right: -200px; border-radius: 50%; z-index: 1; pointer-events: none;
  `;
  const bgGlow2 = document.createElement('div');
  bgGlow2.style.cssText = `
    position: absolute; width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%);
    bottom: -200px; left: -200px; border-radius: 50%; z-index: 1; pointer-events: none;
  `;
  container.appendChild(bgGlow);
  container.appendChild(bgGlow2);

  const loginCard = document.createElement('div');
  loginCard.className = 'reveal premium-glass-card';
  loginCard.style.padding = '60px 45px';
  loginCard.style.borderRadius = '32px';
  loginCard.style.width = '100%';
  loginCard.style.maxWidth = '480px';
  loginCard.style.textAlign = 'center';
  loginCard.style.zIndex = '5';
  loginCard.style.animation = 'fadeInUp 0.8s forwards';

  loginCard.innerHTML = `
    <div style="margin-bottom: 40px; transform: scale(1.1);">
      <img src="/assets/logo.png" alt="Sankara Logo" style="height: 60px; object-fit: contain;">
    </div>
    <h2 style="color: var(--primary-color); font-size: 2.2rem; font-weight: 900; margin-bottom: 12px; line-height: 1.1;">Admin Portal</h2>
    <p style="color: var(--text-muted); font-size: 1rem; margin-bottom: 40px; line-height: 1.6;">Precision machinery and management. Access your control hub with Sankara Nigeria Limited.</p>
    
    <form id="adminLoginForm" style="display: flex; flex-direction: column; gap: 24px; text-align: left;">
      <div id="loginError" style="background: rgba(239, 68, 68, 0.1); border-radius: 12px; padding: 12px; color: #ef4444; font-size: 0.9rem; text-align: center; border: 1px solid rgba(239, 68, 68, 0.2); display: none; margin-bottom: 10px;">
        Authentication failed. Please verify credentials.
      </div>
      
      <div class="input-group-v2">
        <label style="display: block; font-size: 0.85rem; font-weight: 800; color: var(--primary-color); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; margin-left: 5px;">Secure Identifier</label>
        <input type="email" id="email" required value="admin@sankara.com" 
          style="width: 100%; padding: 15px 20px; border-radius: 16px; border: 1px solid var(--glass-border); background: var(--background-color); color: var(--text-main); font-size: 1rem; outline: none; transition: all 0.3s;"
          class="login-field">
      </div>
      
      <div class="input-group-v2">
        <label style="display: block; font-size: 0.85rem; font-weight: 800; color: var(--primary-color); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; margin-left: 5px;">Access Key</label>
        <input type="password" id="password" required value="sankara2026"
          style="width: 100%; padding: 15px 20px; border-radius: 16px; border: 1px solid var(--glass-border); background: var(--background-color); color: var(--text-main); font-size: 1rem; outline: none; transition: all 0.3s;"
          class="login-field">
      </div>
      
      <button type="submit" class="btn-primary" style="margin-top: 15px; width: 100%; padding: 18px; font-weight: 800; font-size: 1.05rem; border-radius: 16px; transition: all 0.3s; position: relative; overflow: hidden;" id="loginSubmitBtn">
        <span class="btn-text">INITIALIZE ACCESS</span>
      </button>
    </form>
    
    <div style="margin-top: 40px; color: var(--text-muted); font-size: 0.85rem; font-weight: 600; opacity: 0.7;">
      &copy; 2026 SANKARA NIGERIA LIMITED.
    </div>
  `;

  // Component styles
  const styleTag = document.createElement('style');
  styleTag.innerHTML = `
    .login-field:focus {
      border-color: var(--primary-color) !important;
      background: var(--surface-color) !important;
      box-shadow: 0 0 15px rgba(0, 21, 91, 0.05);
      transform: scale(1.01);
    }
    #loginSubmitBtn::after {
      content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
      background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%);
      transition: all 0.5s; opacity: 0; pointer-events: none;
    }
    #loginSubmitBtn:hover::after { opacity: 1; transform: scale(1.2); }
  `;
  document.head.appendChild(styleTag);

  const form = loginCard.querySelector('#adminLoginForm');
  const errorMsg = loginCard.querySelector('#loginError');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = form.querySelector('#email').value;
    const password = form.querySelector('#password').value;
    
    const submitBtn = form.querySelector('#loginSubmitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    btnText.textContent = 'VALIDATING...';
    submitBtn.style.opacity = '0.7';
    submitBtn.disabled = true;

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('admin_token', data.api_token);
        window.navigate('admin-dashboard');
      } else {
        errorMsg.style.display = 'block';
        btnText.textContent = 'INITIALIZE ACCESS';
        submitBtn.style.opacity = '1';
        submitBtn.disabled = false;
      }
    } catch (err) {
      console.error(err);
      errorMsg.textContent = 'System offline. Check connectivity.';
      errorMsg.style.display = 'block';
      btnText.textContent = 'INITIALIZE ACCESS';
      submitBtn.style.opacity = '1';
      submitBtn.disabled = false;
    }
  });

  container.appendChild(loginCard);
  return container;
}
