import { Controller } from "../../../core/sharedObjects/controller"
import { SeriesContext } from "./context"
import { SeriesControllers } from "./controllers"
import { SeriesMatchersT } from "./matchers"
import { SeriesPaths } from "./paths"
import * as R from "fp-ts-routing"

export type SeriesControllerRegistry = Record<
    SeriesPaths,
    { controller: Controller<SeriesContext, any>; matcher: R.Match<any> }
>

export const createSeriesControllerRegistry =
    (controllers: SeriesControllers) => (matchers: SeriesMatchersT) =>
        Object.keys(controllers).map((key) => ({
            controller: controllers[key as keyof SeriesControllers],
            matcher: matchers[key as keyof SeriesMatchersT],
        }))
