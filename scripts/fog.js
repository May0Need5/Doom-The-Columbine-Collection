console.clear();

var canvasWidth = 1600;
var canvasHeight = 300;

var pCount = 0;
var pCollection = [];

var puffs = 1;
var particlesPerPuff = 2000;
var img = 'images/smoke2.png';

var smokeImage = new Image();
smokeImage.src = img;

for (var i1 = 0; i1 < puffs; i1++) {
  var puffDelay = i1 * 1500; // 1500 ms between puffs

  for (var i2 = 0; i2 < particlesPerPuff; i2++) {
    addNewParticle((i2 * 50) + puffDelay);
  }
}

function addNewParticle(delay) {
  var p = {};
  p.top = canvasHeight;
  p.left = randBetween(-200, 1200);

  p.start = new Date().getTime() + delay;
  p.life = 4000;
  p.speedUp = 70;
  p.speedRight = randBetween(10, 25);
  p.rot = randBetween(-1, 1);
  p.red = Math.floor(randBetween(0, 255));
  p.blue = Math.floor(randBetween(0, 255));
  p.green = Math.floor(randBetween(0, 255));
  p.startOpacity = 0.2;
  p.newTop = p.top;
  p.newLeft = p.left;
  p.size = 200;
  p.growth = 10;

  pCollection[pCount] = p;
  pCount++;
}

function draw() {
  var currentTime = new Date().getTime();

  // Grab and clear the canvas
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  ctx.clearRect(0, 0, c.width, c.height);

  var stillAlive = false;

  // Loop through particles
  for (var i = 0; i < pCount; i++) {
    var p = pCollection[i];
    var td = currentTime - p.start;
    var frac = td / p.life;

    if (td > 0 && td <= p.life) {
      stillAlive = true;

      var newTop = p.top - (p.speedUp * (td / 1200));
      var newLeft = p.left + (p.speedRight * (td / 1200));
      var newOpacity = Math.max(p.startOpacity * (1 - frac), 0);
      var newSize = p.size + (p.growth * (td / 1200));

      p.newTop = newTop;
      p.newLeft = newLeft;

      ctx.fillStyle = 'rgba(150,150,150,' + newOpacity + ')';
      ctx.globalAlpha = newOpacity;
      ctx.drawImage(smokeImage, newLeft, newTop, newSize, newSize);
    } else if (td > p.life) {
      // Reset particle to create a continuous effect
      p.start = currentTime + randBetween(3000, 8000);
    }
  }

  // Request the next frame
  requestAnimationFrame(draw);
}

function randBetween(n1, n2) {
  return (Math.random() * (n2 - n1)) + n1;
}

// Start the animation loop
requestAnimationFrame(draw);
