var canvas = document.getElementById('canvas-1');
var ctx = canvas.getContext('2d');
var particleArray = [];
var hue = 0; 

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', function (){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const mouse = {
    x: undefined,
    y: undefined,
}

window.addEventListener('click', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    for(let i=0; i<10; i++){ 
        particleArray.push(new Particle())
    }
});

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    for(let i=0; i<30; i++){ 
        particleArray.push(new Particle())
    }
});

class Particle{
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = "hsl(" + hue + ",100%, 50%)";
    }

    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.size > 0.2) this.size -= 0.1;
    }
    
    draw(){
        ctx.fillStyle = this.color; 
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function handleParticles(){
    for (let i=0; i<particleArray.length; i++){
        particleArray[i].update();
        particleArray[i].draw();

        if(particleArray[i].size <= 0.3){
            particleArray.splice(i,1);
        }


    }
}

function animate(){
    ctx.fillStyle = 'rgba(0,0,0,0.08)'
    ctx.fillRect(0,0,canvas.width,canvas.height);
    handleParticles();
    hue ++;
    requestAnimationFrame(animate);
}

animate()