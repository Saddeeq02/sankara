import './styles/app.css';
import './styles/admin.css';
import { renderHomeScreen } from './screens/Home';
import { renderAboutScreen } from './screens/About';
import { renderProductsScreen } from './screens/Products';
import { renderContactScreen } from './screens/Contact';
import { renderServicesScreen } from './screens/Services';
import { renderGalleryScreen } from './screens/Gallery';
import { renderActivitiesScreen } from './screens/Activities';
import { renderVerifyScreen } from './screens/Verify';

// Admin Screens
import { renderAdminDashboard } from './screens/admin/Dashboard';
import { renderAdminProducts } from './screens/admin/ManageProducts';
import { renderAdminContent } from './screens/admin/ManageContent';
import { renderAdminInquiries } from './screens/admin/ManageInquiries';
import { renderAdminUsers } from './screens/admin/ManageUsers';
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
  about: renderAboutScreen,
  products: renderProductsScreen,
  contact: renderContactScreen,
  services: renderServicesScreen,
  gallery: renderGalleryScreen,
  activities: renderActivitiesScreen,
  verify: renderVerifyScreen,
  'admin-login': renderLogin,
  'admin-dashboard': renderAdminDashboard,
  'admin-products': renderAdminProducts,
  'admin-content': renderAdminContent,
  'admin-inquiries': renderAdminInquiries,
  'admin-users': renderAdminUsers,
};

const metaData = {
  home: { title: 'Home | Sankara Nigeria Limited', desc: 'Premium agricultural machinery, tractors, and mechanization solutions.' },
  about: { title: 'About Us | Sankara Nigeria Limited', desc: 'Powering Nigeria\'s modern farming with premium agricultural machinery since 1986.' },
  products: { title: 'Our Equipment-Line | Sankara', desc: 'Browse our high-performance Massey Ferguson tractors and farm implements.' },
  contact: { title: 'Get in Touch | Sankara Nigeria Limited', desc: 'Contact our sales and support teams for machinery inquiries and partnerships.' },
  services: { title: 'Professional Services | Sankara', desc: 'Training, maintenance, and technical support for large-scale agricultural projects.' },
  gallery: { title: 'Media Gallery | Sankara Nigeria Limited', desc: 'Visual journey of our exhibitions, workshops, and regional field visits.' },
  activities: { title: 'Corporate Activities | Sankara', desc: 'Tracking our impactful agricultural workshops and government partnerships.' },
  verify: { title: 'Staff ID Verification | Sankara Nigeria Limited', desc: 'Official QR verification portal for Sankara Nigeria Limited staff ID cards.' },
  'admin-login': { title: 'Admin Access | Sankara', desc: 'Secure login for Sankara Nigeria Limited management system.' },
  'admin-users': { title: 'Admin Users | Sankara', desc: 'Manage system administrators and permissions.' },
};

const routeToPath = {
  home: '/home',
  about: '/about',
  products: '/product',
  services: '/service',
  contact: '/contact',
  gallery: '/gallery',
  activities: '/activities',
  verify: '/verify',
  'admin-login': '/admin/login',
  'admin-dashboard': '/admin',
  'admin-products': '/admin/products',
  'admin-content': '/admin/content',
  'admin-inquiries': '/admin/inquiries',
  'admin-users': '/admin/users'
};

const pathToRoute = {
  '/': 'home',
  '/home': 'home',
  '/about': 'about',
  '/product': 'products',
  '/products': 'products',
  '/service': 'services',
  '/services': 'services',
  '/contact': 'contact',
  '/gallery': 'gallery',
  '/activities': 'activities',
  '/verify': 'verify',
  '/admin': 'admin-dashboard',
  '/admin/login': 'admin-login',
  '/admin/products': 'admin-products',
  '/admin/content': 'admin-content',
  '/admin/inquiries': 'admin-inquiries',
  '/admin/users': 'admin-users'
};

function updateMeta(routeName) {
  const meta = metaData[routeName] || { title: 'Sankara Nigeria Limited', desc: 'Premium Machinery & Mechanization Solutions.' };
  document.title = meta.title;
  const descTag = document.querySelector('meta[name="description"]');
  if (descTag) descTag.setAttribute('content', meta.desc);
}

window.navigate = function(routeName, pushState = true) {
  if (!appRoot) return;

  const originalRoute = routeName;

  // Auth Guard
  const token = localStorage.getItem('admin_token');
  if (routeName.startsWith('admin-')) {
    if (routeName === 'admin-login' && token) {
      routeName = 'admin-dashboard';
    } else if (routeName !== 'admin-login' && !token) {
      routeName = 'admin-login';
    }

    // Permission check if logged in
    if (token && routeName !== 'admin-login') {
      const permissions = JSON.parse(localStorage.getItem('admin_permissions') || 'null');
      if (permissions !== null) {
        if (!permissions.includes(routeName)) {
          if (permissions.length > 0) {
            routeName = permissions[0];
          } else {
            localStorage.removeItem('admin_token');
            routeName = 'admin-login';
          }
        }
      }
    }
  }

  updateMeta(routeName);
  
  if (!routeName.startsWith('admin-')) {
    document.body.classList.remove('admin-mode');
  }

  const urlPath = routeToPath[routeName] || '/home';
  const targetUrl = routeName === 'verify' ? `${urlPath}${window.location.search}` : urlPath;

  // Render the screen if it's new, OR if we are showing home on the root URL
  const screenPathChanged = window.location.pathname !== urlPath;
  const isTargetHomeOnRoot = routeName === 'home' && (window.location.pathname === '/' || window.location.pathname === '/home');
  const isVerifyRoute = routeName === 'verify';
  
  if (screenPathChanged || isTargetHomeOnRoot || isVerifyRoute || appRoot.children.length === 0) {
    appRoot.innerHTML = '';
    const screenRenderer = routes[routeName] || renderHomeScreen;
    appRoot.appendChild(screenRenderer());
  }

  // Update history state
  if (pushState) {
    window.history.pushState({ route: routeName }, '', targetUrl);
  } else if (originalRoute !== routeName) {
    window.history.replaceState({ route: routeName }, '', targetUrl);
  }

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

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

function hasVerifyQueryParam() {
  const params = new URLSearchParams(window.location.search);
  return Boolean((params.get('id') || '').trim());
}

// Initial Navigation
window.addEventListener('popstate', (e) => {
  const path = window.location.pathname;
  if (hasVerifyQueryParam() && (path === '/' || path === '/home' || path === '/verify')) {
    window.navigate('verify', false);
    return;
  }
  const route = pathToRoute[path] || 'home';
  window.navigate(route, false);
});

// Start the app (Parse initial URL) - Robust for Production
const initialPath = window.location.pathname;
const initialHasVerifyId = hasVerifyQueryParam();
let initialRoute = pathToRoute[initialPath] || 'home';

if (initialHasVerifyId && (initialPath === '/' || initialPath === '/home' || initialPath === '/verify')) {
  initialRoute = 'verify';
  if (initialPath !== '/verify') {
    window.history.replaceState({ route: 'verify' }, '', `/verify${window.location.search}`);
  }
  window.navigate('verify', false);
} else if (initialPath === '/') {
  window.navigate('home', true);
} else {
  window.navigate(initialRoute, false);
}

// Dismiss the Splash Screen after initial load
const splash = document.getElementById('splash-screen');
if (splash) {
  if (initialRoute === 'verify') {
    splash.remove();
  } else {
    setTimeout(() => {
      splash.classList.add('fade-out');
      setTimeout(() => splash.remove(), 600);
    }, 1000); // 1.0s delay for high-end aesthetic transition
  }
}


