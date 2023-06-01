import { menuView } from "../../../../src/data/movies/controllers/menu"
import { mockedContext } from "./testObjects"
import * as E from "fp-ts/Either"
import { MsxMenu, MsxMenuItem } from "../../../../src/core/msxUI/menuObject"

describe("menu view", () => {
    test("returns menu view", async () => {
        const content = (
            (await menuView.render(mockedContext)({})()) as E.Right<MsxMenu>
        ).right

        console.log(JSON.stringify(content, undefined, 2))
        expect(content.menu).toHaveLength(5)
    })
})
