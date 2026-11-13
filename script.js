/* =========================================================
   TSION MELAKE — PORTFOLIO SCRIPTS
   ========================================================= */

/* ---------------------------------------------------------
   1. NAVBAR — scroll effect & active link highlighting
   --------------------------------------------------------- */
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  // add glass background when scrolled
  if (window.scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // highlight the active nav link
  let current = "";
  sections.forEach((sec) => {
    if (window.scrollY >= sec.offsetTop - 100) {
      current = sec.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });

  // show / hide back-to-top button
  const topBtn = document.getElementById("topBtn");
  if (topBtn) {
    if (window.scrollY > 400) {
      topBtn.classList.add("show");
    } else {
      topBtn.classList.remove("show");
    }
  }
});

/* ---------------------------------------------------------
   2. HAMBURGER MENU
   --------------------------------------------------------- */
const hamburger = document.getElementById("hamburger");
const navLinksList = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinksList.classList.toggle("open");
});

// close menu when a link is clicked
navLinksList.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinksList.classList.remove("open");
  });
});

// close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!navbar.contains(e.target)) {
    hamburger.classList.remove("open");
    navLinksList.classList.remove("open");
  }
});

/* ---------------------------------------------------------
   3. TYPING ANIMATION
   --------------------------------------------------------- */
const roles = ["Software Engineering Student", "Frontend Developer"];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById("typed");

function typeLoop() {
  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    // typing
    typedEl.textContent = currentRole.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentRole.length) {
      // pause before deleting
      setTimeout(() => {
        isDeleting = true;
        typeLoop();
      }, 1800);
      return;
    }
  } else {
    // deleting
    typedEl.textContent = currentRole.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  const speed = isDeleting ? 60 : 95;
  setTimeout(typeLoop, speed);
}

// start after a short delay
setTimeout(typeLoop, 600);

/* ---------------------------------------------------------
   4. SCROLL-REVEAL (IntersectionObserver)
   --------------------------------------------------------- */
const revealElements = document.querySelectorAll(
  ".fade-up, .fade-left, .fade-right",
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target); // animate once
      }
    });
  },
  { threshold: 0.12 },
);

revealElements.forEach((el) => revealObserver.observe(el));

/* ---------------------------------------------------------
   5. SKILL BAR ANIMATION
   --------------------------------------------------------- */
const skillFills = document.querySelectorAll(".skill-fill");

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const width = target.getAttribute("data-width");
        target.style.width = width + "%";
        skillObserver.unobserve(target);
      }
    });
  },
  { threshold: 0.4 },
);

skillFills.forEach((fill) => skillObserver.observe(fill));

/* ---------------------------------------------------------
   6. CONTACT FORM VALIDATION
   --------------------------------------------------------- */
const form = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

function showError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;
}
function clearErrors() {
  ["nameErr", "emailErr", "subjectErr", "msgErr"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.textContent = "";
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();
    let isValid = true;

    if (!name) {
      showError("nameErr", "Please enter your name.");
      isValid = false;
    }
    if (!email) {
      showError("emailErr", "Please enter your email address.");
      isValid = false;
    } else if (!isValidEmail(email)) {
      showError("emailErr", "Please enter a valid email address.");
      isValid = false;
    }
    if (!subject) {
      showError("subjectErr", "Please enter a subject.");
      isValid = false;
    }
    if (!message) {
      showError("msgErr", "Please write your message.");
      isValid = false;
    }

    if (!isValid) return;

    // Simulate sending (no real backend)
    const submitBtn = document.getElementById("submitBtn");
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    setTimeout(() => {
      form.reset();
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      submitBtn.disabled = false;
      formSuccess.classList.add("show");

      // hide success message after 5 seconds
      setTimeout(() => formSuccess.classList.remove("show"), 5000);
    }, 1200);
  });

  // clear error on input
  form.querySelectorAll("input, textarea").forEach((input) => {
    input.addEventListener("input", () => {
      const errId = input.id + "Err";
      // map textarea id "message" → "msgErr"
      const mapped = input.id === "message" ? "msgErr" : errId;
      const el = document.getElementById(mapped);
      if (el) el.textContent = "";
    });
  });
}

/* ---------------------------------------------------------
   7. BACK TO TOP
   --------------------------------------------------------- */
const topBtn = document.getElementById("topBtn");
if (topBtn) {
  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ---------------------------------------------------------
   8. SMOOTH ACTIVE NAV ON CLICK
   --------------------------------------------------------- */
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
  });
});
