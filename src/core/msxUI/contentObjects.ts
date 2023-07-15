import { pipe } from "fp-ts/lib/function"
import { Action } from "./action"
import { Data } from "./data"
import { Icon } from "./icon"
import { Transparent } from "./menuObject"
import { Selection } from "./selection"
import * as O from "fp-ts/Option"

export type MsxContentRoot = {
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
    overlay?: MsxContentPage
    underlay?: MsxContentPage
    action?: Action
    data?: Data
    ready?: { action: Action; data: Data }
    options?: any
    // caption?: any
    items?: MsxContentItem[]
    pages?: MsxContentPage[]
    template?: MsxContentItem
}

export const addTemplate: (
    content: MsxContentRoot
) => (template: MsxContentItem) => MsxContentRoot =
    (content: MsxContentRoot) => (template: MsxContentItem) => ({
        ...content,
        template,
    })

export const addItemToContent: (
    content: MsxContentRoot
) => (item: MsxContentItem) => MsxContentRoot =
    (content: MsxContentRoot) => (item: MsxContentItem) =>
        pipe(
            item,
            O.fromPredicate(() => !!content.template), //Cannot asign items to non-templated content"
            O.map(() => ({
                ...content,
                items: content.items ? content.items.concat(item) : [item],
            })),
            O.getOrElse(() => content)
        )

export const addPageToContent: (
    content: MsxContentRoot
) => (page: MsxContentPage) => MsxContentRoot =
    (content: MsxContentRoot) => (page: MsxContentPage) => ({
        ...content,
        pages: content.pages ? content.pages.concat(page) : [page],
    })

export type MsxContentItem = {
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
    alignment?: "left" | "center" | "right" | "justify"
    // truncation ?: string,
    centration?: "text" | "label" | "title" | "badge" | "stamp"
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

export type MsxContentPage = {
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
    items?: MsxContentItem[]
}

export const addItemToPage: (
    page: MsxContentPage
) => (item: MsxContentItem) => MsxContentPage = (page) => (item) => ({
    ...page,
    items: page.items ? page.items.concat(item) : [item],
})
