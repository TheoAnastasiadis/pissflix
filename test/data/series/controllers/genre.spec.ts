import { MsxContentRoot } from "../../../../src/core/msxUI/contentObjects"
import { SeriesControllersImpl } from "../../../../src/data/series/controllers"
import { mockSeriesContext } from "./testObjects"
import * as E from "fp-ts/Either"

describe("single genre view", () => {
    test("expected output", async () => {
        const result = await SeriesControllersImpl.genre.render(
            mockSeriesContext
        )({ id: "16", page: "0" })()

        expect(result).toHaveProperty("right")
        expect((result as E.Right<MsxContentRoot>).right).toHaveProperty(
            "header"
        )
        expect((result as E.Right<MsxContentRoot>).right).toHaveProperty(
            "footer"
        )
        expect((result as E.Right<MsxContentRoot>).right.items).toHaveLength(20)
    })
})
