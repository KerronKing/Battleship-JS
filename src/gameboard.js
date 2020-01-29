const gameboard = (() => {
  const playerAreaRender = () => {
    const playerArea = document.getElementById('player-area');
    for (let i = 0; i < 100; i += 1) {
      const area = document.createElement('DIV');
      area.classList.add('square');
      area.id = `pa-${i}`;
      playerArea.appendChild(area);
    }
  };
  const computerAreaRender = () => {
    const computerArea = document.getElementById('computer-area');
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
      computerArea.appendChild(compArea);
    }
  };
  return { playerAreaRender, computerAreaRender };
})();
export default gameboard;
