import { Request, Response } from "express-serve-static-core"
import {
    MsxMenu,
    MsxMenuItem,
} from "../../../../shared/ui/msxUIComponents/menuObject"
import { MovieRoutes } from "./routes.enum"

const recomendedItem = new MsxMenuItem({
    id: "0",
    type: "default",
    display: true,
    enable: true,
    focus: true,
    execute: null,
    transparent: false,
    icon: "blank",
    image: null,
    label: "Recomended for you",
    background: null,
    extensionIcon: null,
    extensionLabel: null,
    lineColor: null,
    data: MovieRoutes.RECOMENDED,
    options: null,
})

// const separator =

// const genresItem
// const decadesItem
// const regionsItem

export function MoviesMenu(req: Request, res: Response): MsxMenu {
    return new MsxMenu({
        name: "Movies",
        version: "1.0.0",
        flag: "movies_menu",
        reuse: true,
        cache: true,
        restore: true,
        transparent: "0",
        style: "flat-separator",
        logo: "",
        logoSize: "large",
        headline: "Browse Movies",
        background: "",
        extension: "",
        menu: [recomendedItem],
        action: "",
        data: "",
        ready: null,
        options: null,
    })
}
