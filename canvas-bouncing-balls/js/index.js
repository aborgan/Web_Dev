//SETUP

var canvas = document.getElementsByTagName("canvas")[0];

var width = window.innerWidth > 0 ? window.innerWidth : screen.width;
var height = window.innerHeight > 0 ? window.innerHeight : screen.height;

canvas.width = width;
canvas.height = height;

c = canvas.getContext("2d");

var mouse = {
  x:undefined,
  y:undefined
};

window.addEventListener('mousemove', function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

var color_array = [
  "#092140",
  "#024959",
  "#F2C777",
  "#F24736",
  "#BF2A2A"
]

function Circle(x, y, rad, dx, dy, fill) {
  this.x = x;
  this.y = y;
  this.rad = rad;
  this.rad > 1 ? this.minRad = this.rad : this.minRad = 1;
  this.dx = dx;
  this.dy = dy;
  this.fill = fill;
  
  this.draw = function() {
    this.hover();
    this.move();
    c.beginPath();
    c.arc(this.x, this.y, this.rad, Math.PI*2, false);
    c.closePath();
    c.lineWidth=5;
    c.strokeStyle = "black";
    c.stroke();
    c.fillStyle = this.fill;
    c.fill();
  }
  
  this.move = function() {
    if(this.x + this.rad > canvas.width) {
      this.dx = Math.abs(this.dx)*-1;
    } else if(this.x - this.rad < 0) {
      this.dx = Math.abs(this.dx);
    }
    this.x+=this.dx;
    if(this.y + this.rad > canvas.height) {
      this.dy = Math.abs(this.dy)*-1;
    } else if(this.y - this.rad < 0) {
      this.dy = Math.abs(this.dy);
    }
    this.y+=this.dy;
  }
  
  this.hover = function() {
    if(Math.abs(mouse.x - this.x) < 75 && Math.abs(mouse.y - this.y) < 75) {
      if(this.rad < 75) {
        this.rad+=1;
      }
    } else {
      if(this.rad > this.minRad) {
        this.rad-=1;
      }
    }
  }
}


var circ = [];

for(var i = 0; i < 75; i++) {
  var rad = Math.random()*10;
  var x = rad + Math.random()*(canvas.width-(2*rad));
  var y = rad + Math.random()*(canvas.height-(2*rad));
  var dx = (Math.random()-0.5)*8;
  var dy = (Math.random()-0.5)*8;
  var color = color_array[Math.floor(Math.random()*5)];
  circ.push(new Circle(x, y, rad, dx, dy, color));
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0,0,canvas.width,canvas.height);
  
  for(var i = 0; i < circ.length; i++) {
    circ[i].draw();
  }
  
}

//Draw
animate();