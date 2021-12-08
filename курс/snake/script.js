var or=document.getElementById("value");
var button=document.getElementById("but");
or.innerHTML=0;
let scoreBlock;
let score = 0;
var flag=true;
const config = {
	step: 0,
	maxStep: 6,
	sizeCell: 16,
	sizeBerry: 16 / 4
}

const snake = {
	x: 160,
	y: 160,
	dx: config.sizeCell,
	dy: 0,
	tails: [],
	maxTails: 3
}

let berry = {
	x: 0,
	y: 0
} 


let canvas = document.getElementById("can");
let context = canvas.getContext("2d");



function gameLoop() {
	if(flag===true){
		requestAnimationFrame(gameLoop)
	}
	
	if ( ++config.step < config.maxStep) {
		return;
	}
	config.step = 0;

	context.clearRect(0, 0, canvas.width, canvas.height);

	drawBerry();
	drawSnake();
	
}


function Over(){
	flag=false;
	cancelAnimationFrame(gameLoop);
	context.font="36px monospace";
	context.fillStyle="black";
	context.fillRect(0,0,320,400);
	context.fillStyle="white";
	context.fillText("Game Over",80,200);
	or.innerHTML=0;
	score=0;
 }

function drawSnake() {
	snake.x += snake.dx;
	snake.y += snake.dy;

	collisionBorder();

	snake.tails.unshift( { x: snake.x, y: snake.y } );

	if ( snake.tails.length > snake.maxTails ) {
		snake.tails.pop();
	}

	snake.tails.forEach( function(el, index){
		context.fillStyle="white"
		context.fillRect( el.x, el.y, config.sizeCell, config.sizeCell );

		if ( el.x === berry.x && el.y === berry.y ) {
			snake.maxTails++;
			incScore();
			randomPositionBerry();
		}

		for( let i = index + 1; i < snake.tails.length; i++ ) {

			if ( el.x == snake.tails[i].x && el.y == snake.tails[i].y ) {
				Over();
			}

		}

	} );
}

function collisionBorder() {
	if (snake.x < 0) {
		snake.x = canvas.width - config.sizeCell;
	} else if ( snake.x >= canvas.width ) {
		snake.x = 0;
	}

	if (snake.y < 0) {
		snake.y = canvas.height - config.sizeCell;
	} else if ( snake.y >= canvas.height ) {
		snake.y = 0;
	}
}
function refreshGame() {
	flag=true;
	randomPositionBerry();
	snake.x=160;
	snake.y=160;
	snake.tails=[];
    snake.maxTails = 4;
    snake.dx = 16;
	snake.dy=0;
	requestAnimationFrame(gameLoop);
	
}

function drawBerry() {
	context.beginPath();
	context.fillStyle = "white";
	context.arc( berry.x + (config.sizeCell / 2 ), berry.y + (config.sizeCell / 2 ), config.sizeBerry, 0, 2 * Math.PI );
	context.fill();
}

function randomPositionBerry() {
	berry.x = getRandomInt( 0, canvas.width / config.sizeCell ) * config.sizeCell;
	berry.y = getRandomInt( 0, canvas.height / config.sizeCell ) * config.sizeCell;
}

function incScore() {
	score++;
	drawScore();
}
function drawScore(){
    or.innerHTML=score;
}


function getRandomInt(min, max) {
	return Math.floor( Math.random() * (max - min) + min );
}

document.addEventListener("keydown", function (e) {
	if ( e.code == "KeyW" && snake.dy===0) {
		snake.dy = -config.sizeCell;
		snake.dx = 0;
	} else if ( e.code == "KeyA" && snake.dx===0) {
		snake.dx = -config.sizeCell;
		snake.dy = 0;
	} else if ( e.code == "KeyS" && snake.dy===0) {
		snake.dy = config.sizeCell;
		snake.dx = 0;
	} else if ( e.code == "KeyD" && snake.dx===0) {
		snake.dx = config.sizeCell;
		snake.dy = 0;
	}
});