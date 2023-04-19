"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsxMenuItem = exports.MsxMenu = void 0;
class MsxMenu {
    constructor(props) {
        this.name = props.name;
        this.version = props.version;
        this.flag = props.flag;
        this.reuse = props.reuse;
        this.cache = props.cache;
        this.restore = props.restore;
        this.style = props.style;
        this.logo = props.logo;
        this.logoSize = props.logoSize;
        this.headline = props.headline;
        this.background = props.background;
        this.extension = props.extension;
        this.menu = props.menu;
        this.action = props.action;
        this.data = props.data;
        this.ready = props.ready;
        this.options = props.options;
    }
}
exports.MsxMenu = MsxMenu;
class MsxMenuItem {
    constructor(props) {
        this.id = props.id;
        this.type = props.type;
        this.display = props.display;
        this.enable = props.enable;
        this.focus = props.focus;
        this.execute = props.execute;
        this.transparent = props.transparent;
        this.icon = props.icon;
        this.image = props.image;
        this.label = props.label;
        this.background = props.background;
        this.extensionIcon = props.extensionIcon;
        this.extensionLabel = props.extensionLabel;
        this.lineColor = props.lineColor;
        this.data = props.data;
        this.options = props.options;
    }
}
exports.MsxMenuItem = MsxMenuItem;
