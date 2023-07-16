import { PControllers } from "./controllers"
import { PMatchersT } from "./matchers"

export const createPControllerRegistry =
    (controllers: PControllers) => (matchers: PMatchersT) =>
        Object.keys(controllers).map((key) => ({
            controller: controllers[key as keyof PControllers],
            matcher: matchers[key as keyof PMatchersT],
        }))
