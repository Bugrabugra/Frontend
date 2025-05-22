import { Account, Avatars, Client, Databases } from "react-native-appwrite";

export const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("681cbefb003ab3744781")
  .setPlatform("dev.bugra.shelfie");

export const account = new Account(client);
export const avatars = new Avatars(client);
export const databases = new Databases(client);
