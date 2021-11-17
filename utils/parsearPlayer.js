function parsearPlayer(object) {
  let valores = Object.values(object);
  let result = new Player(valores[0], valores[1], valores[2]);
  return result;
}

module.exports = { parsearPlayer };
