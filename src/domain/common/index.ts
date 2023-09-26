import { EndPoint } from "../../core/sharedObjects/instrumentation"
import { CommonContext } from "./controllers/context"
import { commonMatchers } from "./controllers/matchers"
import { subtitleParams } from "./controllers/params"
import { commonPaths } from "./controllers/paths"

export const commonEndpoint = new EndPoint()
    .withPaths(commonPaths)
    .withParams([subtitleParams])
    .registerMatchers(commonMatchers)
    .withContext<CommonContext>().registerControllers
