var balloon,balloonpos,database,position;
var backgroundImg;
var bi1,bi2;
function preload(){
backgroundImg=loadImage("pro-C35 images/Hot Air Ballon-01.png")
bi1=loadAnimation("pro-C35 images/Hot Air Ballon-02.png")
bi2=loadAnimation("pro-C35 images/Hot Air Ballon-02.png","pro-C35 images/Hot Air Ballon-02.png","pro-C35 images/Hot Air Ballon-02.png","pro-C35 images/Hot Air Ballon-03.png","pro-C35 images/Hot Air Ballon-03.png","pro-C35 images/Hot Air Ballon-03.png","pro-C35 images/Hot Air Ballon-04.png","pro-C35 images/Hot Air Ballon-04.png","pro-C35 images/Hot Air Ballon-04.png")
}

function setup() {
  createCanvas(1500,700);
  balloon=createSprite(750,580,150,150);
  balloon.addAnimation("HotAirBalloon",bi1)
  balloon.scale=0.5;
  database = firebase.database();
    balloonpos=database.ref('Balloon/position');
    balloonpos.on("value",readPosition,showError);
    textSize(20);}

function draw() {
  background(backgroundImg);  
  if(position!==undefined)
  if(keyDown(LEFT_ARROW)){
      writePosition(-10,0);
      balloon.addAnimation("HotAirBalloon",bi2);
  }
  else if(keyDown(RIGHT_ARROW)){
      writePosition(10,0);
      balloon.addAnimation("HotAirBalloon",bi2);
  }
  else if(keyDown(UP_ARROW)){
      writePosition(0,-10);
      balloon.addAnimation("HotAirBalloon",bi2);
      balloon.scale=balloon.scale-0.005;
  }
  else if(keyDown(DOWN_ARROW)){
      writePosition(0,+10);
      balloon.addAnimation("HotAirBalloon",bi2);
      balloon.scale=balloon.scale+0.005;
  }
  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move the Hot Air Balloon!",40,40);
}
function writePosition(x,y){
  database.ref('Balloon/position').set({ 
  'x':position.x + x,
  'y' : position.y + y
})
}
function readPosition(data){
  position=data.val();
  balloon.x=position.x;
  balloon.y=position.y;
  }
  function showError(){
      console.log("Error in writing value to the database");
  }