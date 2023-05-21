import { pipe } from "fp-ts/lib/function"
import { View } from "../../../core/sharedObjects/view"
import { MoviesRepoT } from "../../../domain/movies/repos/movies.repo"
import { MoviePaths } from "../../../domain/movies/views"
import * as t from "io-ts"
import * as TE from "fp-ts/TaskEither"
import { resultsPage } from "./helpers/resultsPage"
import { errorPage } from "./helpers/errorPage"
import { getTrendingMovies } from "../../../domain/movies/useCases/getTrendingMovies"

export const discoverView: View<{
    repo: MoviesRepoT
    paths: MoviePaths
}> =
    (context: { paths: MoviePaths; repo: MoviesRepoT }) =>
    (decoder: t.Type<{}>) =>
    (params: {}) =>
        pipe(
            TE.Do,
            TE.bind("moviesOfTheDay", () =>
                getTrendingMovies(context.repo)({ limit: 5, page: 0 })("day")
            ),
            TE.bind("moviesOfTheWeek", () =>
                getTrendingMovies(context.repo)({ limit: 5, page: 0 })("week")
            ),
            TE.map(({ moviesOfTheDay, moviesOfTheWeek }) => ({
                headline: "Discover Popular Content",
                type: "list",
                pages: [
                    resultsPage(
                        "Movies Trending Today",
                        "Most views in the last 24 hours",
                        moviesOfTheDay,
                        `${context.paths.panel}?${new URLSearchParams({
                            trending: "day",
                        }).toString()}`
                    ),
                    resultsPage(
                        "Movies Trending This Week",
                        "Popular movies of the last few days",
                        moviesOfTheWeek,
                        `${context.paths.panel}?${new URLSearchParams({
                            trending: "week",
                        }).toString()}`
                    ),
                ],
            })),
            TE.mapLeft(errorPage)
        )
