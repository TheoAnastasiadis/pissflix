import { getStreamingLink } from "../../../../src/domain/common/useCases/getStreamingLink"
import {
    badTorrent,
    goodTorrent,
    mockedDebridRepoInstance,
} from "./testObjects"
import * as E from "fp-ts/Either"

describe("get torrents by imdb id", () => {
    test("with valid magnet return a (right) streaming link", async () => {
        const link = await getStreamingLink(mockedDebridRepoInstance)(
            goodTorrent.fileIdx
        )(goodTorrent.magnetURI)()
        expect(E.isRight(link)).toBeTruthy()
    })
    test("with invalid magnet return a (left) streaming link", async () => {
        const link = await getStreamingLink(mockedDebridRepoInstance)(
            badTorrent.fileIdx
        )(badTorrent.magnetURI)()
        expect(E.isRight(link)).toBeFalsy()
    })
})
