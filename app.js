let level = 0;
let gameSeq = [];
let userSeq = [];
let colors = ['red', 'green', 'blue', 'yellow'];
let scores = [];
let highest = 0;

document.querySelector('.yellow').addEventListener('keydown', function (e) {
	if (e.key == 'Tab') {
		e.preventDefault();
		document.querySelector('.red').focus();
	}
	if (e.shiftKey && e.keyCode == 9) {
		e.preventDefault();
		document.querySelector('.blue').focus();
	}
})

document.querySelector('.red').addEventListener('keydown', function (event) {
	if (event.shiftKey && event.keyCode == 9) {
		event.preventDefault();
		document.querySelector('.yellow').focus();
	}
})

let btns = document.querySelectorAll('.item');
for (let btn of btns)
	btn.addEventListener('click', btnpress);

function btnpress() {
	// console.log(this.id);
	let t = this;
	userSeq.push(t.id);
	t.classList.add('userflash');
	setTimeout(function () {
		// console.log(t);
		t.classList.remove('userflash');
	}, 350);
	matchSeq(userSeq.length - 1);
}

function remflash(b) {
	// console.log(b);
	b.classList.remove('flash');
}

document.querySelector('.start').addEventListener('click', start);

function start() {
	console.log('Game started');
	document.querySelector('.start').setAttribute('hidden','');
	let items = document.querySelectorAll('.item');
	for (let item of items)
		item.removeAttribute('disabled');
	document.querySelector('.red').focus();
	levelUp();
}

function matchSeq(i) {
	// let i = l - 1;
	if (userSeq[i] == gameSeq[i]) {
		// console.log('matched')
		if (userSeq.length == gameSeq.length) {
			// console.log(userSeq);
			// console.log(gameSeq);
			setTimeout(levelUp, 750);
		}
		else
			console.log('Click next color you remember to continue...');
	} else {
		console.log('Game Over!');
		let body = document.querySelector('body');
		body.classList.add('red');
		setTimeout(() => {
			body.classList.remove('red');
		}, 1200);
		scores.push(level-1);
		highest = Math.max(...scores);
		let text = `<h2>Game Over! Your score is <b>${level-1}</b></h2><p>Highest score is <b>${highest}</b></p>`;
		document.querySelector('.level').innerHTML = text;
		level = 0;
		userSeq = [];
		gameSeq = [];
		document.querySelector('.start').removeAttribute('hidden');
		for (let btn of btns)
			btn.setAttribute('disabled', '');
	}
}

function levelUp() {
	level++;
	userSeq = [];
	let text = `<h2>Level ${level}</h2>`;
	document.querySelector('.level').innerHTML = text;
	// let randomColorInd = colors[Math.floor(Math.random() * 3)];
	let randomColorInd = Math.floor(Math.random() * 3);
	let btn = document.getElementById(randomColorInd);
	btn.classList.add('gameflash');
	setTimeout(() => {
		btn.classList.remove('gameflash');
	}, 800);
	gameSeq.push(randomColorInd);
	console.log(gameSeq);
}
