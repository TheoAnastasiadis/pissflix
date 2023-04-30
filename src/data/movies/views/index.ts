import routesConfig from "../../../core/config/routes.config"
import { MsxMenu } from "../../../core/msxUI/menuObject"
import { View } from "../../../core/sharedObjects/view"
import { MovieRelativePaths, MovieViews } from "../../../domain/movies/views"
import { MainMovieMenu } from "./menu"

const externalUrl = routesConfig.externalUrl
const moviesUrl = routesConfig.movieUrl

export class movieViews implements MovieViews {
    menu: {
        viewHandler: View<MsxMenu>
        relativePath: MovieRelativePaths.menu
    }
    constructor() {
        this.menu = {
            viewHandler: new MainMovieMenu(
                externalUrl,
                moviesUrl,
                MovieRelativePaths.menu
            ),
            relativePath: MovieRelativePaths.menu,
        }
    }
}
