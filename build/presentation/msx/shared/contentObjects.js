"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentPage = exports.ContentItem = exports.ContentRootItem = void 0;
class ContentRootItem {
    constructor(props) {
        this.template = null;
        this.items = [];
        this.pages = [];
        this.name = props.name;
        this.version = props.version;
        this.flag = props.flag;
        this.reuse = props.reuse;
        this.cache = props.cache;
        this.restore = props.restore;
        this.important = props.important;
        this.wrap = props.wrap;
        this.compress = props.compress;
        this.transparent = props.transparent;
        this.type = props.type;
        this.preload = props.preload;
        this.headline = props.headline;
        this.background = props.background;
        this.extension = props.extension;
        this.action = props.action;
        this.data = props.data;
        this.ready = props.ready;
        this.options = props.options;
    }
    addTemplate(template) {
        this.template = template;
    }
    addItem(item) {
        var _a;
        if (this.type != "items")
            throw "MSX UI Error: Cannot asign items to content with type 'pages'";
        (_a = this.items) === null || _a === void 0 ? void 0 : _a.push(item);
    }
    addPage(page) {
        var _a;
        if (this.type != "pages")
            throw "MSX UI Error: Cannot asign pages to content with type 'items'";
        (_a = this.pages) === null || _a === void 0 ? void 0 : _a.push(page);
    }
}
exports.ContentRootItem = ContentRootItem;
class ContentItem {
    constructor(props) {
        this.id = props.id;
        this.type = props.type;
        this.key = props.key;
        this.layout = props.layout;
        this.area = props.area;
        this.offset = props.offset;
        this.display = props.display;
        this.enable = props.enable;
        this.focus = props.focus;
        this.execute = props.execute;
        this.enumerate = props.enumerate;
        this.compress = props.compress;
        this.shortcut = props.shortcut;
        this.group = props.group;
        this.color = props.color;
        this.title = props.title;
        this.titleHeader = props.titleHeader;
        this.titleFooter = props.titleFooter;
        this.label = props.label;
        this.icon = props.icon;
        this.iconSize = props.iconSize;
        this.headline = props.headline;
        this.text = props.text;
        this.tag = props.tag;
        this.tagColor = props.tagColor;
        this.badge = props.badge;
        this.badgeColor = props.badgeColor;
        this.stamp = props.stamp;
        this.stampColor = props.stampColor;
        this.progress = props.progress;
        this.progressColor = props.progressColor;
        this.wrapperColor = props.wrapperColor;
        this.image = props.image;
        this.imageFiller = props.imageFiller;
        this.imageWidth = props.imageWidth;
        this.imageHeight = props.imageHeight;
        this.imageOverlay = props.imageOverlay;
        this.imagePreload = props.imagePreload;
        this.imageLabel = props.imageLabel;
        this.imageColor = props.imageColor;
        this.imageScreenFiller = props.imageScreenFiller;
        this.imageBoundary = props.imageBoundary;
        this.playerLabel = props.playerLabel;
        this.background = props.background;
        this.extensionIcon = props.extensionIcon;
        this.extensionLabel = props.extensionLabel;
        this.action = props.action;
        this.data = props.data;
        this.properties = props.properties;
        this.live = props.live;
        this.selection = props.selection;
        this.options = props.options;
    }
}
exports.ContentItem = ContentItem;
class ContentPage {
    constructor(props) {
        this.display = props.display;
        this.important = props.important;
        this.wrap = props.wrap;
        this.compress = props.compress;
        this.transparent = props.transparent;
        this.headline = props.headline;
        this.background = props.background;
        this.offset = props.offset;
        this.items = [];
        this.action = props.action;
        this.data = props.data;
        this.options = props.options;
        this.caption = props.caption;
    }
    addItem(item) {
        if (this.items.map((it) => it.id).indexOf(item.id) >= 0)
            throw `MSX UI Error: Duplicate item with id ${item.id}`;
        this.items.push(item);
    }
}
exports.ContentPage = ContentPage;
