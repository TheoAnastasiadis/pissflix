"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMoviesByGenre = void 0;
const function_1 = require("fp-ts/lib/function");
const genre_1 = require("../entities/genre");
const E = __importStar(require("fp-ts/Either"));
const O = __importStar(require("fp-ts/Option"));
const A = __importStar(require("fp-ts/Array"));
const getMoviesByGenre = (genre) => (pagination) => (repo) => {
    const getWithOneGenre = (genre) => (0, function_1.pipe)(genre, E.fromPredicate(genre_1.Genre.is, () => `${genre} is not a valid genre`), E.map((genre) => repo.findMany({
        genre,
    }, pagination)));
    const getWithMultipleGenres = (genres) => (0, function_1.pipe)(genres, A.filter(genre_1.Genre.is), O.fromPredicate((xs) => xs.length > 0), E.fromOption(() => `Array [${genres}] contains no valid genres.`), E.map((filteredGenres) => repo.findMany({ genre: filteredGenres }, pagination)));
    return (0, function_1.pipe)(genre, E.fromPredicate(Array.isArray, function_1.identity), E.match(getWithOneGenre, getWithMultipleGenres));
};
exports.getMoviesByGenre = getMoviesByGenre;
