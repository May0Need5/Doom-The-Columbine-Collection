(function () {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
          window.setTimeout(callback, 1000 / 60);
      };
  window.requestAnimationFrame = requestAnimationFrame;
})();

var image1 = new Image(),
  image2 = new Image();

var canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d"),
  width = 600,
  height = 500;

canvas.width = width;
canvas.height = height;


var meltCan = document.createElement("canvas"),
  meltCtx = meltCan.getContext("2d"),
  images = [image1, image2],
  bgImage = 1,
  meltImage = 0,

  settings = {
      colSize: 2, 
      maxDev: 150, 
      maxDiff: 50, 
      fallSpeed: 3, 
  },
  columns = width / settings.colSize, 
  y = [], 
  done = true; 

meltCan.width = 600;
meltCan.height = 500;

function init() {
  meltCtx.drawImage(images[meltImage], 0, 0,600,500);
 
  for (var x = 0; x < columns; x++) {
      
      if (x === 0) {
          y[x] = -Math.floor(Math.random() * settings.maxDev);
      } else {
          
          y[x] = y[x - 1] + (Math.floor(Math.random() * settings.maxDiff) - settings.maxDiff / 2);
      }

      if (y[x] > 0) {
          y[x] = 0;
      } else if (y[x] < -settings.maxDev) {
          y[x] = -settings.maxDev;
      }
  }
}


var col = 0,
  yPos = 0;

function doMelt() {
  ctx.drawImage(images[bgImage], 0, 0,600,500 );
  done = true;

  for (col = 0; col < columns; col++) {
      y[col] += settings.fallSpeed;

      if (y[col] < 0) {
          done = false;
          yPos = 0;
      } else if (y[col] < height) {
          done = false;
          yPos = y[col];
      }

      ctx.drawImage(meltCan, col * settings.colSize, 0, settings.colSize, height, col * settings.colSize, yPos, settings.colSize, height);
  }

  if (done) {
      // Optional for potential additional actions
  }

  requestAnimationFrame(doMelt);
}


image1.src = "images/cover1.webp";

image2.src = "images/ClipBG600.png";

image2.onload = function () {
  ctx.drawImage(image1, 0, 0,600,460); 
  setTimeout(function() {
      init();
      doMelt();
  }, 5000); 
};
