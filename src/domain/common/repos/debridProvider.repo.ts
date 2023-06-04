import * as TE from "fp-ts/TaskEither"
import * as TO from "fp-ts/TaskOption"
import { MagnetURIT } from "../entities/magnetURI"

export type DebridProviderRepo = {
    getStreamingLink(
        magnet: MagnetURIT
    ): (fileIdx: number) => TE.TaskEither<string, string>
    checkIfAvailable(magnet: MagnetURIT): TO.TaskOption<boolean>
}
