import { Controller } from "../../../core/sharedObjects/controller"
import { panelParams, searchParams, infoParams, watchParams } from "./params"
import * as t from "io-ts"
import * as R from "fp-ts-routing"
import { MovieContext } from "./context"
import { MoviePaths } from "./paths"

export type MovieControllers = {
    menu: Controller<MovieContext>
    panel: Controller<MovieContext, t.TypeOf<typeof panelParams>>
    genres: Controller<MovieContext>
    eras: Controller<MovieContext>
    regions: Controller<MovieContext>
    search: Controller<MovieContext, t.TypeOf<typeof searchParams>>
    info: Controller<MovieContext, t.TypeOf<typeof infoParams>>
    discover: Controller<MovieContext>
    watch: Controller<MovieContext, t.TypeOf<typeof watchParams>>
} & Record<MoviePaths, Controller<MovieContext, any>>
