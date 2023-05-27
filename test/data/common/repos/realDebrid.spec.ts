import ParseTorrent from "parse-torrent"
import { RealDebridRepo } from "../../../../src/data/common/repos/realDebrid"
import { MagnetURI } from "../../../../src/domain/common/entities/magnetURI"
import * as E from "fp-ts/Either"

import * as dotenv from "dotenv"
dotenv.config()

describe("Real Debrid Repo", () => {
    const validMagnetURI: MagnetURI = ParseTorrent.toMagnetURI(
        ParseTorrent(process.env.EXAMPLE_MAGNET_URI as string)
    )

    it("should return stream link from valid MagnetURI", async () => {
        const streamingLink = await RealDebridRepo.getStreamingLink(
            validMagnetURI
        )(1)()
        expect(E.isRight(streamingLink)).toBeTruthy()
    })

    const invalidMagnetURI: MagnetURI = `magnet:?xt=urn:btih:1234`

    it("should return error string from non existent MagnetURI", async () => {
        const streamingLink = await RealDebridRepo.getStreamingLink(
            invalidMagnetURI
        )(1)()
        expect(E.isRight(streamingLink)).toBeFalsy()
    })

    it("should return availablity of magnet URI on Real Debrid", async () => {
        await RealDebridRepo.checkIfAvailable(validMagnetURI)
            .then((value) => expect(value).toBeTruthy())
            .catch(() => expect(false).toBeTruthy())
    })
})
