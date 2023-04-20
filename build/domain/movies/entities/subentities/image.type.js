"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieImage = void 0;
class MovieImage {
    constructor(baseUrl = "", filePath = "", variations = undefined) {
        this.baseURL = baseUrl;
        this.filePath = filePath;
        this.variations = variations;
    }
    getDefaultQuality() {
        throw new Error("Method not implemented.");
    }
    getHighestQuality() {
        throw new Error("Method not implemented.");
    }
    getLowestQuality() {
        throw new Error("Method not implemented.");
    }
}
exports.MovieImage = MovieImage;
