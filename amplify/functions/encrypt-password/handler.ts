import type { Handler } from 'aws-lambda';
import { AES } from 'crypto-js';

export const handler: Handler = async (event, context) => {
  // your function code goes here

  const { password, key } = event.arguments

  const hash = AES.encrypt(password, key).toString();

  return hash;
};