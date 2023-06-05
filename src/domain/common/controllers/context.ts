import { SubtitleRepo } from "../repos/subtitle.repo"
import { commonmatcherT } from "./matchers"

export type CommonContext = {
    subtitleRepo: SubtitleRepo
    matchers: commonmatcherT
}

export const createCommonContext = (
    subtitleRepo: SubtitleRepo,
    matchers: commonmatcherT
) => ({ subtitleRepo, matchers } satisfies CommonContext)
