import { Controller } from "../../../core/sharedObjects/view"
import * as t from "io-ts"

export type MoviePaths = {
    menu: `${string}/movies/menu`
    panel: `${string}/movies/panel`
    genres: `${string}/movies/genres`
    eras: `${string}/movies/eras`
    regions: `${string}/movies/regions`
    search: `${string}/movies/search`
    info: `${string}/movie`
    discover: `${string}/movies/discover`
    watch: `${string}/movies/watch`
}

export const panelParams = t.intersection([
    t.partial({
        decade: t.number,
        region: t.string,
        genre: t.number,
        trending: t.union([t.literal("day"), t.literal("week")]),
    }),
    t.type({
        page: t.number,
        limit: t.number,
    }),
])

export const infoParams = t.type({
    id: t.number,
})

export const searchParams = t.type({
    query: t.string,
})

export const watchParams = t.type({
    imdbId: t.string,
    player: t.union([t.literal("remote"), t.literal("local")]),
    title: t.string,
})

export type createMovieControllers<C> = (context: C) => {
    menu: Controller<MoviePaths["menu"], typeof context>
    panel: Controller<MoviePaths["panel"], typeof context, typeof panelParams>
    genres: Controller<MoviePaths["genres"], typeof context>
    eras: Controller<MoviePaths["eras"], typeof context>
    regions: Controller<MoviePaths["regions"], typeof context>
    search: Controller<
        MoviePaths["search"],
        typeof context,
        typeof searchParams
    >
    info: Controller<MoviePaths["info"], typeof context, typeof infoParams>
    discover: Controller<MoviePaths["discover"], typeof context>
    watch: Controller<MoviePaths["watch"], typeof context, typeof watchParams>
}
