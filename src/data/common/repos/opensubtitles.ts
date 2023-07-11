import { SubtitleRepo } from "../../../domain/common/repos/subtitle.repo"
import {
    downloadSubtitle,
    searchForSubtitle,
} from "./api_wrappers/openSubtitlesWrappers"

export const OSRepo: SubtitleRepo = {
    findByImdbId: (languages) => (imdbId) =>
        searchForSubtitle(imdbId, languages),
    getDownloadLink: downloadSubtitle,
}
