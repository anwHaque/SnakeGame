var c = document.getElementById('myCanvas');
var ctx = c.getContext('2d');
var state = 1;
c.addEventListener("click", startGame, false);
c.addEventListener("touchstart", startTouch, false);
c.addEventListener("touchmove", moveTouch, false);
document.addEventListener("keydown",direction,false);

 // Swipe Up / Down / Left / Right

var initialX = null;
var initialY = null;
var w = window.innerWidth;
var h = window.innerHeight;
var score =0;
var label =1;
const tilesW =20;
const tilesH =20;
const tilesSize = 20;

const dead = new Audio();
const eat = new Audio();
const eatBig = new Audio();
const left = new Audio();
const right = new Audio();
const up = new Audio();
const down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
eatBig.src = "audio/eatBig.mp3";
left.src = "audio/left.mp3";
right.src = "audio/right.mp3";
up.src = "audio/up.mp3";
down.src = "audio/down.mp3";

var snake = [];
var dir ="RIGHT";

var interval =[];
var timerVar =[];

for(let i=3;i>=0;i--)
{
    snake.push({
        x: i,
        y: 0
    });
}

var food = {
    x: Math.floor(Math.random()*(Math.floor(w/tilesW))),
    y: Math.floor(Math.random()*(Math.floor(h/tilesH))) 
}

window.onload = function()
{
    resiZeFun();
    writeText('Tab to start');
    window.addEventListener('resize',resiZeFun);
}

function resiZeFun()
{
    w = window.innerWidth;
    h = window.innerHeight;
    c.width = w;
    c.height = h;  
    writeText('Tab to start');
    Drow();   
}

function loopTiles(noOfTialsX,noOfTialsY,l)
{        
    for(let i=0;i<=noOfTialsX;i++)
    {
        for(let j=0;j<=noOfTialsY;j++)
        {
            ctx.fillStyle =( l==1)? "orange" : "darkgray";
            ctx.fillRect(tilesW*i,tilesH*j,tilesW,tilesH);
            if(l!=3)
            {
                ctx.strokeStyle = "white";
                ctx.strokeRect(tilesW*i,tilesH*j,tilesW,tilesH);
            } 
        } 
    }
}

function drowFood(x,y)
{
    ctx.fillStyle = 'chocolate';
    ctx.fillRect(x*tilesSize,y*tilesSize,tilesW,tilesH);
    ctx.fillStyle = 'orange';
    ctx.strokeRect(x*tilesSize,y*tilesSize,tilesW,tilesH);
}

function drowSnake(x,y,)
{
    ctx.fillStyle = ( snake[0].x==x && snake[0].y==y )? "brown" : "green";
    ctx.fillRect(x*tilesSize,y*tilesSize,tilesSize,tilesSize);
    ctx.fillStyle = "black";
    ctx.strokeRect(x*tilesSize,y*tilesSize,tilesSize,tilesSize); 
}

function Drow()
{   
	var noOfTialsX =Math.floor(w/tilesW);
    var noOfTialsY =Math.floor(h/tilesH);
    
    if(score <10)
    {
        loopTiles(noOfTialsX,noOfTialsY,label);
    }
    else if(score >=10 && score < 20)
    {
        label =2;
        loopTiles(noOfTialsX,noOfTialsY,this.label);
        clearIntervals()
        getSpeed(this.label);
    }
    else if(score >=20 && score < 30 )
    {
        label =3;
        loopTiles(noOfTialsX,noOfTialsY,this.label);
        clearIntervals()
        getSpeed(this.label);
    }
    else
    {
        label =3;
        getSpeed(this.label);
        ctx.clearRect(0, 0,w,h);
    }
   
    drowFood(food.x,food.y);
    drowGameArea(w,h)
	for(let i=0;i<snake.length;i++)
    { 
        var X = snake[i].x;
        var Y = snake[i].y;
        drowSnake(X,Y)
    }
    var snakeX = snake[0].x;
    var snakeY =snake[0].y;
    
    if(dir == 'RIGHT')
    {        
        if(++snakeX == noOfTialsX)
        {
        	snakeX=0;
        } 
    }
    else if(dir == 'LEFT')
    {
    	if(--snakeX<0)
    	{
    		snakeX=noOfTialsX-1;
    	}           
    }
    else if(dir == 'DOWN')
    {
        if(++snakeY==noOfTialsY)
        {
        	snakeY=0;
        }       
    }
    else if(dir == 'UP')
    {
    	if(--snakeY<0)
    	{
    		snakeY=noOfTialsY-1;
    	}             
    }
    if(snakeX == food.x && snakeY == food.y)
    {
        score++;

        eat.play();
        food = {
            x: Math.floor(Math.random()*(Math.floor(w/tilesW))),
            y: Math.floor(Math.random()*(Math.floor(h/tilesH))) 
        }
        newHead = {
            x: snakeX,
            y: snakeY
        }
    }
    else
    {
        snake.pop();
    }
    for(let i=0; i<snake.length; i++)
    {
        if(snake[i].x == snakeX && snake[i].y == snakeY)
        {
            dead.play();  
            state =2;  
            clearIntervals();
            writeText('GAME OVER');
        }   
    } 
    var newHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead);
    Score(score);
}

//////////////// KeyBord ////////////////////////////////////////////////

function direction(event)
{
    let key = event.keyCode;
    if(key == 37  && dir != 'RIGHT')
    {
        left.play();
        dir = "LEFT";
    }
    else if(key == 38  && dir != 'DOWN')
    {
        up.play();
        dir = "UP";
    }
    else if(key == 39  && dir != 'LEFT')
    {
        right.play();
        dir = "RIGHT";
    }
    else if(key == 40  && dir != 'UP')
    {
        down.play();
        dir = "DOWN";
    }
    
}

//////////////// Touch event ////////////////////////////////////////////////
function directionBtn(eventCode)
{                    
    let key = eventCode;
    if(key == 37  && dir != 'RIGHT')
    {
        left.play();
        dir = "LEFT";
    }
    else if(key == 38  && dir != 'DOWN')
    {
        up.play();
        dir = "UP";
    }
    else if(key == 39  && dir != 'LEFT')
    {
        right.play();
        dir = "RIGHT";
    }
    else if(key == 40  && dir != 'UP')
    {
        down.play();
        dir = "DOWN";          
    }
}

function startTouch(e) 
{
    initialX = e.touches[0].clientX;
    initialY = e.touches[0].clientY;
}
 
function moveTouch(e) 
{
    if (initialX === null) {
        return;
    }
    
    if (initialY === null) {
        return;
    }
    
    var currentX = e.touches[0].clientX;
    var currentY = e.touches[0].clientY;
    
    var diffX = initialX - currentX;
    var diffY = initialY - currentY;
        if (Math.abs(diffX) > Math.abs(diffY)) 
        {
            
            if (diffX > 0) 
            {
                directionBtn(37);
            } 
            else 
            {
                directionBtn(39);
            }  
        } 
    else 
    {   
        if (diffY > 0) 
        {

            directionBtn(38);
        } 
        else 
        {
            directionBtn(40);
        }  
  }
  initialX = null;
  initialY = null;
   
  e.preventDefault();
}    

function writeText(str)
{
    ctx.font = "30px Arial"
    ctx.fillStyle = "red";
    ctx.fillText(str,tilesSize*5,tilesSize*10);
}

function getSpeed(label)
{
    this.label = label;
    if(label ==2)
    {
        interval.push(setInterval(Drow,150));
    }
    else if(label ==3)
    {
        interval.push(setInterval(Drow,100));
    }
    else if(label ==4)
    {
        interval.push(setInterval(Drow,70));
    }
}

function startGame()
{
    
    if(state == 1)
    {
        interval.push(setInterval(Drow,200)); 
    }
    else if(state == 2)
    {
        score=0;
        min=0;
        sec =0;
        msec =0;
        label =1
        snake.length = 4;
        interval.push(setInterval(Drow,200)); 
    }
    state=0;
}
function reStartGame()
{
    label =1
    score=0;
    min=0;
    sec =0;
    msec =0;
    snake.length = 4;
    
    interval.push(setInterval(Drow,200));
}
function clearIntervals()
{
    for (let k = 0; k < interval.length; k++)
    {
        clearInterval(interval[k]);
        interval.pop();
    }

}

function Score(s)
{
    ctx.font = "20px Arial"
    ctx.fillStyle = "black";
    ctx.fillText("Score: "+s,tilesSize*1,tilesSize*1);

    ctx.font = "20px Arial"
    ctx.fillStyle = "black";
    ctx.fillText("Label: "+label,tilesSize*7,tilesSize*1);

    ctx.font = "20px Arial"
    ctx.fillStyle = "black";
    ctx.fillText("Time: "+min+":"+sec+":"+msec,tilesSize*(w/tilesW-6),tilesSize*1);
}

function drowGameArea(w,h)
{
    ctx.fillStyle = "green";
    ctx.strokeRect(0, 0, w, h);
}



