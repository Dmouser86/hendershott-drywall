// main.js

// 1. Mobile Menu Toggle functionality
// This targets the hamburger menu icon and the navigation links list
const mobileMenuIcon = document.getElementById('mobile-menu-icon');
const navLinks = document.querySelector('.nav-links');

// Listen for a click on the mobile menu icon
if (mobileMenuIcon) {
    mobileMenuIcon.addEventListener('click', () => {
        // Toggles the 'active' class which changes display: none to display: flex in the CSS
        navLinks.classList.toggle('active');
    });
}

// 2. Dynamic Copyright Year
// Automatically updates the year in the footer so you don't have to change it manually every January
const currentYearElement = document.getElementById('current-year');

if (currentYearElement) {
    const currentYear = new Date().getFullYear();
    currentYearElement.textContent = currentYear;
}
