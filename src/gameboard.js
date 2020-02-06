import Ship from './ship';
import mapper from './mapper';

const Gameboard = name => {
  const areaArray = [
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
  ];
  const ships = [];

  const createShip = length => {
    const directionArray = ['horizontal', 'vertical'];
    const direction = directionArray[Math.floor(Math.random() * 2)];

    const num = Math.floor(Math.random() * 100);
    const posArray = [];
    for (let i = 0; i < length; i += 1) {
      if (direction === 'vertical' && num + length * 10 <= 99) {
        posArray.push(num + i * 10);
      } else if (direction === 'vertical' && num + length * 10 >= 99) {
        const newNum = num - 40;
        posArray.push(newNum + i * 10);
      } else if (direction === 'horizontal' && num % 10 <= length) {
        posArray.push(num + i);
      } else if (direction === 'horizontal' && num % 10 >= length) {
        const newNum = num - (length - 1);
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

  const generateShipObjects = () => {
    for (let i = 1; i <= 5; i += 1) {
      const newShip = Ship(`ship-${i}`, i);
      ships.push(newShip);
    }
  };

  const populateBoard = () => {
    // Iterates over array of ship objects
    let ship;
    generateShipObjects();
    const shipObjectsArray = ships;
    // const area = areaArray;
    for (let i = 0; i < shipObjectsArray.length; i += 1) {
      do {
        ship = createShip(shipObjectsArray[i].shipLength);
      } while (!noShipCollision(shipObjectsArray, ship));

      for (let j = 0; j < ship.length; j += 1) {
        const coords = mapper.numConverter(ship[j]);
        areaArray[coords[0]][coords[1]] = 'ship';
      }
      shipObjectsArray[i].position = ship;
    }
  };

  const receiveAttack = (x, y) => {
    const arr = ships;
    const position = mapper.coordConverter([x, y]);

    for (let i = 0; i < arr.length; i += 1) {
      if (
        arr[i].position.indexOf(position) >= 0
        && areaArray[x][y] === 'ship'
      ) {
        arr[i].hit(position);
        areaArray[x][y] = 'hit';
      } else if (areaArray[x][y] === '') {
        areaArray[x][y] = 'missed';
      }
    }
  };

  const gameWon = () => {
    let counter = 0;
    for (let j = 0; j < ships.length; j += 1) {
      if (ships[j].isSunk()) {
        counter += 1;
      }
    }
    if (counter === 5) {
      return true;
    }
    return false;
  };

  return {
    name,
    areaArray,
    ships,
    populateBoard,
    receiveAttack,
    gameWon,
  };
};
export default Gameboard;
