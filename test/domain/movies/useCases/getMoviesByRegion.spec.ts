import { MovieT } from "../../../../src/domain/movies/entities/movie"
import { getMoviesByRegion } from "../../../../src/domain/movies/useCases/getMoviesByRegion"
import { exampleRegion, exampleMovie, mockedRepoInstance } from "./testObjects"
import * as E from "fp-ts/Either"

describe("getMoviesByRegion(repo)(pagination)(languages)", () => {
    test("When region has one language", async () => {
        const result = await getMoviesByRegion(mockedRepoInstance)({
            page: 0,
            limit: 1,
        })(exampleRegion)()
        expect(E.isRight(result)).toBeTruthy()
        expect((result as E.Right<MovieT[]>).right).toEqual([exampleMovie])
    })
})
