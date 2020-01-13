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

function update() {

    // log the time
    var time = theTime();
    console.log(time.hours + ":" + time.minutes + ":" + time.seconds);

}

function render(c) {

    // determine appropriate radius
    var radius = (HEIGHT > WIDTH ? WIDTH : HEIGHT) / 2 * 0.9;
    
    // get current time
    var time = theTime();

    // calculate hand rotations and radius
    var secondsHandAngle = (time.seconds / 60 * 2 * Math.PI) - Math.PI / 2;
    var secondsHandRadius = radius * 0.9;
    var minutesHandAngle = ((time.minutes + time.seconds / 60) / 60 * 2 * Math.PI) - Math.PI / 2;
    var minutesHandRadius = radius * 0.85;
    var hoursHandAngle = (((time.hours + time.minutes / 60) % 12) / 12 * 2 * Math.PI) - Math.PI / 2;
    var hoursHandRadius = radius * 0.5;

    // set stroke values
    c.strokeStyle = "white";
    c.lineCap = "round";

    // clear previous frame
    c.clearRect(0, 0, WIDTH, HEIGHT);

    // draw clock border
    c.lineWidth = 6;
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

    // draw hours hand
    c.lineWidth = 5;
    c.beginPath();
    c.moveTo(WIDTH / 2, HEIGHT / 2);
    c.lineTo(WIDTH / 2 + Math.cos(hoursHandAngle) * hoursHandRadius, HEIGHT / 2 + Math.sin(hoursHandAngle) * hoursHandRadius);
    c.stroke();
    c.closePath();

    // draw spokes
    for (var i = 0; i < 60; i++) {

        // determine angle, length and width of spoke
        var spokeAngle = i / 60 * 2 * Math.PI;
        var spokeLength = i % 5 == 0 ? radius * 0.1 : radius * 0.05;
        c.lineWidth = i % 5 == 0 ? 3 : 1;

        // draw single spoke
        c.beginPath();
        c.moveTo(WIDTH / 2 + Math.cos(spokeAngle) * (radius - spokeLength), HEIGHT / 2 + Math.sin(spokeAngle) * (radius - spokeLength));
        c.lineTo(WIDTH / 2 + Math.cos(spokeAngle) * radius, HEIGHT / 2 + Math.sin(spokeAngle) * radius);
        c.stroke();
        c.closePath();
        
    }
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