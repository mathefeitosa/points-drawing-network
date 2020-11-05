function setup(){
    let myCanvas = createCanvas(800, 800, WEBGL);
    createBoxes();
}

class Box {
    constructor(size, x, y, z, velX, velY, velZ, r, g, b, radX, radY, radZ){
        this.size = size;
        this.x = x;
        this.y = y;
        this.z = z;
        this.velX = velX;
        this.velY = velY;
        this.velZ = velZ;
        this.r = r;
        this.g = g;
        this.b = b;
        this.radX = radX;
        this.radY = radY;
        this.radZ = radZ;
    }
}

//Variables declaration
let boxes = [];
let closerBoxes = [];

//Control variables
let boxAmmount = 200;
let boxStrokeWeight = 0.3;
let boxSize = 5;
let limitSize = 500;
let initPosSpread = 300;
let lineDistance = 70;

function createBoxes(){
    for(i = 0; i < boxAmmount-1; i++){
        boxes.push(new Box(
            //Size
            boxSize,

            //Position
            random(-initPosSpread,initPosSpread),
            random(-initPosSpread,initPosSpread),
            random(-initPosSpread,initPosSpread),

            //velocity
            random(-3,3),
            random(-3,3),
            random(-3,3),
            
            //color
            random(0, 255),
            random(0, 255),
            random(0, 255),

            //rotation
            random(2*PI*10)/10,
            random(2*PI*10)/10,
            random(2*PI*10)/10
            ));
    }
}

function drawBoxes(){
    strokeWeight(boxStrokeWeight);
    for(i = 0; i < boxAmmount-1; i++){
        //fill the box with color
        fill(boxes[i].r, boxes[i].g, boxes[i].b);
        push();
        //Translate the actual box
        translate(boxes[i].x, boxes[i].y, boxes[i].z);
        //rotate the actual box;
        rotateX(boxes[i].radX);
        rotateY(boxes[i].radY);
        rotateY(boxes[i].radZ);
        //draw the actual box
        box(boxes[i].size);
        pop();
        
        //Update box positions velocities
        boxes[i].x += boxes[i].velX;
        boxes[i].y += boxes[i].velY;
        boxes[i].z += boxes[i].velZ;

        //Reset box positions
        //For X
        if(boxes[i].x < -limitSize){
            boxes[i].velX = boxes[i].velX*-1;
        }
        if(boxes[i].x > limitSize){
            boxes[i].velX = boxes[i].velX*-1;
        }

        //For Y
        if(boxes[i].y < -limitSize){
            boxes[i].velY = boxes[i].velY*-1;
        }
        if(boxes[i].y > limitSize){
            boxes[i].velY = boxes[i].velY*-1;
        }

        //For z
        if(boxes[i].z < -limitSize){
            boxes[i].velZ = boxes[i].velZ*-1;
        }
        if(boxes[i].z > limitSize){
            boxes[i].velZ = boxes[i].velZ*-1;
        }

        //Find lines
        actualBox = boxes[i];
        for(k = 0; k < boxAmmount-1; k++){
            d = dist(
                boxes[i].x,
                boxes[i].y,
                boxes[i].z,
                boxes[k].x,
                boxes[k].y,
                boxes[k].z
            );
            if(d < lineDistance){
                closerBoxes.push({
                    x: boxes[k].x,
                    y: boxes[k].y,
                    z: boxes[k].z
                });
            }
        }

        //draw the lines
        push();
        closerBoxes.forEach(box => {
            stroke(random(255), random(255), random(255));
            line(actualBox.x, actualBox.y, actualBox.z, box.x, box.y, box.z);
        });
        pop();
        
        closerBoxes = [];
    }
}

function draw(){
    //drawing the background
    background(200);    

    //drawing the boxes
    push();
    drawBoxes();
    pop();
}