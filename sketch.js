var astro, astroImg
var Play
var END 
var gameState
var background1
var backgroundImg
var astoridImg 
var astroidGroup
var gameoverImg
var score 
var alienImg
var bulletImg
var bullet
var bulletGroup
var explosion 
var explosionImg
var gameover
var bottomEdge,topEdge
var alienArr = []

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
  background1 = createSprite(0,200,400,400) 
  background1.addImage(backgroundImg)
  background1.scale = 2.5
  alienGroup = createGroup()
  astroidGroup = createGroup()
  bulletGroup = createGroup()
  Play = 1
  END = 0
  gameState = Play
  createEdgeSprites()
  astro = createSprite(100, 200, 50, 50);
  astro.addImage(astroImg)
  astro.scale = 0.09999
  score = 1
  score = frameCount
  gameover = createSprite(400,200,50,50)
  gameover.addImage(gameoverImg)
  gameover.visible = false
  text(score, 100,100)

  bottomEdge = createSprite(0,400,800,5);
  topEdge = createSprite(0,0,800,5);
  bottomEdge.shapeColor = "black"
  topEdge.shapeColor = "black"
  
}

function draw() {




  astro.velocityY = 0
  astro.velocityX = 0

  if (gameState === Play){

    astro.addImage(astroImg)
    background("white");  

    background1.addImage(backgroundImg)
    if (background1.x <200 ){
      background1.x = background1.width/2
     }

   
  background1.velocityX = -15
  score = frameCount
    drawSprites();
    
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

    if(keyCode == 32){
   
       createBullet()
    }
    for(var i = 0; i < alienArr.length; i++){
      if (alienArr[i].isTouching(bulletGroup)){
        alienArr[i].destroy()
     
      }
    }
    
    if(bulletGroup.isTouching(alienGroup)){

      bulletGroup.destroyEach()
    }
    astro.collide(topEdge)
    astro.bounceOff(bottomEdge)
  }


  

  
  if(gameState === END){
  
   background1.velocityX = 0
   astro.velocityY = 0
   
   if (keyDown("space")){
     gameState = Play
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

function createBullet(){if (World.frameCount%15 == 0)
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