"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsxMoviesMenu = void 0;
const result_1 = require("../../../../core/sharedObjects/result");
const menuObject_1 = require("../../shared/menuObject");
const moviesRoutes_enum_1 = require("./moviesRoutes.enum");
const MsxMoviesMenu = (viewsRegistry) => {
    const menuProps = {
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
    };
    const msxMenu = new menuObject_1.MsxMenu(menuProps);
    const recomendedItem = new menuObject_1.MsxMenuItem({
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
        data: viewsRegistry.getAbsolutePath(moviesRoutes_enum_1.MoviesRoutes.RECOMENDED),
        options: null,
    });
    const separator = new menuObject_1.MsxMenuItem({
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
    });
    const genresItem = new menuObject_1.MsxMenuItem({
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
        data: viewsRegistry.getAbsolutePath(moviesRoutes_enum_1.MoviesRoutes.GENRES),
        options: null,
    });
    const erasItems = new menuObject_1.MsxMenuItem({
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
        data: viewsRegistry.getAbsolutePath(moviesRoutes_enum_1.MoviesRoutes.ERAS),
        options: null,
    });
    const regionsItem = new menuObject_1.MsxMenuItem({
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
        data: viewsRegistry.getAbsolutePath(moviesRoutes_enum_1.MoviesRoutes.REGIONS),
        options: null,
    });
    try {
        msxMenu.addItem(recomendedItem);
        msxMenu.addItem(separator);
        msxMenu.addItem(genresItem);
        msxMenu.addItem(erasItems);
        msxMenu.addItem(regionsItem);
        return new result_1.Result(true, undefined, msxMenu);
    }
    catch (e) {
        return new result_1.Result(false, e);
    }
};
exports.MsxMoviesMenu = MsxMoviesMenu;
