// import { mock, when, instance } from "ts-mockito"
// import { Result } from "../../../../src/core/sharedObjects/result"
// import { TMDBRepo } from "../../../../src/data/movies/repos/tmdb"
// import { Movie } from "../../../../src/domain/movies/entities/movie.entity"
// import { IMoviesRepo } from "../../../../src/domain/movies/repos/movies.repo"
// import { getMovieById } from "../../../../src/domain/movies/useCases/getMovieById"
// import { exampleMovie } from "./testObjects"

// const succesfullMovie: Movie = exampleMovie

// const mockedRepo: IMoviesRepo = mock(TMDBRepo)
// when(mockedRepo.getMovieById(123456)).thenReturn(
//     Promise.resolve(new Result<Movie>(true, undefined, succesfullMovie))
// )
// when(mockedRepo.getMovieById(0)).thenReturn(
//     Promise.resolve(new Result<Movie>(false, "Unscucesfull fetch"))
// )
// const mockedRepoInstance: IMoviesRepo = instance(mockedRepo)

// describe("getMovie(repo, id)", () => {
//     test("When id is valid returns succesfull result", async () => {
//         const result = await getMovieById(mockedRepoInstance, 123456)
//         expect(result.isSuccess).toBe(true)
//         expect(result.getValue()).toBe(succesfullMovie)
//     })
//     test("When id is invalid returns error result", async () => {
//         const result = await getMovieById(mockedRepoInstance, 0)
//         expect(result.isSuccess).toBe(false)
//         expect(result.errorValue()).toBe("Unscucesfull fetch")
//     })
// })
