'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebarBtn) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  if (modalContainer) modalContainer.classList.toggle("active");
  if (overlay) overlay.classList.toggle("active");
}

// add click event to all modal items (only if elements exist)
if (testimonialsItem.length > 0 && modalImg && modalTitle && modalText) {
  for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener("click", function () {
      const avatar = this.querySelector("[data-testimonials-avatar]");
      const title = this.querySelector("[data-testimonials-title]");
      const text = this.querySelector("[data-testimonials-text]");
      
      if (avatar && title && text) {
        modalImg.src = avatar.src;
        modalImg.alt = avatar.alt;
        modalTitle.innerHTML = title.innerHTML;
        modalText.innerHTML = text.innerHTML;
        testimonialsModalFunc();
      }
    });
  }
}

// add click event to modal close button (only if elements exist)
if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
}
if (overlay) {
  overlay.addEventListener("click", testimonialsModalFunc);
}

// PROJECTS FILTER SYSTEM - FIXED VERSION
// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

// Improved filter function
const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// Initialize the filter system when page loads
document.addEventListener('DOMContentLoaded', function() {
  // Show all project items by default
  filterFunc("all");
  
  // Set initial select value
  if (selectValue) {
    selectValue.innerText = "All";
  }
  
  // Make sure first filter button is active
  if (filterBtn.length > 0) {
    filterBtn[0].classList.add("active");
  }
});

// Handle dropdown selection
if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) {
      selectValue.innerText = this.innerText;
    }
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) {
      selectValue.innerText = this.innerText;
    }
    filterFunc(selectedValue);
    if (lastClickedBtn) {
      lastClickedBtn.classList.remove("active");
    }
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form && form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// PAGE NAVIGATION - FIXED VERSION
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Create a mapping for navigation text to page data attributes
const pageMapping = {
  'home': 'home',
  'about': 'about', 
  'education': 'education',
  'experience': 'experience',
  'projects': 'projects',
  'publication': 'publication',
  'reward': 'reward',
  'contact': 'contact'
};

// Add event to all nav links
navigationLinks.forEach(link => {
  link.addEventListener("click", function () {
    // Get the navigation text and convert to lowercase
    const navText = this.textContent.trim().toLowerCase();
    
    // Map the navigation text to the correct page identifier
    const targetPage = pageMapping[navText] || navText;
    
    // Hide all pages first
    pages.forEach(page => {
      page.classList.remove("active");
    });
    
    // Show the target page
    const targetPageElement = document.querySelector(`[data-page="${targetPage}"]`);
    if (targetPageElement) {
      targetPageElement.classList.add("active");
      
      // If switching to projects page, ensure all items are visible
      if (targetPage === 'projects') {
        setTimeout(() => {
          filterFunc("all");
        }, 100);
      }
    }
    
    // Update navigation active state
    navigationLinks.forEach(nav => nav.classList.remove("active"));
    this.classList.add("active");
    
    // Scroll to top
    window.scrollTo(0, 0);
  });
});

// summary toggle function
function toggleSummary(button) {
  const summary = button.nextElementSibling;
  if (summary.style.display === 'none' || summary.style.display === '') {
    summary.style.display = 'block';
    button.textContent = 'Hide Summary';
  } else {
    summary.style.display = 'none';
    button.textContent = 'Show Summary';
  }
}