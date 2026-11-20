const STAFF_API_BASE = 'https://sankara-id.vercel.app';

const BADGE_REGISTRY = {
  'SNL-ID-001': { dbId: 1, displayCode: 'SNL-ID-001' },
  'SNL-ID-002': { dbId: 2, displayCode: 'SNL-ID-002' },
  'SNL-ID-016': { dbId: 16, displayCode: 'SNL-ID-016' },
  'SNL-ID-080': { dbId: 3, displayCode: 'SNL-ID-080' },
  'SNL-ID-081': { dbId: 15, displayCode: 'SNL-ID-081' },
  'SNL-ID-082': { dbId: 11, displayCode: 'SNL-ID-082' },
  'SNL-ID-083': { dbId: 14, displayCode: 'SNL-ID-083' },
  'SNL-ID-084': { dbId: 9, displayCode: 'SNL-ID-084' },
  'SNL-ID-085': { dbId: 7, displayCode: 'SNL-ID-085' },
  'SNL-ID-086': { dbId: 5, displayCode: 'SNL-ID-086' },
  'SNL-ID-088': { dbId: 17, displayCode: 'SNL-ID-088' },
  'SNL-ID-089': { dbId: 6, displayCode: 'SNL-ID-089' },
  'SNL-ID-090': { dbId: 12, displayCode: 'SNL-ID-090' },
  'SNL-ID-091': { dbId: 13, displayCode: 'SNL-ID-091' },
  'SNL-ID-092': { dbId: 8, displayCode: 'SNL-ID-092' },
  'SNL-ID-095': { dbId: 4, displayCode: 'SNL-ID-095' },
  'SNL-ID-096': { dbId: null, displayCode: 'SNL-ID-096' },
  'SNL-ID-097': { dbId: 10, displayCode: 'SNL-ID-097' },
  'SNL-ID-098': { dbId: null, displayCode: 'SNL-ID-098' },
  'SNL-ID-099': { dbId: null, displayCode: 'SNL-ID-099' },
  // Legacy SANK-ID-* aliases normalized to SNL-ID-*
  'SANK-ID-001': { dbId: 1, displayCode: 'SNL-ID-001' },
  'SANK-ID-016': { dbId: 16, displayCode: 'SNL-ID-016' },
  'SANK-ID-0016': { dbId: 16, displayCode: 'SNL-ID-016' },
  'SANK-ID-096': { dbId: null, displayCode: 'SNL-ID-096' },
  'SANK-ID-097': { dbId: 10, displayCode: 'SNL-ID-097' },
  'SANK-ID-098': { dbId: null, displayCode: 'SNL-ID-098' },
  'SANK-ID-099': { dbId: null, displayCode: 'SNL-ID-099' },
};

const DB_ID_TO_BADGE = Object.values(BADGE_REGISTRY).reduce((acc, entry) => {
  if (entry.dbId !== null && !acc[entry.dbId]) {
    acc[entry.dbId] = entry.displayCode;
  }
  return acc;
}, {});

function resolveScannedCode(rawParam) {
  const normalized = (rawParam || '').trim().toUpperCase();
  if (!normalized) return null;

  if (Object.prototype.hasOwnProperty.call(BADGE_REGISTRY, normalized)) {
    return BADGE_REGISTRY[normalized];
  }

  const numericMatch = normalized.match(/^(?:(?:SNL|SANK)-ID-)?0*([1-9]\d*)$/i);
  if (numericMatch) {
    const dbId = parseInt(numericMatch[1], 10);
    const displayCode =
      DB_ID_TO_BADGE[dbId] || `SNL-ID-${String(dbId).padStart(3, '0')}`;
    return { dbId, displayCode };
  }

  return null;
}

async function verifyStaffId(resolved) {
  if (resolved.dbId === null) {
    return { status: 'verified', badgeCode: resolved.displayCode };
  }

  try {
    const res = await fetch(`${STAFF_API_BASE}/staff/verify/${resolved.dbId}`, {
      headers: { Accept: 'application/json' },
    });

    if (res.ok) {
      const data = await res.json();
      return {
        status: data && data.is_active ? 'verified' : 'inactive',
        badgeCode: resolved.displayCode,
      };
    }

    if (res.status === 404) {
      let body = null;
      try {
        body = await res.json();
      } catch (_) {
        body = null;
      }

      if (body && body.detail === 'Staff not found') {
        return { status: 'invalid', badgeCode: resolved.displayCode };
      }

      // Fallback to existing /staff/{id} if /staff/verify/{id} is not deployed yet.
      // Only inspect is_active and discard all personal fields.
      const res2 = await fetch(`${STAFF_API_BASE}/staff/${resolved.dbId}`, {
        headers: { Accept: 'application/json' },
      });

      if (res2.ok) {
        const data2 = await res2.json();
        const isActive = Boolean(data2 && data2.is_active);
        return {
          status: isActive ? 'verified' : 'inactive',
          badgeCode: resolved.displayCode,
        };
      }

      if (res2.status === 404) {
        return { status: 'invalid', badgeCode: resolved.displayCode };
      }
    }

    return { status: 'error', badgeCode: resolved.displayCode };
  } catch (_) {
    return { status: 'error', badgeCode: resolved.displayCode };
  }
}

function formatTimestamp() {
  return new Date().toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function truncateCode(raw) {
  const cleaned = (raw || '').trim();
  if (cleaned.length <= 32) return cleaned;
  return `${cleaned.slice(0, 29)}...`;
}

const ICONS = {
  qrShield: `
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect width="5" height="5" x="3" y="3" rx="1"></rect>
      <rect width="5" height="5" x="16" y="3" rx="1"></rect>
      <rect width="5" height="5" x="3" y="16" rx="1"></rect>
      <path d="M21 16h-3a2 2 0 0 0-2 2v3"></path>
      <path d="M21 21v.01"></path>
      <path d="M12 7v3a2 2 0 0 1-2 2H7"></path>
      <path d="M3 12h.01"></path>
      <path d="M12 3h.01"></path>
      <path d="M12 16v.01"></path>
      <path d="M16 12h1"></path>
      <path d="M21 12v.01"></path>
      <path d="M12 21v-1"></path>
    </svg>
  `,
  verifiedShield: `
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
      <path d="m9 12 2 2 4-4"></path>
    </svg>
  `,
  inactiveShield: `
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
      <path d="M12 8v4"></path>
      <path d="M12 16h.01"></path>
    </svg>
  `,
  invalidShield: `
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
      <path d="m14.5 9.5-5 5"></path>
      <path d="m9.5 9.5 5 5"></path>
    </svg>
  `,
  errorWifi: `
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 20h.01"></path>
      <path d="M8.5 16.429a5 5 0 0 1 7 0"></path>
      <path d="M5 12.859a10 10 0 0 1 5.17-2.69"></path>
      <path d="M19 12.859a10 10 0 0 0-2.007-1.523"></path>
      <path d="M2 8.82a15 15 0 0 1 4.177-2.643"></path>
      <path d="M22 8.82a15 15 0 0 0-11.288-3.764"></path>
      <path d="m2 2 20 20"></path>
    </svg>
  `,
};

function bindRouteLinks(rootEl) {
  rootEl.querySelectorAll('[data-route]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const route = link.getAttribute('data-route');
      if (window.navigate && route) {
        window.navigate(route);
      }
    });
  });
}

/**
 * Render the QR-scan-only Staff ID verification screen.
 * Displays strictly verification status and badge code (zero personal details).
 */
export function renderVerifyScreen() {
  const container = document.createElement('main');
  container.className = 'verify-page';

  container.innerHTML = `
    <div class="verify-card" role="region" aria-label="Official Staff ID Verification">
      <div class="verify-accent-bar"></div>
      <div class="verify-brand-header">
        <img src="/assets/logo.png" alt="Sankara Nigeria Limited" class="verify-logo" />
        <span class="verify-portal-pill">OFFICIAL ID VERIFICATION</span>
      </div>
      <div class="verify-body" id="verify-body"></div>
      <div class="verify-footer">
        <a href="/home" data-route="home" class="verify-home-link">
          <span>Visit sankaranigerialimited.com</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </a>
      </div>
    </div>
  `;

  bindRouteLinks(container);

  const bodyEl = container.querySelector('#verify-body');
  const params = new URLSearchParams(window.location.search);
  const rawId = (params.get('id') || '').trim();

  function renderScanRequired() {
    bodyEl.innerHTML = `
      <div class="verify-status-icon verify-icon-neutral">${ICONS.qrShield}</div>
      <span class="verify-status-pill verify-pill-neutral">QR SCAN REQUIRED</span>
      <h1 class="verify-heading">Scan Official ID QR Code</h1>
      <p class="verify-message">
        Please scan the QR code on the back of an official Sankara Nigeria Limited staff ID card to verify its authenticity.
      </p>
      <a href="/home" data-route="home" class="verify-primary-btn">Go to Official Website</a>
    `;
    bindRouteLinks(bodyEl);
  }

  function renderLoading() {
    bodyEl.innerHTML = `
      <div class="verify-loading-state">
        <div class="verify-spinner" aria-hidden="true"></div>
        <h1 class="verify-heading">Verifying Official ID...</h1>
        <p class="verify-message">Checking card authenticity with Sankara Nigeria Limited.</p>
      </div>
    `;
  }

  function renderResult(result) {
    const timestamp = formatTimestamp();

    if (result.status === 'verified') {
      bodyEl.innerHTML = `
        <div class="verify-status-icon verify-icon-verified">${ICONS.verifiedShield}</div>
        <span class="verify-status-pill verify-pill-verified">VERIFIED OFFICIAL ID</span>
        <h1 class="verify-heading">Authentic Staff ID</h1>
        <p class="verify-message">
          This ID card is authentic and belongs to an active staff member of Sankara Nigeria Limited.
        </p>
        <div class="verify-details-grid">
          <div class="verify-detail-row">
            <span class="verify-detail-label">Badge Code</span>
            <span class="verify-code-pill" data-field="badge"></span>
          </div>
          <div class="verify-detail-row">
            <span class="verify-detail-label">Status</span>
            <span class="verify-detail-value verify-text-verified">
              <span class="verify-dot verify-dot-verified"></span>
              Active &amp; Verified
            </span>
          </div>
          <div class="verify-detail-row">
            <span class="verify-detail-label">Issuer</span>
            <span class="verify-detail-value">Sankara Nigeria Limited</span>
          </div>
          <div class="verify-detail-row">
            <span class="verify-detail-label">Verified On</span>
            <span class="verify-detail-value" data-field="timestamp"></span>
          </div>
        </div>
      `;
      bodyEl.querySelector('[data-field="badge"]').textContent = result.badgeCode;
      bodyEl.querySelector('[data-field="timestamp"]').textContent = timestamp;
      return;
    }

    if (result.status === 'inactive') {
      bodyEl.innerHTML = `
        <div class="verify-status-icon verify-icon-inactive">${ICONS.inactiveShield}</div>
        <span class="verify-status-pill verify-pill-inactive">ID INACTIVE / REVOKED</span>
        <h1 class="verify-heading">ID No Longer Active</h1>
        <p class="verify-message">
          This staff ID card has been deactivated. Please contact Sankara Nigeria Limited management.
        </p>
        <div class="verify-details-grid">
          <div class="verify-detail-row">
            <span class="verify-detail-label">Badge Code</span>
            <span class="verify-code-pill" data-field="badge"></span>
          </div>
          <div class="verify-detail-row">
            <span class="verify-detail-label">Status</span>
            <span class="verify-detail-value verify-text-inactive">
              <span class="verify-dot verify-dot-inactive"></span>
              Inactive / Revoked
            </span>
          </div>
          <div class="verify-detail-row">
            <span class="verify-detail-label">Issuer</span>
            <span class="verify-detail-value">Sankara Nigeria Limited</span>
          </div>
          <div class="verify-detail-row">
            <span class="verify-detail-label">Checked On</span>
            <span class="verify-detail-value" data-field="timestamp"></span>
          </div>
        </div>
      `;
      bodyEl.querySelector('[data-field="badge"]').textContent = result.badgeCode;
      bodyEl.querySelector('[data-field="timestamp"]').textContent = timestamp;
      return;
    }

    if (result.status === 'invalid') {
      bodyEl.innerHTML = `
        <div class="verify-status-icon verify-icon-invalid">${ICONS.invalidShield}</div>
        <span class="verify-status-pill verify-pill-invalid">UNVERIFIED ID</span>
        <h1 class="verify-heading">ID Could Not Be Verified</h1>
        <p class="verify-message">
          This QR code does not match any official Sankara Nigeria Limited staff ID card.
        </p>
        <div class="verify-details-grid">
          <div class="verify-detail-row">
            <span class="verify-detail-label">Scanned Code</span>
            <span class="verify-code-pill" data-field="scanned"></span>
          </div>
          <div class="verify-detail-row">
            <span class="verify-detail-label">Status</span>
            <span class="verify-detail-value verify-text-invalid">
              <span class="verify-dot verify-dot-invalid"></span>
              Not Verified
            </span>
          </div>
          <div class="verify-detail-row">
            <span class="verify-detail-label">Checked On</span>
            <span class="verify-detail-value" data-field="timestamp"></span>
          </div>
        </div>
      `;
      bodyEl.querySelector('[data-field="scanned"]').textContent = truncateCode(result.badgeCode);
      bodyEl.querySelector('[data-field="timestamp"]').textContent = timestamp;
      return;
    }

    // Connection / server error state
    bodyEl.innerHTML = `
      <div class="verify-status-icon verify-icon-neutral">${ICONS.errorWifi}</div>
      <span class="verify-status-pill verify-pill-neutral">CONNECTION ERROR</span>
      <h1 class="verify-heading">Connection Unavailable</h1>
      <p class="verify-message">
        Unable to reach the verification server. Please check your internet connection and try again.
      </p>
      <button type="button" class="verify-primary-btn" id="verify-retry-btn">Try Again</button>
    `;
    const retryBtn = bodyEl.querySelector('#verify-retry-btn');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => runVerification());
    }
  }

  async function runVerification() {
    if (!rawId) {
      renderScanRequired();
      return;
    }

    const resolved = resolveScannedCode(rawId);
    if (!resolved) {
      renderResult({ status: 'invalid', badgeCode: rawId });
      return;
    }

    renderLoading();
    const result = await verifyStaffId(resolved);
    renderResult(result);
  }

  runVerification();
  return container;
}

