import { pipe } from "fp-ts/lib/function"
import { CommonContext } from "./controllers/context"
import { commonControllers } from "./controllers/controllers"
import { commonmatcherT, prependCommonMatchers } from "./controllers/matchers"
import * as R from "fp-ts-routing"
import { createCommonControllerRegistry } from "./controllers"
import * as A from "fp-ts/Array"

const COMMON_ROUTE = "msx"

export const registerCommonRouter =
    (
        controllers: commonControllers,
        matchers: commonmatcherT,
        context: CommonContext
    ) =>
    (applicationRouter: R.Parser<any>) =>
        pipe(
            matchers,
            prependCommonMatchers(COMMON_ROUTE),
            createCommonControllerRegistry(controllers),
            A.map(({ controller, matcher }) =>
                matcher.parser.map((params) => ({
                    result: controller.render(context)(params as any),
                    _tag: controller._tag,
                }))
            ), //map matchers to controllers
            A.reduce(applicationRouter, (router, parser) => router.alt(parser)) //register alternative paths to router
        )
