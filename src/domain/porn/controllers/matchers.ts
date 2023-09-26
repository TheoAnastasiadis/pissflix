import * as R from "fp-ts-routing"
import { pornCategoriesParams, backDropParams } from "./params"
import appConfig from "../../../core/config/app.config"

//Matchers
export const pornMatchers = {
    sections: R.lit(appConfig.pornPath).then(R.lit("sections")).then(R.end),
    categories: R.lit(appConfig.pornPath)
        .then(R.lit("categories"))
        .then(R.query(pornCategoriesParams))
        .then(R.end),
    backdrop: R.lit(appConfig.pornPath)
        .then(R.lit("backdrop"))
        .then(R.query(backDropParams))
        .then(R.end),
}
