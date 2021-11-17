const { randomNumber } = require("../utils/random");
// const { parsearPlayer } = require("../utils/parsearPlayer");

// RANDOM NUMBER
test('Random number generator returns a number between the given range', () => {
  const min = 0;
  const max = 7;
  const result = randomNumber(min, max);

  expect(result).toBeGreaterThanOrEqual(min);
  expect(result).toBeLessThanOrEqual(max);
});

// // PARSEAR PLAYER
// test('Parsear Jugador', () => {
//   let result = {name: 'component name'};
//   expect(result).toHaveProperty('name') // true
//   expect(result).toHaveProperty('name', 'component name') // true
// });
