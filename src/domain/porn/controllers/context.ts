import { DebridProviderRepo } from "../../common/repos/debridProvider.repo"
import { PhotosRepoT } from "../../common/repos/photos.repo"
import { PornRepoT } from "../repos/prepo"
import { pornMatchers } from "./matchers"

export type PornContext = {
    pornRepo: PornRepoT
    debridRepo: DebridProviderRepo
    matchers: typeof pornMatchers
    photosRepo: PhotosRepoT
}
