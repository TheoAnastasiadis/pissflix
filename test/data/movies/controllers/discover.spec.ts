import { discoverView } from "../../../../src/data/movies/controllers/discover"
import { mockedContext } from "./testObjects"
import * as t from "io-ts"
import * as TE from "fp-ts/TaskEither"
import * as E from "fp-ts/Either"
import {
    MsxContentPage,
    MsxContentRoot,
} from "../../../../src/core/msxUI/contentObjects"

describe("discover view", () => {
    test("returns discover view", async () => {
        const content = (
            (await discoverView.render(mockedContext)(t.type({}))(
                {}
            )()) as E.Right<MsxContentRoot>
        ).right

        console.log(JSON.stringify(content, undefined, 2))
        expect(content.pages).toHaveLength(2)
        expect(content?.pages?.at(0)?.items?.at(-1)?.action).toMatch(
            /trending=day$/
        )
        expect(content?.pages?.at(1)?.items?.at(-1)?.action).toMatch(
            /trending=week$/
        )
    })
})
