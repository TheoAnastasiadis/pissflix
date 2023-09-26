import { movieMatchers } from "./controllers/matchers"
import { MovieContext } from "./controllers/context"
import { EndPoint } from "../../core/sharedObjects/instrumentation"
import { moviePaths } from "./controllers/paths"
import {
    infoParams,
    panelParams,
    searchParams,
    streamParams,
    watchParams,
} from "./controllers/params"

const MOVIES_ROUTE = "movies"

export const MovieEndpoint = new EndPoint()
    .withPaths(moviePaths)
    .withParams([
        panelParams,
        infoParams,
        searchParams,
        watchParams,
        streamParams,
    ])
    .registerMatchers(movieMatchers)
    .withContext<MovieContext>().registerControllers
