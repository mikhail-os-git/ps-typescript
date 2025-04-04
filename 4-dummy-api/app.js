"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var ROLES;
(function (ROLES) {
    ROLES["admin"] = "admin";
    ROLES["moderator"] = "moderator";
    ROLES["user"] = "user";
})(ROLES || (ROLES = {}));
var GENDER;
(function (GENDER) {
    GENDER["male"] = "male";
    GENDER["female"] = "female";
})(GENDER || (GENDER = {}));
var COINS;
(function (COINS) {
    COINS["Bitcoin"] = "Bitcoin";
})(COINS || (COINS = {}));
var NETWORK;
(function (NETWORK) {
    NETWORK[NETWORK["Ethereum (ERC20)"] = 0] = "Ethereum (ERC20)";
})(NETWORK || (NETWORK = {}));
function getUsers(link) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(link);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const { users } = yield response.json();
        return users;
    });
}
getUsers("https://dummyjson.com/users").
    then(users => {
    // for(const user of users) {
    // 		console.log(user.address.postalCode)
    // }
    console.log(users);
}).catch(err => {
    if (err instanceof Error) {
        console.log(err);
    }
    else {
        console.log(new Error(String(err)));
    }
});
