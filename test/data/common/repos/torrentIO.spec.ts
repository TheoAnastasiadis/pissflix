import { TorrentIoRepo } from "../../../../src/data/common/repos/torrentioIO"
import * as E from "fp-ts/Either"

const validImdbId = "tt3581920"

describe("Torrent IO Repo", () => {
    test("get movies by imdb id", async () => {
        const result = await TorrentIoRepo.getTorrentsByImdbId(validImdbId)()
        expect(E.isRight(result)).toBeTruthy()
    })
})
