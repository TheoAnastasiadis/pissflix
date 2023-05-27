import {
    MsxContentRoot,
    MsxContentItem,
} from "../../../../src/core/msxUI/contentObjects"
import { mockedContext } from "./testObjects"
import { regionsView } from "../../../../src/data/movies/controllers/regions"
import * as t from "io-ts"
import * as E from "fp-ts/Either"
import { regions } from "../../../../src/core/sharedObjects/regions"

describe("regions view", () => {
    test("returns regions view", async () => {
        const content = (
            (await regionsView.render(mockedContext)(t.type({}))(
                {}
            )()) as E.Right<MsxContentRoot>
        ).right

        expect(content.pages).toHaveLength(regions.length)
        content.pages?.map((page, i) => {
            expect(
                (page.items as [...MsxContentItem[], MsxContentItem])[6].action
            ).toEqual(
                `panel:${
                    mockedContext.absolutePaths.panel
                }?${new URLSearchParams({ region: regions[i].name })}`
            )
        })
    })
})
