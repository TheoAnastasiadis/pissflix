import { Controller, Redirection } from "../../../core/sharedObjects/controller"
import { CommonContext } from "./context"
import { subtitleParams } from "./params"
import { CommonPaths } from "./paths"
import * as t from "io-ts"

export type commonControllers = {
    subtitle: Redirection<CommonContext, t.TypeOf<typeof subtitleParams>>
    start: Controller<CommonContext>
    menu: Controller<CommonContext>
} & Record<
    CommonPaths,
    Controller<CommonContext, any> | Redirection<CommonContext, any>
>
