import { pipe } from "fp-ts/lib/function"
import { SeriesContext } from "./controllers/context"
import { SeriesControllers } from "./controllers/controllers"
import { SeriesMatchersT, prependSeriesMatchers } from "./controllers/matchers"
import * as R from "fp-ts-routing"
import * as A from "fp-ts/Array"
import { createSeriesControllerRegistry } from "./controllers"

const SERIES_ROUTE = "tv"

export const registerSeriesRouter =
    (
        controllers: SeriesControllers,
        matchers: SeriesMatchersT,
        context: SeriesContext
    ) =>
    (applicationRouter: R.Parser<any>) =>
        pipe(
            matchers,
            prependSeriesMatchers(SERIES_ROUTE),
            createSeriesControllerRegistry(controllers),
            A.map(({ controller, matcher }) =>
                matcher.parser.map((params) => ({
                    result: controller.render(context)(params as any),
                    _tag: controller._tag,
                }))
            ), //map matchers to controllers
            A.reduce(applicationRouter, (router, parser) => router.alt(parser)) //register alternative paths to router
        )
