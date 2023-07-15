import { MsxMenu } from "../../../core/msxUI/menuObject"
import { Controller } from "../../../core/sharedObjects/controller"
import * as TE from "fp-ts/TaskEither"
import appConfig from "../../../core/config/app.config"
import * as R from "fp-ts-routing"
import { SeriesContext } from "../../../domain/series/controllers/context"

const baseUrl = appConfig.externalURL

export const menuView: Controller<SeriesContext> = {
    _tag: "view",
    render: (context) => (params) =>
        TE.right({
            headline: "Movies",
            logo: `${baseUrl}/pissflix_tv_menu.png`,
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
