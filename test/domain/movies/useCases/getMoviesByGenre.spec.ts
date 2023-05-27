import { getMoviesByGenre } from "../../../../src/domain/movies/useCases/getMoviesByGenre"
import { exampleGenre, exampleMovie, mockedRepoInstance } from "./testObjects"
import { MovieT } from "../../../../src/domain/movies/entities/movie"
import * as E from "fp-ts/Either"

describe("getMoviesByGenre(repo)(pagination)(genre)", () => {
    test("return movies with one genre", async () => {
        const result = await getMoviesByGenre(mockedRepoInstance)({
            page: 0,
            limit: 1,
        })(exampleGenre)()
        expect(E.isRight(result)).toBeTruthy()
        expect((result as E.Right<MovieT[]>).right).toEqual([exampleMovie])
    })
    test("return movies with multiple genres", async () => {
        const result = await getMoviesByGenre(mockedRepoInstance)({
            page: 0,
            limit: 1,
        })([exampleGenre, exampleGenre])()
        expect(E.isRight(result)).toBeTruthy()
        expect((result as E.Right<MovieT[]>).right).toEqual([exampleMovie])
    })
})
