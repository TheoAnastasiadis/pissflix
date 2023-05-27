import { mockedRepoInstance, exampleGenres } from "./testObjects"
import { getGenres } from "../../../../src/domain/movies/useCases/getGenres"
import * as O from "fp-ts/Option"
import { GenreT } from "../../../../src/domain/movies/entities/genre"

describe("getGenres()", () => {
    test("returns list of genres", () => {
        const result = getGenres(mockedRepoInstance)
        expect(O.isSome(result)).toBeTruthy()
        expect((result as O.Some<GenreT[]>).value).toEqual(exampleGenres)
    })
})
