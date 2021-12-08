let canvas=document.getElementById("can");
let context=canvas.getContext('2d');
let score=document.getElementById("value");
var amount=0;
score.innerHTML=amount;
var flag=true;
const ball={
	x:300,
	y:350,
	xSpeed:2,
	ySpeed:-2
}
const paddle={
	px:200,
	py:300,
	pxSpeed:5
}
const brick={
	width:75,
	height:15,
	startX:15,
	startY:15
}
var bricks=[];
for(i=0;i<3;i++){
	bricks[i]=[];
	for(j=0;j<5;j++){
		bricks[i][j]={x:0,y:0,status:1};
	}
}
function plusScore(){
	amount++;
	score.innerHTML=amount;
}
function drawbricks(){
	context.fillstyle="white";
	for(var i=0;i<3;i++){
		for(var j=0;j<5;j++){
			if(bricks[i][j].status==1){			
				context.rect(brick.startX+j*100,brick.startY+30*i,brick.width,brick.height);
				bricks[i][j].x=brick.startX+j*100;
				bricks[i][j].y=brick.startY+30*i;
				context.fill();
			}
		}
	}
}
function colission(){
	for(i=0;i<3;i++){
		for(j=0;j<5;j++){
			if(bricks[i][j].status==1){
			if(ball.x>bricks[i][j].x && ball.x<bricks[i][j].x+brick.width && ball.y > bricks[i][j].y && ball.y<bricks[i][j].y+25){
				ball.ySpeed=-ball.ySpeed;
				bricks[i][j].status=0;
				plusScore();
			}
		}
		}
	}
}
function drawBall(){
	context.beginPath();
	context.fillStyle="white";
	context.arc(ball.x, ball.y, 10, 0, 2 * Math.PI);
	context.fill();
	context.closePath();
}
// function renew(){
// 	var a=0;
// 	for(i=0;i<3;i++){
// 		for(j=0;j<5;j++){
// 			if(bricks[i][j].status==0){
// 				a++;
// 			}
// 		}
// 	}
// 	if(a==15){
		
// 		for(i=0;i<3;i++){
// 			for(j=0;j<5;j++){
// 				bricks[i][j].status=1;
// 			}
// 		}
// 	}
// }
function drawPaddle(){
	context.beginPath();
	context.fillstyle="white";
	context.fillRect(paddle.px,390,100,10);
	context.fill();
}

function draw(){
	if(flag===true){
		requestAnimationFrame(draw);
		
	}
	context.clearRect(0,0,canvas.width,canvas.height);
	drawbricks();
	drawBall();
	drawPaddle();
	colission();
	if(ball.x + ball.xSpeed > canvas.width-10 || ball.x + ball.xSpeed < 10) {
		ball.xSpeed = -ball.xSpeed;
	}
	if(ball.y+ball.ySpeed<10){
		ball.ySpeed=-ball.ySpeed;
	}
	else if(ball.y+ball.ySpeed>canvas.height-10){
		if(ball.x>paddle.px && ball.x<paddle.px+100){
			ball.ySpeed=-ball.ySpeed;
		}
		else{
			Over();
		}
	}
	ball.x += ball.xSpeed;
	ball.y += ball.ySpeed;
}
document.addEventListener("keydown", function(e){
	if(e.code=="KeyA" && paddle.px>0){
		paddle.px-=paddle.pxSpeed;
	}
	if(e.code=="KeyD" && paddle.px+100<canvas.width){
		paddle.px+=paddle.pxSpeed;
	}
})
function Over(){
	flag=false;
	cancelAnimationFrame(draw);
	context.clearRect(0,0,500,400);
	context.fillStyle="black";
	context.fillRect(0,0,canvas.width,canvas.height);
	context.font="36px monospace";
	context.fillStyle="white";
	context.fillText("Game Over",200,200);	
}
function Start(){
	flag=true;
	context.fillStyle="white";
	context.fillRect(0,0,canvas.width,canvas.height);
	amount=0;
	score.innerHTML=amount;
	for(i=0;i<3;i++){
		bricks[i]=[];
		for(j=0;j<5;j++){
			bricks[i][j]={x:0,y:0,status:1};
		}
	}
	paddle.px=200;
	paddle.py=300;
	ball.x=300;
	ball.y=350;
	ball.xSpeed=2;
	ball.ySpeed=-2;
	requestAnimationFrame(draw);
	

}