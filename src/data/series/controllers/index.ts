import { SeriesControllers } from "../../../domain/series/controllers/controllers"
import { discoverView } from "./discover"
import { genreView } from "./genre"
import { genresView } from "./genres"
import { menuView } from "./menu"
import { searchView } from "./search"
import { seasonView } from "./season"
import { seriesView } from "./series"

export const SeriesControllersImpl: SeriesControllers = {
    menu: menuView,
    genres: genresView,
    genre: genreView,
    search: searchView,
    discover: discoverView,
    series: seriesView,
    season: seasonView,
}
