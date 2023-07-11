import { Controller, Redirection } from "../../../core/sharedObjects/controller"
import { SeriesContext } from "./context"
import {
    episodeParams,
    panelParams,
    searchParams,
    seasonParams,
    seriesParams,
} from "./params"
import { SeriesPaths } from "./paths"
import * as t from "io-ts"

export type SeriesControllers = {
    menu: Controller<SeriesContext>
    panel: Controller<SeriesContext, t.TypeOf<typeof panelParams>>
    genres: Controller<SeriesContext>
    search: Controller<SeriesContext, t.TypeOf<typeof searchParams>>
    discover: Controller<SeriesContext>
    series: Controller<SeriesContext, t.TypeOf<typeof seriesParams>>
    season: Controller<SeriesContext, t.TypeOf<typeof seasonParams>>
    episode: Controller<SeriesContext, t.TypeOf<typeof episodeParams>>
} & Record<
    SeriesPaths,
    Controller<SeriesContext, any> | Redirection<SeriesContext, any>
>
