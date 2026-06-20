const revealItems = document.querySelectorAll(".reveal");
const parallaxCards = document.querySelectorAll(".parallax-card");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hero = document.querySelector(".hero");
const heroTitle = document.querySelector("#hero-title");
const heroPhone = document.querySelector(".phone-hero");
const tiltCard = document.querySelector("[data-tilt-card]");

function splitHeroTitle() {
  if (!heroTitle || heroTitle.dataset.split === "true") return;

  const lines = ["Archive the", "colors you eat."];
  heroTitle.textContent = "";
  lines.forEach((line) => {
    const outer = document.createElement("span");
    const inner = document.createElement("span");
    outer.className = "hero-line";
    inner.textContent = line;
    outer.appendChild(inner);
    heroTitle.appendChild(outer);
  });
  heroTitle.dataset.split = "true";
}

function runHeroIntro() {
  splitHeroTitle();

  const gsapInstance = window.gsap;
  if (reducedMotion || !gsapInstance) {
    if (!reducedMotion) {
      runNativeHeroIntro();
      return;
    }
    document.querySelectorAll(".hero-line span, .hero-kicker, .hero-subhead, .hero .cta-row, .phone-hero, .scroll-cue")
      .forEach((item) => {
        item.style.opacity = "1";
        item.style.filter = "none";
      });
    return;
  }

  const timeline = gsapInstance.timeline({ defaults: { ease: "power3.out" } });

  gsapInstance.set([".hero-kicker", ".hero-line span", ".hero-subhead", ".hero .cta-row", ".phone-hero", ".scroll-cue"], {
    autoAlpha: 0,
  });
  gsapInstance.set(".hero-line span", { yPercent: 110, filter: "blur(16px)" });
  gsapInstance.set(".hero-subhead", { y: 16, filter: "blur(10px)" });
  gsapInstance.set(".hero .cta-row", { y: 14, filter: "blur(8px)" });
  gsapInstance.set(".phone-hero", { "--intro-y": "18px", filter: "blur(8px)" });
  gsapInstance.set(".story-dot", { scale: 0, autoAlpha: 0 });
  gsapInstance.set(".story-line", { scaleX: 0, autoAlpha: 0 });
  gsapInstance.set(".scroll-cue", { "--cue-y": "-8px" });

  timeline
    .to(".story-dot", { scale: 1, autoAlpha: 1, duration: 0.8 }, 0.18)
    .to(".story-line", { scaleX: 1, autoAlpha: 0.62, duration: 1.75 }, 0.68)
    .to(".story-dot", { x: () => Math.min(window.innerWidth * 0.72, 768), autoAlpha: 0.2, duration: 1.7 }, 0.72)
    .to(".story-line", { x: "18vw", autoAlpha: 0.2, duration: 1.7 }, 1.45)
    .to(".hero-kicker", { autoAlpha: 1, duration: 0.7 }, 0.55)
    .to(".hero-line span", { yPercent: 0, autoAlpha: 1, filter: "blur(0px)", duration: 1.05, stagger: 0.16 }, 0.92)
    .to(".hero-subhead", { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.78 }, 1.62)
    .to(".hero .cta-row", { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.74 }, 1.9)
    .to(".phone-hero", { "--intro-y": "0px", autoAlpha: 1, filter: "blur(0px)", duration: 1.12 }, 1.08)
    .to(".story-dot", { autoAlpha: 0, duration: 0.62 }, 2.15)
    .to(".scroll-cue", { "--cue-y": "0px", autoAlpha: 1, duration: 0.7 }, 2.28)
    .to(".story-line", { autoAlpha: 0.08, duration: 1.2 }, 2.4);

  gsapInstance.to(".phone-hero", {
    "--float-y": "-10px",
    duration: 4.8,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    delay: 2.2,
  });
}

function runNativeHeroIntro() {
  const lineSpans = document.querySelectorAll(".hero-line span");
  const kicker = document.querySelector(".hero-kicker");
  const subhead = document.querySelector(".hero-subhead");
  const ctas = document.querySelector(".hero .cta-row");
  const phone = document.querySelector(".phone-hero");
  const cue = document.querySelector(".scroll-cue");
  const dot = document.querySelector(".story-dot");
  const line = document.querySelector(".story-line");

  [...lineSpans, kicker, subhead, ctas, phone, cue].forEach((item) => {
    if (!item) return;
    item.style.opacity = "0";
  });

  lineSpans.forEach((span, index) => {
    span.animate(
      [
        { transform: "translateY(110%)", opacity: 0, filter: "blur(16px)" },
        { transform: "translateY(0)", opacity: 1, filter: "blur(0px)" },
      ],
      { duration: 1050, delay: 920 + index * 160, easing: "cubic-bezier(.22,1,.36,1)", fill: "forwards" }
    );
  });

  kicker?.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: 700,
    delay: 550,
    easing: "ease-out",
    fill: "forwards",
  });

  subhead?.animate(
    [
      { transform: "translateY(16px)", opacity: 0, filter: "blur(10px)" },
      { transform: "translateY(0)", opacity: 1, filter: "blur(0px)" },
    ],
    { duration: 780, delay: 1620, easing: "cubic-bezier(.22,1,.36,1)", fill: "forwards" }
  );

  ctas?.animate(
    [
      { transform: "translateY(14px)", opacity: 0, filter: "blur(8px)" },
      { transform: "translateY(0)", opacity: 1, filter: "blur(0px)" },
    ],
    { duration: 740, delay: 1900, easing: "cubic-bezier(.22,1,.36,1)", fill: "forwards" }
  );

  phone?.animate(
    [
      { opacity: 0, filter: "blur(8px)" },
      { opacity: 1, filter: "blur(0px)" },
    ],
    { duration: 1120, delay: 1080, easing: "cubic-bezier(.22,1,.36,1)", fill: "forwards" }
  );

  cue?.animate(
    [
      { opacity: 0, transform: "translate(-50%, -8px)" },
      { opacity: 1, transform: "translate(-50%, 0)" },
    ],
    { duration: 700, delay: 2280, easing: "cubic-bezier(.22,1,.36,1)", fill: "forwards" }
  );

  dot?.animate(
    [
      { transform: "translateY(-50%) scale(0)", opacity: 0 },
      { transform: "translateY(-50%) scale(1)", opacity: 1, offset: 0.28 },
      { transform: `translate(${Math.min(window.innerWidth * 0.72, 768)}px, -50%) scale(1)`, opacity: 0 },
    ],
    { duration: 2600, delay: 180, easing: "cubic-bezier(.22,1,.36,1)", fill: "forwards" }
  );

  line?.animate(
    [
      { transform: "translateY(-50%) scaleX(0)", opacity: 0 },
      { transform: "translateY(-50%) scaleX(1)", opacity: 0.62, offset: 0.5 },
      { transform: "translate(18vw, -50%) scaleX(1)", opacity: 0.08 },
    ],
    { duration: 3600, delay: 680, easing: "cubic-bezier(.22,1,.36,1)", fill: "forwards" }
  );
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { rootMargin: "0px 0px -10% 0px", threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

let ticking = false;

function updateParallax() {
  const midpoint = window.innerHeight / 2;

  parallaxCards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    const distance = (rect.top + rect.height / 2 - midpoint) / midpoint;
    const offset = Math.max(-1, Math.min(1, distance)) * -10;
    card.style.setProperty("--parallax-y", `${offset}px`);
  });

  ticking = false;
}

function requestParallax() {
  if (!ticking) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
}

if (!reducedMotion) {
  updateParallax();
  window.addEventListener("scroll", requestParallax, { passive: true });
  window.addEventListener("resize", requestParallax);
}

if (!reducedMotion && hero && tiltCard && heroPhone) {
  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    heroPhone.style.setProperty("--tilt-y", `${x * 7}deg`);
    heroPhone.style.setProperty("--tilt-x", `${y * -5}deg`);
  });

  hero.addEventListener("pointerleave", () => {
    heroPhone.style.setProperty("--tilt-y", "0deg");
    heroPhone.style.setProperty("--tilt-x", "0deg");
  });
}

window.addEventListener("DOMContentLoaded", runHeroIntro);
