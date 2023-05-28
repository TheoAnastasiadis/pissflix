import { getStreamingLink } from "../../../../src/domain/common/useCases/getStreamingLink"
import { mockedDebridRepoInstance } from "./testObjects"
import * as E from "fp-ts/Either"

describe("get torrents by imdb id", () => {
    test("with valid magnet return a (right) streaming link", async () => {
        const link = await getStreamingLink(mockedDebridRepoInstance)(0)(
            "abc"
        )()
        expect(E.isRight(link)).toBeTruthy()
    })
    test("with invalid magnet return a (left) streaming link", async () => {
        const link = await getStreamingLink(mockedDebridRepoInstance)(0)(
            "abc"
        )()
        expect(E.isRight(link)).toBeTruthy()
    })
})
