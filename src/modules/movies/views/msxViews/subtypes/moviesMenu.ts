import {
    MsxMenu,
    MsxMenuItem,
} from "../../../../../shared/ui/msxUIComponents/menuObject"
import { MovieRoutes } from "./routes.enum"
import { ViewsHandler } from "../../../../../shared/Objects/views"
import { Result } from "../../../../../shared/Objects/result"

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

const separator = new MsxMenuItem({
    id: "1",
    type: "separator",
    display: true,
    enable: true,
    focus: true,
    execute: null,
    transparent: false,
    icon: "blank",
    image: null,
    label: null,
    background: null,
    extensionIcon: null,
    extensionLabel: null,
    lineColor: null,
    data: "",
    options: null,
})

const genresItem = new MsxMenuItem({
    id: "2",
    type: "default",
    display: true,
    enable: true,
    focus: true,
    execute: null,
    transparent: false,
    icon: "blank",
    image: null,
    label: "Browse By Genre",
    background: null,
    extensionIcon: null,
    extensionLabel: null,
    lineColor: null,
    data: MovieRoutes.GENRES,
    options: null,
})

const decadesItem = new MsxMenuItem({
    id: "3",
    type: "default",
    display: true,
    enable: true,
    focus: true,
    execute: null,
    transparent: false,
    icon: "blank",
    image: null,
    label: "Browse By Era",
    background: null,
    extensionIcon: null,
    extensionLabel: null,
    lineColor: null,
    data: MovieRoutes.GENRES,
    options: null,
})

const regionsItem = new MsxMenuItem({
    id: "4",
    type: "default",
    display: true,
    enable: true,
    focus: true,
    execute: null,
    transparent: false,
    icon: "blank",
    image: null,
    label: "Browse By Region",
    background: null,
    extensionIcon: null,
    extensionLabel: null,
    lineColor: null,
    data: MovieRoutes.REGIONS,
    options: null,
})

export const MoviesMenu: ViewsHandler<MsxMenu> = (): Result<MsxMenu> => {
    return new Result<MsxMenu>(
        true,
        undefined,
        new MsxMenu({
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
            menu: [
                recomendedItem,
                separator,
                genresItem,
                decadesItem,
                regionsItem,
            ],
            action: "",
            data: "",
            ready: null,
            options: null,
        })
    )
}
