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
  /**
   * Generates a random SVG path for a curve
   * @param {number} length number of points
   * @param {number} step x incrementation per point
   * @param {number} y0 base y position
   * @param {number} amplitude y-amplitude
   * @returns {string} SVG path
   */
  curve(length, step, y0, amplitude) {
    const min = y0 - amplitude;
    const max = y0 + amplitude;
    const format = (num) => num.toFixed(2).replace(/(\.0)?0$/,'');
    const p0 = [-step, y0].map(format).join(' ');
    const pEnd = [(length + 1) * step, y0].map(format).join(' ');
    const points = Array.from({length}, (_, idx) => ([(idx * step), prng.randInt(min, max)])).flat().map(format).join(' ');
    return `M${p0}S${points} ${pEnd}`;
  }
};

module.exports = prng;
