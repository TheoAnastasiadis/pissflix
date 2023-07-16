import { AVAPIRepo } from "../../../../src/data/porn/repos/avapiRepo"

describe("Adult Videos API Repo", () => {
    it("get videos", async () => {
        const videos = await AVAPIRepo.getVideos(
            { name: "straing" },
            { id: 1, name: "Amateur" },
            0
        )()

        expect(videos._tag).toBe("Right")
    })
})
