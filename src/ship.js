const Ship = (name, shipLength) => {
  const position = new Array(shipLength).fill('');
  const hitPositions = [];

  const isSunk = () => hitPositions.length === shipLength;
  return {
    name, shipLength, position, hitPositions, isSunk,
  };
};
export default Ship;
