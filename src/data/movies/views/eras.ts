import { pipe } from "fp-ts/lib/function"
import { View } from "../../../core/sharedObjects/view"
import { MoviesRepoT } from "../../../domain/movies/repos/movies.repo"
import { MoviePaths } from "../../../domain/movies/views"
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

export const erasView: View<{ repo: MoviesRepoT; paths: MoviePaths }> =
    (context: { paths: MoviePaths; repo: MoviesRepoT }) =>
    (decoder: t.Type<{}>) =>
    (params: {}) =>
        pipe(
            TE.Do,
            TE.bind("decades", () =>
                pipe(
                    Array(10),
                    A.mapWithIndex((i, a) => 1920 + i * 10),
                    (decades) => TE.right(decades)
                )
            ),
            TE.bind("movies", ({ decades }) =>
                pipe(
                    decades,
                    A.traverse(TE.ApplicativePar)(
                        getMoviesByDecade(context.repo)({ page: 0, limit: 1 })
                    )
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
                            `${context.paths.panel}?${new URLSearchParams({decade: String(decade)}).toString()}`
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
        )
