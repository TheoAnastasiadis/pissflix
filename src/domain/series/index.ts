import { pipe } from "fp-ts/lib/function"
import { SeriesContext } from "./controllers/context"
import { SeriesControllers } from "./controllers/controllers"
import { seriesMatchers } from "./controllers/matchers"
import { EndPoint } from "../../core/sharedObjects/instrumentation"
import { SeriesPaths } from "./controllers/paths"
import {
    genreParams,
    searchParams,
    seasonParams,
    seriesParams,
} from "./controllers/params"

export const seriesEndpoint = new EndPoint()
    .withPaths(SeriesPaths)
    .withParams([searchParams, seriesParams, seasonParams, genreParams])
    .registerMatchers(seriesMatchers)
    .withContext<SeriesContext>().registerControllers
