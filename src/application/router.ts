import { pipe } from "fp-ts/lib/function"
import * as TE from "fp-ts/TaskEither"
import * as R from "fp-ts-routing"
import { errorPage } from "./handlers/error.handler"
import { Result } from "../core/sharedObjects/controller"
import { moviesRouter } from "../data/movies"
import { seriesRouter } from "../data/series"
import { commonRouter } from "../data/common"
import { pornRouter } from "../data/porn"

const registerCommonRouter = commonRouter.registerWith
const registerMovieRouter = moviesRouter.registerWith
const registerSeriesRouter = seriesRouter.registerWith
const registerPornRouter = pornRouter.registerWith

export const router = pipe(
    R.zero<TE.TaskEither<string, object>>().map(() => TE.left("zero")),
    registerCommonRouter,
    registerMovieRouter,
    registerSeriesRouter,
    registerPornRouter
)

export const parseRoute: (route: string, router: R.Parser<Result>) => Result = (
    route,
    router
) => R.parse(router, R.Route.parse(route), errorPage)
