interface Encrypted {
  text: string;
  shift: number;
}


export function rotn(str: string, key: number) {
  return str.toUpperCase().replace(/[A-Z]/g, c => String.fromCharCode((c.charCodeAt(0)-65+key)%26+65))
}

let entropies;

export function doBreak(text: string): Encrypted {
  entropies = getAllEntropies(text);
  entropies.sort(function (x: number[], y: number[]): number {
    // Compare by lowest entropy, break ties by lowest shift
    if (x[1] !== y[1])
      return x[1] - y[1];
    else
      return x[0] - y[0];
  });

  // Decrypt using lowest entropy shift
  const bestShift = entropies[0][0];
  // let encrypted = decrypt(text, bestShift);
  // console.log(encrypted);
  // console.log(bestShift.toString());
  return {text: decrypt(text, bestShift), shift: bestShift}
}


/*---- Core functions ----*/

// Returns the entropies when the given string is decrypted with all 26 possible shifts,
// where the result is an array of pairs (int shift, float enptroy) - e.g. [[0, 2.01], [1, 4.95], ..., [25, 3.73]].
function getAllEntropies(str: string): number[][] {
  let result = [];
  for (let i = 0; i < 26; i++)
    result.push([i, getEntropy(decrypt(str, i))]);
  return result;
}


// Unigram model frequencies for letters A, B, ..., Z
const ENGLISH_FREQS = [
  0.08167, 0.01492, 0.02782, 0.04253, 0.12702, 0.02228, 0.02015, 0.06094, 0.06966, 0.00153, 0.00772, 0.04025, 0.02406,
  0.06749, 0.07507, 0.01929, 0.00095, 0.05987, 0.06327, 0.09056, 0.02758, 0.00978, 0.02360, 0.00150, 0.01974, 0.00074,
];

// Returns the cross-entropy of the given string with respect to the English unigram frequencies, which is a positive floating-point number.
function getEntropy(str: string) : number {
  let sum = 0;
  let ignored = 0;
  for (let i = 0; i < str.length; i++) {
    let c = str.charCodeAt(i);
    if      (65 <= c && c <=  90) sum += Math.log(ENGLISH_FREQS[c - 65]);  // Uppercase
    else if (97 <= c && c <= 122) sum += Math.log(ENGLISH_FREQS[c - 97]);  // Lowercase
    else ignored++;
  }
  return -sum / Math.log(2) / (str.length - ignored);
}


// Decrypts the given string with the given key using the Caesar shift cipher.
// The key is an integer representing the number of letters to step back by - e.g. decrypt("EB", 2) = "CZ".
function decrypt(str: string, key: number) : string {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    let c = str.charCodeAt(i);
    if      (65 <= c && c <=  90) result += String.fromCharCode(mod(c - 65 - key, 26) + 65);  // Uppercase
    else if (97 <= c && c <= 122) result += String.fromCharCode(mod(c - 97 - key, 26) + 97);  // Lowercase
    else result += str.charAt(i);  // Copy
  }
  return result;
}



function mod(x: number, y: number) : number {
  return (x % y + y) % y;
}

