import * as t from "io-ts"

export const searchParams = t.type({
    query: t.string,
})

export const panelParams = t.intersection([
    t.union([
        t.type({ genre: t.string }),
        t.type({ trending: t.union([t.literal("day"), t.literal("week")]) }),
    ]),
    t.type({
        page: t.string,
        limit: t.string,
    }),
])

export const seriesParams = t.type({
    id: t.string,
})

export const seasonParams = t.type({
    id: t.string,
})

export const episodeParams = t.type({
    id: t.string,
})
