function setup(){
    let myCanvas = createCanvas(800, 800);
    background(200);
    createPoints();
}

// Control variables
let pointsNumber = 300;
let randomFactor = 200;
let strokeDistance = 60;
let lineStrokeWidth = 1;
let pointsStrokeWidth = 5;
let pColor = {
    r: 0,
    g: 0,
    b: 0
}

// Array declarations (empty)
let points = [];
let closerPoints = [];

class Points{
    constructor(x, y, speedY, speedX){
        this.x = x;
        this.y = y;
        this.speedY = speedY;
        this.speedX = speedX;
    }
}

function createPoints(){
    for (i = 0; i < pointsNumber; i++){
        points.push(new Points(
            random(width),
            random(height),
            (random(-randomFactor, randomFactor)/100),
            (random(-randomFactor, randomFactor)/100)));
    }
}

function pointsDistance(xA, yA, xB, yB) { 
	var xDiff = xA - xB; 
	var yDiff = yA - yB;

	return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}

function drawLines(){
    push();
    points.forEach(p => {
        //find and draw the closer lines
        strokeWeight(lineStrokeWidth);
        points.forEach(otherPoint => {
            d = pointsDistance(p.x, p.y, otherPoint.x, otherPoint.y);
            if(d < strokeDistance){                
                //drawing
                colorValue = (255/strokeDistance) * d;
                stroke(colorValue,colorValue, colorValue);
                line(p.x, p.y, otherPoint.x, otherPoint.y);
            }
        });
    });
    pop();
}

function drawPoints(){
    push();
    stroke(
        pColor.r,
        pColor.g,
        pColor.b
    );
    strokeWeight(pointsStrokeWidth);
    points.forEach(p => {
        //drawing the points
        point(p.x, p.y);

        //update the position of points
        p.y += p.speedY;
        p.x += p.speedX;
        if(p.y < 0){
            p.y = width;
        }
        if(p.x < 0){
            p.x = height;
        }
        if(p.y > width){
            p.y = 0;
        }
        if(p.x > height){
            p.x = 0;
        }
    });
    pop();
}

function draw(){
    clear();
    drawLines();
    drawPoints();
}