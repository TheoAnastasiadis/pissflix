import { pipe } from "fp-ts/lib/function"
import { Controller } from "../../../core/sharedObjects/controller"
import { resultsPage } from "./helpers/resultsPage"
import * as TE from "fp-ts/TaskEither"
import * as A from "fp-ts/Array"
import * as R from "fp-ts-routing"
import {
    MsxContentRoot,
    addPageToContent,
} from "../../../core/msxUI/contentObjects"
import { getGenres } from "../../../domain/movies/useCases/getGenres"
import { getMoviesByGenre } from "../../../domain/movies/useCases/getMoviesByGenre"
import { MovieContext } from "../../../domain/movies/controllers/context"
import genresContent from "./content/genres"
import applicationConfig from "../../../core/config/app.config"

const baseUrl = applicationConfig.externalURL

export const genresView: Controller<MovieContext> = {
    _tag: "view",
    render: (context, topeLevelRoute) => (params: {}) =>
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
                            genre.name,
                            genresContent["en"][
                                genre.name as keyof (typeof genresContent)["en"]
                            ].title,
                            genresContent["en"][
                                genre.name as keyof (typeof genresContent)["en"]
                            ].subtitle,
                            movies[i],
                            baseUrl +
                                context.matchers.panel.formatter
                                    .run(R.Route.empty, {
                                        genre: String(genre.uniqueId),
                                        page: "0",
                                        limit: "20",
                                    })
                                    .toString(),
                            context.matchers
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
            )
        ),
}
