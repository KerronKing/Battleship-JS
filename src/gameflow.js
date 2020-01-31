const dom = require('./dom');
const gameboard = require('./gameboard');
const Player = require('./player');
const Ship = require('./ship');

const gameflow = (() => {
  const players = [];
  const playerShips = [];
  const computerShips = [];

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

    for (let i = 0; i < players.length; i += 1) {
      if (players[i].moveNumber % 2 === 1) {

      }
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
