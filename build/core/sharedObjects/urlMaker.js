"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URLMaker = void 0;
const url_1 = require("url");
class URLMaker {
}
URLMaker.make = (externalUrl, groupUrl, specialUrl, params = {}, user = {}) => {
    const url = `${externalUrl}/${groupUrl}/${specialUrl}`;
    const query = new url_1.URLSearchParams();
    for (const param in params) {
        query.append(param, params[param]);
    }
    //TODO: USER HANDLING
    return `${url}?${query.toString()}`;
};
exports.URLMaker = URLMaker;
