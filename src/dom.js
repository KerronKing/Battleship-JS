const gameboard = require('./gameboard');
const dom = (() => {
  const playerAreaRender = () => {
    const playerInterface = document.getElementById('player-area');
    for (let i = 0; i < 100; i += 1) {
      const area = document.createElement('DIV');
      area.classList.add('square');
      area.id = `pa-${i}`;
      playerInterface.appendChild(area);
    }
  };
  const computerAreaRender = () => {
    const computerInterface = document.getElementById('computer-area');
    for (let i = 0; i < 100; i += 1) {
      const compArea = document.createElement('DIV');
      compArea.classList.add('square');
      compArea.id = `ca-${i}`;
      compArea.addEventListener('click', (e) => {
        e.preventDefault();
        if (gameboard.computerArea[i] === 'ship') {
          compArea.classlist.add('ship-hit');
          gameboard.computerArea[i] = 'hit';
        } else if (gameboard.computerArea[i] === false) {
          compArea.classlist.add('missed');
          gameboard.computerArea[i] = 'miss';
        } else if (gameboard.computerArea[i] === 'hit') {
          // call custom alert function, prompting the player to make another move.
        }
      });
      computerInterface.appendChild(compArea);
    }
  };
  return { playerAreaRender, computerAreaRender };
})();
module.exports = dom;
