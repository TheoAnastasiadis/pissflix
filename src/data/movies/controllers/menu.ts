import { MsxMenu } from "../../../core/msxUI/menuObject"
import { Controller } from "../../../core/sharedObjects/controller"
import { MovieContext } from "../../../domain/movies/controllers/context"
import * as TE from "fp-ts/TaskEither"
import * as R from "fp-ts-routing"

export const menuView: Controller<MovieContext> = {
    _tag: "view",
    render: (context) => (params) =>
        TE.right({
            headline: "Movies",
            menu: [
                {
                    id: "0",
                    type: "default",
                    extensionIcon: "auto-awesome",
                    label: "Your Content",
                    data: context.matchers.discover.formatter.run(
                        R.Route.empty,
                        {}
                    ),
                },
                {
                    id: "1",
                    type: "separator",
                    label: "Discover by",
                },
                {
                    id: "2",
                    type: "default",
                    extensionIcon: "auto-awesome",
                    label: "Genre",
                    data: context.matchers.genres.formatter.run(
                        R.Route.empty,
                        {}
                    ),
                },
                {
                    id: "3",
                    type: "default",
                    extensionIcon: "auto-awesome",
                    label: "Era",
                    data: context.matchers.eras.formatter.run(
                        R.Route.empty,
                        {}
                    ),
                },
                {
                    id: "4",
                    type: "default",
                    extensionIcon: "auto-awesome",
                    label: "Region",
                    data: context.matchers.regions.formatter.run(
                        R.Route.empty,
                        {}
                    ),
                },
            ],
        } satisfies MsxMenu),
}
