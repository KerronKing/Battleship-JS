const gameboard = (() => {
  const createShip = (length) => {
    const directionArray = ['horizontal', 'vertical'];
    const direction = directionArray[Math.floor(Math.random() * 2)];

    const num = Math.floor(Math.random() * 100);
    const posArray = [];
    for (let i = 0; i < length; i += 1) {
      if (direction === 'vertical' && ((num + (length * 10)) <= 99)) {
        posArray.push(num + (i * 10));
      } else if (direction === 'vertical' && ((num + (length * 10)) >= 99)) {
        const newNum = (num - 40);
        posArray.push(newNum + (i * 10));
      } else if (direction === 'horizontal' && ((num % 10) <= length)) {
        posArray.push(num + i);
      } else if (direction === 'horizontal' && ((num % 10) >= length)) {
        const newNum = (num - (length - 1));
        posArray.push(newNum + i);
      }
    }
    return posArray;
  };

  const noShipCollision = (array, position) => {
    for (let i = 0; i < array.length; i += 1) {
      const vessel = array[i];
      for (let j = 0; j < position.length; j += 1) {
        if (vessel.position.indexOf(position[j]) >= 0) {
          return false;
        }
      }
    }
    return true;
  };

  const populateBoard = (shipArr) => {
    // Iterates over array of ship objects
    let ship;
    const shipObjectsArray = shipArr;
    for (let i = 0; i < shipObjectsArray.length; i += 1) {
      do {
        ship = createShip(shipObjectsArray[i].shipLength);
      } while (!noShipCollision(shipObjectsArray, ship));
      shipObjectsArray[i].position = ship;
    }
    return shipObjectsArray;
  };

  return { populateBoard };
})();
export default gameboard;
