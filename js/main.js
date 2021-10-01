

const tiles = Array.from(document.getElementsByClassName('tile'));

const game = (() => {
  const oText = "O"
  const xText = "X"
  let currentPlayer = xText;
  const spaces = [null, null, null, null, null, null, null, null, null]
  
  
  let turnNumber = 0
  
  const playerClicked = (e) => {
    const id = e.target.id;
    console.log(turnNumber);
    if(!spaces[id]) {
      spaces[id] = currentPlayer;
      e.target.innerText = currentPlayer
    }
   
    if (checkWinner(currentPlayer)){
      document.getElementById('hasWon').innerText =`${currentPlayer} Has Won!!`;
      document.getElementById('winnerRestart').style.display = "flex";
      return;
    } 

    if (turnNumber == 8) {
      document.getElementById('hasWon').innerText =`It's a tie!!`;
      document.getElementById('winnerRestart').style.display = "flex";
    }  else {
      turnNumber++
      currentPlayer = currentPlayer === xText ? oText : xText
    }
 
  }

  const checkWinner = (player) => {
      //from top left, check across, down, and diagonal
      if (spaces[0] === player) {
        if (spaces[1] === player && spaces[2] === player) {
          console.log(`${player} wins up top`);
          return true;
        }
        if (spaces[3] === player && spaces[6] === player) {
          console.log(`${player} wins on the left`);
          return true;
        }
        if (spaces[4] === player && spaces[8] === player) {
          console.log(`${player} wins on the diagonal`);
          return true;
        }
      }
      //from bottom check up and across
      if (spaces[8] === player) {
        if (spaces[2] === player && spaces[5] === player) {
          console.log(`${player} wins on the right`);
          return true;
        }
        if (spaces[7] === player && spaces[6] === player) {
          console.log(`${player} wins on the bottom`);
          return true;
        }
      }
      //from middle check middle vertical and middle horizontal
      if (spaces[4] === player) {
        if (spaces[3] === player && spaces[5] === player) {
          console.log(`${player} wins on the middle horizontal`);
          return true;
        }
        if (spaces[1] === player && spaces[7] === player) {
          console.log(`${player} wins on the middle vertical`);
          return true;
        }
       if (spaces[2] === player && spaces[6] === player) {
        console.log(`${player} wins on the the other horizontal`);
        return true;
      }
    };
  };
  const resetBoard = () => {
    spaces.forEach((space, index) => {
      spaces[index] = null
    })
    tiles.forEach(tile => {
      tile.innerText = "";
    })
    turnNumber = 0;
    setUp();
    currentPlayer = xText
  }

  const setUp = () => {
    tiles.forEach((tile) => {
      tile.addEventListener('click', playerClicked, {once: true});
      document.getElementById('winnerRestart').style.display = "none";
      const resetBtn = document.getElementById('resetBtn').addEventListener('click', resetBoard)
  });

    console.log(spaces);
    
  }


  return {setUp}
  
})();



game.setUp();