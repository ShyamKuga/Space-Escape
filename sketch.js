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

function preload(){
  astroImg = loadImage("Images/astro (2).png")
  backgroundImg = loadImage("Images/space.png")
  astroidImg = loadImage("Images/metor.png")
  gameoverImg = loadImage("Images/gameover.png")
  alienImg = loadImage("Images/alien.png")
  bulletImg = loadImage("Images/bullet.png")
  explosionImg = loadImage("Images/explosion.png")
}
function setup() {
  createCanvas(800,400);
  gameover = createSprite(400,200,50,50)
  gameover.addImage(gameoverImg)
  gameover.visible = false
  background1 = createSprite(0,200,400,400) 
  background1.addImage(backgroundImg)
  background1.scale = 2.5
  alienGroup = createGroup()
  astroidGroup = createGroup()
  bulletGroup = createGroup()
  astro = createSprite(100, 200, 50, 50);
  astro.addImage(astroImg)
  astro.scale = 0.09999
  count = 0 
  gameover = createSprite(400,200,50,50)
  gameover.addImage(gameoverImg)
  gameover.visible = false
  bottomEdge = createSprite(0,400,800,5);
  topEdge = createSprite(0,0,800,5);
  bottomEdge.shapeColor = "black"
  topEdge.shapeColor = "black"
  
}

function draw() {
  drawSprites();

  /*score = frameCount
  text(score, 100,100)*/


  astro.velocityY = 0
  astro.velocityX = 0
 
  if (gameState === Play){
    astro.visible = true
    gameover.visible = false
    astro.addImage(astroImg)

    background1.addImage(backgroundImg)
    if (background1.x <200 ){
      background1.x = background1.width/2
     }

  textSize(20)
  textStyle(BOLD)
  textFont("Georgia")
  background1.velocityX = -15
  score = Math.round(World.frameRate/15) + score
  text("Score:"+ score,10,30)
  text("Ailens: "+ count,10,50)
    
    astro.setCollider("circle",0,0,40);
  
    if (keyCode === UP_ARROW){
      astro.velocityY = -3
    }
    if (keyCode === DOWN_ARROW){
      astro.velocityY = 3
    }
  
    if (frameCount % 30 === 0) {
      var astroids = createSprite(900,3200,40,10);
      astroids.y = random(0,700);
      astroids.addImage(astroidImg)
      astroids.scale = 0.03;
      astroids.velocityX = -17;
      astroids.lifetime = 300;
      astroidGroup.add(astroids)
       
    }

    if (frameCount % 30 === 0) {
      var alien = createSprite(900,3200,40,10);
      alien.y = random(0,400);
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
    astro.collide(topEdge)
    astro.bounceOff(bottomEdge)
  }


  

  
  if(gameState == END){
  console.log(gameover.visible)
   background1.velocityX = 0
   astro.velocityY = 0
   alienGroup.destroyEach()
   astroidGroup.destroyEach()
   bulletGroup.destroyEach()
   gameover.visible = true 
   gameover.scale = 0.5
   astro.visible = false
   if (keyDown("space")){
    gameState = Play
    score = 0 
    astroidGroup.destroyEach()
    alienGroup.destroyEach()
    bulletGroup.destroyEach()

  }
  }

 


if(astro.collide(astroidGroup)||(astro.collide(alienGroup))){
  
gameState = END

 astro.x = 100
 astro.y = 200 
}

}

function createBullet(){if (keyDown("space") && (World.frameCount%10 == 0))
{
  var bullet = createSprite(100,100,60,10)
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