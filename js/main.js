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

/* ---------- Active tab highlight --------------------------- */
function initBottomTab() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.tab-item').forEach(tab => {
    const href = tab.getAttribute('href') || '';
    const target = href.split('/').pop();
    const isActive =
      (target === page) ||
      (page === '' && target === 'index.html') ||
      (['products.html', 'learning.html', 'practice.html', 'systems.html', 'essentials.html'].includes(page) && target === 'products.html');
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

/* ---------- Boot ------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initLang();
  initReveal();
  initNavbar();
  initBottomTab();
  initTaglineCycle();
  initContactForm();
  initProductRotation();
  initHomeProducts();
});
