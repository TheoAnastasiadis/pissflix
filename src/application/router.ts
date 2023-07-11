import { pipe } from "fp-ts/lib/function"
import { commonControllersImpl, commonContextImpl } from "../data/common"
import { MovieControllersImpl, MovieContextImpl } from "../data/movies"
import { commonMatchers } from "../domain/common/controllers/matchers"
import { registerCommonRouter } from "../domain/common/router"
import { MovieMatchers } from "../domain/movies/controllers/matchers"
import { registerMovieRouter } from "../domain/movies/router"
import * as TE from "fp-ts/TaskEither"
import * as R from "fp-ts-routing"
import { errorPage } from "./handlers/error.handler"
import { Result } from "../core/sharedObjects/controller"

export const router = pipe(
    R.zero<TE.TaskEither<string, object>>().map(() => TE.left("zero")),
    registerCommonRouter(
        commonControllersImpl,
        commonMatchers,
        commonContextImpl
    ),
    registerMovieRouter(MovieControllersImpl, MovieMatchers, MovieContextImpl)
)

export const parseRoute: (route: string, router: R.Parser<Result>) => Result = (
    route,
    router
) => R.parse(router, R.Route.parse(route), errorPage)
