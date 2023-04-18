import { ViewsHandler, ViewsRegistry } from "../../../shared/Objects/views"
import { MovieRoutes } from "./msxViews/subtypes/routes.enum"

export interface MoviesViewsRegistry extends ViewsRegistry<MovieRoutes> {
    routes: [MovieRoutes, ViewsHandler<any>][]
    registerRoute(path: MovieRoutes, handler: ViewsHandler<any>): void
}
