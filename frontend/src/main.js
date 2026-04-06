import './styles/app.css';
import './styles/admin.css';
import { renderHomeScreen } from './screens/Home';
import { renderProductsScreen } from './screens/Products';
import { renderContactScreen } from './screens/Contact';
import { renderServicesScreen } from './screens/Services';
import { renderGalleryScreen } from './screens/Gallery';
import { renderActivitiesScreen } from './screens/Activities';
import { renderPortfolioScreen } from './screens/Portfolio';

// Admin Screens
import { renderAdminDashboard } from './screens/admin/Dashboard';
import { renderAdminProducts } from './screens/admin/ManageProducts';
import { renderAdminContent } from './screens/admin/ManageContent';
import { renderAdminInquiries } from './screens/admin/ManageInquiries';
import { renderAdminHealth } from './screens/admin/Health';
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
  services: renderServicesScreen,
  gallery: renderGalleryScreen,
  activities: renderActivitiesScreen,
  portfolio: renderPortfolioScreen,
  'admin-login': renderLogin,
  'admin-dashboard': renderAdminDashboard,
  'admin-products': renderAdminProducts,
  'admin-content': renderAdminContent,
  'admin-inquiries': renderAdminInquiries,
  'admin-health': renderAdminHealth,
};

const metaData = {
  home: { title: 'Home | Sankara Nigeria Limited', desc: 'Premium agricultural machinery, tractors, and mechanization solutions.' },
  products: { title: 'Our Equipment-Line | Sankara', desc: 'Browse our high-performance Massey Ferguson tractors and farm implements.' },
  contact: { title: 'Get in Touch | Sankara Nigeria Limited', desc: 'Contact our sales and support teams for machinery inquiries and partnerships.' },
  services: { title: 'Professional Services | Sankara', desc: 'Training, maintenance, and technical support for large-scale agricultural projects.' },
  gallery: { title: 'Media Gallery | Sankara Nigeria Limited', desc: 'Visual journey of our exhibitions, workshops, and regional field visits.' },
  activities: { title: 'Corporate Activities | Sankara', desc: 'Tracking our impactful agricultural workshops and government partnerships.' },
  portfolio: { title: 'Project Portfolio | Sankara Nigeria Limited', desc: 'Case studies of large-scale mechanization projects across Nigeria.' },
  'admin-login': { title: 'Admin Access | Sankara', desc: 'Secure login for Sankara Nigeria Limited management system.' },
};

function updateMeta(routeName) {
  const meta = metaData[routeName] || { title: 'Sankara Nigeria Limited', desc: 'Premium Machinery & Mechanization Solutions.' };
  document.title = meta.title;
  const descTag = document.querySelector('meta[name="description"]');
  if (descTag) descTag.setAttribute('content', meta.desc);
}

window.navigate = function(routeName) {
  if (!appRoot) return;
  
  updateMeta(routeName);
  
  // Special Handling for 'About' (Scroll to section on Home)
  if (routeName === 'about') {
    const isHome = window.location.pathname === '/' || window.location.pathname === '/home';
    
    if (isHome) {
      const el = document.getElementById('about');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState({ route: 'home' }, '', '/#about');
        return;
      }
    }
    // If not on home, or section missing, navigate to home then scroll
    routeName = 'home';
    window.location.hash = 'about';
  }

  // Special Handling for 'Home' (Clear hash and scroll to top)
  if (routeName === 'home') {
    if (window.location.hash) {
      window.history.pushState({ route: 'home' }, '', '/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

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
  
  // Only push state if path changed OR we are clearing a hash for home
  if (window.location.pathname !== urlPath || (routeName === 'home' && window.location.hash)) {
    window.history.pushState({ route: routeName }, '', urlPath);
  }

  // If we are already on home and route is home, we just did the scroll/hash clear above
  // but we still want to make sure the content is correct if it was a real navigation
  if (routeName !== 'home' || appRoot.innerHTML === '' || window.location.pathname !== urlPath) {
    appRoot.innerHTML = '';
    const screenRenderer = routes[routeName] || renderHomeScreen;
    appRoot.appendChild(screenRenderer());
  }

  // Handle post-render scroll if hash exists
  if (window.location.hash === '#about') {
    setTimeout(() => {
      const el = document.getElementById('about');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  }

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
  initialRoute = path.substring(1).split('#')[0];
}
navigate(initialRoute);
