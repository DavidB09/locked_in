import type { Handler } from 'aws-lambda';
import { PBKDF2, lib } from "crypto-js"

export const handler: Handler = async (event, context) => {
    let salt = lib.WordArray.random(128/8);
    let key = PBKDF2("Password", salt, { keySize: 256/32, iterations: 100});

    return key.toString();
};