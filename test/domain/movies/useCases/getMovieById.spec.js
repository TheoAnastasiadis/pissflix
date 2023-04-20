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
const result_1 = require("../../../../src/core/sharedObjects/result");
const tmdb_1 = require("../../../../src/data/movies/repos/tmdb");
const getMovieById_1 = require("../../../../src/domain/movies/useCases/getMovieById");
const testObjects_1 = require("./testObjects");
const succesfullMovie = testObjects_1.exampleMovie;
const mockedRepo = (0, ts_mockito_1.mock)(tmdb_1.TMDBRepo);
(0, ts_mockito_1.when)(mockedRepo.getMovieById(123456)).thenReturn(Promise.resolve(new result_1.Result(true, undefined, succesfullMovie)));
(0, ts_mockito_1.when)(mockedRepo.getMovieById(0)).thenReturn(Promise.resolve(new result_1.Result(false, "Unscucesfull fetch")));
const mockedRepoInstance = (0, ts_mockito_1.instance)(mockedRepo);
describe("getMovie(repo, id)", () => {
    test("When id is valid returns succesfull result", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, getMovieById_1.getMovieById)(mockedRepoInstance, 123456);
        expect(result.isSuccess).toBe(true);
        expect(result.getValue()).toBe(succesfullMovie);
    }));
    test("When id is invalid returns error result", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, getMovieById_1.getMovieById)(mockedRepoInstance, 0);
        expect(result.isSuccess).toBe(false);
        expect(result.errorValue()).toBe("Unscucesfull fetch");
    }));
});
