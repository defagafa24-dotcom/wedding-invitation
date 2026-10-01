// ===== WEDDING COUNTDOWN =====
const weddingDate = new Date("2027-07-11T09:00:00");

const updateCountdown = () => {
  const now = new Date();
  const distance = weddingDate - now;
  const values = {days:"000",hours:"00",minutes:"00",seconds:"00"};

  if (distance > 0) {
    values.days = String(Math.floor(distance / 86400000)).padStart(3,"0");
    values.hours = String(Math.floor(distance / 3600000) % 24).padStart(2,"0");
    values.minutes = String(Math.floor(distance / 60000) % 60).padStart(2,"0");
    values.seconds = String(Math.floor(distance / 1000) % 60).padStart(2,"0");
  }

  Object.entries(values).forEach(([id,value]) => {
    document.getElementById(id).textContent = value;
  });
};

document.getElementById("openBtn").addEventListener("click", () => {
  document.getElementById("welcome").classList.add("hidden");
  document.getElementById("site").classList.remove("hidden");
  window.scrollTo(0,0);
});

updateCountdown();
setInterval(updateCountdown,1000);

document.getElementById("rsvpForm").addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("rsvpForm").classList.add("hidden");
  document.getElementById("rsvpMessage").classList.remove("hidden");
});
