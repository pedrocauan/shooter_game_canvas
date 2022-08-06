//pega tag
const $ = (tag) => document.querySelector(tag)

const cnv = $("canvas")
/*Tamanho da tela*/
cnv.width = innerWidth 
cnv.height = innerHeight

/*== Configurações de animação == */
const playerColor = "#48fcff"
const animationSphere = 0.1 /*Animação em volta do player*/

/*== Física dos projeteis ==*/
const projectiles = [] 
const shootingSpeed = 4 //Velocidade que o projetil se move 
const sizeProjectile = 3

/*==== PLAYER === */
/*Tamanho do player*/
const playerSize = 30

/*Posição do player na tela*/
const posX = cnv.width/2
const posY = cnv.height/2

ctx = cnv.getContext("2d") //configura pra trabalhar em 2d

const player = new Player(posX, posY, playerSize, playerColor)

cnv.addEventListener("click", (e) => {
    e.preventDefault()

    //distancia do click do mouse em relação ao player
    const angle = Math.atan2(e.clientY - player.y, e.clientX - player.x)
    
    const velocity = {
        x: Math.cos(angle) * shootingSpeed,
        y: Math.sin(angle) * shootingSpeed
    }

    projectiles.push(new Projectile(player.x, player.y, sizeProjectile, playerColor, velocity))
})


//repete o jogo
function loop(){
    //mantem a taxa de fps em 60 (varia do hardware)
    requestAnimationFrame(loop, cnv) 
    update()
}

//atualiza o jogo
function update() {
    ctx.fillStyle = `rgba(0,0,0, ${animationSphere})` /*animationSphere é a opacidade*/
    ctx.fillRect(0,0, cnv.width, cnv.height)

    player.update()
    checkProjectiles()

}

function checkProjectiles(){
    //Dispara os projeteis na tela
    for(let i = projectiles.length - 1; i >= 0; i--){
        const p = projectiles[i]
        p.update()
    }
}

loop()




