"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsxMenuItem = exports.MsxMenu = void 0;
class MsxMenu {
    constructor(props) {
        this.menu = [];
        let key;
        for (key in props) {
            this[key] = props[key];
        }
    }
    addItem(item) {
        if (this.menu.map((it) => it.id).includes(item.id)) {
            //cannot add item with same id as existing item
            throw `MSX UI Error: Duplicate id: ${item.id}`;
        }
        if (this.menu.map((it) => it.focus).reduce((p, c) => p || c) ==
            item.focus) {
            throw `MSX UI Error: Cannot add more than one focused items`;
        }
        this.menu.push(item);
    }
}
exports.MsxMenu = MsxMenu;
class MsxMenuItem {
    constructor(props) {
        let key;
        for (key in props) {
            this[key] = props[key];
        }
    }
}
exports.MsxMenuItem = MsxMenuItem;
