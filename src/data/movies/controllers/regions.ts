import { Controller } from "../../../core/sharedObjects/controller"
import * as R from "fp-ts-routing"
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
import { MovieContext } from "../../../domain/movies/controllers/context"

export const regionsView: Controller<MovieContext> = {
    _tag: "view",
    render: (context, topLevelRoute: R.Route) => (params) =>
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
                            context.matchers.panel.formatter
                                .run(R.Route.empty, {
                                    region: region.name,
                                    page: "0",
                                    limit: "20",
                                })
                                .toString()
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
