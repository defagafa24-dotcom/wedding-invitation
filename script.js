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

/* =========================================================
   V3 — STORYBOOK PARALLAX + CHAPTER ATMOSPHERE
========================================================= */

const storySectionV3 = document.querySelector(".story-section");

function setStoryChapterV3(target) {
  if (!storySectionV3) return;
  storySectionV3.dataset.chapter = target;
}

if (storySectionV3) {
  storySectionV3.dataset.chapter =
    document.querySelector(".story-tab.active")?.dataset.story || "0";

  storyTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      setStoryChapterV3(tab.dataset.story);
    });
  });

  journeyDots.forEach(dot => {
    dot.addEventListener("click", () => {
      setStoryChapterV3(dot.dataset.journey);
    });
  });

  let storyTicking = false;

  window.addEventListener("scroll", () => {
    if (storyTicking) return;

    storyTicking = true;

    requestAnimationFrame(() => {
      const rect = storySectionV3.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const distance = rect.top / viewport;
      const parallax = Math.max(-32, Math.min(32, distance * -22));

      storySectionV3.style.setProperty(
        "--story-parallax",
        parallax + "px"
      );

      storyTicking = false;
    });
  }, { passive: true });
}
/* =========================================================
   V4 — WHOLE-PAGE CINEMATIC EXPERIENCE
========================================================= */

(() => {
  const siteV4 = document.getElementById("site");
  if (!siteV4) return;

  const reduceMotionV4 =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* -------------------------------------------------------
     ATMOSPHERIC LIGHT + PARTICLES
  ------------------------------------------------------- */

  if (!reduceMotionV4) {
    const layer = document.createElement("div");
    layer.className = "v4-cinematic-layer";
    layer.setAttribute("aria-hidden", "true");

    const vignette = document.createElement("div");
    vignette.className = "v4-vignette";
    layer.appendChild(vignette);

    const lightOne = document.createElement("div");
    lightOne.className = "v4-light v4-light-one";
    layer.appendChild(lightOne);

    const lightTwo = document.createElement("div");
    lightTwo.className = "v4-light v4-light-two";
    layer.appendChild(lightTwo);

    const particleCount =
      window.innerWidth < 700 ? 18 : 32;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("span");
      particle.className = "v4-particle";

      particle.style.left =
        Math.random() * 100 + "%";

      particle.style.top =
        35 + Math.random() * 65 + "%";

      particle.style.setProperty(
        "--duration",
        (8 + Math.random() * 10) + "s"
      );

      particle.style.setProperty(
        "--delay",
        (-Math.random() * 12) + "s"
      );

      particle.style.setProperty(
        "--drift-x",
        ((Math.random() - .5) * 100) + "px"
      );

      const size = 1.5 + Math.random() * 2.5;

      particle.style.width = size + "px";
      particle.style.height = size + "px";

      layer.appendChild(particle);
    }

    siteV4.appendChild(layer);
  }

  /* -------------------------------------------------------
     CINEMATIC SCROLL CAMERA
  ------------------------------------------------------- */

  let ticking = false;

  function updateCinematicScroll() {
    const scrollY =
      window.scrollY ||
      window.pageYOffset ||
      0;

    document.documentElement.style.setProperty(
      "--v4-scroll",
      scrollY + "px"
    );

    const sections = siteV4.querySelectorAll(
      ":scope > section"
    );

    const viewport =
      window.innerHeight || 1;

    sections.forEach(section => {
      const rect =
        section.getBoundingClientRect();

      const center =
        rect.top + rect.height / 2;

      const distance =
        (center - viewport / 2) / viewport;

      const depth =
        Math.max(-1, Math.min(1, distance));

      section.style.setProperty(
        "--v4-depth",
        depth.toFixed(3)
      );

      section.style.setProperty(
        "--v4-camera-y",
        (depth * -12).toFixed(1) + "px"
      );
    });

    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;

      ticking = true;
      requestAnimationFrame(updateCinematicScroll);
    },
    { passive: true }
  );

  updateCinematicScroll();
    /* -------------------------------------------------------
     CINEMATIC SECTION REVEALS
  ------------------------------------------------------- */

  const cinematicSections =
    siteV4.querySelectorAll(
      ":scope > section"
    );

  if (
    !reduceMotionV4 &&
    "IntersectionObserver" in window
  ) {

    const sectionObserver =
      new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add(
              "v4-section-visible"
            );

            const revealItems =
              entry.target.querySelectorAll(
                ".reveal"
              );

            revealItems.forEach((item, index) => {
              item.style.transitionDelay =
                Math.min(index * 90, 450) + "ms";
            });
          });
        },
        {
          threshold: 0.12
        }
      );

    cinematicSections.forEach(section => {
      sectionObserver.observe(section);
    });
  }

  /* -------------------------------------------------------
     GENTLE POINTER PARALLAX
  ------------------------------------------------------- */

  if (
    !reduceMotionV4 &&
    window.matchMedia("(pointer:fine)").matches
  ) {

    let pointerX = 0;
    let pointerY = 0;

    window.addEventListener(
      "pointermove",
      event => {

        pointerX =
          (event.clientX / window.innerWidth - .5);

        pointerY =
          (event.clientY / window.innerHeight - .5);

        siteV4.style.setProperty(
          "--v4-pointer-x",
          pointerX.toFixed(3)
        );

        siteV4.style.setProperty(
          "--v4-pointer-y",
          pointerY.toFixed(3)
        );
      },
      { passive: true }
    );
  }

  /* -------------------------------------------------------
     GALLERY — MOVING PHOTOGRAPH EFFECT
  ------------------------------------------------------- */

  const galleryItems =
    siteV4.querySelectorAll(".gallery-item");

  galleryItems.forEach(item => {

    item.addEventListener(
      "pointermove",
      event => {

        if (
          reduceMotionV4 ||
          window.innerWidth < 800
        ) {
          return;
        }

        const rect =
          item.getBoundingClientRect();

        const x =
          (event.clientX - rect.left) /
          rect.width - .5;

        const y =
          (event.clientY - rect.top) /
          rect.height - .5;

        item.style.transform =
          `translateY(-6px)
           rotateX(${y * -2}deg)
           rotateY(${x * 2}deg)`;
      },
      { passive: true }
    );

    item.addEventListener(
      "pointerleave",
      () => {
        item.style.transform = "";
      },
      { passive: true }
    );

  });
    /* -------------------------------------------------------
     STORY CHAPTER ATMOSPHERE
  ------------------------------------------------------- */

  const storyV4 =
    siteV4.querySelector(".story-section");

  if (storyV4) {

    const tabs =
      storyV4.querySelectorAll(".story-tab");

    const dots =
      storyV4.querySelectorAll(".journey-dot");

    function setChapter(target) {

      storyV4.dataset.chapter = target;

      storyV4.style.setProperty(
        "--story-chapter",
        target
      );
    }

    tabs.forEach(tab => {

      tab.addEventListener(
        "click",
        () => {

          setChapter(
            tab.dataset.story || "0"
          );

        }
      );

    });

    dots.forEach(dot => {

      dot.addEventListener(
        "click",
        () => {

          setChapter(
            dot.dataset.journey || "0"
          );

        }
      );

    });

    const active =
      storyV4.querySelector(
        ".story-tab.active"
      );

    setChapter(
      active?.dataset.story || "0"
    );
  }

  /* -------------------------------------------------------
     FINAL CLOSING REVEAL
  ------------------------------------------------------- */

  const closing =
    siteV4.querySelector(".closing");

  if (
    closing &&
    !reduceMotionV4 &&
    "IntersectionObserver" in window
  ) {

    const closingObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {
/* =========================================================
   CINEMATIC GIFT REVEAL
========================================================= */

const giftRevealBtn =
  document.getElementById("giftRevealBtn");

const giftReveal =
  document.getElementById("giftReveal");

if (giftRevealBtn && giftReveal) {

  giftRevealBtn.addEventListener("click", () => {

    giftReveal.classList.remove("hidden");

    giftRevealBtn.blur();

    setTimeout(() => {

      const firstAccount =
        giftReveal.querySelector(".gift-account-reveal");

      if (firstAccount) {
        firstAccount.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }

    }, 500);

  });

}
            if (
              entry.isIntersecting
            ) {

              closing.classList.add(
                "v4-closing-visible"
              );

            }

          });

        },
        {
          threshold: 0.25
        }
      );

    closingObserver.observe(closing);
  }

})();

/* ===== 3D INVITATION INTERACTION FIX ===== */
(() => {
  const stage = document.getElementById("invitationStage");
  const card = document.getElementById("invitationCard");

  if (!stage || !card) return;

  let resetTimer;

  function tiltCard(x, y) {
    const rect = card.getBoundingClientRect();

    const offsetX = (x - rect.left) / rect.width - 0.5;
    const offsetY = (y - rect.top) / rect.height - 0.5;

    card.style.setProperty(
      "--tilt-y",
      `${offsetX * 24}deg`
    );

    card.style.setProperty(
      "--tilt-x",
      `${offsetY * -20}deg`
    );
  }

  function resetCard() {
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
  }

  stage.addEventListener("pointermove", event => {
    if (event.pointerType === "touch") return;
    tiltCard(event.clientX, event.clientY);
  });

  stage.addEventListener("pointerleave", resetCard);

  stage.addEventListener("touchstart", event => {
    clearTimeout(resetTimer);

    if (event.touches.length) {
      const touch = event.touches[0];
      tiltCard(touch.clientX, touch.clientY);
    }
  }, { passive: true });

  stage.addEventListener("touchmove", event => {
    if (!event.touches.length) return;

    const touch = event.touches[0];
    tiltCard(touch.clientX, touch.clientY);
  }, { passive: true });

  stage.addEventListener("touchend", () => {
    resetTimer = setTimeout(resetCard, 500);
  }, { passive: true });

  stage.addEventListener("touchcancel", resetCard, {
    passive: true
  });
})();

/* ===== CINEMATIC CAMERA MOTION ===== */
(() => {
  const welcome = document.getElementById("welcome");
  const scene = document.querySelector("#welcome .cinema-scene");
  const card = document.getElementById("invitationCard");

  if (!welcome || !scene) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion) return;

  let ticking = false;

  function updateCamera() {
    const height = window.innerHeight || 1;
    const welcomeRect = welcome.getBoundingClientRect();

    // The opening scene slowly moves as the guest scrolls away.
    const progress = Math.max(
      0,
      Math.min(1, (height - welcomeRect.bottom) / height)
    );

    scene.style.setProperty(
      "--camera-progress",
      progress.toFixed(3)
    );

    // Give the invitation a subtle depth response to scrolling.
    if (card) {
      const cardRect = card.getBoundingClientRect();
      const offset = (
        cardRect.top + cardRect.height / 2 - height / 2
      ) / height;

      card.style.setProperty(
        "--scroll-depth",
        Math.max(-1, Math.min(1, offset)).toFixed(3)
      );
    }

    // Gentle parallax between foreground and background sections.
    document.querySelectorAll(
      ".hero, .countdown-section, .story-section, .gallery-section, .closing"
    ).forEach(section => {
      const rect = section.getBoundingClientRect();
      const depth = Math.max(
        -1,
        Math.min(1, (
          rect.top + rect.height / 2 - height / 2
        ) / height)
      );

      section.style.setProperty(
        "--camera-depth",
        depth.toFixed(3)
      );
    });

    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (ticking) return;

    ticking = true;
    requestAnimationFrame(updateCamera);
  }, { passive: true });

  window.addEventListener("resize", updateCamera, {
    passive: true
  });

  updateCamera();
})();
