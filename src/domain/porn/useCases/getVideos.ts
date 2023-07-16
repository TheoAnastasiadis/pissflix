import { PCategoryT } from "../entities/category"
import { PSectionT } from "../entities/section"
import { PRepoT } from "../repos/prepo"

export const getVideos =
    (repo: PRepoT) =>
    (section: PSectionT) =>
    (category: PCategoryT) =>
    (page: number) =>
        repo.getVideos(section, category, page)
