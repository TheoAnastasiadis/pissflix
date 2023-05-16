// import { mock, when, instance, anything } from "ts-mockito"
// import { Result } from "../../../../src/core/sharedObjects/result"
// import { TMDBRepo } from "../../../../src/data/movies/repos/tmdb"
// import { Movie } from "../../../../src/domain/movies/entities/movie.entity"
// import { Genre } from "../../../../src/domain/movies/entities/subentities"
// import { IMoviesRepo } from "../../../../src/domain/movies/repos/movies.repo"
// import { getMoviesByGenre } from "../../../../src/domain/movies/useCases/getMoviesByGenre"
// import { exampleMovie } from "./testObjects"

// const succesfullMovie: Movie = exampleMovie
// const validGenre: Genre = {
//     name: "Genre",
//     uniqueId: 1,
// }
// const invalidGenre: Genre = {
//     name: "Non-existent Genre",
//     uniqueId: 0,
// }

// const mockedRepo: IMoviesRepo = mock(TMDBRepo)
// when(mockedRepo.getMoviesByGenre(validGenre, anything())).thenReturn(
//     Promise.resolve(new Result<Movie[]>(true, undefined, [succesfullMovie]))
// )
// when(mockedRepo.getMoviesByGenre(invalidGenre, anything())).thenReturn(
//     Promise.resolve(new Result<Movie[]>(false, "Invalid Genre"))
// )
// const mockedRepoInstance: IMoviesRepo = instance(mockedRepo)

// describe("getMoviesByGenre(repo, Genre)", () => {
//     test("When genre is valid returns succesfull result(s)", async () => {
//         const result = await getMoviesByGenre(mockedRepoInstance, validGenre)
//         expect(result.isSuccess).toBe(true)
//         expect(result.getValue()).toHaveLength(1)
//         expect(result.getValue()).toEqual([succesfullMovie])
//     })
//     test("When genre is invalid returns error result", async () => {
//         const result = await getMoviesByGenre(mockedRepoInstance, invalidGenre)
//         expect(result.isSuccess).toBe(false)
//         expect(result.errorValue()).toBe("Invalid Genre")
//     })
// })
