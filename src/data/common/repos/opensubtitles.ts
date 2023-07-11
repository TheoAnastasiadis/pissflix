import { SubtitleRepo } from "../../../domain/common/repos/subtitle.repo"
import {
    downloadSubtitle,
    searchForSubtitle,
} from "./api_wrappers/openSubtitles.wrappers"

export const OSRepo: SubtitleRepo = {
    findByImdbId: (languages) => (imdbId) =>
        searchForSubtitle(imdbId, languages),
    getDownloadLink: downloadSubtitle,
}
