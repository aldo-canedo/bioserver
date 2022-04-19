// where the serial server is (your local machine):
var host = 'test-bio-socket.herokuapp.com';
var socket; // the websocket
var sensorValue = 0; // the sensor value
let xvals = [];
let yvals = [];
let bvals = [];




function setup() {
  createCanvas(400, 400);
  // connect to server:
  socket = new WebSocket('wss://' + host);
  // socket connection listener:
  socket.onopen = sendIntro;
  // socket message listener:
  socket.onmessage = readMessage;
}

function draw() {
  
   background("#2307AF");
  fill(255);
  ellipse(sensorValue, height / 2, 20, 20);
  text(sensorValue, 20, 20);
  
  
  for (let i = 1; i < width; i++) {
    xvals[i - 1] = xvals[i];
    yvals[i - 1] = yvals[i];
    bvals[i - 1] = bvals[i];
  }
  // Add the new values to the end of the array
  xvals[width - 1] = sensorValue;
  yvals[width - 1] = mouseY;
  
    for (let i = 1; i < width; i++) {
    stroke(255);
    point(i, xvals[i] /2 );
    stroke(0);
    point(i, height / 3 + yvals[i] / 3);
    stroke(255);
   /* line(
      i,
      (2 * height) / 3 + bvals[i] / 3,
      i,
      (2 * height) / 3 + bvals[i - 1] / 3
    );*/
    }


}

function sendIntro() {
  // convert the message object to a string and send it:
  socket.send("Hello");
}

function readMessage(event) {
  var msg = event.data; // read data from the onmessage event
  sensorValue = Number(msg) / 4;
  println(sensorValue); // print it
}