// width and height of window
const WIDTH = window.innerWidth, 
      HEIGHT = window.innerHeight;

window.onload = function(e) {

    // canvas setup
    var canvas = document.getElementById("canvas");
    var c = canvas.getContext("2d");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    // initial setup
    init(c);
    
    // main logic loop
    var loop = function() {
        update();
        render(c);
        window.requestAnimationFrame(loop, canvas);
    }
    window.requestAnimationFrame(loop, canvas);
}

function init(c) {}

function update() {}

function render(c) {

    // determine appropriate radius
    var radius = (HEIGHT > WIDTH ? WIDTH : HEIGHT) / 2 * 0.9;
    
    // get current time
    var time = theTime();

    // calculate hand rotations and radius
    var secondsHandAngle = (time.seconds / 60 * 2 * Math.PI) - Math.PI / 2;
    var secondsHandRadius = radius * 0.9;
    var minutesHandAngle = (time.minutes / 60 * 2 * Math.PI) - Math.PI / 2;
    var minutesHandRadius = radius * 0.75;

    // set stroke values
    c.strokeStyle = "white";
    c.lineCap = "round";

    // clear previous frame
    c.clearRect(0, 0, WIDTH, HEIGHT);

    // draw clock border
    c.beginPath();
    c.arc(WIDTH / 2, HEIGHT / 2, radius, 0, 2 * Math.PI);
    c.stroke();
    c.closePath();

    // draw seconds hand
    c.lineWidth = 1;
    c.beginPath();
    c.moveTo(WIDTH / 2, HEIGHT / 2);
    c.lineTo(WIDTH / 2 + Math.cos(secondsHandAngle) * secondsHandRadius, HEIGHT / 2 + Math.sin(secondsHandAngle) * secondsHandRadius);
    c.stroke();
    c.closePath();

    // draw minutes hand
    c.lineWidth = 5;
    c.beginPath();
    c.moveTo(WIDTH / 2, HEIGHT / 2);
    c.lineTo(WIDTH / 2 + Math.cos(minutesHandAngle) * minutesHandRadius, HEIGHT / 2 + Math.sin(minutesHandAngle) * minutesHandRadius);
    c.stroke();
    c.closePath();

}

// returns the current time as a JSON object
function theTime() {
    var date = new Date();
    return {
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds()
    }
}