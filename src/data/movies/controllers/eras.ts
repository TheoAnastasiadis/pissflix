import { pipe } from "fp-ts/lib/function"
import { Controller } from "../../../core/sharedObjects/controller"
import * as A from "fp-ts/Array"
import * as TE from "fp-ts/TaskEither"
import * as R from "fp-ts-routing"
import { getMoviesByDecade } from "../../../domain/movies/useCases/getMoviesByDecade"
import {
    MsxContentRoot,
    addPageToContent,
} from "../../../core/msxUI/contentObjects"
import { resultsPage } from "./helpers/resultsPage"
import { MovieContext } from "../../../domain/movies/controllers/context"
import erasContent from "./content/eras.content"

export const erasView: Controller<MovieContext> = {
    _tag: "view",
    render: (context, topeLevelRoute) => (params: {}) =>
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
                            erasContent['en'][String(decade) as keyof typeof erasContent["en"]].title,
                            erasContent['en'][String(decade) as keyof typeof erasContent["en"]].subtitle,
                            movies[i],
                            context.matchers.panel.formatter
                                .run(R.Route.empty, {
                                    decade: String(decade),
                                    page: "0",
                                    limit: "20",
                                })
                                .toString(),
                            context.matchers
                        )
                    ),
                    A.reduce(
                        {
                            headline: "Eras of cinema",
                            type: "list",
                        } as MsxContentRoot,
                        (content, page) => addPageToContent(content)(page)
                    )
                )
            )
        ),
}
