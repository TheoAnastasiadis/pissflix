import * as t from "io-ts"

export const PVideo = t.type({
    title: t.string,
    duration: t.string,
    url: t.string,
    thumbnail: t.string,
})

export type PVideoT = t.TypeOf<typeof PVideo>
