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

  // Scroll progress bar
  const progressEl = document.getElementById("scrollProgress");
  const updateProgress = () => {
    if (!progressEl) return;
    const doc = document.documentElement;
    const scrollTop = window.scrollY || doc.scrollTop;
    const height = doc.scrollHeight - doc.clientHeight;
    const p = height > 0 ? (scrollTop / height) * 100 : 0;
    progressEl.style.width = `${Math.min(100, Math.max(0, p))}%`;
  };
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress, { passive: true });
  updateProgress();

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

  // Reveal on scroll — staggered for siblings in groups
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
      { threshold: 0.06, rootMargin: "0px 0px -6% 0px" }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  }

  // Stagger children inside visible groups (cases, method, tools)
  const staggerGroups = document.querySelectorAll(
    ".cases-list, .method-cycle, .tools-grid, .timeline--cards, .about__trio, .books-grid"
  );
  if (!prefersReduced) {
    staggerGroups.forEach((group) => {
      const kids = group.querySelectorAll(
        ":scope > .case, :scope > .method-node, :scope > .tool-card, :scope > .timeline__item, :scope > .about-card, :scope > .book-card"
      );
      kids.forEach((kid, i) => {
        if (!kid.classList.contains("reveal")) {
          kid.style.transitionDelay = `${Math.min(i * 0.06, 0.42)}s`;
        }
      });
    });
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

  // Like button — shared count via localStorage + optional shared seed
  const likeBtn = document.getElementById("likeBtn");
  const likeCountEl = document.getElementById("likeCount");
  const likeThanks = document.getElementById("likeThanks");
  const LIKE_KEY = "vpm_liked";
  const COUNT_KEY = "vpm_like_count";
  const BASE_LIKES = 47; // seed so the counter doesn't start empty

  if (likeBtn && likeCountEl) {
    const storedCount = parseInt(localStorage.getItem(COUNT_KEY) || "", 10);
    let count = Number.isFinite(storedCount) ? storedCount : BASE_LIKES;
    let liked = localStorage.getItem(LIKE_KEY) === "1";

    const renderLike = () => {
      likeCountEl.textContent = String(count);
      likeBtn.classList.toggle("is-liked", liked);
      likeBtn.setAttribute("aria-pressed", liked ? "true" : "false");
      likeBtn.setAttribute("aria-label", liked ? "Убрать лайк" : "Поставить лайк");
      if (likeThanks) likeThanks.hidden = !liked;
    };

    renderLike();

    likeBtn.addEventListener("click", () => {
      if (liked) {
        liked = false;
        count = Math.max(BASE_LIKES - 1, count - 1);
        localStorage.setItem(LIKE_KEY, "0");
      } else {
        liked = true;
        count += 1;
        localStorage.setItem(LIKE_KEY, "1");
        // confetti-like burst via brief re-trigger of animation
        likeBtn.classList.remove("is-liked");
        void likeBtn.offsetWidth;
      }
      localStorage.setItem(COUNT_KEY, String(count));
      renderLike();
    });
  }

  // Horizontal scroll: drag support on desktop + keyboard
  document.querySelectorAll("[data-h-scroll]").forEach((scroller) => {
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    scroller.addEventListener("pointerdown", (e) => {
      if (window.matchMedia("(max-width: 768px)").matches === false) return;
      // ignore if clicking a link/button
      if (e.target.closest("a, button")) return;
      isDown = true;
      startX = e.clientX;
      scrollLeft = scroller.scrollLeft;
      scroller.setPointerCapture?.(e.pointerId);
    });

    scroller.addEventListener("pointermove", (e) => {
      if (!isDown) return;
      const dx = e.clientX - startX;
      scroller.scrollLeft = scrollLeft - dx;
    });

    const endDrag = () => {
      isDown = false;
    };
    scroller.addEventListener("pointerup", endDrag);
    scroller.addEventListener("pointercancel", endDrag);
    scroller.addEventListener("pointerleave", endDrag);
  });
})();
