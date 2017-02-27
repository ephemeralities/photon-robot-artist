console.clear();

//Stroke length is not used anymore
var strokeLength = 0;

var mouseClicked = false;

var bo,bTh,bF,bT;
var container;
var heightAdjust;

//canvas
var canvas = document.createElement("canvas");
document.body.appendChild(canvas);
var ctx = canvas.getContext("2d");
var mouseX, mouseY,prevmouseX,prevmouseY;
var gap = 20; //this is the gap between two points (px). It serves to limit the amount of calls made to the Photon
canvas.width = 500;
canvas.height = 450;
ctx.fillStyle = "#FFFFFF";

var countBox,clear;

prevmouseX = 0, prevmouseY = 0;
window.onload = function() {
    
    heightAdjust = document.getElementById("height");
    clear = document.getElementById("reset");
    countBox = document.getElementById("strokeCount");
    container = document.getElementById("container");
    
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000000";

    canvas.onmousemove = function(e) {
        mouseX = e.clientX - 10;
        mouseY = 500 - e.clientY + 10;
        if (mouseClicked == true){
                if((mouseX > prevmouseX + gap || mouseX < prevmouseX - gap) || (mouseY > prevmouseY + gap || mouseY < prevmouseY - gap)){
                    ctx.lineTo(mouseX, 500 - mouseY);
                    countBox.innerHTML = "Current stroke length: " + strokeLength;
                    prevmouseX = mouseX;
                    prevmouseY = mouseY;
                    calculateTriangleAngles(mouseX,mouseY);
                    console.log("X: " + mouseX + " Y:" + mouseY);
                    strokeLength++;
                }
            ctx.stroke();
        }
    };
    canvas.onmousedown = function() {
        if (mouseClicked == false) {
            ctx.beginPath();
            ctx.moveTo(mouseX, 500 - mouseY);
        }
        mouseClicked = true;
        dropPen();
        ctx.lineWidth = 5; //Sets the thickness of the line on the canvas
    };
    canvas.onmouseup = function() {
        liftPen();
        strokeLength = 0;
        mouseClicked = false;
        ctx.closePath();
    };
    clear.onclick = function(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = "#000000";
        console.clear();
    };
    bo = document.getElementById("servo");
    bo.max = 180;
    bo.min = 0;
    bo.value = 10;
    bT = document.getElementById("serv2");
    bTh = document.getElementById("serv3");
    bF = document.getElementById("serv4");
    
    container.onmouseup = function(){
        indvsend(Number(bo.value), Number(bT.value), Number(bTh.value), Number(bF.value));
    };
    
    heightAdjust.onmouseup = function(){
        console.log(heightAdjust.value);
    }
};
