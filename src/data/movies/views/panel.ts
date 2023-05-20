import { pipe, flow } from "fp-ts/lib/function"
import { View } from "../../../core/sharedObjects/view"
import { MoviesRepoT } from "../../../domain/movies/repos/movies.repo"
import { panelParams } from "../../../domain/movies/views"
import * as E from "fp-ts/Either"
import * as O from "fp-ts/Option"
import * as TE from "fp-ts/TaskEither"
import * as A from "fp-ts/Array"
import { getMoviesByDecade } from "../../../domain/movies/useCases/getMoviesByDecade"
import { getMoviesByGenre } from "../../../domain/movies/useCases/getMoviesByGenre"
import { regions } from "../../../core/sharedObjects/regions"
import { getMoviesByRegion } from "../../../domain/movies/useCases/getMoviesByRegion"
import { getTrendingMovies } from "../../../domain/movies/useCases/getTrendingMovies"
import {
    MsxContentRoot,
    addItemToContent,
} from "../../../core/msxUI/contentObjects"
import moment from "moment"
import { errorPage } from "./helpers/errorPage"

export const panelView: View<{ repo: MoviesRepoT }, typeof panelParams> =
    (context: { repo: MoviesRepoT }) =>
    (decoder: typeof panelParams) =>
    (params: any) =>
        pipe(
            params,
            decoder.decode,
            E.mapLeft(
                () =>
                    `Search params must contain 'page', 'limit' and at least one of: 'decade', 'genre', 'region' or 'trending'`
            ),
            E.chainW((searchParams) =>
                pipe(
                    O.fromNullable(searchParams.decade), //decade
                    O.map(
                        getMoviesByDecade(context.repo)({
                            page: searchParams.page,
                            limit: searchParams.limit,
                        })
                    ),
                    O.alt(() =>
                        pipe(
                            O.fromNullable(searchParams.genre), //genre
                            O.map((genreId) => ({
                                uniqueId: genreId,
                                name: "",
                            })),
                            O.map(
                                getMoviesByGenre(context.repo)({
                                    page: searchParams.page,
                                    limit: searchParams.limit,
                                })
                            )
                        )
                    ),
                    O.alt(() =>
                        pipe(
                            O.fromNullable(searchParams.region), //region
                            O.chain((regionName) =>
                                O.fromNullable(
                                    regions.find(
                                        (region) => region.name == regionName
                                    )
                                )
                            ),
                            O.map(
                                getMoviesByRegion(context.repo)({
                                    page: searchParams.page,
                                    limit: searchParams.limit,
                                })
                            )
                        )
                    ),
                    O.alt(() =>
                        pipe(
                            O.fromNullable(searchParams.trending), //trending
                            O.map(
                                getTrendingMovies(context.repo)({
                                    page: searchParams.page,
                                    limit: searchParams.limit,
                                })
                            )
                        )
                    ),
                    E.fromOption(
                        () =>
                            `Search params must contain at least one of: decade, genre, region, trending`
                    )
                )
            ),
            E.map(
                flow(
                    TE.map((movies) =>
                        pipe(
                            movies,
                            A.reduce(
                                {
                                    headline: "Relevant Results",
                                    type: "list",
                                    template: {
                                        titleHeader: "headline",
                                        titleFooter: "subtitle",
                                        layout: "0,0,2,4",
                                        type: "separate",
                                    },
                                } as MsxContentRoot,
                                (content, movie) =>
                                    pipe(
                                        movie,
                                        (movie) => ({
                                            titleHeader: movie.title,
                                            titleFooter: moment
                                                .unix(movie.release)
                                                .format("YYYY"),
                                        }),
                                        addItemToContent(content),
                                        O.getOrElse(() => content)
                                    )
                            )
                        )
                    ),
                    TE.mapLeft((error) => errorPage(error))
                )
            ),
            E.getOrElse((errorMessage) => TE.left(errorPage(errorMessage))) //TE.TaskEither<MsxContentRoot, MsxContentRoot>
        )
