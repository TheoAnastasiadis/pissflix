import { Controller } from "../../../core/sharedObjects/controller"
import { MoviesRepoT } from "../../../domain/movies/repos/movies.repo"
import { MoviePaths } from "../../../domain/movies/controllers"
import * as t from "io-ts"
import * as TE from "fp-ts/TaskEither"
import * as A from "fp-ts/Array"
import { regions } from "../../../core/sharedObjects/regions"
import { pipe } from "fp-ts/lib/function"
import { getMoviesByRegion } from "../../../domain/movies/useCases/getMoviesByRegion"
import { resultsPage } from "./helpers/resultsPage"
import {
    MsxContentRoot,
    addPageToContent,
} from "../../../core/msxUI/contentObjects"
import { errorPage } from "./helpers/errorPage"
import { DebridProviderRepo } from "../../../domain/common/repos/debridProvider.repo"
import { TorrentRepo } from "../../../domain/common/repos/torrent.repo"

export const regionsView: Controller<
    MoviePaths["regions"],
    {
        moviesRepo: MoviesRepoT
        torrentRepo: TorrentRepo
        debridRepo: DebridProviderRepo
        relativePaths: MoviePaths
        absolutePaths: MoviePaths
    }
> = {
    _tag: "view",
    _path: `/movies/regions`,
    _decoder: t.type({}),
    render: (context) => (decoder: t.Type<{}>) => (params: {}) =>
        pipe(
            TE.Do,
            TE.bind("regions", () => TE.right(regions)),
            TE.bind("movies", ({ regions }) =>
                pipe(
                    regions,
                    A.traverse(TE.ApplicativePar)(
                        getMoviesByRegion(context.moviesRepo)({
                            limit: 5,
                            page: 0,
                        })
                    )
                )
            ),
            TE.map(({ regions, movies }) =>
                pipe(
                    regions,
                    A.mapWithIndex((i, region) =>
                        resultsPage(
                            `Movies from ${region.name}`,
                            `Selected just for you`,
                            movies[i],
                            `${
                                context.absolutePaths.panel
                            }?${new URLSearchParams({
                                region: region.name,
                            }).toString()}`
                        )
                    ),
                    A.reduce(
                        {
                            headline: "Discover Movies By Genre",
                            type: "list",
                        } as MsxContentRoot,
                        (content, page) => addPageToContent(content)(page)
                    )
                )
            ),
            TE.mapLeft(errorPage)
        ),
}
