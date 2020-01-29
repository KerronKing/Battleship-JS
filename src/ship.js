const Ship = (name, shipLength) => {
  const boardSize = 10;
  const position = new Array(shipLength).fill('');
  const hitCounter = 0;

  const hit = () => {

  };

  const isSunk = () => this.hitCounter === this.shipLength;
  return {
    name, shipLength, position, boardSize, hit, isSunk,
  };
};
export default Ship;
