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

/*== ENEMIES ==*/
const enemies = []
let intervalID
let particles =[] //Particulas do inimigo destruído


ctx = cnv.getContext("2d") //configura pra trabalhar em 2d

const player = new Player(posX, posY, playerSize, playerColor)

function spawnEnemies() {
    intervalID = setInterval( () =>{
         //tamanho do inimigo
        const radius  = Math.floor(Math.random() * 26) + 5
        //Ṕosição do inimigo na tela

        /* x recebe um valor aleatorio entre 0 e a largura da tela*/
        /*
           - O inimigo recebe uma posição aleatoria em X
           - Ele precisa estar ACIMA do limite superior ou ABAIXO do limite inferior da tela
          
           - O inimigo recebe uma posição aleatória em Y
           - Ele PRECISA ESTAR ABAIXO  do LIMITE INFERIOR da tela -> (ESQUERDA DA TELA) 
           - Ele PRECISA ESTAR ACIMA do LIMITE SUPERIOR da tela  -> (DIREITA DA TELA)
           */

        /* */
        let posX, posY

        /* 0.5 = porcentagem de spawn*/
        //determina a  posição do inimigo em cima e em baixo
        if(Math.random() < .5){
            posX = Math.random() < 0.5 ? 0 - radius: cnv.width + radius  
            posY = Math.random() * cnv.height
        //determina a  posição do inimigo na direita e na esquerda
        } else {
            posX = Math.random() * cnv.width
            posy = Math.random() < 0.5 ? 0 - radius: cnv.height + radius  
        }
        //Angulo do inimigo em relação ao player
        const angle = Math.atan2(player.y - posY, player.x - posX)
        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }

        // cor dos inimigos
        const color = `hsl(${Math.random() * 360}, 50%, 50%)`
        enemies.push(new Enemy(posX, posY, radius, color, velocity))
    }, 1500)
}

cnv.addEventListener("click", (e) => {
    e.preventDefault()

    //distancia do click do mouse em relação ao player
    const angle = Math.atan2(e.clientY - player.y, e.clientX - player.x)
    
    const velocity = {
        x: Math.cos(angle) * shootingSpeed,
        y: Math.sin(angle) * shootingSpeed
    }

    projectiles.push(new Projectile(player.x, player.y, sizeProjectile, playerColor, velocity))
    console.log(projectiles.length)
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
    checkEnemies()
    checkProjectiles()
}

function checkEnemies() {
    enemies.forEach((enemy) => {
        enemy.update()

        //distancia entre o inimigo e o player
        const distance = Math.hypot(player.x - enemy.x, player.y - enemy.y)

        //da game over quando o inimigo colide com o player
        if(distance < player.radius + enemy.radius){
         alert("perdestes")
        }
    })
}

function checkProjectiles(){
    //Dispara os projeteis na tela
    for(let i = projectiles.length - 1; i >= 0; i--){
        const p = projectiles[i]
        p.update()
        checkOutScreen(p, i)

        //Destroi o inimigo e o projetil quando eles colidem
        for(let eIndex = enemies.length -1; eIndex >= 0; eIndex--){
            const enemy = enemies[eIndex]
            //Distancia do projetil para o inimigo
            const distance = Math.hypot(p.x - enemy.x, p.y - enemy.y)
            
            //Colisão do projetil com o inimigo
            if(distance < p.radius + enemy.radius){
                //remove o player e o projetil quando eles colidem
                enemies.splice(eIndex, 1)
                projectiles.splice(i, 1)

                createParticles(enemy, p)
            }

        }
    }
}

function createParticles(enemy, projectile) {
    for(let i = 0; i < enemy.radius * 2; i++){
        const velocity = {
            x: (Math.random() - 0.5) * (Math.random() * 6),
            y: (Math.random() - 0.5) * (Math.random() * 6)
        }

        particles.push(new Particle(projectile.x, projectile.y, Math.random() * 2, enemy.color, velocity))
    }
}

//Ve se o projetil ta fora da tela
function checkOutScreen(projectile, index) {
    /*Os projeteis precisam ser eliminados da tela depois que saem dela*/
    /*Para isso é  necessario criar esta função para remove-los do array colocado no evt click
      após eles saírem da tela*/

      //Ve se o projetil ta fora da tela  pela margem esquerda
      if(projectile.x  + projectile.radius < 0)
      {
        //Tira o projetil da tela
        projectiles.splice(index, 1)
        return
      }

      //Ve se o projetil saiu da tela pela margem direita
      if(projectile.x - projectile.radius > cnv.width)
      {
        projectiles.splice(index, 1)

        return
      }

      //Ve se o projetil saiu da tela pela margem superior
      if(projectile.y + projectile.radius < 0)
      {
        projectiles.splice(index, 1)
        return
      }

      //Ve se o projetil saiu da tela pela margem superior 
      if(projectile.y - projectile.radius > cnv.height)
      {
        projectiles.splice(index, 1)
        return
      }

}

loop()
spawnEnemies()



