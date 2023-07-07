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
    MsxContentItem,
    MsxContentRoot,
    addItemToContent,
} from "../../../core/msxUI/contentObjects"
import { panelParams } from "../../../domain/movies/controllers/params"
import { moviePoster } from "./helpers/moviePoster"
import applicationConfig from "../../../core/config/app.config"
import appConfig from "../../../core/config/app.config"

const baseUrl = applicationConfig.externalURL

//helpers
type pagination = { page: string; limit: string }
const contentRoot: MsxContentRoot = {
    headline: "Relevant Results",
    type: "list",
    flag: "PANEL",
    template: {
        titleHeader: "headline",
        titleFooter: "subtitle",
        layout: "0,0,2,4",
        type: "separate",
    },
}

export const panelView: Controller<
    MovieContext,
    t.TypeOf<typeof panelParams>
> = {
    _tag: "view",
    render: (context) => (params) =>
        pipe(
            O.fromNullable(
                (
                    params as Extract<
                        { decade: string } & pagination,
                        typeof params
                    >
                ).decade
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
                            params as Extract<
                                { genre: string } & pagination,
                                typeof params
                            >
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
                            params as Extract<
                                { region: keyof typeof regions } & pagination,
                                typeof params
                            >
                        ).region
                    ), //region
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
                            params as Extract<
                                { trending: "day" | "week" } & pagination,
                                typeof params
                            >
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
                        (movies) => movies.slice(1), //add all but first
                        A.reduce(contentRoot, (content, movie) =>
                            pipe(
                                moviePoster(
                                    movie,
                                    baseUrl +
                                        context.matchers.info.formatter
                                            .run(R.Route.empty, {
                                                id: String(movie.id),
                                            })
                                            .toString()
                                ),
                                addItemToContent(content)
                            )
                        ),
                        (content) => ({
                            //add first
                            ...content,
                            items: [
                                {
                                    ...moviePoster(
                                        movies[0],
                                        baseUrl +
                                            context.matchers.info.formatter
                                                .run(R.Route.empty, {
                                                    id: String(movies[0].id),
                                                })
                                                .toString()
                                    ),
                                    focus: true, //so that the panel scrolls back up
                                } satisfies MsxContentItem,
                                ...(content.items as Iterable<MsxContentItem>),
                            ],
                        }),
                        (content) => ({
                            //append next page
                            ...content,
                            items: [
                                ...(content.items as Iterable<MsxContentItem>),
                                {
                                    enumerate: false,
                                    titleFooter: "",
                                    titleHeader: "",
                                    icon: "arrow-right",
                                    action: `replace:panel:PANEL:${
                                        appConfig.externalURL
                                    }${context.matchers.panel.formatter
                                        .run(R.Route.empty, {
                                            ...params,
                                            page: String(
                                                Number(params.page) + 1
                                            ),
                                        })
                                        .toString()}`,
                                } satisfies MsxContentItem,
                            ],
                        }),
                        (content) => ({
                            //prepend previous page
                            ...content,
                            items:
                                Number(params.page) > 0
                                    ? [
                                          {
                                              enumerate: false,
                                              focus: true,
                                              titleFooter: "",
                                              titleHeader: "",
                                              icon: "arrow-left",
                                              action: `replace:panel:PANEL:${
                                                  appConfig.externalURL
                                              }${context.matchers.panel.formatter
                                                  .run(R.Route.empty, {
                                                      ...params,
                                                      page: String(
                                                          Number(params.page) -
                                                              1
                                                      ),
                                                  })
                                                  .toString()}`,
                                          } satisfies MsxContentItem,
                                          ...(content.items as Iterable<MsxContentItem>),
                                      ]
                                    : content.items,
                        })
                    )
                )
            ),
            O.getOrElse(() => TE.left("Please provide valid query params."))
        ),
}
