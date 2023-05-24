import * as TE from "fp-ts/TaskEither"
import { MagnetURI } from "../entities/magnetURI"

export type DebridProviderRepo = {
    getStreamingLink(
        magnet: MagnetURI
    ): (fileIdx: number) => TE.TaskEither<string, string>
}
