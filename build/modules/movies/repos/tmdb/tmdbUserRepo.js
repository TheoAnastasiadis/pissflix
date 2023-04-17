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
exports.tmdbMoviesRepo = void 0;
const result_1 = require("../../../../shared/Objects/result");
const movie_1 = require("../../domain/movie");
const tmdb_config_1 = __importDefault(require("../../../../shared/config/tmdb.config"));
const axios_1 = __importDefault(require("axios"));
const tmdbImage_1 = require("./tmdbImage");
const movieLanguages_1 = require("../../domain/movieLanguages");
const movieCountries_1 = require("../../domain/movieCountries");
const api = axios_1.default.create({
    headers: {
        Authorization: `Bearer ${tmdb_config_1.default.tmdbApiKey}`,
    },
});
const baseURL = "https://api.themoviedb.org/3/";
const defaultBackground = new tmdbImage_1.TMDBBackgroundImage("");
const defaultPoster = new tmdbImage_1.TMDBPosterImage("");
class tmdbMoviesRepo {
    getMovieById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = (yield api.get(baseURL + "movie/" + id)).data;
                return new result_1.Result(true, undefined, new movie_1.Movie({
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
                    title: response.original_title ? response.original_title : 'Unknown Title',
                    genres: response.genres.map(genre => ({ name: genre.name, uniqueId: genre.id })),
                    languages: response.spoken_languages.map(language => new movieLanguages_1.Language(language.iso_639_1, "639-1")),
                    countries: response.production_countries.map(country => new movieCountries_1.Country(country.iso_3166_1))
                }));
            }
            catch (e) {
                return new result_1.Result(false, "TMDB API: Authentication error");
            }
        });
    }
    getMoviesByYear(year) {
        throw new Error("Method not implemented.");
    }
    getMoviesByDecade(decade) {
        throw new Error("Method not implemented.");
    }
}
exports.tmdbMoviesRepo = tmdbMoviesRepo;
