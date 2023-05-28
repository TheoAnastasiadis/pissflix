import { TorrentIoRepo } from "../../../../src/data/common/repos/torrentioIO"
import * as E from "fp-ts/Either"
import { MagnetURI } from "../../../../src/domain/common/entities/magnetURI"

const validImdbId = "tt3581920"

describe("Torrent IO Repo", () => {
    test("get movies by imdb id", async () => {
        const result = await TorrentIoRepo.getTorrentsByImdbId(validImdbId)()
        expect(E.isRight(result)).toBeTruthy()
        if (E.isRight(result)) {
            for (const torrent of result.right) {
                expect(MagnetURI.encode(torrent.magnetURI)).toBe(
                    torrent.magnetURI
                ) //if the result is the same as the input then torrent.MagnetURI is a valid MagnetURI entity
            }
        }
    })
})
