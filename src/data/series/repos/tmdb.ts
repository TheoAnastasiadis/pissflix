import axios, { AxiosError } from "axios"
import {
    SeriesParamsT,
    SeriesRepoT,
} from "../../../domain/series/repos/series.repo"
import * as TE from "fp-ts/TaskEither"
import * as E from "fp-ts/Either"
import { pipe } from "fp-ts/function"
import * as O from "fp-ts/Option"
import tmdbConfig from "../../../core/config/tmdb.config"
import {
    EpisodeResponse,
    SeasonResponse,
    TMDBSeriesAggregateResponse,
    successfullTMDBTVResponse,
} from "./decoders/tmdb.decoders"
import { UnsuccesfullTMDBResponse } from "../../movies/repos/decoders/tmdb.schemas"
import {
    toSingleSeries,
    toSeason,
    toEpisode,
    toMultipleSeries,
} from "./helpers/resultToSeries"
import { paginationParamsT } from "../../../core/sharedObjects/pagination"
import {
    resultsEnd,
    resultsPage,
    resultsStart,
} from "../../movies/repos/helpers/paginationHandlers"
import { SeriesGenresT } from "../../../domain/series/entities/seriesGenres"
import { tmdbSeriesGenres } from "./helpers/tmdbGenres"

const api = axios.create({
    headers: {
        Authorization: `Bearer ${tmdbConfig.tmdbApiKey}`,
    },
})
const baseURL = "https://api.themoviedb.org/3/"

//helpers
const fromTrending =
    (pagination: paginationParamsT) => (type: "day" | "week") =>
        TE.tryCatch(
            () =>
                api.get(
                    baseURL +
                        "trending/tv/" +
                        type +
                        `?page=${resultsPage(pagination)}`
                ),
            (error: unknown) => (error as AxiosError).response
        )

const fromQuery = (pagination: paginationParamsT) => (query: string) =>
    TE.tryCatch(
        () =>
            api.get(
                baseURL +
                    "search/tv" +
                    `?query=${query}` +
                    `&page=${resultsPage(pagination)}`
            ),
        (error) => {
            console.error((error as AxiosError).request)
            return (error as AxiosError).response
        }
    )

const fromGenre =
    (pagination: paginationParamsT) => (params: SeriesParamsT) => {
        const toQuery = (params: SeriesParamsT) => {
            const genreToQueryValue = (
                genre: SeriesGenresT | Array<SeriesGenresT>
            ) =>
                Array.isArray(genre)
                    ? genre.map((g) => g.id).join("|")
                    : genre.id

            return params.genre
                ? `?with_genres= ${genreToQueryValue(params.genre)}&`
                : ""
        }

        return TE.tryCatch(
            () =>
                api.get(
                    baseURL +
                        "discover/tv" +
                        toQuery(params) +
                        `page=${resultsPage(pagination)}`
                ),
            (error: unknown) => (error as AxiosError).response
        )
    }

export const TMDBSeriesRepo: SeriesRepoT = {
    findSeries: (id) =>
        pipe(
            TE.tryCatch(
                () =>
                    api.get(
                        baseURL +
                            "tv/" +
                            id +
                            "?append_to_response=external_ids"
                    ),
                (error) => (error as AxiosError).response?.data
            ),
            TE.map((response) => response.data),
            TE.chain((response) =>
                pipe(
                    successfullTMDBTVResponse.decode(response),
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
                            `[TMDB Find Series] Response was recieved but did not conform to expected format. Payload : ${JSON.stringify(
                                response
                            )}`,
                        () =>
                            `[TMDB Find Series] TMDB request was not succesful. Reason: ${JSON.stringify(
                                response
                            )}`
                    )
                )
            ),
            TE.map(toSingleSeries)
        ),
    findSeason: (seriesId) => (seasonId: number) =>
        pipe(
            TE.tryCatch(
                () =>
                    api.get(baseURL + "tv/" + seriesId + "/season/" + seasonId),
                (error) => (error as AxiosError).response?.data
            ),
            TE.map((response) => response.data),
            TE.chain((response) =>
                pipe(
                    SeasonResponse.decode(response),
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
                            `[TMDB Find Season] Response was recieved but did not conform to expected format. Payload : ${JSON.stringify(
                                response
                            )}`,
                        () =>
                            `[TMDB Find Season] TMDB request was not succesful. Reason: ${JSON.stringify(
                                response
                            )}`
                    )
                )
            ),
            TE.map(toSeason)
        ),
    findEpisode: (seriesId) => (seasonId) => (episodeId) =>
        pipe(
            TE.tryCatch(
                () =>
                    api.get(
                        baseURL +
                            "tv/" +
                            seriesId +
                            "/season/" +
                            seasonId +
                            "/episode/" +
                            episodeId +
                            "?append_to_response=external_ids"
                    ),
                (error) => (error as AxiosError).response?.data
            ),
            TE.map((response) => response.data),
            TE.chain((response) =>
                pipe(
                    EpisodeResponse.decode(response),
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
                            `[TMDB Find Season] Response was recieved but did not conform to expected format. Payload : ${JSON.stringify(
                                response
                            )}`,
                        () =>
                            `[TMDB Find Season] TMDB request was not succesful. Reason: ${JSON.stringify(
                                response
                            )}`
                    )
                )
            ),
            TE.map(toEpisode)
        ),
    findMany: (params, pagination) =>
        pipe(
            params,
            O.fromPredicate((params) => "trendingType" in params),
            O.map(() =>
                fromTrending(pagination)(params.trendingType as "day" | "week")
            ),
            O.alt(() =>
                pipe(
                    params,
                    O.fromPredicate((params) => "query" in params),
                    O.map(() => fromQuery(pagination)(params.query as string))
                )
            ),
            O.getOrElse(() => fromGenre(pagination)(params)),
            TE.map((response) => response.data),
            TE.mapLeft((error) => error?.data),
            TE.chainW((response) =>
                pipe(
                    TMDBSeriesAggregateResponse.decode(response),
                    TE.fromEither
                )
            ),
            TE.mapLeft((response) =>
                pipe(
                    response,
                    UnsuccesfullTMDBResponse.decode,
                    E.match(
                        () =>
                            `[Find many series] Response was recieved but did not conform to expected format`,
                        () =>
                            `[Find many series] TMDB request was not succesful. Reason: ${JSON.stringify(
                                response
                            )}`
                    )
                )
            ),
            TE.map(toMultipleSeries),
            TE.map((a) =>
                a.slice(resultsStart(pagination), resultsEnd(pagination))
            )
        ),
    getGenres: () => O.of(tmdbSeriesGenres as SeriesGenresT[]),
}
