import { parseFileSize } from "../../../../../src/data/common/repos/helpers/parseFileSize"

describe("Parse File Size", () => {
    test("parses filesize in GB", () => {
        const title =
            "Movie.video.file.mkv\n👤 8 💾 5.8 GB ⚙️ Torrent Catalogue"
        const size = parseFileSize(title)
        expect(size).toEqual(5.8 * 1e9)
    })
    test("parses filesize in MB", () => {
        const title =
            "Movie.video.file.mkv\n👤 8 💾 407.24 MB ⚙️ Torrent Catalogue"
        const size = parseFileSize(title)
        expect(size).toEqual(407.24 * 1e6)
    })
    test("parses filesize in KB", () => {
        const title =
            "Movie.video.file.mkv\n👤 8 💾 890 KB ⚙️ Torrent Catalogue"
        const size = parseFileSize(title)
        expect(size).toEqual(890 * 1e3)
    })
    test("returns 0 otherwise", () => {
        const title =
            "Movie.video.file.mkv\n👤 8 💾 12 B ⚙️ Torrent Catalogue"
        const size = parseFileSize(title)
        expect(size).toEqual(0)
    })
})
