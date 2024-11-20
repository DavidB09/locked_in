import { updateUserAttribute } from "aws-amplify/auth"
import type { PreSignUpTriggerHandler } from "aws-lambda"
import { PBKDF2, lib } from "crypto-js"

function generateKey() {

    var salt = lib.WordArray.random(128/8)

    var key = PBKDF2("Password", salt, { keySize: 256/32, iterations: 100})

    console.log("Hello");

    return key.toString();

}

export const handler: PreSignUpTriggerHandler = async (event) => {
  const uniqueKey = generateKey();

  updateUserAttribute({
    userAttribute: {
        attributeKey: "custom:uniqueKey",
        value: uniqueKey,
    }
  });
  
  console.log(uniqueKey);
  throw new Error("It worked: " + uniqueKey);
  return event
}