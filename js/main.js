/* ============================================================
   Buana Studios — core.js  (shared across all pages)
   ============================================================ */

/* ── Google Sheets webhook — update this if you redeploy ──── */
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbx15rOkY_ar3uWpUuEvSXcpmOTzouSHQaUwoq7VHyu43bDfEb4WpHcDnW9ovGPfJGPE/exec';

/* ---------- Language Toggle -------------------------------- */
function initLang() {
  const saved = localStorage.getItem('buana-lang') || 'en';
  applyLang(saved);
}

function applyLang(lang) {
  document.body.setAttribute('data-lang', lang);
  localStorage.setItem('buana-lang', lang);
  document.querySelectorAll('#btn-en').forEach(el => el.classList.toggle('active', lang === 'en'));
  document.querySelectorAll('#btn-id').forEach(el => el.classList.toggle('active', lang === 'id'));
}

function toggleLang() {
  const current = localStorage.getItem('buana-lang') || 'en';
  applyLang(current === 'en' ? 'id' : 'en');
}

/* ---------- Scroll Reveal ---------------------------------- */
function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ---------- Navbar scroll state ---------------------------- */
function initNavbar() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  const update = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ---------- Active tab highlight --------------------------- */
function initBottomTab() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.tab-item').forEach(tab => {
    const href = tab.getAttribute('href') || '';
    const target = href.split('/').pop();
    const isActive =
      (target === page) ||
      (page === '' && target === 'index.html') ||
      // products tab also active for sub-service pages
      (['learning.html', 'practice.html', 'systems.html', 'essentials.html'].includes(page) && target === 'products.html');
    tab.classList.toggle('active', isActive);
  });
}

/* ---------- Hero tagline cycler (index only) --------------- */
function initTaglineCycle() {
  const el = document.getElementById('tagline-cycle');
  if (!el) return;
  const phrases = el.dataset.phrases ? JSON.parse(el.dataset.phrases) : [];
  if (!phrases.length) return;
  let i = 0;
  el.textContent = phrases[0];
  setInterval(() => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(8px)';
    setTimeout(() => {
      i = (i + 1) % phrases.length;
      el.textContent = phrases[i];
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 350);
  }, 2800);
  el.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
}

/* ---------- Contact form → Google Sheets ------------------- */
function initContactForm() {
  const form = document.getElementById('inquiry-form');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const success = document.getElementById('form-success');
    // SHEET_URL is defined at the top of this file

    btn.disabled = true;
    btn.innerHTML = '<span class="en">Sending…</span><span class="id">Mengirim…</span>';

    const name = form.querySelector('#f-name')?.value.trim() || '';
    const email = form.querySelector('#f-email')?.value.trim() || '';
    const service = form.querySelector('#f-service')?.value || '';
    const message = form.querySelector('#f-message')?.value.trim() || '';

    // Show captured values immediately so you can verify what JS read
    if (success) {
      success.style.display = 'block';
      success.innerHTML = `
        <p style="font-size:1.1rem;margin-bottom:0.75rem;">📋 Values captured:</p>
        <table style="font-size:0.85rem;text-align:left;width:100%;border-collapse:collapse;">
          <tr><td style="padding:3px 12px 3px 0;opacity:.6;">Name</td>    <td><strong>${name || '⚠ empty'}</strong></td></tr>
          <tr><td style="padding:3px 12px 3px 0;opacity:.6;">Email</td>   <td><strong>${email || '⚠ empty'}</strong></td></tr>
          <tr><td style="padding:3px 12px 3px 0;opacity:.6;">Service</td> <td><strong>${service || '⚠ empty'}</strong></td></tr>
          <tr><td style="padding:3px 12px 3px 0;opacity:.6;">Message</td> <td><strong>${message || '⚠ empty'}</strong></td></tr>
        </table>`;
    }

    if (!service) {
      btn.disabled = false;
      btn.innerHTML = '<span class="en">Submit Inquiry</span><span class="id">Kirim Pertanyaan</span>';
      if (success) success.innerHTML += '<p style="color:#e05555;margin-top:0.75rem;">⚠ Service is empty — not sent.</p>';
      return;
    }

    try {
      const qs = new URLSearchParams({
        name, email, service, message,
        timestamp: new Date().toISOString()
      }).toString();
      await fetch(SHEET_URL + '?' + qs, { method: 'GET', mode: 'no-cors' });
      if (success) success.innerHTML += '<p style="color:#4caf50;margin-top:0.75rem;">✓ Sent to Google Sheets.</p>';
      form.style.display = 'none';
    } catch (err) {
      btn.disabled = false;
      btn.innerHTML = '<span class="en">Submit Inquiry</span><span class="id">Kirim Pertanyaan</span>';
      if (success) success.innerHTML += `<p style="color:#e05555;margin-top:0.75rem;">✗ Error: ${err}</p>`;
    }
  });
}

/* ---------- Boot ------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initLang();
  initReveal();
  initNavbar();
  initBottomTab();
  initTaglineCycle();
  initContactForm();
});
