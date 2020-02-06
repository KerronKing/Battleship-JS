import dom from './dom';

test('should render to the player area div with 100 child elements', () => {
  document.body.innerHTML = '<div id="grids" class="visible">'
    + '<div id="player-area" class="container"></div><br><br><br>'
    + '<div id="computer-area" class="container"></div>'
    + '</div>';

  dom.playerAreaRender();
  expect(document.getElementById('player-area').children.length).toBe(100);
});

test('should render to the computer area div with 100 child elements', () => {
  document.body.innerHTML = '<div id="grids" class="visible">'
    + '<div id="player-area" class="container"></div><br><br><br>'
    + '<div id="computer-area" class="container"></div>'
    + '</div>';

  dom.computerAreaRender();
  expect(document.getElementById('computer-area').children.length).toBe(100);
});
