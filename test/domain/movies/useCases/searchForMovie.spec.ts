import { mock, when, instance, anything } from "ts-mockito"
import { Result } from "../../../../src/core/sharedObjects/result"
import { TMDBRepo } from "../../../../src/data/movies/repos/tmdb"
import { Movie } from "../../../../src/domain/movies/entities/movie.entity"
import { IMoviesRepo } from "../../../../src/domain/movies/repos/movies.repo"
import { exampleMovie } from "./testObjects"
import { searchForMovie } from "../../../../src/domain/movies/useCases/searchForMovie"

const mockedRepo: IMoviesRepo = mock(TMDBRepo)
const succesfullMovie: Movie = exampleMovie
const searchQuery = "query"
when(mockedRepo.searchForMovie(searchQuery, anything())).thenResolve(
    new Result<Movie[]>(true, undefined, [succesfullMovie])
)
const mockedRepoInstance: IMoviesRepo = instance(mockedRepo)

describe("searchForMovie()", () => {
    test("returns list of movies that match the query", async () => {
        const result = await searchForMovie(mockedRepoInstance, searchQuery)
        expect(result.isSuccess).toBe(true)
        expect(result.getValue()).toHaveLength(1)
        expect(result.getValue()).toEqual([succesfullMovie])
    })
})
