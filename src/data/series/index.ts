import {
    MovieMatchers,
    prependMovieMatchers,
} from "../../domain/movies/controllers/matchers"
import { SeriesContext } from "../../domain/series/controllers/context"
import {
    SeriesMatchers,
    prependSeriesMatchers,
} from "../../domain/series/controllers/matchers"
import { UnsplashRepo } from "../common/repos/unSplash"
import { SeriesControllersImpl } from "./controllers"
import { TMDBSeriesRepo } from "./repos/tmdb"

const SeriesContextImpl: SeriesContext = {
    seriesRepo: TMDBSeriesRepo,
    matchers: prependSeriesMatchers("tv")(SeriesMatchers),
    movieMatchers: prependMovieMatchers("movies")(MovieMatchers),
    photosRepo: UnsplashRepo,
}

export { SeriesContextImpl, SeriesControllersImpl }
