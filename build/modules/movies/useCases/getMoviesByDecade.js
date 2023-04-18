"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMoviesByGenre = void 0;
function getMoviesByGenre(repo, firstYearOfDecade) {
    //validate year
    //history
    //analytics
    return repo.getMoviesByRealeaseDate(new Date(firstYearOfDecade, 0, 0), new Date(firstYearOfDecade + 9, 31));
}
exports.getMoviesByGenre = getMoviesByGenre;
