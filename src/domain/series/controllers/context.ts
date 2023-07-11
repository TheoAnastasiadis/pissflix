import { SeriesRepoT } from "../repos/series.repo"
import { SeriesMatchers } from "./matchers"

export type SeriesContext = {
    seriesRepo: SeriesRepoT
    matchers: typeof SeriesMatchers
}

export const createMovieContext = (
    seriesRepo: SeriesRepoT,
    matchers: typeof SeriesMatchers
) =>
    ({
        seriesRepo,
        matchers,
    } satisfies SeriesContext)
