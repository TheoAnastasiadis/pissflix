import { Request } from "express-serve-static-core"
import { MoviesControler } from "../moviesViewsRegistry.interface"
import { ControlerFunction } from "../../../../shared/Objects/controlerFunction"
import { Movie } from "../../entities/movie.entity"
import { MsxMenu } from "../../../../shared/ui/msxUIComponents/menuObject"
import { MovieRoutes } from "./subtypes/routes.enum"
import { MoviesMenu } from "./subtypes/moviesMenu"

class MsxMoviesCotrnoler implements MoviesControler {
    routes: [string, ControlerFunction<MsxMenu>][]
    constructor() {
        this.routes = []
    }
    registerRoute(path: string, controler: ControlerFunction<MsxMenu>): void {
        this.routes.push([path, controler])
    }
}

const msxMoviesCotrnoler = new MsxMoviesCotrnoler()

msxMoviesCotrnoler.registerRoute(MovieRoutes.BASE, MoviesMenu)
// msxMoviesCotrnoler.registerRoute()
// msxMoviesCotrnoler.registerRoute()
// msxMoviesCotrnoler.registerRoute()
// msxMoviesCotrnoler.registerRoute()

export { msxMoviesCotrnoler }
