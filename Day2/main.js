var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d'); 
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// ctx.fillStyle = 'blue';
// creating linear gradient
gradient = ctx.createLinearGradient(0,0,canvas.width,canvas.height);
gradient.addColorStop(1, 'black');
gradient.addColorStop(0.5, 'green');
gradient.addColorStop(0, 'blue');

class Particle{
    constructor(effect){
        this.effect = effect;
        this.radius = Math.random() * 13 + 1;
        this.x = this.radius + Math.random() * ( effect.width - this.radius * 2);
        this.y = this.radius + Math.random() * ( effect.height - this.radius * 2);
        this.vx = Math.random() * 1 - .5;
        this.vy = Math.random() * 1 - .5;
    }

    draw(context){
        // ctx.fillStyle = gradient;
        context.fillStyle = 'hsl(' + this.x * 0.5 + ',' + '50%, 50%)';
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
        context.stroke();
    }

    update(){
        this.x += this.vx;
        if (this.x > this.effect.width || this.x < this.radius){
            this.vx *= -1;
        }
        
        this.y += this.vy;
        if(this.y > this.effect.height || this.y < this.radius) {
            this.vy *= -1;
        }
    }
}


class Effect{
    constructor(){
        this.canvas = canvas; 
        this.width = this.canvas.width;
        this.height = this.canvas.height;        
        this.initialParticles = 150;
        this.particles = [];
        this.initParticles(); 
    }

    initParticles(){
        for(let i=0; i< this.initialParticles; i++){
            this.particles.push(new Particle(this))
        }
    }
   
    handleParticles(context){
        this.particles.forEach((particle) => {
            particle.draw(context)
            particle.update()
        });
    }


    connectParticles(){
        var maxwidth = 150;
        for(let i=0; i<this.particles.length; i++){
            for (let j=i; j<this.particles.length; j++){
                var particle1x = this.particles[i].x - this.particles[j].x;
                var particle2y = this.particles[i].y - this.particles[j].y;
                
                var distance = Math.sqrt(particle1x * particle1x + particle2y * particle2y);
                
                if (distance < maxwidth){
                    ctx.save();
                    var opacity = 1 - (distance / maxwidth);
                    ctx.globalAlpha = opacity;
                    ctx.beginPath();
                    ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    ctx.stroke();
                    ctx.restore();
                }
            }
        }
    }
}

let effect = new Effect(canvas);
function animate(){
    ctx.strokeStyle = "white";
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,effect.width,effect.height);
    effect.connectParticles();
    effect.handleParticles(ctx);
    requestAnimationFrame(animate);
}

animate();