const mapper = (() => {
  const numConverter = (num) => {
    let coordinates;
    if (num < 10) {
      coordinates = [0, num];
    } else {
      const newNum = `${num}`;
      coordinates = [parseInt(newNum[0], 10), parseInt(newNum[1], 10)];
    }
    return coordinates;
  };
  const coordConverter = (arr) => {
    let num;
    if (arr[0] === 0) {
      [, num] = arr;
    } else {
      num = parseInt(`${arr[0]}${arr[1]}`, 10);
    }
    return num;
  };
  return { numConverter, coordConverter };
})();
export default mapper;