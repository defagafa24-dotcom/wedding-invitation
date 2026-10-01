const weddingDate = new Date("2027-07-11T09:00:00");

function updateCountdown() {
  const now = new Date();
  const diff = weddingDate - now;

  const ids = ["days", "hours", "minutes", "seconds"];

  if (diff <= 0) {
    ids.forEach(id => document.getElementById(id).textContent = "0");
    return;
  }

  document.getElementById("days").textContent =
    Math.floor(diff / (1000 * 60 * 60 * 24));

  document.getElementById("hours").textContent =
    Math.floor(diff / (1000 * 60 * 60) % 24);

  document.getElementById("minutes").textContent =
    Math.floor(diff / (1000 * 60) % 60);

  document.getElementById("seconds").textContent =
    Math.floor(diff / 1000 % 60);
}

updateCountdown();
setInterval(updateCountdown, 1000);

const welcome = document.getElementById("welcome");
const site = document.getElementById("site");
const openBtn = document.getElementById("openBtn");
const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

/* Opening animation + music */
openBtn.addEventListener("click", async () => {
  welcome.classList.add("hidden");
  site.classList.remove("hidden");
  musicBtn.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "instant" });

  try {
    await bgMusic.play();
    musicBtn.textContent = "♪";
  } catch (error) {
    musicBtn.textContent = "♪";
  }

  revealVisible();
});

/* Music control */
musicBtn.addEventListener("click", async () => {
  if (bgMusic.paused) {
    try {
      await bgMusic.play();
      musicBtn.textContent = "♪";
      musicBtn.setAttribute("aria-label", "Pause background music");
    } catch (error) {}
  } else {
    bgMusic.pause();
    musicBtn.textContent = "Ⅱ";
    musicBtn.setAttribute("aria-label", "Play background music");
  }
});

/* Story interaction */
const storyTabs = document.querySelectorAll(".story-tab");
const storyPanels = document.querySelectorAll(".story-panel");

storyTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.story;

    storyTabs.forEach(item => item.classList.remove("active"));
    storyPanels.forEach(panel => panel.classList.remove("active"));

    tab.classList.add("active");
    document.querySelector(`[data-panel="${target}"]`).classList.add("active");
  });
});

/* RSVP */
document.getElementById("rsvpForm").addEventListener("submit", e => {
  e.preventDefault();
  document.getElementById("rsvpForm").classList.add("hidden");
  document.getElementById("rsvpMessage").classList.remove("hidden");
});

/* Copy account numbers */
document.querySelectorAll(".copy-account").forEach(button => {
  button.addEventListener("click", async () => {
    const account = button.dataset.account;
    const original = button.textContent;

    try {
      await navigator.clipboard.writeText(account);
    } catch {
      const temp = document.createElement("input");
      temp.value = account;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand("copy");
      temp.remove();
    }

    button.textContent = "Copied ✓";

    setTimeout(() => {
      button.textContent = original;
    }, 1500);
  });
});

/* Scroll reveal animation */
const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(element => observer.observe(element));

function revealVisible() {
  document.querySelectorAll("#site .reveal").forEach(element => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      element.classList.add("visible");
    }
  });
}
