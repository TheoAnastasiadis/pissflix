import { ViewsRegistry } from "../../../core/sharedObjects/viewsRegistry"
import { MoviesViewsRegistry } from "../../../domain/movies/routes/movies.routes"
import { MsxMoviesMenu } from "./components/moviesMenu"
import { MoviesRoutes } from "./components/moviesRoutes.enum"

export function createMoviesRegistry(applicationUrl: string): ViewsRegistry {
    const msxMoviesRegistry = new MoviesViewsRegistry(applicationUrl)

    msxMoviesRegistry.registerRoute(MoviesRoutes.MENU, MsxMoviesMenu)
    // msxMoviesCotrnoler.registerRoute()
    // msxMoviesCotrnoler.registerRoute()
    // msxMoviesCotrnoler.registerRoute()
    // msxMoviesCotrnoler.registerRoute()
    return msxMoviesRegistry
}
