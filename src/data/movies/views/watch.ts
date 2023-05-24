import { pipe } from "fp-ts/lib/function"
import { View } from "../../../core/sharedObjects/view"
import { watchParams } from "../../../domain/movies/views"
import { TorrentRepo } from "../../../domain/common/repos/torrent.repo"

export const watchView: View<{ repo: TorrentRepo }, typeof watchParams> =
    (context: { repo: TorrentRepo }) =>
    (decoder: typeof watchParams) =>
    (params: any) =>
        pipe()
