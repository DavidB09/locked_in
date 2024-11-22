// Constant for modulus
const asciiMod = 94;
import { zeros, multiply, mod, det as _det, subset, index, row } from 'mathjs';

// Turns input string of 25 characters or less into a 5x5 matrix
// Changes to ascii numbers, then subtracts 34 so we can calculate in 0-93 range
// 34 is ", so we add one to 33/! for calculations because " causes string problems
// This effectively ignores 34 and replaces it with 33
// 93 is our null character for calculations
function stringToMatrix(str) {
  let asciiMatrix = zeros(5,5);
  let k = 0;
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      let char;
      // Fill empty elements with 93 if string length is less than 25
      if (k >= str.length) {
        char = 93;
      } else {
        char = str[k].charCodeAt(0);
        if (char == 33) { char = 34; }
        char -= 34;
      }
      asciiMatrix.set([i, j], char);
      k++;
    }
  }
  return asciiMatrix;
}

// Turns 5x5 matrix into a string of up to 25 characters
// Adds 34 then converts from ascii and appends to the string
// 34 is ", so we subtract one to get 33/! for our string because " causes string problems
// This effectively ignores 34 and replaces it with 33
// 93 is our null character for calculations
function matrixToString(m) {
  let str = String.fromCharCode(0);
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      let char = m.get([i, j]);
      if (char == 93) { continue; }
      char += 34;
      if (char == 34) { char = 33; }
      let temp = String.fromCharCode(char);
      str = str.concat(temp);
    }
  }
  return str;
}

// Encrypts a matrix using our key
// Ciphertext = (Plaintext * Key) mod 93
function encryptMatrix(m, k) {
  let result = multiply(m, k);
  return mod(result, asciiMod);
}

// Decrypts a matrix using our inverse key
// Plaintext = (Ciphertext * Key Inverse) mod 93
function decryptMatrix(m, inv) {
  let result = multiply(m, inv);
  return mod(result, asciiMod);
}

// Gets random integer in 0-93 range
// This is range of ascii characters we can use
// The matrixToString method has info on our ascii conversion
function randomAsciiInt() {
  let min = 0; 
  let max = asciiMod + 1; // max is 93 + 1
  let answer = Math.floor(Math.random() * (max - min) + min);
  return answer;
}

// Create key matrix with determinant that works
// We need 1/det for inverse matrix, so we need an odd determinant
// Because det * 1/det must equal 1 mod 93, and even numbers won't mod to 1
function createKeyMatrix() {
  let det = 0;
  const key = zeros(5,5);
  while (true) {
    // Replace every element with a random ascii number
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        key.set([i, j], randomAsciiInt());
      }
    }
    det = (_det(key) % asciiMod);
    if (det < 0) { det += asciiMod; }
    // Factors of 94 and 0 will not work, try again if det equals those
    if (det % 2 == 0 || det % 47 == 0) { continue; }
    break;
  }
  return key;
}

// Finds the inverse of an inputted 5x5 matrix
// Multiply 1/det by transpose cofactor matrix
function findInverse(m) {
  // Find i/det where det * i/det % 93 = 1
  let det = (_det(m) % asciiMod);
  if (det < 0) { det += asciiMod; }
  let Idet;
  for (let i = 1; i < asciiMod * 4; i++) {
    if ((det * i) % asciiMod == 1) { Idet = i; }
  }

  // Calculate cofactor matrix
  let rows = [];
  let columns = [];
  const cof = zeros(5,5);
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      // 4x4 matrices found by excluding row and column of current i and j
      for (let k = 0; k < 5; k++) {
        if (i != k) { rows.push(k); }
        if (j != k) { columns.push(k); }
      }
      let mini = subset(m, index(rows, columns));
      // Calculate element of cofactor matrix (elements alternate positive negative)
      let value;
      if ((i + j) % 2 == 0) { value = _det(mini); }
      else { value = -1 * _det(mini); }
      value = value % asciiMod;
      if (value < 0) { value += asciiMod; }
      cof.set([j, i], value); // i and j switched to transpose matrix
      // Reset temp arrays
      rows = [];
      columns = [];
    }
  }

  // Inverse matrix = 1/det * cofactor transpose
  let inv = multiply(Idet, cof);
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      inv.set([i, j], inv.get([i, j]) % asciiMod);
    }
  }
  return inv;
}

// Testing the functions 
/*
let password = "!abcdefghijklmnopqrstuv!";
console.log("Input password:");
console.log(password);

console.log("Key matrix:");
const key = createKeyMatrix();
for (let i = 0; i < 5; i ++) {
  console.log(row(key, i));
}

console.log("Inverse matrix:");
const keyInverse = findInverse(key);
for (let i = 0; i < 5; i ++) {
  console.log(row(keyInverse, i));
}

console.log("Password matrix");
const passwordMatrix = stringToMatrix(password);
for (let i = 0; i < 5; i ++) {
  console.log(row(passwordMatrix, i));
}

console.log("After encryption");
const encrypted = encryptMatrix(passwordMatrix, key);
for (let i = 0; i < 5; i ++) {
  console.log(row(encrypted, i));
}

console.log("Encrypted to text");
console.log(matrixToString(encrypted));

console.log("After decryption");
const decrypted = decryptMatrix(encrypted, keyInverse);
for (let i = 0; i < 5; i ++) {
  console.log(row(decrypted, i));
}

console.log("Decrypted to text");
console.log(matrixToString(decrypted));
console.log("done");
*/