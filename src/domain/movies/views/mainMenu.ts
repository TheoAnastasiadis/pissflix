import config from "../../../core/config/routes.config"
import { MsxMenu } from "../../../core/msxUI/menuObject"
import { Result } from "../../../core/sharedObjects/result"
import { View } from "../../../core/sharedObjects/view"
import { movieRoutes } from "./routes"

class MainMenu implements View<MsxMenu> {
    constructor(
        externalUrl: `${string}/`,
        groupgUrl: `${string}/`,
        specialUrl: `${string}/`
    ) {
        this.externalUrl = externalUrl
        this.groupUrl = groupgUrl
        this.specialUrl = specialUrl
    }
    externalUrl: `${string}/`
    groupUrl: `${string}/`
    specialUrl: `${string}/`
    urlParams: URLSearchParams = new URLSearchParams()
    standalone = true
    renderer = (params?: URLSearchParams) => {
        return new Result<MsxMenu>(true, undefined, new MsxMenu())
    }
    getAbsolutePath = () => {
        return (
            this.externalUrl +
            this.groupUrl +
            this.specialUrl +
            "?" +
            this.urlParams.toString()
        )
    }
    render = () => {
        return this.renderer(this.urlParams)
    }
}

export const mainMenu = new MainMenu(
    `${config.externalUrl}/`,
    `${config.movieUrl}/`,
    `${movieRoutes.menu}/`
)
