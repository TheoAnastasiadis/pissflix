import * as R from "fp-ts-routing"
import * as t from "io-ts"
import { genreParams, searchParams, seasonParams, seriesParams } from "./params"
import appConfig from "../../../core/config/app.config"

export const seriesMatchers = {
    menu: R.lit(appConfig.seriesPath).then(R.lit("menu")).then(R.end),
    genres: R.lit(appConfig.seriesPath).then(R.lit("genres")).then(R.end),
    genre: R.lit(appConfig.seriesPath)
        .then(R.lit("genre"))
        .then(R.query(genreParams))
        .then(R.end),
    search: R.lit(appConfig.seriesPath)
        .then(R.lit("search"))
        .then(R.query(t.exact(searchParams)))
        .then(R.end),
    discover: R.lit(appConfig.seriesPath).then(R.lit("discover")).then(R.end),
    series: R.lit(appConfig.seriesPath)
        .then(R.lit("series"))
        .then(R.query(t.exact(seriesParams)))
        .then(R.end),
    season: R.lit(appConfig.seriesPath)
        .then(R.lit("season"))
        .then(R.query(t.exact(seasonParams)))
        .then(R.end),
}
