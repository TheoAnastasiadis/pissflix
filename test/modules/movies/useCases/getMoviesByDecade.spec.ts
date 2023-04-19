import { anyOfClass, capture, instance, mock, when, verify } from "ts-mockito"
import { IMoviesRepo } from "../../../../src/modules/movies/repos/movies.repo.interface"
import { Movie } from "../../../../src/modules/movies/entities/movie.entity"
import { Result } from "../../../../src/shared/Objects/result"
import { exampleMovie } from "./testObjects"
import { TMDBRepo } from "../../../../src/modules/movies/repos/tmdb"
import { getMoviesByDecade } from "../../../../src/modules/movies/useCases/getMoviesByDecade"
import { Year } from "../../../../src/shared/Objects/decades"

const succesfullMovie: Movie = exampleMovie
const decade: Year = 2020
const [startDate, endDate] = [new Date(2020, 0, 0), new Date(2029, 11, 30)]
const mockedRepo: IMoviesRepo = mock(TMDBRepo)
when(
    mockedRepo.getMoviesByRealeaseDate(anyOfClass(Date), anyOfClass(Date))
).thenReturn(
    Promise.resolve(new Result<Movie[]>(true, undefined, [succesfullMovie]))
)
const mockedRepoInstance: IMoviesRepo = instance(mockedRepo)

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
                anyOfClass(Date)
            )
        ).once()
        expect(result.getValue()).toHaveLength(1)
        expect(result.getValue()).toEqual([succesfullMovie])
    })
})
