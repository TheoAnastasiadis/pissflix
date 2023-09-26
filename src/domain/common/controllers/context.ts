import { PhotosRepoT } from "../repos/photos.repo"
import { SubtitleRepo } from "../repos/subtitle.repo"
import { commonMatchers } from "./matchers"

export type CommonContext = {
    subtitleRepo: SubtitleRepo
    photosRepo: PhotosRepoT
    matchers: typeof commonMatchers
}
