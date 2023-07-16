import { PPicsRepo } from "../../../../src/data/porn/repos/ppicsRepo"

describe("Porn Pics Repo", () => {
    test("search for picture", async () => {
        const pics = await PPicsRepo.search("romance")()

        expect(pics._tag).toBe("Right")
    })
})
