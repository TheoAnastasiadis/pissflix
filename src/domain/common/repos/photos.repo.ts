import * as TE from "fp-ts/TaskEither"
export type PhotosRepoT = {
    search(query: string): TE.TaskEither<string, string[]>
}
