const Ship = (name, shipLength) => {
  const position = new Array(shipLength).fill('');
  const hitCounter = 0;

  const hit = () => {
    this.hitCounter += 1;
  };

  const isSunk = () => this.hitCounter === this.shipLength;
  return {
    name, shipLength, position, hitCounter, hit, isSunk,
  };
};
export default Ship;
