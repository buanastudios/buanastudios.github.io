/* ============================================================
   Buana Studios — main.js v19.1
   ============================================================ */

/* ── Google Sheets webhook — update this if you redeploy ──── */
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbx15rOkY_ar3uWpUuEvSXcpmOTzouSHQaUwoq7VHyu43bDfEb4WpHcDnW9ovGPfJGPE/exec';

/* ---------- Global observer reference ----------------------- */
let revealObserver;

/* ---------- Product catalogue ------------------------------- */
const PRODUCTS = [
  {
    id: 'pancakaki',
    tagClass: 'tag-active', tagLabel: '●',
    nameEn: 'Pancakaki', nameId: 'Pancakaki',
    descEn: 'A family tree explorer and kinship graph application. Map your entire bloodline, visualise connections with D3, and export as PDF — all offline.',
    descId: 'Aplikasi penjelajah silsilah keluarga dan graf kekerabatan. Petakan seluruh garis keturunan, visualisasikan hubungan dengan D3, dan ekspor sebagai PDF — semuanya offline.',
    badges: ['Offline-First PWA', 'Dexie.js + IndexedDB', 'D3 Graph', 'PDF Export'],
    audienceEn: 'Families, communities, and researchers who want to preserve and understand kinship history digitally.',
    audienceId: 'Keluarga, komunitas, dan peneliti yang ingin melestarikan dan memahami sejarah kekerabatan secara digital.',
    featuresEn: 'Add/edit relatives, visualise bloodlines, pan/zoom graph, export to PDF, backup & restore JSON.',
    featuresId: 'Tambah/edit anggota keluarga, visualisasi garis keturunan, pan/zoom graf, ekspor PDF, backup JSON.',
    btnPrimary: true
  },
  {
    id: 'tibyan',
    tagClass: 'tag-active', tagLabel: '●',
    nameEn: 'T.I.B.Y.A.N.', nameId: 'T.I.B.Y.A.N.',
    descEn: 'A full foundation management system covering personnel, student registry, finance, and administration — tailored for Islamic schools and foundations.',
    descId: 'Sistem manajemen yayasan lengkap yang mencakup kepegawaian, registrasi siswa, keuangan, dan administrasi — dirancang khusus untuk sekolah dan yayasan Islam.',
    badges: ['Vue.js', 'Dexie.js + IndexedDB', 'Personnel Hub', 'Finance Module', 'Education Module'],
    audienceEn: 'Islamic schools, pesantren, and foundations needing an affordable, offline-first ERP system.',
    audienceId: 'Sekolah Islam, pesantren, dan yayasan yang membutuhkan sistem ERP terjangkau dan offline-first.',
    featuresEn: 'HR & Personnel, Student Registry, Finance Ledger, Asset Tracking, Revenue Pledges, Education Cycles.',
    featuresId: 'SDM & Kepegawaian, Registrasi Siswa, Buku Kas, Pelacakan Aset, Janji Donasi, Siklus Pendidikan.',
    extraEn: 'White-label tenant configuration for custom branding and institutional identity.',
    extraId: 'Konfigurasi tenant white-label untuk branding kustom dan identitas institusi.',
    extraTitleEn: 'White-Label Ready', extraTitleId: 'Siap White-Label',
    btnPrimary: true
  },
  {
    id: 'tadbiir',
    tagClass: 'tag-prototype', tagLabel: '◐',
    nameEn: 'Tadbiir', nameId: 'Tadbiir',
    descEn: 'A Syariah-inspired personal finance interface. Clean, disciplined money management designed around Islamic financial principles.',
    descId: 'Antarmuka keuangan pribadi berbasis syariah. Manajemen keuangan bersih dan disiplin yang dirancang berdasarkan prinsip keuangan Islam.',
    badges: ['Tailwind CSS', 'Alpine.js', 'Syariah-Compliant UI', 'Mobile-First'],
    audienceEn: 'Individuals and families wanting a clean, halal-aware financial tracking tool.',
    audienceId: 'Individu dan keluarga yang menginginkan alat pelacak keuangan yang bersih dan halal-aware.',
    statusEn: 'UI prototype complete. Backend integration and real data layer in planning.',
    statusId: 'Prototipe UI selesai. Integrasi backend dan lapisan data nyata dalam perencanaan.',
    btnPrimary: false
  },
  {
    id: 'hiring-platform',
    tagClass: 'tag-dev', tagLabel: '⟳',
    nameEn: 'Hiring Platform', nameId: 'Platform Rekrutmen',
    descEn: 'An end-to-end recruitment workflow for schools and growing institutions. From job posting to onboarding.',
    descId: 'Alur rekrutmen ujung ke ujung untuk sekolah dan institusi yang berkembang. Dari posting lowongan hingga orientasi karyawan.',
    badges: ['React + Vite', 'Role-Based Access', 'Application Tracking', 'HR Workflow'],
    audienceEn: 'Schools, foundations, and SMEs that need a structured, auditable hiring process.',
    audienceId: 'Sekolah, yayasan, dan UKM yang membutuhkan proses rekrutmen terstruktur dan dapat diaudit.',
    featuresEn: 'Job posting, applicant tracking, interview scheduling, evaluation scoring, onboarding checklists.',
    featuresId: 'Posting lowongan, pelacakan pelamar, penjadwalan wawancara, penilaian evaluasi, checklist orientasi.',
    btnPrimary: false
  },
  {
    id: 'spreadsheet-dashboard',
    tagClass: 'tag-dev', tagLabel: '⟳',
    nameEn: 'Spreadsheet-to-Dashboard', nameId: 'Lembar-ke-Dasbor',
    descEn: 'Transform chaotic spreadsheets into clear, actionable dashboards. Connect your Excel or Google Sheets data and get instant visual insights — no database required.',
    descId: 'Ubah lembar sebar yang berantakan menjadi dasbor yang jelas dan dapat ditindaklanjuti. Sambungkan data Excel atau Google Sheets Anda dan dapatkan wawasan visual instan — tidak perlu database.',
    badges: ['React + Vite', 'Sheet Integration', 'Live Visualisation', 'Zero-Setup'],
    audienceEn: 'Any organisation running operations on spreadsheets — schools, foundations, small businesses — ready to move to proper dashboards.',
    audienceId: 'Setiap organisasi yang mengelola operasi dengan lembar — sekolah, yayasan, UKM — siap beralih ke dasbor yang tepat.',
    featuresEn: 'Direct sheet sync, auto-charting, export-ready reports, role-based views, scheduled insights delivery.',
    featuresId: 'Sinkron langsung lembar, grafik otomatis, laporan siap ekspor, tampilan berbasis peran, pengiriman wawasan terjadwal.',
    whyEn: 'Eliminate manual reporting errors, reduce time spent on summaries, and give leadership real-time visibility into operations.',
    whyId: 'Hilangkan kesalahan pelaporan manual, kurangi waktu borang merangkum, dan berikan kepemimpinan visibilitas real-time terhadap operasi.',
    btnPrimary: false
  },
  {
    id: 'institutional-dashboard',
    tagClass: 'tag-prototype', tagLabel: '◐',
    nameEn: 'Institutional Dashboard', nameId: 'Dasbor Institutional',
    descEn: 'Centralised operational intelligence for schools and foundations. Track academics, finance, and administration from a single privacy-respecting dashboard.',
    descId: 'Intelijen operasional terpusat untuk sekolah dan yayasan. Lacak akademik, keuangan, dan administrasi dari satu dasbor yang menghormati privasi.',
    badges: ['Offline-First PWA', 'Dexie.js + IndexedDB', 'Configurable Widgets', 'Multi-School View'],
    audienceEn: 'School leaders, foundation managers, and administrators who need clarity across multiple departments without drowning in reports.',
    audienceId: 'Kepala sekolah, manajer yayasan, dan administrator yang membutuhkan kejelasan lintas departemen tanpa terbenam dalam laporan.',
    featuresEn: 'Student performance overview, financial health dashboards, staff attendance, asset status, custom KPI widgets.',
    featuresId: 'Gambaran kinerja siswa, dasbor kesehatan keuangan, kehadiran staf, status aset, widget KPI kustom.',
    extraEn: 'Design mirrors T.I.B.Y.A.N.—modular, extensible, and respects data sovereignty by keeping everything local-first.',
    extraId: 'Desain mencerminkan T.I.B.Y.A.N.—modular, dapat diperluas, dan menghormati kedaulatan data dengan menyimpan segalanya secara lokal-terlebih dahulu.',
    extraTitleEn: 'Built With Discipline', extraTitleId: 'Dibangun dengan Disiplin',
    btnPrimary: false
  },
  {
    id: 'whatsapp-formatter',
    tagClass: 'tag-dev', tagLabel: '⟳',
    nameEn: 'WhatsApp Report Formatter', nameId: 'Pemformat Laporan WhatsApp',
    descEn: 'Turn messy WhatsApp operational messages into clean, structured reports. Automatically parse, categorise, and export field updates without leaving WhatsApp.',
    descId: 'Ubah pesan operasional WhatsApp yang berantakan menjadi laporan terstruktur dan bersih. Secara otomatis parse, kategorikan, dan ekspor pembaruan lapangan tanpa meninggalkan WhatsApp.',
    badges: ['Twilio / WhatsApp API', 'NLP Light', 'Auto-Formatting', 'Export Ready'],
    audienceEn: 'Field teams, couriers, and community operations who already use WhatsApp daily and need structured reporting without switching apps.',
    audienceId: 'Tim lapangan, kurir, dan operasi komunitas yang sudah menggunakan WhatsApp sehari-hari dan membutuhkan pelaporan terstruktur tanpa mengganti aplikasi.',
    featuresEn: 'Forward updates to dedicated number, extract key data points, format automatically, deliver clean summaries to your dashboard.',
    featuresId: 'Teruskan pembaruan ke nomor khusus, ekstrak poin data kunci, format otomatis, kirim ringkasan bersih ke dasbor Anda.',
    extraEn: 'Built for the reality of Indonesian business where WhatsApp is the primary channel, not an exception.',
    extraId: 'Dibangun untuk realitas bisnis Indonesia di mana WhatsApp adalah saluran utama, bukan pengecualian.',
    extraTitleEn: 'Indonesian-Market Fit', extraTitleId: 'Cocok untuk Pasar Indonesia',
    btnPrimary: false
  },
  {
    id: 'audit-tool',
    tagClass: 'tag-prototype', tagLabel: '◐',
    nameEn: 'Operational Audit Tool', nameId: 'Alat Audit Operasional',
    descEn: 'Identify bottlenecks and optimise workflows with a lightweight audit system. Document processes, track variations, and surface improvement opportunities.',
    descId: 'Identifikasi hambatan dan optimalkan alur kerja dengan sistem audit yang ringan. Dokumentasikan proses, lacak variasi, dan temukan peluang peningkatan.',
    badges: ['Checklist Engine', 'Process Mapping', 'Bottleneck Detection', 'Consultation-Ready'],
    audienceEn: 'Organisations ready for systematic improvement — institutions with established operations needing clarity on where processes break down.',
    audienceId: 'Organisasi yang siap untuk peningkatan sistematis — institusi dengan operasi mapan yang membutuhkan kejelasan di mana proses breakdown.',
    featuresEn: 'Process adherence tracking, cycle time variations, error rates, handoff efficiency, recurring pain point identification.',
    featuresId: 'Pelacakan kepatuhan proses, variasi waktu siklus, tingkat kesalahan, efisiensi serah terima, identifikasi titik sakit berulang.',
    extraEn: 'Audit findings naturally lead to consultation engagements — the roadmap for custom system development proposals.',
    extraId: 'Temuan audit secara alami mengarah ke kesepakatan konsultasi — peta jalan untuk proposal pengembangan sistem kustom.',
    extraTitleEn: 'Strategic Value', extraTitleId: 'Nilai Strategis',
    btnPrimary: false
  }
];

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
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

/* ---------- Navbar scroll state ---------------------------- */
function initNavbar() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  const update = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ---------- Shared Component Templates --------------------- */
const SHARED_TEMPLATES = {
  footer() {
    return `
      <div class="container">
        <div class="footer-inner">
          <div class="footer-brand">
            <span class="logo">Buana Studios</span>
            <span class="addr">Jl. Bunga Mas No.6, Bandung 40614<br>West Java, Indonesia</span>
            <div style="display:flex; flex-direction:column; gap:0.35rem; margin-top:0.6rem; font-size:0.82rem;">
              <a href="https://wa.me/6285117758517?text=Hello%20Buana%20Studios%2C%20I%20found%20your%20website%20and%20would%20like%20to%20inquire." target="_blank" rel="noopener" class="addr" style="display:inline-flex; align-items:center; gap:0.4rem; color:var(--accent); font-weight:600;">
                💬 <span class="en">Studio Desk (WA): +62 851 1775 8517</span><span class="id">Meja Studio (WA): +62 851 1775 8517</span>
              </a>
              <a href="tel:+6285720502217" class="addr" style="display:inline-flex; align-items:center; gap:0.4rem;">
                📞 <span class="en">Direct Line: +62 857 2050 2217</span><span class="id">Saluran Langsung: +62 857 2050 2217</span>
              </a>
            </div>
          </div>
          <nav class="footer-nav">
            <a href="index.html"><span class="en">Home</span><span class="id">Beranda</span></a>
            <a href="products.html"><span class="en">Products</span><span class="id">Produk</span></a>
            <a href="about.html"><span class="en">About</span><span class="id">Tentang</span></a>
            <a href="journal.html"><span class="en">Notes</span><span class="id">Catatan</span></a>
            <a href="contact.html"><span class="en">Contact</span><span class="id">Kontak</span></a>
          </nav>
        </div>
        <p class="footer-copy">© 2025–2026 Buana Studios. All rights reserved.</p>
      </div>
    `;
  },

  bottomTab(activePage) {
    const isProductsPillar = ['products.html', 'learning.html', 'practice.html', 'systems.html', 'essentials.html'].includes(activePage);
    return `
      <a href="index.html" class="tab-item ${activePage === 'index.html' || activePage === '' ? 'active' : ''}"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M3 9.75L12 3l9 6.75V21a.75.75 0 01-.75.75H15.75A.75.75 0 0115 21v-5.25H9V21a.75.75 0 01-.75.75H3.75A.75.75 0 013 21V9.75z"/></svg><span class="en">Home</span><span class="id">Beranda</span></a>
      <a href="products.html" class="tab-item ${isProductsPillar ? 'active' : ''}"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"/></svg><span class="en">Products</span><span class="id">Produk</span></a>
      <a href="spaces.html" class="tab-item ${activePage === 'spaces.html' ? 'active' : ''}"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/></svg><span class="en">Spaces</span><span class="id">Ruang</span></a>
      <a href="journal.html" class="tab-item ${activePage === 'journal.html' ? 'active' : ''}"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"/></svg><span class="en">Notes</span><span class="id">Catatan</span></a>
      <a href="contact.html" class="tab-item ${activePage === 'contact.html' ? 'active' : ''}"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg><span class="en">Contact</span><span class="id">Kontak</span></a>
    `;
  },

  whatsappFab() {
    return `
      <a href="https://wa.me/6285117758517?text=Hello%20Buana%20Studios%2C%20I%20found%20your%20website%20and%20would%20like%20to%20inquire." class="whatsapp-fab" target="_blank" rel="noopener" aria-label="WhatsApp">
        <svg viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    `;
  }
};

function initSharedComponents() {
  const activePage = location.pathname.split('/').pop() || 'index.html';

  // Render Footer dynamically from single template
  const footerEl = document.querySelector('footer.footer, #site-footer');
  if (footerEl) {
    footerEl.className = 'footer';
    footerEl.innerHTML = SHARED_TEMPLATES.footer();
  }

  // Render Bottom Tab Bar dynamically from single template
  let tabEl = document.querySelector('.bottom-tab-bar, #site-bottom-tab');
  if (tabEl) {
    tabEl.innerHTML = SHARED_TEMPLATES.bottomTab(activePage);
  }

  // Ensure WhatsApp FAB is updated cleanly
  const waFab = document.querySelector('.whatsapp-fab');
  if (waFab) {
    waFab.href = "https://wa.me/6285117758517?text=Hello%20Buana%20Studios%2C%20I%20found%20your%20website%20and%20would%20like%20to%20inquire.";
  }
}

/* ---------- Active tab highlight --------------------------- */
function initBottomTab() {
  initSharedComponents();
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

    btn.disabled = true;
    btn.innerHTML = '<span class="en">Sending…</span><span class="id">Mengirim…</span>';

    const name = form.querySelector('#f-name')?.value.trim() || '';
    const email = form.querySelector('#f-email')?.value.trim() || '';
    const service = form.querySelector('#f-service')?.value || '';
    const message = form.querySelector('#f-message')?.value.trim() || '';

    if (success) {
      success.style.display = 'block';
      success.innerHTML = `
        <div style="text-align:center; padding:2rem 1rem;">
          <div style="font-size:2.5rem; margin-bottom:1rem;">✓</div>
          <h3 style="margin-bottom:0.75rem;">
            <span class="en">Inquiry Received.</span>
            <span class="id">Permintaan Diterima.</span>
          </h3>
          <p class="text-muted" style="font-size:0.95rem; line-height:1.6;">
            <span class="en">Thank you for reaching out. We have received your message regarding <strong>${service}</strong> and will get back to you shortly.</span>
            <span class="id">Terima kasih telah menghubungi kami. Kami telah menerima pesan Anda mengenai <strong>${service}</strong> dan akan segera membalas Anda.</span>
          </p>
        </div>`;
    }

    if (!service) {
      btn.disabled = false;
      btn.innerHTML = '<span class="en">Submit Inquiry</span><span class="id">Kirim Pertanyaan</span>';
      if (success) {
        success.innerHTML = `
          <p style="color:#e05555; text-align:center; padding:1rem;">
            <span class="en">⚠ Please select a service.</span>
            <span class="id">⚠ Silakan pilih layanan.</span>
          </p>`;
      }
      return;
    }

    try {
      const qs = new URLSearchParams({
        name, email, service, message,
        timestamp: new Date().toISOString()
      }).toString();

      await fetch(SHEET_URL + '?' + qs, { method: 'GET', mode: 'no-cors' });

      form.style.display = 'none';
      window.scrollTo({ top: form.offsetTop - 100, behavior: 'smooth' });
    } catch (err) {
      btn.disabled = false;
      btn.innerHTML = '<span class="en">Submit Inquiry</span><span class="id">Kirim Pertanyaan</span>';
      if (success) {
        success.innerHTML = `
          <p style="color:#e05555; text-align:center; padding:1rem;">
            <span class="en">✗ Something went wrong. Please try again or contact us directly.</span>
            <span class="id">✗ Terjadi kesalahan. Silakan coba lagi atau hubungi kami langsung.</span>
          </p>`;
      }
    }
  });
}

/* ---------- Product rotation (products.html) ---------------- */
function initProductRotation() {
  const container = document.getElementById('products-container');
  if (!container) return;

  function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function renderProductsFull(list) {
    container.innerHTML = list.map(p => `
      <div class="reveal" style="margin-bottom:5rem;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:2rem; padding-bottom:3rem; border-bottom:1px solid var(--border);">
          <div style="flex:1; min-width:280px;">
            <span class="tag ${p.tagClass}" style="margin-bottom:1.25rem;">${p.tagLabel} <span class="en">${p.statusEn || p.tagLabel === '●' ? 'Active' : p.tagLabel === '⟳' ? 'In Development' : 'Prototype'}</span><span class="id">${p.statusId || p.tagLabel === '●' ? 'Aktif' : p.tagLabel === '⟳' ? 'Dalam Pengembangan' : 'Prototipe'}</span></span>
            <h2 style="margin-top:0.75rem;">${p.nameEn}</h2>
            <p class="lead" style="margin-top:1rem; max-width:500px;">
              <span class="en">${p.descEn}</span>
              <span class="id">${p.descId}</span>
            </p>
            <div style="margin-top:2rem; display:flex; flex-wrap:wrap; gap:0.75rem;">
              ${p.badges.map(b => `<span class="badge">${b}</span>`).join('')}
            </div>
          </div>
          <div style="flex-shrink:0;">
            <a href="contact.html" class="btn ${p.btnPrimary ? 'btn-primary' : 'btn-ghost'}"><span class="en">${p.btnPrimary ? 'Request a Demo' : 'Discuss This Project'}</span><span class="id">${p.btnPrimary ? 'Minta Demo' : 'Diskusikan Proyek Ini'}</span></a>
          </div>
        </div>
        <div style="padding-top:2.5rem; display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:2rem;">
          <div>
            <h4 style="margin-bottom:0.5rem;"><span class="en">Who It's For</span><span class="id">Untuk Siapa</span></h4>
            <p style="font-size:0.9rem; color:var(--text-muted);"><span class="en">${p.audienceEn}</span><span class="id">${p.audienceId}</span></p>
          </div>
          ${p.featuresEn ? `
          <div>
            <h4 style="margin-bottom:0.5rem;"><span class="en">Key Features</span><span class="id">Fitur Utama</span></h4>
            <p style="font-size:0.9rem; color:var(--text-muted);"><span class="en">${p.featuresEn}</span><span class="id">${p.featuresId}</span></p>
          </div>` : ''}
          ${p.statusEn ? `
          <div>
            <h4 style="margin-bottom:0.5rem;"><span class="en">Status</span><span class="id">Status</span></h4>
            <p style="font-size:0.9rem; color:var(--text-muted);"><span class="en">${p.statusEn}</span><span class="id">${p.statusId}</span></p>
          </div>` : ''}
          ${p.whyEn ? `
          <div>
            <h4 style="margin-bottom:0.5rem;"><span class="en">Why It Matters</span><span class="id">Mengapa Ini Penting</span></h4>
            <p style="font-size:0.9rem; color:var(--text-muted);"><span class="en">${p.whyEn}</span><span class="id">${p.whyId}</span></p>
          </div>` : ''}
          ${p.extraEn ? `
          <div>
            <h4 style="margin-bottom:0.5rem;"><span class="en">${p.extraTitleEn}</span><span class="id">${p.extraTitleId}</span></h4>
            <p style="font-size:0.9rem; color:var(--text-muted);"><span class="en">${p.extraEn}</span><span class="id">${p.extraId}</span></p>
          </div>` : ''}
        </div>
      </div>
    `).join('');
  }

  const shuffled = shuffle(PRODUCTS);
  renderProductsFull(shuffled);
  container.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  const ROTATE_INTERVAL_MS = 30000;
  setInterval(() => {
    const reshuffled = shuffle(PRODUCTS);
    renderProductsFull(reshuffled);
    container.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  }, ROTATE_INTERVAL_MS);
}

/* ---------- Home page product cards ------------------------ */
function initHomeProducts() {
  const grid = document.getElementById('home-product-grid');
  if (!grid) return;

  function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Short tagline for home cards (first sentence only)
  function getShortTagline(p, lang) {
    const desc = lang === 'id' ? p.descId : p.descEn;
    return desc.split('.')[0] + '.';
  }

  function renderHomeCards(list) {
    // Show only 4 cards on home (original teaser design)
    grid.innerHTML = list.slice(0, 4).map(p => {
      const currentLang = document.body.getAttribute('data-lang') || 'en';
      // Tag label mappings: ● = Active, ⟳ = In Dev, ◐ = Prototype
      const enStatus = p.tagLabel === '●' ? 'Active' : p.tagLabel === '⟳' ? 'In Dev' : 'Prototype';
      const idStatus = p.tagLabel === '●' ? 'Aktif' : p.tagLabel === '⟳' ? 'Dalam Pengembangan' : 'Prototipe';
      return `
      <a href="products.html" class="product-card" style="text-decoration:none;">
        <span class="tag ${p.tagClass}">${p.tagLabel} <span class="en">${enStatus}</span><span class="id">${idStatus}</span></span>
        <h3>${p.nameEn}</h3>
        <p><span class="en">${getShortTagline(p, 'en')}</span><span class="id">${getShortTagline(p, 'id')}</span></p>
        <span class="card-cta"><span class="en">Learn More →</span><span class="id">Selengkapnya →</span></span>
      </a>
    `}).join('');
  }

  const shuffled = shuffle(PRODUCTS);
  renderHomeCards(shuffled);
  // Observe injected cards for scroll reveal
  grid.querySelectorAll('.product-card').forEach(el => revealObserver.observe(el));

  const ROTATE_INTERVAL_MS = 30000;
  setInterval(() => {
    const reshuffled = shuffle(PRODUCTS);
    renderHomeCards(reshuffled);
    grid.querySelectorAll('.product-card').forEach(el => revealObserver.observe(el));
  }, ROTATE_INTERVAL_MS);
}

/* ---------- Service Worker Registration ------------------- */
function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(err => {
        console.warn('SW registration failed:', err);
      });
    });
  }
}

/* ---------- URL Parameter Auto-Selection ------------------- */
function initUrlParams() {
  const select = document.getElementById('f-service');
  if (!select) return;
  const params = new URLSearchParams(window.location.search);
  const service = params.get('service');
  if (service) {
    const option = Array.from(select.options).find(opt => opt.value === service);
    if (option) {
      select.value = service;
    }
  }
}

/* ---------- Boot ------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initLang();
  initReveal();
  initNavbar();
  initBottomTab();
  initTaglineCycle();
  initContactForm();
  initUrlParams();
  initProductRotation();
  initHomeProducts();
  initServiceWorker();
});

