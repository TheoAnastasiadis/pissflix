import { menuView } from "../../../../src/data/movies/controllers/menu"
import { mockedContext } from "./testObjects"
import * as t from "io-ts"
import * as TE from "fp-ts/TaskEither"
import * as E from "fp-ts/Either"
import {
    MsxContentPage,
    MsxContentRoot,
} from "../../../../src/core/msxUI/contentObjects"
import { MsxMenu, MsxMenuItem } from "../../../../src/core/msxUI/menuObject"

describe("menu view", () => {
    test("returns menu view", async () => {
        const content = (
            (await menuView.render(mockedContext)(t.type({}))(
                {}
            )()) as E.Right<MsxMenu>
        ).right

        console.log(JSON.stringify(content, undefined, 2))
        expect(content.menu).toHaveLength(5)
        type MovieMenUItems = [
            MsxMenuItem,
            MsxMenuItem,
            MsxMenuItem,
            MsxMenuItem,
            MsxMenuItem
        ]
        expect((content.menu as MovieMenUItems)[0].data).toEqual(
            mockedContext.absolutePaths.discover
        )
        expect((content.menu as MovieMenUItems)[1].type).toEqual("separator")
        expect((content.menu as MovieMenUItems)[2].data).toEqual(
            mockedContext.absolutePaths.genres
        )
        expect((content.menu as MovieMenUItems)[3].data).toEqual(
            mockedContext.absolutePaths.eras
        )
        expect((content.menu as MovieMenUItems)[4].data).toEqual(
            mockedContext.absolutePaths.regions
        )
    })
})
