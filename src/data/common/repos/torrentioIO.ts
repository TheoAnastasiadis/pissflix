import { pipe } from "fp-ts/lib/function"
import * as TE from "fp-ts/TaskEither"
import * as E from "fp-ts/Either"
import * as t from "io-ts"
import axios from "axios"
import { succesfullTorrentIOResponse } from "./helpers/torrentioSchemas"
import torrentTitleParser from "parse-torrent-title"

import ParseTorrent from "parse-torrent"
import {
    fuzzyMatchResolution,
    Resolution,
    VideoResolution,
} from "../../../domain/common/entities/resolution"
import { TorrentT } from "../../../domain/common/entities/torrent"
import { TorrentRepo } from "../../../domain/common/repos/torrent.repo"

const api = axios.create()

const toTorrent: (
    data: t.TypeOf<typeof succesfullTorrentIOResponse>
) => TorrentT[] = (data) =>
    data.streams.map((torrent) => ({
        title: torrent.title || "Unknown title",
        magnetURI: ParseTorrent.toMagnetURI({
            infoHash: torrent.infoHash,
            announce: torrent.sources,
        }),
        fileIdx: torrent.fileIdx || 0,
        size: 7,
        seeders: 7,
        resolution: pipe(
            torrent,
            (torrent) => (torrent.title ? torrent.title : ""),
            torrentTitleParser.parse,
            (result) => result.resolution || "Unknown",
            fuzzyMatchResolution,
            Resolution.decode,
            E.getOrElse(() => `Unknown` as t.Branded<string, VideoResolution>)
        ),
    }))

export const TorrentIoRepo: TorrentRepo = {
    getTorrentsByImdbId: (imdbId: string) =>
        pipe(
            TE.tryCatch(
                () =>
                    api.get(
                        `https://torrentio.strem.fun/stream/movie/${imdbId}.json`
                    ),
                () => `Torrent server did not response succesfully.`
            ),
            TE.map((response) => response.data),
            TE.chain((data) =>
                pipe(
                    data,
                    succesfullTorrentIOResponse.decode,
                    E.mapLeft(
                        () =>
                            `Torrent server response was not in the expected format`
                    ),
                    TE.fromEither
                )
            ),
            TE.map(toTorrent)
        ),
}
