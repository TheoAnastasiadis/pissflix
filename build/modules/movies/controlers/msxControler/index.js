"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.msxMoviesCotrnoler = void 0;
class MsxMoviesCotrnoler {
    constructor() {
        this.routes = [];
    }
    registerRoute(path, controler) {
        this.routes.push([path, controler]);
    }
}
const msxMoviesCotrnoler = new MsxMoviesCotrnoler();
exports.msxMoviesCotrnoler = msxMoviesCotrnoler;
