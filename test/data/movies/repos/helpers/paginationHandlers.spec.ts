import { paginationParamsT } from "../../../../../src/core/sharedObjects/pagination"
import {
    resultsPage,
    resultsStart,
    resultsEnd,
} from "../../../../../src/data/movies/repos/helpers/paginationHandlers"

const page = 0
const limit = 5
const pagination: paginationParamsT = { page, limit }

describe("pagination handlers", () => {
    test("correct page number", () => {
        expect(resultsPage(pagination)).toBe(1)
    })

    test("correct results length", () => {
        expect(resultsStart(pagination)).toBe(0)
        expect(resultsEnd(pagination)).toBe(limit)
    })
})
