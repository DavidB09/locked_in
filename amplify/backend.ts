import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { encryptPassword } from './functions/encrypt-password/resource'
import { decryptPassword } from './functions/decrypt-password/resource'

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
defineBackend({
  auth,
  data,
  encryptPassword,
  decryptPassword,
});
