var canvas;
var width;
var height;
var c;

window.addEventListener("mousedown", function(event) {
  ball.kick(event.x, event.y);
});

function setup() {
  canvas = document.getElementsByTagName('canvas')[0];
  
  window.innerWidth > 0 ? width = window.innerWidth : width = screen.width;

  window.innerHeight > 0 ? height = window.innerHeight : height = screen.height;

  canvas.width = width;
  canvas.height = height;
  
  c = canvas.getContext('2d');
}


function Target(x, y, rad, primary, secondary) {
  x ? this.x = x : this.x = width/2;
  y ? this.y = y : this.y = height/2;
  rad ? this.rad = rad : this.rad = 50;
  primary ? this.primary = primary : this.primary = "#fff";
  secondary ? this.secondary = secondary : this.secondary = "#f00";
  
  this.draw = function() {
    c.save();
    
    for(var i = 1; i < 6; i++) {
      c.beginPath();  
      switch(i) {
        case 1:
          c.arc(this.x, this.y, this.rad, Math.PI*2, false);
          break;
        case 2:
          c.arc(this.x, this.y, this.rad/1.3, Math.PI*2, false);
          break;
        case 3:
          c.arc(this.x, this.y, this.rad/1.9, Math.PI*2, false);
          break;
        case 4:
          c.arc(this.x, this.y, this.rad/3, Math.PI*2, false);
          break;
        default:
                    c.arc(this.x, this.y, this.rad/7, Math.PI*2, false);

      }
      i%2 === 0 ? c.fillStyle = this.primary : c.fillStyle = this.secondary;
      c.fill();
      c.stroke();
    }
  }
}


function SoccerBall(x,y,rad, dx, dy, color1, color2) {
  x ? this.x = x : this.x = width/2;
  y ? this.y = y : this.y = height/2;
  rad ? this.rad = rad : this.rad = 20;
  dx ? this.dx = dx : this.dx = 0;
  dy ? this.dy = dy : this.dy = 0;
  this.stopped = false;
  color1 ? this.primary = color1 : this.primary = "#fff";
  color2 ? this.secondary = color2 : this.secondary = "#000";
  
  var scale = rad/100;
  
  this.kick = function(x, y) {
    var distance = Math.sqrt(Math.abs(x-this.x)*Math.abs(x-this.x)+Math.abs(y-this.y)*Math.abs(y-this.y));
    if(distance < this.rad) {
      this.dx+=10*(x-this.x)/this.rad;
      this.dy=-23;
      this.stopped = false;
    }
    console.log('x: ' + x + ' ball x: ' + this.x);
    console.log('y: ' + y + ' ball y: ' + this.y);
    console.log('distance: ' + distance);
    console.log('rad: ' + this.rad);
  }
  
  this.bounce = function() {
    
    if(!this.stopped) {
      this.dy+=1;
      console.log('not stop');
      this.y+=this.dy;
    } else {
      this.dx*=0.9;
    }
    
    this.x+=this.dx;
    if(this.x+this.rad > width) {
      this.dx*=-0.88;
      this.x = width-this.rad;
    } else if(this.x-this.rad < 0) {
      this.dx*=-0.88;
      this.x = this.rad;
    }
    
    
    if(this.y + this.rad > height) {
      
      
      this.y = height-this.rad;
      if(this.dy > 7) {
        this.dy*=-0.88;
      } else if(this.dy > 4) {
        this.dy*=-0.7;
      } else if(this.dy > 2) {
        this.dy*=-0.6;
      } else {
        this.dy=0;
        this.stopped = true;
      }
    } else if(this.y - this.rad < 0) {
      this.y = this.rad;
      this.dy*=-0.88;
    }
    this.draw();
  }
  
  
  this.draw = function() {
    var innerRad = this.rad/3;
    var sideLength = 2*innerRad*Math.sin(Math.PI/6);
    c.beginPath();
    c.arc(this.x,this.y,this.rad, Math.PI*2, false);
    c.fillStyle = this.primary;
    c.closePath();
    c.fill();
    c.stroke();

    c.save();
    c.translate(this.x, this.y-innerRad);
    c.moveTo(0,0);
    c.rotate(Math.PI/3);
    hexagon(sideLength);
    c.restore();
    

    for(var j = 0; j < 6; j++) {
      c.save();
      c.translate(this.x, this.y-innerRad);
      c.moveTo(0,0);
      c.rotate((60)*(Math.PI/180));
      c.translate(0,sideLength);
      for(var i=0; i < j; i++){
        c.moveTo(0,0);
        c.rotate((-60)*(Math.PI/180));
        c.translate(0,sideLength);
      }
      c.moveTo(0,0);
      c.rotate((60)*(Math.PI/180));
      if(j%2 === 0) {
        hexagon(sideLength, this.secondary);
      } else {
        hexagon(sideLength);
      }

      c.restore();

    }

    c.save();
    c.translate(this.x, this.y-innerRad);
    c.moveTo(0,0);
    c.rotate((180)*(Math.PI/180));
    c.translate(0,sideLength);
    c.moveTo(0,0);
    c.rotate((60)*(Math.PI/180));
    c.translate(0,sideLength);
    c.moveTo(0,0);
    c.rotate((-60)*(Math.PI/180));



    for(var i = 0; i < 6; i++) {
      c.beginPath();
      c.rotate((120)*(Math.PI/180));
      c.translate(0,sideLength);
      c.moveTo(0,0);
      c.rotate((60)*(Math.PI/180));
      c.translate(0,sideLength);
      c.moveTo(0,0);
      c.rotate((-60)*(Math.PI/180));
      c.translate(0,sideLength);
      c.moveTo(0,0);
      c.rotate((-60)*(Math.PI/180));
      if(i%2 === 0) {
        outer(this.secondary);
      } else {
        outer();
      }
    }
    c.restore();
    
    function hexagon(sideLength, fillStyle) {
      c.save();
      c.beginPath();
      c.lineTo(0, sideLength);
      for(var i = 0; i < 5; i++) {
        c.translate(0,sideLength);
        c.rotate((120-180)*(Math.PI/180));
        c.lineTo(0, sideLength);
      }
      c.closePath();
      if(fillStyle) {
        c.fillStyle = fillStyle;
        c.fill();
      }
      c.stroke();
      c.restore();
    }

    function outer(fillStyle) {
      c.save();
      c.beginPath();
      c.moveTo(0,0);
      c.lineTo(0,12.4*scale);
      c.quadraticCurveTo(-22*scale,6*scale,-39.1*scale,-10*scale);
      c.translate(-38*scale,-10*scale);
      c.rotate((-126)*(Math.PI/180));
      c.lineTo(0,11.26*scale);
      c.closePath();
      if(fillStyle) {
        c.fillStyle = fillStyle;
        c.fill();
      }
      c.stroke();
      c.restore();
    }
  }
}

function collision() {
  var distance = ball.rad + target.rad;
  var xx = Math.abs(target.x-ball.x)*Math.abs(target.x-ball.x);
  var yy = Math.abs(target.y-ball.y)*Math.abs(target.y-ball.y);
  if(distance > Math.sqrt(xx+yy)) {
    return true;
  }
  return false;
}

function randNum(min, max) {
  return Math.random() * (max - min) + min;
}


setup();
var rad;
height>width?rad=width/15:rad=height/15;
var ball = new SoccerBall(width/2, height-rad, rad, 0, 0, "#fff", "#000");
var target = new Target(400, 100, rad);

function animate() {
  window.requestAnimationFrame(animate);
  c.clearRect(0,0,width,height);
  
  if(collision()) {
    target = new Target(randNum(target.rad, width-target.rad), randNum(target.rad, height/2-target.rad), 50);
  }
  target.draw();
  ball.bounce();
}
animate();