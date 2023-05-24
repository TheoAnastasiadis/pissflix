import * as t from "io-ts"
import ParseTorrent from "parse-torrent"

export const MagnetURI = new t.Type<string, string, unknown>(
    "resolution",
    (input: unknown): input is string =>
        typeof input === "string" &&
        !ParseTorrent(input).infoHash &&
        !!ParseTorrent(input).announce,
    (input: unknown, context) =>
        typeof input === "string" &&
        !ParseTorrent(input).infoHash &&
        !!ParseTorrent(input).announce
            ? t.success(input)
            : t.failure(input, context),
    t.identity
)

export type MagnetURI = t.TypeOf<typeof MagnetURI>
