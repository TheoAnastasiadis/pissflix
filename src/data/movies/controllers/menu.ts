import { MsxMenu } from "../../../core/msxUI/menuObject"
import { Controller } from "../../../core/sharedObjects/view"
import { MoviePaths } from "../../../domain/movies/controllers"
import * as t from "io-ts"
import * as TE from "fp-ts/TaskEither"
import { DebridProviderRepo } from "../../../domain/common/repos/debridProvider.repo"
import { TorrentRepo } from "../../../domain/common/repos/torrent.repo"
import { MoviesRepoT } from "../../../domain/movies/repos/movies.repo"

const menuView: Controller<
    MoviePaths["menu"],
    {
        moviesRepo: MoviesRepoT
        torrentRepo: TorrentRepo
        debridRepo: DebridProviderRepo
        relativePaths: MoviePaths
        absolutePaths: MoviePaths
    }
> = {
    _tag: "view",
    _path: `/movies/menu`,
    render:
        (context) =>
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
                        data: context.absolutePaths.discover,
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
                        data: context.absolutePaths.genres,
                    },
                    {
                        id: "3",
                        type: "default",
                        extensionIcon: "auto-awesome",
                        label: "Era",
                        data: context.absolutePaths.eras,
                    },
                    {
                        id: "4",
                        type: "default",
                        extensionIcon: "auto-awesome",
                        label: "Region",
                        data: context.absolutePaths.regions,
                    },
                ],
            } satisfies MsxMenu),
}

export { menuView }
