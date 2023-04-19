import { instance, mock, when } from "ts-mockito"
import { IMoviesRepo } from "../../../../src/modules/movies/repos/movies.repo.interface"
import { TMDBRepo } from "../../../../src/modules/movies/repos/tmdb"
import { Movie } from "../../../../src/modules/movies/entities/movie.entity"
import { Result } from "../../../../src/shared/Objects/result"
import { exampleMovie } from "./testObjects"
import { getMovieById } from "../../../../src/modules/movies/useCases/getMovieById"

const succesfullMovie: Movie = exampleMovie

const mockedRepo: IMoviesRepo = mock(TMDBRepo)
when(mockedRepo.getMovieById(123456)).thenReturn(
    Promise.resolve(new Result<Movie>(true, undefined, succesfullMovie))
)
when(mockedRepo.getMovieById(0)).thenReturn(
    Promise.resolve(new Result<Movie>(false, "Unscucesfull fetch"))
)
const mockedRepoInstance: IMoviesRepo = instance(mockedRepo)

describe("getMovie(repo, id)", () => {
    test("When id is valid returns succesfull result", async () => {
        const result = await getMovieById(mockedRepoInstance, 123456)
        expect(result.isSuccess).toBe(true)
        expect(result.getValue()).toBe(succesfullMovie)
    })
    test("When id is invalid returns error result", async () => {
        const result = await getMovieById(mockedRepoInstance, 0)
        expect(result.isSuccess).toBe(false)
        expect(result.errorValue()).toBe("Unscucesfull fetch")
    })
})
