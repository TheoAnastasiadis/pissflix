import { MsxContentRoot } from "../../../../src/core/msxUI/contentObjects"
import { SeriesControllersImpl } from "../../../../src/data/series/controllers"
import { mockSeriesContext } from "./testObjects"
import * as E from "fp-ts/Either"

describe("season view", () => {
    test("expected output", async () => {
        const result = await SeriesControllersImpl.series.render(
            mockSeriesContext
        )({ id: "0" })()

        expect(result).toHaveProperty("right")
        expect((result as E.Right<MsxContentRoot>).right).toHaveProperty(
            "header"
        )
        expect((result as E.Right<MsxContentRoot>).right.items).toHaveLength(4) //test object returns 4 seasons
    })
})
