import type { Handler } from 'aws-lambda';
import CryptoJS from 'crypto-js';

export const handler: Handler = async (event, context) => {
    // your function code goes here
    const { password, phrase } = event.arguments;

    const salt = CryptoJS.lib.WordArray.random(128/8);

    // Generate the key
    const key = CryptoJS.PBKDF2(phrase, salt, {
        keySize: 256/32,
        iterations: 100,
        hasher: CryptoJS.algo.SHA256
    });

    const iv = CryptoJS.lib.WordArray.random(128/8);

    // Encrypt the password
    const encrypted = CryptoJS.AES.encrypt(password, key, { 
        iv: iv, 
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });

    // Salt, iv will be hex 32 in length
    // Append them to the ciphertext for use  in decryption
    const hash = salt.toString()+ iv.toString() + encrypted.toString();

    return hash;
};