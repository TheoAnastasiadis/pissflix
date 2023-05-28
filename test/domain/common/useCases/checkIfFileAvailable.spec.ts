import { checkIfFileAvailable } from "../../../../src/domain/common/useCases/checkIfFileAvailable"
import { mockedDebridRepoInstance } from "./testObjects"

describe("get torrents by imdb id", () => {
    test("with valid magnet resolve the promise", (done) => {
        checkIfFileAvailable(mockedDebridRepoInstance)(0)("abc")
            .then((magnet) => expect(magnet).toEqual(""))
            .then(done)
    })
    test("with invalid magnet reject the promise", (done) => {
        checkIfFileAvailable(mockedDebridRepoInstance)(0)("abc")
            .catch((magnet) => expect(magnet).toBeFalsy())
            .then(done)
    })
})
