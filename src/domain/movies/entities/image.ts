import * as t from "io-ts"

export const Image = t.type({
    economicQuality: t.string,
    bestQuality: t.string,
})

export type ImageT = t.TypeOf<typeof Image>
