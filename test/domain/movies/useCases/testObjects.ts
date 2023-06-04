import moment from "moment"
import { MovieT } from "../../../../src/domain/movies/entities/movie"
import { LanguageT } from "../../../../src/domain/movies/entities/language"
import { CountryT } from "../../../../src/domain/movies/entities/country"
import { MoviesRepoT } from "../../../../src/domain/movies/repos/movies.repo"
import {
    mock,
    when,
    instance,
    deepEqual,
    anyNumber,
    anything,
} from "ts-mockito"
import { TMDBRepo } from "../../../../src/data/movies/repos/tmdb"
import { GenreT } from "../../../../src/domain/movies/entities/genre"
import * as TE from "fp-ts/TaskEither"
import * as O from "fp-ts/Option"
import { regions } from "../../../../src/core/sharedObjects/regions"

let mockedRepo = mock<MoviesRepoT>() //mock(TMDBRepo) does not work. Not sure why.

//getGenres()
export const exampleGenres: GenreT[] = [
    { uniqueId: 0, name: "firstGenre" },
    { uniqueId: 1, name: "secondGenre" },
]
when(mockedRepo.getGenres()).thenReturn(O.some(exampleGenres))

//getMovieById()
export const exampleMovie: MovieT = {
    background: { economicQuality: "", bestQuality: "" },
    id: 123456,
    overview: "Overview",
    poster: { economicQuality: "", bestQuality: "" },
    release: moment(2020).unix(),
    runtime: 100,
    tagline: "Tagline",
    imdbId: "tt1234567",
    title: "Title",
    genres: [
        {
            name: "Genre",
            uniqueId: 100,
        },
    ],
    languages: ["ln" as LanguageT],
    countries: ["co" as CountryT],
}
when(mockedRepo.findOne(exampleMovie.id)).thenReturn(TE.right(exampleMovie))

when(mockedRepo.findOne(0)).thenReturn(TE.right(exampleMovie))

//getMovieByDecade()
when(
    mockedRepo.findMany(anything(), deepEqual({ page: 0, limit: 1 }))
).thenReturn(TE.right([exampleMovie]))

//getMoviesByGenre()
export const exampleGenre: GenreT = { uniqueId: 28, name: "Action" }
when(
    mockedRepo.findMany(
        deepEqual({ genre: exampleGenre }),
        deepEqual({ limit: 1, page: 0 })
    )
).thenReturn(TE.right([exampleMovie]))
when(
    mockedRepo.findMany(
        deepEqual({ genre: [exampleGenre, exampleGenre] }),
        deepEqual({ limit: 1, page: 0 })
    )
).thenReturn(TE.right([exampleMovie]))

//getMoviesByRegion()
const exampleLanguage: LanguageT = "fr" as LanguageT
export const exampleRegion = "Europe"
when(
    mockedRepo.findMany(
        deepEqual({ language: [exampleLanguage] }),
        deepEqual({ page: 0, limit: 1 })
    )
).thenReturn(TE.right([exampleMovie]))

//getTrendingMovies()
when(
    mockedRepo.findMany(
        deepEqual({ trendingType: "day" }),
        deepEqual({ page: 0, limit: 1 })
    )
).thenReturn(TE.right([exampleMovie]))
when(
    mockedRepo.findMany(
        deepEqual({ trendingType: "week" }),
        deepEqual({ page: 0, limit: 1 })
    )
).thenReturn(TE.right([exampleMovie]))

//searchForMovie()
when(
    mockedRepo.findMany(
        deepEqual({ query: "example" }),
        deepEqual({ page: 0, limit: 1 })
    )
).thenReturn(TE.right([exampleMovie]))

const mockedRepoInstance = instance<MoviesRepoT>(mockedRepo)

export { mockedRepo, mockedRepoInstance }
