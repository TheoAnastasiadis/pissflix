import { MsxContentRoot } from "../../../../src/core/msxUI/contentObjects"
import { PControllersImpl } from "../../../../src/data/porn/controllers"
import { mockPContext } from "./testPbjects"
import * as E from "fp-ts/Either"

describe("sections controller", () => {
    test("expected behaviour", async () => {
        const result = await PControllersImpl.sections.render(mockPContext)(
            {}
        )()

        expect(result._tag).toBe("Right")
        expect(
            (result as E.Right<MsxContentRoot>).right.pages?.[0].items
        ).toHaveLength(5)
    })
})
