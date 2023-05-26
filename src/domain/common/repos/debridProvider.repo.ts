import * as TE from "fp-ts/TaskEither"
import * as TO from "fp-ts/TaskOption"
import { MagnetURI } from "../entities/magnetURI"

export type DebridProviderRepo = {
    getStreamingLink(
        magnet: MagnetURI
    ): (fileIdx: number) => TE.TaskEither<string, string>,
    checkIfAvailable(magnet: MagnetURI) : Promise<MagnetURI>
}
