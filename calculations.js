//Variables with distance shall be in centimeters, 3 digit variables are in pixels
//Physical aspects
var distancefromcanvas = 3; //Distance of 1st servo pivot point from the "canvas" (paper)
var pixelToCm = 15 / 500; // divides the width of the paper (15cm) into 500px (size of html5 canvas)
var middlepx = 250;
var armone = 9.5; //Set to your 1st arm length
var armtwo = 11.5; //Set to your 2nd arm length
var radToDeg = 180 / Math.PI;

//s = servo, suffix is the servo identifier

var sA = 0;
var sB = 0;
var sC = 0;
var sD = 0;

var heightDisplace = 3.125; //distance of robot arm from the floor

var g;
var aTone;
var aTtwo;
var aTthree;
var aTfour;

//aspects of virtual triangles

//calculating position on physical Canvas (2D)

var a,b,c;
var floorAngle = 0;

/*
A is the base of the triangle
B is the side of the triangle
C is the hypotenuse of the triangle
*/

//Calculates where to point the robotic arm

function calculateFloorAngle(x,y){
    a = Math.abs(x - middlepx) * pixelToCm;
    b = (y * pixelToCm) + distancefromcanvas;
    c = Math.sqrt(Math.pow(a,2) + Math.pow(b,2));
    floorAngle = Math.acos((a/c)) * radToDeg;
    if(x < 250)
        return Math.round(floorAngle);
    else
        return Math.round(180 - floorAngle);
}

//calculating position in 3D space

//Positioning of the robotic arms is taken care of in this function

function calculateTriangleAngles(x,y){
    console.clear();
    sA = calculateFloorAngle(x,y);
    g = Math.sqrt(Math.pow(heightDisplace,2) + Math.pow(c,2));
    aTone = Math.atan(heightDisplace/c) * radToDeg;
    aTtwo = getAngleCos(g, armtwo, armone);
    console.log("g: " + g);
    console.log("armtwo: " + armtwo);
    console.log("aTone: " + aTone + "\naTtwo: " + aTtwo);
    sD = 90 - Math.round(aTone + aTtwo);
    aTthree = Math.atan(c / heightDisplace) * radToDeg;
    aTfour = getAngleCos(g, armone, armtwo);
    sB = 180 - Math.round(aTthree + aTfour);
    sC = 180 - Math.round(aTfour + aTtwo);
    
    indvsend(sA,sB,sC,sD);
    console.log("servo A: " + sA + "\nservo B: " + sB + "\nservo C: " + sC + "\nservo D: "+sD);
}

//solves for angle of the third variable (cc)

function getAngleCos(aa,bb,cc){
    var cos = (Math.pow(aa,2) + Math.pow(bb,2) - Math.pow(cc,2)) / (2 * aa * bb);
    return Math.acos(cos) * radToDeg;
}

//sending data
var id = "YOUR DEVICE ID HERE" + "/";
var token = "?access_token=" + "YOUR ACCESS TOKEN HERE";
var funcName = "FUNCTION TO BE CALLED HERE" + "/";
var url = "https://api.particle.io/v1/devices/" + id + funcName + token;

//sends the string to the Photon
function send(tosend){
    var http = new XMLHttpRequest();
    http.open("post",url,true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send("args=" + tosend);
}

//function allows user to manually input servo values. The function automatically sends the inputs as a formatted string.
function indvsend(a,b,c,d){
    var string = '';
    var vals = [a,b,c,d];
    for(var i = 0; i < 4; i++){
        if(vals[i] < 100 && vals[i] > 0)
            if(vals[i] > 9)
                string += "0" + vals[i].toString();
            else
                string += "00" + vals[i].toString();
        else if(vals[i] == 0)
            string += "000";
        else
            string += vals[i].toString();
    }
    console.log("String sent: " + string);
    send(string);
}

function liftPen(){
    if(mouseY > 200)
        heightDisplace = 0.1;
    else
        heightDisplace = 1;
    calculateTriangleAngles(mouseX,mouseY);
}

function dropPen(){
    heightDisplace = 2;
}
