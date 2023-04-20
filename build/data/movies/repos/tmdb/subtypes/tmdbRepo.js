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
const subentities_1 = require("../../../../../domain/movies/entities/subentities");
const tmdbImage_1 = require("./tmdbImage");
const tmdb_config_1 = __importDefault(require("../../../../../core/config/tmdb.config"));
const result_1 = require("../../../../../core/sharedObjects/result");
const movie_entity_1 = require("../../../../../domain/movies/entities/movie.entity");
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
    languages: [new subentities_1.Language(result.original_language, "639-1")],
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
class ErrorResult {
    constructor() {
        this.invalidCredentials = () => new result_1.Result(false, "TMDB API: Invalid credentials");
        this.noResults = (message) => new result_1.Result(false, `TMDB API: No results (info:{${message})}`);
        this.notResponding = () => new result_1.Result(false, "Unexpected Error: Connection to TMDB server could not be made");
    }
}
class TMDBRepo {
    getMovieById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield api.get(baseURL + "movie/" + id);
                if (response.status == 200) {
                    const data = response.data;
                    return new result_1.Result(true, undefined, new movie_entity_1.Movie({
                        adult: data.adult,
                        background: data.backdrop_path
                            ? new tmdbImage_1.TMDBBackgroundImage(data.backdrop_path)
                            : defaultBackground,
                        id: data.id,
                        overview: data.overview ? data.overview : "",
                        popularity: data.popularity,
                        poster: data.poster_path
                            ? new tmdbImage_1.TMDBPosterImage(data.poster_path)
                            : defaultPoster,
                        release: new Date(data.release_date),
                        runtime: data.runtime ? data.runtime : 0,
                        tagline: data.tagline,
                        imdbId: data.imdb_id || null,
                        rating: data.popularity,
                        status: data.status,
                        title: data.original_title
                            ? data.original_title
                            : "Unknown Title",
                        genres: data.genres.map((genre) => ({
                            name: genre.name,
                            uniqueId: genre.id,
                        })),
                        languages: data.spoken_languages.map((language) => new subentities_1.Language(language.iso_639_1, "639-1")),
                        countries: data.production_countries.map((country) => new subentities_1.Country(country.iso_3166_1)),
                    }));
                }
                else {
                    return response.status == 404
                        ? new ErrorResult().noResults(`id: ${id}`)
                        : new ErrorResult().invalidCredentials();
                }
            }
            catch (e) {
                return new ErrorResult().notResponding();
            }
        });
    }
    getMoviesByRealeaseDate(startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield api.get(baseURL +
                    `discover/movie/?primary_release_date.gte=${startDate
                        .toLocaleDateString("en-US")
                        .replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/gm, "$3")}&primary_release_date.lte=${endDate
                        .toLocaleDateString("en-US")
                        .replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/gm, "$3")}` //TMDB API bug: 2020-01-01 --> no results, 2020 --> 20 results
                );
                if (response.status == 200 && response.data.results.length > 0) {
                    //Empty results should return error Result
                    const data = response.data;
                    return new result_1.Result(true, undefined, data.results.map(resultToMovieProps));
                }
                else {
                    return response.status == 404 ||
                        response.data.results.length == 0 //404s or empty results should return error Result
                        ? new ErrorResult().noResults(`startDate: ${startDate.toLocaleString("en-US")}, endDate: ${endDate.toLocaleString("en-US")}`)
                        : new ErrorResult().invalidCredentials();
                }
            }
            catch (e) {
                return new ErrorResult().notResponding();
            }
        });
    }
    getMoviesByGenre(genre) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield api.get(baseURL +
                    `discover/movie/?with_genres=${Array.isArray(genre)
                        ? genre.map((g) => g.uniqueId).join("|")
                        : genre.uniqueId}`);
                if (response.status == 200 && response.data.results.length > 0) {
                    const data = response.data;
                    return new result_1.Result(true, undefined, data.results.map(resultToMovieProps));
                }
                else {
                    return response.status == 404 ||
                        response.data.results.length == 0 //404s or empty results should return error Result
                        ? new ErrorResult().noResults(`genres: ${genre}`)
                        : new ErrorResult().invalidCredentials();
                }
            }
            catch (e) {
                return new ErrorResult().notResponding();
            }
        });
    }
    getMoviesByLanguage(language) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield api.get(baseURL +
                    `discover/movie/?with_original_language=${Array.isArray(language)
                        ? language.map((lang) => lang.isoCode).join("|")
                        : language.isoCode}`);
                if (response.status == 200 && response.data.results.length > 0) {
                    const data = response.data;
                    return new result_1.Result(true, undefined, data.results.map(resultToMovieProps));
                }
                else {
                    return response.status == 404 ||
                        response.data.results.length == 0 //404s or empty results should return error Result
                        ? new ErrorResult().noResults(`languages: ${language}`)
                        : new ErrorResult().invalidCredentials();
                }
            }
            catch (e) {
                return new ErrorResult().notResponding();
            }
        });
    }
}
exports.TMDBRepo = TMDBRepo;
