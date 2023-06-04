import { MsxContentRoot } from "../../../../src/core/msxUI/contentObjects"
import { searchView } from "../../../../src/data/movies/controllers/search"

import { mockedContext } from "./testObjects"
import * as E from "fp-ts/Either"

describe("search view", () => {
    test("returns the search view", async () => {
        const content = (
            (await searchView.render(mockedContext)({
                query: "abcd?",
            })()) as E.Right<MsxContentRoot>
        ).right

        expect(content.pages?.at(0)?.items).toHaveLength(33)
        expect(content.pages?.at(1)?.items).toHaveLength(11)
    })
})
