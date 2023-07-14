import { MsxContentRoot } from "../../../../src/core/msxUI/contentObjects"
import { MsxServerResponse } from "../../../../src/core/msxUI/response"
import { streamResponse } from "../../../../src/data/movies/controllers/stream"
import { mockedContext } from "./testObjects"
import * as E from "fp-ts/Either"

describe("watch view", () => {
    test("returns the correct view", async () => {
        const response = (
            (await streamResponse.render(mockedContext)({
                imdbId: "tt123456",
                magnet: "magnet:123456",
                title: "Title",
                fileIdx: "0",
            })()) as E.Right<MsxServerResponse>
        ).right

        expect(response.response.status).toBe(200)
    })
})
