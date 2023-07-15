import { MsxContentRoot } from "../../../../src/core/msxUI/contentObjects"
import { SeriesControllersImpl } from "../../../../src/data/series/controllers"
import { mockSeriesContext } from "./testObjects"
import * as E from "fp-ts/Either"

describe("search view", () => {
    test("returns the search view", async () => {
        const content = await SeriesControllersImpl.search.render(
            mockSeriesContext
        )({
            query: "abcd?",
        })()

        expect(E.isRight(content)).toBeTruthy()
        expect(
            (content as E.Right<MsxContentRoot>).right.pages?.at(0)?.items
        ).toHaveLength(33)
        expect(
            (content as E.Right<MsxContentRoot>).right.pages?.at(1)?.items
        ).toHaveLength(11)
    })
})
