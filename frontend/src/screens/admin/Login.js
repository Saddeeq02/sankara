export function renderLogin() {
  const container = document.createElement('div');
  container.className = 'admin-login';
  container.style.minHeight = '100vh';
  container.style.display = 'flex';
  container.style.alignItems = 'center';
  container.style.justifyContent = 'center';
  container.style.backgroundColor = 'var(--background-color)';
  container.style.padding = '20px';

  const loginCard = document.createElement('div');
  loginCard.style.background = 'var(--surface-color)';
  loginCard.style.padding = '50px 40px';
  loginCard.style.borderRadius = '20px';
  loginCard.style.boxShadow = 'var(--card-shadow)';
  loginCard.style.width = '100%';
  loginCard.style.maxWidth = '450px';
  loginCard.style.textAlign = 'center';
  loginCard.style.border = '1px solid var(--glass-border)';

  loginCard.innerHTML = `
    <img src="/src/assets/logo.png" alt="Sankara Logo" style="height: 50px; object-fit: contain; margin-bottom: 30px;">
    <h2 style="color: var(--primary-color); font-size: 1.8rem; font-weight: 700; margin-bottom: 10px;">Admin Portal</h2>
    <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 30px;">Sign in to access your administrative dashboard.</p>
    
    <form id="adminLoginForm" style="display: flex; flex-direction: column; gap: 20px; text-align: left;">
      <div id="loginError" style="color: #ef4444; font-size: 0.9rem; text-align: center; display: none;">Invalid credentials provided.</div>
      
      <div>
        <label style="display: block; font-size: 0.9rem; font-weight: 600; color: var(--text-main); margin-bottom: 8px;">Email Address</label>
        <input type="email" id="email" required value="admin@sankara.com" style="width: 100%; padding: 12px 15px; border-radius: 8px; border: 1px solid var(--glass-border); background: var(--background-color); color: var(--text-main); font-size: 1rem; outline: none; transition: border-color 0.2s;">
      </div>
      
      <div>
        <label style="display: block; font-size: 0.9rem; font-weight: 600; color: var(--text-main); margin-bottom: 8px;">Password</label>
        <input type="password" id="password" required value="sankara2026" style="width: 100%; padding: 12px 15px; border-radius: 8px; border: 1px solid var(--glass-border); background: var(--background-color); color: var(--text-main); font-size: 1rem; outline: none; transition: border-color 0.2s;">
      </div>
      
      <button type="submit" style="margin-top: 10px; width: 100%; padding: 14px; background: var(--primary-color); color: white; border: none; border-radius: 8px; font-weight: 600; font-size: 1rem; cursor: pointer; transition: background 0.2s box-shadow 0.2s;" onmouseover="this.style.filter='brightness(1.1)'" onmouseout="this.style.filter='none'">
        Sign In to Dashboard
      </button>
    </form>
  `;

  const form = loginCard.querySelector('#adminLoginForm');
  const errorMsg = loginCard.querySelector('#loginError');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = form.querySelector('#email').value;
    const password = form.querySelector('#password').value;
    
    const submitBtn = form.querySelector('button');
    submitBtn.textContent = 'Authenticating...';
    submitBtn.style.opacity = '0.7';

    try {
      const response = await fetch('http://localhost:8080/api/login', {
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
        submitBtn.textContent = 'Sign In to Dashboard';
        submitBtn.style.opacity = '1';
      }
    } catch (err) {
      console.error(err);
      errorMsg.textContent = 'Network error identifying server';
      errorMsg.style.display = 'block';
      submitBtn.textContent = 'Sign In to Dashboard';
      submitBtn.style.opacity = '1';
    }
  });

  container.appendChild(loginCard);
  return container;
}
