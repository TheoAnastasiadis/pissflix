import { CommonContext } from "../../domain/common/controllers/context"
import { commonMatchers } from "../../domain/common/controllers/matchers"
import { commonControllersImpl } from "./controllers.ts"
import { OSRepo } from "./repos/opensubtitles"
import { unsplash } from "./repos/unSplash"

const commonContextImpl: CommonContext = {
    subtitleRepo: OSRepo,
    matchers: commonMatchers,
    photosRepo: unsplash,
}

export { commonContextImpl, commonControllersImpl }
