import { LanguageT } from "../../movies/entities/language"
import * as TE from "fp-ts/TaskEither"
import { SubtitleT } from "../entities/subtitle"

export type SubtitleRepo = {
    findByImdbId: (
        languages: LanguageT[]
    ) => (imdbId: string) => TE.TaskEither<string, SubtitleT[]>
    getDownloadLink: (
        subtitleId: number
    ) => TE.TaskEither<string, { link: string; isVtt: boolean }>
}
