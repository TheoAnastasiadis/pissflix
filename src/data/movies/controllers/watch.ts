import { pipe } from "fp-ts/lib/function"
import { Controller } from "../../../core/sharedObjects/controller"
import * as TE from "fp-ts/TaskEither"
import * as A from "fp-ts/Array"
import * as TO from "fp-ts/TaskOption"
import * as t from "io-ts"
import * as R from "fp-ts-routing"
import { filesize } from "filesize"
import {
    MsxContentItem,
    MsxContentRoot,
} from "../../../core/msxUI/contentObjects"
import { Icon } from "../../../core/msxUI/icon"
import { indexOfResolution } from "../../../domain/common/entities/resolution"
import { checkIfFileAvailable } from "../../../domain/common/useCases/checkIfFileAvailable"
import { getTorrentsById } from "../../../domain/common/useCases/getTorrentsById"
import { MovieContext } from "../../../domain/movies/controllers/context"
import { watchParams } from "../../../domain/movies/controllers/params"
import { TorrentT } from "../../../domain/common/entities/torrent"
import applicationConfig from "../../../core/config/app.config"

//helpers
const resolutionIcons: Icon[] = [
    "sd",
    "hd",
    "hd",
    "2k",
    "4k",
    "8k",
    "device-unknown",
]

const sortTorrents =
    (isRemote: boolean) =>
    (
        a: TorrentT & { instantlyAvailable: boolean },
        b: TorrentT & { instantlyAvailable: boolean }
    ) => {
        // local players sort torrents by seeders
        if (!isRemote) return b.seeders - a.seeders

        // remote players sort torrents by size, prioritizing instantly available ones
        if (a.instantlyAvailable === b.instantlyAvailable)
            return b.size - a.size
        else if (b.instantlyAvailable) return Infinity
        return -Infinity
    }

export const watchView: Controller<
    MovieContext,
    t.TypeOf<typeof watchParams>
> = {
    _tag: "view",
    render: (context) => (params) =>
        pipe(
            TE.Do,
            TE.bind("torrents", () =>
                getTorrentsById(context.torrentRepo)(params.imdbId)
            ),
            TE.bind("instantAvailability", ({ torrents }) =>
                pipe(
                    torrents,
                    A.map((torrent) =>
                        checkIfFileAvailable(context.debridRepo)(
                            torrent.fileIdx
                        )(torrent.magnetURI)
                    ),
                    A.sequence(TO.ApplicativePar),
                    TE.fromTaskOption(() => "")
                )
            ),
            TE.map(
                ({ torrents, instantAvailability }) =>
                    ({
                        headline: params.title,
                        type: "pages",
                        underlay: {
                            headline: "Torrent Options",
                            items: [
                                {
                                    type: "space",
                                    text: "Sources with the {ico:offline-bolt} symbol are instantly streamable",
                                    layout: "0,5,12,1",
                                    offset: "0,1,0,0",
                                },
                            ],
                        },
                        template: {
                            type: "button",
                            layout: "0,0,4,2",
                            color: "msx-glass",
                            icon: "blank",
                            iconSize: "medium",
                            title: "Seeders",
                            titleFooter: "File Size",
                        },
                        items: torrents
                            .map((torrent, idx) => ({
                                ...torrent,
                                instantlyAvailable: instantAvailability[idx],
                            }))
                            .sort(sortTorrents(params.player === "remote"))
                            .map((torrent) => {
                                return {
                                    icon: resolutionIcons[
                                        indexOfResolution(torrent.resolution)
                                    ],
                                    title: `${torrent.seeders}{sp}{ico:group}`,
                                    titleFooter: String(filesize(torrent.size)),
                                    tagColor: "msx-green",
                                    tag:
                                        params.player == "remote" &&
                                        torrent.instantlyAvailable
                                            ? "{ico:offline-bolt}"
                                            : "",
                                    action: `execute:${
                                        applicationConfig.externalURL
                                    }${context.matchers.stream.formatter.run(
                                        R.Route.empty,
                                        {
                                            magnet: torrent.magnetURI,
                                            fileIdx: String(torrent.fileIdx),
                                            imdbId: params.imdbId,
                                            episodeImdbId: params.episodeImdbId,
                                            title: params.title,
                                        }
                                    )}`,
                                } satisfies MsxContentItem
                            }),
                    } satisfies MsxContentRoot)
            )
        ),
}
