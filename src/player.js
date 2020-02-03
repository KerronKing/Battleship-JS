const Player = (name, moveNumber) => {
  let sunkShipPositions = 0;
  const won = false;
  return { name, moveNumber, won, sunkShipPositions };
};
export default Player;
