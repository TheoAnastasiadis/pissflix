import { RealDebridRepo } from "../../../../src/data/common/repos/realDebrid"
import { MagnetURIT } from "../../../../src/domain/common/entities/magnetURI"
import * as E from "fp-ts/Either"
import * as O from 'fp-ts/Option'

const validMagnetURI: MagnetURIT = "magnet:?xt=urn:btih:2443964D2E1336C9153B2C99F6955422DFD71188&dn=Battleship+Potemkin+%281925%29+%5BBluRay%5D+%5B1080p%5D+%5BYTS%5D+%5BYIFY%5D" //Battleship Potemkin

describe("Real Debrid Repo", () => {
    
    it("should return stream link from valid MagnetURI", async () => {
        const streamingLink = await RealDebridRepo.getStreamingLink(
            validMagnetURI
        )(1)()
        expect(E.isRight(streamingLink)).toBeTruthy()
    })

    const invalidMagnetURI: MagnetURIT = `magnet:?xt=urn:btih:1234`

    it("should return error string from non existent MagnetURI", async () => {
        const streamingLink = await RealDebridRepo.getStreamingLink(
            invalidMagnetURI
        )(1)()
        expect(E.isRight(streamingLink)).toBeFalsy()
    })

    it("should return availablity of magnet URI on Real Debrid", async () => {
        const response = await RealDebridRepo.checkIfAvailable(validMagnetURI)()
        expect(O.isSome(response)).toBeTruthy()
    })
})
