import { MsxContentRoot } from "../../../../src/core/msxUI/contentObjects"
import { mockedContext } from "./testObjects"
import { genresView } from "../../../../src/data/movies/controllers/genres"
import * as E from "fp-ts/Either"
import { tmdbGenres } from "../../../../src/data/movies/repos/helpers/tmdbGenres"

describe("genres view", () => {
    test("returns genres view", async () => {
        const content = (
            (await genresView.render(mockedContext)(
                {}
            )()) as E.Right<MsxContentRoot>
        ).right

        expect(content.pages).toHaveLength(tmdbGenres.length)
    })
})
