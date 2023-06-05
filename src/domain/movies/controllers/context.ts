import { DebridProviderRepo } from "../../common/repos/debridProvider.repo"
import { SubtitleRepo } from "../../common/repos/subtitle.repo"
import { TorrentRepo } from "../../common/repos/torrent.repo"
import { MoviesRepoT } from "../repos/movies.repo"
import { MovieMatchers } from "./matchers"

export type MovieContext = {
    moviesRepo: MoviesRepoT
    torrentRepo: TorrentRepo
    debridRepo: DebridProviderRepo
    subtitlesRepo: SubtitleRepo
    matchers: typeof MovieMatchers
}

export const createMovieContext = (
    moviesRepo: MoviesRepoT,
    torrentRepo: TorrentRepo,
    debridRepo: DebridProviderRepo,
    subtitlesRepo: SubtitleRepo,
    matchers: typeof MovieMatchers
) =>
    ({
        moviesRepo,
        torrentRepo,
        debridRepo,
        subtitlesRepo,
        matchers,
    } satisfies MovieContext)
