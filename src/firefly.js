// import image from './src/images/image.jpg'
var  image2 =  new Image(200,200);
image2.src = './src/images/image.jpg';
console.log(image2)
var colors = [];
// var this.canvas  , context, persons;
/* Galactic Tea - http://www.colourlovers.com/palette/1586746/Galactic_Tea*/
colors[2] = [];
colors[2]['background'] = 'red';
colors[2][1] = 'rgba(255,255,255,';
colors[2][2] = 'rgba(255,0,0,';
colors[2][3] = 'rgba(255,0,0,';
colors[2][4] = 'rgba(255,0,0,';

var colorTheme = 2, //getRandomInt(0,colors.length-1);
  mainSpeed = 1;

function getRandomInt(min, max, exept) {
  var i = Math.floor(Math.random() * (max - min + 1)) + min;
  if (typeof exept == "undefined") return i;
  else if (typeof exept == 'number' && i == exept) return getRandomInt(min, max, exept);
  else if (typeof exept == "object" && (i >= exept[0] && i <= exept[1])) return getRandomInt(min, max, exept);
  else return i;
}
function isEven(n) {
    return n == parseFloat(n) ? !(n % 2) : void 0;
  }
  
  function degToRad(deg) {
    return deg * (Math.PI / 180);
  }

  function Firefly(id,canvas) {
    this.canvas = canvas;
    this.id = id;
    this.width = getRandomInt(3, 6);
    this.height = this.width;
    this.x = getRandomInt(0, (this.canvas.width - this.width));
    this.y = getRandomInt(0, (this.canvas.height - this.height));
    this.speed = (this.width <= 10) ? 2 : 1;
    this.alpha = 1;
    this.alphaReduction = getRandomInt(1, 3) / 70;
    this.color = colors[colorTheme][getRandomInt(1, colors[colorTheme].length - 1)];
    this.direction = getRandomInt(0, 360);
    this.turner = getRandomInt(0, 1) == 0 ? -1 : 1;
    this.turnerAmp = getRandomInt(1, 2);
    this.isHit = false;
    this.stepCounter = 0;
    this.changeDirectionFrequency = getRandomInt(1, 200);
    this.shape = 2; //getRandomInt(2,3);
    this.shadowBlur = getRandomInt(5, 25);
  }
  
  Firefly.prototype.stop = function(context,population,image) {
    // this.update();
    this.update(context,population,image);
  }



Firefly.prototype.takeOppositeDirection = function() {
    // Right -> Left
    if ((this.direction >= 0 && this.direction < 90) || (this.direction > 270 && this.direction <= 360)) {
      this.direction = getRandomInt(90, 270);
      return;
    }
    // Left -> Right
    if (this.direction > 90 && this.direction < 270) {
      var exept = [90, 270];
      this.direction = getRandomInt(0, 360, exept);
      return;
    }
    // Down -> Up
    if (this.direction > 0 && this.direction < 180) {
      this.direction = getRandomInt(180, 360);
      return;
    }
    // Up -> Down
    if (this.direction > 180) {
      this.direction = getRandomInt(0, 180);
    }
  }
  
Firefly.prototype.walk = function(context,population,image) {
    var next_x = this.x + Math.cos(degToRad(this.direction)) * this.speed,
      next_y = this.y + Math.sin(degToRad(this.direction)) * this.speed;
  
    // this.canvas limits
    if (next_x >= (this.canvas.width - this.width) && (this.direction < 90 || this.direction > 270)) {
      next_x = this.canvas.width - this.width;
      this.direction = getRandomInt(90, 270, this.direction);
    }
    if (next_x <= 0 && (this.direction > 90 && this.direction < 270)) {
      next_x = 0;
      var exept = [90, 270];
      this.direction = getRandomInt(0, 360, exept);
    }
    if (next_y >= (this.canvas.height - this.height) && (this.direction > 0 && this.direction < 180)) {
      next_y = this.canvas.height - this.height;
      this.direction = getRandomInt(180, 360, this.direction);
    }
    if (next_y <= 0 && (this.direction > 180 && this.direction < 360)) {
      next_y = 0;
      this.direction = getRandomInt(0, 180, this.direction);
    }
  
    this.x = next_x;
    this.y = next_y;
  
    this.stepCounter++;
  
    if (this.changeDirectionFrequency && this.stepCounter == this.changeDirectionFrequency) {
      this.turner = this.turner == -1 ? 1 : -1;
      this.turnerAmp = getRandomInt(1, 2);
      this.stepCounter = 0;
      this.changeDirectionFrequency = getRandomInt(1, 200);
    }
  
    this.direction += this.turner * this.turnerAmp;
  
    this.update(context,population,image);
  }


Firefly.prototype.update = function(context,population,image) {
  // var  k = this.x,d = this.y;  
    context.beginPath();
  
    context.fillStyle = this.color + this.alpha + ")";
    // context.save();
    
    // context.moveTo(k, k + d / 4);
    // context.quadraticCurveTo(k, k, k + d / 4, k);
    // context.quadraticCurveTo(k + d / 2, k, k + d / 2, k + d / 4);
    // context.quadraticCurveTo(k + d / 2, k, k + d * 3/4, k);
    // context.quadraticCurveTo(k + d, k, k + d, k + d / 4);
    // context.quadraticCurveTo(k + d, k + d / 2, k + d * 3/4, k + d * 3/4);
    // context.lineTo(k + d / 2, k + d);
    // context.lineTo(k + d / 4, k + d * 3/4);
    // context.quadraticCurveTo(k, k + d / 2, k, k + d / 4);
    // context.moveTo(this.x,this.y);
    // context.lineTo(this.x+200, this.y);
    // context.lineTo(this.x+150, this.y+200);
    // context.arc(this.x + (this.width / 2), this.y + (this.height / 2),200,0,Math.PI/3);
    // context.moveTo(this.x-2000,this.y+2000);
    // context.clip();
    // context.drawImage(image,0,0);
    context.arc(this.x + (this.width / 2), this.y + (this.height / 2), this.width / 2, 0, 2 * Math.PI, false);
    context.shadowColor = this.color + this.alpha + ")";
    context.shadowBlur = this.shadowBlur;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.fill();
    // context.stroke();
    // context.restore();
  
    if (this.id > 1) {
      this.alpha -= this.alphaReduction;
      if (this.alpha <= 0) this.die(population);
    }
  
  }
  
  Firefly.prototype.die = function(persons) {
    persons[this.id] = null;
    delete persons[this.id];
  }


  export default Firefly;

//   window.onload = function() {
//     this.canvas.setAttribute('width', this.canvasWidth);
//     this.canvas.setAttribute('height', this.canvasHeight);
  
//     start();
//   }
//   function start() {
//     instantiatePopulation();
//     animate();
//   }

  
//   function instantiatePopulation() {
//     var i = 0;
//     while (i < numberOfFirefly) {
//       persons[i] = new Firefly(i);
//       i++;
//     }
//   }
  
//   function animate() {
//     context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
//     context.beginPath();
  
//     // Création d'une copie de l'array persons
//     persons_order = persons.slice(0);
//     // Tri par ordre de position sur l'axe y (afin de gérer les z-index)
//     persons_order.sort(function(a, b) {
//       return a.y - b.y
//     });
  
//     // Paint les instances dans l'ordre trié
//     for (var i in persons_order) {
//       var u = persons_order[i].id;
//       persons[u].walk();
//     }
  
//     requestAnimationFrame(animate);
//   }
  
//   this.canvas.onclick = function(e) {
//     giveBirth(e, birthToGive);
//   }
  
//   function giveBirth(e, u) {
//     var i = persons.length;
//     persons[i] = new Firefly(i);
//     persons[i].x = e.layerX;
//     persons[i].y = e.layerY;
  
//     if (u > 1) giveBirth(e, u - 1);
//   }