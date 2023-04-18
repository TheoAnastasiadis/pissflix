import { ViewsHandler } from "../../../../shared/Objects/views"
import { MsxMenu } from "../../../../shared/ui/msxUIComponents/menuObject"
import { MoviesViewsRegistry } from "../moviesViewsRegistry.interface"
import { MoviesMenu } from "./subtypes/moviesMenu"
import { MovieRoutes } from "./subtypes/routes.enum"

class MsxMoviesCotrnoler implements MoviesViewsRegistry {
    routes: [MovieRoutes, ViewsHandler<MsxMenu>][]
    constructor() {
        this.routes = []
    }
    registerRoute(path: MovieRoutes, handler: ViewsHandler<MsxMenu>): void {
        this.routes.push([path, handler])
    }
}

const msxMoviesCotrnoler = new MsxMoviesCotrnoler()

msxMoviesCotrnoler.registerRoute(MovieRoutes.BASE, MoviesMenu)
// msxMoviesCotrnoler.registerRoute()
// msxMoviesCotrnoler.registerRoute()
// msxMoviesCotrnoler.registerRoute()
// msxMoviesCotrnoler.registerRoute()

export { msxMoviesCotrnoler }
