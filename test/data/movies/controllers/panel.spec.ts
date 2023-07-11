import { MsxContentRoot } from "../../../../src/core/msxUI/contentObjects"
import { regions } from "../../../../src/core/sharedObjects/regions"
import { panelView } from "../../../../src/data/movies/controllers/panel"
import { tmdbGenres } from "../../../../src/data/movies/repos/helpers/tmdbGenres"

import { mockedContext } from "./testObjects"
import * as E from "fp-ts/Either"

describe("panel view", () => {
    test("with decade param", async () => {
        const content = (
            (await panelView.render(mockedContext)({
                decade: "2010",
                page: "0",
                limit: "20",
            })()) as E.Right<MsxContentRoot>
        ).right

        expect(content.items).toHaveLength(21)
    })
    test("with genre param", async () => {
        const content = (
            (await panelView.render(mockedContext)({
                genre: String(tmdbGenres[0].uniqueId),
                page: "0",
                limit: "20",
            })()) as E.Right<MsxContentRoot>
        ).right

        expect(content.items).toHaveLength(21)
    })
    test("with region param", async () => {
        const content = (
            (await panelView.render(mockedContext)({
                region: "Europe",
                page: "0",
                limit: "20",
            })()) as E.Right<MsxContentRoot>
        ).right

        expect(content.items).toHaveLength(21)
    })
    test("with trending param", async () => {
        const content = (
            (await panelView.render(mockedContext)({
                trending: "day",
                page: "0",
                limit: "20",
            })()) as E.Right<MsxContentRoot>
        ).right

        expect(content.items).toHaveLength(21)
    })
})
