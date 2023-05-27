import { getMovieById } from "../../../../src/domain/movies/useCases/getMovieById"
import { exampleMovie, mockedRepoInstance } from "./testObjects"
import * as E from "fp-ts/Either"
import { MovieT } from "../../../../src/domain/movies/entities/movie"

describe("getMovieById(repo)(id)", () => {
    test("When id is valid returns succesfull result", async () => {
        const result = await getMovieById(mockedRepoInstance)(123456)()
        expect(E.isRight(result)).toBe(true)
        expect((result as E.Right<MovieT>).right).toBe(exampleMovie)
    })
})
