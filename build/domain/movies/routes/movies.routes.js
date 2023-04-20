"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesViewsRegistry = void 0;
class MoviesViewsRegistry {
    constructor(applicationUrl) {
        this.entityLevelUrl = "movies/";
        this.entityRoutes = [];
        this.applicationLevelUrl = applicationUrl;
    }
    registerRoute(path, handler) {
        this.entityRoutes.push([path, handler]);
    }
    getAbsolutePath(path) {
        if (this.entityRoutes.map((route) => route[0]).indexOf(path) < 0) {
            throw `Path /${path} does not exist in this registry`;
        }
        return this.applicationLevelUrl + this.entityLevelUrl + path;
    }
}
exports.MoviesViewsRegistry = MoviesViewsRegistry;
