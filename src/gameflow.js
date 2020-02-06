import dom from './dom';
import mapper from './mapper';
import Gameboard from './gameboard';
import Player from './player';

const gameflow = (() => {
  let players = [];
  let boardObjects = [];
  const status = document.getElementById('status');
  const playerInterface = document.getElementById('player-area');
  const computerInterface = document.getElementById('computer-area');
  const grids = document.getElementById('grids');
  const restartBtn = document.getElementById('restart');

  const generatePlayers = data => {
    const player = Player(data, 1);
    const computer = Player('Computer', 0);
    players.push(player);
    players.push(computer);
  };

  const computerTarget = arr => {
    let index = Math.floor(Math.random() * 100);
    let coords = mapper.numConverter(index);

    while (
      arr[coords[0]][coords[1]] === 'hit' ||
      arr[coords[0]][coords[1]] === 'miss'
    ) {
      index = Math.floor(Math.random() * 100);
      coords = mapper.numConverter(index);
    }
    return coords;
  };

  const runGame = () => {
    const playerBoard = Gameboard('Player Board');
    const computerBoard = Gameboard('Computer Board');
    boardObjects.push(playerBoard);
    boardObjects.push(computerBoard);

    boardObjects[0].populateBoard();
    boardObjects[1].populateBoard();

    dom.playerAreaRender();
    dom.computerAreaRender();

    const playerDivs = playerInterface.children;

    Array.from(playerDivs).forEach((elem, j) => {
      const coords = mapper.numConverter(j);
      if (
        boardObjects[0].areaArray[coords[0][coords[1]]] === 'ship' ||
        boardObjects[0].areaArray[coords[0][coords[1]]] === 'hit'
      ) {
        elem.classList.add('player-ship');
      }
    });

    const computerMove = () => {
      while (players[1].moveNumber % 2 === 1) {
        const crds = computerTarget(boardObjects[0].areaArray);
        const num = mapper.coordConverter(crds);
        const target = document.getElementById(`pa-${num}`);

        if (boardObjects[0].areaArray[crds[0]][crds[1]] === 'ship') {
          status.textContent = '';
          target.classList.add('ship-hit');
          boardObjects[0].receiveAttack(crds[0], crds[1]);
          if (boardObjects[0].gameWon()) {
            grids.classList.replace('visible', 'hidden');
            status.textContent = `${players[1].name} has won the game! Click restart to play again.`;
          }
        } else if (boardObjects[0].areaArray[crds[0]][crds[1]] === '') {
          status.textContent = '';
          target.classList.add('missed');
          boardObjects[0].receiveAttack(crds[0], crds[1]);
          players[0].moveNumber += 1;
          players[1].moveNumber += 1;
        }
      }
    };
    const computerDivs = computerInterface.children;
    Array.from(computerDivs).forEach((elem, i) => {
      const crds = mapper.numConverter(i);
      elem.addEventListener('click', e => {
        e.preventDefault();
        if (boardObjects[1].areaArray[crds[0]][crds[1]] === 'ship') {
          status.textContent = '';
          elem.classList.add('ship-hit');
          boardObjects[1].receiveAttack(crds[0], crds[1]);
          if (boardObjects[1].gameWon()) {
            grids.classList.replace('visible', 'hidden');
            status.textContent = `${players[0].name} has won the game! Click restart to play again.`;
          }
        } else if (boardObjects[1].areaArray[crds[0]][crds[1]] === '') {
          status.textContent = '';
          elem.classList.add('missed');
          boardObjects[1].receiveAttack(crds[0], crds[1]);
          players[0].moveNumber += 1;
          players[1].moveNumber += 1;
          computerMove();
        } else if (boardObjects[1].areaArray[crds[0]][crds[1]] === 'hit') {
          dom.invalidMoveAlert();
        }
      });
    });
  };
  const resetGame = () => {
    players = [];
    boardObjects = [];
    playerInterface.innerHTML = '';
    computerInterface.innerHTML = '';
    const status = document.getElementById('status');
    status.textContent = '';
    restartBtn.classList.replace('visible', 'hidden');
  };
  const start = () => {
    const startBtn = document.getElementById('start');
    const restartBtn = document.getElementById('restart');
    const inputForm = document.forms['user-form'];
    const formContainer = document.getElementById('input-container');

    inputForm.addEventListener('submit', e => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(inputForm));
      generatePlayers(data.name);
      formContainer.classList.replace('visible', 'hidden');
      startBtn.classList.replace('visible', 'hidden');
      restartBtn.classList.replace('hidden', 'visible');
      runGame();
    });
  };

  return { start, resetGame };
})();
export default gameflow;
