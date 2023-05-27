import { erasView } from "../../../../src/data/movies/controllers/eras"
import { mockedContext } from "./testObjects"
import * as t from "io-ts"
import * as TE from "fp-ts/TaskEither"
import * as E from "fp-ts/Either"
import {
    MsxContentItem,
    MsxContentPage,
    MsxContentRoot,
} from "../../../../src/core/msxUI/contentObjects"
describe("test view", () => {
    test("returns test view", async () => {
        const content = (
            (await erasView.render(mockedContext)(t.type({}))(
                {}
            )()) as E.Right<MsxContentRoot>
        ).right

        expect(content.pages).toHaveLength(10)
        content.pages?.map((page, i) => {
            expect(
                (page.items as [...MsxContentItem[], MsxContentItem])[6].action
            ).toEqual(
                `panel:${
                    mockedContext.absolutePaths.panel
                }?${new URLSearchParams({
                    decade: String(1920 + i * 10),
                }).toString()}`
            )
        })
    })
})
