import * as t from "io-ts"

export const searchParams = t.type({
    query: t.string,
})

export const genreParams = t.type({
    id: t.string,
    page: t.string,
})

export const seriesParams = t.type({
    id: t.string,
})

export const seasonParams = t.type({
    series: t.string,
    seriesImdbId: t.string,
    id: t.string,
})
