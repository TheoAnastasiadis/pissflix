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
    id: t.string,
})

export const episodeParams = t.type({
    series: t.string,
    season: t.string,
    id: t.string,
})
