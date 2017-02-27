Servo a;
Servo b;
Servo c;
Servo d;

int angle;
int angle2;
int angle3;
int angle4;

void setup() {
    angle = 90;
    angle2 = 92;
    angle3 = 180;
    angle4 = 0;
    a.attach(D0);
    b.attach(D1);
    c.attach(D2);
    d.attach(D3);
    
    Particle.variable("angle", angle);
    Particle.variable("angle2", angle2);
    Particle.variable("angle3", angle3);
    Particle.function("set", set);
}

void loop() {
    a.write((180 - angle) - 10);
    b.write(180 - angle2);
    c.write(180 - angle3);
    d.write(angle4);
}

int set(String i){
    received = i;
    angle = i.substring(0,3).toInt();
    angle2 = i.substring(3,6).toInt();
    angle3 = i.substring(6,9).toInt();
    angle4 = i.substring(9,12).toInt();
    return 0;
}
