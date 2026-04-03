import './styles/app.css';
import './styles/admin.css';
import { renderHomeScreen } from './screens/Home';
import { renderProductsScreen } from './screens/Products';
import { renderContactScreen } from './screens/Contact';
import { renderAboutScreen } from './screens/About';
import { renderServicesScreen } from './screens/Services';
import { renderGalleryScreen } from './screens/Gallery';
import { renderActivitiesScreen } from './screens/Activities';
import { renderPortfolioScreen } from './screens/Portfolio';

// Admin Screens
import { renderAdminDashboard } from './screens/admin/Dashboard';
import { renderAdminProducts } from './screens/admin/ManageProducts';
import { renderAdminContent } from './screens/admin/ManageContent';
import { renderAdminInquiries } from './screens/admin/ManageInquiries';
import { renderLogin } from './screens/admin/Login';

const appRoot = document.querySelector('#app');

window.initAnimations = function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
};

const routes = {
  home: renderHomeScreen,
  products: renderProductsScreen,
  contact: renderContactScreen,
  about: renderAboutScreen,
  services: renderServicesScreen,
  gallery: renderGalleryScreen,
  activities: renderActivitiesScreen,
  portfolio: renderPortfolioScreen,
  'admin-login': renderLogin,
  'admin-dashboard': renderAdminDashboard,
  'admin-products': renderAdminProducts,
  'admin-content': renderAdminContent,
  'admin-inquiries': renderAdminInquiries,
};

window.navigate = function(routeName) {
  if (!appRoot) return;
  
  if (!routeName.startsWith('admin-')) {
    document.body.classList.remove('admin-mode');
  }

  // Auth Guard
  const token = localStorage.getItem('admin_token');
  
  if (routeName.startsWith('admin-')) {
    if (routeName === 'admin-login' && token) {
      routeName = 'admin-dashboard';
    } else if (routeName !== 'admin-login' && !token) {
      routeName = 'admin-login';
    }
  }

  // Push State logic
  let urlPath = `/${routeName === 'home' ? '' : routeName}`;
  if (routeName.startsWith('admin-')) {
    urlPath = `/${routeName.replace('-', '/')}`; // /admin/dashboard
    if (routeName === 'admin-dashboard') urlPath = '/admin';
    if (routeName === 'admin-login') urlPath = '/admin/login';
  }
  
  if (window.location.pathname !== urlPath) {
    window.history.pushState({ route: routeName }, '', urlPath);
  }

  appRoot.innerHTML = '';
  const screenRenderer = routes[routeName] || renderHomeScreen;
  appRoot.appendChild(screenRenderer());

  // Attach event listeners to new navigation links
  document.querySelectorAll('[data-route]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const route = e.target.closest('[data-route]').getAttribute('data-route');
      window.navigate(route);
    });
  });

  // Re-run animation observers if necessary
  if (window.initAnimations) {
    window.initAnimations();
  }
}

// Initial Navigation
window.addEventListener('popstate', (e) => {
  const route = (e.state && e.state.route) || 'home';
  navigate(route);
});

// Start the app (Parse initial URL)
const path = window.location.pathname;
let initialRoute = 'home';
if (path.startsWith('/admin')) {
  initialRoute = path === '/admin' ? 'admin-dashboard' : path.replace('/', '').replace('/', '-');
} else if (path.length > 1) {
  initialRoute = path.substring(1);
}
navigate(initialRoute);
