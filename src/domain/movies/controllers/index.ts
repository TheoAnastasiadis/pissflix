import { Controller } from "../../../core/sharedObjects/controller"
import { MovieContext } from "./context"
import { MovieControllers } from "./controllers"
import { MovieMatchersT } from "./matchers"
import { MoviePaths } from "./paths"
import * as R from "fp-ts-routing"

export type MovieControllerRegistry = Record<
    MoviePaths,
    { controller: Controller<MovieContext, any>; matcher: R.Match<any> }
>

export const createMovieControllerRegistry =
    (controllers: MovieControllers) => (matchers: MovieMatchersT) =>
        Object.keys(controllers).map((key) => ({
            controller: controllers[key as keyof MovieControllers],
            matcher: matchers[key as keyof MovieControllers],
        }))
