
import { Result } from "../../../../core/sharedObjects/result"
import { ViewsHandler } from "../../../../core/sharedObjects/viewsRegistry"
import { MoviesViewsRegistry } from "../../../../domain/movies/routes/movies.routes"
import { MsxMenu, MenuProps, MsxMenuItem } from "../../shared/menuObject"
import { MoviesRoutes } from "./moviesRoutes.enum"

export const MsxMoviesMenu: ViewsHandler<MsxMenu> = (
    viewsRegistry: MoviesViewsRegistry
): Result<MsxMenu> => {
    const menuProps: MenuProps = {
        name: "Movies Menu",
        version: "1.0.0",
        flag: "movies_menu",
        reuse: false,
        cache: false,
        restore: false,
        transparent: null,
        style: null,
        logo: null,
        logoSize: null,
        headline: null,
        background: null,
        extension: null,
        action: "",
        data: null,
        ready: null,
        options: undefined,
    }

    const msxMenu = new MsxMenu(menuProps)

    const recomendedItem = new MsxMenuItem({
        id: "0",
        type: "default",
        display: true,
        enable: true,
        focus: true,
        execute: false,
        transparent: "0",
        icon: "blank",
        image: "",
        label: "Discover",
        background: "",
        extensionIcon: null,
        extensionLabel: null,
        lineColor: null,
        data: viewsRegistry.getAbsolutePath(MoviesRoutes.RECOMENDED),
        options: null,
    })

    const separator = new MsxMenuItem({
        id: "1",
        type: "separator",
        display: true,
        enable: true,
        focus: true,
        execute: false,
        transparent: "0",
        icon: "blank",
        image: "",
        label: "Doscover by",
        background: "",
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
        execute: false,
        transparent: "0",
        icon: "blank",
        image: "",
        label: "Genre",
        background: "",
        extensionIcon: null,
        extensionLabel: null,
        lineColor: null,
        data: viewsRegistry.getAbsolutePath(MoviesRoutes.GENRES),
        options: null,
    })

    const erasItems = new MsxMenuItem({
        id: "3",
        type: "default",
        display: true,
        enable: true,
        focus: true,
        execute: false,
        transparent: "0",
        icon: "blank",
        image: "",
        label: "ERA",
        background: "",
        extensionIcon: null,
        extensionLabel: null,
        lineColor: null,
        data: viewsRegistry.getAbsolutePath(MoviesRoutes.ERAS),
        options: null,
    })

    const regionsItem = new MsxMenuItem({
        id: "4",
        type: "default",
        display: true,
        enable: true,
        focus: true,
        execute: false,
        transparent: "0",
        icon: "blank",
        image: "",
        label: "Region",
        background: "",
        extensionIcon: null,
        extensionLabel: null,
        lineColor: null,
        data: viewsRegistry.getAbsolutePath(MoviesRoutes.REGIONS),
        options: null,
    })

    try {
        msxMenu.addItem(recomendedItem)
        msxMenu.addItem(separator)
        msxMenu.addItem(genresItem)
        msxMenu.addItem(erasItems)
        msxMenu.addItem(regionsItem)

        return new Result(true, undefined, msxMenu)
    } catch (e) {
        return new Result(false, e as string)
    }
}
