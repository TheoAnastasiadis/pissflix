import { MsxServerResponse } from "../../../../src/core/msxUI/response"
import { PornControllersImpl } from "../../../../src/data/porn/controllers"
import { mockPContext } from "./testPbjects"
import * as E from "fp-ts/Either"

describe("sections controller", () => {
    test("expected behaviour", async () => {
        const result = await PornControllersImpl.backdrop.render(mockPContext)({
            query: "true love",
        })()

        expect(result._tag).toBe("Right")
        expect(
            (result as E.Right<MsxServerResponse>).right.response.data
        ).toHaveProperty("action")
    })
})
