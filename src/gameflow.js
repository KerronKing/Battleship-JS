const dom = require('./dom');
const gameboard = require('./gameboard');
const Player = require('./player');
const Ship = require('./ship');

const gameflow = (() => {
  const players = [];
  const playerShips = [];
  const computerShips = [];

  const invalidMoveAlert = () => 'Invalid move. Please play again.';

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
  const computerTarget = (array) => {
    const num = Math.floor(Math.random() * 10);
    return array[num] === 'miss' || array[num] === 'hit' ? computerTarget(array) : num;
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
            elem.classList.add('ship-hit');
            gameboard.computerArea[i] = 'hit';
            computerShips.forEach((item, j) => {
              if (item.position[j] === i) {
                item.hit();
              }
            });
          } else if (gameboard.computerArea[i] === false) {
            elem.classList.add('missed');
            gameboard.computerArea[i] = 'miss';
            players[0].moveNumber += 1;
            players[1].moveNumber += 1;
          } else if (gameboard.computerArea[i] === 'hit') {
            invalidMoveAlert();
          }
        });
      });
    } else {
      const num = computerTarget(gameboard.playerArea);
      while (players[1].moveNumber % 2 === 1) {
        const target = document.getElementById(`pa-${num}`);
        if (gameboard.playerArea[num] === 'ship') {
          target.classList.add('ship-hit');
          gameboard.playerArea[num] = 'hit';
          playerShips.forEach((item, j) => {
            if (item.position[j] === num) {
              item.hit();
            }
          });
        } else if (gameboard.playerArea[num] === false) {
          target.classList.add('missed');
          gameboard.playerArea[num] = 'miss';
          players[0].moveNumber += 1;
          players[1].moveNumber += 1;
        }
      }
    }
  };
  const gameWon = (playerShipArr, computerShipArr, arr) => {
    let firstCounter = 0;
    let secondCounter = 0;
    const playerArr = arr;
    for (let i = 0; i < playerShips.length; i += 1) {
      if (playerShipArr[i].isSunk()) firstCounter += 1;
      if (computerShipArr[i].isSunk()) secondCounter += 1;
    }
    if (firstCounter === 5) {
      playerArr[0].won = true;
      return true;
    }
    if (secondCounter === 5) {
      playerArr[1].won = true;
      return true;
    }
    return false;
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
