import { DebridProviderRepo } from "../../common/repos/debridProvider.repo"
import { PhotosRepoT } from "../../common/repos/photos.repo"
import { PRepoT } from "../repos/prepo"
import { PMatchersT } from "./matchers"

export type PContext = {
    prepo: PRepoT
    debridRepo: DebridProviderRepo
    matchers: PMatchersT
    photosRepo: PhotosRepoT
}

export const createPContext = (
    prepo: PRepoT,
    debridRepo: DebridProviderRepo,
    matchers: PMatchersT,
    photosRepo: PhotosRepoT
) =>
    ({
        prepo,
        debridRepo,
        matchers,
        photosRepo,
    } satisfies PContext)
