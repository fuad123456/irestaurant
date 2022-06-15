// import Swiper from './swiper-bundle.min.js';
const swiper = new Swiper('.swiper', {
	// Optional parameters
	direction: 'horizontal',
	loop: true,
    slidesPerView: 4,
  	spaceBetween: 0,
	// If we need pagination
	pagination: {
	  el: '.swiper-pagination',
	},
  
	breakpoints: {
		// when window width is >= 320px
		320: {
		  slidesPerView: 2,
		  spaceBetween: 20
		},
		// when window width is >= 480px
		480: {
		  slidesPerView: 3,
		  spaceBetween: 30
		},
		// when window width is >= 640px
		640: {
		  slidesPerView: 4,
		  spaceBetween: 40
		}
	  }
  
	// And if we need scrollbar
	// scrollbar: {
	//   el: '.swiper-scrollbar',
	// },
  });
  const swiper1 = document.querySelector('.swiper').swiper;

// Now you can use all slider methods like
// swiper1.slideNext();
let allLinks=document.querySelectorAll('li[href^="#"')
let slider = document.querySelector('.slider')
function scrollTo(){
	// e.preventDefault();
	console.log(this.getAttribute('href'));
	let href = this.getAttribute('href').substring(1);
	const scrollTarget = document.getElementById(href);
	const topOffset = document.querySelector('.scrollto').offsetHeight;
	// const topOffset = 0; // если не нужен отступ сверху 
	const elementPosition = scrollTarget.getBoundingClientRect().bottom-100;
	const offsetPosition = elementPosition - topOffset;
	// console.log(offsetPosition);
	window.scrollBy({
		top: offsetPosition,
		behavior: 'smooth'
	});
	// link.removeEventListener('click', scroll);
	console.log(document.querySelectorAll('li[href^="#"').length);
	// link.removeEventListener('mouseup', d);
}
function scroll(){
	allLinks.forEach(link => {
		link.addEventListener('click', scrollTo);
	});
}
scroll()

// slider.addEventListener('mousedown', scroll, {passive: true});