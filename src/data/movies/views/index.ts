import { MovieViews } from "../../../domain/movies/views"
import { discoverView } from "./discover"
import { erasView } from "./eras"
import { genresView } from "./genres"
import { infoView } from "./info"
import { menuView } from "./menu"
import { panelView } from "./panel"
import { regionsView } from "./regions"
import { searchView } from "./search"
import { watchView } from "./watch"

export const movieViews: MovieViews = {
    menu: menuView,
    panel: panelView,
    genres: genresView,
    eras: erasView,
    regions: regionsView,
    search: searchView,
    info: infoView,
    discover: discoverView,
    watch: watchView
}
