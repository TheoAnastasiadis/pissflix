import {
    Controller,
    Redirection,
    Response,
} from "../../../core/sharedObjects/controller"
import { PContext } from "./context"
import { PCategoriesParams, PStreamParams } from "./params"
import { PPaths } from "./paths"
import * as t from "io-ts"

export type PControllers = {
    sections: Controller<PContext>
    categories: Controller<PContext, t.TypeOf<typeof PCategoriesParams>>
    stream: Response<PContext, t.TypeOf<typeof PStreamParams>>
} & Record<
    PPaths,
    | Controller<PContext, any>
    | Redirection<PContext, any>
    | Response<PContext, any>
>
