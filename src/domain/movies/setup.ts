import {
    ResponseAdaptor,
    SetUpFunction,
} from "../../core/sharedObjects/addaptors"
import { Controller } from "../../core/sharedObjects/controller"
import { setupRouter } from "../../core/sharedObjects/routerSetup"
import { DebridProviderRepo } from "../common/repos/debridProvider.repo"
import { TorrentRepo } from "../common/repos/torrent.repo"
import { MovieContext, MoviePaths } from "./controllers"
import { MoviesRepoT } from "./repos/movies.repo"

export const createMovieContext: (
    moviesRepo: MoviesRepoT,
    torrentRepo: TorrentRepo,
    debridRepo: DebridProviderRepo,
    relativePaths: MoviePaths,
    absolutePaths: MoviePaths
) => MovieContext = (
    moviesRepo,
    torrentRepo,
    debridRepo,
    relativePaths,
    absolutePaths
) => ({
    moviesRepo,
    torrentRepo,
    debridRepo,
    relativePaths,
    absolutePaths,
})

export type setUpFunctionsRecord = Record<
    Controller<any, any>["_tag"],
    SetUpFunction
>
export type responseAdaptorsRecord = Record<
    Controller<any, any>["_tag"],
    ResponseAdaptor<any, any>
>

export const createMoviesRouter: (
    movieControllers: Controller<string, MovieContext, any>[],
    setUpFunction: setUpFunctionsRecord,
    addaptors: responseAdaptorsRecord,
    context: MovieContext
) => void = (movieControllers, setUpFunctions, addaptors, context) => {
    setupRouter(movieControllers, setUpFunctions, addaptors, context)
}
