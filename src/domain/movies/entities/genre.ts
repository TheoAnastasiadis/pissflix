import * as t from "io-ts"

const Genre = t.type({
    uniqueId: t.number,
    name: t.string,
})

type GenreT = t.TypeOf<typeof Genre>

export { Genre, GenreT }
