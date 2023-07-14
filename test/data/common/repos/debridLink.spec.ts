import { MagnetURIT } from "../../../../src/domain/common/entities/magnetURI"
import { DebridLinkRepo } from "../../../../src/data/common/repos/debridLink"
import * as E from "fp-ts/Either"
import * as O from "fp-ts/Option"

const validMagnetURI: MagnetURIT =
    "magnet:?xt=urn:btih:2443964D2E1336C9153B2C99F6955422DFD71188&dn=Battleship+Potemkin+%281925%29+%5BBluRay%5D+%5B1080p%5D+%5BYTS%5D+%5BYIFY%5D" //Battleship Potemkin

describe("Real Debrid Repo", () => {
    it.skip("should return stream link from valid MagnetURI", async () => {
        const streamingLink = await DebridLinkRepo.getStreamingLink(
            validMagnetURI
        )(0)()
        console.warn(streamingLink)
        expect(E.isRight(streamingLink)).toBeTruthy()
    })

    const invalidMagnetURI: MagnetURIT = `abcd`

    it.skip("should return error string from non existent MagnetURI", async () => {
        const streamingLink = await DebridLinkRepo.getStreamingLink(
            invalidMagnetURI
        )(1)()
        expect(E.isRight(streamingLink)).toBeFalsy()
    })

    it.skip("should return availablity of magnet URI on Real Debrid", async () => {
        const response = await DebridLinkRepo.checkIfAvailable(validMagnetURI)()
        expect(O.isSome(response)).toBeTruthy()
    })
})
