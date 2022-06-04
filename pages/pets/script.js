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

// Dark overlay when opening modal windows and nav-sidebar
function showOverlay() {
  const overlayEl = document.createElement("div");
  overlayEl.classList.add("overlay");
  document.body.appendChild(overlayEl);
  document.querySelector("header").style.position = "absolute";
  document.querySelector("header").style.zIndex = "unset";
  document.querySelector(".sidebar-menu").style.position = "fixed";
  document.documentElement.classList.add("no-scroll");
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
