import * as TE from "fp-ts/TaskEither"
import { PSectionT } from "../entities/section"
import { PCategoryT } from "../entities/category"
import { PVideoT } from "../entities/video"

export type PRepoT = {
    getSections: () => TE.TaskEither<string, PSectionT[]>
    getCategories: () => TE.TaskEither<string, PCategoryT[]>
    getVideos: (
        section: PSectionT,
        category: PCategoryT,
        page: number
    ) => TE.TaskEither<string, PVideoT[]>
}
