var astro, astroImg
var Play = 0
var END = 1
var gameState = Play
var background1
var backgroundImg
var astoridImg 
var astroidGroup
var gameoverImg
var score = 0
var alienImg
var bulletImg
var bullet
var bulletGroup
var explosion 
var explosionImg
var gameover
var bottomEdge,topEdge
var alienArr = []
var count
var astroLife
var reset 
var resetImg 

function preload(){
  astroImg = loadImage("Images/astro (2).png")
  backgroundImg = loadImage("Images/space.png")
  astroidImg = loadImage("Images/metor.png")
  gameoverImg = loadImage("Images/gameover.png")
  alienImg = loadImage("Images/alien.png")
  bulletImg = loadImage("Images/bullet.png")
  explosionImg = loadImage("Images/explosion.png")
  resetImg = loadImage("Images/reset.png")
}
function setup() {
  createCanvas(displayWidth, displayHeight);
  gameover = createSprite(400,200,50,50)
  gameover.addImage(gameoverImg)
  gameover.visible = false
  background1 = createSprite(displayWidth/2,displayHeight/2,displayWidth*2, displayHeight) 
  background1.addImage(backgroundImg)
  background1.scale = 15
 
  alienGroup = createGroup()
  astroidGroup = createGroup()
  bulletGroup = createGroup()
  astro = createSprite(10, 200, 50, 50);
  astro.addImage(astroImg)
  astro.scale = 0.1
  count = 0 
  gameover = createSprite(400,200,50,50)
  gameover.addImage(gameoverImg)
  gameover.visible = false

  reset = createSprite(100,200,50,50)
  reset.addImage(resetImg)
  reset.scale = 0.1
  astroLife = 3
}

function draw() {
  background("red")
  drawSprites();

  /*score = frameCount
  text(score, 100,100)*/


  astro.velocityY = 0
  astro.velocityX = 0
 
  if (gameState === Play){
    for(var i = 0; i<astroLife; i++){
      image(astroImg, (i*50) + 600,10,30,30)
      
    }
    astro.visible = true
    gameover.visible = false
    reset.visible = false 
    astro.addImage(astroImg)

    background1.addImage(backgroundImg)
    if (background1.x <0 ){
      background1.x = windowWidth/2
     }

  textSize(20)
  textStyle(BOLD)
  textFont("Georgia")
  background1.velocityX = -15
  score = Math.round(World.frameRate/15) + score
  text("Score: "+ score,10,30)
  text("Ailens: "+ count,10,50)
    
    astro.setCollider("circle",0,0,40);
  
   
    astro.y = World.mouseY
  
    if (frameCount % 30 === 0) {
      var astroids = createSprite(displayWidth,displayHeight,40,10);
      astroids.y = random(0,displayHeight);
      astroids.addImage(astroidImg)
      astroids.scale = 0.03;
      astroids.velocityX = -17;
      astroids.lifetime = 300;
      astroidGroup.add(astroids)
       
    }

    if (frameCount % 30 === 0) {
      var alien = createSprite(displayWidth,3200,40,10);
      alien.y = random(0,displayHeight);
      alien.addImage(alienImg)
      alien.scale = 0.06
      alien.velocityX = -10;
      alien.lifetime = 300; 
      alienArr.push(alien)
      alienGroup.add(alien)
       
    }

   
       createBullet()
 
    for(var i = 0; i < alienArr.length; i++){
      if (alienArr[i].isTouching(bulletGroup)){
        alienArr[i].destroy()
       
        count += 1
      }
    }
    
    if(bulletGroup.isTouching(alienGroup)){

      bulletGroup.destroyEach()
    }
   
  }


  

  
  if(gameState == END){
   background1.velocityX = 0
   astro.velocityY = 0
   alienGroup.destroyEach()
   astroidGroup.destroyEach()
   bulletGroup.destroyEach()
   gameover.visible = true 
   gameover.scale = 0.5
   astro.visible = false
   reset.visible = true 
   
   textSize(20)
   text("Aliens Blasted: "+ count, 200, 365)
   text("Your Score: "+ score, 200, 340)
   text("Press Reset To Try Again", 200,390)
   if (keyDown("r")||mousePressedOver(reset)){
    gameState = Play
    score = 0 
    count = 0 
    astroLife = 3
    astroidGroup.destroyEach()
    alienGroup.destroyEach()
    bulletGroup.destroyEach()

  }
  }

 


if(astro.collide(astroidGroup)||(astro.collide(alienGroup))){
  
  alienGroup.destroyEach()
  astroidGroup.destroyEach()
  bulletGroup.destroyEach()
astroLife--
console.log(astroLife)
if(astroLife == 0){
  gameState = END
  console.log(gameState)
}
 astro.x = 100
 astro.y = 200 
}

}

function createBullet(){if ((keyDown("space")||touches.length>0) && (World.frameCount%10 == 0))
{
  var bullet = createSprite(20,100,60,10)
  touches = []
  bullet.addImage(bulletImg)
  bullet.x = 100
  bullet.y = astro.y
  bullet.setCollider("circle",0,0,30)
  bullet.scale = 0.4
  bullet.velocityX = 5
  bullet.lifetime = 200

  bulletGroup.add(bullet)
 
}
}