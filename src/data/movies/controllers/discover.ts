import { pipe } from "fp-ts/lib/function"
import { Controller } from "../../../core/sharedObjects/controller"
import * as TE from "fp-ts/TaskEither"
import * as R from "fp-ts-routing"
import { resultsPage } from "./helpers/resultsPage"
import { getTrendingMovies } from "../../../domain/movies/useCases/getTrendingMovies"
import { MovieContext } from "../../../domain/movies/controllers/context"
import discoverContent from "./content/discover"
import applicationConfig from "../../../core/config/app.config"

const baseUrl = applicationConfig.externalURL

export const discoverView: Controller<MovieContext> = {
    _tag: "view",
    render: (context, topeLevelRoute: R.Route) => (params: {}) =>
        pipe(
            TE.Do,
            TE.bind("moviesOfTheDay", () =>
                getTrendingMovies(context.moviesRepo)({ limit: 5, page: 0 })(
                    "day"
                )
            ),
            TE.bind("moviesOfTheWeek", () =>
                getTrendingMovies(context.moviesRepo)({ limit: 5, page: 0 })(
                    "week"
                )
            ),
            TE.map(({ moviesOfTheDay, moviesOfTheWeek }) => ({
                headline: "Discover Popular Content",
                type: "list",
                pages: [
                    resultsPage(
                        discoverContent["en"]["day"].title,
                        discoverContent["en"]["day"].title,
                        discoverContent["en"]["day"].subtitle,
                        moviesOfTheDay,
                        baseUrl +
                            context.matchers.panel.formatter
                                .run(R.Route.empty, {
                                    trending: "day",
                                    page: "0",
                                    limit: "20",
                                })
                                .toString(),
                        context.matchers
                    ),
                    resultsPage(
                        discoverContent["en"]["week"].title,
                        discoverContent["en"]["week"].title,
                        discoverContent["en"]["week"].subtitle,
                        moviesOfTheWeek,
                        baseUrl +
                            context.matchers.panel.formatter
                                .run(R.Route.empty, {
                                    trending: "week",
                                    page: "0",
                                    limit: "20",
                                })
                                .toString(),
                        context.matchers
                    ),
                ],
            }))
        ),
}
