"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TMDBPosterImage = exports.TMDBBackgroundImage = void 0;
const movieImage_1 = require("../../domain/movieImage");
class TMDBBackgroundImage extends movieImage_1.MovieImage {
    constructor(filePath) {
        super("https://image.tmdb.org/t/p", filePath, ["w300", "w780", "w1280"]);
    }
    getDefaultQuality() {
        return this.baseURL + "/" + this.variations[1] + "/" + this.filePath;
    }
    getHighestQuality() {
        return this.baseURL + "/" + this.variations[2] + "/" + this.filePath;
    }
    getLowestQality() {
        return this.baseURL + "/" + this.variations[0] + "/" + this.filePath;
    }
}
exports.TMDBBackgroundImage = TMDBBackgroundImage;
class TMDBPosterImage extends movieImage_1.MovieImage {
    constructor(filePath) {
        super("https://image.tmdb.org/t/p", filePath, ["w342", "w500", "w780"]);
    }
    getDefaultQuality() {
        return this.baseURL + "/" + this.variations[1] + "/" + this.filePath;
    }
    getHighestQuality() {
        return this.baseURL + "/" + this.variations[2] + "/" + this.filePath;
    }
    getLowestQality() {
        return this.baseURL + "/" + this.variations[0] + "/" + this.filePath;
    }
}
exports.TMDBPosterImage = TMDBPosterImage;
