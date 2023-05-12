import * as t from "io-ts"

const PaginationParams = t.type({
    page: t.number,
    limit: t.number,
})

type paginationParamsT = t.TypeOf<typeof PaginationParams>

export { PaginationParams, paginationParamsT }
