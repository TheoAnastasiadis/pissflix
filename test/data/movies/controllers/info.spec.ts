import { infoView } from "../../../../src/data/movies/controllers/info"
import { mockedContext } from "./testObjects"
import * as t from "io-ts"
import * as E from "fp-ts/Either"
import { MsxContentRoot } from "../../../../src/core/msxUI/contentObjects"

describe("info view", () => {
    test("it returns the info view", async () => {
        const content = (
            (await infoView.render(mockedContext)(t.type({ id: t.number }))({
                id: 12345,
            })()) as E.Right<MsxContentRoot>
        ).right

        expect(content.pages?.at(0)?.items?.at(-2)?.action).toMatch(
            /imdbId=tt\d*&player=local$/gm
        )

        expect(content.pages?.at(0)?.items?.at(-1)?.action).toMatch(
            /imdbId=tt\d*&player=remote$/gm
        )
    })
})
