import type { Handler } from 'aws-lambda';
import { AES } from 'crypto-js';

export const handler: Handler = async (event, context) => {
  // your function code goes here

  const { hash, key } = event.arguments;

  const password = AES.decrypt(hash, key).toString();

  return password;
};