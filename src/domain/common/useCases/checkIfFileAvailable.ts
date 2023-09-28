import { MagnetURIT } from "../entities/magnetURI"
import { DebridProviderRepo } from "../repos/debridProvider.repo"

export const checkIfFileAvailable =
    (repo: DebridProviderRepo) => (fileIdx: number) => (magnet: MagnetURIT) =>
        repo.checkIfAvailable(magnet)(fileIdx)
