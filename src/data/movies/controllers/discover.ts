import { pipe } from "fp-ts/lib/function"
import { Controller } from "../../../core/sharedObjects/view"
import { MoviesRepoT } from "../../../domain/movies/repos/movies.repo"
import { MoviePaths } from "../../../domain/movies/controllers"
import * as t from "io-ts"
import * as TE from "fp-ts/TaskEither"
import { resultsPage } from "./helpers/resultsPage"
import { errorPage } from "./helpers/errorPage"
import { getTrendingMovies } from "../../../domain/movies/useCases/getTrendingMovies"
import { DebridProviderRepo } from "../../../domain/common/repos/debridProvider.repo"
import { TorrentRepo } from "../../../domain/common/repos/torrent.repo"

export const discoverView: Controller<
    MoviePaths["discover"],
    {
        moviesRepo: MoviesRepoT
        torrentRepo: TorrentRepo
        debridRepo: DebridProviderRepo
        relativePaths: MoviePaths
        absolutePaths: MoviePaths
    }
> = {
    _tag: "view",
    _path: `/movies/discover`,
    render: (context) => (decoder: t.Type<{}>) => (params: {}) =>
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
                        "Movies Trending Today",
                        "Most views in the last 24 hours",
                        moviesOfTheDay,
                        `${context.absolutePaths.panel}?${new URLSearchParams({
                            trending: "day",
                        }).toString()}`
                    ),
                    resultsPage(
                        "Movies Trending This Week",
                        "Popular movies of the last few days",
                        moviesOfTheWeek,
                        `${context.absolutePaths.panel}?${new URLSearchParams({
                            trending: "week",
                        }).toString()}`
                    ),
                ],
            })),
            TE.mapLeft(errorPage)
        ),
}
