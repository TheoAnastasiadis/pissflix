"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TMDBRepo = void 0;
const axios_1 = __importDefault(require("axios"));
const result_1 = require("../../../../../shared/Objects/result");
const tmdb_config_1 = __importDefault(require("../../../../../shared/config/tmdb.config"));
const movie_entity_1 = require("../../../entities/movie.entity");
const subtypes_1 = require("../../../entities/subtypes");
const tmdbImage_1 = require("./tmdbImage");
const api = axios_1.default.create({
    headers: {
        Authorization: `Bearer ${tmdb_config_1.default.tmdbApiKey}`,
    },
});
const baseURL = "https://api.themoviedb.org/3/";
const defaultBackground = new tmdbImage_1.TMDBBackgroundImage("");
const defaultPoster = new tmdbImage_1.TMDBPosterImage("");
const resultToMovieProps = (result) => new movie_entity_1.Movie({
    adult: result.adult,
    background: result.backdrop_path
        ? new tmdbImage_1.TMDBBackgroundImage(result.backdrop_path)
        : defaultBackground,
    genres: result.genre_ids.map((genre) => ({
        name: "",
        uniqueId: genre,
    })),
    id: result.id,
    imdbId: null,
    languages: [new subtypes_1.Language(result.original_language, "639-1")],
    title: result.original_title,
    overview: result.overview,
    popularity: result.popularity,
    poster: result.poster_path
        ? new tmdbImage_1.TMDBPosterImage(result.poster_path)
        : defaultPoster,
    countries: [],
    release: new Date(result.release_date),
    runtime: 0,
    status: "Released",
    tagline: "",
    rating: result.vote_average,
});
class TMDBRepo {
    getMovieById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = (yield api.get(baseURL + "movie/" + id)).data;
                return new result_1.Result(true, undefined, new movie_entity_1.Movie({
                    adult: response.adult,
                    background: response.backdrop_path
                        ? new tmdbImage_1.TMDBBackgroundImage(response.backdrop_path)
                        : defaultBackground,
                    id: response.id,
                    overview: response.overview ? response.overview : "",
                    popularity: response.popularity,
                    poster: response.poster_path
                        ? new tmdbImage_1.TMDBPosterImage(response.poster_path)
                        : defaultPoster,
                    release: new Date(response.release_date),
                    runtime: response.runtime ? response.runtime : 0,
                    tagline: response.tagline,
                    imdbId: response.imdb_id || null,
                    rating: response.popularity,
                    status: response.status,
                    title: response.original_title
                        ? response.original_title
                        : "Unknown Title",
                    genres: response.genres.map((genre) => ({
                        name: genre.name,
                        uniqueId: genre.id,
                    })),
                    languages: response.spoken_languages.map((language) => new subtypes_1.Language(language.iso_639_1, "639-1")),
                    countries: response.production_countries.map((country) => new subtypes_1.Country(country.iso_3166_1)),
                }));
            }
            catch (e) {
                return new result_1.Result(false, "TMDB API: Movie could not be fetched.");
            }
        });
    }
    getMoviesByRealeaseDate(startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = (yield api.get(baseURL +
                    `discover/movie/?primary_release_date.gte=${startDate
                        .toLocaleDateString("en-US")
                        .replace("/", "-")}&primary_release_date.lte=${endDate
                        .toLocaleDateString("en-US")
                        .replace("/", "-")}`)).data;
                return new result_1.Result(true, undefined, response.results.map(resultToMovieProps));
            }
            catch (e) {
                return new result_1.Result(false, "TMDB API: Movie Results could not be fetched.");
            }
        });
    }
    getMoviesByGenre(genre) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = (yield api.get(baseURL +
                    `discover/movie/?with_genres=${Array.isArray(genre)
                        ? genre.map((g) => g.uniqueId).join("|")
                        : genre.uniqueId}`)).data;
                return new result_1.Result(true, undefined, response.results.map(resultToMovieProps));
            }
            catch (e) {
                return new result_1.Result(false, "TMDB API: Movie Results could not be fetched.");
            }
        });
    }
    getMoviesByLanguage(language) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = (yield api.get(baseURL +
                    `discover/movie/?with_original_language=${Array.isArray(language)
                        ? language.map((lang) => lang.isoCode).join("|")
                        : language.isoCode}`)).data;
                return new result_1.Result(true, undefined, response.results.map(resultToMovieProps));
            }
            catch (e) {
                return new result_1.Result(false, "TMDB API: Movie Results could not be fetched.");
            }
        });
    }
}
exports.TMDBRepo = TMDBRepo;
