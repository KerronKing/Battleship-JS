const Ship = (name, shipLength) => {
  const position = [];
  const hitPositions = [];

  const hit = num => {
    hitPositions.push(num);
  };

  function isSunk() {
    if (hitPositions.length === shipLength) {
      return true;
    }
    return false;
  }

  return {
    name,
    shipLength,
    position,
    hitPositions,
    hit,
    isSunk,
  };
};
export default Ship;
