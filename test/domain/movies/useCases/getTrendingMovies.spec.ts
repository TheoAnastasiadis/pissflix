import { mock, when, instance, anything } from "ts-mockito"
import { Result } from "../../../../src/core/sharedObjects/result"
import { TMDBRepo } from "../../../../src/data/movies/repos/tmdb"
import { IMoviesRepo } from "../../../../src/domain/movies/repos/movies.repo"
import { exampleMovie } from "./testObjects"
import { Movie } from "../../../../src/domain/movies/entities/movie.entity"
import {getTrendingMovies} from '../../../../src/domain/movies/useCases/getTrendingMovies'

const mockedRepo : IMoviesRepo = mock(TMDBRepo)
const succesfullMovie: Movie = exampleMovie
when(mockedRepo.getTrendingMovies("day", anything())).thenResolve(new Result<Movie[]>(true, undefined, [succesfullMovie, succesfullMovie]))
when(mockedRepo.getTrendingMovies("week", anything())).thenResolve(new Result<Movie[]>(true, undefined, [succesfullMovie]))
const mockedRepoInstance: IMoviesRepo = instance(mockedRepo)

describe('getTrendingMovies()', () => {
    test("returns list of trending movies for the day", async () => {
        const result = await getTrendingMovies(mockedRepoInstance, "day")
        expect(result.isSuccess).toBe(true)
        expect(result.getValue()).toHaveLength(2)
    })

    test("returns list of trending movies for the week", async () => {
        const result = await getTrendingMovies(mockedRepoInstance, "week")
        expect(result.isSuccess).toBe(true)
        expect(result.getValue()).toHaveLength(1) //different lengths according to mock
    })
})