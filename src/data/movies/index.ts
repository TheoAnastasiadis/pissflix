import { TorrentIoRepo } from "../common/repos/torrentioIO"
import { TMDBRepo } from "./repos/tmdb"
import { MovieContext } from "../../domain/movies/controllers/context"
import {
    MovieMatchers,
    prependMovieMatchers,
} from "../../domain/movies/controllers/matchers"
import { MovieControllersImpl } from "./controllers"
import { OSRepo } from "../common/repos/opensubtitles"
import { DebridLinkRepo } from "../common/repos/debridLink"

const MovieContextImpl: MovieContext = {
    moviesRepo: TMDBRepo,
    torrentRepo: TorrentIoRepo,
    debridRepo: DebridLinkRepo,
    matchers: prependMovieMatchers("movies")(MovieMatchers),
    subtitlesRepo: OSRepo,
}

export { MovieContextImpl, MovieControllersImpl }
