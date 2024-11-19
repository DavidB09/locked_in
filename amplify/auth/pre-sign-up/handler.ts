import { updateUserAttribute, type UpdateUserAttributeOutput } from "aws-amplify/auth"
import type { PreSignUpTriggerHandler } from "aws-lambda"
import { PBKDF2, lib } from "crypto-js"

function generateKey() {

    var salt = lib.WordArray.random(128/8)

    var key = PBKDF2("Password", salt, { keySize: 256/32, iterations: 100})

    return key.toString();

}

export const handler: PreSignUpTriggerHandler = async (event) => {
  const uniqueKey = generateKey();

  updateUserAttribute({
    userAttribute: {
        attributeKey: "custom:uniquekey",
        value: uniqueKey,
    }
  });

  console.log(uniqueKey);

  return event
}