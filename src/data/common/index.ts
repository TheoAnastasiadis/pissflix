import { CommonContext } from "../../domain/common/controllers/context"
import { commonMatchers } from "../../domain/common/controllers/matchers"
import { commonControllersImpl } from "./controllers"
import { OSRepo } from "./repos/opensubtitles"
import { UnsplashRepo } from "./repos/unSplash"

const commonContextImpl: CommonContext = {
    subtitleRepo: OSRepo,
    matchers: commonMatchers,
    photosRepo: UnsplashRepo,
}

export { commonContextImpl, commonControllersImpl }
