let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

// Scroll Section
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
        "header nav a[href*='" + id + "']"
      );
      if (correspondingLink) {
        correspondingLink.classList.add("active");
      }
    }
  });

  // Add 'sticky' class to header after scrolling
  let header = document.querySelector("header");
  header.classList.toggle("sticky", scrollPosition > 100);

  //remove toggle icon and navbar when click navbar links (sroll)
  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

//button of slider
let prev = document.querySelector(".prev");
let next = document.querySelector(".next");
let box = document.querySelector(".box");
let boxdesc = document.querySelector(".box-description");

let degrees = 0;

prev.addEventListener("click", function () {
  degrees += 60;
  box.style.transform = `perspective(1200px) rotateY(${degrees}deg)`;
  boxdesc.style.transform = `perspective(1200px) rotateY(${degrees}deg)`;
});

next.addEventListener("click", function () {
  degrees -= 60;
  box.style.transform = `perspective(1200px) rotateY(${degrees}deg)`;
  boxdesc.style.transform = `perspective(1200px) rotateY(${degrees}deg)`;
});
