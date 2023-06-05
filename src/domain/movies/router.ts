import * as R from "fp-ts-routing"
import * as A from "fp-ts/Array"
import { pipe } from "fp-ts/lib/function"
import { MovieControllers } from "./controllers/controllers"
import { MovieMatchersT, prependMovieMatchers } from "./controllers/matchers"
import { MovieContext } from "./controllers/context"
import { createMovieControllerRegistry } from "./controllers"

const MOVIES_ROUTE = "movies"

export const registerMovieRouter =
    (
        controllers: MovieControllers,
        matchers: MovieMatchersT,
        context: MovieContext
    ) =>
    (applicationRouter: R.Parser<any>) =>
        pipe(
            matchers,
            prependMovieMatchers(MOVIES_ROUTE),
            createMovieControllerRegistry(controllers),
            A.map(({ controller, matcher }) =>
                matcher.parser.map((params) => ({
                    result: controller.render(context)(params as any),
                    _tag: controller._tag,
                }))
            ), //map matchers to controllers
            A.reduce(applicationRouter, (router, parser) => router.alt(parser)) //register alternative paths to router
        )
