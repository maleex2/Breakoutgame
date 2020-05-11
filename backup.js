var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var x = canvas.width/2;
var y = canvas.height/3;
var dx = 1;
var dy = -1;

var ballRadius = 8;

function drawBall() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
    x += dx;
    y += dy;
    if(y + dy< ballRadius) {  // top bounce
        dy = -dy;
    }
    if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);
        }
    }
    if(x + dx < ballRadius){ // left
        dx = -dx;
    }
    if(x + dx > canvas.width-ballRadius) { // right
        dx = -dx;
    }
}


setInterval(drawBall, 10);