import appConfig from "../../core/config/app.config"
import { pornEndpoint } from "../../domain/porn"
import { PornContext } from "../../domain/porn/controllers/context"
import { pornMatchers } from "../../domain/porn/controllers/matchers"
import { RealDebridRepo } from "../common/repos/realDebrid"
import { PornControllersImpl } from "./controllers"
import { AVAPIRepo } from "./repos/avapiRepo"
import { PPicsRepo } from "./repos/ppicsRepo"

const pornContextImpl: PornContext = {
    pornRepo: AVAPIRepo,
    debridRepo: RealDebridRepo,
    matchers: pornMatchers,
    photosRepo: PPicsRepo,
}

export const pornRouter =
    pornEndpoint(PornControllersImpl).createRouter(pornContextImpl)
