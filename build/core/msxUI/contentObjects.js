"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsxContentPage = exports.MsxContentItem = exports.MsxContentRoot = void 0;
class MsxContentRoot {
    constructor(props) {
        let key;
        for (key in props) {
            this[key] = props[key];
        }
    }
    addTemplate(template) {
        this.template = template;
    }
    addItem(item) {
        var _a;
        if (!this.template)
            throw "MSX UI Error: Cannot asign items to non-templated content";
        (_a = this.items) === null || _a === void 0 ? void 0 : _a.push(item);
    }
    addPage(page) {
        var _a;
        (_a = this.pages) === null || _a === void 0 ? void 0 : _a.push(page);
    }
}
exports.MsxContentRoot = MsxContentRoot;
class MsxContentItem {
    constructor(props) {
        let key;
        for (key in props) {
            this[key] = props[key];
        }
    }
}
exports.MsxContentItem = MsxContentItem;
class MsxContentPage {
    constructor(props) {
        let key;
        for (key in props) {
            this[key] = props[key];
        }
    }
    addItem(item) {
        if (this.items && this.items.map((it) => it.id).includes(item.id))
            throw `MSX UI Error: Duplicate item with id ${item.id}`;
        if (this.items)
            this.items.push(item);
        else
            this.items = [item];
    }
}
exports.MsxContentPage = MsxContentPage;
