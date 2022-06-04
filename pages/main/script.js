// Make a friend and Get to know buttons

function visitPage() {
  window.location = "../pets/pets.html";
}

// Hamburger

document.querySelector(".hamburger").addEventListener("click", function (e) {
  // console.log(this);
  openMenu();

  const isMenuOpen = this.classList.contains("open");
  if (isMenuOpen) {
    showOverlay();
  } else {
    hideOverlay();
  }

  e.stopPropagation();
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
///////////////
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
  learnMoreBtnEl.onclick = () => {
    console.log("open");
    openModalWindow(pet);
    showOverlay();
  };

  sliderCardEl.append(imgEl, petNameEl, learnMoreBtnEl);

  return sliderCardEl;
}

// Dark overlay when opening modal windows and nav-sidebar
function showOverlay() {
  const overlayEl = document.createElement("div");
  overlayEl.classList.add("overlay");
  document.body.appendChild(overlayEl);
  document.documentElement.classList.add("no-scroll");

  overlayEl.onclick = function () {
    hideMenu();
    hideOverlay();
    closeModalWindow();
  };
}

function hideOverlay() {
  const overlayEl = document.querySelector(".overlay");
  // console.log(overlayEl);
  if (overlayEl) {
    overlayEl.remove();
  }
  document.documentElement.classList.remove("no-scroll");
}

function openMenu() {
  this.classList.toggle("open");
  document.querySelector(".sidebar-menu").classList.toggle("open-menu");
}

function hideMenu() {
  document.querySelector(".hamburger").classList.remove("open");
  document.querySelector(".sidebar-menu").classList.remove("open-menu");
}

// Modal windows
function createModalWindow(pet) {
  const modalEl = document.createElement("div");
  modalEl.classList.add("modal");

  const closeBtnEl = document.createElement("button");
  closeBtnEl.classList.add("close-modal-btn");
  closeBtnEl.onclick = () => {
    closeModalWindow();
    hideOverlay();
  };

  const vectorCloseImgEl = document.createElement("img");
  vectorCloseImgEl.src = "../../assets/icons/Vector1.svg";
  vectorCloseImgEl.alt = "Close modal window button";

  const modalBodyEl = document.createElement("div");
  modalBodyEl.classList.add("modal-body");

  const petImageEl = document.createElement("img");
  petImageEl.classList.add("pet-image");
  petImageEl.src = pet.img;
  petImageEl.alt = "Pet";

  const petCharacterEl = document.createElement("div");
  petCharacterEl.classList.add("pet-character");

  const block1El = document.createElement("div");
  const petNameEl = document.createElement("h3");
  petNameEl.classList.add("pet-name");
  petNameEl.innerText = pet.name;
  const petTypeBreedEl = document.createElement("h4");
  petTypeBreedEl.classList.add("pet-breed");
  petTypeBreedEl.innerText = `${pet.type} - ${pet.breed}`;

  const block2El = document.createElement("div");
  const petDescriptionEl = document.createElement("p");
  petDescriptionEl.classList.add("pet-description");
  petDescriptionEl.innerText = pet.description;

  const block3El = document.createElement("div");
  const petListEl = document.createElement("ul");
  petListEl.classList.add("pet-list");
  const petAgeEl = document.createElement("li");
  petAgeEl.innerHTML = `<span><strong>Age: </strong>${pet.age}</span>`;
  const petInoculationsEl = document.createElement("li");
  petInoculationsEl.innerHTML = `<span><strong>Inoculations: </strong>${pet.inoculations}</span>`;
  const petDiseasesEl = document.createElement("li");
  petDiseasesEl.innerHTML = `<span><strong>Diseases: </strong>${pet.diseases}</span>`;
  const petParasitesEl = document.createElement("li");
  petParasitesEl.innerHTML = `<span><strong>Parasites: </strong>${pet.parasites}</span>`;

  petListEl.append(petAgeEl, petInoculationsEl, petDiseasesEl, petParasitesEl);
  block1El.append(petNameEl, petTypeBreedEl);
  block2El.append(petDescriptionEl);
  block3El.append(petListEl);
  petCharacterEl.append(block1El, block2El, block3El);
  modalBodyEl.append(petImageEl, petCharacterEl);
  closeBtnEl.append(vectorCloseImgEl);
  modalEl.append(closeBtnEl, modalBodyEl);
  return modalEl;
}

function openModalWindow(pet) {
  document.body.append(createModalWindow(pet));
}
function closeModalWindow() {
  const modalWindowEl = document.querySelector(".modal");
  if (modalWindowEl) {
    modalWindowEl.remove();
  }
}

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
