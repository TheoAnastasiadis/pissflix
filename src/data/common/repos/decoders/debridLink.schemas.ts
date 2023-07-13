import * as t from "io-ts"

export const cachedTorrentResponse = t.type({
    success: t.boolean,
    value: t.record(
        t.string,
        t.type({
            name: t.string,
            hashString: t.string,
            files: t.array(
                t.type({
                    name: t.string,
                    size: t.number,
                })
            ),
        })
    ),
})

export const addTorrentResponse = t.type({
    success: t.boolean,
    value: t.type({
        id: t.string,
        name: t.string,
        hashString: t.string,
        uploadRatio: t.number,
        serverId: t.string,
        wait: t.boolean,
        peersConnected: t.number,
        status: t.number,
        totalSize: t.number,
        files: t.array(
            t.type({
                id: t.string,
                name: t.string,
                downloadUrl: t.string,
                size: t.number,
                downloadPercent: t.number,
            })
        ),
        trackers: t.union([
            t.array(
                t.type({
                    announce: t.string,
                })
            ),
            t.null,
            t.undefined,
        ]),
        created: t.number,
        downloadPercent: t.number,
        downloadSpeed: t.number,
        uploadSpeed: t.number,
    }),
})

export const createTranscodeResponse = t.type({
    success: t.boolean,
    value: t.type({
        id: t.string,
        downloadUrl: t.string,
        domain: t.string,
        type: t.string,
        created: t.number,
        duration: t.number,
        representations: t.array(
            t.partial({
                title: t.string,
                video: t.partial({
                    title: t.string,
                    height: t.number,
                    frameRate: t.number,
                    bitRate: t.number,
                    width: t.number,
                }),
                audio: t.partial({
                    title: t.string,
                    bitRate: t.number,
                }),
            })
        ),
        file: t.type({
            name: t.string,
            id: t.string,
            source: t.string,
            size: t.number,
        }),
        mimetype: t.string,
        streamUrl: t.string,
    }),
})
