import { DebridProviderRepo } from "../../../domain/common/repos/debridProvider.repo"
import { TorrentRepo } from "../../../domain/common/repos/torrent.repo"
import {
    MoviePaths,
    createMovieControllers,
} from "../../../domain/movies/controllers"
import { MoviesRepoT } from "../../../domain/movies/repos/movies.repo"
import { discoverView } from "./discover"
import { erasView } from "./eras"
import { genresView } from "./genres"
import { infoView } from "./info"
import { menuView } from "./menu"
import { panelView } from "./panel"
import { regionsView } from "./regions"
import { searchView } from "./search"
import { watchView } from "./watch"

export const createMoviesControllers: createMovieControllers<{
    moviesRepo: MoviesRepoT
    torrentRepo: TorrentRepo
    debridRepo: DebridProviderRepo
    relativePaths: MoviePaths
    absolutePaths: MoviePaths
}> = (context) => ({
    menu: menuView,
    panel: panelView,
    genres: genresView,
    eras: erasView,
    regions: regionsView,
    search: searchView,
    info: infoView,
    discover: discoverView,
    watch: watchView,
})
