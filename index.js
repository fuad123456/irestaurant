const slider=document.querySelector('.slider');
const sliderImages=document.querySelectorAll('.slider img');
const line=document.querySelector('.line');
let pos
let dif
// function drag(){
// 	// let posX=line
// 	// console.dir(posX);
// 	// console.log(clientX);
// }
// drag()
line.addEventListener('mousedown',function(e){
	e.preventDefault();
	let posX=e.clientX
	s(posX)
});
line.addEventListener('mouseup',function drag(e){
	e.preventDefault();
	let posX=line
	// console.dir(posX);
	// console.log(e.clientX);
	removeEventListener('mousemove',s);
});
function s(p){
	line.addEventListener('mousemove',function d(e){
		// console.log(e.clientX);
		let px=p-e.clientX;
		if(p>0){
			line.style.left=-px+'px';
		}else{
			line.style.left=px+'px';
		}
	})
	line.addEventListener('mouseup',function drag(e){
		e.preventDefault();
		let posX=line
		// console.dir(posX);
		// console.log(e.clientX);
		removeEventListener('mousemove',s);
	});
}
