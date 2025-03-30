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
var GENDERS;
(function (GENDERS) {
    GENDERS["male"] = "male";
    GENDERS["female"] = "female";
})(GENDERS || (GENDERS = {}));
var ROLES;
(function (ROLES) {
    ROLES["admin"] = "admin";
    ROLES["moderator"] = "moderator";
    ROLES["user"] = "user";
})(ROLES || (ROLES = {}));
var COINS;
(function (COINS) {
    COINS["Bitcoin"] = "Bitcoin";
})(COINS || (COINS = {}));
var NETWORK;
(function (NETWORK) {
    NETWORK["Ethereum"] = "Ethereum (ERC20)";
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
const roles = [];
getUsers("https://dummyjson.com/uses").then(users => {
    console.log(users[0]);
}).catch((ex) => {
    if (ex instanceof Error) {
        console.log(ex);
    }
    else {
        console.log(new Error(String(ex)));
    }
});
