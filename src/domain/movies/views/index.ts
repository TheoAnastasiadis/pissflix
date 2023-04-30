import { MsxContentRoot } from "../../../core/msxUI/contentObjects"
import { MsxMenu } from "../../../core/msxUI/menuObject"
import { View } from "../../../core/sharedObjects/view"

export enum MovieRelativePaths {
    menu = "menu/",
}

export interface MovieViews {
    menu: {
        viewHandler: View<MsxMenu>
        relativePath: MovieRelativePaths.menu
    }
    // movie: View<MsxContentRoot>
    // discover: View<MsxContentRoot>
    // trendingDayPaginated: View<MsxContentRoot>
    // trendingWeekPaginated:View<MsxContentRoot>
}
