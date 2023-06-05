import * as t from "io-ts"
import * as R from "fp-ts-routing"
import {
    panelParams,
    searchParams,
    infoParams,
    watchParams,
    streamParams,
} from "./params"
import { MoviePaths } from "./paths"

//Matchers
export const MovieMatchers = {
    menu: R.lit("menu").then(R.end),
    panel: R.lit("panel").then(R.query(panelParams)).then(R.end),
    genres: R.lit("genres").then(R.end),
    eras: R.lit("eras").then(R.end),
    regions: R.lit("regions").then(R.end),
    search: R.lit("search")
        .then(R.query(t.exact(searchParams)))
        .then(R.end),
    info: R.lit("info")
        .then(R.query(t.exact(infoParams)))
        .then(R.end),
    discover: R.lit("discover").then(R.end),
    watch: R.lit("watch").then(R.query(t.exact(watchParams))),
    stream: R.lit("stream").then(R.query(t.exact(streamParams))),
} satisfies Record<MoviePaths, R.Match<any>>

export type MovieMatchersT = typeof MovieMatchers

export const prependMovieMatchers =
    (prefix: string) => (matchers: MovieMatchersT) =>
        ({
            menu: R.lit(prefix).then(matchers.menu),
            panel: R.lit(prefix).then(matchers.panel),
            genres: R.lit(prefix).then(matchers.genres),
            eras: R.lit(prefix).then(matchers.eras),
            regions: R.lit(prefix).then(matchers.regions),
            search: R.lit(prefix).then(matchers.search),
            info: R.lit(prefix).then(matchers.info),
            discover: R.lit(prefix).then(matchers.discover),
            watch: R.lit(prefix).then(matchers.watch),
            stream: R.lit(prefix).then(matchers.stream),
        } satisfies MovieMatchersT)
