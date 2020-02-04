const Ship = (name, shipLength) => {
  const position = new Array(shipLength).fill('');
  const hitPositions = [];

  return {
    name, shipLength, position, hitPositions,
  };
};
export default Ship;
