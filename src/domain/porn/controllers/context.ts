import { DebridProviderRepo } from "../../common/repos/debridProvider.repo"
import { PRepoT } from "../repos/prepo"
import { PMatchersT } from "./matchers"

export type PContext = {
    prepo: PRepoT
    debridRepo: DebridProviderRepo
    matchers: PMatchersT
}

export const createPContext = (
    prepo: PRepoT,
    debridRepo: DebridProviderRepo,
    matchers: PMatchersT
) =>
    ({
        prepo,
        debridRepo,
        matchers,
    } satisfies PContext)
