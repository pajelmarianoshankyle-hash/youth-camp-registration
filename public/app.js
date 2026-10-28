:root {
  --ivory: #fffdf9;
  --ivory-deep: #f5efe4;
  --gold: #c9a96a;
  --gold-soft: #f4e9d0;
  --sage: #8ca17c;
  --forest: #2b4739;
  --navy: #1d2d3c;
  --navy-soft: #3d5366;
  --text: #1d2a2f;
  --muted: #5e6d67;
  --success: #3a8d70;
  --warning: #d2903d;
  --danger: #c55b50;
  --border: rgba(44, 68, 61, 0.12);
  --shadow: 0 22px 50px rgba(26, 38, 31, 0.12);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: "Inter", sans-serif;
  background: linear-gradient(180deg, #fdfaf5 0%, #f5efe4 100%);
  color: var(--text);
}

img {
  max-width: 100%;
  display: block;
}

a {
  text-decoration: none;
  color: inherit;
}

button,
input,
select,
textarea {
  font: inherit;
}

.container {
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(255, 253, 249, 0.82);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(44, 68, 61, 0.08);
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 80px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 800;
  letter-spacing: 0.02em;
}

.brand-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  background: linear-gradient(135deg, var(--gold), #e5d0a4);
  color: var(--navy);
  border-radius: 10px;
  font-size: 1.2rem;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.8);
}

nav {
  display: flex;
  align-items: center;
  gap: 22px;
  color: var(--muted);
  font-weight: 600;
}

.nav-button,
.primary-btn,
.secondary-btn,
.ghost-btn,
.action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
}

.nav-button,
.primary-btn {
  background: linear-gradient(135deg, var(--gold), #d6af67);
  color: var(--navy);
  border-radius: 12px;
  box-shadow: 0 14px 28px rgba(201, 169, 106, 0.28);
}

.nav-button {
  padding: 10px 16px;
  font-size: 0.95rem;
}

.primary-btn,
.secondary-btn,
.ghost-btn {
  padding: 14px 22px;
  font-weight: 700;
}

.secondary-btn {
  background: rgba(140, 161, 124, 0.12);
  color: var(--forest);
  border: 1px solid rgba(140, 161, 124, 0.24);
}

.ghost-btn {
  background: transparent;
  color: var(--muted);
  border: 1px solid var(--border);
}

.primary-btn:hover,
.secondary-btn:hover,
.ghost-btn:hover,
.nav-button:hover,
.action-btn:hover {
  transform: translateY(-1px);
}

.hero {
  padding: 80px 0 40px;
  background: radial-gradient(circle at top left, rgba(201, 169, 106, 0.18), transparent 25%), linear-gradient(180deg, rgba(255, 253, 249, 0.98), rgba(245, 239, 228, 0.96));
}

.hero-inner {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 42px;
  align-items: center;
}

.eyebrow,
.section-tag {
  margin: 0 0 14px;
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--forest);
  font-weight: 800;
}

.hero-copy h1,
.section-heading h2,
.register-info h2,
.dashboard-container h2,
.login-card h2 {
  margin: 0;
  font-family: "Cormorant Garamond", serif;
  font-weight: 600;
  line-height: 0.98;
  letter-spacing: -0.04em;
}

.hero-copy h1 {
  font-size: clamp(3rem, 4vw, 5rem);
}

.lead {
  max-width: 570px;
  margin-top: 18px;
  color: var(--muted);
  font-size: 1.08rem;
  line-height: 1.8;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 28px;
}

.hero-points {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  list-style: none;
  margin: 22px 0 0;
  padding: 0;
  color: var(--muted);
  font-weight: 600;
}

.hero-points li::before {
  content: "✦";
  color: var(--gold);
  margin-right: 8px;
}

.hero-card {
  display: grid;
  gap: 22px;
}

.stats-card,
.mini-schedule {
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(45, 73, 64, 0.08);
  border-radius: 24px;
  box-shadow: var(--shadow);
}

.stats-card {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  padding: 22px;
}

.stats-card div {
  display: grid;
  gap: 8px;
  text-align: center;
}

.stats-card strong {
  font-size: 1.8rem;
  letter-spacing: -0.06rem;
  color: var(--navy);
}

.stats-card span,
.mini-schedule p {
  color: var(--muted);
}

.mini-schedule {
  padding: 22px 24px;
}

.mini-schedule h3 {
  margin: 0 0 12px;
  font-size: 1.3rem;
  color: var(--navy);
}

.section {
  padding: 90px 0;
}

.alt-section {
  background: rgba(140, 161, 124, 0.08);
}

.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  align-items: end;
}

.two-col h2,
.section-heading h2,
.register-info h2 {
  font-size: clamp(2.2rem, 3vw, 3.2rem);
}

.two-col p,
.register-info p {
  color: var(--muted);
  line-height: 1.8;
}

.section-heading {
  margin-bottom: 28px;
}

.program-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 22px;
}

.program-card {
  background: rgba(255, 255, 255, 0.84);
  border: 1px solid rgba(45, 73, 64, 0.08);
  border-radius: 20px;
  padding: 26px 22px;
  box-shadow: 0 14px 28px rgba(29, 45, 60, 0.04);
}

.program-card h3 {
  margin: 14px 0 10px;
  font-size: 1.28rem;
  color: var(--navy);
}

.program-card p {
  margin: 0;
  color: var(--muted);
  line-height: 1.7;
}

.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--gold-soft), rgba(140, 161, 124, 0.13));
  font-size: 1.5rem;
}

.register-section {
  padding-top: 66px;
}

.register-wrap {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 32px;
  align-items: start;
}

.info-box {
  margin-top: 24px;
  padding: 20px 18px;
  background: rgba(201, 169, 106, 0.1);
  border: 1px solid rgba(201, 169, 106, 0.24);
  border-radius: 16px;
  color: var(--text);
}

.info-box strong,
.info-box span {
  display: block;
}

.registration-form,
.login-card {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(45, 73, 64, 0.08);
  border-radius: 28px;
  padding: 28px 24px;
  box-shadow: var(--shadow);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

label {
  display: grid;
  gap: 8px;
  color: var(--text);
  font-weight: 600;
}

.full-width {
  grid-column: 1 / -1;
}

input,
select,
textarea {
  width: 100%;
  border: 1px solid rgba(45, 73, 64, 0.12);
  background: #fffdfb;
  color: var(--text);
  border-radius: 12px;
  padding: 14px 14px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: rgba(32, 57, 48, 0.5);
  box-shadow: 0 0 0 4px rgba(140, 161, 124, 0.08);
}

.submit-btn {
  width: 100%;
  margin-top: 22px;
}

.form-message {
  min-height: 22px;
  margin: 14px 0 0;
  color: var(--muted);
  font-weight: 600;
}

.form-message.success {
  color: var(--success);
}

.form-message.error {
  color: var(--danger);
}

.site-footer {
  border-top: 1px solid rgba(45, 73, 64, 0.08);
  background: rgba(255, 255, 255, 0.7);
}

.footer-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 80px;
  color: var(--muted);
}

.admin-body {
  background: linear-gradient(180deg, #f7f2ea 0%, #f0f6f2 100%);
}

.admin-main {
  padding: 56px 0 90px;
}

.admin-login-wrap {
  display: flex;
  justify-content: center;
}

.login-card {
  width: min(480px, calc(100% - 24px));
}

.admin-form {
  display: grid;
  gap: 18px;
  margin-top: 18px;
}

.admin-dashboard {
  margin-top: 30px;
}

.hidden {
  display: none !important;
}

.dashboard-container {
  display: grid;
  gap: 28px;
}

.dashboard-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.dashboard-actions {
  display: flex;
  gap: 12px;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.stat-box {
  display: grid;
  gap: 8px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(45, 73, 64, 0.08);
  padding: 22px 18px;
  border-radius: 18px;
  box-shadow: 0 12px 26px rgba(29, 45, 60, 0.04);
}

.stat-box span {
  color: var(--muted);
  font-weight: 600;
}

.stat-box strong {
  font-size: clamp(1.8rem, 2vw, 2.5rem);
  letter-spacing: -0.06em;
  color: var(--navy);
}

.stat-box.pending {
  border-color: rgba(210, 144, 61, 0.25);
}

.stat-box.approved {
  border-color: rgba(58, 141, 112, 0.25);
}

.table-wrapper {
  overflow-x: auto;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(45, 73, 64, 0.08);
  border-radius: 20px;
  box-shadow: 0 12px 26px rgba(29, 45, 60, 0.04);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 18px 16px;
  text-align: left;
  border-bottom: 1px solid rgba(45, 73, 64, 0.08);
  vertical-align: top;
}

th {
  background: rgba(245, 239, 228, 0.8);
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
}

tbody tr:hover {
  background: rgba(245, 247, 242, 0.9);
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 8px 10px;
  font-size: 0.8rem;
  font-weight: 700;
}

.badge.pending {
  background: rgba(210, 144, 61, 0.12);
  color: #9d6b1d;
}

.badge.approved {
  background: rgba(58, 141, 112, 0.12);
  color: #216b52;
}

.action-btn {
  border: none;
  background: rgba(140, 161, 124, 0.12);
  color: var(--forest);
  border-radius: 10px;
  padding: 8px 10px;
  font-weight: 700;
  cursor: pointer;
}

.action-btn.delete {
  background: rgba(197, 91, 80, 0.1);
  color: var(--danger);
}

.action-btn.pay {
  background: rgba(201, 169, 106, 0.12);
  color: var(--navy);
}

@media (max-width: 900px) {
  .hero-inner,
  .two-col,
  .register-wrap,
  .program-grid {
    grid-template-columns: 1fr;
  }

  .program-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .nav {
    flex-wrap: wrap;
    justify-content: center;
    padding: 14px 0;
  }
}

@media (max-width: 620px) {
  .form-grid,
  .stats-row,
  .program-grid {
    grid-template-columns: 1fr;
  }

  .hero {
    padding-top: 52px;
  }

  .hero-actions,
  .dashboard-topbar,
  .dashboard-actions,
  .footer-inner {
    flex-direction: column;
    align-items: stretch;
  }

  .primary-btn,
  .secondary-btn,
  .ghost-btn,
  .nav-button {
    width: 100%;
  }

  th,
  td {
    white-space: nowrap;
  }
}
