import {
    MovieParamsT,
    MoviesRepoT,
} from "../../../../domain/movies/repos/movies.repo"
import axios from "axios"
import tmdbConfig from "../../../../core/config/tmdb.config"
import { identity, pipe } from "fp-ts/lib/function"
import * as TE from "fp-ts/TaskEither"
import * as O from "fp-ts/Option"
import * as E from "fp-ts/Either"
import {
    SuccesfullTMDBAggregateResponse,
    UnsuccesfullTMDBResponse,
    successfullTMDBResponse,
} from "./helpers/tmdbSchemas"
import { tmdbGenres } from "./helpers/tmdbGenres"
import { MovieT } from "../../../../domain/movies/entities/movie"
import { LanguageT } from "../../../../domain/movies/entities/language"
import { GenreT } from "../../../../domain/movies/entities/genre"
import { toMovies, toMovie } from "./helpers/resultToMovies"
import { paginationParamsT } from "../../../../core/sharedObjects/pagination"
import { resultsEnd, resultsPage, resultsStart } from "./helpers/pagination"

const api = axios.create({
    headers: {
        Authorization: `Bearer ${tmdbConfig.tmdbApiKey}`,
    },
})
const baseURL = "https://api.themoviedb.org/3/"

const fromTrending =
    (pagination: paginationParamsT) => (type: "day" | "week") =>
        pipe(
            type,
            TE.tryCatchK(
                (type) =>
                    api.get(
                        baseURL +
                            "trending/movie/" +
                            type +
                            `?page=${resultsPage(pagination)}`
                    ),
                () => `Unkown Error Occured`
            ),
            TE.map((response) => response.data),
            E.fromPredicate(SuccesfullTMDBAggregateResponse.is, identity),
            E.mapLeft((data) =>
                UnsuccesfullTMDBResponse.is(data)
                    ? `TMDB API Error: message: ${data.status_message}, code: ${data.status_code}`
                    : `Unkonwn Error Occured`
            ),
            E.map(toMovies),
            E.map((a) =>
                a.slice(resultsStart(pagination), resultsEnd(pagination))
            )
        )

const fromQuery = (pagination: paginationParamsT) => (query: string) =>
    pipe(
        query,
        TE.tryCatchK(
            (s) => api.get("search/movie/" + `?query=${s}`),
            () => ``
        ),
        TE.map((response) => response.data),
        E.fromPredicate(SuccesfullTMDBAggregateResponse.is, identity),
        E.mapLeft((data) =>
            UnsuccesfullTMDBResponse.is(data)
                ? `TMDB API Error: message: ${data.status_message}, code: ${data.status_code}`
                : `Unkonwn Error`
        ),
        E.map(toMovies),
        E.map((a) => a.slice(resultsStart(pagination), resultsEnd(pagination)))
    )

const fromParams =
    (pagination: paginationParamsT) => (params: MovieParamsT) => {
        const toQuery = (params: MovieParamsT) => {
            const genreToQueryValue = (genre: GenreT | Array<GenreT>) =>
                Array.isArray(genre)
                    ? genre.map((g) => g.uniqueId).join("|")
                    : genre.uniqueId

            const dateToQueryValue = (date: Date) =>
                date
                    .toLocaleDateString("en-US")
                    .replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/gm, "$3")

            const languageToQueryValue = (lang: LanguageT | Array<LanguageT>) =>
                Array.isArray(lang) ? lang.join("|") : lang

            return (
                `?` +
                `${
                    params.genre
                        ? `with_genres= ${genreToQueryValue(params.genre)}&`
                        : ""
                }` +
                `${
                    params.startDate
                        ? `primary_release_date.gte=${dateToQueryValue(
                              params.startDate
                          )}&`
                        : ""
                }` +
                `${
                    params.endDate
                        ? `primary_release_date.lte=${dateToQueryValue(
                              params.endDate
                          )}&`
                        : ""
                }` +
                `${
                    params.language
                        ? `with_original_language=${languageToQueryValue(
                              params.language
                          )}`
                        : ""
                }`
            )
        }

        return pipe(
            params,
            toQuery,
            TE.tryCatchK(
                (s) => api.get(baseURL + "discover/movie" + s),
                () => `Unkown Error Occured`
            ),
            TE.map((response) => response.data),
            E.fromPredicate(SuccesfullTMDBAggregateResponse.is, identity),
            E.mapLeft((data) =>
                UnsuccesfullTMDBResponse.is(data)
                    ? `TMDB API Error: message: ${data.status_message}, code: ${data.status_code}`
                    : `Unkonwn Error`
            ),
            E.map(toMovies),
            E.map((a) =>
                a.slice(resultsStart(pagination), resultsEnd(pagination))
            )
        )
    }

const TMDBRepo: MoviesRepoT = {
    findOne: (id: number) =>
        pipe(
            id,
            TE.tryCatchK(
                () => api.get(baseURL + "movie/" + id),
                () => `Server could not establish connection to TMDB.`
            ),
            TE.map((response) => response.data),
            E.fromPredicate(successfullTMDBResponse.is, identity),
            E.mapLeft((data) =>
                UnsuccesfullTMDBResponse.is(data)
                    ? `TMDB API Error: message: ${data.status_message}, code: ${data.status_code}`
                    : `Unkonwn Error`
            ),
            E.map(toMovie)
        ),
    findMany: (params: any, pagination: paginationParamsT) =>
        pipe(
            params,
            E.fromPredicate((params) => "trending" in params, identity),
            E.chain(fromTrending(pagination)),
            E.alt(() =>
                pipe(
                    params,
                    E.fromPredicate((params) => "query" in params, identity),
                    E.chain(fromQuery(pagination))
                )
            ),
            E.alt(() => pipe(params, E.of, E.chain(fromParams(pagination))))
        ),
    getGenres: () => pipe(O.of(tmdbGenres)),
}

export { TMDBRepo }
