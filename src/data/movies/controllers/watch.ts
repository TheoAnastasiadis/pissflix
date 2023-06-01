import { identity, pipe } from "fp-ts/lib/function"
import { Controller } from "../../../core/sharedObjects/controller"
import { TorrentRepo } from "../../../domain/common/repos/torrent.repo"
import * as E from "fp-ts/Either"
import * as TE from "fp-ts/TaskEither"
import * as A from "fp-ts/Array"
import * as TO from "fp-ts/TaskOption"
import * as t from "io-ts"
import * as R from "fp-ts-routing"
import { filesize } from "filesize"
import any from "promise.any"
import {
    MsxContentItem,
    MsxContentRoot,
} from "../../../core/msxUI/contentObjects"
import { Icon } from "../../../core/msxUI/icon"
import { indexOfResolution } from "../../../domain/common/entities/resolution"
import { TorrentT } from "../../../domain/common/entities/torrent"
import { DebridProviderRepo } from "../../../domain/common/repos/debridProvider.repo"
import _ from "lodash/fp"
import { checkIfFileAvailable } from "../../../domain/common/useCases/checkIfFileAvailable"
import { getTorrentsById } from "../../../domain/common/useCases/getTorrentsById"
import { MovieContext } from "../../../domain/movies/controllers/context"
import { watchParams } from "../../../domain/movies/controllers/params"

const resolutionIcons: Icon[] = ["sd", "hd", "hd", "2k", "4k", "8k"]

const getOneofResolution: (
    entries: TorrentT[],
    repo: DebridProviderRepo
) => TO.TaskOption<TorrentT> = (
    entries: TorrentT[],
    repo: DebridProviderRepo
) =>
    pipe(
        TO.tryCatch(() =>
            any(
                entries.map((torrent) =>
                    checkIfFileAvailable(repo)(torrent.fileIdx)(
                        torrent.magnetURI
                    )
                )
            )
        ),
        TO.map((magnet) =>
            entries.filter((torrent) => torrent.magnetURI == magnet)
        ),
        TO.chain(TO.fromPredicate((torrent) => torrent.length > 0)),
        TO.map((torrents) => torrents[0])
    )

const getOneOfEachResolution: (
    repo: DebridProviderRepo
) => (torrents: TorrentT[]) => TE.TaskEither<string, TorrentT[]> =
    (repo) => (torrents) =>
        pipe(
            torrents,
            _.groupBy((torrent) => indexOfResolution(torrent.resolution)),
            Object.entries,
            A.map(([resolution, entries]) => getOneofResolution(entries, repo)),
            A.sequence(TO.ApplicativePar),
            TE.fromTaskOption(
                () =>
                    "Unofrtunately no links are available for this title from your Debrid Provider. Try local play instead."
            )
        )

const toRemoteContent: (
    imdbId: string,
    title: string,
    torrentRepo: TorrentRepo,
    debridRepo: DebridProviderRepo
) => TE.TaskEither<string, MsxContentRoot> = (
    imdbId,
    title,
    torrentRepo,
    debridRepo
) =>
    pipe(
        imdbId,
        getTorrentsById(torrentRepo),
        TE.chain(getOneOfEachResolution(debridRepo)),
        TE.map(
            (torrents) =>
                ({
                    headline: title,
                    type: "pages",
                    template: {
                        type: "button",
                        layout: "0,0,4,2",
                        color: "msx-glass",
                        icon: "blank",
                        iconSize: "medium",
                        title: title,
                        titleFooter: "Available{sp}{ico:check-circle}",
                    },
                    items: torrents.map(
                        (torrent) =>
                            ({
                                icon: resolutionIcons[
                                    indexOfResolution(torrent.resolution)
                                ],
                                titleFooter: filesize(torrent.size),
                            } as MsxContentItem)
                    ),
                } as MsxContentRoot)
        )
    )

const toLocalContent: (
    imdbId: string,
    title: string,
    repo: TorrentRepo
) => TE.TaskEither<string, MsxContentRoot> = (imdbId, title, repo) =>
    pipe(
        imdbId,
        getTorrentsById(repo),
        TE.map(
            (torrents) =>
                ({
                    headline: title,
                    type: "pages",
                    template: {
                        type: "button",
                        layout: "0,0,4,2",
                        color: "msx-glass",
                        icon: "blank",
                        iconSize: "medium",
                        title: "Seeders",
                        titleFooter: "File Size",
                    },
                    items: torrents.map(
                        (torrent) =>
                            ({
                                icon: resolutionIcons[
                                    indexOfResolution(torrent.resolution)
                                ],
                                title: `${torrent.seeders}{sp}{ico:group}`,
                                titleFooter: filesize(torrent.size),
                            } as MsxContentItem)
                    ),
                } as MsxContentRoot)
        )
    )

export const watchView: Controller<
    MovieContext,
    t.TypeOf<typeof watchParams>
> = {
    _tag: "view",
    render: (context) => (params) =>
        pipe(
            params.player,
            E.fromPredicate(
                (player) => player == "remote", //player : "remote" | "local"
                identity
            ),
            E.map(() =>
                toRemoteContent(
                    params.imdbId,
                    params.title,
                    context.torrentRepo,
                    context.debridRepo
                )
            ),
            E.getOrElse(() =>
                toLocalContent(params.imdbId, params.title, context.torrentRepo)
            )
        ),
}
