import * as t from "io-ts"
import * as TE from "fp-ts/TaskEither"
import { TorrentT } from "../entities/torrent"
import { MagnetURI } from "../entities/magnetURI"

export type TorrentRepo = {
    getTorrentsByImdbId(id: string): TE.TaskEither<string, TorrentT[]>
    getStreamingLink(
        magnet: MagnetURI
    ): (fileIdx: number) => TE.TaskEither<string, string>
}
