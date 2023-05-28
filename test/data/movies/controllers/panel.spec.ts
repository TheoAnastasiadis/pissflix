import { MsxContentRoot } from "../../../../src/core/msxUI/contentObjects"
import { regions } from "../../../../src/core/sharedObjects/regions"
import { panelView } from "../../../../src/data/movies/controllers/panel"
import { tmdbGenres } from "../../../../src/data/movies/repos/helpers/tmdbGenres"
import { panelParams } from "../../../../src/domain/movies/controllers"
import { mockedContext } from "./testObjects"
import * as E from "fp-ts/Either"

describe("panel view", () => {
    test("with decade param", async () => {
        const content = (
            (await panelView.render(mockedContext)(panelParams)({
                decade: 2010,
                page: 0,
                limit: 20,
            })()) as E.Right<MsxContentRoot>
        ).right

        expect(content.items).toHaveLength(20)
    })
    test("with genre param", async () => {
        const content = (
            (await panelView.render(mockedContext)(panelParams)({
                genre: tmdbGenres[0].uniqueId,
                page: 0,
                limit: 20,
            })()) as E.Right<MsxContentRoot>
        ).right

        expect(content.items).toHaveLength(20)
    })
    test("with region param", async () => {
        const content = (
            (await panelView.render(mockedContext)(panelParams)({
                region: regions[0].name,
                page: 0,
                limit: 20,
            })()) as E.Right<MsxContentRoot>
        ).right

        expect(content.items).toHaveLength(20)
    })
    test("with trending param", async () => {
        const content = (
            (await panelView.render(mockedContext)(panelParams)({
                trending: "day",
                page: 0,
                limit: 20,
            })()) as E.Right<MsxContentRoot>
        ).right

        expect(content.items).toHaveLength(20)
    })
})
