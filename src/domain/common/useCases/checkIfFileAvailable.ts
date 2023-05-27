import { MagnetURI } from "../entities/magnetURI"
import { DebridProviderRepo } from "../repos/debridProvider.repo"

export const checkIfFileAvailable =
    (repo: DebridProviderRepo) => (fileIdx: number) => (magnet: MagnetURI) =>
        repo.checkIfAvailable(magnet) //fileIdx is not beign checked rn
