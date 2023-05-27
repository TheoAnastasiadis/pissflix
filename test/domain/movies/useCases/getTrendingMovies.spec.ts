import { exampleMovie, mockedRepoInstance } from "./testObjects"
import { getTrendingMovies } from "../../../../src/domain/movies/useCases/getTrendingMovies"
import * as E from "fp-ts/Either"
import { MovieT } from "../../../../src/domain/movies/entities/movie"

describe("getTrendingMovies(repo)(pagination)('day'|'week')", () => {
    test("returns list of trending movies for the day", async () => {
        const result = await getTrendingMovies(mockedRepoInstance)({
            page: 0,
            limit: 1,
        })("day")()
        expect(E.isRight(result)).toBeTruthy()
        expect((result as E.Right<MovieT[]>).right).toEqual([exampleMovie])
    })

    test("returns list of trending movies for the week", async () => {
        const result = await getTrendingMovies(mockedRepoInstance)({
            page: 0,
            limit: 1,
        })("week")()
        expect(E.isRight(result)).toBeTruthy()
        expect((result as E.Right<MovieT[]>).right).toEqual([exampleMovie])
    })
})
