"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesMenu = void 0;
const menuObject_1 = require("../../../../shared/ui/msxUIComponents/menuObject");
const routes_enum_1 = require("./routes.enum");
const recomendedItem = new menuObject_1.MsxMenuItem({
    id: '0',
    type: "default",
    display: true,
    enable: true,
    focus: true,
    execute: null,
    transparent: false,
    icon: 'blank',
    image: null,
    label: 'Recomended for you',
    background: null,
    extensionIcon: null,
    extensionLabel: null,
    lineColor: null,
    data: routes_enum_1.MovieRoutes.RECOMENDED,
    options: null
});
// const separator = 
// const genresItem
// const decadesItem
// const regionsItem
function MoviesMenu(req, res) {
    return new menuObject_1.MsxMenu({
        name: 'Movies',
        version: '1.0.0',
        flag: 'movies_menu',
        reuse: true,
        cache: true,
        restore: true,
        transparent: '0',
        style: 'flat-separator',
        logo: '',
        logoSize: 'large',
        headline: 'Browse Movies',
        background: '',
        extension: '',
        menu: [
            recomendedItem
        ],
        action: '',
        data: '',
        ready: null,
        options: null,
    });
}
exports.MoviesMenu = MoviesMenu;
