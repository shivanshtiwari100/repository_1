// Business logic functions

// Fibonacci series up to N terms
function fibonacci(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];
  const series = [0, 1];
  for (let i = 2; i < n; i++) {
    series.push(series[i - 1] + series[i - 2]);
  }
  return series.slice(0, n);
}

// Get prime numbers from an array
function getPrimes(arr) {
  function isPrime(num) {
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
      if (num % i === 0) return false;
    }
    return true;
  }
  return arr.filter(num => isPrime(num)).sort((a, b) => a - b);
}

// Least Common Multiple (LCM) of array
function getLCM(arr) {
  function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
  }
  function lcmTwo(a, b) {
    return (a * b) / gcd(a, b);
  }
  return arr.reduce((acc, num) => lcmTwo(acc, num));
}

// Highest Common Factor (HCF) of array
function getHCF(arr) {
  function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
  }
  return arr.reduce((acc, num) => gcd(acc, num));
}

module.exports = {
  fibonacci,
  getPrimes,
  getLCM,
  getHCF
};
