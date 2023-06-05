import { pipe } from "fp-ts/lib/function"
import * as TE from "fp-ts/TaskEither"
import * as E from "fp-ts/Either"
import * as t from "io-ts"
import axios from "axios"
import { succesfullTorrentIOResponse } from "./helpers/torrentioSchemas"
import ParseTorrent from "parse-torrent"
import { TorrentT } from "../../../domain/common/entities/torrent"
import { TorrentRepo } from "../../../domain/common/repos/torrent.repo"
import { parseFileSize } from "./helpers/parseFileSize"
import { parseSeeders } from "./helpers/parseSeeders"
import { parseResolution } from "./helpers/parseResolution"

const api = axios.create()

//helpers
const toTorrent: (
    imdbId: string
) => (data: t.TypeOf<typeof succesfullTorrentIOResponse>) => TorrentT[] =
    (imdbId) => (data) =>
        data.streams.map((torrent) => ({
            title: torrent.title || "Unknown title",
            magnetURI: ParseTorrent.toMagnetURI({
                infoHash: torrent.infoHash,
                announce: torrent.sources,
            }),
            fileIdx: torrent.fileIdx || 0,
            size: parseFileSize(torrent.title || ""),
            seeders: parseSeeders(torrent.title || ""),
            resolution: parseResolution(torrent),
            imdbId,
        }))

export const TorrentIoRepo: TorrentRepo = {
    getTorrentsByImdbId: (imdbId: string) =>
        pipe(
            TE.tryCatch(
                () =>
                    api.get(
                        `https://torrentio.strem.fun/stream/movie/${imdbId}.json`
                    ),
                () => `Torrent server did not response succesfully.` //if code != 202
            ),
            TE.map((response) => response.data),
            TE.chain((data) =>
                pipe(
                    data,
                    succesfullTorrentIOResponse.decode,
                    E.mapLeft(
                        () =>
                            `Torrent server response was not in the expected format` //if response cannot be parsed
                    ),
                    TE.fromEither
                )
            ),
            TE.map(toTorrent(imdbId))
        ),
}
