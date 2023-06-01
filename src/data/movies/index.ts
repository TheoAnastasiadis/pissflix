import { RealDebridRepo } from "../common/repos/realDebrid"
import { TorrentIoRepo } from "../common/repos/torrentioIO"
import { TMDBRepo } from "./repos/tmdb"
import { MovieContext } from "../../domain/movies/controllers/context"
import { MovieMatchers } from "../../domain/movies/controllers/matchers"
import { MovieControllersImpl } from "./controllers"

const MovieContextImpl: MovieContext = {
    moviesRepo: TMDBRepo,
    torrentRepo: TorrentIoRepo,
    debridRepo: RealDebridRepo,
    matchers: MovieMatchers,
}

export { MovieContextImpl, MovieControllersImpl }
