"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMoviesByRegion = void 0;
const subentities_1 = require("../entities/subentities");
function getMoviesByRegion(repo, region) {
    //validate year
    //history
    //analytics
    return repo.getMoviesByLanguage(region.languages.map((language) => new subentities_1.Language(language, region.isoType)));
}
exports.getMoviesByRegion = getMoviesByRegion;
