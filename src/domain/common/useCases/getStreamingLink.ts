import { MagnetURI } from "../entities/magnetURI"
import { DebridProviderRepo } from "../repos/debridProvider.repo"

export const getStreamingLink =
    (debridProvider: DebridProviderRepo) =>
    (fileIdx: number) =>
    (magnet: MagnetURI) =>
        debridProvider.getStreamingLink(magnet)(fileIdx)
