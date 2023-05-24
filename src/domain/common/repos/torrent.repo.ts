import * as TE from "fp-ts/TaskEither"
import { TorrentT } from "../entities/torrent"

export type TorrentRepo = {
    getTorrentsByImdbId(id: string): TE.TaskEither<string, TorrentT[]>
}
