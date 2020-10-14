import {styleBody, addTitle, contact} from "./dom";
import users, {getPremiumUsers} from "./data";

const premiumUsers = getPremiumUsers(users);
console.log(users, premiumUsers);

console.log("test 3");