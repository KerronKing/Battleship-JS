import dom from './dom';
import gameboard from './gameboard';
import Player from './player';
import Ship from './ship';

const gameflow = (() => {
  let players = [];
  let playerShips = [];
  let computerShips = [];
  let playerSunkPositionsCounter = 0;
  let computerSunkPositionsCounter = 0;
  const status = document.getElementById('status');
  const playerInterface = document.getElementById('player-area');
  const computerInterface = document.getElementById('computer-area');
  const grids = document.getElementById('grids');

  const invalidMoveAlert = () => 'Invalid move. Please play again.';

  const generatePlayers = (data) => {
    const player = Player(data, 1);
    const computer = Player('Computer', 0);
    players.push(player);
    players.push(computer);
  };
  const generateShips = () => {
    for (let i = 1; i <= 5; i += 1) {
      const ship = Ship(`player-ship-${i}`, i);
      playerShips.push(ship);
    }
    for (let i = 1; i <= 5; i += 1) {
      const ship = Ship(`computer-ship-${i}`, i);
      computerShips.push(ship);
    }
  };

  const computerTarget = (arr) => {
    let index = Math.floor(Math.random() * 100);

    while (arr[index] === 'hit' || arr[index] === 'miss') {
      index = Math.floor(Math.random() * 100);
    }
    return index;
  };

  const gameWon = (arr) => {
    const playerArr = arr;

    if (computerSunkPositionsCounter === 15) {
      playerArr[0].won = true;
      return true;
    }
    if (playerSunkPositionsCounter === 15) {
      playerArr[1].won = true;
      return true;
    }
    return false;
  };

  const runGame = () => {
    generateShips();
    gameboard.populateBoard(playerShips, gameboard.playerArea);
    gameboard.populateBoard(computerShips, gameboard.computerArea);

    dom.playerAreaRender();
    dom.computerAreaRender();

    const playerDivs = playerInterface.children;

    Array.from(playerDivs).forEach((elem, j) => {
      if (gameboard.playerArea[j] === 'ship' || gameboard.playerArea[j] === 'hit') {
        elem.classList.add('player-ship');
      }
    });

    const computerMove = (index) => {
      while (players[1].moveNumber % 2 === 1) {
        const num = computerTarget(gameboard.playerArea);
        const target = document.getElementById(`pa-${num}`);
        if (gameboard.playerArea[num] === 'ship') {
          target.classList.add('ship-hit');
          gameboard.playerArea[num] = 'hit';
          playerShips.forEach((item) => {
            if (item.position.indexOf(index) >= 0) {
              item.hitPositions.push(index);
            }
          });
          playerSunkPositionsCounter += 1;
          if (gameWon(players)) {
            grids.classList.replace('visible', 'hidden');
            status.textContent = `${players[1].name} has won the game! Click restart to play again.`;
          }
        } else if (gameboard.playerArea[num] === false) {
          target.classList.add('missed');
          gameboard.playerArea[num] = 'miss';
          players[0].moveNumber += 1;
          players[1].moveNumber += 1;
        }
      }
    };
    const computerDivs = computerInterface.children;
    Array.from(computerDivs).forEach((elem, i) => {
      elem.addEventListener('click', (e) => {
        e.preventDefault();
        if (gameboard.computerArea[i] === 'ship') {
          elem.classList.add('ship-hit');
          gameboard.computerArea[i] = 'hit';
          computerShips.forEach((item) => {
            if (item.position.indexOf(i) >= 0) {
              item.hitPositions.push(i);
            }
          });
          computerSunkPositionsCounter += 1;
          if (gameWon(players)) {
            grids.classList.replace('visible', 'hidden');
            status.textContent = `${players[0].name} has won the game! Click restart to play again.`;
          }
        } else if (gameboard.computerArea[i] === false) {
          elem.classList.add('missed');
          gameboard.computerArea[i] = 'miss';
          players[0].moveNumber += 1;
          players[1].moveNumber += 1;
          computerMove(i);
        } else if (gameboard.computerArea[i] === 'hit') {
          invalidMoveAlert();
        }
      });
    });
  };
  const resetGame = () => {
    players = [];
    playerShips = [];
    computerShips = [];
    gameboard.playerArea = new Array(100).fill(false);
    gameboard.computerArea = new Array(100).fill(false);
    playerInterface.innerHTML = '';
    computerInterface.innerHTML = '';
  };
  const start = () => {
    const startBtn = document.getElementById('start');
    const restartBtn = document.getElementById('restart');
    const inputForm = document.forms['user-form'];
    const formContainer = document.getElementById('input-container');

    inputForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(inputForm));
      generatePlayers(data.name);
      formContainer.classList.replace('visible', 'hidden');
      startBtn.classList.replace('visible', 'hidden');
      restartBtn.classList.replace('hidden', 'visible');
      runGame();
    });
  };

  return { start, resetGame, gameWon };
})();
export default gameflow;
