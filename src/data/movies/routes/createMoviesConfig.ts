import { MovieConfigOptions } from "../../../domain/movies/adaptors"
import { TorrentIoRepo } from "../../common/repos/torrentioIO"
import { TMDBRepo } from "../repos/tmdb"
import { movieViews } from "../views"

export const createMoviesConfig: (externalUrl: string) => MovieConfigOptions = (
    externalUrl
) => ({
    views: movieViews,
    externalUrl,
    moviesRepo: TMDBRepo,
    torrentsRepo: TorrentIoRepo,
})
