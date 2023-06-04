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
import regionsContent from "./content/regions"

//helpers
const regionNames = Object.keys(regions) as (keyof typeof regions)[]
const contentRoot: MsxContentRoot = {
    headline: "Discover Movies By Genre",
    type: "list",
}

export const regionsView: Controller<MovieContext> = {
    _tag: "view",
    render: (context) => (params) =>
        pipe(
            TE.Do,
            TE.bind("regionNames", () => TE.right(regionNames)),
            TE.bind("movies", ({ regionNames }) =>
                pipe(
                    regionNames,
                    A.traverse(TE.ApplicativePar)(
                        getMoviesByRegion(context.moviesRepo)({
                            limit: 5,
                            page: 0,
                        })
                    )
                )
            ),
            TE.map(({ regionNames, movies }) =>
                pipe(
                    regionNames,
                    A.mapWithIndex((i, name) =>
                        resultsPage(
                            `Movies from ${name}`,
                            regionsContent["en"][name].title,
                            regionsContent["en"][name].subtitle,
                            movies[i],
                            context.matchers.panel.formatter
                                .run(R.Route.empty, {
                                    region: name,
                                    page: "0",
                                    limit: "20",
                                })
                                .toString(),
                            context.matchers
                        )
                    ),
                    A.reduce(contentRoot, (content, page) =>
                        addPageToContent(content)(page)
                    )
                )
            )
        ),
}
