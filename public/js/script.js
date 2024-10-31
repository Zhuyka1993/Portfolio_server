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

 //Button of language
 const toggle = document.getElementById('toggle');

// Додавання події для переходу на відповідну сторінку
toggle.addEventListener('change', () => {
    if (toggle.checked) {
        // Перехід на англійську версію
        window.location.href = '/main'; // Змінили на маршрут для англійської версії
    } else {
        // Перехід на українську версію
        window.location.href = '/mainUk'; // Змінили на маршрут для української версії
    }
});

// Перевірка локального сховища при завантаженні сторінки
window.onload = () => {
    const isChecked = localStorage.getItem('toggleState') === 'true';
    toggle.checked = isChecked;
};

// Додавання події для збереження стану перемикача
toggle.addEventListener('change', () => {
    const isChecked = toggle.checked;

    // Зберігання стану у локальному сховищі
    localStorage.setItem('toggleState', isChecked);
});

//end of button lang

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


