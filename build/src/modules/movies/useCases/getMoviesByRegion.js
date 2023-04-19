"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMoviesByRegion = void 0;
const subtypes_1 = require("../entities/subtypes");
function getMoviesByRegion(repo, region) {
    //validate year
    //history
    //analytics
    return repo.getMoviesByLanguage(region.languages.map((language) => new subtypes_1.Language(language, region.isoType)));
}
exports.getMoviesByRegion = getMoviesByRegion;
