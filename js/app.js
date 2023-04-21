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

const ACTIVE_CLASS = "active";
const page_header = document.querySelector(".page__header");
const hero = document.querySelector(".main__hero");
const sections = document.querySelectorAll('section');
const scrollTop = document.querySelector('.page__scroll-top');
const  menu = document.querySelector(".navbar__menu");

let navList = document.querySelector('#navbar__list');
let scrollTimer = null;


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

const scrollToSection = (element) => {
    element.scrollIntoView({
        behavior: 'smooth'
    });
};  

const isElementInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    if (
        rect.top < window.innerHeight * 0.5 &&
        rect.bottom >= window.innerHeight * 0.5  
      ) {
        // The element is visible in the viewport
        return true;
      } 
        
    // The element is not visible in the viewport
    return false;  
};
  
const toggleScrollToTop = () => {
    if (window.pageYOffset > window.innerHeight) {
        scrollTop.classList.remove('hidden');
        scrollTop.classList.add('show');
      } else {
        scrollTop.classList.remove('show');
        scrollTop.classList.add('hidden');
      }
}

const hideHeader = () => {
    scrollTimer = setTimeout(() => {
        if(!isElementInViewport(hero) && !page_header.classList.contains("hidden")){
            page_header.classList.remove("show");
            page_header.classList.add("hidden");
        }
    }, 2000);
}



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const navSetup = () => {
    let fragment = document.createDocumentFragment();
    for(let section of sections){
        let navItem = document.createElement('li');
        let anchor = `<a href="#" class="menu__link" data-section="${section.id}">${section.dataset.nav}</a>`;
        navItem.innerHTML = anchor;
        fragment.appendChild(navItem);
    }
    navList.appendChild(fragment);
};

// Add class 'active' to section when near top of viewport

const highlightInView = () => {
    sections.forEach(section => {
        if(isElementInViewport(section)){
            section.classList.add(ACTIVE_CLASS);
            document.querySelector(`[data-section=${section.id}]`).classList.add(ACTIVE_CLASS);
        }else{
            section.classList.remove(ACTIVE_CLASS);
            document.querySelector(`[data-section=${section.id}]`).classList.remove(ACTIVE_CLASS);
        }
    });
};

// Scroll to anchor ID using scrollTO event
scrollTop.addEventListener('click', () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
}, false);


/**
 * End Main Functions
 * Begin Events
 * 
*/


// Build menu 
navSetup();
       
// Scroll to section on link click
 
menu.addEventListener('click', (e) => {
    e.preventDefault();
    scrollToSection(document.getElementById(e.target.dataset.section));
}, false);



// Set sections as active

window.addEventListener('scroll', (e) => {
    if(scrollTimer !== null){
        clearTimeout(scrollTimer);
        highlightInView();
        toggleScrollToTop();
    }
    hideHeader();
 }, false);

 window.addEventListener('mousemove', (e) => {
    if(e.clientY < window.innerHeight/2 && page_header.classList.contains("hidden")){
        page_header.classList.remove("hidden");
        page_header.classList.add("show");
    }
 }, false)