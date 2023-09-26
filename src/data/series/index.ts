import appConfig from "../../core/config/app.config"
import { movieMatchers } from "../../domain/movies/controllers/matchers"
import { seriesEndpoint } from "../../domain/series"
import { SeriesContext } from "../../domain/series/controllers/context"
import { seriesMatchers } from "../../domain/series/controllers/matchers"
import { UnsplashRepo } from "../common/repos/unSplash"
import { SeriesControllersImpl } from "./controllers"
import { TMDBSeriesRepo } from "./repos/tmdb"

const seriesContextImpl: SeriesContext = {
    seriesRepo: TMDBSeriesRepo,
    photosRepo: UnsplashRepo,
    movieMatchers: movieMatchers,
    matchers: seriesMatchers,
}

export const seriesRouter = seriesEndpoint(SeriesControllersImpl).createRouter(
    seriesContextImpl
)
