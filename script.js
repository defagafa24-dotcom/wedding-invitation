const weddingDate = new Date("2027-07-11T09:00:00");

function updateCountdown() {
  const now = new Date();
  const diff = weddingDate - now;

  if (diff <= 0) {
    document.getElementById("days").textContent = "0";
    document.getElementById("hours").textContent = "0";
    document.getElementById("minutes").textContent = "0";
    document.getElementById("seconds").textContent = "0";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

updateCountdown();
setInterval(updateCountdown, 1000);

const welcome = document.getElementById("welcome");
const site = document.getElementById("site");
const openBtn = document.getElementById("openBtn");
const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

openBtn.addEventListener("click", async () => {
  welcome.classList.add("hidden");
  site.classList.remove("hidden");
  musicBtn.classList.remove("hidden");
  window.scrollTo(0, 0);

  // Because this happens directly from the user's tap, iOS/iPadOS
  // browsers are allowed to start the music here.
  try {
    await bgMusic.play();
    musicBtn.textContent = "♪";
    musicBtn.setAttribute("aria-label", "Pause background music");
    musicBtn.setAttribute("title", "Pause music");
  } catch (error) {
    // If the browser blocks playback, the floating button remains available.
    musicBtn.textContent = "♪";
  }
});

musicBtn.addEventListener("click", async () => {
  if (bgMusic.paused) {
    try {
      await bgMusic.play();
      musicBtn.textContent = "♪";
      musicBtn.setAttribute("aria-label", "Pause background music");
      musicBtn.setAttribute("title", "Pause music");
    } catch (error) {
      console.log("Music playback was blocked by the browser.");
    }
  } else {
    bgMusic.pause();
    musicBtn.textContent = "Ⅱ";
    musicBtn.setAttribute("aria-label", "Play background music");
    musicBtn.setAttribute("title", "Play music");
  }
});

document.getElementById("rsvpForm").addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("rsvpForm").classList.add("hidden");
  document.getElementById("rsvpMessage").classList.remove("hidden");
});

document.querySelectorAll(".copy-account").forEach((button) => {
  button.addEventListener("click", async () => {
    const account = button.dataset.account;
    try {
      await navigator.clipboard.writeText(account);
      const original = button.textContent;
      button.textContent = "Copied ✓";
      setTimeout(() => {
        button.textContent = original;
      }, 1500);
    } catch (error) {
      const temp = document.createElement("input");
      temp.value = account;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand("copy");
      temp.remove();
      const original = button.textContent;
      button.textContent = "Copied ✓";
      setTimeout(() => button.textContent = original, 1500);
    }
  });
});
