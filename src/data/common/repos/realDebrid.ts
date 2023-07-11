import { pipe } from "fp-ts/lib/function"
import * as TE from "fp-ts/TaskEither"
import realDebridApiKey from "../../../core/config/debrid.config"
import { DebridProviderRepo } from "../../../domain/common/repos/debridProvider.repo"

import {
    addMagnet,
    getLink,
    instantAvailability,
    selectFile,
    unrestrictLink,
    transcode,
} from "./api_wrappers/realDebrid.wrappers"
const API_KEY = realDebridApiKey.realDebridApiKEY

export const RealDebridRepo: DebridProviderRepo = {
    getStreamingLink: (magnet) => (fileIdx) =>
        pipe(
            TE.of(magnet),
            TE.chain(addMagnet),
            TE.chainFirst(selectFile(fileIdx)),
            TE.chain(getLink),
            TE.chain(unrestrictLink),
            TE.chain(transcode)
        ),
    checkIfAvailable: instantAvailability,
}
