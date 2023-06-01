import { discoverView } from "../../../../src/data/movies/controllers/discover"
import { mockedContext } from "./testObjects"
import * as E from "fp-ts/Either"
import {
    MsxContentPage,
    MsxContentRoot,
} from "../../../../src/core/msxUI/contentObjects"

describe("discover view", () => {
    test("returns discover view", async () => {
        const content = (
            (await discoverView.render(mockedContext)(
                {}
            )()) as E.Right<MsxContentRoot>
        ).right

        console.log(JSON.stringify(content, undefined, 2))
        expect(content.pages).toHaveLength(2)
    })
})
