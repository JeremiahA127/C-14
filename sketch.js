var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud 


var score;


function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
 cloudImg = loadImage("cloud.png");

obstacle1 = loadImage("obstacle1.png")
obstacle2 = loadImage("obstacle2.png")
obstacle3 = loadImage("obstacle3.png")
obstacle4 = loadImage("obstacle4.png")
obstacle5 = loadImage("obstacle5.png")
obstacle6 = loadImage("obstacle6.png")
}

function setup() {

  createCanvas(600,200)
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //generate random numbers
  var ran = Math.round(random(1,10));
  console.log(ran);
  score = 0;

  obstaclesGroup = new Group();
  cloudsGroup = new Group();

}

function draw() {
  //set background color
  background(180);
  text("Score: " + score, 500,50)
  //console.log(trex.y)
  if(gameState ===PLAY){
    ground.velocityX = -4;
    score = score + Math.round(frameCount/60); 
  // jump when the space key is pressed
  if(keyDown("space")&& trex.y >= 100) {
    trex.velocityY = -10;
  }
  trex.velocityY = trex.velocityY + 0.8
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
 //Spawn Clouds
 spawnClouds()
 //spawn obstacles
  spawnObstacles()

if(obstaclesGroup.isTouching(trex)){
  gameState = END



  }
  
  }
  else if(gameState === END){
    ground.velocityX = 0;
 obstaclesGroup.setVelocityXEach(0);
 cloudsGroup.setVelocityXEach(0);
 
  }

 //stop trex from falling down
  trex.collide(invisibleGround);
  
 
  drawSprites();
}

//function to spawn the clouds
function spawnClouds(){
 // write your code here 
if(frameCount % 112 === 0){
  cloud = createSprite(600,40,40,10)
  cloudsGroup.add(cloud)
  cloud.lifetime = 200;
  cloud.addImage(cloudImg);
  cloud.velocityX = -4  
  cloud.scale = .9
  cloud.y = Math.round(random(10,60))
//console.log(trex.depth)
//console.log(cloud.depth)
  cloud.depth = trex.depth
  trex.depth += 1


}
 }

 function spawnObstacles(){

  if(frameCount % 72 === 0){
  obstacle = createSprite(580,180,10,40)
  obstaclesGroup.add(obstacle);
  obstacle.velocityX = -6
 obstacle.scale = 0.5;
 obstacle.lifetime = 200;

var ran = Math.round(random(1,6))
switch(ran){
     case 1:
      obstacle.addImage(obstacle1);
    //  obstacle.scale = 0.5;

      break;
    case 2:
      obstacle.addImage(obstacle2)  
    break
    case 3:
      obstacle.addImage(obstacle3);
    break;
    case 4:
      obstacle.addImage(obstacle4);
    break;
    case 5:
      obstacle.addImage(obstacle5);
    break;
    case 6:
      obstacle.addImage(obstacle6);
    break;
    default:
      break;
    }
  }
 }



