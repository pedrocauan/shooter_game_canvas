
class Sprite {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }

    draw() {
        ctx.beginPath() //Prepara o desenho
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false/*horario ou antihorario*/) //Desenha circulos
        ctx.fillStyle = this.color
        ctx.fill() //pinta tela
    }
}


//Esferas que se movem ao redor do player
class Sphere extends Sprite {
    constructor(x, y, radius, color, angleUpdateValue, player) {
        super(x, y, radius, color) //herda os atributos do pai (sprite)
        this.angleUpdateValue = angleUpdateValue //Velocidade que a esfera orbita
        this.player = player
        this.angle = 0 //Angulo inicial da animação
    }

    update() {
        this.draw()
        this.angle += this.angleUpdateValue

        // Evita que o jogo coma a memória toda do navegador
        if (Math.abs(this.angle) >= Math.PI * 2) {
            this.angle = 0
        }

        //Distancia da esfera com relação ao player
        this.x = this.player.x + Math.cos(this.angle) * this.player.radius
        this.y = this.player.y + Math.sin(this.angle) * this.player.radius

    }


}

class Player extends Sprite {
    constructor(x, y, radius, color) {
        super(x, y, radius, color) //herda os atributos do pai (sprite)
        this.coreRadius = radius / 6
        //primeira esfera que orbita
        this.s1 = new Sphere(
            this.x + Math.cos(0) * this.radius,
            this.y + Math.sin(0) * this.radius,
            2,
            playerColor,
            .08,
            this
        )
        this.s2 = new Sphere(
            this.x + Math.cos(0) * this.radius,
            this.y + Math.sin(0) * this.radius,
            2,
            playerColor,
            -.08,
            this
        )
    }

    draw() {
        ctx.beginPath() //Prepara o desenho
        ctx.arc(this.x, this.y, this.coreRadius, 0, Math.PI * 2, false/*horario ou antihorario*/) //Desenha circulos
        ctx.strokeStyle = this.color //desenha o player como borda
        ctx.stroke() //pinta o player
    }

    update() {
        this.draw()
        this.s1.update()
        this.s2.update()
    }

}

//Tiros do player
class Projectile extends Sprite {
    constructor(x, y, radius, color, velocity) {
        super(x, y, radius, color)
        this.velocity = velocity
    }

    update() {
        this.draw()
        this.x += this.velocity.x
        this.y += this.velocity.y
    }
}

//inimigos na tela
class Enemy extends Projectile {
    constructor(x, y, radius, color, velocity) {
        super(x, y, radius, color, velocity)
        this.newRadius = radius
    }

    //Encolhe o inimigo quando o tiro acerta nele
    shrink() {
        if(this.newRadius < this.radius)
            this.radius -= 0.5
        
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.strokeStyle = this.color
        ctx.stroke()
    }   

    update() {
        this.shrink()
        this.draw()
        this.x += this.velocity.x
        this.y += this.velocity.y
    }
}

class Particle extends Projectile {
    constructor(x,y,radius,color, velocity)
    {
        super(x,y,radius,color,velocity)
        this.alpha = 1 //Controla a opacidada de particula
    }

    draw(){
        ctx.save()
        ctx.globalAlpha = this.alpha
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.restore()
    }

    update() {
        this.draw()
        this.alpha -= 0.01
        this.x += this.velocity.x
        this.y += this.velocity.y
        this.velocity.x *= 0.99
        this.velocity.y *= 0.99


    }
}