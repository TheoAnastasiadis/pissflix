import * as t from "io-ts"
import { regions } from "../../../core/sharedObjects/regions"
import { decades } from "../../../core/sharedObjects/decades"

export const panelParams = t.intersection([
    t.union([
        t.type({
            decade: t.union(
                decades.map((dec) => t.literal(String(dec))) as [
                    t.LiteralC<string>,
                    t.LiteralC<string>,
                    ...t.LiteralC<string>[]
                ]
            ),
        }), //[t.literal("1920"), t.literal("1930"), etc...]
        t.type({ region: t.keyof(regions) }),
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

export const streamParams = t.type({
    imdbId: t.string,
    magnet: t.string,
    fileIdx: t.string,
    title: t.string,
})
