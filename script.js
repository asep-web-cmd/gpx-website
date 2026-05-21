let generatedCode = "";

const lockedUntil = localStorage.getItem("gpx_locked_until");

if (lockedUntil && new Date() < new Date(lockedUntil)) {
  document.getElementById("lockScreen").classList.remove("hidden");
  document.getElementById("mainContainer").classList.add("hidden");
}

function startTicket() {
  document.getElementById("step1").classList.remove("hidden");
}

function nextStep(step) {
  document.getElementById(`step${step - 1}`).classList.add("hidden");
  document.getElementById(`step${step}`).classList.remove("hidden");
}

function generateCode() {
  const btn = document.getElementById("codeBtn");
  const codeBox = document.getElementById("codeBox");

  let count = 20;

  generatedCode = Math.floor(10000 + Math.random() * 90000).toString();

  btn.disabled = true;
  btn.innerText = `Wait ${count}s`;

  const timer = setInterval(() => {
    count--;
    btn.innerText = `Wait ${count}s`;

    if (count <= 0) {
      clearInterval(timer);
      codeBox.innerText = generatedCode;
      btn.innerText = "CODE READY";
      btn.disabled = false;
    }
  }, 1000);
}

function verifyCode() {
  const inputCode = document.getElementById("verifyCode").value;

  if (inputCode === generatedCode) {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;

    const users = JSON.parse(localStorage.getItem("gpx_users") || "[]");

    users.push({ username, email });

    localStorage.setItem("gpx_users", JSON.stringify(users));

    const nextSunday = new Date();
    nextSunday.setDate(nextSunday.getDate() + ((7 - nextSunday.getDay()) % 7 || 7));

    localStorage.setItem("gpx_locked_until", nextSunday.toISOString());

    document.getElementById("step3").classList.add("hidden");
    document.getElementById("success").classList.remove("hidden");
  } else {
    alert("Code salah!");
  }
}

function openAdmin() {
  const user = prompt("Username admin:");
  const pass = prompt("Password admin:");

  if (user === "gpx" && pass === "asep4990") {
    const data = JSON.parse(localStorage.getItem("gpx_users") || "[]");

    if (data.length === 0) {
      alert("Belum ada data verifikasi");
      return;
    }

    let text = "";

    data.forEach((u, i) => {
      text += `${i + 1}. ${u.username} | ${u.email}\n`;
    });

    alert(text);
  } else {
    alert("Login admin salah");
  }
        }
