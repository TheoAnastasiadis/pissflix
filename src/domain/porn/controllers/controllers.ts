import {
    Controller,
    Redirection,
    Response,
} from "../../../core/sharedObjects/controller"
import { PContext } from "./context"
import { PCategoriesParams, backDropParams } from "./params"
import { PPaths } from "./paths"
import * as t from "io-ts"

export type PControllers = {
    sections: Controller<PContext>
    categories: Controller<PContext, t.TypeOf<typeof PCategoriesParams>>
    /*stream: Response<PContext, t.TypeOf<typeof PStreamParams>>*/
    backdrop: Response<PContext, t.TypeOf<typeof backDropParams>>
} & Record<
    PPaths,
    | Controller<PContext, any>
    | Redirection<PContext, any>
    | Response<PContext, any>
>
