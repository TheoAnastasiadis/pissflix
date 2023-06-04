import {
    MsxContentRoot,
    MsxContentItem,
} from "../../../../src/core/msxUI/contentObjects"
import { mockedContext } from "./testObjects"
import { regionsView } from "../../../../src/data/movies/controllers/regions"
import * as E from "fp-ts/Either"
import { regions } from "../../../../src/core/sharedObjects/regions"

describe("regions view", () => {
    test("returns regions view", async () => {
        const content = (
            (await regionsView.render(mockedContext)(
                {}
            )()) as E.Right<MsxContentRoot>
        ).right

        expect(content.pages).toHaveLength(Object.keys(regions).length)
    })
})
