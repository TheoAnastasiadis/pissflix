import { Action } from "./action"
import { Icon } from "./icon"

export type Data =
    | {
          ["key"]: string
      }
    | string

export type Transparent = "0" | "1" | "2" | true | false
export type Style =
    | "default"
    | "flat"
    | "flat-separator"
    | "overlay"
    | "overlay-separator"

export type MsxMenuProps = {
    name?: string
    version?: "1.0.0"
    //"reference": "http://link.to.menu",
    flag?: string
    reuse?: boolean
    cache?: boolean
    restore?: boolean
    transparent?: Transparent
    style?: Style
    logo?: string
    logoSize?: "small" | "large"
    headline?: string
    background?: string
    extension?: string
    //"dictionary": "http://link.to.dictionary",
    action?: Action
    data?: Data
    ready?: { action: Action; data: Data }
    options?: any
}

export class MsxMenu {
    name?: MsxMenuProps["name"]
    version?: MsxMenuProps["version"]
    flag?: MsxMenuProps["flag"]
    reuse?: MsxMenuProps["reuse"]
    cache?: MsxMenuProps["cache"]
    restore?: MsxMenuProps["restore"]
    transparent?: MsxMenuProps["transparent"]
    style?: MsxMenuProps["style"]
    logo?: MsxMenuProps["logo"]
    logoSize?: MsxMenuProps["logoSize"]
    headline?: MsxMenuProps["headline"]
    background?: MsxMenuProps["background"]
    extension?: MsxMenuProps["extension"]
    action?: MsxMenuProps["action"]
    data?: MsxMenuProps["data"]
    ready?: MsxMenuProps["ready"]
    options?: MsxMenuProps["options"]
    menu: MsxMenuItem[] = []
    constructor(props: MsxMenuProps) {
        let key: keyof typeof props
        for (key in props) {
            this[key] = props[key]
        }
    }

    addItem(item: MsxMenuItem): void {
        if (this.menu.map((it) => it.id).includes(item.id)) {
            //cannot add item with same id as existing item
            throw `MSX UI Error: Duplicate id: ${item.id}`
        }
        if (
            this.menu.map((it) => it.focus).reduce((p, c) => p || c) ==
            item.focus
        ) {
            throw `MSX UI Error: Cannot add more than one focused items`
        }
        this.menu.push(item)
    }
}

export type MsxMenuItemProps = {
    id?: string
    type?: "default" | "separator" | "settings"
    display?: boolean
    enable?: boolean
    focus?: boolean
    execute?: boolean
    transparent?: Transparent
    icon?: Icon
    image?: string
    label?: string
    background?: string
    extensionIcon?: Icon
    extensionLabel?: string
    lineColor?: string
    data?: Data
    options?: any
}

export class MsxMenuItem {
    id?: MsxMenuItemProps["id"]
    type?: MsxMenuItemProps["type"]
    display?: MsxMenuItemProps["display"]
    enable?: MsxMenuItemProps["enable"]
    focus?: MsxMenuItemProps["focus"]
    execute?: MsxMenuItemProps["execute"]
    transparent?: MsxMenuItemProps["transparent"]
    icon?: MsxMenuItemProps["icon"]
    image?: MsxMenuItemProps["image"]
    label?: MsxMenuItemProps["label"]
    background?: MsxMenuItemProps["background"]
    extensionIcon?: MsxMenuItemProps["extensionIcon"]
    extensionLabel?: MsxMenuItemProps["extensionLabel"]
    lineColor?: MsxMenuItemProps["lineColor"]
    data?: MsxMenuItemProps["data"]
    options?: MsxMenuItemProps["options"]
    constructor(props: MsxMenuItemProps) {
        let key: keyof typeof props
        for (key in props) {
            this[key] = props[key]
        }
    }
}
