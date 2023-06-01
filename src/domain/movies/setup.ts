import * as R from "fp-ts-routing"
import * as A from "fp-ts/Array"
import { pipe } from "fp-ts/lib/function"
import { MovieControllers } from "./controllers/controllers"
import { MovieMatchersT } from "./controllers/matchers"
import { MovieContext } from "./controllers/context"
import { createMovieControllerRegistry } from "./controllers"
import { Controller } from "../../core/sharedObjects/controller"
import { params } from "@testdeck/mocha"

const MOVIES_ROUTE = "movies"

export const MovieRouter =
    (
        controllers: MovieControllers,
        matchers: MovieMatchersT,
        context: MovieContext
    ) =>
    (applicationRouter: R.Parser<any>) =>
        pipe(
            createMovieControllerRegistry(controllers)(matchers),
            A.map(({ controller, matcher }) => ({
                controller,
                matcher: R.lit(MOVIES_ROUTE).then(matcher as R.Match<any>),
            })), //prepend matchers with "/movies",
            A.map(({ controller, matcher }) =>
                matcher.parser.map((params) => ({
                    result: controller.render(context)(params),
                    _tag: controller._tag,
                }))
            ), //map matchers to controllers
            A.reduce(applicationRouter, (router, parser) => router.alt(parser)) //register alternative paths to router
        )
