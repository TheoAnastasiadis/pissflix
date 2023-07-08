import { MsxMenu } from "../../../core/msxUI/menuObject"
import { Controller } from "../../../core/sharedObjects/controller"
import { MovieContext } from "../../../domain/movies/controllers/context"
import * as TE from "fp-ts/TaskEither"
import * as R from "fp-ts-routing"
import applicationConfig from "../../../core/config/app.config"

const baseUrl = applicationConfig.externalURL

export const menuView: Controller<MovieContext> = {
    _tag: "view",
    render: (context) => (params) =>
        TE.right({
            headline: "Movies",
            logo: `${baseUrl}/pissflix_cinema_menu.png`,
            logoSize: "small",
            menu: [
                {
                    id: "0",
                    type: "default",
                    extensionIcon: "person-pin",
                    label: "Your Content",
                    data: `${baseUrl}${context.matchers.discover.formatter.run(
                        R.Route.empty,
                        {}
                    )}`,
                },
                {
                    id: "1",
                    type: "separator",
                    label: "Discover by",
                },
                {
                    id: "2",
                    type: "default",
                    extensionIcon: "style",
                    label: "Genre",
                    data: `${baseUrl}${context.matchers.genres.formatter.run(
                        R.Route.empty,
                        {}
                    )}`,
                },
                {
                    id: "3",
                    type: "default",
                    extensionIcon: "timelapse",
                    label: "Era",
                    data: `${baseUrl}${context.matchers.eras.formatter.run(
                        R.Route.empty,
                        {}
                    )}`,
                },
                {
                    id: "4",
                    type: "default",
                    extensionIcon: "map",
                    label: "Region",
                    data: `${baseUrl}${context.matchers.regions.formatter.run(
                        R.Route.empty,
                        {}
                    )}`,
                },
                {
                    id: "5",
                    type: "default",
                    extensionIcon: "search",
                    label: "Search",
                    data: `${baseUrl}${context.matchers.search.formatter.run(
                        R.Route.empty,
                        { query: "" }
                    )}`,
                },
            ],
        } satisfies MsxMenu),
}
