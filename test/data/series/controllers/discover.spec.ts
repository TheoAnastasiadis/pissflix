import { MsxContentRoot } from "../../../../src/core/msxUI/contentObjects"
import { SeriesControllersImpl } from "../../../../src/data/series/controllers"
import { mockSeriesContext } from "./testObjects"
import * as E from "fp-ts/Either"

describe("discover view", () => {
    test("expected output", async () => {
        const result = await SeriesControllersImpl.discover.render(
            mockSeriesContext
        )({})()

        expect(result).toHaveProperty("right")
        expect((result as E.Right<MsxContentRoot>).right.pages).toHaveLength(2)
    })
})
