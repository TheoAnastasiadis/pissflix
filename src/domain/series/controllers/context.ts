import { PhotosRepoT } from "../../common/repos/photos.repo"
import { movieMatchers } from "../../movies/controllers/matchers"
import { SeriesRepoT } from "../repos/series.repo"
import { seriesMatchers } from "./matchers"

export type SeriesContext = {
    seriesRepo: SeriesRepoT
    matchers: typeof seriesMatchers
    movieMatchers: typeof movieMatchers
    photosRepo: PhotosRepoT
}
