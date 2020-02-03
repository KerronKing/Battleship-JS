const Ship = (name, shipLength) => {
  const position = new Array(shipLength).fill('');
  const hitPositions = [];

  const isSunk = () => {
    return hitPositions.length === shipLength ? true : false;
  }

  return {
    name, shipLength, position, hitPositions, isSunk,
  };
};
export default Ship;
