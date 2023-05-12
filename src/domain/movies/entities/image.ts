import * as t from "io-ts"

export const Image = t.type({
    economicQuality: t.string,
    bestQuality: t.string,
})
