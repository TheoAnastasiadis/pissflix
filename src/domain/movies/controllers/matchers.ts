import * as t from "io-ts"
import * as R from "fp-ts-routing"
import { panelParams, searchParams, infoParams, watchParams } from "./params"
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
} satisfies Record<MoviePaths, R.Match<any>>

export type MovieMatchersT = typeof MovieMatchers
