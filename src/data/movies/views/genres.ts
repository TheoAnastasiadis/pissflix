import { pipe } from "fp-ts/lib/function"
import { View } from "../../../core/sharedObjects/view"
import { MoviesRepoT } from "../../../domain/movies/repos/movies.repo"
import { MoviePaths } from "../../../domain/movies/views"
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

export const genresView: View<{
    repo: MoviesRepoT
    paths: MoviePaths
}> =
    (context: { paths: MoviePaths; repo: MoviesRepoT }) =>
    (decoder: t.Type<{}>) =>
    (params: {}) =>
        pipe(
            TE.Do,
            TE.bind("genres", () =>
                pipe(
                    getGenres(context.repo),
                    TE.fromOption(() => `[!] No genres were fetched.`)
                )
            ),
            TE.bind("movies", ({ genres }) =>
                pipe(
                    genres,
                    RA.traverse(TE.ApplicativePar)(
                        getMoviesByGenre(context.repo)({ limit: 1, page: 0 })
                    )
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
                            `${context.paths.panel}?${new URLSearchParams({
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
        )
