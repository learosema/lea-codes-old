// Pseudo random number generator

let randomSeed = 1234567;

const prng = {
  init(seed) {
    randomSeed = seed;
  },
  random() {
    randomSeed = (randomSeed * 16807) % 2147483647;
    return randomSeed / 2147483647;
  },
  randInt(a, b) {
    return a + Math.floor(prng.random() * (b - a + 1));
  },
};

module.exports = prng;
