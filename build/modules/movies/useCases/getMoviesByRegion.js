"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMoviesByGenre = void 0;
const subtypes_1 = require("../entities/subtypes");
function getMoviesByGenre(repo, region) {
    //validate year
    //history
    //analytics
    return repo.getMoviesByLanguage(region.languages.map((language) => new subtypes_1.Language(language, region.isoType)));
}
exports.getMoviesByGenre = getMoviesByGenre;
