import * as t from "io-ts"

export const PSection = t.type({
    name: t.string,
})

export type PSectionT = t.TypeOf<typeof PSection>
