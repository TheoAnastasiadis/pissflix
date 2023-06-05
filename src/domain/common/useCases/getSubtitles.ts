import { Language, LanguageT } from "../../movies/entities/language"
import { SubtitleT } from "../entities/subtitle"
import { SubtitleRepo } from "../repos/subtitle.repo"
import * as TE from "fp-ts/TaskEither"

export const getSubtitles: (
    repo: SubtitleRepo
) => (
    languages: [LanguageT, ...LanguageT[]]
) => (imdbId: string) => TE.TaskEither<string, SubtitleT[]> =
    (repo) => (languages) => (imdbId) =>
        repo.findByImdbId(languages)(imdbId)
