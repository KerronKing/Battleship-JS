const Ship = (name, shipLength) => {
  const position = new Array(shipLength).fill('');
  const hitPositions = [];

  const hit = (num) => {
    this.hitPositions.push(num);
  };

  const isSunk = () => {
    if (this.positions.length === this.hitPositions.length) {
      return true;
    }
    return false;
  };

  return {
    name, shipLength, position, hitPositions, hit, isSunk,
  };
};
export default Ship;
