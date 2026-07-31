/* Veronika Lab — motion (Apple × Linear × Vercel) */

(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isFinePointer = window.matchMedia("(pointer: fine)").matches;

  // Nav scroll state
  const nav = document.getElementById("nav");
  const onScrollNav = () => {
    if (!nav) return;
    nav.classList.toggle("scrolled", window.scrollY > 12);
  };
  window.addEventListener("scroll", onScrollNav, { passive: true });
  onScrollNav();

  // Mobile menu
  const burger = document.getElementById("burger");
  const mobileMenu = document.getElementById("mobileMenu");
  if (burger && mobileMenu) {
    burger.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
      document.body.style.overflow = mobileMenu.classList.contains("open") ? "hidden" : "";
    });
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        document.body.style.overflow = "";
      });
    });
  }

  // Soft cursor glow — green ambient on light bg
  const glow = document.getElementById("cursorGlow");
  let glowX = window.innerWidth / 2;
  let glowY = window.innerHeight / 3;
  let targetX = glowX;
  let targetY = glowY;

  const animateGlow = () => {
    glowX += (targetX - glowX) * 0.08;
    glowY += (targetY - glowY) * 0.08;
    if (glow) {
      glow.style.left = `${glowX}px`;
      glow.style.top = `${glowY}px`;
    }
    requestAnimationFrame(animateGlow);
  };

  if (glow && isFinePointer && !prefersReduced) {
    window.addEventListener(
      "pointermove",
      (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
      },
      { passive: true }
    );
    animateGlow();
  }

  // Parallax — very subtle
  const parallaxEls = document.querySelectorAll(".parallax");
  let ticking = false;
  const onParallax = () => {
    if (prefersReduced) return;
    const y = window.scrollY;
    parallaxEls.forEach((el) => {
      const speed = parseFloat(el.dataset.speed || "0.08");
      el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
    });
    ticking = false;
  };
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(onParallax);
        ticking = true;
      }
    },
    { passive: true }
  );
  onParallax();

  // Reveal on scroll
  const revealEls = document.querySelectorAll(".reveal");
  if (prefersReduced) {
    revealEls.forEach((el) => el.classList.add("visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  }

  // Competency bars
  const compBar = document.querySelector(".comp-bar");
  if (compBar) {
    const barObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            barObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    barObserver.observe(compBar);
  }

  // Magnetic buttons — subtle Apple pull
  if (isFinePointer && !prefersReduced) {
    document.querySelectorAll(".magnetic").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.14}px, ${y * 0.18}px)`;
      });
      el.addEventListener("pointerleave", () => {
        el.style.transform = "translate(0, 0)";
      });
    });
  }

  // Tilt cards — restrained, Linear-like
  if (isFinePointer && !prefersReduced) {
    document.querySelectorAll(".tilt").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rx = (py - 0.5) * -4;
        const ry = (px - 0.5) * 5;
        card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
      });

      card.addEventListener("pointerleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
      });
    });
  }

  // Smooth anchor focus
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", () => {
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      setTimeout(() => {
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }, 500);
    });
  });
})();
