import data from './data/data.js';
let datan=data
console.log(datan);
let slider = document.querySelector('.slider'),
  sliderList = slider.querySelector('.slider-list'),
  sliderTrack = slider.querySelector('.slider-track'),
  slides = slider.querySelectorAll('.slide'),
  slideWidth = slides[0].offsetWidth,
  slideIndex = 0,
  posInit = 0,
  posX1 = 0,
  posX2 = 0,
  posY1 = 0,
  posY2 = 0,
  posFinal = 0,
  isSwipe = false,
  isScroll = false,
  allowSwipe = true,
  transition = true,
  nextTrf = 0,
  prevTrf = 0,
  lastTrf = (slides.length-1) * slideWidth,
  posThreshold = slides[0].offsetWidth * 0.2,
  trfRegExp = /([-0-9.]+(?=px))/,
  getEvent = function() {
    return (event.type.search('touch') !== -1) ? event.touches[0] : event;
  },
  slide = function() {
    if (transition) {
      sliderTrack.style.transition = 'transform .5s';
    }
    sliderTrack.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0px, 0px)`;

  },
  swipeStart = function() {
    let evt = getEvent();

    if (allowSwipe) {

      transition = true;

      nextTrf = (slideIndex + 1) * -slideWidth;
      prevTrf = (slideIndex - 1) * -slideWidth;

      posInit = posX1 = evt.clientX;
      posY1 = evt.clientY;

      sliderTrack.style.transition = '';

      document.addEventListener('touchmove', swipeAction);
      document.addEventListener('mousemove', swipeAction);
      document.addEventListener('touchend', swipeEnd);
      document.addEventListener('mouseup', swipeEnd);

      sliderList.classList.remove('grab');
      sliderList.classList.add('grabbing');
    }
  },
  swipeAction = function() {

    let evt = getEvent(),
      style = sliderTrack.style.transform,
      transform = +style.match(trfRegExp)[0];

    posX2 = posX1 - evt.clientX;
    posX1 = evt.clientX;

    posY2 = posY1 - evt.clientY;
    posY1 = evt.clientY;
	// console.log(posX1);
    // определение действия свайп или скролл
    if (!isSwipe && !isScroll) {
      let posY = Math.abs(posY2);
      if (posY > 7 || posX2 === 0) {
        isScroll = true;
        allowSwipe = false;
      } else if (posY < 7) {
        isSwipe = true;
      }
    }

    if (isSwipe) {
		if (slideIndex === 0) {
			if (posInit < posX1) {
			  setTransform(transform, 0);
			  return;
			} else {
			  allowSwipe = true;
			}
		  }
		  // запрет ухода вправо на последнем слайде
		  if (slideIndex === document.querySelectorAll('.slides').length-1) {
			if (posInit > posX1) {
				// let track=document.querySelector('.slider-track');
				// let item = createItem();
				// track.appendChild(item);
				// swipeStart();
			  setTransform(transform, lastTrf);
			  return;
			} else {
			  allowSwipe = true;
			}
		  }

      // запрет протаскивания дальше одного слайда
    //   if (posInit > posX1 && transform < nextTrf || posInit < posX1 && transform > prevTrf) {
    //     reachEdge();
    //     return;
    //   }
    //   двигаем слайд
      sliderTrack.style.transform = `translate3d(${transform - posX2}px, 0px, 0px)`;
    }

  },
  swipeEnd = function() {
    posFinal = posInit - posX1;

    isScroll = false;
    isSwipe = false;

    document.removeEventListener('touchmove', swipeAction);
    document.removeEventListener('mousemove', swipeAction);
    document.removeEventListener('touchend', swipeEnd);
    document.removeEventListener('mouseup', swipeEnd);

    sliderList.classList.add('grab');
    sliderList.classList.remove('grabbing');

    if (allowSwipe) {
      if (Math.abs(posFinal) > posThreshold) {
        if (posInit < posX1) {
          slideIndex--;
        } else if (posInit > posX1) {
          slideIndex++;
        }
      }

      if (posInit !== posX1) {
        allowSwipe = false;
        slide();
      } else {
        allowSwipe = true;
      }

    } else {
      allowSwipe = true;
    }

  },
  setTransform = function(transform, comapreTransform) {
    if (transform >= comapreTransform) {
      if (transform > comapreTransform) {
        sliderTrack.style.transform = `translate3d(${comapreTransform}px, 0px, 0px)`;
      }
    }
    allowSwipe = false;
  },
  reachEdge = function() {
    transition = false;
    swipeEnd();
    allowSwipe = true;
  };

sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';
sliderList.classList.add('grab');

sliderTrack.addEventListener('transitionend', () => allowSwipe = true);
slider.addEventListener('touchstart', swipeStart);
slider.addEventListener('mousedown', swipeStart);
slider.addEventListener('mousedown', addItem);
slider.addEventListener('touchstart', addItem);
slider.addEventListener('touchstart', scroll, false);
let c=1
function addItem(){
	if (slideIndex === document.querySelectorAll('.slide').length-3){
		if (posInit > posX1) {
		}
		let track=document.querySelector('.slider-track');
		let item = createItem();
		track.appendChild(item);
		// setTransform(transform, lastTrf);
		console.log(item);
	  }
}
function createItem (){
	let data= getRandomData(datan)
	let item = document.createElement('div');
  	item.classList.add('slide');
  	let box= document.createElement('div');
  	box.classList.add('img-box');
  	let img = document.createElement('img');
  	img.src = data.img;
	let li = document.createElement('li');
	li.classList.add('slide-link');
	li.setAttribute('href', data.id);
  	box.appendChild(img);
    li.appendChild(box);
  	item.appendChild(li);
  	let title = document.createElement('div')
  	title.classList.add('title');
  	title.innerHTML = data.title;
  	item.appendChild(li);
  	item.appendChild(title);
	// slide()
	console.log(item);
  	return item;
}
function getRandomData(data){
	if(c>=datan.length-1){
		c=0
	}else{
		c++
	}
	// let random = Math.floor(Math.random() * data.length);
	console.log(c);
	return data[c];
}
function scroll(){
	document.querySelectorAll('li[href^="#"').forEach(link => {
		link.addEventListener('click', function(e) {
			e.preventDefault();
			let href = this.getAttribute('href').substring(1);
			const scrollTarget = document.getElementById(href);
			const topOffset = document.querySelector('.scrollto').offsetHeight;
			// const topOffset = 0; // если не нужен отступ сверху 
			const elementPosition = scrollTarget.getBoundingClientRect().bottom;
			const offsetPosition = elementPosition - topOffset;
			window.scrollBy({
				top: offsetPosition,
				behavior: 'smooth'
			});
		});
	});
}
scroll()
