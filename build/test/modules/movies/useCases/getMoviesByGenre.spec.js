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
const ts_mockito_1 = require("ts-mockito");
const result_1 = require("../../../../src/shared/Objects/result");
const testObjects_1 = require("./testObjects");
const getMoviesByGenre_1 = require("../../../../src/modules/movies/useCases/getMoviesByGenre");
const tmdb_1 = require("../../../../src/modules/movies/repos/tmdb");
const succesfullMovie = testObjects_1.exampleMovie;
const validGenre = {
    name: "Genre",
    uniqueId: 1,
};
const invalidGenre = {
    name: "Non-existent Genre",
    uniqueId: 0,
};
const mockedRepo = (0, ts_mockito_1.mock)(tmdb_1.TMDBRepo);
(0, ts_mockito_1.when)(mockedRepo.getMoviesByGenre(validGenre)).thenReturn(Promise.resolve(new result_1.Result(true, undefined, [succesfullMovie])));
(0, ts_mockito_1.when)(mockedRepo.getMoviesByGenre(invalidGenre)).thenReturn(Promise.resolve(new result_1.Result(false, "Invalid Genre")));
const mockedRepoInstance = (0, ts_mockito_1.instance)(mockedRepo);
describe("getMoviesByGenre(repo, Genre)", () => {
    test("When genre is valid returns succesfull result(s)", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, getMoviesByGenre_1.getMoviesByGenre)(mockedRepoInstance, validGenre);
        expect(result.isSuccess).toBe(true);
        expect(result.getValue()).toHaveLength(1);
        expect(result.getValue()).toEqual([succesfullMovie]);
    }));
    test("When genre is invalid returns error result", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, getMoviesByGenre_1.getMoviesByGenre)(mockedRepoInstance, invalidGenre);
        expect(result.isSuccess).toBe(false);
        expect(result.errorValue()).toBe("Invalid Genre");
    }));
});
