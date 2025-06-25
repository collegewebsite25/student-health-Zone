const users = {
  "student_health": "Student@#07"
};
const admin = {
  "health_admin": "Admin@Health2025"
};
let appointments = [];

function showRegister() {
  document.getElementById("login-screen").classList.add("hidden");
  document.getElementById("register-screen").classList.remove("hidden");
}
function showLogin() {
  document.getElementById("register-screen").classList.add("hidden");
  document.getElementById("login-screen").classList.remove("hidden");
}
function register() {
  const username = document.getElementById("reg-username").value;
  const password = document.getElementById("reg-password").value;
  const error = document.getElementById("register-error");

  if (username in users) {
    error.textContent = "Username already exists.";
  } else if (username && password) {
    users[username] = password;
    error.textContent = "";
    alert("Registration successful. Please log in.");
    showLogin();
  } else {
    error.textContent = "Please fill in both fields.";
  }
}
function login() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;
  const userType = document.getElementById("user-type").value;
  const error = document.getElementById("login-error");

  if (userType === "student") {
    if (users[username] === password) {
      error.textContent = "";
      document.getElementById("login-screen").classList.add("hidden");
      document.getElementById("student-ui").classList.remove("hidden");
      renderHealthRecords();
    } else {
      error.textContent = "Invalid student credentials.";
    }
  } else if (userType === "admin") {
    if (admin[username] === password) {
      error.textContent = "";
      document.getElementById("login-screen").classList.add("hidden");
      document.getElementById("admin-ui").classList.remove("hidden");
      renderAdminData();
    } else {
      error.textContent = "Invalid admin credentials.";
    }
  }
}
function logout() {
  document.getElementById("login-screen").classList.remove("hidden");
  document.getElementById("student-ui").classList.add("hidden");
  document.getElementById("admin-ui").classList.add("hidden");
}
function scrollToAppointments() {
  document.getElementById("appointments").scrollIntoView({ behavior: "smooth" });
}
function bookAppointment(event) {
  event.preventDefault();
  const name = document.getElementById("studentName").value;
  const date = document.getElementById("date").value;
  const reason = document.getElementById("reason").value;

  if (name && date && reason) {
    appointments.push({ name, date, reason });
    document.getElementById("appointment-msg").textContent = "Appointment booked successfully!";
    document.getElementById("studentName").value = "";
    document.getElementById("date").value = "";
    document.getElementById("reason").value = "";
    renderAdminData();
  }
}
function renderAdminData() {
  const adminDiv = document.getElementById("admin-appointments");
  if (!adminDiv) return;
  adminDiv.innerHTML = "";
  const table = document.createElement("table");
  table.innerHTML = "<tr><th>Name</th><th>Date</th><th>Reason</th></tr>";
  appointments.forEach(app => {
    table.innerHTML += `<tr><td>${app.name}</td><td>${app.date}</td><td>${app.reason}</td></tr>`;
  });
  adminDiv.appendChild(table);
}
function renderHealthRecords() {
  const defaultHealthRecords = [
    { date: "2025-06-26", condition: "", status: "No Record Found" },
    { date: "2025-06-26", condition: "", status: "No Record Found" }
  ];
  const list = document.getElementById("health-records-list");
  if (!list) return;
  list.innerHTML = defaultHealthRecords.map(
    r => `<li>${r.date} - ${r.condition} - ${r.status}</li>`
  ).join('');
}
