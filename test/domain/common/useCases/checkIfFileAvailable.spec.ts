import { checkIfFileAvailable } from "../../../../src/domain/common/useCases/checkIfFileAvailable"
import { mockedDebridRepoInstance } from "./testObjects"
import * as O from 'fp-ts/Option'

describe("get torrents by imdb id", () => {
    test("with valid magnet resolve to true", async () => {
        const reponse = await checkIfFileAvailable(mockedDebridRepoInstance)(0)("abc")()
        expect(O.isSome(reponse)).toBeTruthy()
        expect((reponse as O.Some<boolean>).value).toBe(true)
    })
    test("with invalid magnet resolve to false", async () => {
        const reponse = await checkIfFileAvailable(mockedDebridRepoInstance)(0)("def")()
        expect(O.isSome(reponse)).toBeTruthy()
        expect((reponse as O.Some<boolean>).value).toBe(false)
    })
})
