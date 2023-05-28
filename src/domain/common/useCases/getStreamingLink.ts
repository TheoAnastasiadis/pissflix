import { MagnetURIT } from "../entities/magnetURI"
import { DebridProviderRepo } from "../repos/debridProvider.repo"

export const getStreamingLink =
    (debridProvider: DebridProviderRepo) =>
    (fileIdx: number) =>
    (magnet: MagnetURIT) =>
        debridProvider.getStreamingLink(magnet)(fileIdx)
