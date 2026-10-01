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


// ==============================
// STORY JOURNEY DOTS
// ==============================
const journeyDots = document.querySelectorAll(".journey-dot");

journeyDots.forEach(dot => {
  dot.addEventListener("click", () => {
    const target = dot.dataset.journey;
    storyTabs.forEach(tab => tab.classList.toggle("active", tab.dataset.story === target));
    storyPanels.forEach(panel => panel.classList.toggle("active", panel.dataset.panel === target));
    journeyDots.forEach(item => item.classList.toggle("active", item === dot));
  });
});

// Keep story journey in sync when chapter tabs are tapped.
storyTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.story;
    journeyDots.forEach(dot => dot.classList.toggle("active", dot.dataset.journey === target));
  });
});


// ==============================
// GALLERY LIGHTBOX
// ==============================
const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

const galleryImages = Array.from(galleryItems).map(item => item.querySelector("img").src);
let galleryIndex = 0;

function showGalleryImage(index) {
  galleryIndex = (index + galleryImages.length) % galleryImages.length;
  lightboxImage.src = galleryImages[galleryIndex];
  lightboxImage.alt = `Anisa and Defa — photo ${galleryIndex + 1}`;
}

function openGallery(index) {
  showGalleryImage(index);
  lightbox.classList.remove("hidden");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeGallery() {
  lightbox.classList.add("hidden");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => openGallery(index));
});

lightboxClose.addEventListener("click", closeGallery);
lightboxPrev.addEventListener("click", () => showGalleryImage(galleryIndex - 1));
lightboxNext.addEventListener("click", () => showGalleryImage(galleryIndex + 1));

lightbox.addEventListener("click", event => {
  if (event.target === lightbox) closeGallery();
});

document.addEventListener("keydown", event => {
  if (lightbox.classList.contains("hidden")) return;
  if (event.key === "Escape") closeGallery();
  if (event.key === "ArrowLeft") showGalleryImage(galleryIndex - 1);
  if (event.key === "ArrowRight") showGalleryImage(galleryIndex + 1);
});


// ==============================
// SAVE THE DATE
// ==============================
const saveDateBtn = document.getElementById("saveDateBtn");

saveDateBtn.addEventListener("click", () => {
  const eventText = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Anisa and Defa//Wedding//EN",
    "BEGIN:VEVENT",
    "UID:anisa-defa-wedding-2027@example.com",
    "DTSTAMP:20261002T000000Z",
    "DTSTART:20270711T090000",
    "DTEND:20270711T150000",
    "SUMMARY:Anisa & Defa — Wedding",
    "DESCRIPTION:Anisa Kusumas Tuti & Defa Gafaruddin Putra",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([eventText], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "Anisa-and-Defa-Wedding.ics";
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});


// ==============================
// FINAL SURPRISE
// ==============================
const surpriseBtn = document.getElementById("surpriseBtn");
const surpriseMessage = document.getElementById("surpriseMessage");

surpriseBtn.addEventListener("click", () => {
  const isHidden = surpriseMessage.classList.contains("hidden");
  surpriseMessage.classList.toggle("hidden", !isHidden);
  surpriseBtn.querySelector("span").textContent = isHidden ? "Our little promise" : "One last thing…";
  surpriseBtn.querySelector("small").textContent = isHidden ? "Tap to close" : "Tap to reveal";
});
