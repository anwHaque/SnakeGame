var cav = document.getElementById('cav');
var scoreDes = document.getElementById('score');
var gameOver = document.getElementById('gameOver');
var btnId = document.getElementById('btnId');

var ctx = cav.getContext("2d");
var width = 500;
var height = 500;
ctx.backgro= 'black';

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

cav.width = width;
cav.height = height;

snakeW=10;
snakeH=10;
var score =0;
var snake = [];
var dir ="RIGHT";

var cot = 0;
var interval =[];
var timerVar =[];

for(var i=3;i>=0;i--)
{
    snake.push({
        x: i,
        y: 0
    });
}

var food = {
    x: Math.floor(Math.random()*((width/snakeW)-1)+1),
    y: Math.floor(Math.random()*((height/snakeH)-1)+1) 
}
var BigFood = {
    x: Math.floor(Math.random()*((width/snakeW)-1)+1),
    y: Math.floor(Math.random()*((height/snakeH)-1)+1) 
}

document.addEventListener("keydown",direction)
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

function drowSnake(x,y)
{
    ctx.fillStyle ='white';
    ctx.fillRect(x*snakeW,y*snakeH,snakeW,snakeH);
    ctx.fillStyle = 'black';
    ctx.strokeRect(x*snakeW,y*snakeH,snakeW,snakeH);
    if(snake[0].x ==x && snake[0].y == y)
    {
        ctx.fillStyle ='#930000';
        ctx.fillRect(x*snakeW,y*snakeH,snakeW,snakeH);
        ctx.fillStyle = '930000';
        ctx.strokeRect(x*snakeW,y*snakeH,snakeW,snakeH);
    }
    
}


function drow()
{
    ctx.clearRect(0,0,width,height);
    for(var i=0;i<snake.length;i++)
    {
        var X = snake[i].x;
        var Y = snake[i].y;
        drowSnake(X,Y);
    }

    
    var snakeX = snake[0].x;
    var snakeY =snake[0].y;
    
    
    if(dir == 'RIGHT')
    { 
        
        if(snakeX++ >= 49)
        {
            snakeX = 0;
        }
    }
    else if(dir == 'LEFT')
    {
        
        if(snakeX-- <= 0)
        {
            snakeX = 49;
        }
    }
    else if(dir == 'DOWN')
    {
        
        if(snakeY++ >= 49)
        {
            snakeY = 0;
        }
    }
    else if(dir == 'UP')
    {
        
        if(snakeY-- <= 0)
        {
            snakeY = 49;
        }
    }

    
    
    
    if(snakeX == food.x && snakeY == food.y)
    {
        eat.play();
        food = {
            x: Math.floor(Math.random()*((width/snakeW)-1)+1),
            y: Math.floor(Math.random()*((height/snakeH)-1)+1) 
        }
        newHead = {
            x: snakeX,
            y: snakeY
        }
        score++;    
    }

    else if(snakeX == BigFood.x && snakeY == BigFood.y || snakeX == BigFood.x+1 && snakeY == BigFood.y+1)
    {
        eatBig.play();
        BigFood = {
            x: Math.floor(Math.random()*((width/snakeW)-2)+1),
            y: Math.floor(Math.random()*((height/snakeH)-2)+1) 
        }
        newHead = {
            x: snakeX,
            y: snakeY
        }
        score += 5;

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
            clearIntervals();
            
            btnId.innerHTML ='<button onclick="restartGame()">Restart</button>';
            gameOver.innerHTML ='<strong>Game Over</strong>';
        }   
    }    
    
    newHead = {
        x: snakeX,
        y: snakeY
    }
    
    cot++;

    if(score % 4 == 0)
    { 
        if(cot <= 70)
        {
            drowBigFood(BigFood.x,BigFood.y);          
        } 
    }
    else{
        cot=0;
    }

    drowFood(food.x,food.y);
    snake.unshift(newHead);
    scoreDes.innerHTML = score;
}


function drowFood(x,y)
{
    ctx.fillStyle = 'green';
    ctx.fillRect(x*snakeW,y*snakeH,snakeW,snakeH);
    ctx.fillStyle = 'green';
    ctx.strokeRect(x*snakeW,y*snakeH,snakeW,snakeH);
}

function drowBigFood(x,y)
{
    ctx.fillStyle = 'yellow';
    ctx.fillRect(x*snakeW,y*snakeH,snakeW*2,snakeH*2);
    ctx.fillStyle = 'yellow';
    ctx.strokeRect(x*snakeW,y*snakeH,snakeW*2,snakeH*2);
}
 
function startGame()
{
    interval.push(setInterval(drow,100));
    timerVar.push(setInterval(Timer,100));   
    btnId.innerHTML ='<button onclick="pauseGame()">Pause</button>';
}

function pauseGame()
{
    clearIntervals();
    btnId.innerHTML ='<button onclick="startGame()">Resume</button>';
}

function clearIntervals()
{
    for (let k = 0; k < interval.length; k++)
    {
        clearInterval(interval[k]);
    }
    for (let p = 0; p < timerVar.length; p++)
    {
        clearInterval(timerVar[p]);
    }
}

function restartGame()
{
    startGame();
    score=0;
    min=0;
    sec =0;
    msec =0;
    snake.length = 4;
    gameOver.innerHTML ="";
}

