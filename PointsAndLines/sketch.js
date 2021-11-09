var capturer = new CCapture({
  framerate: 60,
  format: "gif",
  verbose: true,
});

var frameCount = 0;

function setup() {
  createCanvas(800, 800).canvas;
  background(200);
  createPoints();
  capturer.start();
}

// Control variables
let pointsNumber = 200;
let randomFactor = 200;
let lineDistance = 50;
let lineStrokeWidth = 7;
let pointsStrokeWidth = 8;
let pColor = {
  r: 0,
  g: 0,
  b: 0,
};

// Array declarations (empty)
let points = [];
let closerPoints = [];

class Points {
  constructor(x, y, speedY, speedX, r, g, b) {
    this.x = x;
    this.y = y;
    this.speedY = speedY;
    this.speedX = speedX;
    this.r = r;
    this.b = b;
    this.g = g;
  }
}

function createPoints() {
  for (i = 0; i < pointsNumber; i++) {
    points.push(
      new Points(
        random(width),
        random(height),
        random(-randomFactor, randomFactor) / 100,
        random(-randomFactor, randomFactor) / 100,
        random(255),
        random(255),
        random(255)
      )
    );
  }
}

function pointsDistance(xA, yA, xB, yB) {
  var xDiff = xA - xB;
  var yDiff = yA - yB;

  return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}

function drawLines() {
  push();
  points.forEach((p) => {
    //find and draw the closer lines
    strokeWeight(lineStrokeWidth);
    points.forEach((otherPoint) => {
      d = pointsDistance(p.x, p.y, otherPoint.x, otherPoint.y);
      if (d < lineDistance) {
        //drawing
        colorValue = map(d, 0, lineDistance, 0, 255);
        stroke(colorValue, colorValue, colorValue);
        strokeWeight((1 / lineDistance) * d);
        line(p.x, p.y, otherPoint.x, otherPoint.y);
      }
    });
  });
  pop();
}

function drawPoints() {
  push();
  strokeWeight(pointsStrokeWidth);
  points.forEach((p) => {
    stroke(p.r, p.g, p.b);
    //drawing the points
    point(p.x, p.y);

    //update the position of points
    p.y += p.speedY;
    p.x += p.speedX;
    if (p.y < 0) {
      p.speedY *= -1;
    }
    if (p.x < 0) {
      p.speedX *= -1;
    }
    if (p.y > width) {
      p.speedY *= -1;
    }
    if (p.x > height) {
      p.speedX *= -1;
    }
  });
  pop();
}

function draw() {
  clear();
  drawLines();
  drawPoints();
  frameCount++;

  if (frameCount < 10) {
    capturer.capture(document.getElementById("defaultCanvas0"));
  } else {
    capturer.stop();
    capturer.save();
  }
}
