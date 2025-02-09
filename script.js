/******************************************************
 * script.js
 * Contains:
 * 1) Dynamic Generation of 50 Currency Signs
 * 2) Smooth Scroll for internal anchor links
 * 3) Scroll-to-Top Button
 * 4) Simple Contact Form Alert
 * 5) Intersection Observer for on-scroll animations
 ******************************************************/
// DARK/LIGHT MODE TOGGLE
document.addEventListener("DOMContentLoaded", function() {
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  // Check for saved user preference in localStorage
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    themeToggle.textContent = "☀️"; // Sun icon for light mode option
  }

  themeToggle.addEventListener("click", function () {
    body.classList.toggle("dark-mode");
    // Update button icon
    if (body.classList.contains("dark-mode")) {
      themeToggle.textContent = "☀️";
      localStorage.setItem("theme", "dark");
    } else {
      themeToggle.textContent = "🌙";
      localStorage.setItem("theme", "light");
    }
  });
});

// 1) DYNAMIC GENERATION OF 50 CURRENCY SIGNS
document.addEventListener("DOMContentLoaded", function() {
  const currencyContainer = document.querySelector('.currency-background');
  if (currencyContainer) {
    // Clear any existing content
    currencyContainer.innerHTML = "";
    const currencySymbols = ["$", "€", "£", "¥", "₹"];
    // Generate 50 spans
    for (let i = 0; i < 500; i++) {
      const span = document.createElement('span');
      // Pick a random currency symbol
      span.textContent = currencySymbols[Math.floor(Math.random() * currencySymbols.length)];
      // Randomize position (left and top between 0% and 100%)
      span.style.left = Math.random() * 100 + '%';
      span.style.top = Math.random() * 100 + '%';
      // Randomize font size between 2rem and 4rem
      span.style.fontSize = (Math.random() * 2 + 2) + 'rem';
      // Randomize animation duration between 5s and 10s
      const duration = Math.random() * 5 + 5;
      // Apply inline animation style using a keyframe defined below in the CSS
      span.style.animation = `moveUpDown ${duration}s ease-in-out infinite`;
      currencyContainer.appendChild(span);
    }
  }
});

// (Define the keyframes in CSS or via JavaScript? We already have keyframes in CSS.)
// If not defined in CSS, you can add them to style.css. (We assume keyframes are in style.css if needed.)

// 2) SMOOTH SCROLL for all internal links (if present)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const targetID = this.getAttribute('href');
    if (targetID && targetID.length > 1) {
      e.preventDefault();
      const targetSection = document.querySelector(targetID);
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  });
});

// 3) SCROLL-TO-TOP BUTTON
const scrollTopBtn = document.createElement('button');
scrollTopBtn.textContent = '↑';
scrollTopBtn.id = 'scrollTopBtn';
scrollTopBtn.style.position = 'fixed';
scrollTopBtn.style.bottom = '20px';
scrollTopBtn.style.right = '20px';
scrollTopBtn.style.padding = '0.5rem 1rem';
scrollTopBtn.style.fontSize = '1.2rem';
scrollTopBtn.style.display = 'none';
scrollTopBtn.style.cursor = 'pointer';
scrollTopBtn.style.backgroundColor = '#007BFF';
scrollTopBtn.style.color = '#fff';
scrollTopBtn.style.border = 'none';
scrollTopBtn.style.borderRadius = '4px';
scrollTopBtn.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
scrollTopBtn.style.zIndex = '999';
scrollTopBtn.style.transition = 'opacity 0.3s';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollTopBtn.style.display = 'block';
    scrollTopBtn.style.opacity = '1';
  } else {
    scrollTopBtn.style.opacity = '0';
    setTimeout(() => {
      if (window.scrollY <= 300) {
        scrollTopBtn.style.display = 'none';
      }
    }, 300);
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

// 4) SIMPLE CONTACT FORM ALERT
const contactForm = document.querySelector('#contact form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for reaching out! I will get back to you soon.');
    contactForm.reset();
  });
}

// 5) ON-SCROLL ANIMATIONS USING INTERSECTION OBSERVER
const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');

const appearOptions = {
  threshold: 0.1,
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('appear');
    observer.unobserve(entry.target);
  });
}, appearOptions);

animatedElements.forEach((el) => {
  appearOnScroll.observe(el);
});
