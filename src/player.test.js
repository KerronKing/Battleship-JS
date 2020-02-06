import Player from './player';

test('it creates an instance of a player', () => {
  const playerOne = Player('Guy', 1);
  expect(playerOne).toEqual({ name: 'Guy', moveNumber: 1, won: false });
});
