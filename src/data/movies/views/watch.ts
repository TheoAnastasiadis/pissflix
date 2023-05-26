import { identity, pipe } from "fp-ts/lib/function"
import { View } from "../../../core/sharedObjects/view"
import { watchParams } from "../../../domain/movies/views"
import { TorrentRepo } from "../../../domain/common/repos/torrent.repo"
import * as E from "fp-ts/Either"
import * as TE from "fp-ts/TaskEither"
import * as A from "fp-ts/Array"
import * as TO from "fp-ts/TaskOption"
import {filesize} from 'filesize'
import any from "promise.any"
import {
    MsxContentItem,
    MsxContentRoot,
} from "../../../core/msxUI/contentObjects"
import { errorPage } from "./helpers/errorPage"
import { Icon } from "../../../core/msxUI/icon"
import { indexOfResolution } from "../../../domain/common/entities/resolution"
import { TorrentT } from "../../../domain/common/entities/torrent"
import { DebridProviderRepo } from "../../../domain/common/repos/debridProvider.repo"
import _ from "lodash/fp"
import { checkIfFileAvailable } from "../../../domain/common/useCases/checkIfFileAvailable"
import { getTorrentsById } from "../../../domain/common/useCases/getTorrentById"

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
                    checkIfFileAvailable(repo)(torrent.fileIdx)(torrent.magnetURI)
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
) => TE.TaskEither<MsxContentRoot, MsxContentRoot> = (
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
        ),
        TE.mapLeft(errorPage)
    )

const toLocalContent: (
    imdbId: string,
    title: string,
    repo: TorrentRepo
) => TE.TaskEither<MsxContentRoot, MsxContentRoot> = (imdbId, title, repo) =>
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
        ),
        TE.mapLeft(errorPage)
    )

export const watchView: View<
    { torrentRepo: TorrentRepo; debridRepo: DebridProviderRepo },
    typeof watchParams
> =
    (context: { torrentRepo: TorrentRepo; debridRepo: DebridProviderRepo }) =>
    (decoder: typeof watchParams) =>
    (params: any) =>
        pipe(
            TE.of(params),
            decoder.decode,
            E.mapLeft(
                () => `You have to provide imdbId, player and title params`
            ),
            E.map((query) =>
                pipe(
                    query,
                    E.fromPredicate(
                        (query) => query.player == "remote",
                        identity
                    ),
                    E.map((query) =>
                        toRemoteContent(
                            query.imdbId,
                            query.title,
                            context.torrentRepo,
                            context.debridRepo
                        )
                    ),
                    E.getOrElse((query) =>
                        toLocalContent(
                            query.imdbId,
                            query.title,
                            context.torrentRepo
                        )
                    )
                )
            ),
            E.getOrElseW((error) => TE.left(errorPage(error)))
        )
