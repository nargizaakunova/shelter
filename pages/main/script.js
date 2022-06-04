// Make a friend and Get to know buttons

function visitPage() {
  window.location = "../pets/pets.html";
}

// Hamburger

document.querySelector(".hamburger").addEventListener("click", function (e) {
  // console.log(this);
  this.classList.toggle("open");
  document.querySelector(".sidebar-menu").classList.toggle("open-menu");

  const isMenuOpen = this.classList.contains("open");
  if (isMenuOpen) {
    showOverlay();
  } else {
    hideOverlay();
  }

  e.stopPropagation();
});

// Close sidebar when clicking out of the links

document.addEventListener("click", function () {
  document.querySelector(".hamburger").classList.remove("open");
  document.querySelector(".sidebar-menu").classList.remove("open-menu");
  hideOverlay();
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

function createSliderCard(pet) {
  // {
  //   "name": "Jennifer",
  //   "img": "../../assets/images/jennifer.png",
  //   "type": "Dog",
  //   "breed": "Labrador",
  //   "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
  //   "age": "2 months",
  //   "inoculations": ["none"],
  //   "diseases": ["none"],
  //   "parasites": ["none"]
  // },
  const sliderCardEl = document.createElement("div");
  sliderCardEl.classList.add("slider-card");

  const imgEl = document.createElement("img");
  imgEl.classList.add("pet-image");
  imgEl.src = pet.img;

  const petNameEl = document.createElement("p");
  petNameEl.classList.add("pet-name");
  petNameEl.innerText = pet.name;

  const learnMoreBtnEl = document.createElement("button");
  learnMoreBtnEl.classList.add("learn-more-btn");
  learnMoreBtnEl.innerText = "Learn more";
  learnMoreBtnEl.onclick = openModalWindow();

  sliderCardEl.append(imgEl, petNameEl, learnMoreBtnEl);

  return sliderCardEl;
}

// Dark overlay when opening modal windows and nav-sidebar
function showOverlay() {
  const overlayEl = document.createElement("div");
  overlayEl.classList.add("overlay");
  document.body.appendChild(overlayEl);
  document.documentElement.classList.add("no-scroll");
}

function hideOverlay() {
  const overlayEl = document.querySelector(".overlay");
  console.log(overlayEl);
  if (overlayEl) {
    overlayEl.remove();
  }
  document.documentElement.classList.remove("no-scroll");
}

// Modal windows
function openModalWindow() {}
function closeModalWindow() {}
// Pagination

// Fetch json file

fetch("../../assets/pets.json")
  .then((response) => response.json())
  .then((pets) => {
    const fragment = new DocumentFragment();

    pets.forEach((pet) => {
      const sliderCard = createSliderCard(pet);
      fragment.append(sliderCard);
    });
    const sliderEl = document.getElementsByClassName("slider");
    if (sliderEl.length > 0) {
      sliderEl[0].append(fragment);
    }
  });
