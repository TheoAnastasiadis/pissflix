import * as t from "io-ts"

export const PCategory = t.type({
    id: t.number,
    name: t.string,
})

export type PCategoryT = t.TypeOf<typeof PCategory>
