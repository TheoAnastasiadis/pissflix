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
Object.defineProperty(exports, "__esModule", { value: true });
const tmdb_1 = require("../../../../src/data/movies/repos/tmdb");
const subentities_1 = require("../../../../src/domain/movies/entities/subentities");
const repo = new tmdb_1.TMDBRepo();
const validTMDBId = 550;
const invalidTMDBId = 0;
describe("getMovieById(id)", () => {
    test("given a valid TMDB id returns a movie", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        const result = yield repo.getMovieById(validTMDBId);
        expect(result.isSuccess).toBe(true);
        expect(result.getValue()).toBeDefined();
        expect((_a = result.getValue()) === null || _a === void 0 ? void 0 : _a.adult).toBeDefined();
        expect((_b = result.getValue()) === null || _b === void 0 ? void 0 : _b.background).toBeDefined();
        expect((_c = result.getValue()) === null || _c === void 0 ? void 0 : _c.background).toBeInstanceOf(subentities_1.MovieImage);
        expect((_d = result.getValue()) === null || _d === void 0 ? void 0 : _d.genres).toBeDefined();
        expect((_e = result.getValue()) === null || _e === void 0 ? void 0 : _e.id).toBe(validTMDBId);
        expect((_f = result.getValue()) === null || _f === void 0 ? void 0 : _f.languages).toBeDefined();
        expect((_g = result.getValue()) === null || _g === void 0 ? void 0 : _g.overview).toBeDefined();
        expect((_h = result.getValue()) === null || _h === void 0 ? void 0 : _h.popularity).toBeDefined();
        expect((_j = result.getValue()) === null || _j === void 0 ? void 0 : _j.poster).toBeDefined();
        expect((_k = result.getValue()) === null || _k === void 0 ? void 0 : _k.poster).toBeInstanceOf(subentities_1.MovieImage);
        expect((_l = result.getValue()) === null || _l === void 0 ? void 0 : _l.countries).toBeDefined();
        expect((_m = result.getValue()) === null || _m === void 0 ? void 0 : _m.release).toBeDefined();
        expect((_o = result.getValue()) === null || _o === void 0 ? void 0 : _o.runtime).toBeDefined();
        expect((_p = result.getValue()) === null || _p === void 0 ? void 0 : _p.status).toBeDefined();
        expect((_q = result.getValue()) === null || _q === void 0 ? void 0 : _q.tagline).toBeDefined();
        expect((_r = result.getValue()) === null || _r === void 0 ? void 0 : _r.rating).toBeDefined();
    }));
    test("given an invalid TMDB id returns an error", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield repo.getMovieById(invalidTMDBId);
        expect(result.isFailure).toBe(true);
        expect(result.errorValue()).toBeDefined();
    }));
});
const validStartDate = new Date(2000, 0, 0);
const validEndDate = new Date(2001, 7, 7);
const invalidStartDate = new Date(2080, 0, 0); //very far into the future
describe("getMoviesByRealeaseDate(startDate, endDate)", () => {
    test("given valid start and end dates TMDB returns an array of movies", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield repo.getMoviesByRealeaseDate(validStartDate, validEndDate);
        expect(result.isSuccess).toBe(true);
        expect(result.getValue()).toBeDefined();
        for (const movie of result.getValue() || []) {
            expect(movie.adult).toBeDefined();
            expect(movie.background).toBeDefined();
            expect(movie.background).toBeInstanceOf(subentities_1.MovieImage);
            expect(movie.genres).toBeDefined();
            expect(movie.languages).toBeDefined();
            expect(movie.overview).toBeDefined();
            expect(movie.popularity).toBeDefined();
            expect(movie.poster).toBeDefined();
            expect(movie.poster).toBeInstanceOf(subentities_1.MovieImage);
            expect(movie.countries).toBeDefined();
            expect(movie.release).toBeDefined();
            expect(movie.runtime).toBeDefined();
            expect(movie.status).toBeDefined();
            expect(movie.tagline).toBeDefined();
            expect(movie.rating).toBeDefined();
        }
    }));
    test("given invalid dates returns an error", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield repo.getMoviesByRealeaseDate(invalidStartDate, validEndDate);
        expect(result.isFailure).toBe(true);
        expect(result.errorValue()).toBeDefined();
    }));
});
const firstLanguage = new subentities_1.Language("en", "639-1");
const secondLanguage = new subentities_1.Language("fr", "639-1");
const invalidLanguage = new subentities_1.Language("--", "639-1");
describe("getMoviesByLanguage(language)", () => {
    test("given a valid language returns an array of movies", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield repo.getMoviesByLanguage(firstLanguage);
        expect(result.isSuccess).toBe(true);
        expect(result.getValue()).toBeDefined();
        for (const movie of result.getValue() || []) {
            expect(movie.adult).toBeDefined();
            expect(movie.background).toBeDefined();
            expect(movie.background).toBeInstanceOf(subentities_1.MovieImage);
            expect(movie.genres).toBeDefined();
            expect(movie.languages).toBeDefined();
            expect(movie.overview).toBeDefined();
            expect(movie.popularity).toBeDefined();
            expect(movie.poster).toBeDefined();
            expect(movie.poster).toBeInstanceOf(subentities_1.MovieImage);
            expect(movie.countries).toBeDefined();
            expect(movie.release).toBeDefined();
            expect(movie.runtime).toBeDefined();
            expect(movie.status).toBeDefined();
            expect(movie.tagline).toBeDefined();
            expect(movie.rating).toBeDefined();
        }
    }));
    test("given an array of valid languages returns an array of movies", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield repo.getMoviesByLanguage([firstLanguage, secondLanguage]);
        expect(result.isSuccess).toBe(true);
        expect(result.getValue()).toBeDefined();
        for (const movie of result.getValue() || []) {
            expect(movie.adult).toBeDefined();
            expect(movie.background).toBeDefined();
            expect(movie.background).toBeInstanceOf(subentities_1.MovieImage);
            expect(movie.genres).toBeDefined();
            expect(movie.languages).toBeDefined();
            expect(movie.overview).toBeDefined();
            expect(movie.popularity).toBeDefined();
            expect(movie.poster).toBeDefined();
            expect(movie.poster).toBeInstanceOf(subentities_1.MovieImage);
            expect(movie.countries).toBeDefined();
            expect(movie.release).toBeDefined();
            expect(movie.runtime).toBeDefined();
            expect(movie.status).toBeDefined();
            expect(movie.tagline).toBeDefined();
            expect(movie.rating).toBeDefined();
        }
    }));
    test("given an invalid language return error result", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield repo.getMoviesByLanguage(invalidLanguage);
        expect(result.isFailure).toBe(true);
        expect(result.errorValue()).toBeDefined();
    }));
});
const validGenre = { uniqueId: 28, name: "Action" };
const invalidGenre = { uniqueId: 0, name: "Non existent genre" };
describe("getMoviesByGenre(genre)", () => {
    test("given a valid genre returns an array of movies", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield repo.getMoviesByGenre(validGenre);
        expect(result.isSuccess).toBe(true);
        expect(result.getValue()).toBeDefined();
        for (const movie of result.getValue() || []) {
            expect(movie.adult).toBeDefined();
            expect(movie.background).toBeDefined();
            expect(movie.background).toBeInstanceOf(subentities_1.MovieImage);
            expect(movie.genres).toBeDefined();
            expect(movie.languages).toBeDefined();
            expect(movie.overview).toBeDefined();
            expect(movie.popularity).toBeDefined();
            expect(movie.poster).toBeDefined();
            expect(movie.poster).toBeInstanceOf(subentities_1.MovieImage);
            expect(movie.countries).toBeDefined();
            expect(movie.release).toBeDefined();
            expect(movie.runtime).toBeDefined();
            expect(movie.status).toBeDefined();
            expect(movie.tagline).toBeDefined();
            expect(movie.rating).toBeDefined();
        }
    }));
    test("given an invalid genre return error result", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield repo.getMoviesByGenre(invalidGenre);
        expect(result.isFailure).toBe(true);
        expect(result.errorValue()).toBeDefined();
    }));
});
