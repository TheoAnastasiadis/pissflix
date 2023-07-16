import { MsxContentRoot } from "../../../../src/core/msxUI/contentObjects"
import { MsxServerResponse } from "../../../../src/core/msxUI/response"
import { PControllersImpl } from "../../../../src/data/porn/controllers"
import { mockPContext } from "./testPbjects"
import * as E from "fp-ts/Either"

describe("sections controller", () => {
    test("expected behaviour", async () => {
        const result = await PControllersImpl.backdrop.render(mockPContext)({
            query: "true love",
        })()

        expect(result._tag).toBe("Right")
        expect(
            (result as E.Right<MsxServerResponse>).right.response.data
        ).toHaveProperty("action")
    })
})
