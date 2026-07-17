/* ==================== SHOW/HIDE MOBILE MENU ==================== */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');
/* Show Menu */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu');
    });
}
/* Hide Menu */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu');
    });
}
/* Remove Menu Mobile on Link Click */
const navLinks = document.querySelectorAll('.nav__link');
function linkAction(){
    const navMenu = document.getElementById('nav-menu');
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu');
}
navLinks.forEach(n => n.addEventListener('click', linkAction));
/* ==================== STICKY HEADER & SCROLL PROGRESS ==================== */
function scrollHeaderAndProgress(){
    const header = document.getElementById('header');
    const progress = document.getElementById('scroll-progress');
    
    // 1. Sticky header class toggle
    if(this.scrollY >= 80) header.classList.add('scroll-header'); 
    else header.classList.remove('scroll-header');
    // 2. Scroll progress bar percentage computation
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progressPercentage = (window.scrollY / totalHeight) * 100;
    progress.style.width = `${progressPercentage}%`;
}
window.addEventListener('scroll', scrollHeaderAndProgress);
/* ==================== SHOW SCROLL UP ==================== */ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); 
    else scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);
/* ==================== ACTIVE LINK HIGH LIGHT ON SCROLL ==================== */
const sections = document.querySelectorAll('section[id]');
function scrollActive(){
    const scrollY = window.pageYOffset;
    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 120;
        const sectionId = current.getAttribute('id');
        const activeLink = document.querySelector(`.nav__menu a[href*=${sectionId}]`);
        if(activeLink) {
            if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
                activeLink.classList.add('active-link');
            }else{
                activeLink.classList.remove('active-link');
            }
        }
    });
}
window.addEventListener('scroll', scrollActive);
/* ==================== DYNAMIC TERMINAL TYPEWRITER EFFECT ==================== */
const roles = ["Aspiring Java Developer", "B.Tech IT Student", "Software Developer", "Game Developer"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingTextElement = document.getElementById('typing-text');
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseBetweenRoles = 2000;
function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        // Delete characters
        typingTextElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Add characters
        typingTextElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }
    let delay = isDeleting ? deletingSpeed : typingSpeed;
    if (!isDeleting && charIndex === currentRole.length) {
        // Full role typed: pause before deleting
        delay = pauseBetweenRoles;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        // Role deleted: switch to next
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 500; // brief pause before starting next word
    }
    setTimeout(type, delay);
}
// Start typing animation once DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    if (typingTextElement) {
        setTimeout(type, 1000);
    }
});
/* ==================== SCROLL REVEAL ANIMATIONS ==================== */
// Register elements to animate on scroll
const revealElements = [
    '.home__content', '.home__visual',
    '.about__details', '.about__stats',
    '.skills__card', '.project__card',
    '.leetcode__card', '.timeline__section',
    '.cert__card', '.languages__section',
    '.contact__info-panel', '.contact__form-container'
];
// Add structural reveal class to elements on load
document.addEventListener('DOMContentLoaded', () => {
    revealElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.classList.add('reveal-element');
        });
    });
    // Run once on load to show elements already in view
    triggerReveal();
});
function triggerReveal() {
    const triggerBottom = window.innerHeight * 0.85;
    const elementsToReveal = document.querySelectorAll('.reveal-element');
    elementsToReveal.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < triggerBottom) {
            el.classList.add('active');
        }
    });
}
window.addEventListener('scroll', triggerReveal);
/* ==================== CONTACT FORM HANDLER ==================== */
const contactForm = document.getElementById('contact-form');
const formAlert = document.getElementById('form-alert');
const btnSubmit = document.getElementById('btn-submit');
const btnSubmitText = document.getElementById('btn-submit-text');
const btnSubmitIcon = document.getElementById('btn-submit-icon');
if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 1. Show dynamic "sending" loader state
        btnSubmit.disabled = true;
        btnSubmitText.textContent = "Sending Message...";
        btnSubmitIcon.className = "bx bx-loader-alt bx-spin"; // Spin icon animation
        
        // 2. Simulate server sending
        setTimeout(() => {
            // Restore button
            btnSubmit.disabled = false;
            btnSubmitText.textContent = "Send Message";
            btnSubmitIcon.className = "bx bx-send";
            
            // Show premium success alert banner
            formAlert.classList.add('show-alert');
            
            // Clear inputs
            contactForm.reset();
            
            // 3. Clear success alert banner after 5 seconds
            setTimeout(() => {
                formAlert.classList.remove('show-alert');
            }, 5000);
            
        }, 1800);
    });
}