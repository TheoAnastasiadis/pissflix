import { pipe } from "fp-ts/lib/function"
import { Controller } from "../../../core/sharedObjects/controller"
import { MovieContext } from "../../../domain/movies/controllers/context"
import * as O from "fp-ts/Option"
import * as TE from "fp-ts/TaskEither"
import * as A from "fp-ts/Array"
import * as t from "io-ts"
import * as R from "fp-ts-routing"
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
import { panelParams } from "../../../domain/movies/controllers/params"

export const panelView: Controller<
    MovieContext,
    t.TypeOf<typeof panelParams>
> = {
    _tag: "view",
    render: (context, topLevelRoute) => (params) =>
        pipe(
            O.fromNullable(
                (params as { page: string; limit: string; decade: string })
                    .decade
            ), //decade
            O.map((decade) => Number(decade)),
            O.map(
                getMoviesByDecade(context.moviesRepo)({
                    page: Number(params.page),
                    limit: Number(params.limit),
                })
            ),
            O.alt(() =>
                pipe(
                    O.fromNullable(
                        (
                            params as {
                                page: string
                                limit: string
                                genre: string
                            }
                        ).genre
                    ), //genre
                    O.map((genreId) => ({
                        uniqueId: Number(genreId),
                        name: "",
                    })),
                    O.map(
                        getMoviesByGenre(context.moviesRepo)({
                            page: Number(params.page),
                            limit: Number(params.limit),
                        })
                    )
                )
            ),
            O.alt(() =>
                pipe(
                    O.fromNullable(
                        (
                            params as {
                                page: string
                                limit: string
                                region: string
                            }
                        ).region
                    ), //region
                    O.chain((regionName) =>
                        O.fromNullable(
                            regions.find((region) => region.name == regionName)
                        )
                    ),
                    O.map(
                        getMoviesByRegion(context.moviesRepo)({
                            page: Number(params.page),
                            limit: Number(params.limit),
                        })
                    )
                )
            ),
            O.alt(() =>
                pipe(
                    O.fromNullable(
                        (
                            params as {
                                page: string
                                limit: string
                                trending: "day" | "week"
                            }
                        ).trending
                    ), //trending
                    O.map(
                        getTrendingMovies(context.moviesRepo)({
                            page: Number(params.page),
                            limit: Number(params.limit),
                        })
                    )
                )
            ),
            O.map(
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
                                        action: `content:${context.matchers.info.formatter
                                            .run(R.Route.empty, {
                                                id: String(movie.id),
                                            })
                                            .toString()}` as `content:${string}`,
                                    }),
                                    addItemToContent(content)
                                )
                        )
                    )
                )
            ),
            O.getOrElse(() => TE.left("Please provide valid query params."))
        ),
}
