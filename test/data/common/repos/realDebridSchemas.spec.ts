import { getTorrentInfoResponse } from "../../../../src/data/common/repos/decoders/realDebrid.schemas"
import * as E from "fp-ts/Either"

const validInfoResponse = {
    id: "example",
    filename: "example",
    original_filename: "example",
    hash: "example",
    bytes: 10000000000,
    original_bytes: 10000000000,
    host: "example",
    split: 1000,
    progress: 100,
    status: "example",
    added: "1970-01-01T00:00:00.000Z",
    files: [
        {
            id: 1,
            path: "/example",
            bytes: 100,
            selected: 0,
        },
        {
            id: 2,
            path: "/example.mkv",
            bytes: 100000000,
            selected: 1,
        },
        {
            id: 3,
            path: "/example.txt",
            bytes: 100,
            selected: 0,
        },
    ],
    links: ["https://real-debrid.com/d/EXAMPLE"],
    ended: "1970-01-01T00:00:00.000Z",
}

describe("Real Debrid Schemas", () => {
    test("getTorrentInfoResponse", () => {
        const parsed = getTorrentInfoResponse.decode(validInfoResponse)
        expect(E.isRight(parsed)).toBeTruthy
    })
})
