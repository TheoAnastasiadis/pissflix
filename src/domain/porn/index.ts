import { PornContext } from "./controllers/context"
import { EndPoint } from "../../core/sharedObjects/instrumentation"
import { pornPaths } from "./controllers/paths"
import { backDropParams, pornCategoriesParams } from "./controllers/params"
import { pornMatchers } from "./controllers/matchers"

export const pornEndpoint = new EndPoint()
    .withPaths(pornPaths)
    .withParams([pornCategoriesParams, backDropParams])
    .registerMatchers(pornMatchers)
    .withContext<PornContext>().registerControllers
