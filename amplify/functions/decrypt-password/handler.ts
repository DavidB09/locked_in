import type { Handler } from 'aws-lambda';
import CryptoJS from 'crypto-js';

export const handler: Handler = async (event, context) => {
    const { hash, phrase } = event.arguments;

    const salt = CryptoJS.enc.Hex.parse(hash.substr(0, 32));
    const iv = CryptoJS.enc.Hex.parse(hash.substr(32, 32))
    const encrypted = hash.substring(64);

    // Generate the key
    const key = CryptoJS.PBKDF2(phrase, salt, {
        keySize: 256/32,
        iterations: 100,
        hasher: CryptoJS.algo.SHA256
    });

    // Decrypt the function
    const decrypted = CryptoJS.AES.decrypt(encrypted, key, { 
        iv: iv, 
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC,
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
};