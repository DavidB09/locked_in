import { fetchUserAttributes } from 'aws-amplify/auth';
import type { Handler } from 'aws-lambda';

export const handler: Handler = async (event, context) => {
  // your function code goes here

  var attributes = fetchUserAttributes();

  console.log(attributes);

  return;
};