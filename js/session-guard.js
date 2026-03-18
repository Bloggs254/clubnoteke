/**
 * CLUBnoteKE Session Guard
 * ─────────────────────────────────────────────────────────────
 * HOW IT WORKS
 *  • On login, a session token is stored with a 7-day expiry.
 *  • Every page that includes this script checks the session on load.
 *  • User interactions reset an idle timer. After 25 min of idle a
 *    warning modal appears. After 30 min the user is logged out.
 *
 * USAGE (add to every PROTECTED page, before </body>):
 *   <script src="js/session-guard.js"></script>
 *
 * PUBLIC pages (gallery, index, about, etc.) omit this file.
 * ─────────────────────────────────────────────────────────────
 */

(function () {
  /* ── Config ─────────────────────────────────────── */
  const SESSION_KEY    = 'clubnote_session';
  const LOGIN_PAGE     = 'index.html';
  const IDLE_WARN_MS   = 25 * 60 * 1000;   // 25 minutes
  const IDLE_LOGOUT_MS = 30 * 60 * 1000;   // 30 minutes
  const WARNING_COUNTDOWN = 5 * 60;        // seconds in the warning modal

  /* ── Helpers ─────────────────────────────────────── */
  function getSession() {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY)); }
    catch { return null; }
  }

  function clearSession() {
    localStorage.removeItem(SESSION_KEY);
  }

  function logout(reason) {
    clearSession();
    const url = LOGIN_PAGE + (reason ? '?reason=' + reason : '');
    window.location.href = url;
  }

  /* ── 1. Validate session on page load ───────────── */
  const session = getSession();
  if (!session || !session.token || Date.now() > session.expiry) {
    logout('expired');
    // Stop all further execution on this page
    throw new Error('[CLUBnoteKE] Session invalid — redirecting to login.');
  }

  /* ── 2. Refresh last-active timestamp ───────────── */
  function touchSession() {
    const s = getSession();
    if (s) {
      s.lastActive = Date.now();
      localStorage.setItem(SESSION_KEY, JSON.stringify(s));
    }
  }

  /* ── 3. Build the idle-warning modal ────────────── */
  function buildWarningModal() {
    const existing = document.getElementById('_sessionWarningModal');
    if (existing) return; // already injected

    const modal = document.createElement('div');
    modal.id = '_sessionWarningModal';
    modal.innerHTML = `
      <div style="
        position:fixed; inset:0; background:rgba(0,0,0,0.75);
        z-index:99999; display:flex; align-items:center; justify-content:center;
        backdrop-filter:blur(6px); font-family:'Inter',sans-serif;">
        <div style="
          background:#fff; border-radius:20px; padding:2.5rem;
          max-width:420px; width:90%; text-align:center;
          box-shadow:0 30px 80px rgba(0,0,0,0.4);
          animation: _swSlide 0.3s ease;">
          <div style="font-size:3rem; margin-bottom:1rem;">⏱️</div>
          <h2 style="font-family:'Outfit',sans-serif; font-size:1.5rem; color:#111; margin-bottom:0.5rem;">
            Still there?
          </h2>
          <p style="color:#6B7280; font-size:0.95rem; margin-bottom:1.5rem;">
            You'll be signed out in <strong id="_swCountdown" style="color:#C3002F;"></strong> due to inactivity.
          </p>
          <div style="display:flex; gap:1rem; justify-content:center;">
            <button id="_swStay" style="
              background:#C3002F; color:#fff; border:none; border-radius:10px;
              padding:0.8rem 2rem; font-size:1rem; font-weight:600; cursor:pointer;
              font-family:'Inter',sans-serif; transition:opacity 0.2s;"
              onmouseenter="this.style.opacity=0.85" onmouseleave="this.style.opacity=1">
              Stay Logged In
            </button>
            <button id="_swLogout" style="
              background:none; color:#6B7280; border:1px solid #E5E7EB; border-radius:10px;
              padding:0.8rem 2rem; font-size:1rem; font-weight:500; cursor:pointer;
              font-family:'Inter',sans-serif; transition:opacity 0.2s;"
              onmouseenter="this.style.opacity=0.7" onmouseleave="this.style.opacity=1">
              Sign Out
            </button>
          </div>
        </div>
      </div>
      <style>
        @keyframes _swSlide {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
      </style>
    `;
    document.body.appendChild(modal);

    // Countdown timer in modal
    let secsLeft = WARNING_COUNTDOWN;
    const countdownEl = document.getElementById('_swCountdown');

    function fmt(s) {
      const m = Math.floor(s / 60), sec = s % 60;
      return m > 0 ? `${m}m ${sec}s` : `${sec}s`;
    }

    countdownEl.textContent = fmt(secsLeft);
    const countdownInterval = setInterval(() => {
      secsLeft--;
      if (countdownEl) countdownEl.textContent = fmt(secsLeft);
      if (secsLeft <= 0) {
        clearInterval(countdownInterval);
        logout('idle');
      }
    }, 1000);

    // "Stay" button
    document.getElementById('_swStay').addEventListener('click', () => {
      clearInterval(countdownInterval);
      modal.remove();
      touchSession();
      resetIdleTimer();
    });

    // "Sign Out" button
    document.getElementById('_swLogout').addEventListener('click', () => {
      clearInterval(countdownInterval);
      logout('manual');
    });
  }

  /* ── 4. Idle timer logic ─────────────────────────── */
  let idleWarnTimer   = null;
  let idleLogoutTimer = null;

  function resetIdleTimer() {
    clearTimeout(idleWarnTimer);
    clearTimeout(idleLogoutTimer);

    idleWarnTimer = setTimeout(() => {
      buildWarningModal();
    }, IDLE_WARN_MS);

    idleLogoutTimer = setTimeout(() => {
      logout('idle');
    }, IDLE_LOGOUT_MS);
  }

  // User activity events that reset the idle clock
  const ACTIVITY_EVENTS = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
  ACTIVITY_EVENTS.forEach(ev => {
    window.addEventListener(ev, () => {
      touchSession();
      // Only reset if warning modal isn't open
      if (!document.getElementById('_sessionWarningModal')) {
        resetIdleTimer();
      }
    }, { passive: true });
  });

  // Start the timers
  resetIdleTimer();

  /* ── 5. Expose a global logout helper ───────────── */
  window.clubnoteLogout = function () { logout('manual'); };

})();
