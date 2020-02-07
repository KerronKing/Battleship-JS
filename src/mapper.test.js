import mapper from './mapper';

test('it converts numbers into a coordinate array', () => {
  expect(mapper.numConverter(3)).toEqual([0, 3]);
});
test('it converts an array of coordinates into a number', () => {
  expect(mapper.coordConverter([0, 3])).toEqual(3);
});
