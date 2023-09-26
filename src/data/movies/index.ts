import { MovieContext } from "../../domain/movies/controllers/context"
import { movieMatchers } from "../../domain/movies/controllers/matchers"
import { MovieEndpoint } from "../../domain/movies"
import { OSRepo } from "../common/repos/opensubtitles"
import { RealDebridRepo } from "../common/repos/realDebrid"
import { TorrentIoRepo } from "../common/repos/torrentioIO"
import { MovieControllersImpl } from "./controllers"
import { TMDBRepo } from "./repos/tmdb"

export const movieContextImpl: MovieContext = {
    moviesRepo: TMDBRepo,
    torrentRepo: TorrentIoRepo,
    debridRepo: RealDebridRepo,
    subtitlesRepo: OSRepo,
    matchers: movieMatchers,
}

export const moviesRouter =
    MovieEndpoint(MovieControllersImpl).createRouter(movieContextImpl)
