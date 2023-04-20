import { mock, when, anything, instance, capture, verify } from "ts-mockito"
import { Region } from "../../../../src/core/sharedObjects/regions"
import { Result } from "../../../../src/core/sharedObjects/result"
import { TMDBRepo } from "../../../../src/data/movies/repos/tmdb"
import { Movie } from "../../../../src/domain/movies/entities/movie.entity"
import { IMoviesRepo } from "../../../../src/domain/movies/repos/movies.repo"
import { getMoviesByRegion } from "../../../../src/domain/movies/useCases/getMoviesByRegion"
import { exampleMovie } from "./testObjects"

const succesfullMovie: Movie = exampleMovie
const region: Region = {
    name: "Region",
    isoType: "639-1",
    languages: ["ln"],
}
const mockedRepo: IMoviesRepo = mock(TMDBRepo)
when(mockedRepo.getMoviesByLanguage(anything())).thenReturn(
    Promise.resolve(new Result<Movie[]>(true, undefined, [succesfullMovie]))
)
const mockedRepoInstance: IMoviesRepo = instance(mockedRepo)

describe("getMoviesByDecade(repo, Region)", () => {
    test("When region has one language", async () => {
        const result = await getMoviesByRegion(mockedRepoInstance, region)
        const languages = capture(mockedRepo.getMoviesByLanguage).last()
        expect(languages).toHaveLength(1)
        verify(mockedRepo.getMoviesByLanguage(anything())).once()
        expect(result.getValue()).toHaveLength(1)
        expect(result.getValue()).toEqual([succesfullMovie])
    })
})
