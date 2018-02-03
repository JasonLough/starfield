

const canvas = document.querySelector('#target')
const ctx = canvas.getContext('2d')
let interval = null
let playing = true

let starValues = {
  minSpeed: 1,
  maxSpeed: 2,
  width: 1,
  height:1,
  color:'black',
  maxStars:500,
  spawnRatePerSec:11,
  lastEmissionTime:0,
  spawnAreaWidth:5,
  spawnAreaHeight:5
}

let starArray = []


//rate is how many can be created per second
createStars = (rate = starValues.spawnRatePerSec) => {
  let spawnRate = 1000 / rate
  let time = new Date().getTime() //st like 2938472398547

  if( time > starValues.lastEmissionTime + spawnRate) { //then emit a new star...

    while(starArray.length < starValues.maxStars) { // ...until the starArray is full
      let tmp = {}
      tmp.x = canvas.width/2 - (~~(Math.random() * starValues.spawnAreaWidth)) + starValues.spawnAreaWidth/2
      tmp.y = canvas.height/2 - (~~(Math.random() * starValues.spawnAreaHeight)) + starValues.spawnAreaHeight/2
      tmp.speed = ~~(Math.random() * starValues.maxSpeed) + starValues.minSpeed
      tmp.angle = ~~(Math.random() * 360)

      starArray.push(tmp)
    }

    let tmpTime = starValues.lastEmissionTime 
    starValues.lastEmissionTime = new Date().getTime()

    console.log(`
      emission at ${starValues.lastEmissionTime}, delta: ${starValues.lastEmissionTime - tmpTime} star count = ${starArray.length}`);
  }


}

moveStar = e => {
  let theta = e.angle * (Math.PI / 180)
  e.x += e.speed * Math.cos(theta)
  e.y += e.speed * Math.sin(theta)

  let outOfBounds = (e.x < 0) || (e.y < 0) || (e.x > canvas.width) || (e.y > canvas.height)

  return outOfBounds === true ? [false, e] : [true , e]
    
}

drawStar = e => {
  ctx.fillRect(
    e.x - 2, 
    e.y - 2,
    starValues.width,
    starValues.height
  )
}


drawField = () => {

  createStars()
  
  ctx.fillStyle = 'white'
  ctx.fillRect(0,0,canvas.width, canvas.height)

  ctx.fillStyle = starValues.color

  starArray = starArray.filter( e => {

    var [inBounds, e] = moveStar(e)  // this parts kinda weird
    if(inBounds) {
      drawStar(e)
      return true      
    }

    return false
    
  }) 

}



let start = () => {
  
  interval = setInterval(drawField, 1000/60)  

  canvas.addEventListener('click', ()=>{

    playing = !playing
    
    if(playing)
      interval = setInterval(drawField, 1000/60)  
    else
      clearInterval(interval)      

  })

}

start()