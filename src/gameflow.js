const dom = require('./dom');
const gameboard = require('./gameboard');
const Player = require('./player');
const Ship = require('./ship');

const gameflow = (() => {
  const players = [];
  const playerShips = [];
  const computerShips = [];

  const invalidMoveAlert = () => {
    alert('Invalid move. Please play again.');
  }

  // const playerTurnPrompt = () => {
  //   const playerTurn = document.getElementById('turn');
  //   playerTurn.classList.replace('hidden', 'visible');
  //   playerTurn.textContent = `${players[0].name}'s Turn!`;
  // }
  //
  // const computerTurnPrompt = () => {
  //   const computerTurn = document.getElementById('computer-turn');
  //   computerTurn.textContent = "Computer's Turn!";
  // }

  const generatePlayers = (data) => {
    const player = Player(data, 1);
    const computer = Player('Computer', 0);
    players.push(player);
    players.push(computer);
  };
  const generateShips = () => {
    for (let i = 1; i <= 5; i += 1) {
      const ship = Ship(`ship-${i}`, i);
      playerShips.push(ship);
      computerShips.push(ship);
    }
  };
  const runGame = () => {
    generateShips();
    gameboard.populateBoard(playerShips);
    gameboard.populateBoard(computerShips);

    dom.playerAreaRender();
    dom.computerAreaRender();

    const computerInterface = document.getElementById('computer-area');
    const computerDivs = computerInterface.children;

    if (players[0].moveNumber % 2 === 1) {
      computerDivs.forEach((elem, i) => {
        elem.addEventListener('click', (e) => {
          e.preventDefault();
          if (gameboard.computerArea[i] === 'ship') {
            elem.classlist.add('ship-hit');
            gameboard.computerArea[i] = 'hit';
            computerShips.forEach((item, j) => {
              if(item.position[j] == i){
              item.hit();
              }
            })
          } else if (gameboard.computerArea[i] === false) {
            elem.classlist.add('missed');
            gameboard.computerArea[i] = 'miss';
          } else if (gameboard.computerArea[i] === 'hit') {
            invalidMoveAlert();
          }
        });
      });
    }
  };

  const start = () => {
    const startBtn = document.getElementById('start');
    const restartBtn = document.getElementById('restart');
    const inputForm = document.getElementById('user-form');
    const submitBtn = document.getElementById('user-submit');
    const formContainer = document.getElementById('input-container');
    submitBtn.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(inputForm));
      generatePlayers(data);
      formContainer.classList.replace('visible', 'hidden');
      startBtn.classList.replace('visible', 'hidden');
      restartBtn.classList.replace('hidden', 'visible');
      runGame();
    });
  };

  return { start };
})();
module.exports = gameflow;
