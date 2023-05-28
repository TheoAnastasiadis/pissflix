import { pipe } from "fp-ts/lib/function"
import { Controller } from "../../../core/sharedObjects/controller"
import { MoviesRepoT } from "../../../domain/movies/repos/movies.repo"
import { MoviePaths } from "../../../domain/movies/controllers"
import * as t from "io-ts"
import * as A from "fp-ts/Array"
import * as TE from "fp-ts/TaskEither"
import { getMoviesByDecade } from "../../../domain/movies/useCases/getMoviesByDecade"
import {
    MsxContentRoot,
    addPageToContent,
} from "../../../core/msxUI/contentObjects"
import { errorPage } from "./helpers/errorPage"
import { resultsPage } from "./helpers/resultsPage"
import { DebridProviderRepo } from "../../../domain/common/repos/debridProvider.repo"
import { TorrentRepo } from "../../../domain/common/repos/torrent.repo"

export const erasView: Controller<
    MoviePaths["eras"],
    {
        moviesRepo: MoviesRepoT
        torrentRepo: TorrentRepo
        debridRepo: DebridProviderRepo
        relativePaths: MoviePaths
        absolutePaths: MoviePaths
    }
> = {
    _tag: "view",
    _path: `/movies/eras`,
    _decoder: t.type({}),
    render: (context) => (decoder: t.Type<{}>) => (params: {}) =>
        pipe(
            TE.Do,
            TE.bind("decades", () =>
                pipe(
                    Array(10)
                        .fill(1920)
                        .map((v, i) => Number(v) + i * 10),
                    (decades) => TE.right(decades)
                )
            ),
            TE.bind("movies", ({ decades }) =>
                pipe(
                    decades,
                    A.map(
                        getMoviesByDecade(context.moviesRepo)({
                            page: 0,
                            limit: 5,
                        })
                    ),
                    A.sequence(TE.ApplicativePar)
                )
            ),
            TE.map(({ decades, movies }) =>
                pipe(
                    decades,
                    A.mapWithIndex((i, decade) =>
                        resultsPage(
                            `Movies from the ${decade}s`,
                            `Selected just for you`,
                            movies[i],
                            `${
                                context.absolutePaths.panel
                            }?${new URLSearchParams({
                                decade: String(decade),
                            }).toString()}`
                        )
                    ),
                    A.reduce(
                        {
                            headline: "Discover Movies By Era",
                            type: "list",
                        } as MsxContentRoot,
                        (content, page) => addPageToContent(content)(page)
                    )
                )
            ),
            TE.mapLeft(errorPage)
        ),
}
