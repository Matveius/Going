var menu = document.querySelector(".menu");
var closeIcon = document.querySelector(".close-menu-btn");
var overlay = document.querySelector(".overlay");

function openMenu() {
  menu.style.display = "flex";
  closeIcon.style.display = "inline-block";
  overlay.style.display = "block";
  document.body.classList.add("no-scroll");
}

document.querySelector(".burger-button").addEventListener("click", openMenu);
document.querySelector(".close-menu-btn").addEventListener("click", closeMenu);

function closeMenu() {
  if (window.innerWidth <= 1176) {
    menu.style.display = "none";
    closeIcon.style.display = "none";
    overlay.style.display = "none";
    document.body.classList.remove("no-scroll");
  }
}

function scrollToAnchor(target) {
  var element = document.querySelector(target);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
    });
  }
}

var secondSectionItem = document.querySelector(".second-section-href");
secondSectionItem.addEventListener("click", function (event) {
  closeMenu();
  var target = event.target.getAttribute("href");
  scrollToAnchor(target);
});
