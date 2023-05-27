import { exampleMovie, mockedRepoInstance } from "./testObjects"
import { searchForMovie } from "../../../../src/domain/movies/useCases/searchForMovie"
import { MovieT } from "../../../../src/domain/movies/entities/movie"
import * as E from "fp-ts/Either"

describe("searchForMovie(repo)(pagination)(query)", () => {
    test("returns list of movies that match the query", async () => {
        const result = await searchForMovie(mockedRepoInstance)({
            page: 0,
            limit: 1,
        })("example")()
        expect(E.isRight(result)).toBeTruthy()
        expect((result as E.Right<MovieT[]>).right).toEqual([exampleMovie])
    })
})
