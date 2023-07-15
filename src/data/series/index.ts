import {
    MovieMatchers,
    prependMovieMatchers,
} from "../../domain/movies/controllers/matchers"
import { SeriesContext } from "../../domain/series/controllers/context"
import {
    SeriesMatchers,
    prependSeriesMatchers,
} from "../../domain/series/controllers/matchers"
import { unsplash } from "../common/repos/unSplash"
import { SeriesControllersImpl } from "./controllers"
import { TMDBSeriesRepo } from "./repos/tmdb"

const SeriesContextImpl: SeriesContext = {
    seriesRepo: TMDBSeriesRepo,
    matchers: prependSeriesMatchers("series")(SeriesMatchers),
    movieMatchers: prependMovieMatchers("movies")(MovieMatchers),
    photosRepo: unsplash,
}

export { SeriesContextImpl, SeriesControllersImpl }
