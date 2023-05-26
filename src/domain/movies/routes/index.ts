import { Router } from "express"
import {
    MoviePaths,
    MovieViews,
    infoParams,
    panelParams,
    searchParams,
} from "../views"
import * as t from "io-ts"
import { MoviesRepoT } from "../repos/movies.repo"
import { TorrentRepo } from "../../common/repos/torrent.repo"

const paths: (prefix: string) => MoviePaths = (prefix) => ({
    menu: `${prefix}/movies/menu`,
    panel: `${prefix}/movies/panel`,
    genres: `${prefix}/movies/genres`,
    regions: `${prefix}/movies/regions`,
    eras: `${prefix}/movies/eras`,
    search: `${prefix}/movies/search`,
    info: `${prefix}/movie`,
    discover: `${prefix}/movies/discover`,
})

export type MovieConfigOptions = {
    views: MovieViews
    externalUrl: string
    moviesRepo: MoviesRepoT
    torrentsRepo: TorrentRepo
}

export const movieRouter = (options: MovieConfigOptions) => {
    const router = Router()

    const noParams = {}
    const noParamsDecoder = t.type({})

    //MENU
    router.get(paths("").menu, async (req, res) => {
        res.json(
            await options.views.menu({ paths: paths(options.externalUrl) })(
                noParamsDecoder
            )(noParams)()
        )
    })

    //PANEL
    router.get(paths("").panel, async (req, res) => {
        res.json(
            await options.views.panel({ repo: options.moviesRepo })(
                panelParams
            )(req.params)()
        )
    })

    //GENRES
    router.get(paths("").genres, async (req, res) => {
        res.json(
            await options.views.genres({
                repo: options.moviesRepo,
                paths: paths(options.externalUrl),
            })(noParamsDecoder)(noParams)()
        )
    })

    //REGIONS
    router.get(paths("").regions, async (req, res) => {
        res.json(
            await options.views.regions({
                repo: options.moviesRepo,
                paths: paths(options.externalUrl),
            })(noParamsDecoder)(noParams)()
        )
    })

    //ERAS
    router.get(paths("").eras, async (req, res) => {
        res.json(
            await options.views.eras({
                repo: options.moviesRepo,
                paths: paths(options.externalUrl),
            })(noParamsDecoder)(noParams)()
        )
    })

    //SEARCH
    router.get(paths("").search, async (req, res) => {
        res.json(
            await options.views.search({
                repo: options.moviesRepo,
                paths: paths(options.externalUrl),
            })(searchParams)(req.params)()
        )
    })

    //INFO
    router.get(paths("").info, async (req, res) => {
        res.json(
            await options.views.info({
                moviesRepo: options.moviesRepo,
                torrentsRepo: options.torrentsRepo,
            })(infoParams)(req.params)()
        )
    })

    //DISCOVER
    router.get(paths("").discover, async (req, res) => {
        res.json(
            await options.views.discover({
                repo: options.moviesRepo,
                paths: paths(options.externalUrl),
            })(noParamsDecoder)(noParams)()
        )
    })

    return Router
}
