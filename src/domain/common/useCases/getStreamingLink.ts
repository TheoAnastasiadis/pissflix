import { DebridProviderRepo } from "../repos/debridProvider.repo"
import { TorrentT } from "../entities/torrent"
import { MagnetURIT } from "../entities/magnetURI"

export const getStreamingLink =
    (debridProvider: DebridProviderRepo) =>
    (fileIdx: number) =>
    (magnetUri: MagnetURIT) =>
        debridProvider.getStreamingLink(magnetUri)(fileIdx)
