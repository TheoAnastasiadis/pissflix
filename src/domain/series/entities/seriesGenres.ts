import * as t from "io-ts"

export const seriesGenres = t.union([
    t.type({
        id: t.literal(10759),
        name: t.literal("Action & Adventure"),
    }),
    t.type({
        id: t.literal(16),
        name: t.literal("Animation"),
    }),
    t.type({
        id: t.literal(35),
        name: t.literal("Comedy"),
    }),
    t.type({
        id: t.literal(80),
        name: t.literal("Crime"),
    }),
    t.type({
        id: t.literal(99),
        name: t.literal("Documentary"),
    }),
    t.type({
        id: t.literal(18),
        name: t.literal("Drama"),
    }),
    t.type({
        id: t.literal(10751),
        name: t.literal("Family"),
    }),
    t.type({
        id: t.literal(10762),
        name: t.literal("Kids"),
    }),
    t.type({
        id: t.literal(9648),
        name: t.literal("Mystery"),
    }),
    t.type({
        id: t.literal(10763),
        name: t.literal("News"),
    }),
    t.type({
        id: t.literal(10764),
        name: t.literal("Reality"),
    }),
    t.type({
        id: t.literal(10765),
        name: t.literal("Sci-Fi & Fantasy"),
    }),
    t.type({
        id: t.literal(10766),
        name: t.literal("Soap"),
    }),
    t.type({
        id: t.literal(10767),
        name: t.literal("Talk"),
    }),
    t.type({
        id: t.literal(10768),
        name: t.literal("War & Politics"),
    }),
    t.type({
        id: t.literal(37),
        name: t.literal("Western"),
    }),
])

export type SeriesGenresT = t.TypeOf<typeof seriesGenres>
