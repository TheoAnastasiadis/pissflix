import { PhotosRepoT } from "../../common/repos/photos.repo"
import { MovieMatchers } from "../../movies/controllers/matchers"
import { SeriesRepoT } from "../repos/series.repo"
import { SeriesMatchers } from "./matchers"

export type SeriesContext = {
    seriesRepo: SeriesRepoT
    matchers: typeof SeriesMatchers
    movieMatchers: typeof MovieMatchers
    photosRepo: PhotosRepoT
}

export const createMovieContext = (
    seriesRepo: SeriesRepoT,
    matchers: typeof SeriesMatchers,
    movieMatchers: typeof MovieMatchers,
    photosRepo: PhotosRepoT
) =>
    ({
        seriesRepo,
        matchers,
        photosRepo,
        movieMatchers,
    } satisfies SeriesContext)
