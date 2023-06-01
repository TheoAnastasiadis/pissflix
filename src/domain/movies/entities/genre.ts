import * as t from "io-ts"

export const Genre = t.type({
    uniqueId: t.number,
    name: t.string,
})

export type GenreT = t.TypeOf<typeof Genre>
