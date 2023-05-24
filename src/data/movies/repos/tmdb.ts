import axios, { AxiosError, AxiosResponse, ResponseType } from "axios"
import { identity, pipe, flow, absurd } from "fp-ts/lib/function"
import * as TE from "fp-ts/TaskEither"
import * as IO from "fp-ts/IO"
import * as E from "fp-ts/Either"
import * as O from "fp-ts/Option"
import {
    SuccesfullTMDBAggregateResponse,
    UnsuccesfullTMDBResponse,
    successfullTMDBResponse,
} from "./helpers/tmdbSchemas"
import { tmdbGenres } from "./helpers/tmdbGenres"
import { toMovies, toMovie } from "./helpers/resultToMovies"
import {
    resultsEnd,
    resultsPage,
    resultsStart,
} from "./helpers/paginationHandlers"
import moment from "moment"
import { paginationParamsT } from "../../../core/sharedObjects/pagination"
import { GenreT } from "../../../domain/movies/entities/genre"
import { LanguageT } from "../../../domain/movies/entities/language"
import tmdbConfig from "../../../core/config/tmdb.config"
import { MovieParamsT, MoviesRepoT } from "../../../domain/movies/repos/movies.repo"

const log =
    <A>(message: string) =>
    (r: A) =>
    () =>
        console.log(`${message}: ${JSON.stringify(r, undefined, 2)}`)

const api = axios.create({
    headers: {
        Authorization: `Bearer ${tmdbConfig.tmdbApiKey}`,
    },
})
const baseURL = "https://api.themoviedb.org/3/"

const fromTrending =
    (pagination: paginationParamsT) => (type: "day" | "week") =>
        TE.tryCatch(
            () =>
                api.get(
                    baseURL +
                        "trending/movie/" +
                        type +
                        `?page=${resultsPage(pagination)}`
                ),
            (error: unknown) => (error as AxiosError).response?.data
        )

const fromQuery = (pagination: paginationParamsT) => (query: string) =>
    TE.tryCatch(
        () =>
            api.get(
                "search/movie/" +
                    `?query=${query}` +
                    `&page=${resultsPage(pagination)}`
            ),
        (error: unknown) => (error as AxiosError).response?.data
    )

const fromParams =
    (pagination: paginationParamsT) => (params: MovieParamsT) => {
        const toQuery = (params: MovieParamsT) => {
            const genreToQueryValue = (genre: GenreT | Array<GenreT>) =>
                Array.isArray(genre)
                    ? genre.map((g) => g.uniqueId).join("|")
                    : genre.uniqueId

            const dateToQueryValue = (date: number) =>
                moment.unix(date).format("YYYY-MM-DD")

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
                          )}&`
                        : ""
                }`
            )
        }

        return TE.tryCatch(
            () =>
                api.get(
                    baseURL +
                        "discover/movie" +
                        toQuery(params) +
                        `page=${resultsPage(pagination)}`
                ),
            (error: unknown) => (error as AxiosError).response?.data
        )
    }

const TMDBRepo: MoviesRepoT = {
    findOne: (id: number) =>
        pipe(
            TE.tryCatch(
                () => api.get(baseURL + "movie/" + id),
                (error) => (error as AxiosError).response?.data
            ),
            TE.map((response) => response.data),
            TE.chain((response) =>
                pipe(
                    successfullTMDBResponse.decode(response),
                    E.match(
                        () => TE.left(response),
                        () => TE.right(response)
                    )
                )
            ),
            TE.mapLeft((response) =>
                pipe(
                    response,
                    UnsuccesfullTMDBResponse.decode,
                    E.match(
                        (errors) =>
                            `Unexpected Error. Response was recieved but did not conform to expected format. Payload : ${JSON.stringify(
                                response
                            )}`,
                        () =>
                            `TMDB request was not succesful. Reason: ${JSON.stringify(
                                response
                            )}`
                    )
                )
            ),
            TE.map(toMovie)
        ),
    findMany: (params: MovieParamsT, pagination: paginationParamsT) =>
        pipe(
            params,
            O.fromPredicate((params) => !!params.trendingType),
            O.map(() =>
                fromTrending(pagination)(params.trendingType as "day" | "week")
            ),
            O.alt(() =>
                pipe(
                    params,
                    O.fromPredicate((params) => !!params.query),
                    O.map(() => fromQuery(pagination)(params.query as string))
                )
            ),
            O.getOrElse(() => fromParams(pagination)(params)),
            TE.map((response) => response.data),
            TE.chain((response) =>
                pipe(
                    SuccesfullTMDBAggregateResponse.decode(response),
                    E.match(
                        () => TE.left(response),
                        () => TE.right(response)
                    )
                )
            ),
            TE.mapLeft((response) =>
                pipe(
                    response,
                    UnsuccesfullTMDBResponse.decode,
                    E.match(
                        () =>
                            `Unexpected Error. Response was recieved but did not conform to expected format. Payload : ${JSON.stringify(
                                response
                            )}`,
                        () =>
                            `TMDB request was not succesful. Reason: ${JSON.stringify(
                                response
                            )}`
                    )
                )
            ),
            TE.map(toMovies),
            TE.map((a) =>
                a.slice(resultsStart(pagination), resultsEnd(pagination))
            )
        ),
    getGenres: () => pipe(O.of(tmdbGenres)),
}

export { TMDBRepo }
