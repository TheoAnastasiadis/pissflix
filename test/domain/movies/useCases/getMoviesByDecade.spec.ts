import {
    mock,
    when,
    anyOfClass,
    instance,
    capture,
    verify,
    anything,
} from "ts-mockito"
import { Year } from "../../../../src/core/sharedObjects/decades"
import { Result } from "../../../../src/core/sharedObjects/result"
import { TMDBRepo } from "../../../../src/data/movies/repos/tmdb"
import { Movie } from "../../../../src/domain/movies/entities/movie.entity"
import { getMoviesByDecade } from "../../../../src/domain/movies/useCases/getMoviesByDecade"
import { exampleMovie } from "./testObjects"
import { paginationParams } from "../../../../src/core/sharedObjects/paginationHandler"

const succesfullMovie: Movie = exampleMovie
const decade: Year = 2020
const [startDate, endDate] = [new Date(2020, 0, 0), new Date(2029, 11, 30)]
const mockedRepo = mock(TMDBRepo)
when(
    mockedRepo.getMoviesByRealeaseDate(
        anyOfClass(Date),
        anyOfClass(Date),
        anything()
    )
).thenReturn(
    Promise.resolve(new Result<Movie[]>(true, undefined, [succesfullMovie]))
)
const mockedRepoInstance = instance(mockedRepo)

describe("getMoviesByDecade(repo, firstYearOfDecade)", () => {
    test("When decade is valid returns succesfull result(s)", async () => {
        const result = await getMoviesByDecade(mockedRepoInstance, decade)
        const [firstArg, secondArg] = capture(
            mockedRepo.getMoviesByRealeaseDate
        ).last()
        expect(firstArg).toEqual(startDate)
        expect(secondArg).toEqual(endDate)
        verify(
            mockedRepo.getMoviesByRealeaseDate(
                anyOfClass(Date),
                anyOfClass(Date),
                anything()
            )
        ).once()
        expect(result.getValue()).toHaveLength(1)
        expect(result.getValue()).toEqual([succesfullMovie])
    })
})