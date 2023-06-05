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
import { LanguageT } from "../../../domain/movies/entities/language"
import { getSubtitles } from "../../../domain/common/useCases/getSubtitles"
import { SubtitleT } from "../../../domain/common/entities/subtitle"

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

const sortTorrents = (isRemote: boolean) => (a: TorrentT, b: TorrentT) =>
    isRemote ? b.size - a.size : b.seeders - a.seeders //for remote plays resolution is more impoarnt. for local plays seeders are more important

const parseSubtitles = (subtitles: SubtitleT[]) =>
    subtitles
        .map((sub) => [`torrent:subtitle:${sub.language}`, sub.id])
        .map(([key, value]) => ({ [key as string]: value as string }))
        .reduce((p, c) => Object.assign(p, c), {})

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
            TE.bind("subtitles", () =>
                getSubtitles(context.subtitlesRepo)([
                    "en" as LanguageT,
                    "gr" as LanguageT,
                ])(params.imdbId)
            ),
            TE.map(
                ({ torrents, instantAvailability, subtitles }) =>
                    ({
                        headline: params.title,
                        type: "pages",
                        template: {
                            type: "button",
                            layout: "0,0,4,2",
                            color: "msx-glass",
                            icon: "blank",
                            iconSize: "medium",
                            title: "Seeders",
                            titleFooter: "File Size",
                            properties: parseSubtitles(subtitles),
                        },
                        items: torrents
                            .sort(sortTorrents(params.player == "remote"))
                            .map((torrent, i) => {
                                return {
                                    icon: resolutionIcons[
                                        indexOfResolution(torrent.resolution)
                                    ],
                                    title: `${torrent.seeders}{sp}{ico:group}`,
                                    titleFooter: String(filesize(torrent.size)),
                                    tagColor: "msx-green",
                                    tag:
                                        params.player == "remote" &&
                                        instantAvailability[i]
                                            ? "{ico:offline-bolt}"
                                            : "",
                                    action: `video:plugin:pluginUrl?url=${context.matchers.stream.formatter.run(
                                        R.Route.empty,
                                        {
                                            magnet: torrent.magnetURI,
                                            fileIdx: String(torrent.fileIdx),
                                        }
                                    )}`,
                                } satisfies MsxContentItem
                            }),
                    } satisfies MsxContentRoot)
            )
        ),
}
