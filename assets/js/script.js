document.addEventListener("DOMContentLoaded", () => {
    const gameSession = document.querySelector(".game-session");
    const mario = document.querySelector(".mario");
    let pipes = document.querySelectorAll(".pipe");
    let clouds = document.querySelectorAll(".cloud");
    const gameBoard = document.querySelector(".game-board");
  
    let isAlive = true;
    let score = 0;
  
    const marioJump = (event) => {
      if (event.keyCode === 32 && isAlive) {
        mario.classList.add("mariojump");
  
        setTimeout(() => {
          mario.classList.remove("mariojump");
        }, 500);
      }
    };
  
    document.addEventListener("keydown", marioJump);
  
    const checkCollision = () => {
      if (isAlive) {
        pipes.forEach((pipe) => {
          const pipePosition = pipe.offsetLeft;
          const marioPosition = mario.offsetLeft;
          const marioWidth = mario.offsetWidth;
          const pipeWidth = pipe.offsetWidth;
          const pipeGap = 150; // Espaço entre os tubos
  
          // Verifica se o Mário está passando pelo espaço entre os tubos
          if (
            marioPosition + marioWidth > pipePosition &&
            marioPosition < pipePosition + pipeWidth &&
            (mario.offsetTop <= pipe.offsetHeight || mario.offsetTop + mario.offsetHeight >= pipe.offsetHeight + pipeGap)
          ) {
            // Se houver colisão, define isAlive como falso e mostra a imagem de game over
            isAlive = false;
            mario.src = "img/game-over2.png";
            mario.style.width = "75px";
            mario.style.marginLeft = "50px";
          }
        });
      }
    };
  
    const updateScore = () => {
      // Atualiza a pontuação a cada tubo passado
      score++;
      gameSession.textContent = `Score: ${score}`;
    };
  
    const gameLoop = setInterval(() => {
      if (isAlive) {
        // Move os tubos para a esquerda
        pipes.forEach((pipe) => {
          pipe.style.left = `${pipe.offsetLeft - 5}px`;
  
          // Verifica se o tubo saiu da tela
          if (pipe.offsetLeft + pipe.offsetWidth < 0) {
            // Remove o tubo da lista
            pipe.remove();
          }
        });
  
        // Verifica a colisão a cada frame
        checkCollision();
  
        // Se não houver mais tubos visíveis, cria um novo
        if (pipes.length === 0 || pipes[pipes.length - 1].offsetLeft < window.innerWidth - 200) {
          const newPipe = document.createElement("img");
          newPipe.src = "img/pipe.jpg";
          newPipe.classList.add("pipe");
          newPipe.style.left = `${window.innerWidth}px`; // Posiciona o novo tubo no canto direito da tela
          gameBoard.appendChild(newPipe);
          pipes.push(newPipe);
          updateScore();
        }
  
        // Move as nuvens para cima e para baixo
        clouds.forEach((cloud) => {
          cloud.style.top = `${Math.sin(Date.now() * 0.002) * 20}px`;
        });
  
        // Verifica se o Mario passou pelo tubo com sucesso
        if (pipes[0].offsetLeft + pipes[0].offsetWidth < mario.offsetLeft) {
          pipes.shift(); // Remove o tubo passado da lista
        }
      }
    }, 10); // Intervalo menor para aumentar a velocidade
  });
  
