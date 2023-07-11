import { SeriesPaths } from "./paths"
import * as R from "fp-ts-routing"
import * as t from "io-ts"
import {
    episodeParams,
    panelParams,
    searchParams,
    seasonParams,
    seriesParams,
} from "./params"

export const SeriesMatchers = {
    menu: R.lit("menu").then(R.end),
    panel: R.lit("panel").then(R.query(panelParams)).then(R.end),
    genres: R.lit("genres").then(R.end),
    search: R.lit("search")
        .then(R.query(t.exact(searchParams)))
        .then(R.end),
    discover: R.lit("discover").then(R.end),
    series: R.lit("series")
        .then(R.query(t.exact(seriesParams)))
        .then(R.end),
    season: R.lit("season")
        .then(R.query(t.exact(seasonParams)))
        .then(R.end),
    episode: R.lit("episode")
        .then(R.query(t.exact(episodeParams)))
        .then(R.end),
} satisfies Record<SeriesPaths, R.Match<any>>

export type SeriesMatchersT = typeof SeriesMatchers

export const prependSeriesMatchers =
    (prefix: string) => (matchers: SeriesMatchersT) =>
        ({
            menu: R.lit(prefix).then(matchers.menu),
            panel: R.lit(prefix).then(matchers.panel),
            genres: R.lit(prefix).then(matchers.genres),
            search: R.lit(prefix).then(matchers.search),
            discover: R.lit(prefix).then(matchers.discover),
            series: R.lit(prefix).then(matchers.series),
            season: R.lit(prefix).then(matchers.season),
            episode: R.lit(prefix).then(matchers.episode),
        } satisfies SeriesMatchersT)
