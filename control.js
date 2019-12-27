
allStars = [];
//const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
//const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
speed = 30
fov = 20
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function giveSize(star) {
	let size =Math.floor(Math.random() *2);
	star.style.height = size + 'px';
	star.style.width = size + 'px';
}

function updateSpeed(val) {
	speed = val
}
function updateFov(val) {
	fov = val
}


function setStar(star, nFv) {
	let w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	let hFov = nFv;
	let tFov = nFv;
	if (nFv == 0) {
		hFov = w;
		tFov = h;
	}
	giveSize(star);
	star.setAttribute('lifetime', 0);
	let top = Math.floor(h/2) + Math.floor(Math.random() < 0.5 ? Math.random()*-hFov : Math.random()*hFov);
	let left = Math.floor(w/2) + Math.floor(Math.random() < 0.5 ? Math.random()*-tFov : Math.random()*tFov);
	star.style.top = top + 'px';
	star.style.left = left + 'px';	
}

// creates a star of random size and position
function newStar () {

	let body = document.getElementById('Body');
	let star = document.createElement('div');
	star.setAttribute('class', 'star');
	star.setAttribute('oldL', 0);
	star.setAttribute('oldT', 0);
	star.setAttribute('lifetime', 0);

	setStar (star, 0);

	allStars.push(star);

	body.appendChild(star);
}


function newStarStill () {
	let w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	let body = document.getElementById('Body');
	let star = document.createElement('div');
	star.setAttribute('class', 'star');

	// give star a random position
	
	let top = Math.floor(Math.random() * h);
	let left = Math.floor(Math.random() * w);
	star.style.top = top + 'px';
	star.style.left = left + 'px';

	// give it a varied size
	let size = 1;
	star.style.height = size + 'px';
	star.style.width = size + 'px';
	star.style.animation = "flicker "+1+"s infinite";
	body.appendChild(star);
}
// chooses some random stars and makes them flicker
function flicker () {
	for (let i = 0; i < allStars.length; i++) {
		let animDuration = Math.floor(Math.random() * 8);
		if (i%20 == 0) {
			//allStars[i].style.animation = "flicker "+animDuration+"s infinite";
		}
	}
}

// if close to edge, move faster, if in center move less

async function moveThru () {
	while (1) {
		let w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		let stars = allStars;
		for (let i = 0; i < stars.length; i++) {
			let leftPos =  allStars[i].style.left.match(/[0-9]+/)[0];
			let topPos =  allStars[i].style.top.match(/[0-9]+/)[0];
			let vMagnitude = (leftPos - (w/2)); 
			let hMagnitude = (topPos - (h/2));

			if (leftPos < 30 || leftPos > (w - 30)) {
				setStar(allStars[i], 100)

			} else if (topPos < 30 || topPos > (h -30)) {
				setStar(allStars[i], 100)
			} else {
				let lMove = Math.floor((w/2) + vMagnitude*1.15);
				let tMove = Math.floor((h/2) + hMagnitude*1.15);
				if (parseInt(allStars[i].getAttribute('oldL')) == leftPos || parseInt(allStars[i].getAttribute('oldT') == topPos) ) {
					// If the star isn't moving, adjust its position
						// This can happen if it spawns too close to the center, as the moveMultiplier will try to move it < 1px
					setStar(allStars[i], 0)
					allStars[i].setAttribute('lifetime', 0)
				} else {
					allStars[i].setAttribute('oldL', leftPos);
					allStars[i].setAttribute('oldT', topPos);

					allStars[i].style.left = (lMove)+'px';
					allStars[i].style.top = (tMove)+'px';
					let newLife = parseInt(allStars[i].getAttribute('lifetime')) + 1
					let newSize = (newLife/3)*fov/22;
					allStars[i].style.height = newSize + 'px'
					allStars[i].style.width = newSize+ 'px'
					if (newLife%(300/fov) == 0) {
						//setStar(allStars[i], fov)
					}

					  
					allStars[i].setAttribute('lifetime', newLife);
				}
			}

		}

		await sleep(speed);
	}
}


let starCount = Math.floor(Math.random() * 10) + 20;
for (let i = 0; i < starCount; i++) {
	newStar();
	if (i%3 == 0) {
		newStarStill();
	}
}
//flicker();
moveThru();

