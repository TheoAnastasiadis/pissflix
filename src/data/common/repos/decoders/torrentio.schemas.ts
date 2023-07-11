import * as t from "io-ts"

export const succesfullTorrentIOResponse = t.type({
    streams: t.array(
        t.partial({
            name: t.string,
            title: t.string,
            infoHash: t.string,
            fileIdx: t.number,
            sources: t.array(t.string),
        })
    ),
})
