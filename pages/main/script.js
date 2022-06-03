// Make a friend and Get to know buttons

function visitPage() {
  window.location = "../pets/pets.html";
}

// Hamburger

document.querySelector(".hamburger").addEventListener("click", function (e) {
  console.log(this);
  this.classList.toggle("open");
  e.stopPropagation();
});

document.querySelector(".hamburger").addEventListener("click", function (e) {
  console.log(this);
  document.querySelector(".sidebar-menu").classList.toggle("open-menu");
  e.stopPropagation();
});

// Close sidebar when clicking out of the links

document.addEventListener("click", function () {
  document.querySelector(".hamburger").classList.remove("open");
  document.querySelector(".sidebar-menu").classList.remove("open-menu");
});

let page = 0;

// Carousel
function slideTo(page) {
  document.querySelector(".slider").scrollTo({
    left: page * 3 * (270 + 90),
    behavior: "smooth",
  });
}
const btnLeftEl = document.querySelector(".arrow-left-btn");
btnLeftEl.addEventListener("click", function (e) {
  page--;
  slideTo(page);
});

const btnRightEl = document.querySelector(".arrow-right-btn");
btnRightEl.addEventListener("click", function (e) {
  page++;
  slideTo(page);
});

// Dark overlay when opening modal windows and nav-sidebar

// Modal windows

// Pagination
