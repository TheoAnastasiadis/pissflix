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
exports.toMovies = exports.toMovie = void 0;
const function_1 = require("fp-ts/lib/function");
const O = __importStar(require("fp-ts/Option"));
const A = __importStar(require("fp-ts/Array"));
const language_1 = require("../../../../../domain/movies/entities/language");
const country_1 = require("../../../../../domain/movies/entities/country");
const tmdbGenres_1 = require("./tmdbGenres");
const defaultPoster = "";
const defaultBackground = "";
const parseReleaseDate = (s) => (0, function_1.pipe)(s, O.fromNullable, O.map(Date.parse), O.chain(O.fromPredicate(isNaN)), O.getOrElse(() => Date.parse("1821")));
const toMovie = (data) => {
    var _a;
    return ({
        background: {
            economicQuality: data.backdrop_path
                ? "https://image.tmdb.org/t/p/w300/" + data.backdrop_path
                : defaultBackground,
            bestQuality: data.backdrop_path
                ? "https://image.tmdb.org/t/p/w1280/" + data.backdrop_path
                : defaultBackground,
        },
        genres: ((_a = data.genres) === null || _a === void 0 ? void 0 : _a.map((genre) => ({
            uniqueId: genre.id,
            name: genre.name,
        }))) || [],
        id: data.id || 0,
        languages: (0, function_1.pipe)(data.spoken_languages, O.fromNullable, A.fromOption, A.flatten, A.map((obj) => obj.name), A.filter(language_1.Language.is)),
        title: data.original_title || data.title || "Unknown Title",
        overview: data.overview || "",
        poster: {
            economicQuality: data.backdrop_path
                ? "https://image.tmdb.org/t/p/w300/" + data.poster_path
                : defaultPoster,
            bestQuality: data.backdrop_path
                ? "https://image.tmdb.org/t/p/w1280/" + data.poster_path
                : defaultPoster,
        },
        countries: (0, function_1.pipe)(data.production_countries, O.fromNullable, A.fromOption, A.flatten, A.map((obj) => obj.name), A.filter(country_1.Country.is)),
        release: parseReleaseDate(data.release_date),
        runtime: data.runtime || 0,
        tagline: data.tagline || "",
    });
};
exports.toMovie = toMovie;
const toMovies = (data) => (0, function_1.pipe)(data, (data) => data.results, A.of, A.flatten, A.map((result) => {
    var _a;
    return ({
        background: {
            economicQuality: result.backdrop_path
                ? "https://image.tmdb.org/t/p/w300/" + result.backdrop_path
                : defaultBackground,
            bestQuality: result.backdrop_path
                ? "https://image.tmdb.org/t/p/w1280/" + result.backdrop_path
                : defaultBackground,
        },
        genres: ((_a = result.genre_ids) === null || _a === void 0 ? void 0 : _a.map((id) => tmdbGenres_1.tmdbGenres.find((v) => v.uniqueId == id) || {
            uniqueId: 666,
            name: "Unknown Genre",
        })) || [],
        id: result.id || 0,
        languages: [],
        title: result.original_title || result.title || "Unknown Title",
        overview: "",
        poster: {
            economicQuality: result.backdrop_path
                ? "https://image.tmdb.org/t/p/w300/" + result.poster_path
                : defaultPoster,
            bestQuality: result.backdrop_path
                ? "https://image.tmdb.org/t/p/w1280/" + result.poster_path
                : defaultPoster,
        },
        release: parseReleaseDate(result.release_date),
        countries: [],
        runtime: 0,
        tagline: "",
    });
}));
exports.toMovies = toMovies;
