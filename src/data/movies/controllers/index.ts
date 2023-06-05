import { MovieControllers } from "../../../domain/movies/controllers/controllers"
import { streamRedirection } from "./stream"
import { discoverView } from "./discover"
import { erasView } from "./eras"
import { genresView } from "./genres"
import { infoView } from "./info"
import { menuView } from "./menu"
import { panelView } from "./panel"
import { regionsView } from "./regions"
import { searchView } from "./search"
import { watchView } from "./watch"

export const MovieControllersImpl: MovieControllers = {
    menu: menuView,
    panel: panelView,
    genres: genresView,
    eras: erasView,
    regions: regionsView,
    search: searchView,
    info: infoView,
    discover: discoverView,
    watch: watchView,
    stream: streamRedirection,
}
