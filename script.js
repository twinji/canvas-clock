// the time
var time;

// hand rotations and radii
var secondsHandAngle;
var secondsHandRadius;
var minutesHandAngle;
var minutesHandRadius;
var hoursHandAngle;
var hoursHandRadius;

// unit for scaled sizing
var unitSize;

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

function init(c) {

    // set size unit based on screen size
    unitSize = (HEIGHT > WIDTH ? WIDTH : HEIGHT) * 0.001;

    // set stroke values
    c.strokeStyle = "white";
    c.lineCap = "round";

}

function update() {

    // get current time
    var time = theTime();

    // calculate hand rotations
    secondsHandAngle = (time.seconds / 60 * 2 * Math.PI) - Math.PI / 2;
    minutesHandAngle = ((time.minutes + time.seconds / 60) / 60 * 2 * Math.PI) - Math.PI / 2;
    hoursHandAngle = (((time.hours + time.minutes / 60) % 12) / 12 * 2 * Math.PI) - Math.PI / 2;

}

function render(c) {

    // determine appropriate radius
    var radius = (HEIGHT > WIDTH ? WIDTH : HEIGHT) / 2 * 0.9;

    // calculate hand radii
    secondsHandRadius = radius * 0.9;
    minutesHandRadius = radius * 0.85;
    hoursHandRadius = radius * 0.5;

    // clear previous frame
    c.clearRect(0, 0, WIDTH, HEIGHT);

    // draw clock border
    c.lineWidth = unitSize * 6;
    c.beginPath();
    c.arc(WIDTH / 2, HEIGHT / 2, radius, 0, 2 * Math.PI);
    c.stroke();
    c.closePath();

    // draw seconds hand
    drawLine(c, WIDTH / 2, HEIGHT / 2, 
        WIDTH / 2 + Math.cos(secondsHandAngle) * secondsHandRadius, 
        HEIGHT / 2 + Math.sin(secondsHandAngle) * secondsHandRadius, 
        unitSize * 1);

    // draw minutes hand
    drawLine(c, WIDTH / 2, HEIGHT / 2, 
        WIDTH / 2 + Math.cos(minutesHandAngle) * minutesHandRadius, 
        HEIGHT / 2 + Math.sin(minutesHandAngle) * minutesHandRadius, 
        unitSize * 7);

    // draw hours hand
    drawLine(c, WIDTH / 2, HEIGHT / 2, 
        WIDTH / 2 + Math.cos(hoursHandAngle) * hoursHandRadius, 
        HEIGHT / 2 + Math.sin(hoursHandAngle) * hoursHandRadius, 
        unitSize * 7);

    // draw spokes
    for (var i = 0; i < 60; i++) {

        // determine angle and length of spoke
        var spokeAngle = i / 60 * 2 * Math.PI;
        var spokeLength = i % 5 == 0 ? radius * 0.1 : radius * 0.05;

        // draw single spoke
        drawLine(c, WIDTH / 2 + Math.cos(spokeAngle) * (radius - spokeLength), 
            HEIGHT / 2 + Math.sin(spokeAngle) * (radius - spokeLength), 
            WIDTH / 2 + Math.cos(spokeAngle) * radius, 
            HEIGHT / 2 + Math.sin(spokeAngle) * radius,
            unitSize * (i % 5 == 0 ? 3 : 1));
        
    }
}

// helper for drawing lines
function drawLine(c, x1, y1, x2, y2, width) {
    c.lineWidth = width;
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
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