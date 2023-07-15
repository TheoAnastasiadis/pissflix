import { SeriesPaths } from "./paths"
import * as R from "fp-ts-routing"
import * as t from "io-ts"
import { genreParams, searchParams, seasonParams, seriesParams } from "./params"

export const SeriesMatchers = {
    menu: R.lit("menu").then(R.end),
    genres: R.lit("genres").then(R.end),
    genre: R.lit("genre").then(R.query(genreParams)).then(R.end),
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
} satisfies Record<SeriesPaths, R.Match<any>>

export type SeriesMatchersT = typeof SeriesMatchers

export const prependSeriesMatchers =
    (prefix: string) => (matchers: SeriesMatchersT) =>
        ({
            menu: R.lit(prefix).then(matchers.menu),
            genres: R.lit(prefix).then(matchers.genres),
            genre: R.lit(prefix).then(matchers.genre),
            search: R.lit(prefix).then(matchers.search),
            discover: R.lit(prefix).then(matchers.discover),
            series: R.lit(prefix).then(matchers.series),
            season: R.lit(prefix).then(matchers.season),
        } satisfies SeriesMatchersT)
