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

    var radius = (HEIGHT > WIDTH ? WIDTH : HEIGHT) / 2 * 0.9;

    c.strokeStyle = "white";
    c.lineWidth = 5;

    c.beginPath();
    c.arc(WIDTH / 2, HEIGHT / 2, radius, 0, 2 * Math.PI);
    c.stroke();
    c.closePath();

}

// returns the current time as a JSON object
function date() {
    var date = new Date();
    return {
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds()
    }
}