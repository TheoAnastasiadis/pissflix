import routesConfig from "../../../core/config/routes.config"
import { MovieRelativePaths, MovieViews } from "../../../domain/movies/views"
import { DiscoverPage } from "./discover"
import { MainMovieMenu } from "./menu"
import { TrendingMovies } from "./trendingPaginated"

const externalUrl = routesConfig.externalUrl
const moviesUrl = routesConfig.movieUrl

export const movieViews: MovieViews = {
    menu: new MainMovieMenu(externalUrl, moviesUrl, MovieRelativePaths.menu),
    discover: new DiscoverPage(
        externalUrl,
        moviesUrl,
        MovieRelativePaths.discover
    ),
    trendingPaginated: new TrendingMovies(
        externalUrl,
        moviesUrl,
        MovieRelativePaths.trendingPaginated
    ),
    genres: undefined,
    eras: undefined,
    regions: undefined,
}
