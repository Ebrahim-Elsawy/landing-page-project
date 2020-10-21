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
 * Define Global Variables
 * 
*/
// observer settings
const numSteps = 1.0;
let sectionElement;
let lastRatio = 0.0;

let sections = document.querySelectorAll('section');
let navbar  = document.getElementById('navbar__list');
let fragment = document.createDocumentFragment();

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function createObserver() {
	let observer;

	let options = {
	root: null,
	rootMargin: "0px",
	threshold: buildThresholdList()
	};

	observer = new IntersectionObserver(handleIntersect, options);
	observer.observe(sectionElement);
} 

function buildThresholdList() {
	let thresholds = [];
	let numSteps = 10;

	for (let i=3.0; i<=numSteps; i++) {
		let ratio = i/numSteps;
		thresholds.push(ratio);
	}
	thresholds.push(0);
	return thresholds;
} 

function handleIntersect(entries, observer) {
	entries.forEach((entry) => {
		if (entry.intersectionRatio > lastRatio) {
			entry.target.classList.add('your-active-class');
			//let nav_link = document.querySelector("[data-nav='"+entry.target.className+"']");
			let nav_link = document.getElementById(entry.target.id+"_link");
			nav_link.classList.add('activeLink');
		} else {
			entry.target.classList.remove('your-active-class');
			let nav_link = document.getElementById(entry.target.id+"_link");
			nav_link.classList.remove('activeLink');
		}
		lastRatio = entry.intersectionRatio;
	});
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
// start forEach loop to generate nav_bar links and add click listener 
sections.forEach(function(section) {
	// set the observer for every section
	window.addEventListener("load", (event) => {
	  sectionElement = section;
	  createObserver();
	}, false); 
	// create new li
	let li = document.createElement('li');
	//create new link
	let a = document.createElement('a');
	// set id for every link
	a.setAttribute("id", section.id+"_link");
	// set link text
	let title = section.getAttribute("data-nav");
	a.setAttribute('href', '#'+section.id);
	a.textContent = title;
	// Event listener to start smooth scroll
	a.addEventListener('click', function (e) {
		e.preventDefault();
		document.querySelector(this.getAttribute('href')).scrollIntoView({
			behavior: 'smooth'
		});
	});
	// append the link to the li
	li.appendChild(a);

	// append the li to the fragment 
	fragment.appendChild(li);
});
// append the fragment to the ul 
navbar.appendChild(fragment);



/**
 * End Main Functions
 * 
*/



