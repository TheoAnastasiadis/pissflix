import { MoviePaths } from "../../domain/movies/controllers"
import {
    createMovieContext,
    createMoviesRouter,
    responseAdaptorsRecord,
    setUpFunctionsRecord,
} from "../../domain/movies/setup"
import { RealDebridRepo } from "../common/repos/realDebrid"
import { TorrentIoRepo } from "../common/repos/torrentioIO"
import { createMoviesControllers } from "./controllers"
import { TMDBRepo } from "./repos/tmdb"

const moviePaths: (prefix: string) => MoviePaths = (prefix) => ({
    menu: `${prefix}/movies/menu`,
    panel: `${prefix}/movies/panel`,
    genres: `${prefix}/movies/genres`,
    eras: `${prefix}/movies/eras`,
    regions: `${prefix}/movies/regions`,
    search: `${prefix}/movies/search`,
    info: `${prefix}/movie`,
    discover: `${prefix}/movies/discover`,
    watch: `${prefix}/movies/watch`,
})

export const movieSetup = (
    setUpFunction: setUpFunctionsRecord,
    responseAdaptor: responseAdaptorsRecord,
    externalUrl: string
) => {
    const movieContext = createMovieContext(
        TMDBRepo,
        TorrentIoRepo,
        RealDebridRepo,
        moviePaths(""),
        moviePaths(externalUrl)
    )

    const controllers = Object.values(createMoviesControllers(movieContext))

    const router = createMoviesRouter(
        controllers,
        setUpFunction,
        responseAdaptor,
        movieContext
    )
    return router
}
