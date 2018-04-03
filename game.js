//canvas variables
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");


var prevBlack = [{name:"rook",piece:"\u265C",x:0,y:0},{name:"rook",piece:"\u265C",x:7,y:0},{name:"knight",piece:"\u265E",x:1,y:0},{name:"knight",piece:"\u265E",x:6,y:0},{name:"bishop",piece:"\u265D",x:2,y:0},{name:"bishop",piece:"\u265D",x:5,y:0},{name:"queen",piece:"\u265B",x:3,y:0},{name:"king",piece:"\u265A",x:4,y:0}];
var prevWhite = [{name:"rook",piece:"\u2656",x:0,y:7},{name:"rook",piece:"\u2656",x:7,y:7},{name:"knight",piece:"\u2658",x:1,y:7},{name:"knight",piece:"\u2658",x:6,y:7},{name:"bishop",piece:"\u2657",x:2,y:7},{name:"bishop",piece:"\u2657",x:5,y:7},{name:"queen",piece:"\u2655",x:3,y:7},{name:"king",piece:"\u2654",x:4,y:7}];

var black = [{name:"rook",piece:"\u265C",x:0,y:0},{name:"rook",piece:"\u265C",x:7,y:0},{name:"knight",piece:"\u265E",x:1,y:0},{name:"knight",piece:"\u265E",x:6,y:0},{name:"bishop",piece:"\u265D",x:2,y:0},{name:"bishop",piece:"\u265D",x:5,y:0},{name:"queen",piece:"\u265B",x:3,y:0},{name:"king",piece:"\u265A",x:4,y:0}];
for(i = 0; i < 8; i++){
  black.push({name:"pawn",piece:"\u265F",x:i,y:1});
  prevBlack.push({name:"pawn",piece:"\u265F",x:i,y:1});
}
var white = [{name:"rook",piece:"\u2656",x:0,y:7},{name:"rook",piece:"\u2656",x:7,y:7},{name:"knight",piece:"\u2658",x:1,y:7},{name:"knight",piece:"\u2658",x:6,y:7},{name:"bishop",piece:"\u2657",x:2,y:7},{name:"bishop",piece:"\u2657",x:5,y:7},{name:"queen",piece:"\u2655",x:3,y:7},{name:"king",piece:"\u2654",x:4,y:7}];
for(i = 0; i < 8; i++){
  white.push({name:"pawn",piece:"\u2659",x:i,y:6});
  prevWhite.push({name:"pawn",piece:"\u2659",x:i,y:6});
}

var interval;
var mouseItem;
var mouseX;
var mouseY;
var isWhite = true;
var player = white;
var opponent = black;

//draw the board
function drawBoard(){
  //width = width of window
  var width = window.innerWidth;
  //height = height of window - height of other elements on the screen
  var height = window.innerHeight-document.getElementById("title").clientHeight;
  
  //set the width and height equal to whichever is smaller, thereby creating a square board
  if(width<height)
    height = width;
  else
    width = height;
  
  //set the canvas to the determined width and height
  canvas.width=width;
  canvas.height=height;
  
  //draw the chessBoard itself.
  interval = width/9;
  var other =false;
  ctx.fillStyle="gray";
  for(i=(interval)/2+interval; i<width-interval;i+=interval*2){
    for(j=0;j<height-interval;j+=interval*2){
      ctx.fillRect(i,j,interval,interval);
    }
  }
  
  for(i=interval/2; i<width-interval;i+=interval*2){
    for(j=interval;j<height-interval;j+=interval*2){
      ctx.fillRect(i,j,interval,interval);
    }
  }
  
  //set size
  ctx.fillStyle="black";
  ctx.font=interval+"px Arial";
  
  //place all the pieces
  for(i = 0; i < black.length; i++){
    ctx.fillText(black[i].piece,black[i].x*interval+interval/2*1.1,black[i].y*interval+interval*0.9);
  }
  for(i = 0; i < white.length; i++){
    ctx.fillText(white[i].piece,white[i].x*interval+interval/2*1.1,white[i].y*interval+interval*0.9);
  }
  
  if(mouseItem){
    ctx.fillText(mouseItem.piece,mouseX-interval/3,mouseY+interval/3);
  }
}

//animation loop
setInterval(drawBoard,50);

//canvas onclick listener
document.getElementById("canvas").onclick = function(e){
  listener(e,player, opponent);
};

document.getElementById("canvas").onmousemove = function(e){
  mouseX=e.offsetX;
  mouseY=e.offsetY;
};

function flipBoard(){
  if(mouseItem){
    if(isWhite)
      white.push(mouseItem);
    else
      black.push(mouseItem);
      
    mouseItem = null;
    
    
    if(!!window.chrome && !!window.chrome.webstore)
        canvas.style.cursor="-webkit-grab";
    else
      canvas.style.cursor="grab";
  }
  
  for(i = 0; i < white.length; i++){
    white[i].x=(white[i].x-7)*-1;
    white[i].y=(white[i].y-7)*-1;
  }
  
  for(i = 0; i < black.length; i++){
    black[i].x=(black[i].x-7)*-1;
    black[i].y=(black[i].y-7)*-1;
  }
  var temp = player;
  player = opponent;
  opponent = temp;
  
  prevBlack = [];
  for(i=0;i<black.length;i++)
    prevBlack.push({name:black[i].name,piece:black[i].piece,x:black[i].x,y:black[i].y});
    
  prevWhite = [];
  for(i=0;i<white.length;i++)
    prevWhite.push({name:white[i].name,piece:white[i].piece,x:white[i].x,y:white[i].y});
  
  if(isWhite)
    isWhite = false;
  else
    isWhite = true;
}

function reset(){
  black = [];
  for(i=0;i<prevBlack.length;i++)
    black.push({name:prevBlack[i].name,piece:prevBlack[i].piece,x:prevBlack[i].x,y:prevBlack[i].y});
    
  white = [];
  for(i=0;i<prevWhite.length;i++)
    white.push({name:prevWhite[i].name,piece:prevWhite[i].piece,x:prevWhite[i].x,y:prevWhite[i].y});
    
  if(isWhite){
    player = white;
    opponent = black;
  }else{
    player = black;
    opponent = white;
  }
  
  mouseItem = null;
  canvas.style.cursor="-webkit-grab" || "grab";
}

function listener(event, playerArray, opponentArray){
  var x;
  var y;
  if (event.pageX || event.pageY) {
    x = event.pageX;
    y = event.pageY;
  }
  else {
    x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;
  
  var pieceX = Math.floor((x-interval/2*1.1)/interval);
  var pieceY = Math.ceil((y-interval*0.9)/interval);
  if(mouseItem){
    var canPlace = true;
    for(i = 0; i<opponentArray.length; i++){
      if(opponentArray[i].x === pieceX && opponentArray[i].y === pieceY){
        opponentArray.splice(i,1);
      }
    }
    
    for(i = 0; i <playerArray.length; i++){
      if(playerArray[i].x === pieceX && playerArray[i].y === pieceY){
        canPlace = false;
      }
    }
    if(canPlace){
      mouseItem.x=pieceX;
      mouseItem.y=pieceY;
      playerArray.push(mouseItem);
      mouseItem = null;
      if(!!window.chrome && !!window.chrome.webstore)
        canvas.style.cursor="-webkit-grab";
      else
        canvas.style.cursor="grab";
    }
  }else{
    for(i = 0; i <playerArray.length; i++){
      if(playerArray[i].x === pieceX && playerArray[i].y === pieceY){
        mouseItem = playerArray.splice(i,1)[0];
        if(!!window.chrome && !!window.chrome.webstore)
        canvas.style.cursor="-webkit-grabbing";
      else
        canvas.style.cursor="grabbing";
      }
    }
  }
}