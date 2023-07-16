import { PContext } from "../../domain/porn/controllers/context"
import {
    PMatchers,
    prependPMatchers,
} from "../../domain/porn/controllers/matchers"
import { RealDebridRepo } from "../common/repos/realDebrid"
import { PControllersImpl } from "./controllers"
import { AVAPIRepo } from "./repos/avapiRepo"
import { PPicsRepo } from "./repos/ppicsRepo"

const PContextImpl: PContext = {
    prepo: AVAPIRepo,
    debridRepo: RealDebridRepo,
    matchers: prependPMatchers("porn")(PMatchers),
    photosRepo: PPicsRepo,
}

export { PContextImpl, PControllersImpl }
