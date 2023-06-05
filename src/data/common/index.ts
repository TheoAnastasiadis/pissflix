import { CommonContext } from "../../domain/common/controllers/context"
import { commonMatchers } from "../../domain/common/controllers/matchers"
import { commonControllersImpl } from "./controllers.ts"
import { OSRepo } from "./repos/opensubtitles"

const commonContextImpl: CommonContext = {
    subtitleRepo: OSRepo,
    matchers: commonMatchers,
}

export { commonContextImpl, commonControllersImpl }
