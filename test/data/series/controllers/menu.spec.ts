import { MsxMenu } from "../../../../src/core/msxUI/menuObject"
import { SeriesControllersImpl } from "../../../../src/data/series/controllers"
import { mockSeriesContext } from "./testObjects"
import * as E from "fp-ts/Either"

describe("menu view", () => {
    test("expected output", async () => {
        const result = await SeriesControllersImpl.menu.render(
            mockSeriesContext
        )({})()

        expect(result).toHaveProperty("right")
        expect((result as E.Right<MsxMenu>).right.menu).toHaveLength(4)
    })
})
