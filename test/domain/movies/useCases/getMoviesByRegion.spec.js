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
const getMoviesByRegion_1 = require("../../../../src/domain/movies/useCases/getMoviesByRegion");
const testObjects_1 = require("./testObjects");
const succesfullMovie = testObjects_1.exampleMovie;
const region = {
    name: "Region",
    isoType: "639-1",
    languages: ["ln"],
};
const mockedRepo = (0, ts_mockito_1.mock)(tmdb_1.TMDBRepo);
(0, ts_mockito_1.when)(mockedRepo.getMoviesByLanguage((0, ts_mockito_1.anything)())).thenReturn(Promise.resolve(new result_1.Result(true, undefined, [succesfullMovie])));
const mockedRepoInstance = (0, ts_mockito_1.instance)(mockedRepo);
describe("getMoviesByDecade(repo, Region)", () => {
    test("When region has one language", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, getMoviesByRegion_1.getMoviesByRegion)(mockedRepoInstance, region);
        const languages = (0, ts_mockito_1.capture)(mockedRepo.getMoviesByLanguage).last();
        expect(languages).toHaveLength(1);
        (0, ts_mockito_1.verify)(mockedRepo.getMoviesByLanguage((0, ts_mockito_1.anything)())).once();
        expect(result.getValue()).toHaveLength(1);
        expect(result.getValue()).toEqual([succesfullMovie]);
    }));
});
