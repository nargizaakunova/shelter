// Hamburger

document.querySelector(".hamburger").addEventListener("click", function (e) {
  openMenu();
  const isMenuOpen = this.classList.contains("open");
  if (isMenuOpen) {
    showOverlay();
  } else {
    hideOverlay();
  }
  e.stopPropagation();
});

const menuLinksEl = document.querySelectorAll(".sidebar-nav a");
for (let menuLinkEl of menuLinksEl) {
  menuLinkEl.onclick = () => {
    hideMenu();
    hideOverlay();
  };
}

function createSliderCard(pet) {
  const sliderCardEl = document.createElement("div");
  sliderCardEl.classList.add("slider-card");
  sliderCardEl.onclick = (e) => {
    // console.log("open");
    openModalWindow(pet);
    showOverlay();
  };

  const imgEl = document.createElement("img");
  imgEl.classList.add("pet-image");
  imgEl.src = pet.img;
  imgEl.alt = "Pet";

  const petNameEl = document.createElement("p");
  petNameEl.classList.add("pet-name");
  petNameEl.innerText = pet.name;

  const learnMoreBtnEl = document.createElement("button");
  learnMoreBtnEl.classList.add("learn-more-btn");
  learnMoreBtnEl.innerText = "Learn more";

  sliderCardEl.append(imgEl, petNameEl, learnMoreBtnEl);

  return sliderCardEl;
}

// Dark overlay when opening modal windows and nav-sidebar
function showOverlay() {
  const overlayEl = document.createElement("div");
  overlayEl.classList.add("overlay");
  document.body.appendChild(overlayEl);
  document.querySelector("header").style.position = "absolute";
  document.querySelector("header").style.zIndex = "unset";
  document.querySelector(".sidebar-menu").style.position = "fixed";
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
  document.querySelector("header").style.position = "fixed";
  document.querySelector("header").style.zIndex = "1";
  document.querySelector(".sidebar-menu").style.position = "absolute";
  document.documentElement.classList.remove("no-scroll");
}

function openMenu() {
  const hamburgerBtnEl = document.querySelector(".hamburger");
  hamburgerBtnEl.classList.toggle("open");
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

let pets = [];
let generatedPets = [];

let itemsPerPage = 8;
let currentPage = 1;
let pagesCount = 1;

function calcItemsPerPageAndRow() {
  if (window.innerWidth >= 1280) {
    itemsPerPage = 8;
  } else if (window.innerWidth >= 768) {
    itemsPerPage = 6;
  } else {
    itemsPerPage = 3;
  }
  pagesCount = 48 / itemsPerPage;
}

// Pagination
function createPagination(pagesCount) {
  const paginationEl = document.createElement("div");
  paginationEl.classList.add("pagination");

  const btnStartEl = document.createElement("button");
  btnStartEl.classList.add("btn-page", "to-start", "btn-page-styler");
  btnStartEl.innerHTML = "&lt;&lt;";
  btnStartEl.disabled = currentPage === 1;
  btnStartEl.onclick = () => {
    currentPage = 1;
    btnCurrentPageEl.innerText = currentPage;

    btnPrevEl.disabled = true;
    btnStartEl.disabled = true;

    btnNextEl.disabled = false;
    btnEndEl.disabled = false;

    renderCurrentPage();
  };

  const btnPrevEl = document.createElement("button");
  btnPrevEl.classList.add("btn-page", "back", "btn-page-styler");
  btnPrevEl.innerHTML = "&lt;";
  btnPrevEl.disabled = currentPage === 1;
  btnPrevEl.onclick = () => {
    btnCurrentPageEl.innerText = --currentPage;

    if (currentPage === 1) {
      btnPrevEl.disabled = true;
      btnStartEl.disabled = true;
    }
    btnNextEl.disabled = false;
    btnEndEl.disabled = false;

    renderCurrentPage();
  };

  const btnCurrentPageEl = document.createElement("button");
  btnCurrentPageEl.classList.add("btn-page", "current", "btn-page-styler");
  btnCurrentPageEl.innerText = currentPage;

  const btnNextEl = document.createElement("button");
  btnNextEl.classList.add("btn-page", "next", "btn-page-styler");
  btnNextEl.innerHTML = "&gt;";
  btnNextEl.disabled = currentPage === pagesCount;
  btnNextEl.onclick = () => {
    btnCurrentPageEl.innerText = ++currentPage;

    if (currentPage === pagesCount) {
      btnNextEl.disabled = true;
      btnEndEl.disabled = true;
    }
    btnPrevEl.disabled = false;
    btnStartEl.disabled = false;

    renderCurrentPage();
  };

  const btnEndEl = document.createElement("button");
  btnEndEl.classList.add("btn-page", "to-end", "btn-page-styler");
  btnEndEl.innerHTML = "&gt;&gt;";
  btnEndEl.disabled = currentPage === pagesCount;
  btnEndEl.onclick = () => {
    currentPage = pagesCount;
    btnCurrentPageEl.innerText = currentPage;

    btnPrevEl.disabled = false;
    btnStartEl.disabled = false;

    btnNextEl.disabled = true;
    btnEndEl.disabled = true;

    renderCurrentPage();
  };

  paginationEl.append(
    btnStartEl,
    btnPrevEl,
    btnCurrentPageEl,
    btnNextEl,
    btnEndEl
  );
  return paginationEl;
}

function showPagination() {
  const paginationEl = document.querySelector(".pagination");
  if (paginationEl) {
    paginationEl.remove();
  }
  document
    .querySelector(".slide-wrapper")
    .appendChild(createPagination(pagesCount));
}
function renderPets(items) {
  const fragment = new DocumentFragment();

  items.forEach((pet) => {
    const sliderCard = createSliderCard(pet);
    fragment.append(sliderCard);
  });
  const sliderEl = document.getElementsByClassName("slider");
  if (sliderEl.length > 0) {
    sliderEl[0].replaceChildren(fragment);
  }
}

function generatePets(pets) {
  let result = [];
  calcItemsPerPageAndRow();

  if (currentPage > pagesCount) {
    currentPage = 1;
  }

  let startFrom = 0;
  for (let i = 0; i < pagesCount; i++) {
    /*
    [1.2.3.4.5.6.7.8]
    0 [123] 
    3 [456]
    6 [781] // 9
    1 [234]
    */
    result.push(...shuffleArray(getSlice(pets, itemsPerPage, startFrom)));
    startFrom = startFrom + itemsPerPage;
    if (startFrom > pets.length - 1) {
      startFrom = startFrom - pets.length;
    }
  }
  generatedPets = result;
}

function getSlice(items, sliceCount, startFrom) {
  let result = [];
  if (startFrom + sliceCount > items.length) {
    result.push(...items.slice(startFrom));
    // 12345678
    result.push(...items.slice(0, startFrom + sliceCount - items.length));
  } else {
    result.push(...items.slice(startFrom, sliceCount + startFrom));
  }
  return result;
}

function shuffleArray(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function renderCurrentPage() {
  // [] 48
  // currentPage 1
  // itemsPerPage 8
  // 48 [0...7] === currentPage 1
  // 48 [8...15] === currentPage 2
  const offset = (currentPage - 1) * itemsPerPage;
  const chunk = generatedPets.slice(offset, offset + itemsPerPage);
  renderPets(chunk);
}

// Fetch json file

fetch("../../assets/pets.json")
  .then((response) => response.json())
  .then((items) => {
    pets = shuffleArray(items);
    generatePets(pets);
    renderCurrentPage();
    showPagination();
  });

window.onresize = () => {
  generatePets(pets);
  renderCurrentPage();
  showPagination();
};
