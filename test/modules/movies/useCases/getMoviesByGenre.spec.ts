import { instance, mock, when } from "ts-mockito"
import { IMoviesRepo } from "../../../../src/modules/movies/repos/movies.repo.interface"
import { Movie } from "../../../../src/modules/movies/entities/movie.entity"
import { Result } from "../../../../src/shared/Objects/result"
import { exampleMovie } from "./testObjects"
import { Genre } from "../../../../src/modules/movies/entities/subtypes"
import { getMoviesByGenre } from "../../../../src/modules/movies/useCases/getMoviesByGenre"
import { TMDBRepo } from "../../../../src/modules/movies/repos/tmdb"

const succesfullMovie: Movie = exampleMovie
const validGenre : Genre = {
    name: "Genre",
    uniqueId: 1
}
const invalidGenre : Genre = {
    name: "Non-existent Genre",
    uniqueId: 0
}

const mockedRepo: IMoviesRepo = mock(TMDBRepo)
when(mockedRepo.getMoviesByGenre(validGenre)).thenReturn(Promise.resolve(new Result<Movie[]>(true, undefined, [succesfullMovie])))
when(mockedRepo.getMoviesByGenre(invalidGenre)).thenReturn(Promise.resolve(new Result<Movie[]>(false, "Invalid Genre")))
const mockedRepoInstance : IMoviesRepo = instance(mockedRepo)

describe("getMoviesByGenre(repo, Genre)", () => {
    test("When genre is valid returns succesfull result(s)", async () => {
        const result = await getMoviesByGenre(mockedRepoInstance, validGenre)
        expect(result.isSuccess).toBe(true)
        expect(result.getValue()).toHaveLength(1)
        expect(result.getValue()).toEqual([succesfullMovie])
    })
    test("When genre is invalid returns error result", async () => {
        const result = await getMoviesByGenre(mockedRepoInstance, invalidGenre)
        expect(result.isSuccess).toBe(false)
        expect(result.errorValue()).toBe("Invalid Genre")
    })
})
