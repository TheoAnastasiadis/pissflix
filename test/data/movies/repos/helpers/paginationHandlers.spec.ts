import { paginationParamsT } from "../../../../../src/core/sharedObjects/pagination"
import {
    resultsPage,
    resultsStart,
    resultsEnd,
} from "../../../../../src/data/movies/repos/tmdb/helpers/paginationHandlers"

const page = 5
const limit = 5
const pagination: paginationParamsT = { page, limit }

describe("pagination handlers", () => {
    test("correct page number", () => {
        expect(resultsPage(pagination)).toBe(2)
    })

    test("correct results length", () => {
        expect(resultsStart(pagination)).toBe(0)
        expect(resultsEnd(pagination)).toBe(limit)
    })
})
