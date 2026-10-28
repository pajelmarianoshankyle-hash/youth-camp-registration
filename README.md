const STORAGE_KEY = "sunriseCampRegistrations";
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "camp2026";

function getRegistrations() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    return [];
  }

  try {
    return JSON.parse(saved);
  } catch (error) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    return [];
  }
}

function saveRegistrations(registrations) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(registrations));
}

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function setMessage(element, text, type = "") {
  if (!element) return;
  element.textContent = text;
  element.className = `form-message ${type}`.trim();
}

function handleRegistrationSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);
  const values = Object.fromEntries(formData.entries());

  const entries = getRegistrations();
  const registration = {
    id: crypto.randomUUID(),
    guardianName: values.guardianName,
    email: values.email,
    childName: values.childName,
    age: Number(values.age),
    phone: values.phone,
    program: values.program,
    session: values.session,
    notes: values.notes || "",
    status: "Pending",
    createdAt: new Date().toISOString(),
  };

  entries.unshift(registration);
  saveRegistrations(entries);
  form.reset();

  const message = document.getElementById("formMessage");
  setMessage(message, "Registration submitted successfully. Our camp team will contact you soon.", "success");
}

function getAdminState() {
  return localStorage.getItem("sunriseCampAdminLoggedIn") === "true";
}

function setAdminState(isLoggedIn) {
  localStorage.setItem("sunriseCampAdminLoggedIn", String(isLoggedIn));
}

function renderDashboard() {
  const tableBody = document.getElementById("registrationsTableBody");
  if (!tableBody) return;

  const registrations = getRegistrations();

  if (!registrations.length) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="6">No registrations yet.</td>
      </tr>
    `;
  } else {
    tableBody.innerHTML = registrations
      .map(
        (item) => `
          <tr>
            <td>
              <strong>${item.childName}</strong><br />
              <small>Age ${item.age}</small>
            </td>
            <td>
              ${item.guardianName}<br />
              <small>${item.email}</small>
            </td>
            <td>${item.program}</td>
            <td>${item.session}</td>
            <td><span class="badge ${item.status.toLowerCase()}">${item.status}</span></td>
            <td>
              <div class="action-group">
                <button class="action-btn" data-action="approve" data-id="${item.id}">Approve</button>
                <button class="action-btn delete" data-action="delete" data-id="${item.id}">Delete</button>
              </div>
            </td>
          </tr>
        `
      )
      .join("");
  }

  const totalCount = document.getElementById("totalCount");
  const pendingCount = document.getElementById("pendingCount");
  const approvedCount = document.getElementById("approvedCount");

  if (totalCount) totalCount.textContent = String(registrations.length);
  if (pendingCount) pendingCount.textContent = String(registrations.filter((item) => item.status === "Pending").length);
  if (approvedCount) approvedCount.textContent = String(registrations.filter((item) => item.status === "Approved").length);
}

function renderAdminView() {
  const loginSection = document.getElementById("adminLoginSection");
  const dashboard = document.getElementById("adminDashboard");

  if (!loginSection || !dashboard) return;

  if (getAdminState()) {
    loginSection.classList.add("hidden");
    dashboard.classList.remove("hidden");
    renderDashboard();
  } else {
    loginSection.classList.remove("hidden");
    dashboard.classList.add("hidden");
  }
}

function handleAdminLogin(event) {
  event.preventDefault();

  const username = document.getElementById("adminUsername")?.value.trim();
  const password = document.getElementById("adminPassword")?.value.trim();
  const message = document.getElementById("loginMessage");

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    setAdminState(true);
    renderAdminView();
    setMessage(message, "", "");
    return;
  }

  setMessage(message, "Invalid username or password.", "error");
}

function handleAdminLogout() {
  setAdminState(false);
  renderAdminView();
}

function handleAdminActions(event) {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  const action = target.dataset.action;
  const id = target.dataset.id;
  if (!action || !id) return;

  const registrations = getRegistrations();
  const selected = registrations.find((item) => item.id === id);

  if (!selected) return;

  if (action === "delete") {
    const next = registrations.filter((item) => item.id !== id);
    saveRegistrations(next);
    renderDashboard();
    return;
  }

  if (action === "approve") {
    selected.status = "Approved";
    saveRegistrations(registrations);
    renderDashboard();
  }
}

function exportRegistrationsCsv() {
  const registrations = getRegistrations();
  if (!registrations.length) {
    return;
  }

  const columns = [
    "Child Name",
    "Age",
    "Parent/Guardian",
    "Email",
    "Phone",
    "Program",
    "Session",
    "Status",
    "Notes",
    "Created At",
  ];

  const rows = registrations.map((item) => [
    item.childName,
    item.age,
    item.guardianName,
    item.email,
    item.phone,
    item.program,
    item.session,
    item.status,
    item.notes,
    formatDate(item.createdAt),
  ]);

  const csv = [columns, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "camp-registrations.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function init() {
  const form = document.getElementById("registrationForm");
  if (form) {
    form.addEventListener("submit", handleRegistrationSubmit);
  }

  const adminForm = document.getElementById("adminLoginForm");
  if (adminForm) {
    adminForm.addEventListener("submit", handleAdminLogin);
  }

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", handleAdminLogout);
  }

  const exportBtn = document.getElementById("exportBtn");
  if (exportBtn) {
    exportBtn.addEventListener("click", exportRegistrationsCsv);
  }

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    if (target.matches("[data-action]") && getAdminState()) {
      handleAdminActions(event);
    }
  });

  renderAdminView();
}

window.addEventListener("DOMContentLoaded", init);
