const dom = (() => {
  const playerArea = new Array(100).fill(false);
  const computerArea = new Array(100).fill(false);

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
      const event = compArea.addEventListener('click', (e) => {
        e.preventDefault();
        if (computerArea[i] === 'ship') {
          compArea.classlist.add('ship-hit');
          computerArea[i] = 'hit';
          compArea.removeEventListener('click', event, false);
        } else if (computerArea[i] === false) {
          compArea.classlist.add('missed');
          computerArea[i] = 'miss';
          compArea.removeEventListener('click', event, false);
        }
      });
      computerInterface.appendChild(compArea);
    }
  };
  return { playerAreaRender, computerAreaRender };
})();
module.exports = dom;
