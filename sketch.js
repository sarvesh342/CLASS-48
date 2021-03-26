var bg
var player
var playerImg
var enemy1
var enemy1Img
var enemy2
var enemy2Img
var bullet
var bulletImg
var enemycounter=0
var enemygrp
var bulletgrp
var gamestate="LVL1"
var gunshot
var restart
var laststate="LVL1"
var heartcount=3
function preload(){
bg=loadImage("GROUND.png")
playerImg=loadImage("Player.png")
enemy1Img=loadImage("ENEMY1.png")
enemy2Img=loadImage("ENEMY2.png")
bulletImg=loadImage("BULLET.png")
gunshot=loadSound("GunSHOT.mp3")
restartImg=loadImage("restart.png")
heartImg=loadImage("like.png")
}

function setup(){
 createCanvas(displayWidth-20,displayHeight-140)
 player=createSprite(70,displayHeight/2)
 player.addImage(playerImg)
 player.scale=0.5
enemygrp=new Group()
bulletgrp=new Group()
restart=createSprite(displayWidth/2,displayHeight/2,50,50)
restart.visible=false 
restart.addImage(restartImg)
restart.scale=3
}


function draw(){
  background(bg)
  //player.x=mouseX
player.y=mouseY
j=0
for (var i=0;i<heartcount;i++){
  j=j-30
  image(heartImg,displayWidth-j,50)
}
//bullet.x=player.x+70
if (gamestate==="LVL1"||gamestate==="LVL2"||gamestate==="LVL3"){
  console.log(gamestate)
  enemy(); 
  restart.visible=false
}
if (mousePressedOver(restart)){
  console.log("log")
  if (laststate==="LVL1"){
    gamestate="LVL2"
  }
if (laststate==="LVL2"){
  gamestate="LVL3"
}
if (laststate==="LVL3"){
  gamestate="END"
}
if (laststate==="END"){
  gamestate="LVL1"
  enemycounter=0
}
enemygrp.destroyEach()
}
if (gamestate==="END"){
  textSize(30)
  fill("blue")
  text("THE GAME ENDED",displayWidth/2-100,displayHeight/2-100)
  restart.visible=true
  laststate="END"
}
  
drawSprites();
if (enemycounter===2&&gamestate==="LVL1"){
  gamestate="restart"
  laststate="LVL1"
}
if (enemycounter===4&&gamestate==="LVL2"){
  gamestate="restart"
  laststate="LVL2"
}
if (enemycounter===6&&gamestate==="LVL3"){
  gamestate="restart"
  laststate="LVL3"
}
  
  for(var i=0;i<enemygrp.length;i++){
    var d=enemygrp.get(i)
    if (enemygrp.get(i)!=undefined && bulletgrp.isTouching(enemygrp.get(i))){
      console.log(enemygrp.get(i))
enemygrp.get(i).destroy()        
bulletgrp.destroyEach()
enemycounter++
    }
  }
if (gamestate==="restart"){
  restart.visible=true
  enemygrp.setVelocityXEach(0)
}

}

function keyPressed(){
  if (keyCode===32){
    createBullet();
  }
}
function enemy(){
  if (World.frameCount%80===0){
    enemy1=createSprite(displayWidth-100,random(20,displayHeight-150))
    var rand=Math.round(random(1,2))
    if (rand===1){
      enemy1.addImage(enemy1Img)
      enemy1.scale=0.5
      enemy1.rotation=-90
    }
    else{
      enemy1.addImage(enemy2Img)
      enemy1.scale=0.3
      enemy1.rotation=90 
    }

enemy1.velocityX=-2
console.log(enemycounter)    
    enemy1.lifetime=displayWidth/2
     enemygrp.add(enemy1)
  }
}
function createBullet(){
  bullet=createSprite(player.x+70,displayHeight/2)
bullet.addImage(bulletImg)
bullet.scale=0.1
bullet.velocityX=20
bullet.y=player.y+25
gunshot.play()
bullet.lifetime=displayWidth/20
bulletgrp.add(bullet)
}