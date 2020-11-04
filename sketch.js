function setup(){
    let myCanvas = createCanvas(800, 800);
    background(200);
    createPoints();
}

// Control variables
let pointsNumber = 400;
let randomFactor = 200;
let strokeDistance = 60;

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
        points.push(new Points(random(width), random(height), (random(-randomFactor, randomFactor)/100), (random(-randomFactor, randomFactor)/100)));
    }
}

function updatePoints(){
    points.forEach(element => {
        element.y += element.speedY;
        element.x += element.speedX;
        if(element.y < 0){
            element.y = width;
        }
        if(element.x < 0){
            element.x = height;
        }
        if(element.y > width){
            element.y = 0;
        }
        if(element.x > height){
            element.x = 0;
        }
    });
}

function pointsDistance(xA, yA, xB, yB) { 
	var xDiff = xA - xB; 
	var yDiff = yA - yB;

	return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}

function drawLines(point){
    strokeWeight(1);
    closerPoints.forEach(element => {
        colorValue = (255/strokeDistance) * element.distance;
        stroke(colorValue,colorValue, colorValue);
        line(point.x, point.y, element.x, element.y);
    });
}

function drawLineToCloserPoints(){
    for(i = 0; i < points.length-1; i++){
        closerPoints = [];
        distance = 0;
        for(k = 0; k < points.length-1; k++){
            distance = pointsDistance(points[k].x, points[k].y, points[i].x, points[i].y);
            if(distance < strokeDistance){
                closerPoints.push({
                    x: points[k].x,
                    y: points[k].y,
                    distance: distance
                });
            }
        }
        drawLines(points[i]);
    }
}

function draw(){
    clear();
    drawLineToCloserPoints();
    stroke(0, 0, 0);
    strokeWeight(3);
    points.forEach(element => {
        point(element.x, element.y);
    });
    updatePoints();
}