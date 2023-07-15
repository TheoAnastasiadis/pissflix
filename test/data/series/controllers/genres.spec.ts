import { MsxContentRoot } from "../../../../src/core/msxUI/contentObjects"
import { SeriesControllersImpl } from "../../../../src/data/series/controllers"
import { mockSeriesContext } from "./testObjects"
import * as E from "fp-ts/Either"

describe("genres view", () => {
    test("expected output", async () => {
        const result = await SeriesControllersImpl.genres.render(
            mockSeriesContext
        )({})()

        expect(result).toHaveProperty("right")
        expect((result as E.Right<MsxContentRoot>).right).toHaveProperty(
            "header"
        )
        expect((result as E.Right<MsxContentRoot>).right.items).toHaveLength(16)
    })
})
