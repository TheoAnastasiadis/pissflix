import { DebridProviderRepo } from "../../common/repos/debridProvider.repo"
import { TorrentRepo } from "../../common/repos/torrent.repo"
import { MoviesRepoT } from "../repos/movies.repo"
import { MovieMatchers } from "./matchers"

export type MovieContext = {
    moviesRepo: MoviesRepoT
    torrentRepo: TorrentRepo
    debridRepo: DebridProviderRepo
    matchers: typeof MovieMatchers
}
