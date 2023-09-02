document.addEventListener("DOMContentLoaded", () => {
    const mario = document.querySelector(".mario");
    const pipe = document.querySelector(".pipe");
    const clouds = document.querySelector(".clouds");

    const mariojump = (event) => {
      // Verifique se a tecla pressionada é a tecla "espaço" (código 32)
      
      if (event.keyCode === 32) {
        mario.classList.add("mariojump");
  
        setTimeout(() => {
          mario.classList.remove("mariojump");
        }, 500);
      }
    }
  
    document.addEventListener("keydown", mariojump);
    
    const loop = setInterval(() => { 
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
        const cloudsPosition = clouds.offsetLeft;
         /* Verifica se o MARIO encosta no tubo e se por 
         acaso encostar ele morre, porém se ele não encostar ele fica vivo */

        if(pipePosition <= 90 && pipePosition > 0 && marioPosition < 100){
            pipe.style.animation ='none';
            pipe.style.left = `${pipePosition}px`;

            clouds.style.animation ='none';
            clouds.style.left = `${cloudsPosition}px`;

            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`; 

            mario.src = 'img/game-over2.png'
            mario.style.width = '75px'
            mario.style.marginLeft = '50px'

            clearInterval(loop);
        }
        

    }, 10);


});
   