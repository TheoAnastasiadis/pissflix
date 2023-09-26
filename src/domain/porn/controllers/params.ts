import * as t from "io-ts"

export const pornCategoriesParams = t.type({
    section: t.string,
    page: t.string,
})

export const backDropParams = t.type({
    query: t.string,
})
