var database
var dog,happyDog,dogImage
var foodS,foodStock

function preload()
{
  dogImage = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png")
}

function setup() {
  database = firebase.database()
	createCanvas(500, 500);
  foodStock=database.ref('Food')
  foodStock.on("value",readStock)
  dog = createSprite(250,400)
  dog.addImage(dogImage)
  dog.scale=0.2 
  
}


function draw() {  
  background(46,139,87)
  textSize(20)
  fill(0)
  text("Press up arrow for feeding Tommy",90,30)
  

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }
  drawSprites();
  
  textSize(20)
  fill(245,66,66)
  text("Food Left :"+foodS,180,300)
  
}



function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
   
  database.ref('/').update({
    Food:x
  })
}

