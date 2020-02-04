import Ship from './ship';

test('it creates an instance of a ship', () => {
  const firstShip = Ship('Cargo Ship', 1);
  expect(firstShip).toEqual({
    name: 'Cargo Ship',
    position: [''],
    hitPositions: [],
    shipLength: 1,
  });
});