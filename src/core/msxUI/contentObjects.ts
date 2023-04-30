import { Action } from "./action"
import { Data, Transparent } from "./menuObject"

export type ContentRootProps = {
    name: string
    version: "1.0.0"
    //"reference": "http://link.to.content",
    flag: string
    reuse: boolean
    cache: boolean
    restore: boolean
    important: boolean
    wrap: boolean
    compress: boolean
    transparent: Transparent
    type: "pages" | "list"
    preload: "none" | "next" | "prev" | "full"
    headline: string
    background: string
    extension: string
    //"dictionary": "http://link.to.dictionary",
    template: ContentItem | null
    items: ContentItem[] | null
    pages: ContentPage[] | null
    //"header": null,
    //"footer": null,
    //"overlay": null,
    //"underlay": null,
    action: Action | null
    data: Data | null
    ready: { action: Action; data: Data } | null
    options: any
    //caption: "opt/menu"
}

export class MsxContentRoot {
    name: string
    version: "1.0.0"
    flag: string
    reuse: boolean
    cache: boolean
    restore: boolean
    important: boolean
    wrap: boolean
    compress: boolean
    transparent: Transparent
    type: "pages" | "list"
    preload: "none" | "next" | "prev" | "full"
    headline: string
    background: string
    extension: string
    template: ContentItem | null = null
    items: ContentItem[] = []
    pages: ContentPage[] = []
    action: Action | null
    data: Data | null
    ready: { action: Action; data: Data } | null
    options: any
    constructor(props: ContentRootProps) {
        this.name = props.name
        this.version = props.version
        this.flag = props.flag
        this.reuse = props.reuse
        this.cache = props.cache
        this.restore = props.restore
        this.important = props.important
        this.wrap = props.wrap
        this.compress = props.compress
        this.transparent = props.transparent
        this.type = props.type
        this.preload = props.preload
        this.headline = props.headline
        this.background = props.background
        this.extension = props.extension
        this.action = props.action
        this.data = props.data
        this.ready = props.ready
        this.options = props.options
    }

    addTemplate(template: ContentItem) {
        this.template = template
    }

    addItem(item: ContentItem) {
        if (!this.template)
            throw "MSX UI Error: Cannot asign items to non-templated content"
        this.items?.push(item)
    }

    addPage(page: ContentPage) {
        this.pages?.push(page)
    }
}

export type ContentItemProps = {
    id: string
    type: "default" | "teaser" | "button" | "separate" | "space" | "control"
    key: string | null //TODO: define keyboard keys enum
    layout: `${number},${number},${number},${number}` | null
    area: `${number},${number},${number},${number}` | null
    offset: `${number},${number},${number},${number}` | null
    display: boolean
    enable: boolean
    focus: boolean
    execute: boolean
    enumerate: boolean
    compress: boolean
    shortcut: boolean
    group: string
    color: string
    title: string
    titleHeader: string
    titleFooter: string
    label: string
    icon: string
    iconSize: "small" | "medium" | "large" | "extra-large"
    headline: string
    text: string
    // alignment : string, TODO: define those
    // truncation : string,
    // centration : string,
    tag: string
    tagColor: string
    badge: string
    badgeColor: string
    stamp: string
    stampColor: string
    progress: -1
    progressColor: string
    wrapperColor: string
    image: string
    imageFiller: string
    imageWidth: -1
    imageHeight: -1
    imageOverlay: -1
    imagePreload: false
    imageLabel: string
    imageColor: string
    imageScreenFiller: string
    imageBoundary: false
    playerLabel: string
    background: string | null
    extensionIcon: string
    extensionLabel: string
    action: Action | null
    data: Data | null
    properties: any | null
    live: any | null
    selection: any | null
    options: any | null
}

export class ContentItem {
    id: string
    type: string
    key: string | null
    layout: string | null
    area: string | null
    offset: string | null
    display: boolean
    enable: boolean
    focus: boolean
    execute: boolean
    enumerate: boolean
    compress: boolean
    shortcut: boolean
    group: string
    color: string
    title: string
    titleHeader: string
    titleFooter: string
    label: string
    icon: string
    iconSize: string
    headline: string
    text: string
    tag: string
    tagColor: string
    badge: string
    badgeColor: string
    stamp: string
    stampColor: string
    progress: -1
    progressColor: string
    wrapperColor: string
    image: string
    imageFiller: string
    imageWidth: -1
    imageHeight: -1
    imageOverlay: -1
    imagePreload: false
    imageLabel: string
    imageColor: string
    imageScreenFiller: string
    imageBoundary: false
    playerLabel: string
    background: string | null
    extensionIcon: string
    extensionLabel: string
    action: Action | null
    data: Data | null
    properties: any | null
    live: any | null
    selection: any | null
    options: any | null
    constructor(props: ContentItemProps) {
        this.id = props.id
        this.type = props.type
        this.key = props.key
        this.layout = props.layout
        this.area = props.area
        this.offset = props.offset
        this.display = props.display
        this.enable = props.enable
        this.focus = props.focus
        this.execute = props.execute
        this.enumerate = props.enumerate
        this.compress = props.compress
        this.shortcut = props.shortcut
        this.group = props.group
        this.color = props.color
        this.title = props.title
        this.titleHeader = props.titleHeader
        this.titleFooter = props.titleFooter
        this.label = props.label
        this.icon = props.icon
        this.iconSize = props.iconSize
        this.headline = props.headline
        this.text = props.text
        this.tag = props.tag
        this.tagColor = props.tagColor
        this.badge = props.badge
        this.badgeColor = props.badgeColor
        this.stamp = props.stamp
        this.stampColor = props.stampColor
        this.progress = props.progress
        this.progressColor = props.progressColor
        this.wrapperColor = props.wrapperColor
        this.image = props.image
        this.imageFiller = props.imageFiller
        this.imageWidth = props.imageWidth
        this.imageHeight = props.imageHeight
        this.imageOverlay = props.imageOverlay
        this.imagePreload = props.imagePreload
        this.imageLabel = props.imageLabel
        this.imageColor = props.imageColor
        this.imageScreenFiller = props.imageScreenFiller
        this.imageBoundary = props.imageBoundary
        this.playerLabel = props.playerLabel
        this.background = props.background
        this.extensionIcon = props.extensionIcon
        this.extensionLabel = props.extensionLabel
        this.action = props.action
        this.data = props.data
        this.properties = props.properties
        this.live = props.live
        this.selection = props.selection
        this.options = props.options
    }
}

export type ContentPageProps = {
    display: boolean
    important: boolean
    wrap: boolean
    compress: boolean
    transparent: Transparent
    headline: string
    background: string
    offset: `${number},${number},${number},${number}` | null
    action: Action | null
    data: Data | null
    options: any | null
    caption: "opt/menu"
}

export class ContentPage {
    display: boolean
    important: boolean
    wrap: boolean
    compress: boolean
    transparent: Transparent
    headline: string
    background: string
    offset: string | null
    items: ContentItem[]
    action: Action | null
    data: Data | null
    options: any | null
    caption: "opt/menu"
    constructor(props: ContentPageProps) {
        this.display = props.display
        this.important = props.important
        this.wrap = props.wrap
        this.compress = props.compress
        this.transparent = props.transparent
        this.headline = props.headline
        this.background = props.background
        this.offset = props.offset
        this.items = []
        this.action = props.action
        this.data = props.data
        this.options = props.options
        this.caption = props.caption
    }

    addItem(item: ContentItem) {
        if (this.items.map((it) => it.id).indexOf(item.id) >= 0)
            throw `MSX UI Error: Duplicate item with id ${item.id}`
        this.items.push(item)
    }
}
