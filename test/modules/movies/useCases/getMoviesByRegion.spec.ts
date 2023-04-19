import { mock, when, instance, anything, capture, verify } from "ts-mockito"
import { Movie } from "../../../../src/modules/movies/entities/movie.entity"
import { IMoviesRepo } from "../../../../src/modules/movies/repos/movies.repo.interface"
import { TMDBRepo } from "../../../../src/modules/movies/repos/tmdb"
import { getMoviesByRegion } from "../../../../src/modules/movies/useCases/getMoviesByRegion"
import { Region } from "../../../../src/shared/Objects/regions"
import { Result } from "../../../../src/shared/Objects/result"
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
