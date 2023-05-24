import * as t from "io-ts"

export const addTorrentResponse = t.type({
    id: t.string,
    uri: t.string,
})

export const getTorrentInfoResponse = t.type({
    id: t.string,
    filename: t.string,
    original_filename: t.string, // Original name of the torrent
    hash: t.string, // SHA1 Hash of the torrent
    bytes: t.number, // Size of selected files only
    original_bytes: t.number, // Total size of the torrent
    host: t.string, // Host main domain
    split: t.number, // Split size of links
    progress: t.number, // Possible values: 0 to 100
    status: t.union([
        t.literal("waiting_files_selection"),
        t.literal("queued"),
        t.literal("downloading"),
        t.literal("downloaded"),
        t.literal("error"),
        t.literal("virus"),
        t.literal("compressing"),
        t.literal("uploading"),
        t.literal("dead"),
    ]),
    added: t.string, // jsonDate
    files: t.array(
        t.type({
            id: t.number,
            path: t.string, // Path to the file inside the torrent, starting with /
            bytes: t.number,
            selected: t.union([t.literal(0), t.literal(1)]),
        })
    ),
    links: t.array(t.string),
    ended: t.string, // !! Only present when finished, jsonDate
    speed: t.number, // !! Only present in downloading, compressing, uploading status
    seeders: t.number, // !! Only present in downloading, magnet_conversion status
})

export const unrestrictLinkResponse = t.type({
    id: t.string,
    filename: t.string,
    mimeType: t.string, // Mime Type of the file, guessed by the file extension
    filesize: t.number, // Filesize in bytes, 0 if unknown
    link: t.string, // Original link
    host: t.string, // Host main domain
    chunks: t.number, // Max Chunks allowed
    crc: t.number, // Disable / enable CRC check
    download: t.string, // Generated link
    streamable: t.number, // Is the file streamable on website
})
