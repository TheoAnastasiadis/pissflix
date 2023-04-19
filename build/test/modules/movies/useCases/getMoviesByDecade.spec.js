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
const tmdb_1 = require("../../../../src/modules/movies/repos/tmdb");
const getMoviesByDecade_1 = require("../../../../src/modules/movies/useCases/getMoviesByDecade");
const succesfullMovie = testObjects_1.exampleMovie;
const decade = 2020;
const [startDate, endDate] = [new Date(2020, 0, 0), new Date(2029, 11, 30)];
const mockedRepo = (0, ts_mockito_1.mock)(tmdb_1.TMDBRepo);
(0, ts_mockito_1.when)(mockedRepo.getMoviesByRealeaseDate((0, ts_mockito_1.anyOfClass)(Date), (0, ts_mockito_1.anyOfClass)(Date))).thenReturn(Promise.resolve(new result_1.Result(true, undefined, [succesfullMovie])));
const mockedRepoInstance = (0, ts_mockito_1.instance)(mockedRepo);
describe("getMoviesByDecade(repo, firstYearOfDecade)", () => {
    test("When decade is valid returns succesfull result(s)", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, getMoviesByDecade_1.getMoviesByDecade)(mockedRepoInstance, decade);
        const [firstArg, secondArg] = (0, ts_mockito_1.capture)(mockedRepo.getMoviesByRealeaseDate).last();
        expect(firstArg).toEqual(startDate);
        expect(secondArg).toEqual(endDate);
        (0, ts_mockito_1.verify)(mockedRepo.getMoviesByRealeaseDate((0, ts_mockito_1.anyOfClass)(Date), (0, ts_mockito_1.anyOfClass)(Date))).once();
        expect(result.getValue()).toHaveLength(1);
        expect(result.getValue()).toEqual([succesfullMovie]);
    }));
});
