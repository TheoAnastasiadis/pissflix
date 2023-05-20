import { MsxMenu } from "../../../core/msxUI/menuObject"
import { View } from "../../../core/sharedObjects/view"
import { MoviePaths } from "../../../domain/movies/views"
import * as t from "io-ts"
import * as TE from "fp-ts/TaskEither"

const menuView: View<{ paths: MoviePaths }> =
    (context: { paths: MoviePaths }) =>
    (
        decoder: t.Type<{}, {}, unknown> //no decoding
    ) =>
    (
        params: object //params are irrelevant
    ) =>
        TE.right({
            headline: "Movies",
            menu: [
                {
                    id: "0",
                    type: "default",
                    extensionIcon: "auto-awesome",
                    label: "Your Content",
                    data: context.paths.discover,
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
                    data: context.paths.genres,
                },
                {
                    id: "3",
                    type: "default",
                    extensionIcon: "auto-awesome",
                    label: "Era",
                    data: context.paths.eras,
                },
                {
                    id: "4",
                    type: "default",
                    extensionIcon: "auto-awesome",
                    label: "Region",
                    data: context.paths.regions,
                },
            ],
        } satisfies MsxMenu)

export { menuView }
