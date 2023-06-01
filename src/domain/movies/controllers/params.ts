import * as t from "io-ts"

export const panelParams = t.intersection([
    t.union([
        t.type({ decade: t.string }),
        t.type({ region: t.string }),
        t.type({ genre: t.string }),
        t.type({ trending: t.union([t.literal("day"), t.literal("week")]) }),
    ]),
    t.type({
        page: t.string,
        limit: t.string,
    }),
])

export const infoParams = t.type({
    id: t.string,
})

export const searchParams = t.type({
    query: t.string,
})

export const watchParams = t.type({
    imdbId: t.string,
    player: t.union([t.literal("remote"), t.literal("local")]),
    title: t.string,
})
