import { fetchUserAttributes } from 'aws-amplify/auth';
import type { Handler } from 'aws-lambda';
import { AES } from 'crypto-js';

export const handler: Handler = async (event, context) => {
  // your function code goes here

  const { password } = event.arguments

  var attributes = fetchUserAttributes();

  console.log(attributes);

  var hash = AES.encrypt(password, (await attributes).address as string).toString();

  return hash;
};