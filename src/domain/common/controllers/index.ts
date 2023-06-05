import { Controller } from "../../../core/sharedObjects/controller"
import { CommonContext } from "./context"
import { commonControllers } from "./controllers"
import { commonmatcherT } from "./matchers"
import { CommonPaths } from "./paths"
import * as R from "fp-ts-routing"

export type CommonControllerRegistry = Record<
    CommonPaths,
    { controller: Controller<CommonContext, any>; matcher: R.Match<any> }
>

export const createCommonControllerRegistry =
    (controllers: commonControllers) => (matchers: commonmatcherT) =>
        Object.keys(controllers).map((key) => ({
            controller: controllers[key as keyof commonControllers],
            matcher: matchers[key as keyof commonmatcherT],
        }))
