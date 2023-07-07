import { PhotosRepoT } from "../repos/photos.repo"
import { SubtitleRepo } from "../repos/subtitle.repo"
import { commonmatcherT } from "./matchers"

export type CommonContext = {
    subtitleRepo: SubtitleRepo
    photosRepo: PhotosRepoT
    matchers: commonmatcherT
}

export const createCommonContext = (
    subtitleRepo: SubtitleRepo,
    photosRepo: PhotosRepoT,
    matchers: commonmatcherT
) => ({ subtitleRepo, photosRepo, matchers } satisfies CommonContext)
