/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * to check element is in viewport
 * top & left >=0
 * right <= width(vp)
 * bottom <= height(vp)
 * box.getBoundingClientRect();
 * vp>>width = window.innerWidth || document.documentElement.clientWidth
 * vp>>height = window.innerHeight || document.documentElement.clientHeight
 */
function elementIsInViewPort(element) {
  const elementRect = element.getBoundingClientRect();
  return (
    elementRect.top >= 0 &&
    elementRect.left >= 0 &&
    elementRect.right <=
      (window.innerWidth || document.documentElement.clientWidth) &&
    elementRect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight)
  );
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
function buildNav() {
  const sections = document.querySelectorAll("section");
  const myUl = document.querySelector("ul");
  const docFrag = document.createDocumentFragment();
  sections.forEach((section) => {
    let myLink = document.createElement("li");
    myLink.innerHTML = `<a href="#${
      section.id
    }" class="menu__link">${section.getAttribute("data-nav")}</a>`;
    // myLink.className = `menu__link`;
    // myLink.setAttribute("href", `#${section.id}`);
    docFrag.appendChild(myLink);
  });
  myUl.appendChild(docFrag);
}

// Add class 'active' to section/navitem when near top of viewport
function activateSection() {
  const sections = document.querySelectorAll("section");
  const links = document.querySelectorAll(".menu__link");
  let currentSec = "";
  sections.forEach((section) => {
    section.classList.remove("active");
    if (elementIsInViewPort(section)) {
      section.classList.add("active");
      currentSec = section.getAttribute("data-nav");
    }
  });
  links.forEach((link) => {
    link.classList.remove("active__link");
    if (link.innerHTML === currentSec) {
      link.classList.add("active__link");
    }
  });
}

// Scroll to anchor ID using scrollTO event
function scrollToSection(event) {
  event.preventDefault();
  //console.log(this.getAttribute("href"));
  document.querySelector(this.getAttribute("href")).scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
}

// Scroll to top of the page
function toTopBtn() {
  const topBtn = document.querySelector(".to-top-icon-div");
  if (window.pageYOffset > 0.0) {
    topBtn.classList.remove("hide-to-top-button");
  } else {
    topBtn.classList.add("hide-to-top-button");
  }
}

// Activate dropdown menu
function activateDropDownMenu() {
  const dropMenu = document.querySelector(".drop__menu");
  const navMenu = document.querySelector("ul");
  const respLinks = document.querySelectorAll(".menu__link");

  dropMenu.addEventListener("click", function () {
    navMenu.classList.toggle("active__menu");
    // dropMenu.classList.toggle("active__icon");
  });
  respLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navMenu.classList.remove("active__menu");
    });
  });
}

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
buildNav();

// Scroll to section on link click
const links = document.querySelectorAll(".menu__link");
links.forEach((link) => {
  link.addEventListener("click", scrollToSection);
});

// Set sections as active
document.addEventListener("scroll", activateSection);

// to top button
document.addEventListener("scroll", toTopBtn);

// Drop Down Menu
activateDropDownMenu();
