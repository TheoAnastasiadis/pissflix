import { SetUpFunction, ResponseAdaptor } from "./addaptors"
import { Controller } from "./controller"

type ControllerTypes = Controller<any, any>["_tag"]

export const setupRouter = <C>(
    controllers: Controller<any, any>[],
    setupFunctions: Record<ControllerTypes, SetUpFunction>,
    addaptors: Record<ControllerTypes, ResponseAdaptor<any, any>>,
    context: C
) => {
    for (const controller of controllers) {
        const setup = setupFunctions[controller._tag]
        const addaptor = addaptors[controller._tag].handler
        setup(
            controller._path,
            addaptor(controller.render(context)(controller._decoder))
        )
    }
}
