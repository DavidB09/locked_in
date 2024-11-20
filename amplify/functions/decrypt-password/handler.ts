import { fetchUserAttributes } from 'aws-amplify/auth';
import type { Handler } from 'aws-lambda';
import { AES } from 'crypto-js';

export const handler: Handler = async (event, context) => {
  // your function code goes here

  var { hash } = event.arguments;
  var attributes = await fetchUserAttributes();

  console.log(attributes);

  var password = AES.decrypt(hash, (await attributes).address as string).toString();

  return password;
};