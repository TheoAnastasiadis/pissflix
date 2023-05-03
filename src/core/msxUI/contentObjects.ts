import { Action } from "./action"
import { Data } from "./data"
import { Icon } from "./icon"
import { Transparent } from "./menuObject"
import { Selection } from "./selection"

export type MsxContentRootProps = {
    name?: string
    version?: "1.0.0"
    //"reference": "http://link.to.content",
    flag?: string
    reuse?: boolean
    cache?: boolean
    restore?: boolean
    important?: boolean
    wrap?: boolean
    compress?: boolean
    transparent?: Transparent
    type?: "pages" | "list"
    preload?: "none" | "next" | "prev" | "full"
    headline?: string
    background?: string
    extension?: string
    //"dictionary": "http://link.to.dictionary",
    header?: MsxContentPage
    footer?: MsxContentPage
    overlay?: MsxContentPage,
    underlay?: MsxContentPage,
    action?: Action
    data?: Data
    ready?: { action: Action; data: Data }
    options?: any
    // caption?: any
}

export class MsxContentRoot {
    name?: MsxContentRootProps["name"]
    version?: MsxContentRootProps["version"]
    flag?: MsxContentRootProps["flag"]
    reuse?: MsxContentRootProps["reuse"]
    cache?: MsxContentRootProps["cache"]
    restore?: MsxContentRootProps["restore"]
    important?: MsxContentRootProps["important"]
    wrap?: MsxContentRootProps["wrap"]
    compress?: MsxContentRootProps["compress"]
    transparent?: MsxContentRootProps["transparent"]
    type?: MsxContentRootProps["type"]
    preload?: MsxContentRootProps["preload"]
    headline?: MsxContentRootProps["headline"]
    background?: MsxContentRootProps["background"]
    extension?: MsxContentRootProps["extension"]
    header?: MsxContentRootProps["header"]
    footer?: MsxContentRootProps["footer"]
    overlay?: MsxContentRootProps["overlay"]
    underlay?: MsxContentRootProps["underlay"]
    action?: MsxContentRootProps["action"]
    data?: MsxContentRootProps["data"]
    ready?: MsxContentRootProps["ready"]
    options?: MsxContentRootProps["options"]
    template?: MsxContentItem
    items?: MsxContentItem[]
    pages?: MsxContentPage[]
    constructor(props: MsxContentRootProps) {
        let key: keyof typeof props
        for (key in props) {
            this[key] = props[key]
        }
    }

    addTemplate(template: MsxContentItem) {
        this.template = template
    }

    addItem(item: MsxContentItem) {
        if (!this.template)
            throw "MSX UI Error: Cannot asign items to non-templated content"
        this.items?.push(item)
    }

    addPage(page: MsxContentPage) {
        this.pages?.push(page)
    }
}

export type MsxContentItemProps = {
    id?: string
    type?: "default" | "teaser" | "button" | "separate" | "space" | "control"
    key?: string //TODO?: define keyboard keys
    layout?: `${number},${number},${number},${number}`
    area?: `${number},${number},${number},${number}`
    offset?: `${number},${number},${number},${number}`
    display?: boolean
    enable?: boolean
    focus?: boolean
    execute?: boolean
    enumerate?: boolean
    compress?: boolean
    shortcut?: boolean
    group?: string
    color?: string
    title?: string
    titleHeader?: string
    titleFooter?: string
    label?: string
    icon?: Icon
    iconSize?: "small" | "medium" | "large" | "extra-large"
    headline?: string
    text?: string
    // alignment ?: string, TODO?: define those
    // truncation ?: string,
    // centration ?: string,
    tag?: string
    tagColor?: string
    badge?: string
    badgeColor?: string
    stamp?: string
    stampColor?: string
    progress?: -1
    progressColor?: string
    wrapperColor?: string
    image?: string
    imageFiller?:
        | "default"
        | "width"
        | "width-top"
        | "width-center"
        | "width-bottom"
        | "height"
        | "height-left"
        | "height-center"
        | "height-right"
        | "fit"
        | "cover"
        | "smart"
    // imageWidth?: -1
    // imageHeight?: -1
    // imageOverlay?: -1
    // imagePreload?: false
    imageLabel?: string
    imageColor?: string
    imageScreenFiller?: string
    imageBoundary?: false
    playerLabel?: string
    background?: string
    extensionIcon?: Icon
    extensionLabel?: string
    action?: Action
    data?: Data
    properties?: any
    live?: any
    selection?: Selection
    options?: any
}

export class MsxContentItem {
    id?: MsxContentItemProps["id"]
    type?: MsxContentItemProps["type"]
    key?: MsxContentItemProps["key"]
    layout?: MsxContentItemProps["layout"]
    area?: MsxContentItemProps["area"]
    offset?: MsxContentItemProps["offset"]
    display?: MsxContentItemProps["display"]
    enable?: MsxContentItemProps["enable"]
    focus?: MsxContentItemProps["focus"]
    execute?: MsxContentItemProps["execute"]
    enumerate?: MsxContentItemProps["enumerate"]
    compress?: MsxContentItemProps["compress"]
    shortcut?: MsxContentItemProps["shortcut"]
    group?: MsxContentItemProps["group"]
    color?: MsxContentItemProps["color"]
    title?: MsxContentItemProps["title"]
    titleHeader?: MsxContentItemProps["titleHeader"]
    titleFooter?: MsxContentItemProps["titleFooter"]
    label?: MsxContentItemProps["label"]
    icon?: MsxContentItemProps["icon"]
    iconSize?: MsxContentItemProps["iconSize"]
    headline?: MsxContentItemProps["headline"]
    text?: MsxContentItemProps["text"]
    tag?: MsxContentItemProps["tag"]
    tagColor?: MsxContentItemProps["tagColor"]
    badge?: MsxContentItemProps["badge"]
    badgeColor?: MsxContentItemProps["badgeColor"]
    stamp?: MsxContentItemProps["stamp"]
    stampColor?: MsxContentItemProps["stampColor"]
    progress?: MsxContentItemProps["progress"]
    progressColor?: MsxContentItemProps["progressColor"]
    wrapperColor?: MsxContentItemProps["wrapperColor"]
    image?: MsxContentItemProps["image"]
    imageFiller?: MsxContentItemProps["imageFiller"]
    imageLabel?: MsxContentItemProps["imageLabel"]
    imageColor?: MsxContentItemProps["imageColor"]
    imageScreenFiller?: MsxContentItemProps["imageScreenFiller"]
    imageBoundary?: MsxContentItemProps["imageBoundary"]
    playerLabel?: MsxContentItemProps["playerLabel"]
    background?: MsxContentItemProps["background"]
    extensionIcon?: MsxContentItemProps["extensionIcon"]
    extensionLabel?: MsxContentItemProps["extensionLabel"]
    action?: MsxContentItemProps["action"]
    data?: MsxContentItemProps["data"]
    properties?: MsxContentItemProps["properties"]
    live?: MsxContentItemProps["live"]
    selection?: MsxContentItemProps["selection"]
    options?: MsxContentItemProps["options"]
    constructor(props: MsxContentItemProps) {
        let key: keyof typeof props
        for (key in props) {
            this[key] = props[key]
        }
    }
}

export type MsxContentPageProps = {
    display?: boolean
    important?: boolean
    wrap?: boolean
    compress?: boolean
    transparent?: Transparent
    headline?: string
    background?: string
    offset?: `${number},${number},${number},${number}`
    action?: Action
    data?: Data
    options?: any
    // caption?: any
}

export class MsxContentPage {
    display?: MsxContentPageProps["display"]
    important?: MsxContentPageProps["important"]
    wrap?: MsxContentPageProps["wrap"]
    compress?: MsxContentPageProps["compress"]
    transparent?: MsxContentPageProps["transparent"]
    headline?: MsxContentPageProps["headline"]
    background?: MsxContentPageProps["background"]
    offset?: MsxContentPageProps["offset"]
    items?: MsxContentItem[]
    action?: MsxContentPageProps["action"]
    data?: MsxContentPageProps["data"]
    options?: MsxContentPageProps["options"]
    constructor(props: MsxContentPageProps) {
        let key: keyof typeof props
        for (key in props) {
            this[key] = props[key]
        }
    }
    addItem(item: MsxContentItem) {
        if (this.items && this.items.map((it) => it.id).includes(item.id))
            throw `MSX UI Error: Duplicate item with id ${item.id}`
        if (this.items) this.items.push(item)
        else this.items = [item]
    }
}
