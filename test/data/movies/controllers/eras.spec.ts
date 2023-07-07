import { erasView } from "../../../../src/data/movies/controllers/eras"
import { mockedContext } from "./testObjects"
import * as E from "fp-ts/Either"
import {
    MsxContentItem,
    MsxContentRoot,
} from "../../../../src/core/msxUI/contentObjects"

describe("test view", () => {
    test("returns test view", async () => {
        const content = (
            (await erasView.render(mockedContext)(
                {}
            )()) as E.Right<MsxContentRoot>
        ).right

        expect(content.pages).toHaveLength(10)
    })
})
