import * as t from "io-ts"
import ParseTorrent from "parse-torrent"

export const MagnetURI = new t.Type<string, string, unknown>(
    "resolution",
    (input: unknown): input is string =>
        typeof input === "string" && !!ParseTorrent(input).infoHash,
    (input: unknown, context) => {
        console.warn(ParseTorrent(input as any))
        if (typeof input === "string" && !!ParseTorrent(input).infoHash)
            return t.success(input)
        else return t.failure(input, context)
    },
    t.identity
)

export type MagnetURIT = t.TypeOf<typeof MagnetURI>
