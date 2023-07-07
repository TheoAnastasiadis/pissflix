import { commonControllers } from "../../../domain/common/controllers/controllers"
import { menuController } from "./menu"
import { startObject } from "./start"
import { subtitleRedirection } from "./subtitle"

export const commonControllersImpl: commonControllers = {
    subtitle: subtitleRedirection,
    start: startObject,
    menu: menuController,
}
