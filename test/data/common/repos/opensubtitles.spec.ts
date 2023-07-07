import { OSRepo } from "../../../../src/data/common/repos/opensubtitles"
import { LanguageT } from "../../../../src/domain/movies/entities/language"
import * as E from "fp-ts/Either"
describe("Open Subtitles Repo", () => {
    const validImdbId = "tt6791350"
    test("Search for subtitles", async () => {
        const subs = await OSRepo.findByImdbId(["en", "el"] as LanguageT[])(
            validImdbId
        )()

        expect(E.isRight(subs)).toBe(true)
        expect((subs as E.Right<any[]>).right.length).toBeGreaterThan(0)
    })
})
