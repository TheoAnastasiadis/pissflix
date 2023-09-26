import { DebridProviderRepo } from "../../common/repos/debridProvider.repo"
import { SubtitleRepo } from "../../common/repos/subtitle.repo"
import { TorrentRepo } from "../../common/repos/torrent.repo"
import { MoviesRepoT } from "../repos/movies.repo"
import { movieMatchers } from "./matchers"

export type MovieContext = {
    moviesRepo: MoviesRepoT
    torrentRepo: TorrentRepo
    debridRepo: DebridProviderRepo
    subtitlesRepo: SubtitleRepo
    matchers: typeof movieMatchers
}

// export const createMovieContext = (
//     moviesRepo: MoviesRepoT,
//     torrentRepo: TorrentRepo,
//     debridRepo: DebridProviderRepo,
//     subtitlesRepo: SubtitleRepo,
//     matchers: typeof movieMatchers
// ) =>
//     ({
//         moviesRepo,
//         torrentRepo,
//         debridRepo,
//         subtitlesRepo,
//         matchers,
//     } satisfies MovieContext)
