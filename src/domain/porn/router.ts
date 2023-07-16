import { pipe } from "fp-ts/lib/function"
import { createPControllerRegistry } from "./controllers"
import { PContext } from "./controllers/context"
import { PControllers } from "./controllers/controllers"
import { PMatchersT, prependPMatchers } from "./controllers/matchers"
import * as R from "fp-ts-routing"
import * as A from "fp-ts/Array"

const P_ROUTE = "porn"

export const registerMovieRouter =
    (controllers: PControllers, matchers: PMatchersT, context: PContext) =>
    (applicationRouter: R.Parser<any>) =>
        pipe(
            matchers,
            prependPMatchers(P_ROUTE),
            createPControllerRegistry(controllers),
            A.map(({ controller, matcher }) =>
                matcher.parser.map((params) => ({
                    result: controller.render(context)(params as any),
                    _tag: controller._tag,
                }))
            ), //map matchers to controllers
            A.reduce(applicationRouter, (router, parser) => router.alt(parser)) //register alternative paths to router
        )
