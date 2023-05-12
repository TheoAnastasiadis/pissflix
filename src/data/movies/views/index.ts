import routesConfig from "../../../core/config/routes.config"
import { IMoviesRepo } from "../../../domain/movies/repos/movies.repo"
import { MovieRelativePaths, MovieViews } from "../../../domain/movies/views"
import { TMDBRepo } from "../repos/tmdb"
import { DiscoverPage } from "./discover"
import { ErasPage } from "./eras"
import { GenresPage } from "./genres"
import { MainMovieMenu } from "./menu"
import { RegionsPage } from "./regions"
import { ResultsPanel } from "./results"
import { SearchPage } from "./search"

const externalUrl = routesConfig.externalUrl
const moviesUrl = routesConfig.movieUrl

export const movieViews: (moviesRepo: IMoviesRepo) => MovieViews = (
    moviesRepo
) => ({
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
    genres: new GenresPage(
        externalUrl,
        moviesUrl,
        MovieRelativePaths.genres,
        moviesRepo
    ),
    eras: new ErasPage(
        externalUrl,
        moviesUrl,
        MovieRelativePaths.eras,
        moviesRepo
    ),
    regions: new RegionsPage(
        externalUrl,
        moviesUrl,
        MovieRelativePaths.regions,
        moviesRepo
    ),
    search: new SearchPage(
        externalUrl,
        moviesUrl,
        MovieRelativePaths.search,
        moviesRepo
    ),
})
