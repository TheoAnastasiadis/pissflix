import { MsxContentRoot } from "../../../../src/core/msxUI/contentObjects"
import { watchView } from "../../../../src/data/movies/controllers/watch"
import { mockedContext } from "./testObjects"
import * as E from "fp-ts/Either"

describe("watch view", () => {
    test("returns the correct view", async () => {
        const content = (
            (await watchView.render(mockedContext)({
                imdbId: "tt123456",
                player: "local",
                title: "Title",
            })()) as E.Right<MsxContentRoot>
        ).right

        expect(content.items).toHaveLength(10)
    })
})
