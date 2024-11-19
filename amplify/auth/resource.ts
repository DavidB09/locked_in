import { defineAuth } from '@aws-amplify/backend';
import { preSignUp } from './pre-sign-up/resource';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  userAttributes: {
    preferredUsername: {
      mutable: true,
      required: false,
    },
    "custom:uniqueKey": {
      dataType: "String",
      mutable: true,
      minLen: 32,
      maxLen: 32,
    }
  },
  triggers: {
    preSignUp
  }
  
});
