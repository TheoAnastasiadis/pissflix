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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TMDBRepo = void 0;
const axios_1 = __importDefault(require("axios"));
const tmdb_config_1 = __importDefault(require("../../../../core/config/tmdb.config"));
const function_1 = require("fp-ts/lib/function");
const TE = __importStar(require("fp-ts/TaskEither"));
const O = __importStar(require("fp-ts/Option"));
const E = __importStar(require("fp-ts/Either"));
const tmdbSchemas_1 = require("./helpers/tmdbSchemas");
const tmdbGenres_1 = require("./helpers/tmdbGenres");
const resultToMovies_1 = require("./helpers/resultToMovies");
const pagination_1 = require("./helpers/pagination");
const api = axios_1.default.create({
    headers: {
        Authorization: `Bearer ${tmdb_config_1.default.tmdbApiKey}`,
    },
});
const baseURL = "https://api.themoviedb.org/3/";
const fromTrending = (pagination) => (type) => (0, function_1.pipe)(type, TE.tryCatchK((type) => api.get(baseURL +
    "trending/movie/" +
    type +
    `?page=${(0, pagination_1.resultsPage)(pagination)}`), () => `Unkown Error Occured`), TE.map((response) => response.data), E.fromPredicate(tmdbSchemas_1.SuccesfullTMDBAggregateResponse.is, function_1.identity), E.mapLeft((data) => tmdbSchemas_1.UnsuccesfullTMDBResponse.is(data)
    ? `TMDB API Error: message: ${data.status_message}, code: ${data.status_code}`
    : `Unkonwn Error Occured`), E.map(resultToMovies_1.toMovies), E.map((a) => a.slice((0, pagination_1.resultsStart)(pagination), (0, pagination_1.resultsEnd)(pagination))));
const fromQuery = (pagination) => (query) => (0, function_1.pipe)(query, TE.tryCatchK((s) => api.get("search/movie/" + `?query=${s}` + `&page=${(0, pagination_1.resultsPage)(pagination)}`), () => ``), TE.map((response) => response.data), E.fromPredicate(tmdbSchemas_1.SuccesfullTMDBAggregateResponse.is, function_1.identity), E.mapLeft((data) => tmdbSchemas_1.UnsuccesfullTMDBResponse.is(data)
    ? `TMDB API Error: message: ${data.status_message}, code: ${data.status_code}`
    : `Unkonwn Error`), E.map(resultToMovies_1.toMovies), E.map((a) => a.slice((0, pagination_1.resultsStart)(pagination), (0, pagination_1.resultsEnd)(pagination))));
const fromParams = (pagination) => (params) => {
    const toQuery = (params) => {
        const genreToQueryValue = (genre) => Array.isArray(genre)
            ? genre.map((g) => g.uniqueId).join("|")
            : genre.uniqueId;
        const dateToQueryValue = (date) => date
            .toLocaleDateString("en-US")
            .replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/gm, "$3");
        const languageToQueryValue = (lang) => Array.isArray(lang) ? lang.join("|") : lang;
        return (`?` +
            `${params.genre
                ? `with_genres= ${genreToQueryValue(params.genre)}&`
                : ""}` +
            `${params.startDate
                ? `primary_release_date.gte=${dateToQueryValue(params.startDate)}&`
                : ""}` +
            `${params.endDate
                ? `primary_release_date.lte=${dateToQueryValue(params.endDate)}&`
                : ""}` +
            `${params.language
                ? `with_original_language=${languageToQueryValue(params.language)}&`
                : ""}`);
    };
    return (0, function_1.pipe)(params, toQuery, TE.tryCatchK((s) => api.get(baseURL + "discover/movie" + s + `page=${(0, pagination_1.resultsPage)(pagination)}`), () => `Unkown Error Occured`), TE.map((response) => response.data), E.fromPredicate(tmdbSchemas_1.SuccesfullTMDBAggregateResponse.is, function_1.identity), E.mapLeft((data) => tmdbSchemas_1.UnsuccesfullTMDBResponse.is(data)
        ? `TMDB API Error: message: ${data.status_message}, code: ${data.status_code}`
        : `Unkonwn Error`), E.map(resultToMovies_1.toMovies), E.map((a) => a.slice((0, pagination_1.resultsStart)(pagination), (0, pagination_1.resultsEnd)(pagination))));
};
const TMDBRepo = {
    findOne: (id) => (0, function_1.pipe)(id, TE.tryCatchK(() => api.get(baseURL + "movie/" + id), () => `Server could not establish connection to TMDB.`), TE.map((response) => response.data), E.fromPredicate(tmdbSchemas_1.successfullTMDBResponse.is, function_1.identity), E.mapLeft((data) => tmdbSchemas_1.UnsuccesfullTMDBResponse.is(data)
        ? `TMDB API Error: message: ${data.status_message}, code: ${data.status_code}`
        : `Unkonwn Error`), E.map(resultToMovies_1.toMovie)),
    findMany: (params, pagination) => (0, function_1.pipe)(params, E.fromPredicate((params) => "trending" in params, function_1.identity), E.chain(fromTrending(pagination)), E.alt(() => (0, function_1.pipe)(params, E.fromPredicate((params) => "query" in params, function_1.identity), E.chain(fromQuery(pagination)))), E.alt(() => (0, function_1.pipe)(params, E.of, E.chain(fromParams(pagination))))),
    getGenres: () => (0, function_1.pipe)(O.of(tmdbGenres_1.tmdbGenres)),
};
exports.TMDBRepo = TMDBRepo;
