import { RealDebridRepo } from "../common/repos/realDebrid"
import { TorrentIoRepo } from "../common/repos/torrentioIO"
import { TMDBRepo } from "./repos/tmdb"
import { MovieContext } from "../../domain/movies/controllers/context"
import {
    MovieMatchers,
    prependMovieMatchers,
} from "../../domain/movies/controllers/matchers"
import { MovieControllersImpl } from "./controllers"
import { OSRepo } from "../common/repos/opensubtitles"

const MovieContextImpl: MovieContext = {
    moviesRepo: TMDBRepo,
    torrentRepo: TorrentIoRepo,
    debridRepo: RealDebridRepo,
    matchers: prependMovieMatchers("movies")(MovieMatchers),
    subtitlesRepo: OSRepo,
}

export { MovieContextImpl, MovieControllersImpl }
