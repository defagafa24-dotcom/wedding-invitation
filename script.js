const weddingDate = new Date("2027-07-11T09:00:00");

function updateCountdown() {
  const now = new Date();
  const diff = weddingDate - now;

  const ids = ["days", "hours", "minutes", "seconds"];

  if (diff <= 0) {
    ids.forEach(id => {
      document.getElementById(id).textContent = "0";
    });
    return;
  }

  document.getElementById("days").textContent =
    Math.floor(diff / 86400000);

  document.getElementById("hours").textContent =
    Math.floor(diff / 3600000 % 24);

  document.getElementById("minutes").textContent =
    Math.floor(diff / 60000 % 60);

  document.getElementById("seconds").textContent =
    Math.floor(diff / 1000 % 60);
}

updateCountdown();
setInterval(updateCountdown, 1000);


// ==============================
// OPEN INVITATION + MUSIC
// ==============================

const welcome = document.getElementById("welcome");
const site = document.getElementById("site");
const openBtn = document.getElementById("openBtn");
const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

openBtn.addEventListener("click", async () => {
  welcome.classList.add("hidden");
  site.classList.remove("hidden");
  musicBtn.classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "instant"
  });

  try {
    await bgMusic.play();
    musicBtn.textContent = "♪";
    musicBtn.setAttribute("aria-label", "Pause background music");
  } catch (error) {}

  revealVisible();
});

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


// ==============================
// STORY INTERACTION
// ==============================

const storyTabs = document.querySelectorAll(".story-tab");
const storyPanels = document.querySelectorAll(".story-panel");

storyTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.story;

    storyTabs.forEach(item => {
      item.classList.remove("active");
    });

    storyPanels.forEach(panel => {
      panel.classList.remove("active");
    });

    tab.classList.add("active");

    const selectedPanel =
      document.querySelector(`[data-panel="${target}"]`);

    if (selectedPanel) {
      selectedPanel.classList.add("active");
    }
  });
});


// ==============================
// STORY JOURNEY DOTS
// ==============================

const journeyDots = document.querySelectorAll(".journey-dot");

journeyDots.forEach(dot => {
  dot.addEventListener("click", () => {
    const target = dot.dataset.journey;

    storyTabs.forEach(tab => {
      tab.classList.toggle(
        "active",
        tab.dataset.story === target
      );
    });

    storyPanels.forEach(panel => {
      panel.classList.toggle(
        "active",
        panel.dataset.panel === target
      );
    });

    journeyDots.forEach(item => {
      item.classList.toggle("active", item === dot);
    });
  });
});

storyTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.story;

    journeyDots.forEach(dot => {
      dot.classList.toggle(
        "active",
        dot.dataset.journey === target
      );
    });
  });
});


// ==============================
// SAVE THE DATE
// ==============================

const calendarBtn = document.getElementById("calendarBtn");

if (calendarBtn) {
  calendarBtn.addEventListener("click", () => {

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

    const blob = new Blob(
      [eventText],
      { type: "text/calendar;charset=utf-8" }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "Anisa-and-Defa-Wedding.ics";

    document.body.appendChild(link);

    link.click();

    link.remove();

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  });
}


// ==============================
// GALLERY LIGHTBOX
// ==============================

const galleryItems =
  document.querySelectorAll(".gallery-item");

const galleryLightbox =
  document.getElementById("galleryLightbox");

const galleryImage =
  document.getElementById("galleryImage");

const galleryClose =
  document.getElementById("galleryClose");

const galleryPrev =
  document.getElementById("galleryPrev");

const galleryNext =
  document.getElementById("galleryNext");

const galleryCounter =
  document.getElementById("galleryCounter");

const gallerySources =
  Array.from(galleryItems).map(item =>
    item.querySelector("img").getAttribute("src")
  );

let galleryIndex = 0;


function showGallery(index) {

  if (!gallerySources.length) return;

  galleryIndex =
    (index + gallerySources.length) %
    gallerySources.length;

  galleryImage.src =
    gallerySources[galleryIndex];

  galleryImage.alt =
    `Anisa and Defa — photo ${galleryIndex + 1}`;

  if (galleryCounter) {
    galleryCounter.textContent =
      `${galleryIndex + 1} / ${gallerySources.length}`;
  }
}


function openGallery(index) {

  showGallery(index);

  galleryLightbox.classList.remove("hidden");

  galleryLightbox.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.style.overflow = "hidden";
}


function closeGallery() {

  galleryLightbox.classList.add("hidden");

  galleryLightbox.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.style.overflow = "";
}


galleryItems.forEach((item, index) => {

  item.addEventListener("click", () => {
    openGallery(index);
  });

});


galleryClose.addEventListener(
  "click",
  closeGallery
);


galleryPrev.addEventListener(
  "click",
  () => showGallery(galleryIndex - 1)
);


galleryNext.addEventListener(
  "click",
  () => showGallery(galleryIndex + 1)
);


galleryLightbox.addEventListener(
  "click",
  event => {

    if (event.target === galleryLightbox) {
      closeGallery();
    }

  }
);


document.addEventListener(
  "keydown",
  event => {

    if (
      galleryLightbox.classList.contains("hidden")
    ) {
      return;
    }

    if (event.key === "Escape") {
      closeGallery();
    }

    if (event.key === "ArrowLeft") {
      showGallery(galleryIndex - 1);
    }

    if (event.key === "ArrowRight") {
      showGallery(galleryIndex + 1);
    }

  }
);


// ==============================
// RSVP
// ==============================

const rsvpForm =
  document.getElementById("rsvpForm");

const rsvpMessage =
  document.getElementById("rsvpMessage");

if (rsvpForm) {

  rsvpForm.addEventListener("submit", event => {

    event.preventDefault();

    rsvpForm.classList.add("hidden");

    rsvpMessage.classList.remove("hidden");

  });

}


// ==============================
// COPY BANK ACCOUNT
// ==============================

document
  .querySelectorAll(".copy-account")
  .forEach(button => {

    button.addEventListener(
      "click",
      async () => {

        const account =
          button.dataset.account;

        const original =
          button.textContent;

        try {

          await navigator.clipboard.writeText(
            account
          );

        } catch {

          const temp =
            document.createElement("input");

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

      }
    );

  });


// ==============================
// ONE LAST THING
// ==============================

const lastThingBtn =
  document.getElementById("lastThingBtn");

const lastThingMessage =
  document.getElementById("lastThingMessage");


if (lastThingBtn && lastThingMessage) {

  lastThingBtn.addEventListener(
    "click",
    () => {

      const isHidden =
        lastThingMessage.classList.contains("hidden");

      if (isHidden) {

        lastThingMessage.classList.remove("hidden");

        lastThingBtn.querySelector("span").textContent =
          "Our little promise";

        lastThingBtn.querySelector("small").textContent =
          "Tap to close";

      } else {

        lastThingMessage.classList.add("hidden");

        lastThingBtn.querySelector("span").textContent =
          "One last thing…";

        lastThingBtn.querySelector("small").textContent =
          "Tap to reveal";

      }

    }
  );

}


// ==============================
// SCROLL REVEAL
// ==============================

const revealElements =
  document.querySelectorAll(".reveal");


const observer =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.12
    }
  );


revealElements.forEach(element => {
  observer.observe(element);
});


function revealVisible() {

  document
    .querySelectorAll("#site .reveal")
    .forEach(element => {

      const rect =
        element.getBoundingClientRect();

      if (
        rect.top <
        window.innerHeight * 0.9
      ) {

        element.classList.add("visible");

      }

    });

}
