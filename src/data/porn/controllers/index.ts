import { PornControllers } from "../../../domain/porn/controllers/controllers"
import { backdropResponse } from "./backDrop"
import { categoriesView } from "./categories"
import { SectionsView } from "./sections"

export const PornControllersImpl: PornControllers = {
    sections: SectionsView,
    categories: categoriesView,
    backdrop: backdropResponse,
}
