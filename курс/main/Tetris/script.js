var can=document.getElementById('can');
var ctx=can.getContext('2d');
var score=document.getElementById("score");
var lines=document.getElementById("lines");
score.innerHTML=0;
lines.innerHTML=0;
var flag=true;
var scr=0;
var lns=0;
const cell=25;
var playfield=[];
for(i=0;i<20;i++){
    playfield[i]=[];   
        for(j=0;j<10;j++){
            playfield[i][j]=0;
        }
}

const cols=10;
const rows=20;
const tetro={
    I:[
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0],
    ],
    L:[
        [0,1,0],
        [0,1,0],
        [0,1,1],
    ],
    J:[
        [0,1,0],
        [0,1,0],
        [1,1,0],
    ],
    O:[
        [1,1],
        [1,1],
    ],
    S:[
        [0,1,1],
        [1,1,0],
        [0,0,0],
    ],
    Z:[
        [1,1,0],
        [0,1,1],
        [0,0,0],
    ],
    T:[
        [0,1,0]
        [1,1,1]
        [0,0,0]
    ]
}
const array=[tetro.I,tetro.L,tetro.J,tetro.O,tetro.S,tetro.Z,tetro.T];
function getTetro(){
    var num=Math.floor(Math.random()*8);
    const matrix=array[num];
    const col=playfield[0].length/2-Math.ceil(matrix[0].length/2);
    const row=0;
    return{
        num,
        matrix,
        col,
        row,
    };
}
var count=0;
var tetromino=getTetro();
function Game(){
    if(flag===true){  
      requestAnimationFrame(Game);
    }
    ctx.clearRect(0,0,250,500);
    for(i=0;i<20;i++){
        for(j=0;j<10;j++){
          if(playfield[i][j]===1){
            ctx.fillStyle="white";
            ctx.fillRect(j*cell,i*cell,cell-1,cell-1)
          }
        }
    }
    if(++count>40 && CheckBottom() && CheckOther()){
        tetromino.row++;
        count=0;
    }
    for(i=0;i<tetromino.matrix.length;i++){
        for(j=0;j<tetromino.matrix[i].length;j++){
            
            if(tetromino.matrix[i][j]===1){
            ctx.fillStyle="white"
            ctx.fillRect((tetromino.col+j)*cell,(tetromino.row+i)*cell,cell-1,cell-1)
            }
        }
    }
    PlaceTetr();
    DestroyLine();
    Over();
}
function Over(){
  for(h=0;h<10;h++){
    if(playfield[0][h]===1){
      flag=false;
      cancelAnimationFrame(Game);
      ctx.clearRect(0,0,250,500);
      ctx.fillStyle="white";
      ctx.fillRect(0,150,250,200);
      ctx.fillStyle="black";
      ctx.font="36px monospace";
      ctx.textAlign="center";
      ctx.textBaseline="middle";
      ctx.fillText("Game Over",125,250);
    }
  }
}
function Start(){
  flag=true;
  for(i=0;i<20;i++){
    playfield[i]=[];   
        for(j=0;j<10;j++){
            playfield[i][j]=0;
        }
}
  requestAnimationFrame(Game);
}
function DestroyLine(){
  for(i=19;i>0;){
      if(playfield[i].every(For_Every)){
        scr+=100;
        lns+=1;
        score.innerHTML=scr;
        lines.innerHTML=lns;
        for(j=0;j<playfield[i].length;j++){
          playfield[i][j]=0;
        }
        for(index=i;index>=0;index--){
          for(k=0;k<playfield[i].length;k++){
            playfield[index][k]=playfield[index-1][k];
          }
        }
      }      
      else{
        i--;
      }
  }
}

function PlaceTetr(){
  if(!CheckBottom() || !CheckOther()){
    for (let row = 0; row < tetromino.matrix.length; row++) {
      for (let col = 0; col < tetromino.matrix[row].length; col++) {
          if(tetromino.matrix[row][col]){
            playfield[tetromino.row+row][tetromino.col+col]=1;
            
            a=playfield[tetromino.row+row][tetromino.col+col];

          }
      }
    }
    tetromino=getTetro();
  }
}
function CheckOther(){
  for (let row = 0; row < tetromino.matrix.length; row++) {
    for (let col = 0; col < tetromino.matrix[row].length; col++) {
      if (tetromino.matrix[row][col] && playfield[tetromino.row+row+1][tetromino.col+col]){
        // то возвращаем, что нет, так не пойдёт
        return false;
      }
    }
  }
  // а если мы дошли до этого момента и не закончили раньше — то всё в порядке
  return true;
}
function CheckLeft(){
    for (let row = 0; row < tetromino.matrix.length; row++) {
        for (let col = 0; col < tetromino.matrix[row].length; col++) {
          if (tetromino.matrix[row][col] && tetromino.col+col<1){
            // то возвращаем, что нет, так не пойдёт
            return false;
          }
        }
      }
      // а если мы дошли до этого момента и не закончили раньше — то всё в порядке
      return true;
}
function CheckRight(){
    for (let row = 0; row < tetromino.matrix.length; row++) {
        for (let col = 0; col < tetromino.matrix[row].length; col++) {
          if (tetromino.matrix[row][col] && tetromino.col+col>8){
            // то возвращаем, что нет, так не пойдёт
            return false;
          }
        }
      }
      // а если мы дошли до этого момента и не закончили раньше — то всё в порядке
      return true;
}
function CheckBottom(){
    for (let row = 0; row < tetromino.matrix.length; row++) {
        for (let col = 0; col < tetromino.matrix[row].length; col++) {
          if (tetromino.matrix[row][col] && tetromino.row+row>18){
            // то возвращаем, что нет, так не пойдёт
            return false;
          }
        }
      }
      // а если мы дошли до этого момента и не закончили раньше — то всё в порядке
      return true;
}
document.addEventListener("keydown", function (e) {
	if ( e.code == "KeyA" && CheckLeft() && CheckOther()) {
		tetromino.col-=1;
	} else if ( e.code == "KeyD" && CheckRight() && CheckOther()) {
		tetromino.col+=1;
	}
    else if(e.code=="KeyR" && CheckOther() && CheckRight() && CheckLeft()){
        tetromino.matrix=rotate(tetromino.matrix);
    }
    else if(e.code=="KeyS" && CheckBottom() && CheckOther()){
    
        tetromino.row+=1;
    }
});
function rotate(matrix) {
    const N = matrix.length - 1;
    const result = matrix.map((row, i) =>
      row.map((val, j) => matrix[N - j][i])
    );
    // на входе матрица, и на выходе тоже отдаём матрицу
    return result;
  }
function For_Every(a,b,c){
    return a ===1;
}

