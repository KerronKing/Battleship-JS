import gameboard from './gameboard';

test('it updates the position array of each ship object and updates the board mapping array', () => {
  const boardMapper = new Array(100).fill(false);
  const shipsArray = [
    {
      name: 'ship-1',
      position: [],
      shipLength: 1,
    },
    {
      name: 'ship-2',
      position: [],
      shipLength: 2,
    },
    {
      name: 'ship-3',
      position: [],
      shipLength: 3,
    },
  ];
  gameboard.populateBoard(shipsArray, boardMapper);
  expect(shipsArray[0].position.length).toBe(1);
  expect(shipsArray[1].position.length).toBe(2);
  expect(shipsArray[2].position.length).toBe(3);
});
