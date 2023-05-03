import { MsxContentRoot } from "../../../core/msxUI/contentObjects"
import { MsxMenu } from "../../../core/msxUI/menuObject"
import { View } from "../../../core/sharedObjects/view"

export const MovieRelativePaths = {
    menu: "menu/",
    discover: "discover/",
    genres: "genres/",
    eras: "eras/",
    regions: "regions/",
    resultsPanel: "results_panel/",
    search: "search/",
}

export type MovieViews = {
    [Property in keyof typeof MovieRelativePaths]: View<
        MsxMenu | MsxContentRoot
    >
}
