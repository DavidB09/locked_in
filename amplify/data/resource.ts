import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { encryptPassword } from "../functions/encrypt-password/resource"
import { decryptPassword } from "../functions/decrypt-password/resource"
import { generateKey } from "../functions/generate-key/resource"

const schema = a.schema({
  Password: a
    .model({
      hash: a.string(),
      website: a.string(),
      description: a.string(),
      username: a.string(),
      folderId: a.id(),
      folder: a.belongsTo('Folder', 'folderId'),
    })
    .authorization((allow) => [allow.owner()]),
  Folder: a
    .model({
      name: a.string(), 
      passwords: a.hasMany('Password', 'folderId'),
    })
    .authorization((allow) => [allow.owner()]),

    encrypt: a
    .query()
    .arguments({
      password: a.string(),
      phrase: a.string(),
    })
    .returns(a.string())
    .handler(a.handler.function(encryptPassword))
    .authorization((allow) => [allow.authenticated()]),

    decrypt: a
    .query()
    .arguments({
      hash: a.string(),
      phrase: a.string(),
    })
    .returns(a.string())
    .handler(a.handler.function(decryptPassword))
    .authorization((allow) => [allow.authenticated()]),

    generateKey: a
    .query()
    .arguments({})
    .returns(a.string())
    .handler(a.handler.function(generateKey))
    .authorization((allow) => [allow.authenticated()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
