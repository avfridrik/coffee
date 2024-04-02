import { Client } from "node-appwrite";
export const client = new Client();
const APPWRITE_API_KEY =
  "95ae2c4733996e4d2332feea79cd61dce642bbbcb867d384288bb5e1d0b2b92d348aa16ca5d83506740639dcee8b7a4e92e1def919b5f51c8b3fcfdddc7fdd36a42acdcd5aa39d1d8d6bd1678091606fbaa0b03a6587ce8e473ba997d93cc73c1717d500411cdac0467dc74bae0f1efa3587c76d4579fe4a80e1edcd3efc04b5";

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("65cf5b77595fe63904d1")
  .setKey(APPWRITE_API_KEY);
