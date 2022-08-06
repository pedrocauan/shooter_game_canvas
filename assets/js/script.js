//pega tag
const $ = (tag) => document.querySelector(tag)

const cnv = $("canvas")

cnv.width = innerWidth //largura da tela do navegador
cnv.height = innerHeight

ctx = cnv.getContext("2d") //configura pra trabalhar em 2d

const player = new Sprite(cnv.width/2, cnv.height/2, 30, "white")

//repete o jogo
function loop(){
    //mantem a taxa de fps em 60 (varia do hardware)
    requestAnimationFrame(loop, cnv) 
    update()
}

//atualiza o jogo
function update() {
    ctx.fillStyle = "rgba(0,0,0,1)"
    ctx.fillRect(0,0, cnv.width, cnv.height)

    player.draw()
}

loop()




