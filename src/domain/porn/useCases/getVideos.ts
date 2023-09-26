import { PCategoryT } from "../entities/category"
import { PSectionT } from "../entities/section"
import { PornRepoT } from "../repos/prepo"

export const getVideos =
    (repo: PornRepoT) =>
    (section: PSectionT) =>
    (category: PCategoryT) =>
    (page: number) =>
        repo.getVideos(section, category, page)
