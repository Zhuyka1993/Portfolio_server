let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

// =====================
// Burger menu
// =====================

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

// =====================
// Scroll Section
// =====================

window.onscroll = () => {
  let scrollPosition = window.scrollY;

  sections.forEach((sec) => {
    let top = sec.offsetTop - 100;
    let offset = top + sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (scrollPosition >= top && scrollPosition < offset) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
      });

      let correspondingLink = document.querySelector(
        `header nav a[href*="${id}"]`
      );

      if (correspondingLink) {
        correspondingLink.classList.add("active");
      }
    }
  });

  // Sticky Header
  let header = document.querySelector("header");
  header.classList.toggle("sticky", scrollPosition > 100);

  // Закривати меню після вибору пункту
  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

// =====================
// Portfolio Slider
// =====================

let prev = document.querySelector(".prev");
let next = document.querySelector(".next");
let box = document.querySelector(".box");
let boxdesc = document.querySelector(".box-description");

let degrees = 0;

function rotateCarousel() {
  box.style.transform = `perspective(1200px) rotateY(${degrees}deg)`;
  boxdesc.style.transform = `perspective(1200px) rotateY(${degrees}deg)`;
}

function nextSlide() {
  degrees -= 60;
  rotateCarousel();
}

function prevSlide() {
  degrees += 60;
  rotateCarousel();
}

// Якщо карусель існує
if (prev && next && box && boxdesc) {
  prev.addEventListener("click", prevSlide);
  next.addEventListener("click", nextSlide);

  // =====================
  // Swipe для телефонів
  // =====================

  let startX = 0;
  let endX = 0;

  const slider = document.querySelector(".portfolio");

  if (slider) {
    slider.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    slider.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX;

      const distance = endX - startX;

      // Ігноруємо випадкові короткі рухи
      if (Math.abs(distance) < 50) return;

      if (distance < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    });
  }
}