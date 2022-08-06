
class Sprite {
    constructor(x, y, radius, color){
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }

    draw(){
         ctx.beginPath() //Prepara o desenho
         ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false/*horario ou antihorario*/) //Desenha circulos
         ctx.fillStyle = this.color
         ctx.fill() //pinta tela
    }
}

class Player extends Sprite {
    constructor(x, y, radius, color) {
        super(x, y, radius, color) //herda os atributos do pai (sprite)

    }

    draw() {
        ctx.beginPath() //Prepara o desenho
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false/*horario ou antihorario*/) //Desenha circulos
        ctx.strokeStyle = this.color //desenha o player como borda
        ctx.stroke() //pinta o player
    }
}