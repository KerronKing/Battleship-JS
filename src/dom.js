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
      compArea.textContent = `${i}`;
      computerInterface.appendChild(compArea);
    }
  };
  return { playerAreaRender, computerAreaRender };
})();
export default dom;
