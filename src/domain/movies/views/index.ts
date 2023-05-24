import { View } from "../../../core/sharedObjects/view"
import { TorrentRepo } from "../../common/repos/torrent.repo"
import { Language } from "../entities/language"
import { MoviesRepoT } from "../repos/movies.repo"
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
})

export type MovieViews = {
    menu: View<{ paths: MoviePaths }>
    panel: View<{ repo: MoviesRepoT }, typeof panelParams>
    genres: View<{ repo: MoviesRepoT; paths: MoviePaths }>
    eras: View<{ repo: MoviesRepoT; paths: MoviePaths }>
    regions: View<{ repo: MoviesRepoT; paths: MoviePaths }>
    search: View<{ repo: MoviesRepoT; paths: MoviePaths }, typeof searchParams>
    info: View<
        { moviesRepo: MoviesRepoT; torrentsRepo: TorrentRepo },
        typeof infoParams
    >
    discover: View<{ repo: MoviesRepoT; paths: MoviePaths }>
    watch: View<{ repo: TorrentRepo }, typeof watchParams>
} & Record<keyof MoviePaths, View<any, any>>
