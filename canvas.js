console.clear();

/*length of stroke (in points)
Length of stroke is specified in the Particle Photon int array
Currently holds 100 points
*/
var strokeLength = 0;

var test;

var mouseClicked = false;

var bo,bTh,bF,bT;
var container;
var heightAdjust;

//canvas
var canvas = document.createElement("canvas");
document.body.appendChild(canvas);
var ctx = canvas.getContext("2d");
var mouseX, mouseY,prevmouseX,prevmouseY;
var gap = 20;
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
        test = e;
        mouseX = e.clientX - 10;
        mouseY = 500 - e.clientY + 10;
        if (mouseClicked == true){
            //if(strokeLength < 100){
                if((mouseX > prevmouseX + gap || mouseX < prevmouseX - gap) || (mouseY > prevmouseY + gap || mouseY < prevmouseY - gap)){
                    ctx.lineTo(mouseX, 500 - mouseY);
                    countBox.innerHTML = "Current stroke length: " + strokeLength;
                    prevmouseX = mouseX;
                    prevmouseY = mouseY;
                    calculateTriangleAngles(mouseX,mouseY);
                    console.log("X: " + mouseX + " Y:" + mouseY);
                    strokeLength++;
                }
            //}else{
            //    countBox.innerHTML = "You have exceeded the max stroke limit, any continued drawing will be ignored";
            //}
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
        ctx.lineWidth = 5;
    };
    canvas.onmouseup = function() {
        //console.clear()
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
