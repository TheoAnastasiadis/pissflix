import { commonControllers } from "../../../domain/common/controllers/controllers"
import { subtitleRedirection } from "./subtitle"

export const commonControllersImpl: commonControllers = {
    subtitle: subtitleRedirection,
}
