import Ship from "./ship";

test("it creates an instance of a ship named Cargo Ship", () => {
  const firstShip = Ship("Cargo Ship", 1);
  expect(firstShip.name).toEqual("Cargo Ship");
});
test("it creates an instance of a ship with an empty position", () => {
  const firstShip = Ship("Cargo Ship", 1);
  expect(firstShip.position.length).toBe(0);
});
test("it creates an instance of a ship with no hit positions", () => {
  const firstShip = Ship("Cargo Ship", 1);
  expect(firstShip.hitPositions.length).toBe(0);
});
test("it creates an instance of a ship with a length of 1", () => {
  const firstShip = Ship("Cargo Ship", 1);
  expect(firstShip.shipLength).toBe(1);
});
test("it sets the isSunk value to false", () => {
  const firstShip = Ship("Cargo Ship", 1);
  expect(firstShip.isSunk()).toBeFalsy();
});
test("it sets the isSunk value of hit positions to 2", () => {
  const firstShip = Ship("Cargo Ship", 1);
  firstShip.hit(2);
  expect(firstShip.hitPositions).toContain(2);
});
