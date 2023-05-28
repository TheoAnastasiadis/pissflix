import { MsxContentRoot } from "../../../../src/core/msxUI/contentObjects"
import { watchView } from "../../../../src/data/movies/controllers/watch"
import { watchParams } from "../../../../src/domain/movies/controllers"
import { mockedContext } from "./testObjects"
import * as E from "fp-ts/Either"

describe("watch view", () => {
    test("with local player", async () => {
        const content = (
            (await watchView.render(mockedContext)(watchParams)({
                imdbId: "tt123456",
                player: "local",
                title: "Title",
            })()) as E.Right<MsxContentRoot>
        ).right

        expect(content.items).toHaveLength(10)
    })
    test("with remote player", async () => {
        const content = (
            (await watchView.render(mockedContext)(watchParams)({
                imdbId: "tt123456",
                player: "remote",
                title: "Title",
            })()) as E.Right<MsxContentRoot>
        ).right
        expect(content.items).toHaveLength(2)
    })
})
