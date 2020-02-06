import Gameboard from "./gameboard";

test("it creates a new board with the name of Newn Board", () => {
  const board = Gameboard("New Board");
  expect(board.name).toEqual("New Board");
});
test("it sets the gameWon to be equal to false", () => {
  const board = Gameboard("New Board");
  expect(board.gameWon()).toBeFalsy();
});
