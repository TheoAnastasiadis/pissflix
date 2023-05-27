import {
    MsxContentRoot,
    MsxContentItem,
} from "../../../../src/core/msxUI/contentObjects"
import { mockedContext } from "./testObjects"
import { genresView } from "../../../../src/data/movies/controllers/genres"
import * as t from "io-ts"
import * as E from "fp-ts/Either"
import { tmdbGenres } from "../../../../src/data/movies/repos/helpers/tmdbGenres"

describe("genres view", () => {
    test("returns genres view", async () => {
        const content = (
            (await genresView.render(mockedContext)(t.type({}))(
                {}
            )()) as E.Right<MsxContentRoot>
        ).right

        expect(content.pages).toHaveLength(tmdbGenres.length)
        content.pages?.map((page, i) => {
            expect(
                (page.items as [...MsxContentItem[], MsxContentItem])[6].action
            ).toEqual(
                `panel:${
                    mockedContext.absolutePaths.panel
                }?${new URLSearchParams({
                    genre: String(tmdbGenres[i].uniqueId),
                })}`
            )
        })
    })
})
