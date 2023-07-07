import { commonControllers } from "../../../domain/common/controllers/controllers"
import { startObject } from "./start"
import { subtitleRedirection } from "./subtitle"

export const commonControllersImpl: commonControllers = {
    subtitle: subtitleRedirection,
    start: startObject,
}
