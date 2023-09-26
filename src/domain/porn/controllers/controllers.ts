import { Controller, Response } from "../../../core/sharedObjects/controller"
import { PornContext } from "./context"
import { pornCategoriesParams, backDropParams } from "./params"
import * as t from "io-ts"

export type PornControllers = {
    sections: Controller<PornContext>
    categories: Controller<PornContext, t.TypeOf<typeof pornCategoriesParams>>
    backdrop: Response<PornContext, t.TypeOf<typeof backDropParams>>
}
