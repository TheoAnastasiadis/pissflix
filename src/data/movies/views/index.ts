import routesConfig from "../../../core/config/routes.config"
import { IMoviesRepo } from "../../../domain/movies/repos/movies.repo"
import { MovieRelativePaths, MovieViews } from "../../../domain/movies/views"
import { TMDBRepo } from "../repos/tmdb"
import { DiscoverPage } from "./discover"
import { MainMovieMenu } from "./menu"
import { ResultsPanel } from "./results"

const externalUrl = routesConfig.externalUrl
const moviesUrl = routesConfig.movieUrl

const moviesRepo: IMoviesRepo = new TMDBRepo()

export const movieViews: MovieViews = {
    menu: new MainMovieMenu(externalUrl, moviesUrl, MovieRelativePaths.menu),
    discover: new DiscoverPage(
        externalUrl,
        moviesUrl,
        MovieRelativePaths.discover,
        moviesRepo
    ),
    resultsPanel: new ResultsPanel(
        externalUrl,
        moviesUrl,
        MovieRelativePaths.resultsPanel,
        moviesRepo
    ),
    genres: undefined,
    eras: undefined,
    regions: undefined,
}
