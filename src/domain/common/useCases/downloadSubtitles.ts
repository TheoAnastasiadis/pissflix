import { SubtitleRepo } from "../repos/subtitle.repo"

export const downloadSubtitles = (repo: SubtitleRepo) => (id: number) =>
    repo.getDownloadLink(id)
