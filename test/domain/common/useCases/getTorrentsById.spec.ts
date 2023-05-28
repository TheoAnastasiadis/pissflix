import { getTorrentsById } from "../../../../src/domain/common/useCases/getTorrentsById"
import { mockedTorrentRepoInstance } from "./testObjects"
import * as E from "fp-ts/Either"
import { TorrentT } from "../../../../src/domain/common/entities/torrent"
import { MagnetURI } from "../../../../src/domain/common/entities/magnetURI"

describe("get torrents by imdb id", () => {
    test("with valid imdbid return a list of torrents", async () => {
        const torrents = await getTorrentsById(mockedTorrentRepoInstance)(
            "tt1234"
        )()
        expect(E.isRight(torrents)).toBeTruthy()
        expect((torrents as E.Right<TorrentT[]>).right).toHaveLength(10)
    })
    test("with invalid imdbid return empty list", async () => {
        const torrents = await getTorrentsById(mockedTorrentRepoInstance)(
            "tt5678"
        )()
        expect(E.isRight(torrents)).toBeTruthy()
        expect((torrents as E.Right<TorrentT[]>).right).toHaveLength(0)
    })
})
