import * as t from "io-ts"
import { MagnetURI } from "./magnetURI"
import { Resolution } from "./resolution"

export const torrent = t.type({
    title: t.string,
    magnetURI: MagnetURI,
    fileIdx: t.number, //the file to be streamed
    size: t.number, //in GB
    seeders: t.number,
    resolution: Resolution,
    imdbId: t.string,
})

export type TorrentT = t.TypeOf<typeof torrent>
