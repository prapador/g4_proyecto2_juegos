function randomNumber(min, max) {
  if (min == max && max == 1) {
    return max;
  } else {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

module.exports = { randomNumber };