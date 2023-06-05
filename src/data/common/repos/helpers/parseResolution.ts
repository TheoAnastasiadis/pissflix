import { pipe } from "fp-ts/lib/function"
import {
    Resolution,
    fuzzyMatchResolution,
} from "../../../../domain/common/entities/resolution"
import torrentTitleParser from "parse-torrent-title"
import * as E from "fp-ts/Either"
import * as t from "io-ts"

export const parseResolution: (torrent: {
    name?: string
    title?: string
}) => t.TypeOf<typeof Resolution> = (torrent) =>
    pipe(
        torrent,
        (torrent) => (torrent.title ? torrent.title : ""),
        torrentTitleParser.parse,
        (result) => result.resolution || torrent.name || "Unknown",
        fuzzyMatchResolution,
        Resolution.decode,
        E.getOrElse(() => "Unknown" as t.TypeOf<typeof Resolution>)
    )
