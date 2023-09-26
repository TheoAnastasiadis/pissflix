import appConfig from "../../../core/config/app.config"
import { subtitleParams } from "./params"
import * as R from "fp-ts-routing"

export const commonMatchers = {
    subtitle: R.lit(appConfig.commonPath)
        .then(R.lit("subtitle"))
        .then(R.query(subtitleParams)),
    start: R.lit(appConfig.commonPath).then(R.lit("start.json")),
    menu: R.lit(appConfig.commonPath).then(R.lit("menu")),
}
