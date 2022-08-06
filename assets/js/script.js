//pega tag
const $ = (tag) => document.querySelector(tag)

const cnv = $("canvas")

const playerColor = "#48fcff"
animationSphere = 0.1 /*Animação em volta do player*/
cnv.width = innerWidth //largura da tela do navegador
cnv.height = innerHeight

ctx = cnv.getContext("2d") //configura pra trabalhar em 2d

const player = new Player(cnv.width/2, cnv.height/2, 30, playerColor)

//repete o jogo
function loop(){
    //mantem a taxa de fps em 60 (varia do hardware)
    requestAnimationFrame(loop, cnv) 
    update()
}

//atualiza o jogo
function update() {
    ctx.fillStyle = `rgba(0,0,0, ${animationSphere})` /*A opacidade controla */
    ctx.fillRect(0,0, cnv.width, cnv.height)

    player.update()
}

loop()




