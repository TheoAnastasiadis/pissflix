import { SeriesContext } from "../../domain/series/controllers/context"
import {
    SeriesMatchers,
    prependSeriesMatchers,
} from "../../domain/series/controllers/matchers"
import { SeriesControllersImpl } from "./controllers"
import { TMDBSeriesRepo } from "./repos/tmdb"

const SeriesContextImpl: SeriesContext = {
    seriesRepo: TMDBSeriesRepo,
    matchers: prependSeriesMatchers("series")(SeriesMatchers),
}

export { SeriesContextImpl, SeriesControllersImpl }
