import * as t from "io-ts"

export const PCategoriesParams = t.type({
    section: t.string,
    page: t.string,
})

// export const PStreamParams = t.type({
//     url: t.string,
// })

export const backDropParams = t.type({
    query: t.string,
})
