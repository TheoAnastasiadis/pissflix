"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMoviesByDecade = void 0;
function getMoviesByDecade(repo, firstYearOfDecade) {
    //validate year
    //history
    //analytics
    return repo.getMoviesByRealeaseDate(new Date(firstYearOfDecade, 0, 0), new Date(firstYearOfDecade + 9, 11, 30));
}
exports.getMoviesByDecade = getMoviesByDecade;
