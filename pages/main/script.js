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

const menuLinksEl = document.querySelectorAll(".sidebar-nav a");
for (let menuLinkEl of menuLinksEl) {
  menuLinkEl.onclick = () => {
    hideMenu();
    hideOverlay();
  };
}

let page = 0;
let pageOffset = 0;
let pets = [];
let sliderCount = 3;
let gap = 90;

function calcGapAndSliderCount() {
  if (window.innerWidth >= 1280) {
    gap = 90;
    sliderCount = 3;
  }
  if (window.innerWidth < 1280 && window.innerWidth >= 821) {
    gap = 60;
    sliderCount = 2;
  }
  if (window.innerWidth < 821 && window.innerWidth >= 768) {
    gap = 40;
    sliderCount = 2;
  }
  if (window.innerWidth < 768 && window.innerWidth >= 300) {
    gap = 0;
    sliderCount = 1;
  }
}

// Carousel
function slideTo(page) {
  // window width for carousel
  calcGapAndSliderCount();

  document.querySelector(".slider").scrollTo({
    left: page * sliderCount * (270 + gap),
    behavior: "smooth",
  });
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

const btnLeftEl = document.querySelector(".arrow-left-btn");
btnLeftEl.addEventListener("click", function (e) {
  page--;
  pageOffset--;

  if (page < 0) {
    page = 0;

    let startFrom = pets.length - Math.abs(pageOffset) * sliderCount;
    if (startFrom < 0) {
      startFrom = pets.length - (Math.abs(startFrom) % pets.length);
    }

    const items = shuffleArray(getSlice(pets, sliderCount, startFrom));
    addItemsToSlider(items, true);

    document.querySelector(".slider").scrollTo({
      left: (page + 1) * sliderCount * (270 + gap),
    });

    setTimeout(() => {
      slideTo(page);
    }, 100);
  } else {
    slideTo(page);
  }
});

const btnRightEl = document.querySelector(".arrow-right-btn");
btnRightEl.addEventListener("click", function (e) {
  page++;
  pageOffset++;

  let startFrom =
    page * sliderCount > pets.length
      ? (page * sliderCount) % pets.length
      : page * sliderCount;
  const items = shuffleArray(getSlice(pets, sliderCount, startFrom));
  addItemsToSlider(items);

  setTimeout(() => {
    slideTo(page);
  }, 100);
});

window.onresize = () => {
  page = 0;
  renderInitialSlides(pets);
  slideTo(page);
};
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
  sliderCardEl.onclick = () => {
    console.log("open");
    openModalWindow(pet);
    showOverlay();
  };

  const imgEl = document.createElement("img");
  imgEl.classList.add("pet-image");
  imgEl.src = pet.img;

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

// Fetch json file

fetch("../../assets/pets.json")
  .then((response) => response.json())
  .then((items) => {
    pets = shuffleArray(items);

    renderInitialSlides(pets);
  });

function renderInitialSlides(pets) {
  // sliderCount
  calcGapAndSliderCount();

  const items = shuffleArray(getSlice(pets, sliderCount, page));
  addItemsToSlider(items, false, true);
}

function addItemsToSlider(items, toBeginning, replace) {
  const fragment = new DocumentFragment();

  items.forEach((pet) => {
    const sliderCard = createSliderCard(pet);
    fragment.append(sliderCard);
  });

  const sliderEl = document.getElementsByClassName("slider");

  if (sliderEl.length > 0) {
    if (replace) {
      sliderEl[0].innerHTML = "";
    }

    if (toBeginning) {
      sliderEl[0].prepend(fragment);
    } else {
      sliderEl[0].append(fragment);
    }
  }
}
