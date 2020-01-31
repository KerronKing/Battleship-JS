import Player from './player';
import gameboard from './gameboard';
import Ship from './ship';

const gameflow = (() => {
  const players = [];

  const generatePlayers = (data) => {
    const player = Player(data, 1);
    const computer = Player('Computer', 0);
    players.push(player);
    players.push(computer);
  };

  const initialize = () => {
    const inputForm = document.getElementById('user-form');
    const submitBtn = document.getElementById('user-submit');
    submitBtn.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(inputForm));
      generatePlayers(data);
    });
  };
  const runGame = () => {
  }
})();
