var body = document.getElementsByTagName("body");

body.ontouchend = function(e) {
    e.preventDefault();
};// prevent scrolling in safari

var currGamma = 0;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var showOnce = true;

// Coordinates
var x = canvas.width/2; // start position of the ball
var y = canvas.height/3;
var dx = 10; // ball speed
var dy = -10;

// paddle
var paddleWidth = 320;
var paddleHeight = 25;
var paddleMove = (canvas.width-paddleWidth) / 2;
var interval;

// Ball
var ballRadius = 20;

// bricks
var rows = 4;
var cols = 10;
var bricksLeft = 30;
var bricksTop = 30;
var brickWidth = 75;
var brickHeight = 30;
var brickPadding = 21;

var bricksArray = [];
for(var i=0; i<cols; i++) { // engine from here
    bricksArray[i] = [];
    for(var j=0; j<rows; j++) {
        bricksArray[i][j] = { visibleB: 1, x: 0, y: 0 }; // not sure if this is correct way of storing objects
    }
}


function ball() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#DDD";
    ctx.fill();
    ctx.closePath();

}
function paddle() {
    ctx.beginPath();
    ctx.rect(paddleMove, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#B3B6B7";
    ctx.fill();
    ctx.closePath();
}

function bricks() {
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            if (bricksArray[i][j].visibleB === 1) {
                var xxx = (i * (brickWidth + brickPadding)) + bricksLeft;
                var yyy = (j * (brickHeight + brickPadding)) + bricksTop;
                bricksArray[i][j].x = xxx;
                bricksArray[i][j].y = yyy;
                ctx.beginPath();
                ctx.rect(xxx, yyy, brickWidth, brickHeight);
                ctx.fillStyle = "#cb4154";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function engine() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ball();
    paddle();
    hitBricks();
    bricks();
    if (y + dy < ballRadius) {  // top bounce
        dy = -dy;
    }
    if (y + dy > canvas.height - ballRadius) { // down game over
        if (x > paddleMove && x < paddleMove + paddleWidth) { // paddle hit
            dy = -dy;
        } else {
            gameOver();
            setTimeout(function () {
                document.location.reload();
            }, 2300);
            clearInterval(interval); // otherwise it doesnt load on time
        }
    }
    if (x + dx < ballRadius) { // left
        dx = -dx;
    }
    if (x + dx > canvas.width - ballRadius) { // right
        dx = -dx;
    }


    x += dx;
    y += dy; // important

}


function hitBricks() {
    for(var i=0; i<cols; i++) {
        for(var r=0; r<rows; r++) {
            var b = bricksArray[i][r];
            if(b.visibleB === 1){
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.visibleB = 0;
                }
            }
        }
    }
}

function gameOver(){
    ctx.font = '6rem Monaco';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);

}

function handleDeviceOrientation(e){
    var gamma = e.gamma;
    var gam = gamma * 15;
    var max = canvas.width - paddleWidth, min = 0;
    paddleMove = (canvas.width - paddleWidth) /2 + gam;
    paddleMove = Math.min(paddleMove, max);
    paddleMove = Math.max(paddleMove, min);
}

window.onload = function() {
        var img = document.getElementById("image");
        img.addEventListener("touchstart", function(){
            img.style.display="none";
            canvas.style.backgroundImage=  "url('bg.png')";
            if(window.DeviceOrientationEvent){
                window.addEventListener("deviceorientation", handleDeviceOrientation);
            }
            interval = setInterval(engine, 10);
    })
};





