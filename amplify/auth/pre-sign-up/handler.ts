import { updateUserAttribute } from "aws-amplify/auth"
import type { PostAuthenticationTriggerHandler } from "aws-lambda"
import { PBKDF2, lib } from "crypto-js"

function generateKey() {
    let salt = lib.WordArray.random(128/8)

    let key = PBKDF2("Password", salt, { keySize: 256/32, iterations: 100})

    console.log("Hello");
    console.log(key.toString());

    return key.toString();
}

export const handler: PostAuthenticationTriggerHandler = async (event) => {
    const uniqueKey = generateKey();

    console.log("HELLOOOOOO");

    updateUserAttribute({
        userAttribute: {
            attributeKey: "custom:unique_key",
            value: uniqueKey,
        }
    });
  
    throw new Error("CHEESSE!!")
    console.log(uniqueKey);
    console.log("It worked: " + uniqueKey);
    return event;
}