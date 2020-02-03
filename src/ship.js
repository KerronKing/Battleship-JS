const Ship = (name, shipLength) => {
  const position = new Array(shipLength).fill('');
  let hitCounter = 0;

  const hit = () => {
    hitCounter += 1;
  };

  const isSunk = () => hitCounter === shipLength;
  return {
    name, shipLength, position, hitCounter, hit, isSunk,
  };
};
export default Ship;
