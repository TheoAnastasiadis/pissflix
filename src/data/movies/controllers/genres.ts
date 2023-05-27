import { pipe } from "fp-ts/lib/function"
import { Controller } from "../../../core/sharedObjects/view"
import { MoviesRepoT } from "../../../domain/movies/repos/movies.repo"
import { MoviePaths } from "../../../domain/movies/controllers"
import { errorPage } from "./helpers/errorPage"
import { resultsPage } from "./helpers/resultsPage"
import * as t from "io-ts"
import * as TE from "fp-ts/TaskEither"
import * as A from "fp-ts/Array"
import * as RA from "fp-ts/ReadonlyArray"
import {
    MsxContentRoot,
    addPageToContent,
} from "../../../core/msxUI/contentObjects"
import { getGenres } from "../../../domain/movies/useCases/getGenres"
import { getMoviesByGenre } from "../../../domain/movies/useCases/getMoviesByGenre"
import { DebridProviderRepo } from "../../../domain/common/repos/debridProvider.repo"
import { TorrentRepo } from "../../../domain/common/repos/torrent.repo"

export const genresView: Controller<
    MoviePaths["genres"],
    {
        moviesRepo: MoviesRepoT
        torrentRepo: TorrentRepo
        debridRepo: DebridProviderRepo
        relativePaths: MoviePaths
        absolutePaths: MoviePaths
    }
> = {
    _tag: "view",
    _path: "/movies/genres",
    render: (context) => (decoder: t.Type<{}>) => (params: {}) =>
        pipe(
            TE.Do,
            TE.bind("genres", () =>
                pipe(
                    getGenres(context.moviesRepo),
                    TE.fromOption(() => `[!] No genres were fetched.`)
                )
            ),
            TE.bind("movies", ({ genres }) =>
                pipe(
                    genres,
                    A.map(
                        getMoviesByGenre(context.moviesRepo)({
                            page: 0,
                            limit: 5,
                        })
                    ),
                    A.sequence(TE.ApplicativePar)
                )
            ),
            TE.map(({ genres, movies }) =>
                pipe(
                    genres,
                    A.mapWithIndex((i, genre) =>
                        resultsPage(
                            `Movies with ${genre.name}`,
                            `Selected just for you`,
                            movies[i],
                            `${
                                context.absolutePaths.panel
                            }?${new URLSearchParams({
                                genre: String(genre.uniqueId),
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
