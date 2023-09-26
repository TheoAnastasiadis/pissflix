import * as t from "io-ts"
import * as R from "fp-ts-routing"
import {
    panelParams,
    searchParams,
    infoParams,
    watchParams,
    streamParams,
} from "./params"
import { moviePaths } from "./paths"
import appConfig from "../../../core/config/app.config"

//Matchers
export const movieMatchers: Record<
    (typeof moviePaths)[number],
    R.Match<any>
> = {
    menu: R.lit(appConfig.moviesPath).then(R.lit("menu")).then(R.end),
    panel: R.lit(appConfig.moviesPath)
        .then(R.lit("panel"))
        .then(R.query(panelParams))
        .then(R.end),
    genres: R.lit(appConfig.moviesPath).then(R.lit("genres")).then(R.end),
    eras: R.lit(appConfig.moviesPath).then(R.lit("eras")).then(R.end),
    regions: R.lit(appConfig.moviesPath).then(R.lit("regions")).then(R.end),
    search: R.lit(appConfig.moviesPath)
        .then(R.lit("search"))
        .then(R.query(t.exact(searchParams)))
        .then(R.end),
    info: R.lit(appConfig.moviesPath)
        .then(R.lit("info"))
        .then(R.query(t.exact(infoParams)))
        .then(R.end),
    discover: R.lit(appConfig.moviesPath).then(R.lit("discover")).then(R.end),
    watch: R.lit(appConfig.moviesPath)
        .then(R.lit("watch"))
        .then(R.query(t.exact(watchParams))),
    stream: R.lit(appConfig.moviesPath)
        .then(R.lit("stream"))
        .then(R.query(t.exact(streamParams))),
}
