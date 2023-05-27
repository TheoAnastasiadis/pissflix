import * as E from "fp-ts/Either"
import { getMoviesByDecade } from "../../../../src/domain/movies/useCases/getMoviesByDecade"
import { exampleMovie, mockedRepo, mockedRepoInstance } from "./testObjects"
import { MovieT } from "../../../../src/domain/movies/entities/movie"
import { capture } from "ts-mockito"
import moment from "moment"

describe("getMoviesByDecade(repo)(pagination)(firstYearOfDecade)", () => {
    test("When decade is valid returns succesfull result(s)", async () => {
        const result = await getMoviesByDecade(mockedRepoInstance)({
            page: 0,
            limit: 1,
        })(2005)()
        expect(E.isRight(result)).toBe(true)
        expect((result as E.Right<MovieT[]>).right).toEqual([exampleMovie])
        const [movieParams, pagination] = capture(mockedRepo.findMany).last()
        expect(movieParams).toEqual({
            startDate: moment("2000").unix(),
            endDate: moment("2010").unix(),
        })
    })
})
