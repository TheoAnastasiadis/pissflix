import { TorrentRepo } from "../repos/torrent.repo"

export const getTorrentsById = (repo: TorrentRepo) => (id: string) =>
    repo.getTorrentsByImdbId(id)
