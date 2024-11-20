import { fetchUserAttributes } from 'aws-amplify/auth';
import type { Handler } from 'aws-lambda';
import { AES } from 'crypto-js';

export const handler: Handler = async (event, context) => {
  // your function code goes here

  var { hash } = event.arguments;
  let password = await fetchUserAttributes().then(result => {
    console.log(result);
    const decryptedPass = AES.decrypt(hash, (result).address as string).toString();

    console.log(decryptedPass)
    return decryptedPass;
  });
  //var attributes = await fetchUserAttributes();

  //var password = AES.decrypt(hash, (await attributes).address as string).toString();

  return password;
};